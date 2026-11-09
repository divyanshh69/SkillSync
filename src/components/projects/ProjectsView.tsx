import React, { useState } from 'react';
import { Project, Skill } from '../../types';
import { 
  ExternalLink, 
  Github, 
  Plus, 
  Search,
  Trash2
} from 'lucide-react';
import { AddProjectModal } from './AddProjectModal';

interface ProjectsViewProps {
  projects: Project[];
  availableSkills: Skill[];
  onAddProject: (newProject: Project) => void;
  onDeleteProject?: (projectId: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  availableSkills,
  onAddProject,
  onDeleteProject
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.tagline && p.tagline.toLowerCase().includes(q)) ||
      p.technologies.some(t => t.toLowerCase().includes(q)) ||
      p.evidencedSkills.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            My Projects
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Real things you have built to practice and demonstrate your skills.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors self-start sm:self-auto shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by project name, tech, or skill..."
          className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
        />
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-xl text-slate-400 text-sm">
          No projects match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                {/* Header with Title and Links */}
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {proj.name}
                    </h3>
                    {proj.tagline && (
                      <p className="text-xs text-brand-300 font-medium mt-0.5">
                        {proj.tagline}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
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
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {onDeleteProject && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Remove project "${proj.name}"?`)) {
                            onDeleteProject(proj.id);
                          }
                        }}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Technologies */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {proj.technologies.map(tech => (
                    <span
                      key={tech}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Evidenced Skills */}
              {proj.evidencedSkills.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-1">
                    Skills practiced:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {proj.evidencedSkills.map(skill => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

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
