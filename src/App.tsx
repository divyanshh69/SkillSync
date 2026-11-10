import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  demoProfile, 
  demoNextBestStep, 
  demoRoadmapPhases, 
  demoProjects, 
  demoCompanionInitialMessages,
  calculateSkillStats 
} from './data/demoData';
import { 
  CareerProfile, 
  NextBestStep, 
  RoadmapPhase, 
  Project, 
  NavigationTab,
  Skill,
  OnboardingData
} from './types';
import { api } from './services/api';
import { Sparkles, ArrowRight } from 'lucide-react';

// Landing Page components
import { LandingNavbar } from './components/landing/LandingNavbar';
import { LandingHero } from './components/landing/LandingHero';
import { HowItWorks } from './components/landing/HowItWorks';
import { FeaturesGrid } from './components/landing/FeaturesGrid';
import { LandingFooter } from './components/landing/LandingFooter';

// Dashboard components
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { WelcomeSection } from './components/dashboard/WelcomeSection';
import { NextBestStepHero } from './components/dashboard/NextBestStepHero';
import { CareerReadiness } from './components/dashboard/CareerReadiness';
import { RoadmapPreview } from './components/dashboard/RoadmapPreview';
import { ProjectEvidence } from './components/dashboard/ProjectEvidence';

// Subviews
import { RoadmapView } from './components/roadmap/RoadmapView';
import { ProjectsView } from './components/projects/ProjectsView';
import { CompanionView } from './components/companion/CompanionView';
import { ProfileView } from './components/profile/ProfileView';
import { AddProjectModal } from './components/projects/AddProjectModal';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';

