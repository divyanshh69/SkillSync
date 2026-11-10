import { CareerProfile, NextBestStep, RoadmapPhase, Project, Skill, OnboardingData } from '../types';

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

export const api = {
  // 1. Dashboard Aggregate
  async getDashboard(): Promise<DashboardResponse> {
    const res = await fetch(`${API_BASE}/dashboard`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  // 2. Profile
  async getProfile(): Promise<CareerProfile> {
    const res = await fetch(`${API_BASE}/profile`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async updateProfile(updates: Partial<CareerProfile>): Promise<CareerProfile> {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  // 3. Skills
  async getSkills(): Promise<Skill[]> {
    const res = await fetch(`${API_BASE}/skills`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async updateSkill(skillIdOrName: string, updates: Partial<Skill>): Promise<Skill> {
    const encoded = encodeURIComponent(skillIdOrName);
    const res = await fetch(`${API_BASE}/skills/${encoded}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  // 4. Projects
  async getProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async deleteProject(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
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
    const res = await fetch(`${API_BASE}/onboarding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      throw new Error(errJson?.error || `HTTP error ${res.status}`);
    }
    const json = await res.json();
    return json.data;
  },

  async getOnboardingStatus(): Promise<{ isOnboarded: boolean; name?: string; targetCareer?: string }> {
    const res = await fetch(`${API_BASE}/onboarding/status`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data;
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

