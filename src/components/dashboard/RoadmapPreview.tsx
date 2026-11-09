import React from 'react';
import { RoadmapPhase, Skill } from '../../types';
import { StatusBadge } from '../common/Badge';
import { ArrowRight } from 'lucide-react';

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
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold text-brand-400 block mb-0.5">
            Current Phase (Phase {currentPhase.phaseNumber} of 5)
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {currentPhase.title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentPhase.subtitle}
          </p>
        </div>

        <button
          onClick={onViewFullRoadmap}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
        >
          <span>View full roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Skills List */}
      <div className="mt-4 divide-y divide-slate-800/60">
        {currentPhase.skills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => onSkillClick && onSkillClick(skill)}
            className="py-3 flex items-center justify-between gap-3 group cursor-pointer hover:bg-slate-850/40 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-brand-400 transition-colors" />
              <div>
                <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
                <span className="text-[11px] text-slate-400 ml-2.5">
                  {skill.category}
                </span>
              </div>
            </div>

            <StatusBadge status={skill.status} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
};
