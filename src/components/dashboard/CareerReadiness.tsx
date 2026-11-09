import React from 'react';
import { CheckCircle2, FolderGit2, MapPin } from 'lucide-react';

interface CareerReadinessProps {
  readinessPercentage: number;
  totalSkills: number;
  completedSkills: number;
  inProgressSkills?: number;
  evidencedSkills?: number;
  notStartedSkills?: number;
  projectCount?: number;
  currentPhaseTitle?: string;
}

export const CareerReadiness: React.FC<CareerReadinessProps> = ({
  readinessPercentage,
  totalSkills,
  completedSkills,
  projectCount = 3,
  currentPhaseTitle = "Phase 3: Backend Foundations & APIs"
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Your Progress: {readinessPercentage}%
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Based on the skills you have completed and the projects you have built.
          </p>
        </div>

        <span className="text-xs font-medium text-brand-300 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full self-start sm:self-auto">
          Steady momentum
        </span>
      </div>

      {/* Clean Single Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-brand-500 h-full rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${readinessPercentage}%` }}
        />
      </div>

      {/* 3 Simple Supporting Items */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="w-8 h-8 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Skills Completed</span>
            <span className="text-sm font-bold text-white">{completedSkills} <span className="text-xs text-slate-400 font-normal">of {totalSkills}</span></span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="w-8 h-8 rounded-md bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
            <FolderGit2 className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Projects Added</span>
            <span className="text-sm font-bold text-white">{projectCount} <span className="text-xs text-slate-400 font-normal">in portfolio</span></span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] text-slate-400 block font-medium">Current Phase</span>
            <span className="text-xs font-bold text-white truncate block">{currentPhaseTitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
