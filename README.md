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

### 2. Demo Command Center Dashboard
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
  - Interactive **"+ Add Project Evidence"** modal to submit new repositories and link them to competencies in real-time

### 3. Integrated Subviews (Zero Dead Placeholders)
- **My Roadmap (`/roadmap`)**: Full 5-phase breakdown from Frontend Foundations to Cloud Systems with category and status filters.
- **Projects (`/projects`)**: Complete evidence ledger with live demo / GitHub links, search filtering, and skill tags.
- **AI Companion (`/companion`)**: Context-aware career mentor simulating interview talking points, resume bullet generation, and architectural advice.
- **Profile (`/profile`)**: Student bio, track switcher, and interactive study velocity logging.

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS** (Custom refined dark theme)
- **Lucide React** (Modern iconography)

---

## 📁 Project Structure

```text
SkillSync/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx                     # Main app router & reactive demo state
    ├── index.css                   # Custom theme directives & scrollbars
    ├── types/
    │   └── index.ts                # TypeScript interfaces (Skill, Project, Roadmap, etc.)
    ├── data/
    │   └── demoData.ts             # Realistic demo student data & readiness formula
    ├── utils/
    │   └── cn.ts                   # Class name merger
    └── components/
        ├── common/
        │   ├── Badge.tsx           # Status, Evidence, and Impact badges
        │   └── Modal.tsx           # Reusable modal container
        ├── landing/
        │   ├── LandingNavbar.tsx   # Top navigation header
        │   ├── LandingHero.tsx     # Hero banner with visual dashboard preview
        │   ├── HowItWorks.tsx      # 3-step value proposition
        │   ├── FeaturesGrid.tsx    # 6 feature highlight cards
        │   └── LandingFooter.tsx   # Footer
        ├── dashboard/
        │   ├── DashboardLayout.tsx # Responsive shell with top bar and mobile drawer
        │   ├── Sidebar.tsx         # Sidebar navigation with active tabs
        │   ├── NextBestStepHero.tsx# Prominent Next Best Step hero card
        │   ├── CareerReadiness.tsx # Visual progress summary & distinction callout
        │   ├── RoadmapPreview.tsx  # Phase 3 skills preview
        │   └── ProjectEvidence.tsx # Recent evidence with links & modal trigger
        ├── roadmap/
        │   └── RoadmapView.tsx     # Full 5-phase interactive roadmap
        ├── projects/
        │   ├── ProjectsView.tsx    # Evidence ledger gallery with search
        │   └── AddProjectModal.tsx # Form to attach code and prove skills
        ├── companion/
        │   └── CompanionView.tsx   # Simulated AI mentor with prompts & advice
        └── profile/
            └── ProfileView.tsx     # Student profile & weekly velocity tracker
```

---

## 🚀 How to Run the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔮 What Should Be Built Next (Future Phases)

1. **Authentication & User Accounts**:
   - Supabase / Clerk authentication for user signups, OAuth with GitHub/Google.
2. **Backend Database & Persistence**:
   - PostgreSQL schema with Prisma ORM storing user profiles, customized roadmaps, and submitted project evidence.
3. **Automated GitHub Repository Ingestion**:
   - Connect GitHub API to automatically inspect candidate repos, analyze `package.json`, read commit velocity, and suggest competencies to verify.
4. **Real AI Integration (Gemini API)**:
   - Connect Google Gemini API to power dynamic Next Best Step recommendations, code reviews for evidence repositories, and personalized interview simulations.
5. **Public Portfolio Share Link**:
   - Enable students to export a public view (`skillsync.app/@username`) for recruiters and hiring managers.
