import React, { useState, useEffect } from 'react';
import { GitHubRepoSummary, Skill, Project, ImportRepoPayload } from '../../types';
import { api } from '../../services/api';
import { 
  X, 
  Github, 
  Check, 
  ExternalLink, 
  Sparkles, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';

interface ImportGitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  repo: GitHubRepoSummary | null;
  availableSkills: Skill[];
  onImportSuccess: (project: Project) => void;
}

export const ImportGitHubModal: React.FC<ImportGitHubModalProps> = ({
  isOpen,
  onClose,
  repo,
  availableSkills,
  onImportSuccess
}) => {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize form when repo changes
  useEffect(() => {
    if (repo) {
      setName(repo.name);
      setTagline(repo.primaryLanguage ? `Built with ${repo.primaryLanguage}` : 'GitHub Project');
      setDescription(repo.description || `Public GitHub project: ${repo.fullName}`);
      setTechnologies(repo.technologies?.join(', ') || repo.primaryLanguage || '');
      setLiveDemoUrl(repo.homepage || '');

      // Pre-select suggested skills that match SkillSync database
      const initialSkills = repo.suggestedSkills.map(s => s.name);
      setSelectedSkills(initialSkills);
      setErrorMessage(null);
    }
  }, [repo]);

  if (!isOpen || !repo) return null;

  const toggleSkill = (skillName: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillName)
        ? prev.filter(s => s !== skillName)
        : [...prev, skillName]
    );
  };

  const handleConfirmImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter a project name.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const payload: ImportRepoPayload = {
        repositoryUrl: repo.url,
        name: name.trim(),
        tagline: tagline.trim() || undefined,
        description: description.trim(),
        technologies: technologies.split(',').map(t => t.trim()).filter(Boolean),
        evidencedSkills: selectedSkills,
        liveDemoUrl: liveDemoUrl.trim() || undefined,
        githubRepoId: String(repo.id),
        status: 'Completed'
      };

      const importedProject = await api.importGitHubProject(payload);
      onImportSuccess(importedProject);
      onClose();
    } catch (err: any) {
      console.error('Import error:', err);
      setErrorMessage(err.message || 'Failed to import repository. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Import GitHub Repository
              </h3>
              <p className="text-xs text-slate-400">
                Turn your public GitHub work into verified skill evidence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleConfirmImport} className="flex-1 overflow-y-auto p-5 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Repo Info Banner */}
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-semibold text-white truncate">{repo.fullName}</span>
              {repo.primaryLanguage && (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px] shrink-0">
                  {repo.primaryLanguage}
                </span>
              )}
            </div>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 hover:text-brand-200 flex items-center gap-1 font-medium shrink-0"
            >
              <span>View on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Project Name & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                One-line Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                placeholder="e.g. Real-time chat app with WebSockets"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What did you build and why?"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 resize-none"
            />
          </div>

          {/* Technologies & Live Demo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={technologies}
                onChange={e => setTechnologies(e.target.value)}
                placeholder="React, TypeScript, Node.js"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Live Demo URL (optional)
              </label>
              <input
                type="url"
                value={liveDemoUrl}
                onChange={e => setLiveDemoUrl(e.target.value)}
                placeholder="https://my-app.vercel.app"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Evidenced Skills Selection */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>Skills Demonstrated in this Repository</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {selectedSkills.length} selected
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-3">
              SkillSync detected these skills from your code and tags. Select the ones you want evidenced on your career roadmap:
            </p>

            {/* Suggested skills from repo */}
            {repo.suggestedSkills.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {repo.suggestedSkills.map(skill => {
                  const isSelected = selectedSkills.includes(skill.name);
                  return (
                    <div
                      key={skill.name}
                      onClick={() => toggleSkill(skill.name)}
                      className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-brand-500/10 border-brand-500/30 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="font-semibold text-white block">{skill.name}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{skill.reason}</span>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-brand-500 border-brand-500 text-slate-950' : 'border-slate-700 bg-slate-900'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400">
                No automatic skills detected. You can select relevant skills from your roadmap:
              </div>
            )}

            {/* Optional extra skill picker */}
            <div className="mt-3">
              <span className="text-[11px] text-slate-400 block mb-1.5">
                Add other skills from your roadmap:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {availableSkills
                  .filter(s => !repo.suggestedSkills.some(rs => rs.name.toLowerCase() === s.name.toLowerCase()))
                  .slice(0, 15)
                  .map(s => {
                    const isSelected = selectedSkills.includes(s.name);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleSkill(s.name)}
                        className={`text-[11px] px-2.5 py-1 rounded-md border font-medium transition-colors ${
                          isSelected
                            ? 'bg-brand-500 text-slate-950 border-brand-500'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {s.name}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Importing...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Confirm Import</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

