import { 
  CareerProfile, 
  NextBestStep, 
  RoadmapPhase, 
  Project, 
  CompanionMessage,
  Skill
} from '../types';

export const demoProfile: CareerProfile = {
  name: "Alex Rivera",
  handle: "@alexrivera_dev",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
  bio: "3rd-year Computer Science student transitioning from building static frontend web apps into production-ready full-stack software systems.",
  education: "B.S. in Computer Science • University of Washington (Class of 2026)",
  targetCareer: "Full-Stack Developer",
  readinessPercentage: 68,
  weeklyGoalHours: 15,
  hoursCompletedThisWeek: 11.5,
  targetCompletionQuarter: "Target: Q3 2026 Ready"
};

export const demoNextBestStep: NextBestStep = {
  id: "step-rest-api-auth",
  targetCareer: "Full-Stack Developer",
  title: "Build a REST API with authentication",
  whyRecommended: "You have verified strong frontend mastery and TypeScript skills through DevPulse and ShopNest. Backend auth with JWT and relational database modeling is currently the single highest-leverage gap holding your readiness score back from 75%.",
  targetSkills: [
    "Node.js / Express",
    "JWT Authentication",
    "PostgreSQL & Schema Design",
    "API Security & Rate Limiting"
  ],
  estimatedEffort: "6 - 8 hours",
  impactLevel: "Critical",
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

export const demoRoadmapPhases: RoadmapPhase[] = [
  {
    id: "phase-1",
    phaseNumber: 1,
    title: "Frontend & Core Web Foundations",
    subtitle: "Mastering the browser runtime, semantic HTML, and modern JS",
    status: "completed",
    description: "Foundational mastery of browser APIs, clean component hierarchies, and collaborative git workflows.",
    skills: [
      {
        id: "s1",
        name: "Modern JavaScript (ES6+)",
        category: "Frontend",
        status: "completed",
        isProjectEvidenced: true,
        evidencedByProjectNames: ["ShopNest", "DevPulse"],
        importance: "Essential",
        masteryScore: 92
      },
      {
        id: "s2",
        name: "HTML5 & Semantic Web",
        category: "Frontend",
        status: "completed",
        isProjectEvidenced: true,
        evidencedByProjectNames: ["ShopNest"],
        importance: "Essential",
        masteryScore: 88
      },
      {
        id: "s3",
        name: "CSS3 & Modern Tailwind",
        category: "Frontend",
        status: "completed",
        isProjectEvidenced: true,
        evidencedByProjectNames: ["DevPulse", "ShopNest"],
        importance: "Essential",
        masteryScore: 95
      },
      {
        id: "s4",
        name: "Git & Version Control",
        category: "DevOps & Tooling",
        status: "completed",
        isProjectEvidenced: true,
        evidencedByProjectNames: ["DevPulse", "ShopNest", "TaskForge CLI"],
        importance: "Essential",
        masteryScore: 90
      },
      {
        id: "s5",
        name: "TypeScript Fundamentals",
        category: "Frontend",
        status: "completed",
        isProjectEvidenced: true,
        evidencedByProjectNames: ["DevPulse", "TaskForge CLI"],
        importance: "Essential",
        masteryScore: 86
      }
    ]
  },
  {
    id: "phase-2",
    phaseNumber: 2,
    title: "Reactive Web & State Architecture",
    subtitle: "Production UI development, state management, and performance",
    status: "completed",
    description: "Building resilient client-side applications with reactive state lifecycles and accessible component primitives.",
    skills: [
      {
        id: "s6",
        name: "React 18 & Component Patterns",
        category: "Frontend",
        status: "completed",
        isProjectEvidenced: true,
        evidencedByProjectNames: ["DevPulse"],
        importance: "Essential",
        masteryScore: 90
      },
      {
        id: "s7",
        name: "State Management (Zustand/Context)",
        category: "Frontend",
        status: "completed",
        isProjectEvidenced: true,
        evidencedByProjectNames: ["ShopNest"],
        importance: "Recommended",
        masteryScore: 84
      },
      {
        id: "s8",
        name: "Asynchronous Data Fetching",
        category: "Frontend",
        status: "completed",
        isProjectEvidenced: true,
        evidencedByProjectNames: ["DevPulse"],
        importance: "Essential",
        masteryScore: 85
      },
      {
        id: "s9",
        name: "Responsive & Mobile-First Design",
        category: "Frontend",
        status: "completed",
        isProjectEvidenced: true,
        evidencedByProjectNames: ["ShopNest", "DevPulse"],
        importance: "Essential",
        masteryScore: 92
      },
      {
        id: "s10",
        name: "Component Testing with Vitest",
        category: "DevOps & Tooling",
        status: "completed",
        isProjectEvidenced: false,
        importance: "Recommended",
        masteryScore: 78
      }
    ]
  },
  {
    id: "phase-3",
    phaseNumber: 3,
    title: "Backend Foundations & API Engineering",
    subtitle: "Current Focus: Server runtimes, relational databases & secure APIs",
    status: "in-progress",
    description: "Architecting reliable server-side services with authenticated boundaries, transactional safety, and clean API contracts.",
    skills: [
      {
        id: "s11",
        name: "Node.js & Express Fundamentals",
        category: "Backend & APIs",
        status: "completed",
        isProjectEvidenced: true,
        evidencedByProjectNames: ["TaskForge CLI"],
        importance: "Essential",
        masteryScore: 82
      },
      {
        id: "s12",
        name: "RESTful API Design & Routing",
        category: "Backend & APIs",
        status: "completed",
        isProjectEvidenced: false,
        importance: "Essential",
        masteryScore: 80
      },
      {
        id: "s13",
        name: "JWT Authentication & Security",
        category: "Backend & APIs",
        status: "in-progress",
        isProjectEvidenced: false,
        importance: "Essential",
        masteryScore: 45
      },
      {
        id: "s14",
        name: "PostgreSQL & Relational Schemas",
        category: "Databases",
        status: "in-progress",
        isProjectEvidenced: false,
        importance: "Essential",
        masteryScore: 50
      },
      {
        id: "s15",
        name: "Prisma / Drizzle ORM",
        category: "Databases",
        status: "not-started",
        isProjectEvidenced: false,
        importance: "Recommended",
        masteryScore: 0
      },
      {
        id: "s16",
        name: "API Documentation (OpenAPI/Swagger)",
        category: "Backend & APIs",
        status: "not-started",
        isProjectEvidenced: false,
        importance: "Recommended",
        masteryScore: 0
      }
    ]
  },
  {
    id: "phase-4",
    phaseNumber: 4,
    title: "Full-Stack Integration & Scalability",
    subtitle: "SSR, real-time channels, caching layers, and containerization",
    status: "upcoming",
    description: "Bridging client and server into unified frameworks with distributed caches and containerized runtimes.",
    skills: [
      {
        id: "s17",
        name: "Next.js App Router & Server Actions",
        category: "Frontend",
        status: "not-started",
        isProjectEvidenced: false,
        importance: "Essential",
        masteryScore: 0
      },
      {
        id: "s18",
        name: "Redis Caching & Session Storage",
        category: "Databases",
        status: "not-started",
        isProjectEvidenced: false,
        importance: "Recommended",
        masteryScore: 0
      },
      {
        id: "s19",
        name: "WebSockets & Event-Driven APIs",
        category: "Backend & APIs",
        status: "not-started",
        isProjectEvidenced: false,
        importance: "Recommended",
        masteryScore: 0
      },
      {
        id: "s20",
        name: "Docker Containerization",
        category: "DevOps & Tooling",
        status: "not-started",
        isProjectEvidenced: false,
        importance: "Recommended",
        masteryScore: 0
      }
    ]
  },
  {
    id: "phase-5",
    phaseNumber: 5,
    title: "Production Systems & Cloud Delivery",
    subtitle: "CI/CD automation, cloud deployment, and system observability",
    status: "upcoming",
    description: "Delivering resilient multi-tier applications to cloud infrastructure with automated quality gates and telemetry.",
    skills: [
      {
        id: "s21",
        name: "CI/CD with GitHub Actions",
        category: "DevOps & Tooling",
        status: "not-started",
        isProjectEvidenced: false,
        importance: "Essential",
        masteryScore: 0
      },
      {
        id: "s22",
        name: "Cloud Deployment (AWS/Render/Vercel)",
        category: "DevOps & Tooling",
        status: "not-started",
        isProjectEvidenced: false,
        importance: "Essential",
        masteryScore: 0
      },
      {
        id: "s23",
        name: "System Design & Microservices Basics",
        category: "Architecture & Security",
        status: "not-started",
        isProjectEvidenced: false,
        importance: "Recommended",
        masteryScore: 0
      },
      {
        id: "s24",
        name: "Error Monitoring & Telemetry (Sentry)",
        category: "DevOps & Tooling",
        status: "not-started",
        isProjectEvidenced: false,
        importance: "Recommended",
        masteryScore: 0
      }
    ]
  }
];

export const demoProjects: Project[] = [
  {
    id: "proj-1",
    name: "DevPulse Analytics",
    tagline: "Developer productivity & focus metrics dashboard",
    description: "Engineered a performant single-page analytics application featuring customizable productivity widgets, local storage state caching, and responsive SVG visual charts. Implemented custom hooks for debounce and window resize telemetry.",
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "Recharts", "Lucide Icons"],
    evidencedSkills: [
      "React 18 & Component Patterns",
      "TypeScript Fundamentals",
      "Modern JavaScript (ES6+)",
      "Responsive & Mobile-First Design",
      "Asynchronous Data Fetching",
      "CSS3 & Modern Tailwind"
    ],
    githubUrl: "https://github.com/alexrivera/devpulse-analytics",
    liveDemoUrl: "https://devpulse-preview.web.app",
    stars: 38,
    featured: true,
    completionDate: "October 2024",
    status: "Completed",
    metrics: "99/100 Lighthouse Performance • 4.8s time-to-interactive on mobile"
  },
  {
    id: "proj-2",
    name: "ShopNest Storefront",
    tagline: "Headless e-commerce client with optimistic cart state",
    description: "Constructed a multi-route responsive storefront featuring client-side faceted product filters, persistent cart synchronization across tabs via Zustand, checkout form validation, and toast notifications.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Stripe Elements"],
    evidencedSkills: [
      "State Management (Zustand/Context)",
      "Modern JavaScript (ES6+)",
      "HTML5 & Semantic Web",
      "Git & Version Control"
    ],
    githubUrl: "https://github.com/alexrivera/shopnest-client",
    liveDemoUrl: "https://shopnest-store.vercel.app",
    stars: 52,
    featured: true,
    completionDate: "December 2024",
    status: "Completed",
    metrics: "Sub-120ms search filter response • 100% accessible keyboard navigation"
  },
  {
    id: "proj-3",
    name: "TaskForge CLI",
    tagline: "Developer terminal tool for repo scaffolding & git hooks",
    description: "Authored an interactive command-line interface in Node.js to automate git pre-commit quality checks, lint staged files, and generate conventional commit messages with custom prompt helpers.",
    technologies: ["Node.js", "TypeScript", "Commander.js", "Chalk", "Inquirer"],
    evidencedSkills: [
      "Node.js & Express Fundamentals",
      "Git & Version Control",
      "TypeScript Fundamentals"
    ],
    githubUrl: "https://github.com/alexrivera/taskforge-cli",
    stars: 24,
    featured: false,
    completionDate: "January 2025",
    status: "Completed",
    metrics: "Published to npm • 600+ downloads"
  }
];

