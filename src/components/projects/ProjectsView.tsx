import React, { useState } from 'react';
import { Project, Skill } from '../../types';
import { 
  ExternalLink, 
  Github, 
  ShieldCheck, 
  Plus, 
  Search
} from 'lucide-react';
import { AddProjectModal } from './AddProjectModal';

interface ProjectsViewProps {
  projects: Project[];
  availableSkills: Skill[];
  onAddProject: (newProject: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  availableSkills,
  onAddProject
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.technologies.some(t => t.toLowerCase().includes(q)) ||
      p.evidencedSkills.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20">
              Evidence Ledger
            </span>
            <span className="text-xs text-slate-400 font-medium">{projects.length} Verified Deliverables</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1.5 tracking-tight">
            Project Evidence & Artifacts
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Every repository here directly validates technical competencies in your roadmap. Recruiters and engineering managers can verify clean architecture, git commits, and live deployments.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-brand-500/25 transition-all self-stretch md:self-auto justify-center"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Add Project Evidence</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project, tech, or evidenced skill..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <span className="text-xs text-slate-400 hidden sm:inline">
          Showing {filteredProjects.length} of {projects.length} projects
        </span>
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => {
          return (
            <div
              key={proj.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg"
            >
              <div>
                {/* Header status & actions */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {proj.status}
                    </span>
                    {proj.featured && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        Featured Showcase
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
                        title="Open GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a
                        href={proj.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-brand-300 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                  {proj.name}
                </h3>
                <p className="text-xs font-semibold text-brand-400 mt-0.5">
                  {proj.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  {proj.description}
                </p>

                {/* Technologies */}
                <div className="mt-5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Technologies & Libraries
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map(tech => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 text-slate-200 border border-slate-800 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Evidenced Skills */}
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <span className="text-[11px] font-bold text-brand-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="w-4 h-4 text-brand-400" />
                    Verified Competencies Evidenced ({proj.evidencedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.evidencedSkills.map(skill => (
                      <span
                        key={skill}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Metrics */}
              {proj.metrics && (
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-300">{proj.metrics}</span>
                  <span className="font-mono text-slate-500 text-[11px]">{proj.completionDate}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        availableSkills={availableSkills}
        onAddProject={onAddProject}
      />
    </div>
  );
};
