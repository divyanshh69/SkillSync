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

### 2. Demo Command Center Dashboard (PostgreSQL-Persisted)
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
- **AI Companion (`/companion`)**: Context-aware career mentor simulating interview talking points, resume bullet generation, and architectural advice.
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
| `User` | Student profile & learning goals | `id`, `name`, `email`, `bio`, `targetCareer`, `weeklyGoalHours`, `hoursCompletedThisWeek` |
| `Skill` | Master catalogue of competencies | `id`, `name`, `category`, `description`, `importance` |
| `UserSkill` | Student-to-Skill progress relationship | `userId`, `skillId`, `status` (*NOT_STARTED, IN_PROGRESS, COMPLETED*), `isProjectEvidenced`, `masteryScore`, `notes` |
| `Project` | Deliverables submitted as proof | `id`, `userId`, `name`, `tagline`, `description`, `technologies`, `githubUrl`, `liveDemoUrl`, `status`, `metrics` |
| `ProjectSkill` | Connects projects to verified skills | `projectId`, `skillId` |
| `RoadmapPhase` | 5 structured progression phases | `id`, `phaseNumber`, `title`, `subtitle`, `status`, `description` |
| `PhaseSkill` | Connects roadmap phases to skills | `phaseId`, `skillId`, `order` |

---

## 🔌 API Endpoints

All endpoints are hosted on `http://localhost:5001/api` by default.

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
        ├── controllers/        # Profile, Skills, Projects, Dashboard
        ├── routes/             # REST route declarations
        └── utils/
            └── readiness.ts    # Server-side readiness scoring
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
Ensure `DATABASE_URL` matches your local PostgreSQL credentials:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/skillsync?schema=public"
PORT=5001
CLIENT_URL="http://localhost:5173"
```
*(Note: Port `5001` is used by default to prevent port conflicts with macOS ControlCenter / AirPlay on `5000`)*.

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

## 🔮 What Should Be Built Next (Phase 3 Roadmap)

1. **User Authentication & Authorization**:
   - Add Clerk / Supabase Auth / NextAuth with GitHub OAuth sign-in.
2. **Automated GitHub API Ingestion**:
   - Inspect public repos, parse dependencies from `package.json`, inspect git commit history, and automatically suggest evidenced competencies.
3. **Real Gemini AI Integration**:
   - Connect Gemini 2.5 Flash / Pro API for dynamic Next Best Step recommendations, code reviews for evidence repositories, and personalized interview simulations.
4. **Public Portfolio Share Link**:
   - Generate public recruiter links (`skillsync.app/@username`) with verified badge metadata.
