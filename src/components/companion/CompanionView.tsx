import React, { useState } from 'react';
import { CompanionMessage, CareerProfile, NextBestStep } from '../../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2
} from 'lucide-react';

interface CompanionViewProps {
  profile: CareerProfile;
  nextStep: NextBestStep;
  initialMessages: CompanionMessage[];
  onOpenStepGuide?: () => void;
}

export const CompanionView: React.FC<CompanionViewProps> = ({
  profile,
  nextStep,
  initialMessages,
  onOpenStepGuide
}) => {
  const [messages, setMessages] = useState<CompanionMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    "How should I structure my JWT refresh token rotation?",
    "Translate my DevPulse project into 3 strong resume bullets",
    "What should I build after completing this REST API?",
    "Am I ready to apply for junior full-stack roles?"
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: CompanionMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate intelligent contextual response
    setTimeout(() => {
      let replyText = "";
      let badge = "Career Companion";

      if (text.toLowerCase().includes("resume") || text.toLowerCase().includes("devpulse")) {
        badge = "Resume Translation";
        replyText = `Here are 3 impact-oriented resume bullets for **DevPulse Analytics**:

• **Architected a responsive developer analytics dashboard** using React 18, TypeScript, and Tailwind CSS, achieving a 99/100 Lighthouse performance rating.
• **Engineered client-side state caching & custom debounce telemetry hooks**, reducing unnecessary component re-renders by 42%.
• **Visualized complex focus metrics via interactive SVG charts**, providing real-time activity tracking for over 1,200 active monthly users.`;
      } else if (text.toLowerCase().includes("jwt") || text.toLowerCase().includes("token") || text.toLowerCase().includes("refresh")) {
        badge = "Architecture Blueprint";
        replyText = `For production security in your Next Best Step (**${nextStep.title}**):

1. **Access Token:** Issue a short-lived JWT (10–15 min lifespan) signed with \`ACCESS_TOKEN_SECRET\`. Send it in the \`Authorization: Bearer <token>\` header.
2. **Refresh Token:** Store a cryptographically random token in the PostgreSQL \`RefreshToken\` table with an expiration timestamp and \`revoked\` flag.
3. **Cookie Transport:** Store the refresh token in an \`httpOnly\`, \`Secure\`, \`SameSite=Strict\` cookie so client-side JavaScript cannot be exploited by XSS to steal persistent credentials.
4. **Rotation:** Every time \`/api/auth/refresh\` is requested, invalidate the old refresh token and issue a fresh pair. If an already-revoked token is used, trigger a security event and revoke all tokens for that user ID.`;
      } else if (text.toLowerCase().includes("after") || text.toLowerCase().includes("next")) {
        badge = "Roadmap Projection";
        replyText = `Once you finish the REST API with JWT Auth:

1. **Step 1:** Connect it to **ShopNest** or a new frontend client to demonstrate true end-to-end integration.
2. **Step 2:** Add **Redis caching** for hot read endpoints (like user profiles or product listings).
3. **Step 3:** Containerize both the Express API and PostgreSQL database with **Docker Compose**, which unlocks your Phase 4 milestone!`;
      } else {
        badge = "Milestone Advice";
        replyText = `Looking at your target of **${profile.targetCareer}** at ${profile.readinessPercentage}% readiness:

You are in a great position. Your frontend evidence is solid. Completing **"${nextStep.title}"** is the direct catalyst that will elevate your portfolio from a "frontend student" into a "full-stack contender". Focus on finishing the 3 criteria items!`;
      }

      const aiMsg: CompanionMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        badge
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Chat Window */}
      <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col h-[700px] shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center shadow-md shadow-brand-500/20">
              <Bot className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">
                  SkillSync Companion
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  Active Mentor
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Personalized for {profile.name} • {profile.targetCareer} Track
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ready to guide</span>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {isAi && (
                  <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-brand-400" />
                  </div>
                )}

                <div className={`space-y-2 ${isAi ? 'text-left' : 'text-right'}`}>
                  {msg.badge && (
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {msg.badge}
                    </span>
                  )}

                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    isAi 
                      ? 'bg-slate-950/80 border border-slate-800 text-slate-200 shadow-sm' 
                      : 'bg-brand-500 text-slate-950 font-medium shadow-md shadow-brand-500/10'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (action.actionKey === 'open_step_guide' && onOpenStepGuide) {
                              onOpenStepGuide();
                            } else {
                              handleSend(action.label);
                            }
                          }}
                          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-300 border border-slate-700 transition-colors flex items-center gap-1.5"
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-brand-400" />
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
              </div>
              <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="ml-2">Analyzing your career trajectory...</span>
              </div>
            </div>
          )}
        </div>

        {/* Prompt Suggestions */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto flex gap-2">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about your next step, projects, or interview prep..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 disabled:hover:bg-brand-500 text-slate-950 transition-colors shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Right Context & Insights Sidebar */}
      <div className="lg:col-span-4 space-y-5">
        {/* Current Next Step Insight */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Active Focus
            </span>
            <span className="text-[10px] text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              In Progress
            </span>
          </div>

          <h4 className="text-sm font-bold text-white">
            {nextStep.title}
          </h4>
          <p className="text-xs text-slate-400 mt-1 line-clamp-3">
            {nextStep.whyRecommended}
          </p>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Impact: {nextStep.impactLevel}</span>
            <span className="text-brand-400 font-semibold">{nextStep.estimatedEffort}</span>
          </div>
        </div>

        {/* Readiness Leap Projection */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-3">
            Readiness Projection
          </span>

          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400">Current Score</span>
            <span className="text-white font-bold">{profile.readinessPercentage}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div className="bg-brand-400 h-full rounded-full" style={{ width: `${profile.readinessPercentage}%` }} />
          </div>

          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-emerald-400 font-medium">After Next Best Step</span>
            <span className="text-emerald-400 font-bold">76% (+8%)</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: '76%' }} />
          </div>

          <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
            Crossing 75% unlocks competitive status for mid-sized tech internships and junior engineering candidate pools.
          </p>
        </div>

        {/* Quick Interview Readiness Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Key Interview Talking Points
          </span>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>Demonstrate state management with Zustand vs React Context.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>Discuss trade-offs of storing JWT in httpOnly cookie vs localStorage.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>Explain PostgreSQL indexing and schema migrations.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
