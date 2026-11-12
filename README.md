# SkillSync 🚀

> **Your career journey, one clear step at a time.**  
> An AI-powered career journey companion for students and early-career learners.

SkillSync replaces tutorial paralysis with an evidence-driven roadmap. It tracks real competencies, turns GitHub repositories and live deployments into project evidence, and dynamically computes one high-impact **Next Best Step** based on current progress.

---

## 🌟 Key Features

### 1. Polished Landing Page
- **Hero**: Clear value proposition, "Explore Demo" and "Start Your Journey" CTAs, trust signals, and an interactive preview of the Command Center.
- **How It Works**: 3-step loop (Set Target Direction, Prove with Real Code, Take the Next Best Step).
- **Features Grid**: Highlighting the Next Best Step algorithm, verified evidence ledger, milestone roadmaps, AI companion, and weighted readiness scoring.

### 2. Personalized Career Onboarding Flow
- **4-Step Guided Wizard**: Beginner-friendly setup before landing on the dashboard:
  1. *About You*: Full name and education/field of study with quick-select chips (Computer Science, Self-taught, Bootcamper, Engineering, Design).
  2. *Career Target*: 8 tailored career tracks (Full-Stack, Frontend, Backend, Data Science, AI/ML, Cybersecurity, UI/UX, or custom Other).
  3. *Experience Level*: Adaptive baseline selection (Beginner, Some Experience, Comfortable with Basics) explaining starting pace and initial phase completion.
  4. *Weekly Commitment*: Interactive study time picker (5, 10, 15, 20+ hrs/week) with estimated completion quarters and confirmation summary.
- **Instant PostgreSQL Roadmap Generation**:
  - Automatically seeds a 5-phase career-specific competency roadmap.
  - Pre-completes Phase 1 or 2 according to experience level, accurately setting starting career readiness.
  - Automatically provisions a career-specific high-impact **Next Best Step** with interactive criteria and starter code.
- **Dynamic AI Grounding**: Immediately provides the Gemini Career Assistant with the student's name, field of study, experience level, and personalized roadmap.

### 3. GitHub Profile & Project Integration
- **Public GitHub Profile Connection**:
  - Connect your public GitHub username (no OAuth or credentials required).
  - Fetches GitHub profile details: avatar, name, bio, public repo count, followers, and profile link.
  - Automatically persists the student's GitHub handle in their PostgreSQL profile.
- **Repository Browser & Skill Extraction**:
  - Automatically fetches the student's public repositories sorted by recent updates.
  - Detects primary programming languages, stargazers, forks, repository topics, and technologies.
  - Suggests matching SkillSync curriculum competencies with human-readable rationale (e.g. *"Detected HTML in repository metadata"*, *"Git repository version control"*).
- **One-Click Evidence Import**:
  - "Import as Project" review modal lets students customize name, tagline, description, technologies, and toggle suggested skills.
  - Commits directly to PostgreSQL as a persistent project with `source: "github"`.
  - Links project skills, marks matching competencies as `isProjectEvidenced: true`, and advances their progress.
  - Automatically recalculates overall career readiness and shifts the student's **Next Best Step**.
- **Accidental Duplicate Import Prevention**:
  - Prevents importing the same repository twice via case-insensitive URL normalization and GitHub repository ID checks.
  - Already-imported repositories are clearly marked with an `"Imported"` badge in the browser and their import button is disabled.
  - Backend enforces duplicate rejection returning HTTP 409 Conflict with friendly feedback.
- **AI Career Assistant Grounding**:
  - The student's GitHub handle and imported GitHub projects are fed directly into the Google Gemini context as verified public work, enabling personalized resume bullet points, architectural reviews, and code recommendations.

### 4. GitHub Repository Analysis for Project Evidence
- **Automated Public Repository Inspection**: Enter any public GitHub repository URL (`https://github.com/owner/repo`) to analyze technologies and extract project evidence.
- **Deterministic Manifest & Dependency Analysis**:
  - `package.json`: Detects React, TypeScript, Tailwind CSS, Express, Prisma, Zustand, Vitest, JWT, Axios, and more.
  - `requirements.txt` / `pyproject.toml`: Detects Python, Flask, Django, FastAPI, Pandas, NumPy, Scikit-Learn, PyTorch, and Pytest.
  - Root File Signatures: Detects Docker (`Dockerfile`, `docker-compose.yml`), CI/CD (`.github/workflows`), Prisma ORM (`schema.prisma`), TypeScript (`tsconfig.json`), and Vite (`vite.config.ts`).
  - GitHub REST API: Extracts stars, primary language, topics, and verified file tree without cloning or running arbitrary code.
