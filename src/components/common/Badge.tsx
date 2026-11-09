import React from 'react';
import { cn } from '../../utils/cn';
import { CheckCircle2, Clock, CircleDashed, ShieldCheck, Sparkles } from 'lucide-react';
import { SkillStatus } from '../../types';

interface StatusBadgeProps {
  status: SkillStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', className }) => {
  const isSm = size === 'sm';
  
  if (status === 'completed') {
    return (
      <span className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        className
      )}>
        <CheckCircle2 className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
        Completed
      </span>
    );
  }

  if (status === 'in-progress') {
    return (
      <span className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20",
        isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        className
      )}>
        <Clock className={cn("animate-spin-slow", isSm ? "w-3 h-3" : "w-3.5 h-3.5")} />
        In Progress
      </span>
    );
  }

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 font-medium rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50",
      isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
      className
    )}>
      <CircleDashed className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      Not Started
    </span>
  );
};

interface EvidencedBadgeProps {
  isEvidenced: boolean;
  projectCount?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export const EvidencedBadge: React.FC<EvidencedBadgeProps> = ({ 
  isEvidenced, 
  projectCount, 
  size = 'md', 
  className 
}) => {
  const isSm = size === 'sm';

  if (isEvidenced) {
    return (
      <span 
        title="Project Evidenced: Verified by real code in a portfolio project"
        className={cn(
          "inline-flex items-center gap-1.5 font-medium rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30 shadow-sm shadow-brand-500/10",
          isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
          className
        )}
      >
        <ShieldCheck className={isSm ? "w-3 h-3 text-brand-400" : "w-3.5 h-3.5 text-brand-400"} />
        <span>Project Evidenced</span>
        {projectCount !== undefined && projectCount > 0 && (
          <span className="bg-brand-500/30 text-brand-200 text-[10px] px-1.5 py-0.2 rounded-full font-semibold">
            {projectCount}
          </span>
        )}
      </span>
    );
  }

  return (
    <span 
      title="Theory Only: Marked completed via course or study, but has no attached project evidence yet."
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/40 text-[11px]",
        isSm ? "px-1.5 py-0.5" : "px-2 py-0.5",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
      <span>Course / Theory Only</span>
    </span>
  );
};

export const ImpactBadge: React.FC<{ impact: 'High' | 'Very High' | 'Critical' }> = ({ impact }) => {
  return (
    <span className="inline-flex items-center gap-1 font-semibold text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
      <Sparkles className="w-3 h-3 text-rose-400" />
      {impact} Impact
    </span>
  );
};
