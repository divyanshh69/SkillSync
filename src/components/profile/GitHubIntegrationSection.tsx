import React, { useState, useEffect } from 'react';
import { 
  GitHubUserProfile, 
  GitHubRepoSummary, 
  Skill, 
  Project 
} from '../../types';
import { api } from '../../services/api';
import { ImportGitHubModal } from './ImportGitHubModal';
import { 
  Github, 
  Search, 
  ExternalLink, 
  Star, 
  GitFork, 
  Check, 
  RefreshCw, 
  AlertCircle, 
  Plus, 
  Loader2,
  CheckCircle2
} from 'lucide-react';

interface GitHubIntegrationSectionProps {
  initialUsername?: string;
  availableSkills: Skill[];
  existingProjects: Project[];
  onProjectImported?: (project: Project) => void;
  onUsernameSaved?: (username: string) => void;
}

export const GitHubIntegrationSection: React.FC<GitHubIntegrationSectionProps> = ({
  initialUsername,
  availableSkills,
  existingProjects,
  onProjectImported,
  onUsernameSaved
}) => {
  const [usernameInput, setUsernameInput] = useState(initialUsername || '');
  const [activeUsername, setActiveUsername] = useState<string | null>(initialUsername || null);
  const [gitHubUser, setGitHubUser] = useState<GitHubUserProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepoSummary[]>([]);
  const [searchFilter, setSearchFilter] = useState('');

  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal state
  const [selectedRepoForImport, setSelectedRepoForImport] = useState<GitHubRepoSummary | null>(null);

  // Sync initialUsername prop if it changes
  useEffect(() => {
    if (initialUsername && initialUsername !== activeUsername) {
      setUsernameInput(initialUsername);
      setActiveUsername(initialUsername);
      loadGitHubData(initialUsername);
    }
  }, [initialUsername]);

  // Initial load if username exists
  useEffect(() => {
    if (activeUsername && !gitHubUser && !isLoadingProfile) {
      loadGitHubData(activeUsername);
    }
  }, [activeUsername]);

  const loadGitHubData = async (userToFetch: string) => {
    const cleanUser = userToFetch.trim().replace(/^@+/, '');
    if (!cleanUser) return;

    setErrorMessage(null);
    setIsLoadingProfile(true);
    setIsLoadingRepos(true);

    try {
      // 1. Fetch Profile
      const profile = await api.getGitHubProfile(cleanUser);
      setGitHubUser(profile);
      setActiveUsername(cleanUser);

      // Save to profile in backend
      if (onUsernameSaved) {
        onUsernameSaved(cleanUser);
      }

      // 2. Fetch Repositories
      const repoList = await api.getGitHubRepositories(cleanUser);
      setRepos(repoList);
    } catch (err: any) {
      console.error('Failed to load GitHub data:', err);
      setErrorMessage(err.message || 'Could not load GitHub profile. Please check the username.');
      setGitHubUser(null);
      setRepos([]);
    } finally {
      setIsLoadingProfile(false);
      setIsLoadingRepos(false);
    }
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    loadGitHubData(usernameInput);
  };

  const handleDisconnect = () => {
    setActiveUsername(null);
    setGitHubUser(null);
    setRepos([]);
    setUsernameInput('');
    setErrorMessage(null);
    if (onUsernameSaved) {
      onUsernameSaved('');
    }
  };

  const handleImportSuccess = (importedProject: Project) => {
    // 1. Update repo list so the imported repo immediately shows as imported
    setRepos(prevRepos =>
      prevRepos.map(r => {
        if (
          r.id === importedProject.githubRepoId ||
          r.url.toLowerCase().replace(/\/+$/, '') === (importedProject.githubUrl || '').toLowerCase().replace(/\/+$/, '')
        ) {
          return { ...r, isAlreadyImported: true };
        }
        return r;
      })
    );

    // 2. Notify parent component
    if (onProjectImported) {
      onProjectImported(importedProject);
    }

    setSuccessMessage(`Successfully imported "${importedProject.name}" as project evidence!`);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Cross-reference existing projects to mark imported status
  const enrichedRepos = repos.map(repo => {
    const isImportedInProps = existingProjects.some(p => {
      if (p.githubRepoId && String(p.githubRepoId) === String(repo.id)) return true;
      if (p.githubUrl && p.githubUrl.toLowerCase().replace(/\/+$/, '') === repo.url.toLowerCase().replace(/\/+$/, '')) return true;
      return false;
    });
    return {
      ...repo,
      isAlreadyImported: repo.isAlreadyImported || isImportedInProps
    };
  });

  const filteredRepos = enrichedRepos.filter(r => {
    const q = searchFilter.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.primaryLanguage && r.primaryLanguage.toLowerCase().includes(q)) ||
      r.technologies.some(t => t.toLowerCase().includes(q)) ||
      r.suggestedSkills.some(s => s.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white shrink-0">
            <Github className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>GitHub Integration & Projects</span>
              {gitHubUser && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Connected
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Connect your public GitHub username to import real repositories as verified skill evidence.
            </p>
          </div>
        </div>

        {gitHubUser && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => loadGitHubData(gitHubUser.username)}
              disabled={isLoadingRepos}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors"
              title="Refresh repositories"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRepos ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleDisconnect}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      {errorMessage && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-2.5 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Unable to fetch GitHub data</p>
            <p className="text-[11px] text-rose-400 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Connection Form (shown if not connected) */}
      {!gitHubUser && (
        <form onSubmit={handleConnect} className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-mono select-none">
              github.com/
            </span>
            <input
              type="text"
              value={usernameInput}
              onChange={e => setUsernameInput(e.target.value)}
              placeholder="username (e.g. torvalds)"
              className="w-full pl-28 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              disabled={isLoadingProfile}
            />
          </div>
          <button
            type="submit"
            disabled={isLoadingProfile || !usernameInput.trim()}
            className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50 shadow-sm"
          >
            {isLoadingProfile ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Github className="w-3.5 h-3.5" />
                <span>Connect GitHub</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Connected GitHub Profile Card */}
      {gitHubUser && (
        <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={gitHubUser.avatarUrl}
              alt={gitHubUser.username}
              className="w-10 h-10 rounded-full border border-slate-700 object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">{gitHubUser.name || gitHubUser.username}</span>
                <span className="text-slate-400 font-mono text-[11px]">@{gitHubUser.username}</span>
              </div>
              {gitHubUser.bio && (
                <p className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">{gitHubUser.bio}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px] self-end sm:self-auto">
            <span>
              <strong className="text-white font-mono">{gitHubUser.publicReposCount}</strong> public repos
            </span>
            <a
              href={gitHubUser.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 hover:text-brand-200 flex items-center gap-1 font-medium"
            >
              <span>GitHub Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Repositories Section */}
      {gitHubUser && (
        <div className="space-y-3 pt-2">
          {/* Search & Filter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Public Repositories</span>
              <span className="text-[11px] text-slate-400 font-mono">({filteredRepos.length})</span>
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Filter repositories or tech..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Loading indicator */}
          {isLoadingRepos ? (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
              <Loader2 className="w-5 h-5 animate-spin text-brand-400" />
              <span>Scanning public repositories & extracting skills...</span>
            </div>
          ) : filteredRepos.length === 0 ? (
            <div className="p-6 text-center bg-slate-950 border border-slate-800 rounded-xl text-slate-400 text-xs">
              {searchFilter ? 'No repositories match your search filter.' : 'No public repositories found for this user.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredRepos.map(repo => (
                <div
                  key={repo.id}
                  className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  {/* Left Column: Repo Name, Language, Description, Skills */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center flex-wrap gap-2">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-white text-xs hover:text-brand-300 transition-colors truncate flex items-center gap-1"
                      >
                        <span>{repo.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </a>

                      {repo.primaryLanguage && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                          {repo.primaryLanguage}
                        </span>
                      )}

                      {repo.stars > 0 && (
                        <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{repo.stars}</span>
                        </span>
                      )}

                      {repo.forks > 0 && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                          <GitFork className="w-3 h-3" />
                          <span>{repo.forks}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
                      {repo.description || 'Public GitHub repository'}
                    </p>

                    {/* Detected Skills / Technologies */}
                    <div className="flex flex-wrap items-center gap-1 pt-0.5">
                      {repo.suggestedSkills.slice(0, 4).map(skill => (
                        <span
                          key={skill.name}
                          className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20"
                        >
                          {skill.name}
                        </span>
                      ))}
                      {repo.suggestedSkills.length > 4 && (
                        <span className="text-[10px] text-slate-500">
                          +{repo.suggestedSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="shrink-0 self-start sm:self-center">
                    {repo.isAlreadyImported ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Imported</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedRepoForImport(repo)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-bold transition-colors shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Import as Project</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Import Modal */}
      <ImportGitHubModal
        isOpen={Boolean(selectedRepoForImport)}
        onClose={() => setSelectedRepoForImport(null)}
        repo={selectedRepoForImport}
        availableSkills={availableSkills}
        onImportSuccess={handleImportSuccess}
      />
    </div>
  );
};

