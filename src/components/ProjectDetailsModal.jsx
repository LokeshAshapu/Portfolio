import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

export default function ProjectDetailsModal({ project, onClose, theme }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 md:p-8 pt-28 md:pt-32">
      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`relative w-full max-w-3xl max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-10rem)] rounded-[2rem] shadow-2xl overflow-y-auto transition-colors duration-500 z-10 no-scrollbar ${
          theme === 'dark' ? 'bg-zinc-950 text-zinc-100 border border-zinc-800/80' : 'bg-white text-slate-800'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full transition-colors z-20 cursor-pointer ${
            theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12 text-left">
          <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
            theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'
          }`}>
            {project.category}
          </p>
          <h2 className={`text-4xl md:text-5xl font-serif font-bold tracking-tight mb-8 transition-colors duration-500 ${
            theme === 'dark' ? 'text-zinc-50' : 'text-slate-900'
          }`}>
            {project.title}
          </h2>

          {/* Description & Tech card */}
          <div className={`rounded-3xl p-6 md:p-8 mb-8 border transition-colors duration-500 ${
            theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800/70' : 'bg-slate-50 border-slate-150'
          }`}>
            <p className={`leading-relaxed text-[15px] mb-8 font-normal transition-colors duration-500 ${
              theme === 'dark' ? 'text-zinc-300' : 'text-slate-750'
            }`}>
              {project.description}
            </p>

            <div>
              <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'
              }`}>
                Technologies Used
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1.5 border rounded-lg text-xs font-semibold shadow-sm transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border-zinc-850 text-zinc-300'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="mb-6">
            <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${
              theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'
            }`}>
              Project Links
            </p>
            <div className="flex flex-col gap-2">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-xl transition-all group font-semibold border ${
                    theme === 'dark'
                      ? 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800 text-zinc-200 hover:text-zinc-50'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
