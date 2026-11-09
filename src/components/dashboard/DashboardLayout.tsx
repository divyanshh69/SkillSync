import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { NavigationTab, CareerProfile } from '../../types';
import { Menu, ArrowUpRight, Compass } from 'lucide-react';

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
      case 'dashboard': return 'Home';
      case 'roadmap': return 'My Roadmap';
      case 'projects': return 'My Projects';
      case 'companion': return 'Career Assistant';
      case 'profile': return 'Profile';
    }
  };

  const getPageSubtitle = (tab: NavigationTab) => {
    switch (tab) {
      case 'dashboard': return 'Here is where you stand and what to work on next.';
      case 'roadmap': return 'A structured learning path for your career goal.';
      case 'projects': return 'Projects you have built to practice and demonstrate your skills.';
      case 'companion': return 'Get practical advice on your projects, resume, and next steps.';
      case 'profile': return 'Manage your target career and study goals.';
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
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 sticky top-0 z-30 bg-slate-950/90 backdrop-blur-sm border-b border-slate-850 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
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
                {dbConnected && (
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Synced
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {getPageSubtitle(currentTab)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Demo Switcher */}
            <button
              onClick={onExitToLanding}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-brand-400" />
              <span className="hidden sm:inline">Landing Page</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </button>

            {/* Profile Avatar trigger */}
            <div 
              onClick={() => onSelectTab('profile')}
              className="flex items-center gap-2 cursor-pointer p-0.5 rounded-full hover:ring-2 hover:ring-brand-500/30 transition-all"
              title="View Profile"
            >
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
              />
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};
