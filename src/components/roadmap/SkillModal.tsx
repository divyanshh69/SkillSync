import React from 'react';
import { Skill, SkillStatus } from '../../types';
import { Modal } from '../common/Modal';
import { FolderGit2 } from 'lucide-react';

interface SkillModalProps {
  skill: Skill | null;
  onClose: () => void;
  onSkillUpdate?: (skillId: string, updates: Partial<Skill>) => void;
  onNavigateToProjects?: () => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({
  skill,
  onClose,
  onSkillUpdate,
  onNavigateToProjects
}) => {
  if (!skill) return null;

  return (
    <Modal
      isOpen={!!skill}
      onClose={onClose}
      title={skill.name}
      subtitle={`${skill.category} Competency`}
    >
      <div className="space-y-4">
        {/* Status Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-slate-950 border border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Update Status</span>
            <span className="text-[11px] text-slate-500">Change and save your progress</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {(['completed', 'in-progress', 'not-started'] as SkillStatus[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  if (onSkillUpdate && skill) {
                    onSkillUpdate(skill.id, { status: st });
                  }
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  skill.status === st
                    ? 'bg-brand-500 text-slate-950 font-semibold'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                {st === 'completed' ? 'Completed' : st === 'in-progress' ? 'In Progress' : 'Not Started'}
              </button>
            ))}
          </div>
        </div>

        {/* Practiced in projects info */}
        {skill.evidencedByProjectNames && skill.evidencedByProjectNames.length > 0 ? (
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
            <span className="text-brand-300 font-medium block mb-0.5">Practiced in project(s):</span>
            <span>{skill.evidencedByProjectNames.join(', ')}</span>
          </div>
        ) : (
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
            Not yet linked to a project. When you build a project demonstrating this skill, you can link it in My Projects.
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          {onNavigateToProjects && (
            <button
              onClick={() => {
                onClose();
                onNavigateToProjects();
              }}
              className="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Go to My Projects</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-md font-medium ml-auto transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

