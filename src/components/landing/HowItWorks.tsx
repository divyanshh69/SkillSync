import React from 'react';
import { Target, ShieldCheck, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onExploreDemo: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onExploreDemo }) => {
  const steps = [
    {
      step: "01",
      title: "Set Your Target Direction",
      subtitle: "Industry-aligned competency roadmaps",
      icon: Target,
      description: "Select your career path—such as Full-Stack, Frontend, or Backend. SkillSync provisions a structured sequence of competencies expected in real engineering roles.",
      badge: "Targeted"
    },
    {
      step: "02",
      title: "Back Skills With Real Evidence",
      subtitle: "Differentiate theory from proven code",
      icon: ShieldCheck,
      description: "Passive tutorials don't convince recruiters. SkillSync links each skill to tangible GitHub repositories, commits, and verifiable deliverables in your portfolio.",
      badge: "Evidence"
    },
    {
      step: "03",
      title: "Take The Next Best Step",
      subtitle: "One high-leverage action at a time",
      icon: Compass,
      description: "Never wonder what to work on next. SkillSync dynamically determines the exact missing competency with the highest impact on your overall career readiness.",
      badge: "Momentum"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-950/60 border-y border-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-brand-400 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            How It Works
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold text-white tracking-tight">
            From tutorial chaos to deliberate progress
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Replace passive video watching with structured milestones and verified project evidence.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xl font-bold text-slate-600 font-mono">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-800 flex items-center text-xs text-brand-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>Integrated with live database</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">
              Ready to see the difference evidence makes?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore the interactive demo or personalize your own roadmap in under a minute.
            </p>
          </div>

          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 font-semibold text-xs transition-colors shrink-0 shadow-sm"
          >
            <span>Explore Demo Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
