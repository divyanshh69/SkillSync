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
      title: "Dynamic Next Best Step",
      description: "Instead of wandering through unstructured roadmaps, SkillSync analyzes your progress and highlights the single highest-impact milestone to tackle next.",
      tag: "Focus"
    },
    {
      icon: ShieldCheck,
      title: "Verified Project Evidence",
      description: "Distinguish between watching tutorials and writing working code. Link public GitHub repositories and technical deliverables directly to your skills.",
      tag: "Evidence"
    },
    {
      icon: Layers,
      title: "Milestone Roadmaps",
      description: "Phased competencies calibrated for your specific career path, with clear distinction between completed, in-progress, and planned milestones.",
      tag: "Structure"
    },
    {
      icon: Bot,
      title: "AI Career Assistant",
      description: "A mentor powered by Google Gemini grounded in your actual SkillSync database, offering resume bullet points, architecture advice, and project ideas.",
      tag: "Guidance"
    },
    {
      icon: BarChart3,
      title: "Weighted Readiness Scoring",
      description: "Competencies backed by tangible projects receive 2x weight, ensuring your readiness score accurately reflects demonstrated engineering ability.",
      tag: "Scoring"
    },
    {
      icon: Code2,
      title: "Action Guides & Starter Blueprints",
      description: "Every Next Best Step includes practical completion checklists, architecture patterns, and code blueprints to get you building immediately.",
      tag: "Execution"
    }
  ];

  return (
    <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-semibold text-brand-400 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
          Core Capabilities
        </span>
        <h2 className="mt-3 text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Everything needed to prove engineering ability
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400">
          Designed for students and early-career learners who want demonstrable proof instead of vague certificates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
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
