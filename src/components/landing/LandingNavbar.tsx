import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';

interface LandingNavbarProps {
  onExploreDemo: () => void;
  onStartJourney?: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onExploreDemo
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={onExploreDemo}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onExploreDemo(); }}
        >
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-slate-950 font-bold transition-transform group-hover:scale-105">
            <Compass className="w-4 h-4 text-slate-950" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-lg text-white tracking-tight">
              SkillSync
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <button 
            type="button"
            onClick={onExploreDemo}
            className="hover:text-white transition-colors"
          >
            Roadmap
          </button>
          <button 
            type="button"
            onClick={onExploreDemo}
            className="hover:text-white transition-colors"
          >
            Projects
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExploreDemo}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 transition-colors shadow-sm"
          >
            <span>Explore Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
