import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import loki from '../assets/loki.jpg';

export default function LandingView({ onQuery, theme }) {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef(null);

  const placeholders = [
    "Ask me anything...",
    "What is Lokesh's tech stack?",
    "Tell me about your CivicTrack project...",
    "Show me your professional experience...",
    "How can I contact you?",
    "Show me all your repositories...",
    "Tell me about your role as Google Student Ambassador...",
    "Turn on dark mode..."
  ];

  // Rotate placeholders every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onQuery(query, 'general');
      setQuery('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onQuery(suggestion, 'general');
  };

  const suggestions = [
    { label: "🧑‍💻 About Me", query: "Tell me about yourself." },
    { label: "🚀 Projects", query: "Show me your projects." },
    { label: "🛠️ Skills", query: "What are your skills?" },
    { label: "💼 Experience", query: "Tell me about your work experience." }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center w-full max-w-3xl min-h-screen pt-24 pb-16 px-6 text-center select-none"
    >
      {/* GSA'25 Purple Badge */}
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-semibold tracking-wider text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-950/30 px-3 py-1.5 rounded-full border border-purple-200/50 dark:border-purple-900/30 shadow-sm mb-6 inline-block"
      >
        GSA'25 & Product Designer
      </motion.span>

      {/* Profile Photo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        className={`w-32 h-32 md:w-36 md:h-36 rounded-[2.5rem] overflow-hidden shadow-lg border-2 mb-8 transition-colors duration-500 ${
          theme === 'dark' ? 'border-[#1e293b] bg-[#0f172a]' : 'border-slate-200 bg-slate-100'
        }`}
      >
        <img src={loki} alt="Lokesh Ashapu" className="w-full h-full object-cover" />
      </motion.div>

      {/* Headings & Bio */}
      <div className="mb-8">
        <h2 className={`text-xl sm:text-2xl font-semibold mb-2 transition-colors duration-500 ${
          theme === 'dark' ? 'text-zinc-400' : 'text-slate-650'
        }`}>
          Hi, I'm Lokesh Ashapu
        </h2>
        <h1 className={`text-5xl sm:text-7xl font-black tracking-tight mb-4 transition-colors duration-500 ${
          theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'
        }`}>
          AI Developer & Designer
        </h1>
        <p className={`max-w-xl mx-auto text-sm sm:text-base leading-relaxed mt-6 transition-colors duration-500 ${
          theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'
        }`}>
          Computer Engineering undergraduate, Google Student Ambassador (GSA'25), and Product Designer. Passionate about building user-centric digital products by combining design, technology, and AI to solve real-world problems.
        </p>
      </div>

      {/* Search / Input Prompt Bar */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl relative px-2 mb-8 pointer-events-auto">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholders[placeholderIndex]}
            className={`w-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] border rounded-full py-4 pl-6 pr-14 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder-zinc-400 ${
              theme === 'dark' ? 'bg-[#0f172a]/60 border-[#1e293b] text-[#f8fafc]' : 'bg-white border-slate-200/60 text-slate-800'
            }`}
          />
          <button
            type="submit"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Quick Suggestion Pills */}
      <div className="flex flex-wrap justify-center gap-3 max-w-xl pointer-events-auto">
        {suggestions.map((s) => (
          <button
            key={s.label}
            onClick={() => handleSuggestionClick(s.query)}
            className={`flex items-center gap-1.5 backdrop-blur-md border shadow-sm px-4 py-2 rounded-full transition-all text-[13px] font-semibold hover:scale-105 hover:shadow-md cursor-pointer ${
              theme === 'dark'
                ? 'bg-[#0f172a]/40 border-[#1e293b] hover:bg-[#0f172a] text-[#94a3b8] hover:text-[#f8fafc]'
                : 'bg-white/30 border-white/50 hover:bg-white/70 text-slate-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
