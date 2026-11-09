import React, { useState } from 'react';
import { CompanionMessage, CareerProfile, NextBestStep } from '../../types';
import { 
  Send, 
  Lightbulb, 
  MessageSquare
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
    "What should I focus on this week?",
    "Help write resume bullets for my DevPulse project",
    "How do JWT refresh tokens work?",
    "What should I build next?"
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

    // Simulate natural, helpful career response
    setTimeout(() => {
      let replyText = "";

      if (text.toLowerCase().includes("resume") || text.toLowerCase().includes("devpulse")) {
        replyText = `Here are 3 natural resume bullet points for your **DevPulse** project:

• **Built an analytics dashboard** with React 18 and TypeScript to help developers track productivity metrics in real time.
• **Engineered client-side caching & custom debounce hooks**, reducing unnecessary re-renders.
• **Visualized daily activity charts** using Recharts and Tailwind CSS with full mobile responsiveness.`;
      } else if (text.toLowerCase().includes("jwt") || text.toLowerCase().includes("token") || text.toLowerCase().includes("refresh")) {
        replyText = `Here is a simple way to think about JWT authentication:

1. **Access Token (Short-lived, e.g., 15 mins):** The user includes this in the \`Authorization: Bearer <token>\` header for API requests.
2. **Refresh Token (Long-lived, e.g., 7 days):** Stored securely in an \`httpOnly\` cookie. Used only at \`/api/auth/refresh\` to get a new access token when the previous one expires.
3. **Database Check:** Store refresh tokens in your PostgreSQL database so you can revoke them if a user logs out.`;
      } else if (text.toLowerCase().includes("week") || text.toLowerCase().includes("focus") || text.toLowerCase().includes("next")) {
        replyText = `Your main focus right now should be completing **"${nextStep.title}"**. 

You've already built good frontend projects. Adding backend authentication with Express and PostgreSQL will help you show complete, end-to-end full-stack ability.`;
      } else {
        replyText = `You're currently on track for **${profile.targetCareer}**. 

Completing your current Next Best Step (**${nextStep.title}**) is the highest-value action you can take right now. Let me know if you run into any blockers while building it!`;
      }

      const assistantMsg: CompanionMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Career Assistant
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Ask questions about your projects, resume, or next learning steps.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-[600px] overflow-hidden shadow-sm">
        {/* Message Thread */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isAssistant = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-xl ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`space-y-1.5 ${isAssistant ? 'text-left' : 'text-right'}`}>
                  <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    isAssistant 
                      ? 'bg-slate-950 border border-slate-800 text-slate-200' 
                      : 'bg-brand-500 text-slate-950 font-medium'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
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
                          className="text-xs px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-750 text-brand-300 border border-slate-750 transition-colors flex items-center gap-1.5"
                        >
                          <Lightbulb className="w-3 h-3 text-brand-400" />
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
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 w-fit">
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
              <span>Thinking...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto flex gap-1.5">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-750 transition-colors"
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
          className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a question about your learning journey..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2 rounded-lg bg-brand-500 hover:bg-brand-400 disabled:opacity-40 disabled:hover:bg-brand-500 text-slate-950 transition-colors shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
