import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, FolderGit2, CalendarRange, Wrench, Contact2 } from 'lucide-react';
import AboutMe from './AboutMe';
import ProjectsGrid from './ProjectsGrid';
import ExperienceTimeline from './ExperienceTimeline';
import SkillsPanel from './SkillsPanel';
import ContactCard from './ContactCard';

// Typing effect component for the assistant response
function AnimatedText({ text, speed = 10 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    if (!text) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  // Helper to parse links and make them clickable
  const renderFormattedText = (rawText) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    return rawText.split(linkRegex).map((part, i) => {
      if (linkRegex.test(part)) {
        // Strip trailing punctuation from link
        let cleanUrl = part;
        let suffix = '';
        const trailingPunctuation = part.match(/[.,;:!?]+$/);
        if (trailingPunctuation) {
          cleanUrl = part.slice(0, -trailingPunctuation[0].length);
          suffix = trailingPunctuation[0];
        }
        return (
          <span key={i}>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 hover:underline font-semibold break-all"
            >
              {cleanUrl}
            </a>
            {suffix}
          </span>
        );
      }
      return part;
    });
  };

  return <>{renderFormattedText(displayedText)}</>;
}

export default function ChatView({
  history,
  activeIndex,
  setActiveIndex,
  onQuery,
  isTyping,
  onSelectProject,
  theme
}) {
  const [inputVal, setInputVal] = useState('');
  const chatEndRef = useRef(null);
  const activeMsg = history[activeIndex];

  // Auto scroll to chat panel bottom when typing or message changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isTyping, activeIndex, history.length]);

  const handleSend = () => {
    if (inputVal.trim()) {
      onQuery(inputVal, 'general');
      setInputVal('');
    }
  };

  const handleQuickPrompt = (promptText, promptIntent) => {
    onQuery(promptText, promptIntent);
  };

  const placeholders = [
    "Ask me about CivicTrack...",
    "What is Lokesh's tech stack?",
    "Tell me about your Grovyn design experience...",
    "Show me your projects...",
    "How can I contact you?",
    "What are your skills?",
    "Turn on dark mode..."
  ];

  const [placeholderText, setPlaceholderText] = useState(placeholders[0]);

  // Rotate placeholders every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderText(prev => {
        const idx = placeholders.indexOf(prev);
        return placeholders[(idx + 1) % placeholders.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const quickPills = [
    { label: "About Me", query: "Tell me about yourself.", intent: "me", icon: User, color: "text-blue-500" },
    { label: "Projects", query: "Show me your projects.", intent: "projects", icon: FolderGit2, color: "text-emerald-500" },
    { label: "Experience", query: "Tell me about your work experience.", intent: "resume", icon: CalendarRange, color: "text-violet-500" },
    { label: "Skills", query: "What are your skills?", intent: "skills", icon: Wrench, color: "text-indigo-500" },
    { label: "Contact", query: "How can I contact you?", intent: "contact", icon: Contact2, color: "text-amber-500" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex-1 flex flex-col items-center pt-32 pb-6 px-4 relative"
    >
      <div className="w-full max-w-4xl flex-1 flex flex-col relative z-10 pb-40">
        {/* User query bubble */}
        {activeMsg && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full flex justify-end mb-6"
          >
            <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl rounded-br-sm shadow-sm text-[15px] font-semibold max-w-[85%] leading-relaxed">
              {activeMsg.query}
            </div>
          </motion.div>
        )}

        {/* Dynamic portfolio panel display */}
        <AnimatePresence mode="wait">
          {isTyping ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full flex justify-start mb-6"
            >
              <div className={`flex items-center gap-1.5 px-5 py-4 shadow-sm rounded-2xl rounded-bl-sm w-fit transition-colors duration-500 ${
                theme === 'dark' ? 'bg-[#0f172a] border border-[#1e293b]' : 'bg-slate-100'
              }`}>
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col"
            >
              {/* Intent components */}
              {activeMsg?.type === 'me' && <AboutMe theme={theme} />}
              {activeMsg?.type === 'projects' && <ProjectsGrid onSelectProject={onSelectProject} theme={theme} />}
              {activeMsg?.type === 'resume' && <ExperienceTimeline theme={theme} />}
              {activeMsg?.type === 'skills' && (
                <SkillsPanel
                  onSelectSkill={(skill) => onQuery(`Tell me about your experience with ${skill}.`, 'skills')}
                  theme={theme}
                />
              )}
              {activeMsg?.type === 'contact' && <ContactCard theme={theme} />}

              {/* Bot response text bubble */}
              {activeMsg?.ai_text && (
                <div className="w-full flex justify-start mb-6">
                  <div className={`px-6 py-4 rounded-2xl rounded-bl-sm shadow-sm text-[15px] max-w-[85%] leading-relaxed transition-colors duration-500 ${
                    theme === 'dark'
                      ? 'bg-[#0f172a] text-[#f8fafc] border border-[#1e293b]'
                      : 'bg-slate-100 text-slate-800 border border-slate-200/50'
                  }`}>
                    <AnimatedText text={activeMsg.ai_text} />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={chatEndRef} />
      </div>

      {/* Floating control bar at the bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 flex flex-col items-center z-30 pointer-events-none">
        
        {/* Floating Quick Prompt Pills */}
        <div className="w-full flex gap-2 overflow-x-auto no-scrollbar pb-3 pointer-events-auto justify-start md:justify-center px-2">
          {quickPills.map((pill) => {
            const Icon = pill.icon;
            return (
              <button
                key={pill.label}
                onClick={() => handleQuickPrompt(pill.query, pill.intent)}
                className={`flex items-center gap-1.5 backdrop-blur-md border shadow-sm px-3.5 py-2 rounded-full transition-all text-[12px] font-bold h-fit whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95 ${
                  theme === 'dark'
                    ? 'bg-[#0f172a]/50 border-[#1e293b] hover:bg-[#0f172a] text-[#94a3b8] hover:text-[#f8fafc]'
                    : 'bg-white/40 border-white/60 hover:bg-white/70 text-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${pill.color}`} />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search input bar */}
        <div className="w-full relative px-2 pointer-events-auto">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={placeholderText}
            className={`w-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] border rounded-full py-4 pl-6 pr-14 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder-zinc-400 ${
              theme === 'dark' ? 'bg-[#0f172a]/70 border-[#1e293b] text-[#f8fafc]' : 'bg-white border-slate-200/60 text-slate-800'
            }`}
          />
          <button
            onClick={handleSend}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all shadow-md shadow-blue-500/20 cursor-pointer active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
