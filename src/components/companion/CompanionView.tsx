import React, { useState, useRef, useEffect } from 'react';
import { CompanionMessage, CareerProfile, NextBestStep } from '../../types';
import { api } from '../../services/api';
import { 
  Send, 
  Lightbulb, 
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface CompanionViewProps {
  profile: CareerProfile;
  nextStep: NextBestStep;
  initialMessages: CompanionMessage[];
  onOpenStepGuide?: () => void;
}

/**
 * Lightweight inline markdown renderer for structured AI career guidance
 */
const FormattedMessage: React.FC<{ text: string; isAi: boolean }> = ({ text, isAi }) => {
  // Split into lines for formatting
  const lines = text.split('\n');

  return (
    <div className={`space-y-2 text-xs sm:text-sm leading-relaxed ${isAi ? 'text-slate-200' : 'text-slate-950 font-medium'}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Empty line spacer
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Code block line / fence
        if (trimmed.startsWith('```')) {
          return (
            <div key={idx} className="my-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-brand-300 overflow-x-auto">
              {trimmed.replace(/```/g, '') || '// Code block'}
            </div>
          );
        }

        // Bullet point lines (- , • , * )
        if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const content = trimmed.replace(/^[•\-\*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isAi ? 'bg-brand-400' : 'bg-slate-950'}`} />
              <div className="flex-1">
                {renderInlineMarkdown(content, isAi)}
              </div>
            </div>
          );
        }

        // Numbered list item (1. , 2. )
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          const [, num, content] = numMatch;
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className={`font-mono font-semibold text-[11px] mt-0.5 shrink-0 ${isAi ? 'text-brand-400' : 'text-slate-950'}`}>
                {num}.
              </span>
              <div className="flex-1">
                {renderInlineMarkdown(content, isAi)}
              </div>
            </div>
          );
        }

        // Standard paragraph line
        return (
          <p key={idx}>
            {renderInlineMarkdown(line, isAi)}
          </p>
        );
      })}
    </div>
  );
};

/**
 * Formats inline bolding, code ticks, and external links
 */
function renderInlineMarkdown(str: string, isAi: boolean): React.ReactNode {
  // Match bold (**text**), code (`text`), and links ([text](url))
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(str)) !== null) {
    // Push preceding plain text
    if (match.index > lastIdx) {
      parts.push(str.slice(lastIdx, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className={isAi ? 'text-white font-semibold' : 'font-bold'}>
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code 
          key={match.index} 
          className={`px-1 py-0.5 rounded text-[11px] font-mono ${
            isAi 
              ? 'bg-slate-900 text-brand-300 border border-slate-800' 
              : 'bg-brand-600/30 text-slate-950 font-semibold'
          }`}
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        parts.push(
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:text-brand-300 underline font-medium inline-flex items-center gap-0.5"
          >
            {label}
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </a>
        );
      }
    }

    lastIdx = regex.lastIndex;
  }

  if (lastIdx < str.length) {
    parts.push(str.slice(lastIdx));
  }

  return parts.length > 0 ? parts : str;
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
  const [lastError, setLastError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat when new message or thinking status appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const suggestedPrompts = [
    "What should I focus on this week?",
    `What projects best demonstrate skills for a ${profile.targetCareer}?`,
    "How can I turn my project code into strong resume bullets?",
    "Explain the technical concepts in my Next Best Step"
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    setLastError(null);

    const userMsg: CompanionMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    try {
      // Build history for backend AI context (excluding initial greeting to keep focused context)
      const chatHistory = newMessages
        .slice(-8)
        .map(m => ({
          role: (m.sender === 'ai' ? 'assistant' : 'user') as 'assistant' | 'user',
          content: m.text
        }));

      // Call backend Gemini AI endpoint
      const response = await api.sendChatMessage(text, chatHistory);
      const replyContent = response.message || response.reply || 'No response generated.';

      const assistantMsg: CompanionMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'ai',
        text: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        badge: response.isMockFallback ? 'Setup Guide' : 'Gemini AI'
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Error contacting Career Assistant API:', err);
      const errorMsg = err?.message || 'Unable to reach backend AI service.';
      setLastError(errorMsg);

      const fallbackMsg: CompanionMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'ai',
        text: `**Unable to complete AI request**\n\n${errorMsg}\n\nPlease check your server connection or API configuration and try again. Your database records and skills remain fully preserved.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        badge: 'Notice'
      };

      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Top Banner with Persona & Grounding Metadata */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Career Assistant
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/25">
                  Gemini Powered
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Personalized for <strong className="text-slate-300">{profile.name}</strong> · Target: <strong className="text-slate-300">{profile.targetCareer}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-950 border border-slate-800 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Readiness: {profile.readinessPercentage}%</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-950 border border-slate-800 text-brand-300">
              <span className="text-slate-500">Active Step:</span>
              <span className="truncate max-w-[150px]">{nextStep.title}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-[620px] overflow-hidden shadow-sm">
        {/* Message Thread */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isAssistant = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`space-y-1.5 ${isAssistant ? 'text-left' : 'text-right'}`}>
                  {/* Badge header for assistant messages */}
                  {isAssistant && msg.badge && (
                    <div className="flex items-center gap-1.5 px-1 pb-0.5">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                        {msg.badge}
                      </span>
                    </div>
                  )}

                  <div className={`p-4 rounded-xl shadow-sm ${
                    isAssistant 
                      ? 'bg-slate-950 border border-slate-800 text-slate-200' 
                      : 'bg-brand-500 text-slate-950'
                  }`}>
                    <FormattedMessage text={msg.text} isAi={isAssistant} />
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
                          className="text-xs px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-brand-300 border border-slate-800 transition-colors flex items-center gap-1.5"
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

          {/* Active Thinking / Generating State */}
          {isTyping && (
            <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 w-fit shadow-sm">
              <span className="w-2 h-2 bg-brand-400 rounded-full" />
              <span>Thinking with your SkillSync profile...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800/80 overflow-x-auto flex items-center gap-1.5 scrollbar-thin">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 shrink-0 mr-1 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-400" />
            Suggested:
          </span>
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              disabled={isTyping}
              onClick={() => handleSend(prompt)}
              className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Error notification if any */}
        {lastError && (
          <div className="px-4 py-1.5 bg-rose-500/10 border-t border-rose-500/20 text-rose-300 text-[11px] flex items-center justify-between">
            <span>{lastError}</span>
            <button 
              onClick={() => setLastError(null)}
              className="hover:underline text-[10px]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            placeholder={isTyping ? "Generating personalized response..." : "Ask about your projects, skills, resume bullets, or next steps..."}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-2.5 rounded-lg bg-brand-500 hover:bg-brand-400 disabled:opacity-40 disabled:hover:bg-brand-500 text-slate-950 font-medium transition-colors shrink-0 shadow-sm"
            aria-label="Send message"
          >
            {isTyping ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