- **Transparent Skill Mapping & Review**:
  - Maps detected technologies directly to the student's roadmap competencies with clear human explanations (e.g., *"Detected 'react' in package.json dependencies"*).
  - Review screen displays repository summary, detected files, and detected technologies.
  - Student has full agency: can accept, adjust, or remove individual suggested skills before saving.
  - Evidence and relationships are committed to PostgreSQL only when the student confirms and clicks "Save Project & Evidence".

### 4. Dynamic Personalized Next Step Engine
- **Real-Time Progress Analysis**: Automatically determines the student's highest-leverage next action based on their live database records:
  - Analyzes current roadmap phase, completed skills, in-progress tasks, and missing project evidence.
  - Prioritizes unevidenced skills over already-evidenced competencies so students continually expand their verified portfolio.
  - Adapts immediately when skill statuses change, projects are added/deleted, or careers are switched.
- **Actionable Mentor Guidance**:
  - Provides structured recommendations: `title`, `description`, `reason`, `suggestedAction`, `relatedSkills`, `estimatedEffort`, and `priority`.
  - Avoids repetitive, generic prompts (e.g. shifts dynamically between *"Strengthen your PostgreSQL skills"*, *"Add authentication to your existing project"*, *"Containerize your application with Docker"*, and career-specific tasks).
- **Gemini Assistant Context Integration**: Directly feeds the dynamically calculated recommendation and checklist criteria into Gemini's system instructions, ensuring the AI mentor always advises on the exact active priority.

### 5. Demo Command Center Dashboard (PostgreSQL-Persisted)
- **Target Career**: Full-Stack Developer (with customizer for Frontend, Backend/Cloud, and AI tracks).
- **Next Best Step Hero Card**:
  - Recommendation: *Build a REST API with authentication*
  - Contextual explanation of why it is recommended now
  - Skills demonstrated (*Node.js / Express, JWT Authentication, PostgreSQL & Prisma, API Security*)
  - Estimated effort (*6 - 8 hours • Critical Impact*)
  - 3 interactive completion criteria checkboxes with live state tracking
  - Interactive **Action Guide modal** featuring step-by-step instructions, REST route architecture blueprint, and TypeScript middleware starter snippet
- **Career Readiness Progress**:
  - Interactive circular readiness gauge (68% → 76% potential)
  - Clear visual distinction between **Completed** (coursework/theory) vs. **Project-Evidenced** (backed by verifiable code in repositories, receiving 2x weight)
  - Breakdown of Completed (14), Project-Evidenced (9), In Progress (4), and Upcoming (10) skills
  - Segmented distribution bar
- **Current Roadmap Preview**:
  - Phase 3: *Backend Foundations & API Engineering* (Current Focus)
  - Detailed skills list with status tags (*Completed, In Progress, Not Started*) and project-evidenced badges
- **Recent Project Evidence**:
  - 3 realistic student deliverables:
    1. **DevPulse Analytics**: Developer productivity metrics dashboard (React 18, TypeScript, Tailwind, Recharts)
    2. **ShopNest Storefront**: Headless e-commerce client with optimistic cart state (React, Zustand, Stripe)
    3. **TaskForge CLI**: Developer terminal tool for repo scaffolding & git hooks (Node.js, Commander.js)
  - Interactive **"+ Add Project Evidence"** modal: submits new repositories and links them to competencies, instantly persisted in PostgreSQL!

### 3. Integrated Subviews (Zero Dead Placeholders)
- **My Roadmap (`/roadmap`)**: Full 5-phase breakdown from Frontend Foundations to Cloud Systems with category/status filters, plus interactive status changing directly synced to PostgreSQL.
- **Projects (`/projects`)**: Complete evidence ledger with live demo / GitHub links, search filtering, and skill tags.
- **Career Assistant (`/companion`)**: AI-powered career mentor connected to **Google Gemini** (`gemini-2.5-flash`), grounded in the student's live PostgreSQL database (profile, skills, projects, and active Next Best Step).
- **Profile (`/profile`)**: Student bio, track switcher, and interactive study velocity logging, persisted to PostgreSQL.

---

## 🛠️ Full-Stack Technology Architecture

### Frontend
- **React 18** + **TypeScript**
- **Vite** (bundler)
- **Tailwind CSS** (Custom refined dark theme)
- **Lucide React** (Modern iconography)

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **@google/genai** (Google Gemini API SDK)
- **CORS** & **Dotenv**
- RESTful JSON architecture

