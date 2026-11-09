import React, { useState } from 'react';
import { RoadmapPhase, Skill, SkillStatus } from '../../types';
import { StatusBadge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  FolderGit2
} from 'lucide-react';

interface RoadmapViewProps {
  phases: RoadmapPhase[];
  onSkillUpdate?: (skillId: string, updates: Partial<Skill>) => void;
  onNavigateToProjects?: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  phases,
  onSkillUpdate,
  onNavigateToProjects
}) => {
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    'phase-1': false,
    'phase-2': false,
    'phase-3': true, // Keep current phase open by default
    'phase-4': false,
    'phase-5': false
  });
  const [activeSkillModal, setActiveSkillModal] = useState<Skill | null>(null);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Simple Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              My Roadmap
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              5 learning phases from web basics to cloud deployment.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-medium text-brand-300 bg-brand-500/10 border border-brand-500/20 px-3 py-1.5 rounded-lg">
            <span>Current: Phase 3 (Backend & APIs)</span>
          </div>
        </div>
      </div>

      {/* Phases Journey List */}
      <div className="space-y-4">
        {phases.map((phase) => {
          const isExpanded = expandedPhases[phase.id];
          const isCurrent = phase.status === 'in-progress';
          const isCompleted = phase.status === 'completed';
          const completedCount = phase.skills.filter(s => s.status === 'completed').length;
          const totalCount = phase.skills.length;

          return (
            <div 
              key={phase.id}
              className={`rounded-xl border transition-colors overflow-hidden ${
                isCurrent 
                  ? 'bg-slate-900 border-brand-500/40 shadow-sm' 
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              {/* Phase Header */}
              <div 
                onClick={() => togglePhase(phase.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-850/50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : isCurrent
                      ? 'bg-brand-500 text-slate-950 font-extrabold'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : phase.phaseNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">
                        Phase {phase.phaseNumber}: {phase.title}
                      </h3>
                      {isCurrent && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-500/15 text-brand-300 border border-brand-500/30">
                          Current Focus
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
                  <span className="text-slate-400">
                    {completedCount} of {totalCount} completed
                  </span>
                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Skills List within Phase */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/60 bg-slate-950/40">
                  <p className="text-xs text-slate-400 mb-3">
                    {phase.description}
                  </p>

                  <div className="divide-y divide-slate-800/60">
                    {phase.skills.map((skill) => (
                      <div
                        key={skill.id}
                        onClick={() => setActiveSkillModal(skill)}
                        className="py-2.5 flex items-center justify-between gap-3 group cursor-pointer hover:bg-slate-900/60 px-2 rounded-lg transition-colors"
                      >
                        <div>
                          <span className="text-sm text-slate-200 group-hover:text-white font-medium transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs text-slate-400 ml-2">
                            {skill.category}
                          </span>
                          {skill.evidencedByProjectNames && skill.evidencedByProjectNames.length > 0 && (
                            <span className="text-[11px] text-brand-300 ml-2">
                              • Practiced in {skill.evidencedByProjectNames[0]}
                            </span>
                          )}
                        </div>

                        <StatusBadge status={skill.status} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Skill Detail Modal */}
      {activeSkillModal && (
        <Modal
          isOpen={!!activeSkillModal}
          onClose={() => setActiveSkillModal(null)}
          title={activeSkillModal.name}
          subtitle={`${activeSkillModal.category} Competency`}
        >
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Update Status</span>
                <span className="text-[11px] text-slate-400">Click to change and save progress</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['completed', 'in-progress', 'not-started'] as SkillStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      if (onSkillUpdate && activeSkillModal) {
                        onSkillUpdate(activeSkillModal.id, { status: st });
                        setActiveSkillModal({ ...activeSkillModal, status: st });
                      }
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      activeSkillModal.status === st
                        ? 'bg-brand-500 text-slate-950 font-semibold'
                        : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-750'
                    }`}
                  >
                    {st === 'completed' ? 'Completed' : st === 'in-progress' ? 'In Progress' : 'Not Started'}
                  </button>
                ))}
              </div>
            </div>

            {activeSkillModal.evidencedByProjectNames && activeSkillModal.evidencedByProjectNames.length > 0 ? (
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
                <span className="text-brand-300 font-medium block mb-0.5">Practiced in project(s):</span>
                <span>{activeSkillModal.evidencedByProjectNames.join(', ')}</span>
              </div>
            ) : (
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
                Not yet linked to a project. When you build a project demonstrating this skill, you can link it in My Projects.
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              {onNavigateToProjects && (
                <button
                  onClick={() => {
                    setActiveSkillModal(null);
                    onNavigateToProjects();
                  }}
                  className="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Go to My Projects</span>
                </button>
              )}
              <button
                onClick={() => setActiveSkillModal(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-md font-medium ml-auto transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
