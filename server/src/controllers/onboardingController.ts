import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { getOrCreateDemoUser } from './profileController.js';
import { getTemplateForCareer } from '../utils/roadmapTemplates.js';
import { calculateReadiness, getNextBestStepForCareer } from '../utils/readiness.js';
import { SkillStatus } from '@prisma/client';

export async function submitOnboarding(req: Request, res: Response) {
  try {
    const rawName = req.body.name || req.body.fullName;
    const rawCareer = req.body.targetCareer || req.body.careerGoal || req.body.career;
    const rawEducation = req.body.education || req.body.fieldOfStudy;
    const rawLevel = req.body.experienceLevel;
    const rawHours = req.body.weeklyGoalHours || req.body.studyHoursPerWeek || req.body.hoursPerWeek;

    // 1. Validation
    if (!rawName || typeof rawName !== 'string' || rawName.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your full name.'
      });
    }

    if (!rawCareer || typeof rawCareer !== 'string' || rawCareer.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please select a target career goal.'
      });
    }

    const validLevels = ['Beginner', 'Some Experience', 'Comfortable with Basics'];
    const sanitizedLevel = validLevels.includes(rawLevel) ? rawLevel : 'Beginner';
    const sanitizedHours = Math.max(1, Math.min(80, Number(rawHours) || 15));
    const sanitizedName = rawName.trim().slice(0, 100);
    const sanitizedEducation = typeof rawEducation === 'string' && rawEducation.trim().length > 0 
      ? rawEducation.trim().slice(0, 200) 
      : 'Self-taught learner';
    const sanitizedCareer = rawCareer.trim().slice(0, 100);

    const user = await getOrCreateDemoUser();

    console.log(`[Onboarding] Personalizing journey for "${sanitizedName}" -> Career: "${sanitizedCareer}" (${sanitizedLevel}, ${sanitizedHours} hrs/wk)`);

    // 2. Fetch the appropriate career roadmap template
    const templatePhases = getTemplateForCareer(sanitizedCareer);

    // 3. Update User Profile in PostgreSQL
    const cleanHandle = `@${sanitizedName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'learner'}`;
    const defaultBio = `Aspiring ${sanitizedCareer} with a background in ${sanitizedEducation || 'technology'}. Following a personalized SkillSync roadmap.`;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: sanitizedName,
        education: sanitizedEducation,
        targetCareer: sanitizedCareer,
        experienceLevel: sanitizedLevel,
        weeklyGoalHours: sanitizedHours,
        hoursCompletedThisWeek: 0,
        isOnboarded: true,
        handle: cleanHandle,
        bio: defaultBio
      }
    });

    // 4. Reset Roadmap Phases and PhaseSkills
    // Delete existing phase skills and phases to re-seed cleanly for the new track
    await prisma.phaseSkill.deleteMany();
    await prisma.roadmapPhase.deleteMany();
    await prisma.userSkill.deleteMany({
      where: { userId: user.id }
    });

    // 5. Generate and Insert Phases, Skills & UserSkills based on Experience Level
    for (const p of templatePhases) {
      let phaseStatus = 'upcoming';

      if (sanitizedLevel === 'Beginner') {
        phaseStatus = p.phaseNumber === 1 ? 'in-progress' : 'upcoming';
      } else if (sanitizedLevel === 'Some Experience') {
        if (p.phaseNumber === 1) phaseStatus = 'completed';
        else if (p.phaseNumber === 2) phaseStatus = 'in-progress';
        else phaseStatus = 'upcoming';
      } else if (sanitizedLevel === 'Comfortable with Basics') {
        if (p.phaseNumber <= 2) phaseStatus = 'completed';
        else if (p.phaseNumber === 3) phaseStatus = 'in-progress';
        else phaseStatus = 'upcoming';
      }

      const createdPhase = await prisma.roadmapPhase.create({
        data: {
          phaseNumber: p.phaseNumber,
          title: p.title,
          subtitle: p.subtitle,
          status: phaseStatus,
          description: p.description
        }
      });

      for (let i = 0; i < p.skills.length; i++) {
        const s = p.skills[i];

        // Upsert Skill
        const skill = await prisma.skill.upsert({
          where: { name: s.name },
          update: {
            category: s.category,
            importance: s.importance,
            description: s.description
          },
          create: {
            name: s.name,
            category: s.category,
            importance: s.importance,
            description: s.description
          }
        });

        // Link to Phase
        await prisma.phaseSkill.create({
          data: {
            phaseId: createdPhase.id,
            skillId: skill.id,
            order: i
          }
        });

        // Determine UserSkill status based on phase status
        let userStatus: SkillStatus = SkillStatus.NOT_STARTED;
        let masteryScore = 0;

        if (phaseStatus === 'completed') {
          userStatus = SkillStatus.COMPLETED;
          masteryScore = 80 + Math.floor(Math.random() * 15);
        } else if (phaseStatus === 'in-progress' && i === 0) {
          userStatus = SkillStatus.IN_PROGRESS;
          masteryScore = 40 + Math.floor(Math.random() * 15);
        }

        await prisma.userSkill.create({
          data: {
            userId: user.id,
            skillId: skill.id,
            status: userStatus,
            isProjectEvidenced: false,
            masteryScore: masteryScore
          }
        });
      }
    }

    // 6. Recalculate Readiness & Next Best Step
    const userSkills = await prisma.userSkill.findMany({
      where: { userId: user.id }
    });
    const readiness = calculateReadiness(userSkills);
    const nextBestStep = getNextBestStepForCareer(sanitizedCareer);

    console.log(`[Onboarding] Successfully created roadmap with ${templatePhases.length} phases for ${sanitizedName}. Starting readiness: ${readiness.score}%`);

    return res.status(200).json({
      success: true,
      message: 'Onboarding completed and roadmap generated successfully!',
      data: {
        profile: {
          name: updatedUser.name,
          handle: updatedUser.handle,
          avatarUrl: updatedUser.avatarUrl,
          bio: updatedUser.bio,
          education: updatedUser.education,
          targetCareer: updatedUser.targetCareer,
          experienceLevel: updatedUser.experienceLevel,
          isOnboarded: updatedUser.isOnboarded,
          readinessPercentage: readiness.score,
          weeklyGoalHours: updatedUser.weeklyGoalHours,
          hoursCompletedThisWeek: updatedUser.hoursCompletedThisWeek,
          targetCompletionQuarter: updatedUser.targetCompletionQuarter
        },
        readiness,
        nextBestStep
      }
    });
  } catch (error: any) {
    console.error('[Onboarding] Error submitting onboarding:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to complete onboarding. Please try again.'
    });
  }
}

export async function getOnboardingStatus(req: Request, res: Response) {
  try {
    const user = await getOrCreateDemoUser();
    return res.json({
      success: true,
      data: {
        isOnboarded: user.isOnboarded || false,
        name: user.name,
        targetCareer: user.targetCareer,
        experienceLevel: user.experienceLevel
      }
    });
  } catch (error) {
    console.error('[Onboarding] Error getting status:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get onboarding status'
    });
  }
}

export async function resetOnboarding(req: Request, res: Response) {
  try {
    const user = await getOrCreateDemoUser();
    await prisma.user.update({
      where: { id: user.id },
      data: { isOnboarded: false }
    });

    console.log(`[Onboarding] Onboarding reset for user: ${user.name}`);

    return res.json({
      success: true,
      message: 'Onboarding state reset successfully'
    });
  } catch (error) {
    console.error('[Onboarding] Error resetting onboarding:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to reset onboarding'
    });
  }
}
