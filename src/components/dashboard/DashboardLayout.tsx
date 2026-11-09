import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { NavigationTab, CareerProfile } from '../../types';
import { Menu, Sparkles, ArrowUpRight, Compass } from 'lucide-react';

interface DashboardLayoutProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onExitToLanding: () => void;
  profile: CareerProfile;
  dbConnected?: boolean;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitToLanding,
  profile,
  dbConnected,
  children
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const getPageTitle = (tab: NavigationTab) => {
    switch (tab) {
      case 'dashboard': return 'Command Center';
      case 'roadmap': return 'Full-Stack Developer Roadmap';
      case 'projects': return 'Project Evidence Ledger';
      case 'companion': return 'AI Career Companion';
      case 'profile': return 'Career Profile & Goals';
    }
  };

  const getPageSubtitle = (tab: NavigationTab) => {
    switch (tab) {
      case 'dashboard': return 'Track progress, verify competencies, and execute your Next Best Step.';
      case 'roadmap': return '5 phases structured from core web fundamentals to cloud architectures.';
      case 'projects': return 'Tangible proof linking your GitHub code directly to demanded skills.';
      case 'companion': return 'Context-aware guidance, resume translation, and project ideation.';
      case 'profile': return 'Manage your target career trajectory, university milestones, and velocity.';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        onExitToLanding={onExitToLanding}
        profile={profile}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {getPageTitle(currentTab)}
                </h1>
                {dbConnected ? (
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    PostgreSQL Connected
                  </span>
                ) : (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-brand-300 border border-slate-700">
                    <Sparkles className="w-3 h-3 text-brand-400" />
                    Prototype Demo
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                {getPageSubtitle(currentTab)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Demo Switcher */}
            <button
              onClick={onExitToLanding}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-brand-400" />
              <span className="hidden sm:inline">Landing Page</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Profile Avatar trigger */}
            <div 
              onClick={() => onSelectTab('profile')}
              className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-slate-900 transition-colors"
              title="View Profile"
            >
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/30"
              />
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
};
