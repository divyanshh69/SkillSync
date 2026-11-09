import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Project, Skill } from '../../types';
import { Check } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableSkills: Skill[];
  onAddProject: (newProject: Project) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  availableSkills,
  onAddProject
}) => {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [technologiesInput, setTechnologiesInput] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skillName: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillName) 
        ? prev.filter(s => s !== skillName)
        : [...prev, skillName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const techs = technologiesInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || '',
      description: description.trim() || 'A project built to practice key skills.',
      technologies: techs.length > 0 ? techs : ['TypeScript', 'React'],
      evidencedSkills: selectedSkills.length > 0 ? selectedSkills : ['Node.js & Express Fundamentals'],
      githubUrl: githubUrl.trim() || undefined,
      liveDemoUrl: liveDemoUrl.trim() || undefined,
      completionDate: 'Recently added',
      status: 'Completed'
    };

    onAddProject(newProject);
    onClose();

    // Reset form
    setName('');
    setTagline('');
    setDescription('');
    setGithubUrl('');
    setLiveDemoUrl('');
    setTechnologiesInput('');
    setSelectedSkills([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add a Project"
      subtitle="Record what you built and select the skills you practiced."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Project Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. REST API with Authentication"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Short Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Express API with JWT auth and Prisma"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              GitHub URL (optional)
            </label>
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Demo URL (optional)
            </label>
            <input
              type="text"
              value={liveDemoUrl}
              onChange={(e) => setLiveDemoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Technologies Used (comma separated)
          </label>
          <input
            type="text"
            value={technologiesInput}
            onChange={(e) => setTechnologiesInput(e.target.value)}
            placeholder="Node.js, Express, TypeScript, PostgreSQL"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe what this project does and what you learned..."
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors resize-none"
          />
        </div>

        {/* Skills Practiced */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Select skills practiced in this project:
            </label>
            <span className="text-xs text-slate-500">
              {selectedSkills.length} selected
            </span>
          </div>

          <div className="max-h-36 overflow-y-auto p-2 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            {availableSkills.map(skill => {
              const isSelected = selectedSkills.includes(skill.name);
              return (
                <div
                  key={skill.id}
                  onClick={() => toggleSkill(skill.name)}
                  className={`
                    flex items-center justify-between px-2.5 py-1.5 rounded text-xs cursor-pointer transition-colors
                    ${isSelected 
                      ? 'bg-brand-500/15 text-brand-300 font-medium' 
                      : 'text-slate-300 hover:bg-slate-900'}
                  `}
                >
                  <span>{skill.name}</span>
                  <span className={`w-3.5 h-3.5 rounded flex items-center justify-center ${isSelected ? 'bg-brand-500 text-slate-950' : 'border border-slate-700'}`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-semibold transition-colors"
          >
            Save Project
          </button>
        </div>
      </form>
    </Modal>
  );
};
