import { SkillStatus } from '@prisma/client';

export function toFrontendStatus(dbStatus: SkillStatus | string): 'completed' | 'in-progress' | 'not-started' {
  switch (dbStatus) {
    case 'COMPLETED':
      return 'completed';
    case 'IN_PROGRESS':
      return 'in-progress';
    default:
      return 'not-started';
  }
}

export function toDbStatus(feStatus: string): SkillStatus {
  const normalized = feStatus.toLowerCase().replace(/_/g, '-');
  switch (normalized) {
    case 'completed':
      return SkillStatus.COMPLETED;
    case 'in-progress':
      return SkillStatus.IN_PROGRESS;
    default:
      return SkillStatus.NOT_STARTED;
  }
}

export interface ReadinessSummary {
  score: number;
  totalSkills: number;
  completedSkills: number;
  inProgressSkills: number;
  evidencedSkills: number;
  theoryOnlySkills: number;
  notStartedSkills: number;
}

export function calculateReadiness(
  userSkills: { status: SkillStatus | string; isProjectEvidenced: boolean }[]
): ReadinessSummary {
  const totalSkills = userSkills.length;
  if (totalSkills === 0) {
    return {
      score: 0,
      totalSkills: 0,
      completedSkills: 0,
      inProgressSkills: 0,
      evidencedSkills: 0,
      theoryOnlySkills: 0,
      notStartedSkills: 0
    };
  }

  const completedSkills = userSkills.filter(s => s.status === SkillStatus.COMPLETED || s.status === 'completed').length;
  const inProgressSkills = userSkills.filter(s => s.status === SkillStatus.IN_PROGRESS || s.status === 'in-progress').length;
  const evidencedSkills = userSkills.filter(s => s.isProjectEvidenced).length;
  const theoryOnlySkills = Math.max(0, completedSkills - evidencedSkills);
  const notStartedSkills = totalSkills - completedSkills - inProgressSkills;

  // Weighted readiness formula:
  // Project-evidenced skills get 1.5x weight, theory completed gets 0.8x weight, in-progress gets 0.3x
  const weightedPoints = (evidencedSkills * 1.5) + (theoryOnlySkills * 0.8) + (inProgressSkills * 0.3);
  const maxPossible = totalSkills * 1.5;
  const calculated = Math.min(100, Math.round((weightedPoints / maxPossible) * 100));

  return {
    score: calculated,
    totalSkills,
    completedSkills,
    inProgressSkills,
    evidencedSkills,
    theoryOnlySkills,
    notStartedSkills
  };
}

export function getNextBestStepForCareer(targetCareer: string) {
  if (targetCareer.toLowerCase().includes('frontend')) {
    return {
      id: "step-frontend-perf",
      targetCareer: "Frontend Engineer",
      title: "Architect High-Performance React State & Virtualized Lists",
      whyRecommended: "Your foundational React chops are proven. Implementing windowed list virtualization and optimizing Core Web Vitals (INP < 50ms) will push your readiness to Senior Intern level.",
      targetSkills: [
        "React Virtualization (@tanstack/virtual)",
        "Core Web Vitals Optimization",
        "Custom Hook State Machines",
        "Accessible Keyboard Primitives"
      ],
      estimatedEffort: "4 - 6 hours",
      impactLevel: "Very High" as const,
      criteria: [
        {
          id: "fe-c1",
          title: "Implement virtualized rendering for 50,000+ dataset rows with sub-16ms frame budget.",
          description: "Ensure zero DOM bloat and 60fps scrolling on throttled mobile devices.",
          completed: true
        },
        {
          id: "fe-c2",
          title: "Audit and eliminate unnecessary component re-renders using React Profiler and memo boundaries.",
          description: "Achieve 99+ Lighthouse performance and pass all Core Web Vitals checks.",
          completed: false
        },
        {
          id: "fe-c3",
          title: "Publish interactive storybook documentation and WCAG 2.1 AA accessibility tests.",
          description: "Screen reader announcements, focus traps, and full keyboard navigation.",
          completed: false
        }
      ],
      actionGuideSteps: [
        "Step 1: Install @tanstack/react-virtual and scaffold an infinite scrolling feed.",
        "Step 2: Profile rendering with React DevTools Profiler to catch layout shifts.",
        "Step 3: Implement custom useDebouncedCallback hook for filter queries.",
        "Step 4: Verify ARIA attributes and focus management."
      ],
      starterSnippet: `// Example virtualizer hook:
const rowVirtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 48,
  overscan: 5,
});`
    };
  }

  // Default to Full-Stack Developer
  return {
    id: "step-rest-api-auth",
    targetCareer: targetCareer || "Full-Stack Developer",
    title: "Build a REST API with authentication",
    whyRecommended: "You have verified strong frontend mastery and TypeScript skills through DevPulse and ShopNest. Backend auth with JWT and relational database modeling is currently the single highest-leverage gap holding your readiness score back from 75%.",
    targetSkills: [
      "Node.js / Express",
      "JWT Authentication",
      "PostgreSQL & Schema Design",
      "API Security & Rate Limiting"
    ],
    estimatedEffort: "6 - 8 hours",
    impactLevel: "Critical" as const,
    criteria: [
      {
        id: "c1",
        title: "Design RESTful endpoints (/api/auth/register, /login, /refresh) with bcrypt password hashing and input schema validation.",
        description: "Ensure passwords have at least 10 salt rounds and requests validate email format and password strength.",
        completed: true
      },
      {
        id: "c2",
        title: "Implement JWT verification middleware with refresh token rotation and role-based route protection.",
        description: "Short-lived access tokens (15m) paired with httpOnly secure cookies for refresh tokens.",
        completed: false
      },
      {
        id: "c3",
        title: "Connect to a PostgreSQL database via Prisma ORM and write integration test scripts or OpenAPI spec documentation.",
        description: "Provide a working Docker Compose file or hosted Supabase/Neon connection string with migration history.",
        completed: false
      }
    ],
    actionGuideSteps: [
      "Step 1: Initialize an Express + TypeScript project and configure strict tsconfig.",
      "Step 2: Setup Prisma schema with User, RefreshToken, and Role models; execute initial migration.",
      "Step 3: Implement controller logic with Zod validation and Bcrypt password hashing.",
      "Step 4: Craft the authenticateToken middleware and test edge cases (expired tokens, invalid signatures).",
      "Step 5: Export a Postman Collection or write 3 Supertest unit tests to prove functionality."
    ],
    starterSnippet: `// Suggested Middleware Structure:
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access token missing' });
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token expired or invalid' });
    req.user = user;
    next();
  });
};`
  };
}
