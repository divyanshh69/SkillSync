import React from 'react';
import { Project } from '../../types';
import { 
  ExternalLink, 
  Github, 
  Plus, 
  ArrowRight,
  FolderGit2
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
            Deliverables that prove your skills with code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onAddProject && (
            <button
              onClick={onAddProject}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          )}

          {onViewAllProjects && projects.length > 0 && (
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

      {/* Projects List or Empty State */}
      {projects.length === 0 ? (
        <div className="mt-5 p-8 text-center bg-slate-950/60 border border-slate-800 rounded-lg">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-white">No projects added yet</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Add a project manually or connect GitHub to import repositories as verifiable skill evidence.
          </p>
          {onAddProject && (
            <button
              onClick={onAddProject}
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Your First Project</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {projects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                {/* Header with links */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-bold text-white truncate">
                        {proj.name}
                      </h4>
                      {proj.source === 'github' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800 shrink-0">
                          <Github className="w-2.5 h-2.5" />
                          <span>GitHub</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
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
                  <p className="text-xs text-brand-300 font-medium mb-2 line-clamp-1">
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
      )}
    </div>
  );
};
