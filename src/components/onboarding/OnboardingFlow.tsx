import React, { useState } from 'react';
import { OnboardingData, ExperienceLevel } from '../../types';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  GraduationCap, 
  User, 
  Clock, 
  Compass, 
  Code2, 
  Palette, 
  Database, 
  Cpu, 
  Shield, 
  Layers, 
  BarChart3, 
  Loader2,
  X
} from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => Promise<void> | void;
  onCancel?: () => void;
  initialData?: Partial<OnboardingData>;
}

interface CareerOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CAREER_OPTIONS: CareerOption[] = [
  {
    id: 'Full-Stack Developer',
    title: 'Full-Stack Developer',
    description: 'Build complete web applications from modern UI to backend APIs and databases.',
    icon: Layers
  },
  {
    id: 'Frontend Developer',
    title: 'Frontend Developer',
    description: 'Craft responsive, accessible user interfaces using React, TypeScript, and modern CSS.',
    icon: Code2
  },
  {
    id: 'Backend Developer',
    title: 'Backend Developer',
    description: 'Architect scalable server services, REST APIs, databases, and cloud infrastructure.',
    icon: Database
  },
  {
    id: 'Data Scientist',
    title: 'Data Scientist',
    description: 'Analyze complex datasets, build predictive models, and deliver business insights with Python & SQL.',
    icon: BarChart3
  },
  {
    id: 'AI/ML Engineer',
    title: 'AI/ML Engineer',
    description: 'Train neural networks, build RAG pipelines, and integrate modern generative AI applications.',
    icon: Cpu
  },
  {
    id: 'Cybersecurity Analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect networks, analyze security telemetry, and defend against emerging vulnerabilities.',
    icon: Shield
  },
  {
    id: 'UI/UX Designer',
    title: 'UI/UX Designer',
    description: 'Conduct user research, design wireframes, and construct reusable Figma design systems.',
    icon: Palette
  },
  {
    id: 'Other',
    title: 'Other Specialization',
    description: 'Pursue a customized tech path such as Mobile Developer, DevOps Engineer, or Cloud Architect.',
    icon: Compass
  }
];

const EXPERIENCE_OPTIONS: {
  level: ExperienceLevel;
  title: string;
  description: string;
  badge: string;
  startingPhaseNote: string;
}[] = [
  {
    level: 'Beginner',
    title: 'Beginner',
    badge: 'Starting from Scratch',
    description: 'Brand new to this field, or just learning core concepts and writing my first lines of code.',
    startingPhaseNote: 'Starts in Phase 1 with core fundamentals, syntax, and foundational developer tools.'
  },
  {
    level: 'Some Experience',
    title: 'Some Experience',
    badge: 'Familiar with Basics',
    description: 'I understand basic syntax and have completed exercises, tutorials, or foundational coursework.',
    startingPhaseNote: 'Credits your foundational knowledge in Phase 1 and starts your active focus in Phase 2.'
  },
  {
    level: 'Comfortable with Basics',
    title: 'Comfortable with Basics',
    badge: 'Ready for Systems',
    description: 'I can build small standalone projects and want to master architecture, databases, and production practices.',
    startingPhaseNote: 'Credits core & intermediate phases, accelerating your active focus into Phase 3 architecture.'
  }
];

const STUDY_HOUR_OPTIONS = [
  { hours: 5, label: '5 hrs / week', pace: 'Casual', note: '~45 mins / day • Great for tight schedules' },
  { hours: 10, label: '10 hrs / week', pace: 'Recommended', note: '~1.5 hrs / day • Steady, reliable momentum' },
  { hours: 15, label: '15 hrs / week', pace: 'Accelerated', note: '~2 hrs / day • Rapid competency building' },
  { hours: 20, label: '20+ hrs / week', pace: 'Intensive', note: '~3+ hrs / day • Bootcamp / Full-time transition pace' }
];

