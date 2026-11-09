import React from 'react';
import { cn } from '../../utils/cn';
import { Check, Clock } from 'lucide-react';
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
        "inline-flex items-center gap-1 font-medium rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        className
      )}>
        <Check className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
        Completed
      </span>
    );
  }

  if (status === 'in-progress') {
    return (
      <span className={cn(
        "inline-flex items-center gap-1 font-medium rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20",
        isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        className
      )}>
        <Clock className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
        In Progress
      </span>
    );
  }

  return (
    <span className={cn(
      "inline-flex items-center font-medium rounded-md bg-slate-800 text-slate-400 border border-slate-700/60",
      isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
      className
    )}>
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
  size = 'sm', 
  className 
}) => {
  const isSm = size === 'sm';

  if (!isEvidenced) return null;

  return (
    <span 
      title="Backed by code in your projects"
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-md bg-brand-500/10 text-brand-300 border border-brand-500/20",
        isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        className
      )}
    >
      <span>Backed by Project</span>
      {projectCount !== undefined && projectCount > 1 && (
        <span className="text-[10px] text-brand-400 font-bold">({projectCount})</span>
      )}
    </span>
  );
};

export const SimplePill: React.FC<{ label: string; variant?: 'brand' | 'slate' | 'amber' }> = ({
  label,
  variant = 'slate'
}) => {
  const variantStyles = {
    brand: 'bg-brand-500/10 text-brand-300 border-brand-500/20',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
  }[variant];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${variantStyles}`}>
      {label}
    </span>
  );
};
