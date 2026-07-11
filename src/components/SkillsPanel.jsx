import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/portfolioData';

export default function SkillsPanel({ onSelectSkill, theme }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full flex flex-col items-start mb-12 relative z-10 pt-2">
      <div className="w-full text-left mb-6">
        <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${
          theme === 'dark' ? 'text-slate-100' : 'text-slate-800'
        }`}>
          Skills & Expertise
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col gap-10"
      >
        {skillsData.map((category) => (
          <div key={category.title} className="w-full flex flex-col items-start">
            <h3 className={`text-xl font-bold mb-2 flex items-center gap-2 transition-colors duration-500 ${
              theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'
            }`}>
              <span className="text-blue-500 font-mono tracking-tighter">&lt;/&gt;</span>
              <span>{category.title}</span>
            </h3>
            <p className={`text-xs mb-4 font-normal ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>
              {category.description}
            </p>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill, index) => (
                <motion.button
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectSkill(skill)}
                  className={`px-4.5 py-2.5 rounded-full border text-[13px] font-semibold transition-all shadow-sm cursor-pointer select-none ${
                    theme === 'dark'
                      ? 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-350 hover:text-zinc-100'
                      : 'bg-white border-slate-200/60 hover:bg-slate-50 hover:border-slate-300 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