export const demoCompanionInitialMessages: CompanionMessage[] = [
  {
    id: "msg-1",
    sender: "ai",
    text: "Hello Alex! I analyzed your recent progress. You've evidenced 9 core frontend and tooling skills through DevPulse and ShopNest. That puts your Full-Stack Developer readiness at 68%!",
    timestamp: "10:15 AM",
    badge: "Milestone Analysis"
  },
  {
    id: "msg-2",
    sender: "ai",
    text: "Your highest-ROI Next Best Step right now is **'Build a REST API with authentication'**. If you implement JWT auth and PostgreSQL schema modeling, your readiness will leap to 76% and unlock the Full-Stack Intern tier.",
    timestamp: "10:16 AM",
    suggestedActions: [
      { label: "View Next Best Step Guide", actionKey: "open_step_guide" },
      { label: "What portfolio project should I build for this?", actionKey: "recommend_api_project" },
      { label: "How should I describe my skills to recruiters?", actionKey: "resume_bullets" }
    ]
  }
];

// Helper to compute overall skill statistics across all phases
export function calculateSkillStats(phases: RoadmapPhase[]) {
  const allSkills: Skill[] = phases.flatMap(p => p.skills);
  const total = allSkills.length;
  const completed = allSkills.filter(s => s.status === 'completed').length;
  const inProgress = allSkills.filter(s => s.status === 'in-progress').length;
  const notStarted = allSkills.filter(s => s.status === 'not-started').length;
  const projectEvidenced = allSkills.filter(s => s.isProjectEvidenced).length;
  const theoryOnlyCompleted = allSkills.filter(s => s.status === 'completed' && !s.isProjectEvidenced).length;
  
  // Readiness formula weighing project-evidenced skills higher
  const calculatedReadiness = Math.round(
    ((projectEvidenced * 1.5 + theoryOnlyCompleted * 0.8 + inProgress * 0.3) / (total * 1.5)) * 100
  );

  return {
    total,
    completed,
    inProgress,
    notStarted,
    projectEvidenced,
    theoryOnlyCompleted,
    calculatedReadiness: Math.min(calculatedReadiness, 100)
  };
}

