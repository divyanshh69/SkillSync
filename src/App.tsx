import React, { useState, useMemo } from 'react';
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
  Skill 
} from './types';

// Landing Page components
import { LandingNavbar } from './components/landing/LandingNavbar';
import { LandingHero } from './components/landing/LandingHero';
import { HowItWorks } from './components/landing/HowItWorks';
import { FeaturesGrid } from './components/landing/FeaturesGrid';
import { LandingFooter } from './components/landing/LandingFooter';

// Dashboard components
import { DashboardLayout } from './components/dashboard/DashboardLayout';
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

export const App: React.FC = () => {
  // Navigation State
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');

  // App Data State
  const [profile, setProfile] = useState<CareerProfile>(demoProfile);
  const [nextStep, setNextStep] = useState<NextBestStep>(demoNextBestStep);
  const [phases, setPhases] = useState<RoadmapPhase[]>(demoRoadmapPhases);
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [isAddEvidenceModalOpen, setIsAddEvidenceModalOpen] = useState(false);

  // Compute live skills statistics
  const skillStats = useMemo(() => {
    return calculateSkillStats(phases);
  }, [phases]);

  // Keep profile readiness synchronized with calculated readiness
  const currentReadiness = useMemo(() => {
    // If criteria are completed in the next step, give bonus
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

  // Handler to add a new project and update evidenced skills in roadmap
  const handleAddProject = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);

    // Mark the evidenced skills as project-evidenced in the roadmap
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
  };

  // Handler for updating student profile
  const handleUpdateProfile = (updates: Partial<CareerProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    if (updates.targetCareer) {
      setNextStep(prev => ({ ...prev, targetCareer: updates.targetCareer! }));
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
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-brand-500/30 selection:text-brand-200">
        <LandingNavbar 
          onExploreDemo={() => {
            setViewMode('app');
            setCurrentTab('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onStartJourney={() => {
            setViewMode('app');
            setCurrentTab('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        <main>
          <LandingHero 
            onExploreDemo={() => {
              setViewMode('app');
              setCurrentTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartJourney={() => {
              setViewMode('app');
              setCurrentTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
      profile={{
        ...profile,
        readinessPercentage: currentReadiness
      }}
    >
      {/* 1. Main Dashboard Command Center */}
      {currentTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Next Best Step Hero Card */}
          <NextBestStepHero
            step={nextStep}
            onCriteriaToggle={handleToggleCriterion}
          />

          {/* Career Readiness Progress Summary */}
          <CareerReadiness
            readinessPercentage={currentReadiness}
            totalSkills={skillStats.total}
            completedSkills={skillStats.completed}
            inProgressSkills={skillStats.inProgress}
            evidencedSkills={skillStats.projectEvidenced}
            notStartedSkills={skillStats.notStarted}
          />

          {/* Current Learning Phase Preview */}
          <RoadmapPreview
            currentPhase={currentActivePhase}
            onViewFullRoadmap={() => setCurrentTab('roadmap')}
          />

          {/* Recent Project Evidence */}
          <ProjectEvidence
            projects={projects}
            onAddProject={() => setIsAddEvidenceModalOpen(true)}
            onViewAllProjects={() => setCurrentTab('projects')}
          />

          {/* Modal to add project evidence directly from Dashboard */}
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
          onNavigateToProjects={() => setCurrentTab('projects')}
        />
      )}

      {/* 3. Projects View */}
      {currentTab === 'projects' && (
        <ProjectsView
          projects={projects}
          availableSkills={allSkills}
          onAddProject={handleAddProject}
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
        />
      )}
    </DashboardLayout>
  );
};

export default App;