export const App: React.FC = () => {
  // Navigation State
  const [viewMode, setViewMode] = useState<'landing' | 'onboarding' | 'app'>('landing');
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');

  // App Data State (initialized with demo data for instantaneous render)
  const [profile, setProfile] = useState<CareerProfile>(demoProfile);
  const [nextStep, setNextStep] = useState<NextBestStep>(demoNextBestStep);
  const [phases, setPhases] = useState<RoadmapPhase[]>(demoRoadmapPhases);
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [isAddEvidenceModalOpen, setIsAddEvidenceModalOpen] = useState(false);

  // Backend connection & status state
  const [isConnectedToBackend, setIsConnectedToBackend] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Hydrate data from PostgreSQL Backend API
  const loadDataFromBackend = useCallback(async () => {
    try {
      const dashboardData = await api.getDashboard();
      if (dashboardData) {
        setProfile(dashboardData.profile);
        if (dashboardData.roadmapPhases && dashboardData.roadmapPhases.length > 0) {
          setPhases(dashboardData.roadmapPhases);
        }
        if (dashboardData.recentProjects) {
          setProjects(dashboardData.recentProjects);
        }
        if (dashboardData.nextBestStep) {
          setNextStep(dashboardData.nextBestStep);
        }
        setIsConnectedToBackend(true);
      }
    } catch (err) {
      console.warn('Backend server not reachable or initializing; using local demo data fallback:', err);
      setIsConnectedToBackend(false);
    }
  }, []);

  useEffect(() => {
    loadDataFromBackend();
  }, [loadDataFromBackend]);

  // Compute live skills statistics from the active roadmap phases
  const skillStats = useMemo(() => {
    return calculateSkillStats(phases);
  }, [phases]);

  // Keep profile readiness synchronized with calculated readiness + criteria bonus
  const currentReadiness = useMemo(() => {
    const completedCriteriaCount = nextStep.criteria.filter(c => c.completed).length;
    const bonus = completedCriteriaCount * 2;
    return Math.min(100, skillStats.calculatedReadiness + bonus);
  }, [skillStats, nextStep.criteria]);

  // Handler to toggle a Next Best Step criterion
  const handleToggleCriterion = (criterionId: string) => {
    setNextStep(prev => ({
      ...prev,
      criteria: prev.criteria.map(c => 
        c.id === criterionId ? { ...c, completed: !c.completed } : c
      )
    }));
  };

  // Handler to add a new project and persist it to PostgreSQL
  const handleAddProject = async (newProject: Project) => {
    // 1. Optimistic local state update for instant UI feedback
    setProjects(prev => [newProject, ...prev]);

    // Mark evidenced skills in roadmap phases
    setPhases(prevPhases => 
      prevPhases.map(phase => ({
        ...phase,
        skills: phase.skills.map(skill => {
          if (newProject.evidencedSkills.includes(skill.name)) {
            return {
              ...skill,
              status: skill.status === 'not-started' ? 'in-progress' : skill.status,
              isProjectEvidenced: true,
              evidencedByProjectNames: Array.from(new Set([
                ...(skill.evidencedByProjectNames || []),
                newProject.name
              ]))
            };
          }
          return skill;
        })
      }))
    );

    // 2. Persist to PostgreSQL backend
    if (isConnectedToBackend) {
      try {
        setSaveStatus('Saving project to database...');
        const savedProject = await api.createProject(newProject);
        if (savedProject) {
          // Re-sync with backend to ensure all relationship counters match
          await loadDataFromBackend();
        }
        setSaveStatus('Project saved successfully!');
        setTimeout(() => setSaveStatus(null), 2500);
      } catch (err) {
        console.error('Failed to persist project to backend:', err);
        setSaveStatus('Notice: Saved locally (backend offline)');
        setTimeout(() => setSaveStatus(null), 3000);
      }
    }
  };

  // Handler to delete a project and persist to PostgreSQL
  const handleDeleteProject = async (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (isConnectedToBackend) {
      try {
        setSaveStatus('Removing project...');
        await api.deleteProject(projectId);
        await loadDataFromBackend();
        setSaveStatus('Project removed');
        setTimeout(() => setSaveStatus(null), 2000);
      } catch (err) {
        console.error('Failed to delete project:', err);
      }
    }
  };

  // Handler for updating student profile and persisting to PostgreSQL
  const handleUpdateProfile = async (updates: Partial<CareerProfile>) => {
    // 1. Optimistic update
    setProfile(prev => ({ ...prev, ...updates }));
    if (updates.targetCareer) {
      setNextStep(prev => ({ ...prev, targetCareer: updates.targetCareer! }));
    }

    // 2. Persist to PostgreSQL
    if (isConnectedToBackend) {
      try {
        setSaveStatus('Updating profile...');
        await api.updateProfile(updates);
        // Re-sync with backend to get track-specific Next Best Step and calculations
        await loadDataFromBackend();
        setSaveStatus('Profile updated in database!');
        setTimeout(() => setSaveStatus(null), 2500);
      } catch (err) {
        console.error('Failed to persist profile update to backend:', err);
      }
    }
  };

  // Handler for completing personalized onboarding and generating a fresh roadmap
  const handleCompleteOnboarding = async (onboardingData: OnboardingData) => {
    try {
      setSaveStatus('Personalizing your roadmap in database...');
      const response = await api.submitOnboarding(onboardingData);
      if (response) {
        setProfile(response.profile);
        if (response.nextBestStep) {
          setNextStep(response.nextBestStep);
        }
      }
      // Re-hydrate backend dashboard data
      await loadDataFromBackend();
      setViewMode('app');
      setCurrentTab('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSaveStatus(`Welcome, ${onboardingData.name}! Your ${onboardingData.targetCareer} roadmap is ready.`);
      setTimeout(() => setSaveStatus(null), 3500);
    } catch (err: any) {
      console.error('Failed to complete onboarding:', err);
      throw err;
    }
  };

  // Handler for updating individual skill status and persisting to PostgreSQL
  const handleSkillUpdate = async (skillId: string, updates: Partial<Skill>) => {
    // 1. Optimistic update in phases
    setPhases(prevPhases =>
      prevPhases.map(phase => ({
        ...phase,
        skills: phase.skills.map(skill => {
          if (skill.id === skillId || skill.name === skillId) {
            return { ...skill, ...updates };
          }
          return skill;
        })
      }))
    );

    // 2. Persist to PostgreSQL
    if (isConnectedToBackend) {
      try {
        setSaveStatus(`Updating skill...`);
        await api.updateSkill(skillId, updates);
        setSaveStatus('Skill progress saved!');
        setTimeout(() => setSaveStatus(null), 2000);
      } catch (err) {
        console.error('Failed to persist skill update to backend:', err);
      }
    }
  };

  // Flat list of all skills across phases
  const allSkills: Skill[] = useMemo(() => {
    return phases.flatMap(p => p.skills);
  }, [phases]);

  // Current active learning phase (Phase 3)
  const currentActivePhase = phases.find(p => p.status === 'in-progress') || phases[2];

  // Render Landing Page
  if (viewMode === 'landing') {
    const handleStartJourney = () => {
      setViewMode(profile.isOnboarded ? 'app' : 'onboarding');
      setCurrentTab('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-brand-500/30 selection:text-brand-200">
        <LandingNavbar 
          onExploreDemo={() => {
            setViewMode('app');
            setCurrentTab('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onStartJourney={handleStartJourney}
        />

        <main>
          <LandingHero 
            onExploreDemo={() => {
              setViewMode('app');
              setCurrentTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartJourney={handleStartJourney}
          />

          <div id="how-it-works">
            <HowItWorks 
              onExploreDemo={() => {
                setViewMode('app');
                setCurrentTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          <div id="features">
            <FeaturesGrid />
          </div>
        </main>

        <LandingFooter 
          onExploreDemo={() => {
            setViewMode('app');
            setCurrentTab('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    );
  }

  // Render Personalized Career Onboarding Flow
  if (viewMode === 'onboarding') {
    return (
      <OnboardingFlow
        onComplete={handleCompleteOnboarding}
        onCancel={() => {
          setViewMode('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        initialData={{
          name: profile.name === 'Alex Rivera' ? '' : profile.name,
          education: profile.education?.includes('Washington') ? '' : profile.education,
          targetCareer: profile.targetCareer,
          experienceLevel: (profile.experienceLevel as any) || 'Beginner',
          weeklyGoalHours: profile.weeklyGoalHours
        }}
      />
    );
  }

  // Render Command Center Dashboard Application
  return (
    <DashboardLayout
      currentTab={currentTab}
      onSelectTab={(tab) => {
        setCurrentTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onExitToLanding={() => {
        setViewMode('landing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      dbConnected={isConnectedToBackend}
      profile={{
        ...profile,
        readinessPercentage: currentReadiness
      }}
    >
      {/* Toast Notification Banner for Database Sync */}
      {saveStatus && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-brand-500/40 text-brand-300 text-xs font-semibold shadow-2xl shadow-black/80 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* 1. Main Dashboard Home */}
      {currentTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Personalization Prompt Banner (if not yet onboarded) */}
          {!profile.isOnboarded && (
            <div className="bg-gradient-to-r from-brand-500/15 via-brand-600/10 to-slate-900 border border-brand-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-300 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    Viewing Demo Account • Ready to personalize your roadmap?
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Complete the 1-minute career setup to generate your custom milestones and track your own progress.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewMode('onboarding')}
                className="px-3.5 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
              >
                <span>Personalize Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Welcome Section */}
          <WelcomeSection
            name={profile.name}
            targetCareer={profile.targetCareer}
          />

          {/* Next Best Step Hero Card (Primary Focus) */}
          <NextBestStepHero
            step={nextStep}
            onCriteriaToggle={handleToggleCriterion}
          />

          {/* Simple Progress Summary */}
          <CareerReadiness
            readinessPercentage={currentReadiness}
            totalSkills={skillStats.total}
            completedSkills={skillStats.completed}
            projectCount={projects.length}
            currentPhaseTitle={`Phase ${currentActivePhase.phaseNumber}: ${currentActivePhase.title}`}
          />

          {/* Current Learning Phase Preview */}
          <RoadmapPreview
            currentPhase={currentActivePhase}
            onViewFullRoadmap={() => setCurrentTab('roadmap')}
            onSkillClick={(skill) => handleSkillUpdate(skill.id, { status: skill.status === 'completed' ? 'in-progress' : 'completed' })}
          />

          {/* Recent Projects */}
          <ProjectEvidence
            projects={projects}
            onAddProject={() => setIsAddEvidenceModalOpen(true)}
            onViewAllProjects={() => setCurrentTab('projects')}
          />

          {/* Modal to add project directly from Dashboard */}
          <AddProjectModal
            isOpen={isAddEvidenceModalOpen}
            onClose={() => setIsAddEvidenceModalOpen(false)}
            availableSkills={allSkills}
            onAddProject={handleAddProject}
          />
        </div>
      )}

      {/* 2. Full Roadmap View */}
      {currentTab === 'roadmap' && (
        <RoadmapView
          phases={phases}
          onSkillUpdate={handleSkillUpdate}
          onNavigateToProjects={() => setCurrentTab('projects')}
        />
      )}

      {/* 3. Projects View */}
      {currentTab === 'projects' && (
        <ProjectsView
          projects={projects}
          availableSkills={allSkills}
          onAddProject={handleAddProject}
          onDeleteProject={handleDeleteProject}
        />
      )}

      {/* 4. AI Career Companion */}
      {currentTab === 'companion' && (
        <CompanionView
          profile={{
            ...profile,
            readinessPercentage: currentReadiness
          }}
          nextStep={nextStep}
          initialMessages={demoCompanionInitialMessages}
          onOpenStepGuide={() => setCurrentTab('dashboard')}
        />
      )}

      {/* 5. Profile & Target Career Customization */}
      {currentTab === 'profile' && (
        <ProfileView
          profile={{
            ...profile,
            readinessPercentage: currentReadiness
          }}
          onUpdateProfile={handleUpdateProfile}
          onStartOnboarding={() => setViewMode('onboarding')}
        />
      )}
    </DashboardLayout>
  );
};

export default App;
