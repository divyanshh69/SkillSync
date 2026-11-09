import React, { useState } from 'react';
import { CareerProfile } from '../../types';
import { 
  GraduationCap, 
  Target, 
  Clock, 
  Sparkles
} from 'lucide-react';

interface ProfileViewProps {
  profile: CareerProfile;
  onUpdateProfile?: (updated: Partial<CareerProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile
}) => {
  const [targetRole, setTargetRole] = useState(profile.targetCareer);
  const [weeklyGoal, setWeeklyGoal] = useState(profile.weeklyGoalHours);
  const [hoursDone, setHoursDone] = useState(profile.hoursCompletedThisWeek);
  const [isSaved, setIsSaved] = useState(false);

  const careerTracks = [
    "Full-Stack Developer",
    "Frontend Engineer",
    "Backend / Cloud Engineer",
    "AI / Full-Stack Integration"
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
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Profile Card Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-brand-500/30 shadow-xl"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {profile.name}
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30">
                Verified Student
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              {profile.handle}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                {profile.education}
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-brand-400" />
                Targeting: <strong className="text-white">{profile.targetCareer}</strong>
              </span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Target Track & Study Velocity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Track Customizer */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              Target Career Track
            </span>
            <span className="text-xs text-slate-400">Roadmap Alignment</span>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-2">
              Select Primary Track:
            </label>
            <div className="space-y-2">
              {careerTracks.map((track) => (
                <div
                  key={track}
                  onClick={() => setTargetRole(track)}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                    targetRole === track
                      ? 'bg-brand-500/15 border-brand-500/40 text-brand-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-950'
                  }`}
                >
                  <span>{track}</span>
                  {targetRole === track && (
                    <span className="w-2 h-2 rounded-full bg-brand-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSave}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>{isSaved ? "Saved Track Preferences!" : "Update Target Career Track"}</span>
            </button>
          </div>
        </div>

        {/* Weekly Study Velocity */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Weekly Commitment Velocity
            </span>
            <span className="text-xs text-slate-400">Current Week</span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Weekly Goal Progress</span>
                <span className="text-brand-400 font-bold font-mono">{hoursDone} / {weeklyGoal} hrs</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-teal-400 to-brand-400 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(100, Math.round((hoursDone / weeklyGoal) * 100))}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-400">Log this week's hours:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setHoursDone(prev => Math.max(0, prev - 1))}
                    className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-mono text-white px-1.5">{hoursDone}</span>
                  <button
                    onClick={() => setHoursDone(prev => prev + 1)}
                    className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-2 text-right">
                <button
                  onClick={() => setWeeklyGoal(g => g === 15 ? 20 : 15)}
                  className="text-[11px] text-slate-500 hover:text-slate-300 underline"
                >
                  Change goal ({weeklyGoal}h)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="text-slate-400 block text-[11px]">Timeline Target</span>
                <span className="text-white font-bold text-sm mt-0.5 block">{profile.targetCompletionQuarter}</span>
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="text-slate-400 block text-[11px]">Current Readiness</span>
                <span className="text-brand-400 font-bold text-sm mt-0.5 block">{profile.readinessPercentage}% Interview Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