const EDUCATION_SUGGESTIONS = [
  'Computer Science Student',
  'Self-Taught Developer',
  'Information Technology',
  'Bootcamp Student / Graduate',
  'Career Switcher',
  'High School Senior'
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
  onCancel,
  initialData
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState<string>(initialData?.name || '');
  const [education, setEducation] = useState<string>(initialData?.education || '');
  const [selectedCareer, setSelectedCareer] = useState<string>(initialData?.targetCareer || 'Full-Stack Developer');
  const [customCareer, setCustomCareer] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(initialData?.experienceLevel || 'Beginner');
  const [weeklyGoalHours, setWeeklyGoalHours] = useState<number>(initialData?.weeklyGoalHours || 10);

  // Determine active career value
  const effectiveCareer = selectedCareer === 'Other' && customCareer.trim() ? customCareer.trim() : selectedCareer;

  // Validation helpers
  const handleNextFromStep1 = () => {
    if (!name.trim()) {
      setErrorMessage('Please enter your full name so we can personalize your dashboard.');
      return;
    }
    setErrorMessage(null);
    setStep(2);
  };

  const handleNextFromStep2 = () => {
    if (selectedCareer === 'Other' && !customCareer.trim()) {
      setErrorMessage('Please specify your custom career goal.');
      return;
    }
    setErrorMessage(null);
    setStep(3);
  };

  const handleNextFromStep3 = () => {
    setErrorMessage(null);
    setStep(4);
  };

  const handleFinalSubmit = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await onComplete({
        name: name.trim(),
        education: education.trim() || 'Self-taught learner',
        targetCareer: effectiveCareer,
        experienceLevel,
        weeklyGoalHours
      });
    } catch (err: any) {
      console.error('Failed to submit onboarding:', err);
      setErrorMessage(err.message || 'Unable to save your personalized roadmap. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 selection:bg-brand-500/30 selection:text-brand-200">
      <div className="max-w-2xl w-full mx-auto space-y-6">
        
        {/* Top Header & SkillSync Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Personalized Career Journey</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome to SkillSync
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Answer a few quick questions to receive a milestone roadmap tailored to your goals.
          </p>
        </div>

        {/* Progress Bar & Step Indicator */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>
              Step <strong className="text-white">{step}</strong> of 4: {' '}
              {step === 1 && 'About You'}
              {step === 2 && 'Career Goal'}
              {step === 3 && 'Experience Level'}
              {step === 4 && 'Study Schedule'}
            </span>
            <span className="font-mono text-brand-400 font-semibold">{step * 25}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-brand-500 h-full rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center justify-between animate-fade-in">
            <span>{errorMessage}</span>
            <button 
              onClick={() => setErrorMessage(null)} 
              className="text-rose-400 hover:text-rose-200 text-xs font-bold p-1 rounded hover:bg-rose-500/10 transition-colors"
              aria-label="Dismiss error"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Wizard Main Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          {/* STEP 1: ABOUT YOU */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-400" />
                  <span>Let's start with the basics</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Tell us your name and current field of study so your career assistant can address you personally.
                </p>
              </div>

              <div className="space-y-4">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label htmlFor="student-name" className="block text-xs font-semibold text-slate-300">
                    What is your full name? <span className="text-brand-400">*</span>
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    maxLength={100}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="e.g. Alex Rivera or Sarah Chen"
                    autoFocus
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                  />
                </div>

                {/* Education / Field Input */}
                <div className="space-y-1.5 pt-1">
                  <label htmlFor="student-education" className="block text-xs font-semibold text-slate-300">
                    Current education or field of study
                  </label>
                  <input
                    id="student-education"
                    type="text"
                    maxLength={150}
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="e.g. Computer Science student, Self-taught, Career switcher"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                  />

                  {/* Suggestion Chips */}
                  <div className="pt-2">
                    <span className="text-[11px] text-slate-500 block mb-1.5">Quick suggestions:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {EDUCATION_SUGGESTIONS.map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => setEducation(sug)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                            education === sug 
                              ? 'bg-brand-500/15 border-brand-500/30 text-brand-300' 
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800/80">
                {onCancel ? (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Skip to Demo
                  </button>
                ) : <div />}

                <button
                  type="button"
                  onClick={handleNextFromStep1}
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CAREER GOAL */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Compass className="w-5 h-5 text-brand-400" />
                  <span>Choose your career goal</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Select the role you're actively pursuing. We will construct a 5-phase competency roadmap around it.
                </p>
              </div>

              {/* Career Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {CAREER_OPTIONS.map((career) => {
                  const Icon = career.icon;
                  const isSelected = selectedCareer === career.id;

                  return (
                    <div
                      key={career.id}
                      onClick={() => {
                        setSelectedCareer(career.id);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected 
                          ? 'bg-brand-500/10 border-brand-500/50 ring-1 ring-brand-500/30' 
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isSelected 
                          ? 'bg-brand-500 text-slate-950' 
                          : 'bg-slate-900 border border-slate-800 text-slate-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                            {career.title}
                          </h3>
                          {isSelected && <Check className="w-3.5 h-3.5 text-brand-400 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">
                          {career.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* If "Other" is selected, show input */}
              {selectedCareer === 'Other' && (
                <div className="p-3.5 bg-slate-950 border border-brand-500/30 rounded-xl space-y-1.5 animate-fade-in">
                  <label htmlFor="custom-career" className="block text-xs font-semibold text-brand-300">
                    Specify your custom career path:
                  </label>
                  <input
                    id="custom-career"
                    type="text"
                    value={customCareer}
                    onChange={(e) => setCustomCareer(e.target.value)}
                    placeholder="e.g. Mobile Developer, DevOps Engineer, Cloud Architect"
                    autoFocus
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextFromStep2}
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: EXPERIENCE LEVEL */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-brand-400" />
                  <span>What is your current experience level?</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Be completely honest! SkillSync uses this to credit what you already know and start your active milestones at the right pace.
                </p>
              </div>

              <div className="space-y-3">
                {EXPERIENCE_OPTIONS.map((opt) => {
                  const isSelected = experienceLevel === opt.level;

                  return (
                    <div
                      key={opt.level}
                      onClick={() => setExperienceLevel(opt.level)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-brand-500/10 border-brand-500/50 ring-1 ring-brand-500/30' 
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                              {opt.title}
                            </h3>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                              {opt.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {opt.description}
                          </p>
                        </div>

                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected 
                            ? 'bg-brand-500 border-brand-500 text-slate-950' 
                            : 'border-slate-700 bg-slate-900'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      {/* Starting pace preview */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-brand-300">
                        <Sparkles className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span>{opt.startingPhaseNote}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextFromStep3}
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: STUDY COMMITMENT & REVIEW */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-400" />
                  <span>How much time can you commit?</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Consistency beats intensity. Set a realistic target you can stick with each week.
                </p>
              </div>

              {/* Time Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STUDY_HOUR_OPTIONS.map((opt) => {
                  const isSelected = weeklyGoalHours === opt.hours;

                  return (
                    <div
                      key={opt.hours}
                      onClick={() => setWeeklyGoalHours(opt.hours)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-brand-500/10 border-brand-500/50 ring-1 ring-brand-500/30' 
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm font-bold text-white font-mono">
                          {opt.label}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-brand-400 font-medium">
                          {opt.pace}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {opt.note}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Summary Card Before Generation */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  <span>Your Personalized Journey Summary</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Student Name</span>
                    <strong className="text-white">{name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Target Career</span>
                    <strong className="text-brand-300">{effectiveCareer}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Education / Field</span>
                    <span className="text-slate-300 truncate block">{education || 'Self-taught learner'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Experience Level</span>
                    <span className="text-slate-300 font-medium">{experienceLevel}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800/80">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setStep(3)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleFinalSubmit}
                  className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-slate-950 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-brand-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Your Roadmap...</span>
                    </>
                  ) : (
                    <>
                      <span>Build My Roadmap</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

