import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen
} from 'lucide-react';
import { NextBestStep } from '../../types';
import { Modal } from '../common/Modal';

interface NextBestStepHeroProps {
  step: NextBestStep;
  onCriteriaToggle?: (criterionId: string) => void;
}

export const NextBestStepHero: React.FC<NextBestStepHeroProps> = ({ 
  step,
  onCriteriaToggle 
}) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'steps' | 'code'>('steps');

  const completedCount = step.criteria.filter(c => c.completed).length;
  const totalCount = step.criteria.length;

  return (
    <>
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-sm">
        {/* Top Header info */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20">
              Next Step Recommendation
            </span>
            {step.priority && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                step.priority === 'Critical' 
                  ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' 
                  : step.priority === 'Very High'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              }`}>
                {step.priority} Priority
              </span>
            )}
            <span className="text-xs text-slate-400 hidden sm:inline">
              Personalized for your roadmap
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Estimated effort: {step.estimatedEffort || '4–6 hours'}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {step.title}
        </h3>

        {/* Natural description of what to do */}
        {step.description && step.description !== step.title && (
          <p className="mt-1.5 text-sm font-medium text-slate-200 leading-relaxed">
            {step.description}
          </p>
        )}

        {/* Why this is recommended (mentor explanation) */}
        <div className="mt-3 p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-xs leading-relaxed text-slate-300 flex items-start gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
          <div>
            <span className="font-semibold text-brand-300 mr-1.5">Why this now:</span>
            <span>{step.reason || step.whyRecommended}</span>
          </div>
        </div>

        {/* Suggested practical action */}
        {step.suggestedAction && (
          <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300">Suggested Action: </span>
            <span>{step.suggestedAction}</span>
          </p>
        )}

        {/* Skills you'll improve */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-1">Skills you'll improve:</span>
          {(step.relatedSkills || step.targetSkills || []).map((skill, idx) => (
            <span 
              key={idx}
              className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* 3 Simple Completion Criteria */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-medium text-slate-300">
              Checklist ({completedCount} of {totalCount} completed)
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Click to check off items as you build
            </span>
          </div>

          <div className="space-y-1.5">
            {step.criteria.map((criterion, idx) => (
              <div 
                key={criterion.id}
                onClick={() => onCriteriaToggle && onCriteriaToggle(criterion.id)}
                className={`
                  flex items-start gap-3 p-2.5 rounded-lg border transition-colors cursor-pointer
                  ${criterion.completed 
                    ? 'bg-slate-900/40 border-slate-800/60 text-slate-400' 
                    : 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-700'}
                `}
              >
                <button 
                  type="button"
                  className="mt-0.5 shrink-0"
                  aria-label={criterion.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {criterion.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-500 hover:text-slate-300" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p className={`text-xs sm:text-sm leading-relaxed ${criterion.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                    <span className="font-semibold text-slate-400 mr-1.5">{idx + 1}.</span>
                    {criterion.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {completedCount === totalCount ? 'All steps completed!' : 'Follow the step-by-step action guide'}
          </span>

          <button
            onClick={() => setIsGuideOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors shadow-sm"
          >
            <span>View Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Guide Modal */}
      <Modal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="Action Guide"
        subtitle={step.title}
        maxWidth="xl"
      >
        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'steps'
                  ? 'bg-brand-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Step-by-Step Plan
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'code'
                  ? 'bg-brand-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Starter Code
            </button>
          </div>

          {activeTab === 'steps' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed">
                Follow these simple stages to complete this step. Once finished, add it to your projects list.
              </p>

              <div className="space-y-2">
                {step.actionGuideSteps?.map((stepText, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
                    <span className="w-4 h-4 rounded bg-slate-800 text-slate-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{stepText}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  {step.whyRecommended || 'Complete each criterion to build demonstrable project evidence for your career roadmap.'}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Middleware blueprint:</span>
                <span className="font-mono text-[11px] text-brand-400">auth.ts</span>
              </div>
              <pre className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-brand-300 overflow-x-auto leading-relaxed">
                {step.starterSnippet || `// Auth Middleware
export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};`}
              </pre>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => setIsGuideOpen(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Close Guide
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
