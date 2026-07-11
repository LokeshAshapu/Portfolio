import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/portfolioData';

export default function ExperienceTimeline({ theme }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className={`w-full transition-colors duration-500 ${theme === 'dark' ? 'bg-[#070a13]' : 'bg-[#f8fafc]'}`}>
    <div className="w-full flex flex-col items-center mb-12 relative z-10 pt-2">
      <div className="w-full text-left mb-8">
        <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${
          theme === 'dark' ? 'text-slate-100' : 'text-slate-800'
        }`}>
          Professional Experience
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col gap-6 max-w-2xl"
      >
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            variants={cardVariants}
            whileHover={{
              y: -4,
              boxShadow: '0 12px 30px -10px rgba(59, 130, 246, 0.15)',
              borderColor: 'rgba(59, 130, 246, 0.4)'
            }}
            className={`w-full border rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-sm transition-all duration-300 relative group overflow-hidden ${
              theme === 'dark'
                ? 'bg-[#0f172a]/60 border-[#1e293b] hover:border-blue-500/40 text-[#f8fafc]'
                : 'bg-[#fcfcfc] border-slate-200/80 hover:border-blue-500/40 text-slate-700'
            }`}
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className={`text-lg font-heading font-bold transition-colors duration-500 ${
                  theme === 'dark' ? 'text-[#f8fafc]' : 'text-slate-800'
                }`}>
                  {exp.role}
                </h3>
                <p className="text-sm font-semibold text-blue-500">{exp.company}</p>
              </div>
              <span className={`px-3.5 py-1 text-xs font-semibold rounded-full w-fit self-start sm:self-center transition-colors ${
                theme === 'dark' ? 'bg-[#0f172a] border border-[#1e293b] text-[#94a3b8]' : 'bg-slate-100 text-slate-500'
              }`}>
                {exp.period}
              </span>
            </div>

            {/* Bullets */}
            <ul className={`list-disc pl-5 text-sm space-y-2 mb-2 text-left relative z-10 leading-relaxed font-normal ${
              theme === 'dark' ? 'text-zinc-400' : 'text-slate-650'
            }`}>
              {exp.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </section>
  );
}
