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
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={onExploreDemo}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-xl text-white tracking-tight">
              SkillSync
            </span>
            <span className="text-xs text-brand-400 font-semibold hidden sm:inline">
              Prototype
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <button 
            onClick={onExploreDemo}
            className="hover:text-white transition-colors"
          >
            My Roadmap
          </button>
          <button 
            onClick={onExploreDemo}
            className="hover:text-white transition-colors"
          >
            My Projects
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExploreDemo}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 transition-all shadow-md shadow-brand-500/20"
          >
            <span>Explore Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
