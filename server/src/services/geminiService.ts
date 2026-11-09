import { GoogleGenAI } from '@google/genai';
import { prisma } from '../config/prisma.js';
import { calculateReadiness, getNextBestStepForCareer } from '../utils/readiness.js';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'model';
  content: string;
}

export interface CareerAdviceResult {
  reply: string;
  isMockFallback?: boolean;
}

/**
 * Gathers rich, personalized student context directly from PostgreSQL
 */
export async function buildStudentContext(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userSkills: {
        include: { skill: true }
      },
      projects: {
        include: {
          projectSkills: {
            include: { skill: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!user) {
    throw new Error(`User ${userId} not found`);
  }

  // Calculate readiness & next best step based on live database records
  const readiness = calculateReadiness(user.userSkills);
  const nextStep = getNextBestStepForCareer(user.targetCareer);

  // Categorize skills
  const completedSkills = user.userSkills
    .filter(s => s.status === 'COMPLETED')
    .map(s => s.skill.name);

  const inProgressSkills = user.userSkills
    .filter(s => s.status === 'IN_PROGRESS')
    .map(s => s.skill.name);

  const notStartedSkills = user.userSkills
    .filter(s => s.status === 'NOT_STARTED')
    .map(s => s.skill.name);

  const evidencedSkills = user.userSkills
    .filter(s => s.isProjectEvidenced)
    .map(s => s.skill.name);

  // Active roadmap phase
  const activePhase = await prisma.roadmapPhase.findFirst({
    where: { status: 'in-progress' },
    orderBy: { phaseNumber: 'asc' }
  }) || await prisma.roadmapPhase.findFirst({
    orderBy: { phaseNumber: 'asc' }
  });

  const projectsSummary = user.projects.map(p => ({
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    technologies: p.technologies,
    evidencedSkills: p.projectSkills.map(ps => ps.skill.name),
    status: p.status,
    githubUrl: p.githubUrl,
    liveDemoUrl: p.liveDemoUrl
  }));

  return {
    user: {
      name: user.name,
      targetCareer: user.targetCareer,
      bio: user.bio,
      education: user.education,
      weeklyGoalHours: user.weeklyGoalHours,
      hoursCompletedThisWeek: user.hoursCompletedThisWeek,
      targetCompletionQuarter: user.targetCompletionQuarter
    },
    readinessScore: readiness.score,
    nextBestStep: {
      title: nextStep.title,
      whyRecommended: nextStep.whyRecommended,
      targetSkills: nextStep.targetSkills,
      criteria: nextStep.criteria.map(c => `${c.title} (${c.completed ? 'COMPLETED' : 'PENDING'})`)
    },
    activePhase: activePhase ? {
      number: activePhase.phaseNumber,
      title: activePhase.title,
      subtitle: activePhase.subtitle,
      status: activePhase.status
    } : null,
    skills: {
      completed: completedSkills,
      inProgress: inProgressSkills,
      notStarted: notStartedSkills,
      evidenced: evidencedSkills
    },
    projects: projectsSummary
  };
}

/**
 * Builds the personalized system instruction grounding Gemini in the student's actual SkillSync profile
 */
export function buildSystemPrompt(context: Awaited<ReturnType<typeof buildStudentContext>>): string {
  const { user, readinessScore, nextBestStep, activePhase, skills, projects } = context;

  const projectListStr = projects.length > 0
    ? projects.map(p => 
        `- **${p.name}** (${p.status}): ${p.tagline ? p.tagline + ' — ' : ''}${p.description}\n` +
        `  Tech: ${p.technologies.join(', ') || 'None specified'} | Evidences: ${p.evidencedSkills.join(', ') || 'None yet'}`
      ).join('\n')
    : 'No projects added yet.';

  const criteriaStr = nextBestStep.criteria.join('\n  - ');

  return `You are the SkillSync Career Assistant, an expert, supportive, and practical career mentor integrated into SkillSync.
You are conversing with ${user.name}, who is actively pursuing a career as a ${user.targetCareer}.

STUDENT'S LIVE SKILLSYNC PROFILE & DATABASE CONTEXT:
- Name: ${user.name}
- Target Career: ${user.targetCareer}
- Current Career Readiness: ${readinessScore}%
- Weekly Goal: ${user.weeklyGoalHours} hours (${user.hoursCompletedThisWeek} hours logged this week)
- Target Completion: ${user.targetCompletionQuarter || 'Q3 2026'}
- Bio: ${user.bio || 'Not provided'}
- Education: ${user.education || 'Not provided'}

CURRENT NEXT BEST STEP:
- Title: "${nextBestStep.title}"
- Why Recommended: ${nextBestStep.whyRecommended}
- Target Skills to Prove: ${nextBestStep.targetSkills.join(', ')}
- Completion Checklist:
  - ${criteriaStr}

CURRENT LEARNING ROADMAP:
${activePhase ? `- Phase ${activePhase.number}: ${activePhase.title} (${activePhase.status}) — ${activePhase.subtitle}` : '- No active phase recorded'}

SKILLS STATUS:
- Completed (${skills.completed.length}): ${skills.completed.join(', ') || 'None'}
- In Progress (${skills.inProgress.length}): ${skills.inProgress.join(', ') || 'None'}
- Project-Evidenced Skills (${skills.evidenced.length}): ${skills.evidenced.join(', ') || 'None'}
- Not Started Yet (${skills.notStarted.length}): ${skills.notStarted.slice(0, 10).join(', ')}${skills.notStarted.length > 10 ? '...' : ''}

PORTFOLIO PROJECTS:
${projectListStr}

GUIDANCE PRINCIPLES:
1. Ground your advice in ${user.name}'s actual SkillSync profile, projects, and skills. Reference specific projects (like DevPulse, TaskFlow) and specific skills where relevant.
2. If asked "What should I focus on this week?" or "What should I do next?", direct attention to the current Next Best Step: "${nextBestStep.title}" and explain why it provides the highest readiness boost.
3. If asked for resume help or bullet points, craft strong, impact-oriented bullet points based specifically on the user's projects and technologies.
4. If asked technical questions (e.g., JWT, databases, APIs, performance), provide clear, practical explanations with code snippets or architectural patterns directly suited to their target career.
5. If asked what project to build next, suggest ideas that turn their "in-progress" or "theory-only" skills into project-evidenced skills.
6. Keep answers structured, encouraging, actionable, and concise. Use bolding and bullet points to make information easy to digest. Avoid generic conversational fluff.`;
}

/**
 * Communicates with the Google Gemini API to generate personalized career advice.
 * Enforces server-side timeout with AbortController and detailed lifecycle logging.
 */
export async function generateCareerAdvice(
  message: string,
  history: ChatMessage[] = [],
  userId: string
): Promise<CareerAdviceResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  // If no API key configured, provide a helpful and graceful onboarding response
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.log('[AI] No valid GEMINI_API_KEY found in server/.env, returning guided configuration mode.');
    return {
      reply: `SkillSync Career Assistant is ready, but a Google Gemini API key has not been configured yet.\n\n` +
        `**To activate live AI career guidance:**\n` +
        `1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)\n` +
        `2. Open \`server/.env\` and set \`GEMINI_API_KEY="your_actual_key"\`\n` +
        `3. Restart the backend server (\`npm run dev:server\`)\n\n` +
        `In the meantime, your PostgreSQL database is fully connected: your skills, projects, and roadmap progress are persisting seamlessly!`,
      isMockFallback: true
    };
  }

  // 1. Gather student context from PostgreSQL
  const studentContext = await buildStudentContext(userId);
  console.log(`[AI] Student context successfully loaded from PostgreSQL for user: ${studentContext.user.name} (Career: ${studentContext.user.targetCareer}, Readiness: ${studentContext.readinessScore}%)`);

  const systemPrompt = buildSystemPrompt(studentContext);

  // Available and active candidate models
  const primaryModel = process.env.GEMINI_MODEL?.trim() || 'gemini-3-flash-preview';
  const candidateModels = Array.from(new Set([
    primaryModel,
    'gemini-3-flash-preview',
    'gemini-3.1-flash-lite'
  ]));

  // Initialize official Google Gen AI SDK with v1beta and explicit 15s deadline
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      apiVersion: 'v1beta',
      timeout: 15000,
      retryOptions: { attempts: 1 }
    }
  });

  // Format message history
  const recentHistory = history.slice(-8);
  const formattedContents = recentHistory.map(msg => ({
    role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  formattedContents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  let lastError: any = null;

  for (const modelName of candidateModels) {
    const abortController = new AbortController();
    const timeoutMs = 15000;
    const startTime = Date.now();

    console.log(`[AI] Request being sent to Gemini (model: ${modelName}, timeout: ${timeoutMs}ms)...`);

    // Race against a hard safeguard timer
    const timeoutPromise = new Promise<never>((_, reject) => {
      const timer = setTimeout(() => {
        abortController.abort();
        reject(new Error(`Gemini API call timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      // Clean up timer if aborted early
      abortController.signal.addEventListener('abort', () => clearTimeout(timer));
    });

    try {
      const apiPromise = ai.models.generateContent({
        model: modelName,
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens: 1200,
          abortSignal: abortController.signal
        }
      });

      const response = await Promise.race([apiPromise, timeoutPromise]);
      const elapsed = Date.now() - startTime;
      const reply = response.text || '';

      if (!reply) {
        throw new Error('Gemini returned an empty response text.');
      }

      console.log(`[AI] Response received from Gemini in ${elapsed}ms (${reply.length} chars, model: ${modelName})`);
      return { reply };
    } catch (err: any) {
      abortController.abort();
      const elapsed = Date.now() - startTime;
      lastError = err;

      console.error(`[AI] Error returned by Gemini with model "${modelName}" in ${elapsed}ms:`, {
        name: err?.name,
        message: err?.message,
        status: err?.status || err?.statusCode
      });

      // If error is 404 (model retired) or 503/504 (demand spike), try next candidate model
      const isRetryableModelError = 
        err?.status === 404 || 
        err?.status === 503 || 
        err?.status === 504 || 
        err?.message?.includes('not found') || 
        err?.message?.includes('high demand') ||
        err?.message?.includes('timed out');

      if (isRetryableModelError && modelName !== candidateModels[candidateModels.length - 1]) {
        console.log(`[AI] Falling back to alternate model for resilience...`);
        continue;
      }

      break;
    }
  }

  // If all candidate attempts failed, produce safe, informative error message
  const errMessage = lastError?.message || 'Unknown network error';

  if (errMessage.includes('API_KEY_INVALID') || lastError?.status === 400 || lastError?.status === 403) {
    return {
      reply: `There was an issue authenticating with the Gemini API. Please check that your \`GEMINI_API_KEY\` in \`server/.env\` is valid and active.\n\nError details: ${errMessage}`,
      isMockFallback: true
    };
  }

  if (errMessage.includes('timed out') || lastError?.status === 504) {
    throw new Error('The Gemini API request timed out after 15 seconds. Please try again in a moment.');
  }

  throw new Error(`Gemini AI service error: ${errMessage}`);
}
