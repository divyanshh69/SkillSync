import React, { useState } from 'react';
import { RoadmapPhase, Skill } from '../../types';
import { StatusBadge, EvidencedBadge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  FolderGit2
} from 'lucide-react';

interface RoadmapViewProps {
  phases: RoadmapPhase[];
  onNavigateToProjects?: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  phases,
  onNavigateToProjects
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    'phase-1': true,
    'phase-2': true,
    'phase-3': true,
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

  const categories = ['All', 'Frontend', 'Backend & APIs', 'Databases', 'DevOps & Tooling', 'Architecture & Security'];
  const statuses = [
    { label: 'All Statuses', value: 'All' },
    { label: 'Completed', value: 'completed' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Not Started', value: 'not-started' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner / Explainer */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20">
              5-Phase Master Path
            </span>
            <span className="text-xs text-slate-400 font-medium">Standard Software Engineer Standard</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1.5 tracking-tight">
            Full-Stack Developer Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Every competency is tagged by importance and directly linked to project evidence. Expand phases below to inspect individual learning objectives.
          </p>
        </div>

        {/* Quick Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer pr-2"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer pr-2"
            >
              {statuses.map(st => (
                <option key={st.value} value={st.value} className="bg-slate-900 text-white">
                  {st.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Phases List */}
      <div className="space-y-6">
        {phases.map((phase) => {
          const isExpanded = expandedPhases[phase.id];
          const filteredSkills = phase.skills.filter(s => {
            const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
            const matchesStat = selectedStatus === 'All' || s.status === selectedStatus;
            return matchesCat && matchesStat;
          });

          const completedCount = phase.skills.filter(s => s.status === 'completed').length;
          const totalCount = phase.skills.length;
          const percent = Math.round((completedCount / totalCount) * 100);

          return (
            <div 
              key={phase.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all"
            >
              {/* Phase Header Accordion Toggle */}
              <div 
                onClick={() => togglePhase(phase.id)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-850/60 transition-colors border-b border-slate-800/80"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    phase.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : phase.status === 'in-progress'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    P{phase.phaseNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {phase.title}
                      </h3>
                      {phase.status === 'in-progress' && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Current Focus
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5">
                  <div className="text-right">
                    <span className="text-xs font-bold text-white">
                      {completedCount}/{totalCount} Completed
                    </span>
                    <div className="w-28 bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          percent === 100 ? 'bg-emerald-400' : 'bg-brand-400'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-1 rounded-lg bg-slate-800 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Skills Grid */}
              {isExpanded && (
                <div className="p-5 sm:p-6 bg-slate-950/40">
                  {filteredSkills.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-500">
                      No competencies match the selected filters in this phase.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredSkills.map(skill => (
                        <div
                          key={skill.id}
                          onClick={() => setActiveSkillModal(skill)}
                          className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between transition-all group cursor-pointer hover:shadow-md"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[10px] font-mono text-slate-400 uppercase">
                                {skill.category}
                              </span>
                              <StatusBadge status={skill.status} size="sm" />
                            </div>

                            <h4 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                              {skill.name}
                            </h4>

                            {skill.evidencedByProjectNames && skill.evidencedByProjectNames.length > 0 && (
                              <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                                <FolderGit2 className="w-3 h-3 text-brand-400 shrink-0" />
                                <span className="truncate">
                                  Evidenced in: {skill.evidencedByProjectNames.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                            <EvidencedBadge 
                              isEvidenced={skill.isProjectEvidenced} 
                              projectCount={skill.evidencedByProjectNames?.length}
                              size="sm"
                            />
                            <span className="text-[10px] font-medium text-slate-500">
                              {skill.importance}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
          subtitle={`${activeSkillModal.category} • ${activeSkillModal.importance} Competency`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Status</span>
              <StatusBadge status={activeSkillModal.status} />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium block mb-1">Project Evidence Verification</span>
              <EvidencedBadge isEvidenced={activeSkillModal.isProjectEvidenced} />
              {activeSkillModal.evidencedByProjectNames && activeSkillModal.evidencedByProjectNames.length > 0 ? (
                <div className="mt-2 text-xs text-brand-300">
                  Attached to portfolio project(s): <strong className="text-white">{activeSkillModal.evidencedByProjectNames.join(', ')}</strong>
                </div>
              ) : (
                <p className="mt-2 text-xs text-slate-400">
                  Not yet attached to a portfolio repository. Build a project evidencing this competency to increase your readiness score.
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              {onNavigateToProjects && (
                <button
                  onClick={() => {
                    setActiveSkillModal(null);
                    onNavigateToProjects();
                  }}
                  className="text-xs text-brand-400 hover:text-brand-300 font-semibold"
                >
                  Link to Project Evidence &rarr;
                </button>
              )}
              <button
                onClick={() => setActiveSkillModal(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