### Database & Persistence
- **PostgreSQL 16**
- **Prisma ORM 5**
- Fully automated migration history (`server/prisma/migrations`)
- Production-grade schema & relationships

---

## 🗄️ Database Models (`schema.prisma`)

| Model | Purpose | Key Fields |
|---|---|---|
| `User` | Student profile & learning goals | `id`, `name`, `email`, `bio`, `targetCareer`, `experienceLevel`, `isOnboarded`, `githubUsername`, `weeklyGoalHours`, `hoursCompletedThisWeek` |
| `Skill` | Master catalogue of competencies | `id`, `name`, `category`, `description`, `importance` |
| `UserSkill` | Student-to-Skill progress relationship | `userId`, `skillId`, `status` (*NOT_STARTED, IN_PROGRESS, COMPLETED*), `isProjectEvidenced`, `masteryScore`, `notes` |
| `Project` | Deliverables submitted as proof | `id`, `userId`, `name`, `tagline`, `description`, `technologies`, `source` (*manual, github*), `githubRepoId`, `githubUrl`, `liveDemoUrl`, `status`, `metrics` |
| `ProjectSkill` | Connects projects to verified skills | `projectId`, `skillId` |
| `RoadmapPhase` | 5 structured progression phases | `id`, `phaseNumber`, `title`, `subtitle`, `status`, `description` |
| `PhaseSkill` | Connects roadmap phases to skills | `phaseId`, `skillId`, `order` |

---

## 🔌 API Endpoints

All endpoints are hosted on `http://localhost:5001/api` by default.

### Onboarding & Personalization
- `POST /api/onboarding` — Submits student name, education, target career, experience level, and weekly study hours. Automatically generates a 5-phase career roadmap in PostgreSQL, seeds skills calibrated to experience, calculates starting readiness, and returns the personalized profile and Next Best Step.
- `GET /api/onboarding/status` — Retrieves user onboarding status (`isOnboarded`, `name`, `targetCareer`, `experienceLevel`).
- `POST /api/onboarding/reset` — Resets `isOnboarded` to `false` for user testing or retaking onboarding.

### Profile
- `GET /api/profile` — Retrieve current demo student profile.
- `PUT /api/profile` — Update student profile (bio, target career, weekly hours, `githubUsername`, etc.).

### GitHub Profile & Repository Integration
- `GET /api/github/user/:username` — Fetches public GitHub user profile (avatar, bio, followers, public repo count, htmlUrl) without OAuth.
- `GET /api/github/user/:username/repos` — Fetches public repositories sorted by recent updates, cross-checks against already imported projects (`isAlreadyImported`), extracts detected technologies, and maps suggested competencies to the SkillSync database.
- `POST /api/github/import` — Imports a selected GitHub repository as a persistent project in PostgreSQL with `source: 'github'`, links selected skills, updates `isProjectEvidenced`, and recalculates readiness. Prevents duplicate imports (returns HTTP 409).
- `POST /api/github/analyze` — Analyzes an individual public GitHub repository URL (`repositoryUrl`), inspecting manifest files (`package.json`, `requirements.txt`, Dockerfiles) to extract technologies and skills.

### Skills
- `GET /api/skills` — Retrieve all skills with user status and project evidence lists.
- `PATCH /api/skills/:id` — Update skill status (`completed`, `in-progress`, `not-started`), mastery score, or notes.

### Projects & Repository Evidence
- `GET /api/projects` — Retrieve all projects with evidenced skill names, source (`manual` or `github`), and repo metadata.
- `POST /api/projects` — Submit project evidence, automatically creating skill evidence links in PostgreSQL.
- `DELETE /api/projects/:id` — Remove a project and recalculate evidence links.

### Dashboard & Recommendations
- `GET /api/dashboard` — Aggregated command-center payload including profile, weighted readiness score, dynamic Next Best Step, roadmap phases, and recent projects.
- `GET /api/dashboard/next-step` — Returns the dynamically calculated Next Best Step recommendation with title, description, reason, suggestedAction, relatedSkills, effort, and priority.

### Career Assistant (Gemini AI)
- `POST /api/ai/chat` — Context-aware career mentoring powered by Google Gemini. Body: `{ message: string, history?: Array<{ role: string, content: string }> }`. Retrieves student profile, skills, projects, and active Next Best Step from PostgreSQL to construct rich system guidance.

### Health
- `GET /api/health` — System health check.

---

## 📁 Project Structure

