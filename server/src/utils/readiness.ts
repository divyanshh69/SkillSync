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
  const careerLower = targetCareer.toLowerCase();

  if (careerLower.includes('frontend')) {
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

  if (careerLower.includes('cloud') || (careerLower.includes('backend') && !careerLower.includes('full-stack'))) {
    return {
      id: "step-cloud-docker-cicd",
      targetCareer: "Backend / Cloud Engineer",
      title: "Deploy Containerized Microservice with Docker & CI/CD",
      whyRecommended: "You have strong backend logic with Express and SQL. Packaging your service into a secure, multi-stage Docker container with automated GitHub Actions testing will prove production cloud readiness.",
      targetSkills: [
        "Docker & Containerization",
        "CI/CD with GitHub Actions",
        "Cloud Deployment & Health Checks",
        "Environment Secret Management"
      ],
      estimatedEffort: "5 - 7 hours",
      impactLevel: "Critical" as const,
      criteria: [
        {
          id: "be-c1",
          title: "Write a production multi-stage Dockerfile optimizing image size below 150MB.",
          description: "Separate build stage from runtime image, run as non-root user, and implement proper caching.",
          completed: true
        },
        {
          id: "be-c2",
          title: "Setup GitHub Actions workflow running automated unit and integration tests on pull requests.",
          description: "Automate test suite, linting, and docker build verification before merge.",
          completed: false
        },
        {
          id: "be-c3",
          title: "Deploy container to cloud service (Fly.io, Railway, or AWS ECS) with zero-downtime rolling updates.",
          description: "Configure liveness and readiness probe health endpoints.",
          completed: false
        }
      ],
      actionGuideSteps: [
        "Step 1: Create a multi-stage Dockerfile with Node.js Alpine base.",
        "Step 2: Add .dockerignore to exclude node_modules, logs, and sensitive .env files.",
        "Step 3: Write .github/workflows/deploy.yml testing the test suite on every push.",
        "Step 4: Deploy and verify production health checks."
      ],
      starterSnippet: `# Multi-stage Dockerfile example:
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
CMD ["node", "dist/index.js"]`
    };
  }

  if (careerLower.includes('ai') || careerLower.includes('ml') || careerLower.includes('intelligence')) {
    return {
      id: "step-rag-vector-search",
      targetCareer: "AI Application Engineer",
      title: "Build a RAG Pipeline with Vector Search & Embeddings",
      whyRecommended: "Retrieval-Augmented Generation (RAG) is the gold standard for production AI apps. Connecting text embeddings with vector similarity search bridges full-stack foundations into applied AI engineering.",
      targetSkills: [
        "Vector Embeddings & Search",
        "Google Gemini API Integration",
        "PostgreSQL pgvector / Vector Indexing",
        "Prompt Engineering & Context Assembly"
      ],
      estimatedEffort: "6 - 8 hours",
      impactLevel: "Critical" as const,
      criteria: [
        {
          id: "ai-c1",
          title: "Generate vector embeddings for knowledge base documents using Gemini embedding models.",
          description: "Chunk markdown or documentation into 500-token chunks with 10% overlap.",
          completed: true
        },
        {
          id: "ai-c2",
          title: "Implement cosine similarity retrieval using PostgreSQL pgvector or in-memory dot product.",
          description: "Retrieve top-K most relevant chunks given a user's natural language question.",
          completed: false
        },
        {
          id: "ai-c3",
          title: "Assemble prompt context dynamically and stream the augmented answer back to the UI.",
          description: "Add citation metadata indicating which document chunks grounded the response.",
          completed: false
        }
      ],
      actionGuideSteps: [
        "Step 1: Define schema for Document and Embedding chunks.",
        "Step 2: Generate text-embedding-004 vectors for each chunk.",
        "Step 3: Query embeddings by cosine distance.",
        "Step 4: Pass top-3 relevant contexts into Gemini systemInstruction."
      ],
      starterSnippet: `// Example vector cosine similarity:
const topChunks = await prisma.$queryRaw\`
  SELECT id, content, 1 - (embedding <=> \${queryEmbedding}::vector) AS similarity
  FROM "DocumentChunk"
  ORDER BY similarity DESC
  LIMIT 3;
\`;`
    };
  }

  if (careerLower.includes('data')) {
    return {
      id: "step-data-science-churn",
      targetCareer: "Data Scientist",
      title: "Exploratory Data Analysis & Predictive Modeling with Pandas & Scikit-Learn",
      whyRecommended: "Transforming messy tabular data into an interpretable classification model proves real-world data science competency. You will engineer features, validate assumptions, and present actionable metric lift.",
      targetSkills: [
        "Pandas DataFrames & Manipulation",
        "Data Visualization with Seaborn",
        "Feature Engineering & Encoding",
        "Supervised Learning (Classification)"
      ],
      estimatedEffort: "5 - 7 hours",
      impactLevel: "Critical" as const,
      criteria: [
        {
          id: "ds-c1",
          title: "Clean raw customer dataset, impute missing values, and engineer at least 3 predictive features.",
          description: "Perform distribution checks, handle outliers with IQR, and encode categorical variables.",
          completed: true
        },
        {
          id: "ds-c2",
          title: "Train baseline logistic regression and tuned XGBoost classifier with 5-fold cross-validation.",
          description: "Optimize for ROC-AUC and Precision/Recall trade-offs rather than raw accuracy.",
          completed: false
        },
        {
          id: "ds-c3",
          title: "Build an interactive Streamlit dashboard visualizing feature importances and scenario predictions.",
          description: "Allow business stakeholders to inspect individual customer risk scores interactively.",
          completed: false
        }
      ],
      actionGuideSteps: [
        "Step 1: Load dataset into Jupyter/Pandas and audit column data types and nulls.",
        "Step 2: Generate correlation heatmaps and boxplots with Seaborn.",
        "Step 3: Construct a Scikit-Learn ColumnTransformer pipeline with StandardScaler and OneHotEncoder.",
        "Step 4: Deploy a lightweight Streamlit app with interactive sliders."
      ],
      starterSnippet: `# Feature pipeline starter:
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

preprocessor = ColumnTransformer([
    ('num', StandardScaler(), numeric_features),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
])`
    };
  }

  if (careerLower.includes('security') || careerLower.includes('cyber')) {
    return {
      id: "step-security-packet-ids",
      targetCareer: "Cybersecurity Analyst",
      title: "Analyze Suspicious Network Traffic & Configure Snort IDS Rules",
      whyRecommended: "Inspecting raw PCAP captures and translating malicious patterns into custom Snort/Suricata intrusion detection rules is fundamental security operations tradecraft.",
      targetSkills: [
        "Network Packet Analysis (Wireshark)",
        "Intrusion Detection Systems (Snort)",
        "TCP/IP Protocols & Port Scanning",
        "Incident Reporting & Mitigation"
      ],
      estimatedEffort: "4 - 6 hours",
      impactLevel: "Critical" as const,
      criteria: [
        {
          id: "sec-c1",
          title: "Analyze a sample malicious PCAP file in Wireshark to identify port scans, brute-force attempts, or command & control beaconing.",
          description: "Trace TCP streams and isolate attacker IP addresses and payload signatures.",
          completed: true
        },
        {
          id: "sec-c2",
          title: "Write and validate two custom Snort detection rules to trigger alerts on unauthorized shell uploads.",
          description: "Test rules against test traffic and verify zero false-positives on legitimate traffic.",
          completed: false
        },
        {
          id: "sec-c3",
          title: "Draft an Incident Triage Report detailing threat actor vector, affected assets, and recommended firewall mitigations.",
          description: "Follow NIST SP 800-61 incident response documentation standards.",
          completed: false
        }
      ],
      actionGuideSteps: [
        "Step 1: Open PCAP in Wireshark and filter by 'tcp.flags.syn == 1 and tcp.flags.ack == 0'.",
        "Step 2: Inspect packet bytes for anomalous base64 payloads or unusual User-Agents.",
        "Step 3: Write Snort rule: alert tcp any any -> $HOME_NET 80 (msg:'Suspicious Payload'; content:'eval('; sid:100001;).",
        "Step 4: Format findings into executive incident summary."
      ],
      starterSnippet: `# Example custom Snort rule:
alert tcp $EXTERNAL_NET any -> $HOME_NET $HTTP_PORTS (
  msg:"EXPLOIT Web Shell Upload Attempt";
  flow:to_server,established;
  content:"multipart/form-data";
  content:".php"; nocase;
  classtype:web-application-attack;
  sid:1000001; rev:1;
)`
    };
  }

  if (careerLower.includes('design') || careerLower.includes('ui') || careerLower.includes('ux')) {
    return {
      id: "step-uiux-design-system",
      targetCareer: "UI/UX Designer",
      title: "Design a Reusable Figma Design System with Component Tokens & Auto-Layout",
      whyRecommended: "Creating a scalable design system demonstrates understanding of typography hierarchies, WCAG contrast accessibility, component variance, and developer handoff best practices.",
      targetSkills: [
        "Figma Auto-Layout & Constraints",
        "Component Architecture & Interactive Variants",
        "Design Token Architecture",
        "Accessibility Testing (WCAG 2.1 AA)"
      ],
      estimatedEffort: "5 - 7 hours",
      impactLevel: "Very High" as const,
      criteria: [
        {
          id: "ui-c1",
          title: "Establish semantic color, typography, and spacing variables in Figma with dark mode support.",
          description: "Ensure all color pairings meet minimum 4.5:1 contrast ratios for WCAG AA compliance.",
          completed: true
        },
        {
          id: "ui-c2",
          title: "Build a production component library (Buttons, Form Inputs, Modals, Cards) using nested Auto-Layout and interactive variant states.",
          description: "Cover default, hover, active, focused, and disabled states.",
          completed: false
        },
        {
          id: "ui-c3",
          title: "Create an interactive prototype demonstrating a responsive multi-step checkout or dashboard flow with developer handoff specs.",
          description: "Include responsive constraints and documented token naming conventions.",
          completed: false
        }
      ],
      actionGuideSteps: [
        "Step 1: Set up Figma Local Variables for color tokens (Primary, Neutral, Success, Danger).",
        "Step 2: Define typography scale (Heading XL to Body Small) based on an 8pt grid.",
        "Step 3: Build atomic button components with variant properties (size, variant, state, iconLeading).",
        "Step 4: Prototype transitions with Figma Smart Animate (300ms ease-out)."
      ],
      starterSnippet: `// Token naming schema for developer handoff:
{
  "color": {
    "brand": { "500": "#6366f1", "600": "#4f46e5" },
    "surface": { "canvas": "#020617", "card": "#0f172a" },
    "text": { "primary": "#f8fafc", "muted": "#94a3b8" }
  },
  "spacing": { "1": "4px", "2": "8px", "4": "16px", "6": "24px" }
}`
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

