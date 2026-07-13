import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Info } from 'lucide-react';
import { routeIntent } from './utils/router';
import LandingView from './components/LandingView';
import ChatView from './components/ChatView';
import InfoModal from './components/InfoModal';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import FluidBackground from './components/FluidBackground';
import logo from './assets/logo (2).png';
import loki from './assets/loki.jpg';

export default function App() {
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [view, setView] = useState('landing'); // 'landing' | 'chat'
  const [history, setHistory] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    // Default to dark mode as requested by user's premium look preference
    return 'dark';
  });

  // Handle HTML document class updates on theme change
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Main chatbot query handler
  const handleQuery = async (queryText, queryIntent = 'general') => {
    if (!queryText.trim()) return;

    if (view === 'landing') {
      setView('chat');
    }

    const normalizedQuery = queryText.toLowerCase().trim();
    const isDarkModeQuery = normalizedQuery.includes('dark mode') || normalizedQuery.includes('go dark') || normalizedQuery.includes('turn on dark') || normalizedQuery.includes('enable dark');
    const isLightModeQuery = normalizedQuery.includes('light mode') || normalizedQuery.includes('go light') || normalizedQuery.includes('turn on light') || normalizedQuery.includes('enable light');

    // Add user query bubble immediately
    const userMessageId = Date.now().toString();
    const newUserMsg = {
      id: userMessageId,
      query: queryText,
      type: queryIntent,
      title: 'Query'
    };

    setHistory(prev => [...prev, newUserMsg]);
    setActiveIndex(history.length);
    setIsTyping(true);

    // Simulate AI thinking and response typing delay
    setTimeout(() => {
      let responseMsg;

      if (isDarkModeQuery || isLightModeQuery) {
        const nextTheme = isDarkModeQuery ? 'dark' : 'light';
        setTheme(nextTheme);
        responseMsg = {
          id: (Date.now() + 1).toString(),
          query: queryText,
          type: 'general',
          title: 'Theme Switch',
          ai_text: `Sure! I have switched the portfolio theme to ${nextTheme} mode for you.`
        };
      } else {
        const routingResult = routeIntent(queryText);
        let titleLabel = 'Response';
        if (routingResult.intent === 'projects') titleLabel = 'My Projects';
        if (routingResult.intent === 'skills') titleLabel = 'Skills & Expertise';
        if (routingResult.intent === 'resume') titleLabel = 'Professional Experience';
        if (routingResult.intent === 'me') titleLabel = 'About Me';
        if (routingResult.intent === 'contact') titleLabel = 'Contact Lokesh';

        responseMsg = {
          id: (Date.now() + 1).toString(),
          query: queryText,
          type: routingResult.intent,
          title: titleLabel,
          ai_text: routingResult.ai_text
        };
      }

      setHistory(prev => [...prev, responseMsg]);
      setActiveIndex(history.length + 1);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className={`min-h-screen relative flex flex-col font-sans transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black text-slate-100' : view === 'chat' ? 'bg-white text-slate-800' : 'bg-[#FDFDFD] text-slate-800'
    }`}>
      
      {/* Interactive WebGL Fluid Background */}
      {view === 'landing' && <FluidBackground />}
      
      {/* Background gradients glow effect in Landing View */}
      <AnimatePresence>
        {view === 'landing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
          >
            <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-blob transition-colors duration-500 ${
              theme === 'dark' ? 'bg-purple-900/10' : 'bg-purple-200/40'
            }`} />
            <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-blob transition-colors duration-500 ${
              theme === 'dark' ? 'bg-blue-900/10' : 'bg-blue-200/40'
            }`} />
            <div className={`absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full blur-blob transition-colors duration-500 ${
              theme === 'dark' ? 'bg-orange-900/5' : 'bg-orange-100/40'
            }`} />
            <div className={`absolute bottom-10 sm:bottom-20 left-1/2 transform -translate-x-1/2 text-[7vw] sm:text-[5.5vw] md:text-[4.5vw] font-bold tracking-tighter whitespace-nowrap select-none transition-colors duration-500 ${
              theme === 'dark' ? 'text-zinc-800/20' : 'text-slate-200/30'
            }`}>
              Think deeply. Build simply.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header bar */}
      <header className="fixed top-0 left-0 right-0 w-full px-6 pt-6 pb-4 flex justify-between items-start z-40 pointer-events-none">
        {/* Background gradient behind header in Chat View */}
        <AnimatePresence>
          {view === 'chat' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute top-0 left-0 right-0 h-40 -z-10 pointer-events-none transition-colors duration-500 ${
                theme === 'dark' ? 'bg-gradient-to-b from-black via-black/95 to-transparent' : 'bg-gradient-to-b from-white via-white/95 to-transparent'
              }`}
            />
          )}
        </AnimatePresence>

        {/* Left side: Resume button (only visible on Landing View) */}
        <div className="flex-1 pointer-events-auto">
          <AnimatePresence>
            {view === 'landing' && (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                href="https://drive.google.com/file/d/17B_tD0UL9mruBbaPCbXJL7shg5paqjor/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 backdrop-blur-xl border shadow-[0_8px_32px_rgba(0,0,0,0.05)] px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-800/50 text-zinc-300'
                    : 'bg-white/30 border-white/50 hover:bg-white/50 text-slate-700'
                }`}
              >
                <div className="w-5 h-5 bg-zinc-800 dark:bg-zinc-700 rounded-full flex items-center justify-center shadow-inner">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <span>Resume</span>
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        {/* Center side: Chat Home avatar (only visible on Chat View) */}
        <div className="flex-1 flex justify-center pointer-events-auto">
          <AnimatePresence>
            {view === 'chat' && (
              <motion.button
                onClick={() => setView('landing')}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="w-14 h-14 rounded-full overflow-hidden shadow-md border-2 border-blue-500 hover:border-blue-600 cursor-pointer bg-cover bg-center select-none"
                style={{ backgroundImage: `url(${loki})` }}
                title="Go to Home"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right side: Theme toggle and Info trigger */}
        <div className="flex-1 flex justify-end items-center gap-2.5 pointer-events-auto">
          <button
            onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            className={`p-2.5 rounded-full transition-colors border border-transparent backdrop-blur-xl cursor-pointer ${
              theme === 'dark' ? 'hover:bg-white/5 hover:border-zinc-800 text-amber-400' : 'hover:bg-black/5 hover:border-slate-200 text-slate-600'
            }`}
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setInfoOpen(true)}
            className={`p-2.5 rounded-full transition-colors border border-transparent backdrop-blur-xl cursor-pointer ${
              theme === 'dark' ? 'hover:bg-white/5 hover:border-zinc-800 text-zinc-400' : 'hover:bg-black/5 hover:border-slate-200 text-slate-650'
            }`}
            title="About this site"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main page content container */}
      <main className="flex-1 flex flex-col items-center w-full z-10 relative">
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <LandingView key="landing" onQuery={handleQuery} theme={theme} />
          ) : (
            <ChatView
              key="chat"
              history={history}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              onQuery={handleQuery}
              isTyping={isTyping}
              onSelectProject={setSelectedProject}
              theme={theme}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {isInfoOpen && (
          <InfoModal
            isOpen={isInfoOpen}
            onClose={() => setInfoOpen(false)}
            onContactClick={() => {
              setInfoOpen(false);
              handleQuery("How can I contact you?");
            }}
            theme={theme}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            theme={theme}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
