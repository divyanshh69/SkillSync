import React from 'react';
import { ArrowRight, Compass, Sparkles, ShieldCheck, Target, CheckCircle2, Terminal } from 'lucide-react';

interface LandingHeroProps {
  onExploreDemo: () => void;
  onStartJourney: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onExploreDemo, onStartJourney }) => {
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
            <span className="flex h-1.5 w-1.5 rounded-full bg-brand-400" />
            <span className="text-brand-300 font-semibold">Career Journey Companion</span>
            <span className="text-slate-600">•</span>
            <span>Evidence-driven progress</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            Your career journey,{' '}
            <span className="text-brand-400">one clear step</span> at a time.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            SkillSync helps students and early-career learners track competencies, build project evidence, and always focus on their next high-leverage step.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 transition-colors shadow-sm"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Explore Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onStartJourney}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Personalize Roadmap</span>
            </button>
          </div>

          {/* Micro trust cues */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              Project-backed verification
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-brand-400" />
              Structured career tracks
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-brand-400" />
              Real repository proof
            </span>
          </div>
        </div>

        {/* Visual Preview of SkillSync Dashboard / Next Best Step Hero Card */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="rounded-xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
            {/* Top Mock Window Controls */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span className="ml-3 text-xs text-slate-500 font-mono hidden sm:inline">
                  skillsync.dev/dashboard
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-300 border border-brand-500/20">
                  Target: Full-Stack Developer
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  68% Readiness
                </span>
              </div>
            </div>

            {/* Inner Dashboard Preview Grid */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Highlight Card: Next Best Step */}
              <div className="lg:col-span-8 bg-slate-950 rounded-xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20">
                      Next Best Step
                    </span>
                    <span className="text-xs text-slate-400">Estimated Effort: 6–8 hours</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Build a REST API with authentication
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    This project helps you master backend APIs, secure endpoints, and token authentication before integrating frontend clients.
                  </p>

                  {/* Skills it demonstrates */}
                  <div className="mt-3.5">
                    <p className="text-xs text-slate-400 mb-1.5">
                      Skills practiced:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Node.js / Express", "JWT Authentication", "PostgreSQL & Prisma", "API Security"].map(skill => (
                        <span key={skill} className="text-xs px-2.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Completion Criteria Mini Checklist */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                    <p className="text-xs text-slate-400 font-medium">
                      Checklist (1 of 3 completed):
                    </p>
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="line-through text-slate-400">Design RESTful auth routes (/register, /login, /refresh)</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0 flex items-center justify-center text-[10px] text-slate-400">2</div>
                        <span>Implement JWT verification middleware & token refresh</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0 flex items-center justify-center text-[10px] text-slate-400">3</div>
                        <span>Connect PostgreSQL database via Prisma ORM & write tests</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <button 
                    onClick={onExploreDemo}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-500 text-slate-950 font-semibold text-xs hover:bg-brand-400 transition-colors"
                  >
                    <span>View Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-slate-500">Interactive in demo</span>
                </div>
              </div>

              {/* Side Readiness & Evidence Preview */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {/* Readiness Gauge Preview */}
                <div className="bg-slate-950 rounded-xl p-5 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400">
                      Your Progress
                    </span>
                    <span className="text-base font-bold text-brand-400 font-mono">68%</span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-brand-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: '68%' }}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Skills Completed</span>
                      <span className="text-white font-bold text-sm">14 <span className="text-xs font-normal text-slate-500">/ 24</span></span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Projects Evidenced</span>
                      <span className="text-white font-bold text-sm">3 <span className="text-xs font-normal text-slate-500">built</span></span>
                    </div>
                  </div>
                </div>

                {/* Evidence Callout */}
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-1">
                      Recent Deliverable
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      DevPulse Analytics: full-stack metrics client demonstrating React, TypeScript, and state management.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Source: GitHub</span>
                    <span className="text-emerald-400 font-medium">Verified Evidence</span>
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
