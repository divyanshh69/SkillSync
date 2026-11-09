import { CareerProfile, NextBestStep, RoadmapPhase, Project, Skill } from '../types';

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

  // 5. Health
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
      return res.ok;
    } catch {
      return false;
    }
  }
};

