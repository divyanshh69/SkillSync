import { PrismaClient, SkillStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SkillSync database...');

  // Clean existing data
  await prisma.projectSkill.deleteMany();
  await prisma.phaseSkill.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.roadmapPhase.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Demo User
  const demoUser = await prisma.user.create({
    data: {
      id: 'demo_user_alex',
      name: 'Alex Rivera',
      email: 'alex@skillsync.dev',
      handle: '@alexrivera_dev',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      bio: '3rd-year Computer Science student transitioning from building static frontend web apps into production-ready full-stack software systems.',
      education: 'B.S. in Computer Science • University of Washington (Class of 2026)',
      targetCareer: 'Full-Stack Developer',
      weeklyGoalHours: 15,
      hoursCompletedThisWeek: 11.5,
      targetCompletionQuarter: 'Target: Q3 2026 Ready'
    }
  });

  console.log(`👤 Created demo user: ${demoUser.name} (${demoUser.email})`);

  // 2. Define Skills Definitions
  const skillsData = [
    // Phase 1
    { name: "Modern JavaScript (ES6+)", category: "Frontend", importance: "Essential", description: "Async/await, closures, promises, destructuring, array methods, and event loop." },
    { name: "HTML5 & Semantic Web", category: "Frontend", importance: "Essential", description: "Semantic markup, accessibility landmarks, form validation, and SEO best practices." },
    { name: "CSS3 & Modern Tailwind", category: "Frontend", importance: "Essential", description: "Utility-first design, flexbox/grid layout systems, responsive breakpoints, and animations." },
    { name: "Git & Version Control", category: "DevOps & Tooling", importance: "Essential", description: "Branching workflows, conventional commits, rebase, merge conflict resolution, and PR reviews." },
    { name: "TypeScript Fundamentals", category: "Frontend", importance: "Essential", description: "Static typing, generics, utility types, unions, and strict compiler configs." },

    // Phase 2
    { name: "React 18 & Component Patterns", category: "Frontend", importance: "Essential", description: "Hooks, reconciliation, component composition, custom hooks, and concurrent features." },
    { name: "State Management (Zustand/Context)", category: "Frontend", importance: "Recommended", description: "Client store architecture, selector subscriptions, state hydration, and persistence." },
    { name: "Asynchronous Data Fetching", category: "Frontend", importance: "Essential", description: "REST querying, abort controllers, loading states, cache invalidation, and error boundaries." },
    { name: "Responsive & Mobile-First Design", category: "Frontend", importance: "Essential", description: "Mobile layout viewports, touch targets, container queries, and cross-browser testing." },
    { name: "Component Testing with Vitest", category: "DevOps & Tooling", importance: "Recommended", description: "Unit testing React components with Testing Library, user event mocks, and test coverage." },

    // Phase 3
    { name: "Node.js & Express Fundamentals", category: "Backend & APIs", importance: "Essential", description: "HTTP modules, middleware pipelines, error handling, route handlers, and stream I/O." },
    { name: "RESTful API Design & Routing", category: "Backend & APIs", importance: "Essential", description: "Resource-oriented endpoints, HTTP status codes, pagination, and request validation." },
    { name: "JWT Authentication & Security", category: "Backend & APIs", importance: "Essential", description: "Access & refresh token rotation, bcrypt hashing, httpOnly cookies, and route guards." },
    { name: "PostgreSQL & Relational Schemas", category: "Databases", importance: "Essential", description: "Normalization, primary & foreign keys, indexing, ACID transactions, and joins." },
    { name: "Prisma / Drizzle ORM", category: "Databases", importance: "Recommended", description: "Type-safe database queries, schema modeling, relationships, and migration generation." },
    { name: "API Documentation (OpenAPI/Swagger)", category: "Backend & APIs", importance: "Recommended", description: "Interactive API documentation, contract specification, and schema definitions." },

    // Phase 4
    { name: "Next.js App Router & Server Actions", category: "Frontend", importance: "Essential", description: "Server components, streaming SSR, layouts, route handlers, and server actions." },
    { name: "Redis Caching & Session Storage", category: "Databases", importance: "Recommended", description: "Key-value cache eviction policies, TTL, pub/sub, and distributed session storage." },
    { name: "WebSockets & Event-Driven APIs", category: "Backend & APIs", importance: "Recommended", description: "Bidirectional real-time channels, Socket.io, heartbeat pings, and reconnection logic." },
    { name: "Docker Containerization", category: "DevOps & Tooling", importance: "Recommended", description: "Dockerfiles, multi-stage builds, docker-compose orchestration, and volume mounts." },

    // Phase 5
    { name: "CI/CD with GitHub Actions", category: "DevOps & Tooling", importance: "Essential", description: "Automated linting, test suites, Docker image building, and automated deployment pipelines." },
    { name: "Cloud Deployment (AWS/Render/Vercel)", category: "DevOps & Tooling", importance: "Essential", description: "Environment variables, SSL certificates, custom domains, and edge runtime configuration." },
    { name: "System Design & Microservices Basics", category: "Architecture & Security", importance: "Recommended", description: "Load balancing, horizontal scaling, database replication, and CAP theorem trade-offs." },
    { name: "Error Monitoring & Telemetry (Sentry)", category: "DevOps & Tooling", importance: "Recommended", description: "Application observability, distributed tracing, source maps, and exception logging." }
  ];

  // Insert Skills into Database
  const createdSkillsMap = new Map<string, string>(); // name -> id
  for (const s of skillsData) {
    const created = await prisma.skill.create({
      data: s
    });
    createdSkillsMap.set(s.name, created.id);
  }
  console.log(`⚡ Inserted ${createdSkillsMap.size} skills.`);

  // 3. Define Roadmap Phases
  const phasesData = [
    {
      phaseNumber: 1,
      title: "Frontend & Core Web Foundations",
      subtitle: "Mastering the browser runtime, semantic HTML, and modern JS",
      status: "completed",
      description: "Foundational mastery of browser APIs, clean component hierarchies, and collaborative git workflows.",
      skillNames: [
        "Modern JavaScript (ES6+)",
        "HTML5 & Semantic Web",
        "CSS3 & Modern Tailwind",
        "Git & Version Control",
        "TypeScript Fundamentals"
      ]
    },
    {
      phaseNumber: 2,
      title: "Reactive Web & State Architecture",
      subtitle: "Production UI development, state management, and performance",
      status: "completed",
      description: "Building resilient client-side applications with reactive state lifecycles and accessible component primitives.",
      skillNames: [
        "React 18 & Component Patterns",
        "State Management (Zustand/Context)",
        "Asynchronous Data Fetching",
        "Responsive & Mobile-First Design",
        "Component Testing with Vitest"
      ]
    },
    {
      phaseNumber: 3,
      title: "Backend Foundations & API Engineering",
      subtitle: "Current Focus: Server runtimes, relational databases & secure APIs",
      status: "in-progress",
      description: "Architecting reliable server-side services with authenticated boundaries, transactional safety, and clean API contracts.",
      skillNames: [
        "Node.js & Express Fundamentals",
        "RESTful API Design & Routing",
        "JWT Authentication & Security",
        "PostgreSQL & Relational Schemas",
        "Prisma / Drizzle ORM",
        "API Documentation (OpenAPI/Swagger)"
      ]
    },
    {
      phaseNumber: 4,
      title: "Full-Stack Integration & Scalability",
      subtitle: "SSR, real-time channels, caching layers, and containerization",
      status: "upcoming",
      description: "Bridging client and server into unified frameworks with distributed caches and containerized runtimes.",
      skillNames: [
        "Next.js App Router & Server Actions",
        "Redis Caching & Session Storage",
        "WebSockets & Event-Driven APIs",
        "Docker Containerization"
      ]
    },
    {
      phaseNumber: 5,
      title: "Production Systems & Cloud Delivery",
      subtitle: "CI/CD automation, cloud deployment, and system observability",
      status: "upcoming",
      description: "Delivering resilient multi-tier applications to cloud infrastructure with automated quality gates and telemetry.",
      skillNames: [
        "CI/CD with GitHub Actions",
        "Cloud Deployment (AWS/Render/Vercel)",
        "System Design & Microservices Basics",
        "Error Monitoring & Telemetry (Sentry)"
      ]
    }
  ];

  for (const p of phasesData) {
    const createdPhase = await prisma.roadmapPhase.create({
      data: {
        phaseNumber: p.phaseNumber,
        title: p.title,
        subtitle: p.subtitle,
        status: p.status,
        description: p.description
      }
    });

    for (let i = 0; i < p.skillNames.length; i++) {
      const skillName = p.skillNames[i];
      const skillId = createdSkillsMap.get(skillName);
      if (skillId) {
        await prisma.phaseSkill.create({
          data: {
            phaseId: createdPhase.id,
            skillId: skillId,
            order: i
          }
        });
      }
    }
  }
  console.log(`🗺️ Seeded ${phasesData.length} roadmap phases.`);

  // 4. Create Sample Projects
  const projectsData = [
    {
      name: "DevPulse Analytics",
      tagline: "Developer productivity & focus metrics dashboard",
      description: "Engineered a performant single-page analytics application featuring customizable productivity widgets, local storage state caching, and responsive SVG visual charts. Implemented custom hooks for debounce and window resize telemetry.",
      technologies: ["React 18", "TypeScript", "Tailwind CSS", "Recharts", "Lucide Icons"],
      githubUrl: "https://github.com/alexrivera/devpulse-analytics",
      liveDemoUrl: "https://devpulse-preview.web.app",
      status: "Completed",
      metrics: "99/100 Lighthouse Performance • 4.8s time-to-interactive on mobile",
      completionDate: "October 2024",
      featured: true,
      evidencedSkillNames: [
        "React 18 & Component Patterns",
        "TypeScript Fundamentals",
        "Modern JavaScript (ES6+)",
        "Responsive & Mobile-First Design",
        "Asynchronous Data Fetching",
        "CSS3 & Modern Tailwind",
        "Git & Version Control"
      ]
    },
    {
      name: "ShopNest Storefront",
      tagline: "Headless e-commerce client with optimistic cart state",
      description: "Constructed a multi-route responsive storefront featuring client-side faceted product filters, persistent cart synchronization across tabs via Zustand, checkout form validation, and toast notifications.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Stripe Elements"],
      githubUrl: "https://github.com/alexrivera/shopnest-client",
      liveDemoUrl: "https://shopnest-store.vercel.app",
      status: "Completed",
      metrics: "Sub-120ms search filter response • 100% accessible keyboard navigation",
      completionDate: "December 2024",
      featured: true,
      evidencedSkillNames: [
        "State Management (Zustand/Context)",
        "Modern JavaScript (ES6+)",
        "HTML5 & Semantic Web",
        "Git & Version Control",
        "CSS3 & Modern Tailwind",
        "Responsive & Mobile-First Design"
      ]
    },
    {
      name: "TaskForge CLI",
      tagline: "Developer terminal tool for repo scaffolding & git hooks",
      description: "Authored an interactive command-line interface in Node.js to automate git pre-commit quality checks, lint staged files, and generate conventional commit messages with custom prompt helpers.",
      technologies: ["Node.js", "TypeScript", "Commander.js", "Chalk", "Inquirer"],
      githubUrl: "https://github.com/alexrivera/taskforge-cli",
      liveDemoUrl: undefined,
      status: "Completed",
      metrics: "Published to npm • 600+ downloads",
      completionDate: "January 2025",
      featured: false,
      evidencedSkillNames: [
        "Node.js & Express Fundamentals",
        "Git & Version Control",
        "TypeScript Fundamentals"
      ]
    }
  ];

  // Set to collect all skills evidenced across projects
  const evidencedSkillNamesSet = new Set<string>();

  for (const projData of projectsData) {
    const { evidencedSkillNames, ...projectFields } = projData;
    const createdProject = await prisma.project.create({
      data: {
        ...projectFields,
        userId: demoUser.id
      }
    });

    for (const skillName of evidencedSkillNames) {
      evidencedSkillNamesSet.add(skillName);
      const skillId = createdSkillsMap.get(skillName);
      if (skillId) {
        await prisma.projectSkill.create({
          data: {
            projectId: createdProject.id,
            skillId: skillId
          }
        });
      }
    }
  }
  console.log(`📁 Seeded ${projectsData.length} projects.`);

  // 5. Connect User to Skills (UserSkill records)
  // Status mapping:
  // Phase 1 (s1-s5): COMPLETED
  // Phase 2 (s6-s10): COMPLETED
  // Phase 3:
  // - Node.js: COMPLETED
  // - RESTful API: COMPLETED (theory)
  // - JWT Auth: IN_PROGRESS
  // - PostgreSQL: IN_PROGRESS
  // - Prisma: NOT_STARTED
  // - OpenAPI: NOT_STARTED
  // Phases 4-5: NOT_STARTED

  const completedSkillNames = [
    "Modern JavaScript (ES6+)",
    "HTML5 & Semantic Web",
    "CSS3 & Modern Tailwind",
    "Git & Version Control",
    "TypeScript Fundamentals",
    "React 18 & Component Patterns",
    "State Management (Zustand/Context)",
    "Asynchronous Data Fetching",
    "Responsive & Mobile-First Design",
    "Component Testing with Vitest",
    "Node.js & Express Fundamentals",
    "RESTful API Design & Routing"
  ];

  const inProgressSkillNames = [
    "JWT Authentication & Security",
    "PostgreSQL & Relational Schemas"
  ];

  for (const [skillName, skillId] of createdSkillsMap.entries()) {
    let status: SkillStatus = SkillStatus.NOT_STARTED;
    let masteryScore = 0;

    if (completedSkillNames.includes(skillName)) {
      status = SkillStatus.COMPLETED;
      masteryScore = 80 + Math.floor(Math.random() * 15);
    } else if (inProgressSkillNames.includes(skillName)) {
      status = SkillStatus.IN_PROGRESS;
      masteryScore = 40 + Math.floor(Math.random() * 15);
    }

    const isEvidenced = evidencedSkillNamesSet.has(skillName);

    await prisma.userSkill.create({
      data: {
        userId: demoUser.id,
        skillId: skillId,
        status: status,
        isProjectEvidenced: isEvidenced,
        masteryScore: masteryScore
      }
    });
  }

  console.log(`🔗 Linked UserSkills for user: ${demoUser.name}`);
  console.log('✅ SkillSync database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

