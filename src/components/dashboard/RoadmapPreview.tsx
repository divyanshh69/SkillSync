import React from 'react';
import { RoadmapPhase, Skill } from '../../types';
import { StatusBadge, EvidencedBadge } from '../common/Badge';
import { ArrowRight, CheckCircle2, Clock, CircleDashed } from 'lucide-react';

interface RoadmapPreviewProps {
  currentPhase: RoadmapPhase;
  onViewFullRoadmap: () => void;
  onSkillClick?: (skill: Skill) => void;
}

export const RoadmapPreview: React.FC<RoadmapPreviewProps> = ({
  currentPhase,
  onViewFullRoadmap,
  onSkillClick
}) => {
  const completedSkills = currentPhase.skills.filter(s => s.status === 'completed');
  const inProgressSkills = currentPhase.skills.filter(s => s.status === 'in-progress');
  const notStartedSkills = currentPhase.skills.filter(s => s.status === 'not-started');

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Current Active Phase
            </span>
            <span className="text-xs text-slate-400 font-medium">Phase {currentPhase.phaseNumber} of 5</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight mt-1">
            {currentPhase.title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentPhase.subtitle}
          </p>
        </div>

        <button
          onClick={onViewFullRoadmap}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 px-3.5 py-2 rounded-xl border border-brand-500/20 transition-all self-start sm:self-auto"
        >
          <span>View All 5 Phases</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Phase Summary Bar */}
      <div className="mt-4 p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {completedSkills.length} Completed
          </span>
          <span className="flex items-center gap-1.5 text-amber-300 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {inProgressSkills.length} In Progress
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 font-medium">
            <CircleDashed className="w-3.5 h-3.5" />
            {notStartedSkills.length} Not Started
          </span>
        </div>

        <span className="text-slate-400 font-mono text-[11px]">
          Target Completion: Q3 2026
        </span>
      </div>

      {/* Skills Table / List */}
      <div className="mt-5 space-y-2.5">
        {currentPhase.skills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => onSkillClick && onSkillClick(skill)}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-xl transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full shrink-0 bg-slate-600 group-hover:bg-brand-400 transition-colors" />
              <div>
                <span className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">
                  {skill.name}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {skill.category}
                  </span>
                  <span className="text-slate-700">•</span>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">
                    {skill.importance}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <EvidencedBadge 
                isEvidenced={skill.isProjectEvidenced} 
                projectCount={skill.evidencedByProjectNames?.length}
                size="sm"
              />
              <StatusBadge status={skill.status} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
