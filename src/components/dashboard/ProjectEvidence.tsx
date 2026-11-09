import React from 'react';
import { Project } from '../../types';
import { 
  ExternalLink, 
  Github, 
  ShieldCheck, 
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
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Recent Project Evidence
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
              {projects.length} Verified Repos
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real portfolio projects that supply inspection-ready proof for your roadmap competencies.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {onAddProject && (
            <button
              onClick={onAddProject}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 transition-colors shadow-sm shadow-brand-500/20"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Add Evidence</span>
            </button>
          )}

          {onViewAllProjects && (
            <button
              onClick={onViewAllProjects}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-700 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {projects.map((proj) => {
          return (
            <div
              key={proj.id}
              className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:shadow-lg hover:shadow-black/60"
            >
              <div>
                {/* Top status & links */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {proj.status}
                  </span>

                  <div className="flex items-center gap-2">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a
                        href={proj.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-slate-400 hover:text-brand-300 hover:bg-slate-800 rounded-md transition-colors"
                        title="Open Live Application"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Name & Tagline */}
                <h4 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                  {proj.name}
                </h4>
                <p className="text-xs text-brand-400/90 font-medium mt-0.5">
                  {proj.tagline}
                </p>

                {/* Short Description */}
                <p className="text-xs text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="mt-4">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                        +{proj.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Skills Demonstrated */}
                <div className="mt-4 pt-3 border-t border-slate-900">
                  <span className="text-[10px] font-semibold text-brand-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <ShieldCheck className="w-3 h-3 text-brand-400" />
                    Evidences Skills ({proj.evidencedSkills.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {proj.evidencedSkills.slice(0, 3).map((skillName) => (
                      <span
                        key={skillName}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 truncate max-w-[200px]"
                        title={skillName}
                      >
                        {skillName}
                      </span>
                    ))}
                    {proj.evidencedSkills.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        +{proj.evidencedSkills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Metrics Footer */}
              {proj.metrics && (
                <div className="mt-4 pt-3 border-t border-slate-900/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate">{proj.metrics}</span>
                  <span className="text-slate-500 shrink-0 font-mono text-[10px]">{proj.completionDate}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