```text
SkillSync/
├── .env.example                # Root environment template
├── index.html                  # HTML entry with Google Fonts Inter
├── package.json                # Frontend deps & unified root run scripts
├── postcss.config.js           # PostCSS Tailwind config
├── tailwind.config.js          # Tailwind theme config
├── tsconfig.json               # Frontend TypeScript config
├── vite.config.ts              # Vite bundler config
├── src/                        # React Frontend
│   ├── main.tsx
│   ├── App.tsx                 # Reactive app shell connected to backend API
│   ├── index.css               # Styling & glow effects
│   ├── vite-env.d.ts           # Vite env types
│   ├── types/
│   │   └── index.ts            # Frontend TypeScript interfaces
│   ├── data/
│   │   └── demoData.ts         # Realistic fallback data & formula
│   ├── services/
│   │   └── api.ts              # Fetch API client for backend
│   ├── utils/
│   │   └── cn.ts               # Classname merger
│   └── components/
│       ├── common/             # Badges and Modal
│       ├── landing/            # Landing page components
│       ├── onboarding/         # 4-step personalized career wizard
│       ├── dashboard/          # Command center, Next Best Step & Readiness
│       ├── roadmap/            # 5-phase interactive roadmap
│       ├── projects/           # Projects evidence ledger
│       ├── companion/          # AI Career Companion chat
│       └── profile/            # Student profile & velocity tracker
└── server/                     # Express & Prisma Backend
    ├── .env.example            # Backend environment template
    ├── package.json            # Backend deps (Express, Prisma, TypeScript, TSX)
    ├── tsconfig.json           # Backend TypeScript config
    ├── prisma/
    │   ├── schema.prisma       # Database schema
    │   ├── migrations/         # PostgreSQL migration history
    │   └── seed.ts             # Complete database seed script
    └── src/
        ├── index.ts            # Express server initialization
        ├── config/
        │   └── prisma.ts       # Prisma Client singleton
        ├── controllers/        # Profile, Skills, Projects, Dashboard, Onboarding, GitHub, AI
        ├── routes/             # REST route declarations (Profile, Skills, Projects, Dashboard, Onboarding, GitHub, AI)
        ├── services/
        │   ├── geminiService.ts # Gemini AI client & student context aggregator
        │   └── githubService.ts # GitHub API client, manifest analysis & deterministic skill mapping
        └── utils/
            ├── readiness.ts    # Server-side readiness scoring
            └── roadmapTemplates.ts # Comprehensive 5-phase roadmaps for 8 career paths
```

---

## 🚀 How to Run the Application

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v24)
- **PostgreSQL**: Running locally on port `5432`

### 2. Configure Environment Variables
Copy `.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```
Ensure `DATABASE_URL` matches your local PostgreSQL credentials and provide your Gemini API key:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/skillsync?schema=public"
PORT=5001
CLIENT_URL="http://localhost:5173"

# Google Gemini API (Get a free key at https://aistudio.google.com/app/apikey)
GEMINI_API_KEY="your_actual_gemini_api_key_here"
GEMINI_MODEL="gemini-2.5-flash"
```
*(Note: Port `5001` is used by default to prevent port conflicts with macOS ControlCenter / AirPlay on `5000`)*.
*(Note: If `GEMINI_API_KEY` is not provided, the Career Assistant gracefully operates in guided mode, displaying instructions on how to activate live AI without breaking the application)*.

### 3. Database Migration & Seeding
From the project root:
```bash
# Run Prisma migrations
npm run db:migrate

# Seed demo student, skills, roadmap phases, and projects
npm run db:seed
```

### 4. Start Both Frontend & Backend Concurrently
From the project root:
```bash
npm run dev
```
This runs:
- **Client**: `http://localhost:5173`
- **Server**: `http://localhost:5001`

### 5. Alternatively, Run Services Individually
```bash
# Terminal 1: Backend Server
npm run dev:server

# Terminal 2: Vite Frontend
npm run dev:client
```

---

## 🔮 What Should Be Built Next (Phase 4 Roadmap)

1. **User Authentication & Authorization**:
   - Add Clerk / Supabase Auth / NextAuth with GitHub OAuth sign-in.
2. **Automated GitHub API Ingestion**:
   - Inspect public repos, parse dependencies from `package.json`, inspect git commit history, and automatically suggest evidenced competencies.
3. **Multi-Model Support & Voice Companion**:
   - Add streaming audio / speech input via Gemini Live API for real-time behavioral interview mock practice.
4. **Public Portfolio Share Link**:
   - Generate public recruiter links (`skillsync.app/@username`) with verified badge metadata.
