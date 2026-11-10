import React, { useState, useEffect } from 'react';
import { CareerProfile } from '../../types';
import { 
  GraduationCap, 
  Target, 
  Clock, 
  Check,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface ProfileViewProps {
  profile: CareerProfile;
  onUpdateProfile?: (updated: Partial<CareerProfile>) => void;
  onStartOnboarding?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onStartOnboarding
}) => {
  const [targetRole, setTargetRole] = useState(profile.targetCareer);
  const [weeklyGoal, setWeeklyGoal] = useState(profile.weeklyGoalHours);
  const [hoursDone, setHoursDone] = useState(profile.hoursCompletedThisWeek);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setTargetRole(profile.targetCareer);
    setWeeklyGoal(profile.weeklyGoalHours);
    setHoursDone(profile.hoursCompletedThisWeek);
  }, [profile.targetCareer, profile.weeklyGoalHours, profile.hoursCompletedThisWeek]);

  const careerTracks = [
    "Full-Stack Developer",
    "Frontend Engineer",
    "Backend / Cloud Engineer",
    "AI Application Engineer"
  ];

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile({
        targetCareer: targetRole,
        weeklyGoalHours: weeklyGoal,
        hoursCompletedThisWeek: hoursDone
      });
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Profile Card Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-700"
          />

          <div className="flex-1">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {profile.name}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {profile.handle}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                {profile.education}
              </span>
              {profile.experienceLevel && (
                <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-brand-300 text-[11px] font-medium">
                  Level: {profile.experienceLevel}
                </span>
              )}
            </div>

            <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Onboarding / Retake Banner */}
      {onStartOnboarding && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Career Roadmap Personalization
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Switch your career track or update your experience level anytime.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onStartOnboarding}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-brand-300 border border-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Onboarding</span>
          </button>
        </div>
      )}

      {/* Target Track & Study Hours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Track Customizer */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Target className="w-4 h-4 text-brand-400" />
            <h3 className="text-sm font-bold text-white">
              Target Career
            </h3>
          </div>

          <p className="text-xs text-slate-400">
            Choose the track that matches your goal:
          </p>

          <div className="space-y-1.5">
            {careerTracks.map((track) => (
              <div
                key={track}
                onClick={() => setTargetRole(track)}
                className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors flex items-center justify-between ${
                  targetRole === track
                    ? 'bg-brand-500/10 border-brand-500/30 text-brand-200 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{track}</span>
                {targetRole === track && (
                  <Check className="w-3.5 h-3.5 text-brand-400" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Study Velocity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Clock className="w-4 h-4 text-brand-400" />
              <h3 className="text-sm font-bold text-white">
                Study Time This Week
              </h3>
            </div>

            <div className="mt-3 p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">Hours logged:</span>
                <span className="font-bold text-white font-mono">{hoursDone} / {weeklyGoal} hrs</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-500 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(100, Math.round((hoursDone / weeklyGoal) * 100))}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-400">Quick log:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setHoursDone(prev => Math.max(0, prev - 1))}
                    className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold flex items-center justify-center text-xs"
                  >
                    -1h
                  </button>
                  <button
                    onClick={() => setHoursDone(prev => prev + 1)}
                    className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold flex items-center justify-center text-xs"
                  >
                    +1h
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            {isSaved ? <Check className="w-4 h-4" /> : null}
            <span>{isSaved ? "Saved to Database!" : "Save Profile"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
