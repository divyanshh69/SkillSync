import React from 'react';
import { ArrowRight, Compass, Sparkles, ShieldCheck, Target, CheckCircle2, Terminal } from 'lucide-react';

interface LandingHeroProps {
  onExploreDemo: () => void;
  onStartJourney: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onExploreDemo, onStartJourney }) => {
  return (
    <div className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background radial gradients for subtle modern illumination */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-lg shadow-black/40 text-xs font-medium text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
            <span className="text-brand-300 font-semibold">SkillSync 1.0</span>
            <span className="text-slate-500">•</span>
            <span>Escape tutorial hell with evidence-driven career paths</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            <span className="block text-brand-400 bg-gradient-to-r from-brand-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              SkillSync
            </span>
            <span className="block mt-2">
              Your career journey, one clear step at a time.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            SkillSync helps students and early-career learners track real competencies, build project evidence, and always know their <strong className="text-white font-semibold">Next Best Step</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 shadow-lg shadow-brand-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Compass className="w-5 h-5 text-slate-950" />
              <span>Explore Demo</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onStartJourney}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 shadow-md transition-all duration-200"
            >
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>Start Your Journey</span>
            </button>
          </div>

          {/* Micro trust cues */}
          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              Project-backed verification
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-400" />
              Zero guesswork roadmaps
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-teal-400" />
              Interactive portfolio proof
            </span>
          </div>
        </div>

        {/* Visual Preview of SkillSync Dashboard / Next Best Step Hero Card */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-slate-900/80 p-2 sm:p-4 border border-slate-800 shadow-2xl shadow-black/80 backdrop-blur-xl">
            {/* Top Mock Window Controls */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs text-slate-400 font-mono hidden sm:inline">
                  skillsync.app/alexrivera/dashboard
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
                  Target: Full-Stack Developer
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  68% Readiness
                </span>
              </div>
            </div>

            {/* Inner Dashboard Preview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Highlight Card: Next Best Step */}
              <div className="lg:col-span-8 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl p-5 sm:p-6 border border-brand-500/30 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20">
                      Next Best Step
                    </span>
                    <span className="text-xs text-slate-400">Estimated Effort: 6–8 hours</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Build a REST API with authentication
                </h3>

                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  This project will help you master backend APIs and authentication before moving to full-stack integration.
                </p>

                {/* Skills it demonstrates */}
                <div className="mt-4">
                  <p className="text-xs text-slate-400 mb-1.5">
                    Skills you'll practice:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Node.js / Express", "JWT Authentication", "PostgreSQL & Prisma", "API Security"].map(skill => (
                      <span key={skill} className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-750 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Completion Criteria Mini Checklist */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2">
                  <p className="text-xs text-slate-400 font-medium">
                    Checklist (1 of 3 completed):
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="line-through text-slate-400">Design RESTful auth routes (/register, /login, /refresh)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0 flex items-center justify-center text-[10px] text-slate-400">2</div>
                      <span>Implement JWT verification middleware & refresh token rotation</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0 flex items-center justify-center text-[10px] text-slate-400">3</div>
                      <span>Connect PostgreSQL database via Prisma ORM & write tests</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between pt-2">
                  <button 
                    onClick={onExploreDemo}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-slate-950 font-semibold text-xs hover:bg-brand-400 transition-colors"
                  >
                    <span>View Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-slate-400">Click to preview in demo</span>
                </div>
              </div>

              {/* Side Readiness & Evidence Preview */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {/* Readiness Gauge Preview */}
                <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400">
                      Your Progress
                    </span>
                    <span className="text-lg font-bold text-brand-400">68%</span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-brand-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: '68%' }}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Skills Completed</span>
                      <span className="text-white font-bold text-base">14 <span className="text-xs font-normal text-slate-500">/ 24</span></span>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">
                        Projects
                      </span>
                      <span className="text-white font-bold text-base">3 <span className="text-xs font-normal text-slate-400">built</span></span>
                    </div>
                  </div>
                </div>

                {/* Evidence Card Preview */}
                <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-400">
                        Recent Project
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium">Completed</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white">DevPulse Analytics</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      Developer productivity dashboard built with React 18 and TypeScript.
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Practices React, TS</span>
                    <span className="text-brand-400 font-medium hover:underline cursor-pointer" onClick={onExploreDemo}>
                      View project &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

