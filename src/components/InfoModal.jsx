import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function InfoModal({ isOpen, onClose, onContactClick, theme }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className={`relative w-full max-w-2xl rounded-[2rem] shadow-2xl p-8 md:p-12 overflow-hidden transition-colors duration-500 z-10 ${
          theme === 'dark' ? 'bg-zinc-950 text-zinc-100 border border-zinc-800/80' : 'bg-white text-slate-800'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${
            theme === 'dark' ? 'text-zinc-50' : 'text-slate-900'
          }`}>
            Welcome to AI Portfolio
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              theme === 'dark' ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className={`space-y-6 text-base md:text-lg leading-relaxed transition-colors duration-500 text-left ${
          theme === 'dark' ? 'text-zinc-350' : 'text-slate-600'
        }`}>
          <div>
            <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${
              theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'
            }`}>
              What's this?
            </h3>
            <p className="font-normal">
              I am so excited to present my <strong>brand new AI-native Portfolio</strong>. Whether you are a recruiter, a developer, a friend, or just curious, feel free to ask the portfolio assistant anything you want to know about me!
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${
              theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'
            }`}>
              Why?
            </h3>
            <p className="font-normal">
              Traditional portfolios can be limiting. They can't adapt to every visitor's specific needs. My portfolio becomes <strong>exactly what you are interested in knowing about me and my work</strong>, immediately presenting relevant components on demand.
            </p>
          </div>
        </div>

        {/* Start Button */}
        <div className="mt-10 flex flex-col items-center">
          <button
            onClick={onClose}
            className={`px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-all mb-6 shadow-md cursor-pointer ${
              theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200 shadow-white/5' : 'bg-black text-white hover:bg-zinc-800'
            }`}
          >
            Start Chatting
          </button>
          <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>
            If you love it, please share it! Feedback is always welcome.{' '}
            <button
              onClick={onContactClick}
              className="text-blue-500 hover:underline cursor-pointer border-0 bg-transparent p-0 font-bold inline ml-1"
            >
              Contact me.
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
