import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Project, Skill } from '../../types';
import { ShieldCheck, Plus, Check } from 'lucide-react';

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
  const [metrics, setMetrics] = useState('');

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
      tagline: tagline.trim() || 'Custom full-stack portfolio evidence',
      description: description.trim() || 'Production deliverable demonstrating architectural competencies.',
      technologies: techs.length > 0 ? techs : ['TypeScript', 'Node.js', 'React'],
      evidencedSkills: selectedSkills.length > 0 ? selectedSkills : ['Node.js & Express Fundamentals'],
      githubUrl: githubUrl.trim() || 'https://github.com/alexrivera/new-repo',
      liveDemoUrl: liveDemoUrl.trim() || undefined,
      completionDate: 'Just Now',
      status: 'Completed',
      metrics: metrics.trim() || 'Newly verified portfolio deliverable'
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
    setMetrics('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Project Evidence"
      subtitle="Connect a GitHub repo or live project to prove your roadmap competencies"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Project Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. AuthGuard REST Service"
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Short Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Scalable Express API with JWT auth and Prisma"
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              GitHub Repository URL
            </label>
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Live Demo URL (Optional)
            </label>
            <input
              type="text"
              value={liveDemoUrl}
              onChange={(e) => setLiveDemoUrl(e.target.value)}
              placeholder="https://my-app.vercel.app"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Technologies Used (Comma-separated)
          </label>
          <input
            type="text"
            value={technologiesInput}
            onChange={(e) => setTechnologiesInput(e.target.value)}
            placeholder="Node.js, Express, TypeScript, PostgreSQL, Prisma"
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Detailed Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What technical challenges did you solve? How did you test or architect it?"
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors resize-none"
          />
        </div>

        {/* Competencies it Evidences */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-brand-300 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              Select Skills Evidenced By This Project:
            </label>
            <span className="text-[11px] text-slate-400">
              {selectedSkills.length} selected
            </span>
          </div>

          <div className="max-h-36 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            {availableSkills.map(skill => {
              const isSelected = selectedSkills.includes(skill.name);
              return (
                <div
                  key={skill.id}
                  onClick={() => toggleSkill(skill.name)}
                  className={`
                    flex items-center justify-between px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors
                    ${isSelected 
                      ? 'bg-brand-500/20 text-brand-200 border border-brand-500/30' 
                      : 'text-slate-300 hover:bg-slate-900'}
                  `}
                >
                  <span>{skill.name}</span>
                  <span className={`w-4 h-4 rounded flex items-center justify-center ${isSelected ? 'bg-brand-500 text-slate-950' : 'border border-slate-700'}`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-brand-500/25"
          >
            <Plus className="w-4 h-4" />
            <span>Verify & Link Evidence</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
