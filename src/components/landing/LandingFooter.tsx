import React from 'react';
import { Compass } from 'lucide-react';

interface LandingFooterProps {
  onExploreDemo: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onExploreDemo }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-slate-950 font-bold">
            <Compass className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight">SkillSync</span>
            <span className="text-slate-500 ml-2 hidden sm:inline">Career Journey Companion</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <button 
            type="button"
            onClick={onExploreDemo} 
            className="hover:text-white transition-colors"
          >
            Explore Demo
          </button>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
        </div>

        <p className="text-[11px] text-slate-500">
          Evidence-driven career development for students.
        </p>
      </div>
    </footer>
  );
};
