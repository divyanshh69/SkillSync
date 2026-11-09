import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  FolderGit2, 
  Bot, 
  User, 
  Compass, 
  Sparkles, 
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';
import { NavigationTab, CareerProfile } from '../../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onExitToLanding: () => void;
  profile: CareerProfile;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onExitToLanding,
  profile,
  mobileOpen,
  onCloseMobile
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'My Roadmap', icon: Map, badge: 'Phase 3' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, badge: '3 Verified' },
    { id: 'companion', label: 'AI Companion', icon: Bot, badge: 'New Advice' },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top: Logo & Brand */}
        <div>
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/80">
            <div 
              onClick={onExitToLanding}
              className="flex items-center gap-3 cursor-pointer group"
              title="Return to Landing Page"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5">
                  SkillSync
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    Pro
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 block -mt-0.5">Career Companion</span>
              </div>
            </div>

            {/* Close button for mobile */}
            <button 
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Target Banner */}
          <div className="p-4 mx-4 my-4 rounded-xl bg-slate-900/90 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 font-medium">Target Track</span>
              <span className="text-brand-400 font-semibold">{profile.readinessPercentage}% Ready</span>
            </div>
            <p className="text-sm font-bold text-white truncate">
              {profile.targetCareer}
            </p>
            <div className="mt-2.5 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-brand-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${profile.readinessPercentage}%` }}
              />
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 space-y-1 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group
                    ${isActive 
                      ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-brand-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-brand-500/20 text-brand-200' 
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-brand-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Profile & Switch View */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950">
          <div 
            onClick={() => {
              onSelectTab('profile');
              onCloseMobile();
            }}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-900/70 transition-colors cursor-pointer group"
          >
            <img 
              src={profile.avatarUrl} 
              alt={profile.name} 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/30 group-hover:ring-brand-500 transition-all"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate group-hover:text-brand-300 transition-colors">
                {profile.name}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {profile.handle}
              </p>
            </div>
            <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between">
            <button
              onClick={onExitToLanding}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-colors border border-slate-800"
            >
              <LogOut className="w-3.5 h-3.5 rotate-180" />
              <span>Back to Landing Page</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

