import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Bot, 
  BarChart3, 
  Code2
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Algorithmic 'Next Best Step'",
      description: "Instead of staring at a 50-item roadmap, SkillSync analyzes your current gaps and highlights the single highest-impact milestone to tackle next.",
      tag: "Core Innovation",
      accent: "from-brand-500/20 to-teal-500/5 text-brand-400 border-brand-500/30"
    },
    {
      icon: ShieldCheck,
      title: "Verified Project Evidence",
      description: "Distinguish between 'I watched a tutorial' and 'I built a production app'. Attach live URLs, repos, and verified technical proof to every skill.",
      tag: "Recruiter Ready",
      accent: "from-indigo-500/20 to-purple-500/5 text-indigo-400 border-indigo-500/30"
    },
    {
      icon: Layers,
      title: "Dynamic Milestone Roadmaps",
      description: "Structured phases tailored for Full-Stack, Frontend, or Backend tracks. Visual breakdown of completed, in-progress, and planned competencies.",
      tag: "Clarity",
      accent: "from-cyan-500/20 to-blue-500/5 text-cyan-400 border-cyan-500/30"
    },
    {
      icon: Bot,
      title: "AI Career Companion",
      description: "An intelligent mentor that provides tailored project recommendations, translates project accomplishments into resume impact, and unblocks implementation.",
      tag: "Context Aware",
      accent: "from-amber-500/20 to-orange-500/5 text-amber-400 border-amber-500/30"
    },
    {
      icon: BarChart3,
      title: "Weighted Readiness Scoring",
      description: "Our proprietary formula assigns 2x weight to project-evidenced competencies so your readiness score accurately reflects real-world engineering ability.",
      tag: "Data Driven",
      accent: "from-emerald-500/20 to-green-500/5 text-emerald-400 border-emerald-500/30"
    },
    {
      icon: Code2,
      title: "Action Guides & Starter Kits",
      description: "Every Next Best Step includes concrete completion criteria, architecture blueprints, and code starter snippets to get you writing code immediately.",
      tag: "Execution",
      accent: "from-rose-500/20 to-pink-500/5 text-rose-400 border-rose-500/30"
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          Engineered For Momentum
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Everything you need to prove your engineering capability.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400">
          Built specifically for college students, boot camp graduates, and self-taught developers who want to show tangible proof instead of buzzwords.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br border flex items-center justify-center ${item.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
