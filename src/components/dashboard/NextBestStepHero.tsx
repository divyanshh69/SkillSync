import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  Target, 
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { NextBestStep } from '../../types';
import { ImpactBadge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface NextBestStepHeroProps {
  step: NextBestStep;
  onOpenActionGuide?: () => void;
  onCriteriaToggle?: (criterionId: string) => void;
}

export const NextBestStepHero: React.FC<NextBestStepHeroProps> = ({ 
  step,
  onCriteriaToggle 
}) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'blueprint' | 'code'>('overview');

  const completedCount = step.criteria.filter(c => c.completed).length;
  const totalCount = step.criteria.length;
  const isAllComplete = completedCount === totalCount;

  return (
    <>
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-8 border border-brand-500/30 shadow-2xl shadow-brand-500/5 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/40 shadow-sm shadow-brand-500/20">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Next Best Step
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700">
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              Target: {step.targetCareer}
            </span>

            <ImpactBadge impact={step.impactLevel} />
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Effort: {step.estimatedEffort}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mt-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {step.title}
          </h2>

          {/* Why This Is Recommended Now */}
          <div className="mt-3 flex items-start gap-3 bg-brand-950/30 border border-brand-500/20 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm text-slate-300">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-brand-300 block mb-0.5">Why this is recommended now:</span>
              <p className="leading-relaxed">{step.whyRecommended}</p>
            </div>
          </div>
        </div>

        {/* Skills It Will Help Demonstrate */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Skills it will help demonstrate:
            </span>
            <span className="text-[11px] text-brand-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Will unlock project evidence status
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {step.targetSkills.map((skill, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/80 text-xs font-semibold shadow-sm hover:border-brand-500/40 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Three Simple Completion Criteria */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Completion Criteria
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isAllComplete 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}>
                {completedCount} of {totalCount} completed
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Click checkboxes to track your progress
            </span>
          </div>

          <div className="space-y-2.5">
            {step.criteria.map((criterion, idx) => {
              return (
                <div 
                  key={criterion.id}
                  onClick={() => onCriteriaToggle && onCriteriaToggle(criterion.id)}
                  className={`
                    flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer group
                    ${criterion.completed 
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300' 
                      : 'bg-slate-900/60 border-slate-800/90 text-slate-200 hover:border-slate-700 hover:bg-slate-900'}
                  `}
                >
                  <button 
                    type="button"
                    className="mt-0.5 text-slate-400 group-hover:text-white transition-colors shrink-0"
                    aria-label={criterion.completed ? "Mark incomplete" : "Mark complete"}
                  >
                    {criterion.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 group-hover:text-brand-400" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm font-medium leading-relaxed ${
                      criterion.completed ? 'line-through text-slate-400' : 'text-slate-100'
                    }`}>
                      <span className="font-bold text-slate-400 mr-2">{idx + 1}.</span>
                      {criterion.title}
                    </p>
                    {criterion.description && (
                      <p className="text-xs text-slate-400 mt-1 pl-5">
                        {criterion.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button & Footer Bar */}
        <div className="mt-7 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 w-full sm:w-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ready to implement • Recommended repo scaffolding ready</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-sm shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Start Working</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Guide Modal */}
      <Modal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="Next Best Step Action Guide"
        subtitle="Build a REST API with Authentication • Implementation Blueprint"
        maxWidth="2xl"
      >
        <div className="space-y-5">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-brand-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Step-by-Step Plan
            </button>
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'blueprint'
                  ? 'bg-brand-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Architecture & Endpoints
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'code'
                  ? 'bg-brand-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Starter Code Snippet
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-300">
                Follow this 5-stage blueprint to engineer your backend service. Once complete, you will add it as verified project evidence.
              </p>

              <div className="space-y-3">
                {step.actionGuideSteps?.map((stepText, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      {idx + 1}
                    </span>
                    <span>{stepText}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-xs text-indigo-200 flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-indigo-300">Interview Tip:</span>
                  Be prepared to explain why you chose bcrypt salt rounds = 10, how refresh tokens protect against XSS/CSRF, and how your database indexes user emails.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blueprint' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target REST API Contracts
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <div>
                      <span className="text-emerald-400 font-bold mr-2">POST</span>
                      <span className="text-slate-200">/api/v1/auth/register</span>
                    </div>
                    <span className="text-slate-400 text-[10px]">Creates user, hashes password</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <div>
                      <span className="text-emerald-400 font-bold mr-2">POST</span>
                      <span className="text-slate-200">/api/v1/auth/login</span>
                    </div>
                    <span className="text-slate-400 text-[10px]">Issues Access + Refresh JWT</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <div>
                      <span className="text-amber-400 font-bold mr-2">POST</span>
                      <span className="text-slate-200">/api/v1/auth/refresh</span>
                    </div>
                    <span className="text-slate-400 text-[10px]">Rotates expired access tokens</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <div>
                      <span className="text-blue-400 font-bold mr-2">GET</span>
                      <span className="text-slate-200">/api/v1/users/me</span>
                    </div>
                    <span className="text-brand-400 text-[10px]">Protected with JWT Middleware</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  src/middleware/authenticateToken.ts
                </span>
                <span className="text-[11px] text-brand-400 font-mono">TypeScript</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-brand-300 overflow-x-auto leading-relaxed">
                {step.starterSnippet}
              </pre>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Complete the criteria to update your career readiness score.
            </span>
            <button
              onClick={() => setIsGuideOpen(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Got it, start building
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
