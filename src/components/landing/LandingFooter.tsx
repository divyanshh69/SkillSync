import React from 'react';
import { Compass, Heart } from 'lucide-react';

interface LandingFooterProps {
  onExploreDemo: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onExploreDemo }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center shadow-md shadow-brand-500/20">
            <Compass className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-tight">SkillSync</span>
            <span className="text-xs text-slate-500 block">Career Journey Companion</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <button onClick={onExploreDemo} className="hover:text-white transition-colors">
            Demo Dashboard
          </button>
          <span className="text-slate-700">•</span>
          <span className="hover:text-white transition-colors">Roadmap Explorer</span>
          <span className="text-slate-700">•</span>
          <span className="hover:text-white transition-colors">Evidence Ledger</span>
          <span className="text-slate-700">•</span>
          <span className="hover:text-white transition-colors">AI Companion</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Crafted for portfolio showcase with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>& React + Tailwind</span>
        </div>
      </div>
    </footer>
  );
};
