import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  CircleDashed, 
  Info, 
  TrendingUp,
  Award
} from 'lucide-react';

interface CareerReadinessProps {
  readinessPercentage: number;
  totalSkills: number;
  completedSkills: number;
  inProgressSkills: number;
  evidencedSkills: number;
  notStartedSkills: number;
}

export const CareerReadiness: React.FC<CareerReadinessProps> = ({
  readinessPercentage,
  totalSkills,
  completedSkills,
  inProgressSkills,
  evidencedSkills,
  notStartedSkills
}) => {
  const theoryOnly = completedSkills - evidencedSkills;
  const evidencedPercent = Math.round((evidencedSkills / totalSkills) * 100);
  const theoryPercent = Math.round((theoryOnly / totalSkills) * 100);
  const inProgressPercent = Math.round((inProgressSkills / totalSkills) * 100);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Career Readiness Score
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
              Target: Full-Stack Dev
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Weighted assessment based on proven competencies vs. entry-level software engineer job requirements.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
          <TrendingUp className="w-4 h-4 text-brand-400" />
          <span>+8% next unlock ready</span>
        </div>
      </div>

      {/* Main Grid: Gauge & Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Readiness Circular/Gauge Display */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/70 rounded-2xl border border-slate-800/80">
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* SVG Circular Progress Meter */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#1e293b"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#readiness-gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * readinessPercentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="readiness-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-white tracking-tight">
                {readinessPercentage}%
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400">
                Readiness
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <Award className="w-3.5 h-3.5" />
              Interview Competitive (Junior Tier)
            </span>
            <p className="text-[11px] text-slate-400 mt-2">
              Reach 75% to unlock verified referral matching.
            </p>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Completed Skills */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Skills Completed
              </span>
              <span className="text-slate-400 font-mono">{Math.round((completedSkills / totalSkills) * 100)}%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{completedSkills}</span>
              <span className="text-xs text-slate-400 font-medium">of {totalSkills} total skills</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Coursework, tutorials, and fundamental concepts mastered.
            </p>
          </div>

          {/* Card 2: Project-Evidenced Skills (Highlighted) */}
          <div className="p-4 bg-brand-950/20 border border-brand-500/30 rounded-xl relative overflow-hidden shadow-sm shadow-brand-500/10">
            <div className="flex items-center justify-between text-xs text-brand-300 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                Project-Evidenced Skills
              </span>
              <span className="text-xs font-bold text-brand-300 bg-brand-500/20 px-2 py-0.5 rounded-full">
                2x Weight
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-brand-200">{evidencedSkills}</span>
              <span className="text-xs text-brand-400/80 font-medium">skills verified with code</span>
            </div>
            <p className="text-[11px] text-brand-300/80 mt-1">
              Tied directly to GitHub repos and live web applications.
            </p>
          </div>

          {/* Card 3: Skills In Progress */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Skills In Progress
              </span>
              <span className="text-amber-400 font-mono text-xs">Active Focus</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{inProgressSkills}</span>
              <span className="text-xs text-slate-400 font-medium">skills currently being learned</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Includes JWT Auth & PostgreSQL Schema Design.
            </p>
          </div>

          {/* Card 4: Remaining Skills */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <CircleDashed className="w-4 h-4 text-slate-400" />
                Upcoming in Roadmap
              </span>
              <span className="text-slate-400 font-mono text-xs">Phases 4-5</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{notStartedSkills}</span>
              <span className="text-xs text-slate-400 font-medium">skills planned ahead</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Next.js SSR, Redis, Docker, and CI/CD pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Multi-Segmented Progress Bar */}
      <div className="mt-7 pt-6 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
          <span>Competency Distribution Breakdown</span>
          <span className="text-slate-400">{totalSkills} Total Roadmap Competencies</span>
        </div>

        {/* Stacked Bar */}
        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex border border-slate-800/80 p-0.5">
          <div 
            style={{ width: `${evidencedPercent}%` }} 
            className="bg-brand-400 h-full rounded-l-full transition-all duration-500"
            title={`Project Evidenced: ${evidencedSkills} (${evidencedPercent}%)`}
          />
          <div 
            style={{ width: `${theoryPercent}%` }} 
            className="bg-indigo-400 h-full transition-all duration-500"
            title={`Theory Only: ${theoryOnly} (${theoryPercent}%)`}
          />
          <div 
            style={{ width: `${inProgressPercent}%` }} 
            className="bg-amber-400 h-full transition-all duration-500"
            title={`In Progress: ${inProgressSkills} (${inProgressPercent}%)`}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-brand-400" />
            <span className="text-slate-300 font-medium">Project Evidenced ({evidencedSkills})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-indigo-400" />
            <span className="text-slate-300 font-medium">Coursework / Theory Only ({theoryOnly})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-amber-400" />
            <span className="text-slate-300 font-medium">In Progress ({inProgressSkills})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-slate-800 border border-slate-700" />
            <span className="text-slate-400 font-medium">Not Started ({notStartedSkills})</span>
          </div>
        </div>

        {/* Visual Distinction Callout: Completed vs Project-Evidenced */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3 text-xs leading-relaxed text-slate-300">
          <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white block mb-0.5">
              Why distinguish "Completed" from "Project-Evidenced"?
            </span>
            <p className="text-slate-400">
              Watching a video or finishing a quiz counts as <strong className="text-indigo-300">Completed</strong>, which proves familiarity. But hiring managers hire for demonstrable ability: skills marked <strong className="text-brand-300">Project-Evidenced</strong> are backed by inspection-ready code in your portfolio, giving them 2x weighting in your readiness score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
