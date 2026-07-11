import React from 'react';
import loki from '../assets/loki.jpg';

export default function AboutMe({ theme }) {
  return (
    <section className={`w-full transition-colors duration-500 ${theme === 'dark' ? 'bg-[#070a13]' : 'bg-[#f8fafc]'}`}>
    <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
      {/* Profile Photo */}
      <div className={`w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-[2rem] overflow-hidden shadow-sm border transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#0f172a] border-[#1e293b]' : 'bg-slate-100 border-slate-200/60'
      }`}>
        <img src={loki} alt="Ashapu Lokesh" className="w-full h-full object-cover" />
      </div>

      {/* Profile Details */}
      <div className="flex-1 flex flex-col text-left">
        <h1 className={`text-4xl font-bold mb-2 transition-colors duration-500 ${
          theme === 'dark' ? 'text-[#f8fafc]' : 'text-slate-900'
        }`}>
          Ashapu Lokesh
        </h1>
        <p className={`mb-4 font-medium transition-colors duration-500 ${
          theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-500'
        }`}>
          AI Developer & Designer <span className="mx-2">-</span> Srikakulam, India
        </p>
        <p className={`leading-relaxed mb-6 transition-colors duration-500 ${
          theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-700'
        }`}>
          I am a Computer Science Engineering student, UX/UI designer, and frontend developer. As a Google Student Ambassador (GSA'25), I enjoy designing modern interfaces, running AI/tech workshops, and building functional applications that bridge visual design and robust engineering.
        </p>

        {/* Highlight Skill Badges */}
        <div className="flex flex-wrap gap-2">
          {["AI Development", "Prompt Engineering", "UX/UI Design", "Frontend Engineering", "Community Leadership"].map((badge) => (
            <span
              key={badge}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[13px] font-semibold shadow-sm shadow-blue-500/10"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
}
