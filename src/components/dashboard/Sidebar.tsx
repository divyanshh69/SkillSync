import React from 'react';
import { 
  Home, 
  Map, 
  FolderGit2, 
  MessageSquare, 
  User, 
  Compass, 
  LogOut,
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
  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'roadmap', label: 'My Roadmap', icon: Map },
    { id: 'projects', label: 'My Projects', icon: FolderGit2 },
    { id: 'companion', label: 'Career Assistant', icon: MessageSquare },
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
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between
        transition-transform duration-200 ease-in-out lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top: Logo & Nav */}
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-850">
            <div 
              onClick={onExitToLanding}
              className="flex items-center gap-2.5 cursor-pointer group"
              title="Return to Landing Page"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-slate-950 font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                SkillSync
              </span>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={onCloseMobile}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User's Current Career Goal Pill */}
          <div className="px-4 pt-4 pb-2">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[11px]">Your Goal</span>
              <span className="text-white font-medium block truncate mt-0.5">
                {profile.targetCareer}
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 py-2 space-y-1">
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
                    w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
                    ${isActive 
                      ? 'bg-brand-500/10 text-brand-300 font-semibold border border-brand-500/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Summary */}
        <div className="p-4 border-t border-slate-850">
          <div 
            onClick={() => {
              onSelectTab('profile');
              onCloseMobile();
            }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <img 
              src={profile.avatarUrl} 
              alt={profile.name} 
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {profile.name}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                View profile
              </p>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-850">
            <button
              onClick={onExitToLanding}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 rotate-180" />
              <span>Landing Page</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
