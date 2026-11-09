import React from 'react';
import { Project } from '../../types';
import { 
  ExternalLink, 
  Github, 
  Plus, 
  ArrowRight
} from 'lucide-react';

interface ProjectEvidenceProps {
  projects: Project[];
  onAddProject?: () => void;
  onViewAllProjects?: () => void;
}

export const ProjectEvidence: React.FC<ProjectEvidenceProps> = ({
  projects,
  onAddProject,
  onViewAllProjects
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            My Projects
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            What you have built to practice and demonstrate your skills.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onAddProject && (
            <button
              onClick={onAddProject}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          )}

          {onViewAllProjects && (
            <button
              onClick={onViewAllProjects}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <span>View all ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {projects.slice(0, 3).map((proj) => (
          <div
            key={proj.id}
            className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              {/* Header with links */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="text-sm font-bold text-white">
                  {proj.name}
                </h4>
                <div className="flex items-center gap-1.5 shrink-0">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      title="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {proj.liveDemoUrl && (
                    <a
                      href={proj.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-brand-300 transition-colors p-1"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {proj.tagline && (
                <p className="text-xs text-brand-400/90 font-medium mb-2">
                  {proj.tagline}
                </p>
              )}

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {proj.description}
              </p>

              {/* Technologies */}
              <div className="mt-3 flex flex-wrap gap-1">
                {proj.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
                {proj.technologies.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                    +{proj.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Evidenced Skills summary */}
            {proj.evidencedSkills.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-slate-400">
                <span>Practices: </span>
                <span className="text-brand-300 font-medium truncate">
                  {proj.evidencedSkills.slice(0, 2).join(', ')}
                  {proj.evidencedSkills.length > 2 && ` +${proj.evidencedSkills.length - 2} more`}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
