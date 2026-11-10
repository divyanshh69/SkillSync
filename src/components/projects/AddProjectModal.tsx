import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Project, Skill, GitHubAnalysisResult, SuggestedSkillItem } from '../../types';
import { api } from '../../services/api';
import { 
  Check, 
  Github, 
  Loader2, 
  Sparkles, 
  X, 
  AlertCircle, 
  FileCode, 
  ExternalLink,
  Code2
} from 'lucide-react';

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

  // GitHub Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<GitHubAnalysisResult | null>(null);
  const [suggestedSkills, setSuggestedSkills] = useState<SuggestedSkillItem[]>([]);

  const handleAnalyzeRepo = async () => {
    if (!githubUrl.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const result = await api.analyzeGitHubRepo(githubUrl.trim());
      setAnalysisResult(result);
      setSuggestedSkills(result.suggestedSkills);

      // Pre-fill fields if currently empty
      if (!name.trim() && result.repository.name) {
        setName(result.repository.name);
      }
      if (!tagline.trim() && result.repository.description) {
        setTagline(result.repository.description.slice(0, 90));
      }
      if (!description.trim() && result.repository.description) {
        setDescription(result.repository.description);
      }

      // Populate technologies
      if (result.technologies.length > 0) {
        const currentTechs = technologiesInput
          .split(',')
          .map(t => t.trim())
          .filter(Boolean);
        const mergedTechs = Array.from(new Set([...currentTechs, ...result.technologies]));
        setTechnologiesInput(mergedTechs.join(', '));
      }

      // Pre-select suggested skills
      const newSkillNames = result.suggestedSkills.map(s => s.name);
      setSelectedSkills(prev => Array.from(new Set([...prev, ...newSkillNames])));
    } catch (err: any) {
      setAnalysisError(err.message || 'Failed to analyze repository');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRemoveSuggestedSkill = (skillName: string) => {
    setSuggestedSkills(prev => prev.filter(s => s.name !== skillName));
    setSelectedSkills(prev => prev.filter(s => s !== skillName));
  };

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
      evidencedSkills: selectedSkills.length > 0 ? selectedSkills : ['Git & Version Control'],
      githubUrl: githubUrl.trim() || undefined,
      liveDemoUrl: liveDemoUrl.trim() || undefined,
      completionDate: 'Recently added',
      status: 'Completed'
    };

    onAddProject(newProject);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    // Reset form after short delay
    setTimeout(() => {
      setName('');
      setTagline('');
      setDescription('');
      setGithubUrl('');
      setLiveDemoUrl('');
      setTechnologiesInput('');
      setSelectedSkills([]);
      setIsAnalyzing(false);
      setAnalysisError(null);
      setAnalysisResult(null);
      setSuggestedSkills([]);
    }, 200);
  };

  const isGitHubUrlValid = githubUrl.trim().toLowerCase().includes('github.com/');

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Project Evidence"
      subtitle="Analyze a public GitHub repo or enter project details to prove your skills."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* GitHub URL Section with Analyze Button */}
        <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Github className="w-4 h-4 text-slate-300" />
              <span>Public GitHub Repository URL</span>
            </label>
            <span className="text-[11px] text-slate-500">Auto-detects tech & skills</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => {
                setGithubUrl(e.target.value);
                if (analysisError) setAnalysisError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && isGitHubUrlValid && !isAnalyzing) {
                  e.preventDefault();
                  handleAnalyzeRepo();
                }
              }}
              placeholder="https://github.com/username/repository"
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
            <button
              type="button"
              onClick={handleAnalyzeRepo}
              disabled={!isGitHubUrlValid || isAnalyzing}
              className={`
                px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 transition-all
                ${isGitHubUrlValid && !isAnalyzing
                  ? 'bg-brand-500 hover:bg-brand-400 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
              `}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Repository</span>
                </>
              )}
            </button>
          </div>

          {/* Loading State Banner */}
          {isAnalyzing && (
            <div className="p-3 bg-brand-500/10 border border-brand-500/30 rounded-lg flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-brand-400 animate-spin shrink-0" />
              <div>
                <p className="text-xs font-medium text-brand-200">
                  Analyzing your repository...
                </p>
                <p className="text-[11px] text-slate-400">
                  Inspecting dependencies, manifest files, and matching competencies
                </p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {analysisError && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg flex items-start gap-2.5 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-medium">{analysisError}</span>
              </div>
            </div>
          )}

          {/* Successful Analysis Review Card */}
          {analysisResult && !isAnalyzing && (
            <div className="pt-2 border-t border-slate-800/80 space-y-3">
              {/* Repo Summary Header */}
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white tracking-tight">
                      {analysisResult.repository.name}
                    </span>
                    <span className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-medium text-slate-300">
                      {analysisResult.repository.primaryLanguage}
                    </span>
                    {analysisResult.repository.stars !== undefined && analysisResult.repository.stars > 0 && (
                      <span className="text-[10px] text-amber-400">
                        ★ {analysisResult.repository.stars}
                      </span>
                    )}
                  </div>
                  {analysisResult.repository.description && (
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {analysisResult.repository.description}
                    </p>
                  )}
                </div>

                <a
                  href={analysisResult.repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 hover:underline shrink-0"
                >
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Detected Files */}
              {analysisResult.detectedFiles.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <FileCode className="w-3 h-3 text-slate-400" />
                    <span>Detected files:</span>
                  </span>
                  {analysisResult.detectedFiles.map(file => (
                    <span
                      key={file}
                      className="px-1.5 py-0.5 bg-slate-800/90 border border-slate-700/80 rounded text-[10px] font-mono text-slate-300"
                    >
                      {file}
                    </span>
                  ))}
                </div>
              )}

              {/* Detected Technologies */}
              {analysisResult.technologies.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-slate-400" />
                    <span>Technologies:</span>
                  </span>
                  {analysisResult.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-brand-500/10 border border-brand-500/30 rounded-full text-[11px] font-medium text-brand-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Suggested Skills Section */}
              {suggestedSkills.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-brand-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                      <span>Suggested Skills (Detected from repository)</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {suggestedSkills.length} suggested
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Suggestions are based on public repository files. You can remove any skill before saving.
                  </p>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto p-1.5 bg-slate-950 rounded-lg border border-slate-800">
                    {suggestedSkills.map(skill => {
                      const isSelected = selectedSkills.includes(skill.name);
                      return (
                        <div
                          key={skill.name}
                          className={`
                            flex items-center justify-between p-2 rounded-lg text-xs transition-colors border
                            ${isSelected
                              ? 'bg-brand-500/10 border-brand-500/30 text-white'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'}
                          `}
                        >
                          <div className="flex items-start gap-2 pr-2">
                            <button
                              type="button"
                              onClick={() => toggleSkill(skill.name)}
                              className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-brand-500 text-slate-950' : 'border border-slate-700'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </button>
                            <div>
                              <div className="font-medium text-xs text-white">
                                {skill.name}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                {skill.reason}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveSuggestedSkill(skill.name)}
                            title="Remove this suggestion"
                            className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Project Name & Tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
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
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        {/* Demo URL & Technologies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Live Demo URL (optional)
            </label>
            <input
              type="text"
              value={liveDemoUrl}
              onChange={(e) => setLiveDemoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Technologies Used (comma separated)
            </label>
            <input
              type="text"
              value={technologiesInput}
              onChange={(e) => setTechnologiesInput(e.target.value)}
              placeholder="React, TypeScript, Express, PostgreSQL"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe what this project does and what you learned..."
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors resize-none"
          />
        </div>

        {/* All Available Skills to Practice / Link */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-slate-300">
              {suggestedSkills.length > 0 
                ? 'All Available Competencies (Toggle to add or remove):' 
                : 'Select skills practiced in this project:'}
            </label>
            <span className="text-xs text-brand-400 font-semibold">
              {selectedSkills.length} selected
            </span>
          </div>

          <div className="max-h-32 overflow-y-auto p-2 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
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
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Evidence will be recorded in PostgreSQL upon saving.
          </p>
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-semibold transition-colors shadow-sm"
            >
              Save Project & Evidence
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
