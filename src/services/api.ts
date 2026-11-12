import { 
  CareerProfile, 
  NextBestStep, 
  RoadmapPhase, 
  Project, 
  Skill, 
  OnboardingData, 
  GitHubAnalysisResult,
  GitHubUserProfile,
  GitHubRepoSummary,
  ImportRepoPayload
} from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export interface DashboardResponse {
  profile: CareerProfile;
  readiness: {
    score: number;
    totalSkills: number;
    completedSkills: number;
    inProgressSkills: number;
    evidencedSkills: number;
    theoryOnlySkills: number;
    notStartedSkills: number;
  };
  nextBestStep: NextBestStep;
  roadmapPhases: RoadmapPhase[];
  recentProjects: Project[];
}

/**
 * Robust JSON request helper that consistently surfaces structured backend error messages
 */
async function requestJson<T>(url: string, options?: RequestInit, fallbackMsg = 'Request failed'): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errJson = await res.json().catch(() => null);
    throw new Error(errJson?.error || errJson?.message || `${fallbackMsg} (${res.status})`);
  }
  const json = await res.json();
  return json.data !== undefined ? json.data : json;
}

export const api = {
  // 1. Dashboard Aggregate
  async getDashboard(): Promise<DashboardResponse> {
    return requestJson<DashboardResponse>(`${API_BASE}/dashboard`, undefined, 'Failed to retrieve dashboard data');
  },

  async getNextStepRecommendation(): Promise<NextBestStep> {
    return requestJson<NextBestStep>(`${API_BASE}/dashboard/next-step`, undefined, 'Failed to retrieve next step recommendation');
  },

  // 2. Profile
  async getProfile(): Promise<CareerProfile> {
    return requestJson<CareerProfile>(`${API_BASE}/profile`, undefined, 'Failed to retrieve profile');
  },

  async updateProfile(updates: Partial<CareerProfile>): Promise<CareerProfile> {
    return requestJson<CareerProfile>(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    }, 'Failed to update profile');
  },

  // 3. Skills
  async getSkills(): Promise<Skill[]> {
    return requestJson<Skill[]>(`${API_BASE}/skills`, undefined, 'Failed to retrieve skills');
  },

  async updateSkill(skillIdOrName: string, updates: Partial<Skill>): Promise<Skill & { nextBestStep?: NextBestStep; readiness?: any }> {
    const encoded = encodeURIComponent(skillIdOrName);
    return requestJson<Skill & { nextBestStep?: NextBestStep; readiness?: any }>(`${API_BASE}/skills/${encoded}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    }, 'Failed to update skill progress');
  },

  // 4. Projects
  async getProjects(): Promise<Project[]> {
    return requestJson<Project[]>(`${API_BASE}/projects`, undefined, 'Failed to retrieve projects');
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    return requestJson<Project>(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    }, 'Failed to create project');
  },

  async deleteProject(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      throw new Error(errJson?.error || `Failed to delete project (${res.status})`);
    }
  },

  // 4b. GitHub Analysis & Profile Integration
  async analyzeGitHubRepo(repositoryUrl: string): Promise<GitHubAnalysisResult> {
    return requestJson<GitHubAnalysisResult>(`${API_BASE}/github/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repositoryUrl }),
    }, 'Failed to analyze repository');
  },

  async getGitHubProfile(username: string): Promise<GitHubUserProfile> {
    const encoded = encodeURIComponent(username.trim().replace(/^@+/, ''));
    return requestJson<GitHubUserProfile>(`${API_BASE}/github/user/${encoded}`, undefined, 'Failed to fetch GitHub profile');
  },

  async getGitHubRepositories(username: string): Promise<GitHubRepoSummary[]> {
    const encoded = encodeURIComponent(username.trim().replace(/^@+/, ''));
    return requestJson<GitHubRepoSummary[]>(`${API_BASE}/github/user/${encoded}/repos`, undefined, 'Failed to fetch GitHub repositories');
  },

  async importGitHubProject(payload: ImportRepoPayload): Promise<Project> {
    return requestJson<Project>(`${API_BASE}/github/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }, 'Failed to import GitHub project');
  },

  // 5. AI Assistant
  async sendChatMessage(
    message: string,
    history?: Array<{ role: 'user' | 'assistant'; content: string }>
  ): Promise<{ message: string; reply: string; isMockFallback?: boolean }> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 18000); // 18-second client safeguard timeout

    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
        signal: controller.signal
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.error || json?.message || `HTTP error ${res.status}`);
      }

      if (!json) {
        throw new Error('Empty response received from server');
      }

      // Handle structured { "message": "..." } or legacy aliases
      const text = json.message || json.reply || json.data?.reply || '';
      if (!text) {
        throw new Error('Received an empty reply from the Career Assistant');
      }

      return {
        message: text,
        reply: text,
        isMockFallback: Boolean(json.isMockFallback || json.data?.isMockFallback)
      };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw new Error('Request timed out while waiting for AI response. Please try again.');
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  // 6. Onboarding
  async submitOnboarding(data: OnboardingData): Promise<{
    profile: CareerProfile;
    readiness: { score: number };
    nextBestStep: NextBestStep;
  }> {
    return requestJson<{
      profile: CareerProfile;
      readiness: { score: number };
      nextBestStep: NextBestStep;
    }>(`${API_BASE}/onboarding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }, 'Failed to submit onboarding');
  },

  async getOnboardingStatus(): Promise<{ isOnboarded: boolean; name?: string; targetCareer?: string }> {
    return requestJson<{ isOnboarded: boolean; name?: string; targetCareer?: string }>(
      `${API_BASE}/onboarding/status`, 
      undefined, 
      'Failed to retrieve onboarding status'
    );
  },

  async resetOnboarding(): Promise<void> {
    const res = await fetch(`${API_BASE}/onboarding/reset`, { method: 'POST' });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  },

  // 7. Health
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
      return res.ok;
    } catch {
      return false;
    }
  }
};
