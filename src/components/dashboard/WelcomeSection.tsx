import React from 'react';

interface WelcomeSectionProps {
  name: string;
  targetCareer: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ name, targetCareer }) => {
  // Get time of day for natural greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = name.split(' ')[0] || name;

  return (
    <div className="pb-1">
      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        {getGreeting()}, {firstName}
      </h2>
      <p className="text-sm text-slate-400 mt-0.5">
        You're working towards becoming a <span className="text-brand-300 font-medium">{targetCareer}</span>.
      </p>
    </div>
  );
};

