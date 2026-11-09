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
      iconColor: "text-brand-400 bg-brand-500/10 border-brand-500/20",
      description: "Select your target role—such as Full-Stack Developer, Frontend Specialist, or Backend Engineer. SkillSync generates an active roadmap of skills demanded by tech hiring managers.",
      badge: "Zero Fluff"
    },
    {
      step: "02",
      title: "Back Skills With Real Evidence",
      subtitle: "Differentiate theory from proven code",
      icon: ShieldCheck,
      iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      description: "A course completion certificate isn't enough. SkillSync links every competency to tangible GitHub repositories, live demos, and technical deliverables in your portfolio.",
      badge: "Portfolio Proof"
    },
    {
      step: "03",
      title: "Take The Next Best Step",
      subtitle: "One high-leverage action at a time",
      icon: Compass,
      iconColor: "text-teal-400 bg-teal-500/10 border-teal-500/20",
      description: "Never wonder what to build this weekend. SkillSync dynamically calculates the exact missing skill with the highest impact on your overall career readiness score.",
      badge: "Focus Engine"
    }
  ];

  return (
    <section className="py-20 bg-slate-950/60 border-y border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-400 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            How SkillSync Works
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            From tutorial chaos to hired engineer.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Most self-taught developers and CS students drown in 60-hour video playlists. SkillSync replaces passive watching with targeted, evidence-backed momentum.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="relative bg-slate-900/70 border border-slate-800 rounded-2xl p-7 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-brand-500/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-slate-700 font-mono group-hover:text-slate-500 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${item.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center text-xs text-brand-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  <span>Integrated with demo engine</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Banner */}
        <div className="mt-16 bg-gradient-to-r from-brand-950/40 via-slate-900 to-indigo-950/40 border border-brand-500/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white">
              Ready to see the student experience?
            </h4>
            <p className="text-sm text-slate-300 mt-1">
              Explore Alex Rivera's live Full-Stack dashboard with 68% career readiness.
            </p>
          </div>
          <button
            onClick={onExploreDemo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-brand-500/20 shrink-0"
          >
            <span>Launch Demo Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
