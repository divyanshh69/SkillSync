export type SkillStatus = 'completed' | 'in-progress' | 'not-started';

export type SkillCategory = 
  | 'Frontend' 
  | 'Backend & APIs' 
  | 'Databases' 
  | 'DevOps & Tooling' 
  | 'Architecture & Security' 
  | 'Soft Skills';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  isProjectEvidenced: boolean;
  evidencedByProjectNames?: string[];
  importance: 'Essential' | 'Recommended' | 'Advanced';
  masteryScore?: number; // 0 - 100
  notes?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  evidencedSkills: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  stars?: number;
  featured?: boolean;
  completionDate: string;
  status: 'Completed' | 'In Development' | 'Planned';
  metrics?: string;
}

export interface CompletionCriterion {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export interface NextBestStep {
  id: string;
  targetCareer: string;
  title: string;
  whyRecommended: string;
  targetSkills: string[];
  estimatedEffort: string;
  impactLevel: 'High' | 'Very High' | 'Critical';
  criteria: CompletionCriterion[];
  actionGuideSteps?: string[];
  starterSnippet?: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  skills: Skill[];
}

export interface CareerProfile {
  name: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  education: string;
  targetCareer: string;
  readinessPercentage: number;
  weeklyGoalHours: number;
  hoursCompletedThisWeek: number;
  targetCompletionQuarter: string;
}

export interface CompanionMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  badge?: string;
  suggestedActions?: {
    label: string;
    actionKey: string;
  }[];
}

export type NavigationTab = 'dashboard' | 'roadmap' | 'projects' | 'companion' | 'profile';

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'bonus';
  message: string;
}

export interface CareerTrackConfig {
  id: string;
  name: string;
  subtitle: string;
  baseReadiness: number;
  nextBestStep: NextBestStep;
}


