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

### 3. Demo Command Center Dashboard (PostgreSQL-Persisted)
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
| `User` | Student profile & learning goals | `id`, `name`, `email`, `bio`, `targetCareer`, `experienceLevel`, `isOnboarded`, `weeklyGoalHours`, `hoursCompletedThisWeek` |
| `Skill` | Master catalogue of competencies | `id`, `name`, `category`, `description`, `importance` |
| `UserSkill` | Student-to-Skill progress relationship | `userId`, `skillId`, `status` (*NOT_STARTED, IN_PROGRESS, COMPLETED*), `isProjectEvidenced`, `masteryScore`, `notes` |
| `Project` | Deliverables submitted as proof | `id`, `userId`, `name`, `tagline`, `description`, `technologies`, `githubUrl`, `liveDemoUrl`, `status`, `metrics` |
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
- `PUT /api/profile` — Update student profile (bio, target career, weekly hours, etc.).

### Skills
- `GET /api/skills` — Retrieve all skills with user status and project evidence lists.
- `PATCH /api/skills/:id` — Update skill status (`completed`, `in-progress`, `not-started`), mastery score, or notes.

### Projects
- `GET /api/projects` — Retrieve all projects with evidenced skill names.
- `POST /api/projects` — Submit project evidence, automatically creating skill evidence links in PostgreSQL.
- `DELETE /api/projects/:id` — Remove a project and recalculate evidence links.

### Dashboard
- `GET /api/dashboard` — Aggregated command-center payload including profile, weighted readiness score, active Next Best Step, roadmap phases, and recent projects.

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
        ├── controllers/        # Profile, Skills, Projects, Dashboard, Onboarding, AI
        ├── routes/             # REST route declarations (Profile, Skills, Projects, Dashboard, Onboarding, AI)
        ├── services/
        │   └── geminiService.ts # Gemini AI client & student context aggregator
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
