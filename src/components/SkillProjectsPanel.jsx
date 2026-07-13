import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, Code2 } from 'lucide-react';
import { allRepositories, featuredProjects } from '../data/portfolioData';

// Skill metadata: description + keywords to match repos
const skillMeta = {
  'react': {
    label: 'React',
    color: 'text-cyan-500 bg-cyan-50 border-cyan-100 dark:bg-cyan-950/10 dark:border-cyan-900/20',
    dot: 'bg-cyan-500',
    description: 'Lokesh builds interactive UIs with React, leveraging hooks, component composition, and state management. He\'s used React across full-stack apps (CivicTrack, Meditrack) and his own AI portfolio.',
    repoKeywords: ['react', 'portfolio', 'civictrack', 'meditrack', 'teamflow', 'zorvyn', 'zorvyn', 'ecotracker', 'cardioguard'],
    langFilter: ['JavaScript', 'TypeScript'],
  },
  'javascript': {
    label: 'JavaScript (ES6+)',
    color: 'text-yellow-600 bg-yellow-50 border-yellow-100 dark:bg-yellow-950/10 dark:border-yellow-900/20',
    dot: 'bg-yellow-400',
    description: 'Lokesh uses modern JavaScript (ES6+) extensively — async/await, destructuring, arrow functions, modules, and DOM APIs. He\'s built dashboards, SPAs, browser tools, and chatbots with it.',
    repoKeywords: ['teamflow', 'ibm-internship', 'zorvyn', 'google-ca', 'meditrack', 'cardioguard', 'assignment', 'hack_time', 'medicine', 'stopwatch', 'calculator', 'copilot', 'portfolio'],
    langFilter: ['JavaScript'],
  },
  'tailwind css': {
    label: 'Tailwind CSS',
    color: 'text-teal-600 bg-teal-50 border-teal-100 dark:bg-teal-950/10 dark:border-teal-900/20',
    dot: 'bg-teal-500',
    description: 'Lokesh uses Tailwind CSS v4 for responsive design, dark mode, glassmorphism, and utility-first layouts across his React projects and portfolio.',
    repoKeywords: ['portfolio', 'meditrack', 'ecotracker', 'teamflow'],
    langFilter: ['JavaScript', 'HTML'],
  },
  'html5': {
    label: 'HTML5',
    color: 'text-orange-600 bg-orange-50 border-orange-100 dark:bg-orange-950/10 dark:border-orange-900/20',
    dot: 'bg-orange-500',
    description: 'Lokesh has strong semantic HTML5 skills. He has built multiple landing pages, educational tools, and responsive websites using HTML5 with accessibility best practices.',
    repoKeywords: ['greenloopai', 'civictrack', 'ibm_internship', 'gear4rent', 'qrcode', 'ibm-magic', 'modernblog', 'genai', 'age'],
    langFilter: ['HTML'],
  },
  'css3': {
    label: 'CSS3',
    color: 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-950/10 dark:border-blue-900/20',
    dot: 'bg-blue-500',
    description: 'Lokesh leverages CSS3 animations, Grid, Flexbox, custom properties, and responsive breakpoints to build polished interfaces across his projects.',
    repoKeywords: ['greenloopai', 'civictrack', 'ibm_internship', 'gear4rent', 'qrcode', 'modernblog', 'micro', 'age'],
    langFilter: ['HTML'],
  },
  'bootstrap': {
    label: 'Bootstrap',
    color: 'text-purple-600 bg-purple-50 border-purple-100 dark:bg-purple-950/10 dark:border-purple-900/20',
    dot: 'bg-purple-500',
    description: 'Lokesh has used Bootstrap for rapid responsive layout scaffolding in projects like CivicTrack and Gear4Rent.',
    repoKeywords: ['civictrack', 'gear4rent', 'ibm_internship'],
    langFilter: ['HTML', 'JavaScript'],
  },
  'node.js': {
    label: 'Node.js',
    color: 'text-green-600 bg-green-50 border-green-100 dark:bg-green-950/10 dark:border-green-900/20',
    dot: 'bg-green-500',
    description: 'Lokesh builds REST APIs and server-side logic with Node.js, powering apps like Meditrack (with scheduled email alerts) and CivicTrack.',
    repoKeywords: ['meditrack', 'civictrack', 'medicine', 'teamflow'],
    langFilter: ['JavaScript'],
  },
  'express': {
    label: 'Express',
    color: 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/10 dark:border-gray-700/20',
    dot: 'bg-gray-500',
    description: 'Lokesh uses Express.js to build RESTful APIs with authentication, routing, and middleware for his full-stack applications.',
    repoKeywords: ['meditrack', 'civictrack', 'medicine', 'teamflow'],
    langFilter: ['JavaScript'],
  },
  'django': {
    label: 'Django',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/20',
    dot: 'bg-emerald-600',
    description: 'Lokesh used Django in CivicTrack for server-side routing, model management, admin dashboards, and SQLite3 data handling.',
    repoKeywords: ['civictrack'],
    langFilter: ['HTML', 'Python'],
  },
  'mongodb': {
    label: 'MongoDB',
    color: 'text-green-700 bg-green-50 border-green-100 dark:bg-green-950/10 dark:border-green-900/20',
    dot: 'bg-green-600',
    description: 'Lokesh uses MongoDB Atlas with Mongoose for schema design and NoSQL data modelling in apps like Meditrack and TeamFlow.',
    repoKeywords: ['meditrack', 'teamflow', 'medicine'],
    langFilter: ['JavaScript'],
  },
  'python': {
    label: 'Python',
    color: 'text-blue-700 bg-blue-50 border-blue-100 dark:bg-blue-950/10 dark:border-blue-900/20',
    dot: 'bg-blue-700',
    description: 'Lokesh uses Python for AI/ML projects — building Random Forest models, NLP resume screening, chatbot APIs, and data analytics pipelines.',
    repoKeywords: ['aicte-internship', 'capston', 'warehouse', 'ai-resume'],
    langFilter: ['Python'],
  },
  'figma': {
    label: 'Figma',
    color: 'text-pink-600 bg-pink-50 border-pink-100 dark:bg-pink-950/10 dark:border-pink-900/20',
    dot: 'bg-pink-500',
    description: 'Lokesh is a Graphic Designer at Grovyn where he uses Figma to design wireframes, high-fidelity prototypes, design systems, and interactive product mockups.',
    repoKeywords: ['civictrack', 'gear4rent', 'portfolio'],
    langFilter: ['HTML', 'JavaScript'],
  },
  'prompt engineering': {
    label: 'Prompt Engineering',
    color: 'text-violet-600 bg-violet-50 border-violet-100 dark:bg-violet-950/10 dark:border-violet-900/20',
    dot: 'bg-violet-500',
    description: 'Lokesh has deep experience in prompt engineering — designing system prompts, few-shot examples, and chain-of-thought patterns for AI chatbots and resume tools during his Edunet internship.',
    repoKeywords: ['ai-resume', 'warehouse', 'aicte-internship', 'genai'],
    langFilter: ['Python', 'HTML'],
  },
  'typescript': {
    label: 'TypeScript',
    color: 'text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/10 dark:border-blue-900/20',
    dot: 'bg-blue-500',
    description: 'Lokesh uses TypeScript for typed, scalable applications including EcoTracker and generate-and-learn.',
    repoKeywords: ['conventions', 'ecotracker', 'generate-and-learn'],
    langFilter: ['TypeScript'],
  },
};

// Fuzzy-match repos to skill keywords
function getMatchedRepos(skill) {
  const meta = skillMeta[skill.toLowerCase()];
  if (!meta) return [];

  const keywords = meta.repoKeywords;
  const langs = meta.langFilter;

  return allRepositories.filter(repo => {
    const nameLower = repo.name.toLowerCase();
    const matchesKeyword = keywords.some(kw => nameLower.includes(kw));
    const matchesLang = langs.includes(repo.language);
    return matchesKeyword || matchesLang;
  }).slice(0, 8); // cap at 8
}

// Language color dots
const langColor = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-blue-700',
  HTML: 'bg-orange-500',
  PHP: 'bg-indigo-500',
};

export default function SkillProjectsPanel({ skill, theme }) {
  const skillKey = skill.toLowerCase();
  const meta = skillMeta[skillKey] || {
    label: skill,
    color: 'text-slate-600 bg-slate-50 border-slate-200',
    dot: 'bg-slate-500',
    description: `Here are the GitHub projects related to ${skill}.`,
    repoKeywords: [],
    langFilter: [],
  };

  // Get repos matching this skill
  const matchedRepos = getMatchedRepos(skillKey);

  // Also check featured projects for this skill
  const matchedFeatured = featuredProjects.filter(p =>
    p.technologies.some(t => t.toLowerCase().includes(skillKey) || skillKey.includes(t.toLowerCase()))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full flex flex-col items-start mb-12 relative z-10 pt-2">
      {/* Header */}
      <div className="w-full flex items-center gap-3 mb-2">
        <span className={`px-3.5 py-1.5 rounded-full border text-sm font-bold ${meta.color}`}>
          {meta.label}
        </span>
        <Code2 className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`} />
      </div>

      {/* Skill description */}
      <p className={`text-base leading-relaxed mb-8 max-w-2xl ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-600'}`}>
        {meta.description}
      </p>

      {/* Featured Projects using this skill */}
      {matchedFeatured.length > 0 && (
        <div className="w-full mb-8">
          <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'}`}>
            ⭐ Featured Projects
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3 w-full"
          >
            {matchedFeatured.map(proj => (
              <motion.div
                key={proj.id}
                variants={itemVariants}
                className={`w-full rounded-2xl border p-5 flex flex-col gap-2 transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                    : 'bg-white border-slate-200/60 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className={`text-base font-bold ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'}`}>
                    {proj.title}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${meta.color}`}>
                    {proj.category}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {proj.technologies.map(t => (
                    <span
                      key={t}
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        t.toLowerCase().includes(skillKey) || skillKey.includes(t.toLowerCase())
                          ? meta.color
                          : theme === 'dark'
                            ? 'bg-zinc-800/60 border-zinc-700/60 text-zinc-400'
                            : 'bg-slate-100 border-slate-200 text-slate-500'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {proj.links.map(l => (
                    <a
                      key={l.label}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-sm"
                    >
                      <GitBranch className="w-3 h-3" />
                      {l.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* GitHub Repositories */}
      {matchedRepos.length > 0 && (
        <div className="w-full">
          <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'}`}>
            🔗 Related GitHub Repositories
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
          >
            {matchedRepos.map(repo => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group rounded-2xl border p-4 flex flex-col gap-2 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-600/80 hover:bg-zinc-800/60'
                    : 'bg-white border-slate-200/60 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <GitBranch className={`w-4 h-4 flex-shrink-0 ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-400'} group-hover:text-blue-500 transition-colors`} />
                    <span className={`text-sm font-bold truncate group-hover:text-blue-500 transition-colors ${theme === 'dark' ? 'text-zinc-200' : 'text-slate-800'}`}>
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink className={`w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-400'}`} />
                </div>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>
                  {repo.description}
                </p>
                {repo.language && (
                  <div className="flex items-center gap-1.5 mt-auto pt-1">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${langColor[repo.language] || 'bg-slate-400'}`} />
                    <span className={`text-[11px] font-semibold ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>
                      {repo.language}
                    </span>
                  </div>
                )}
              </motion.a>
            ))}
          </motion.div>
        </div>
      )}

      {matchedFeatured.length === 0 && matchedRepos.length === 0 && (
        <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>
          No specific repositories found for this skill yet, but Lokesh actively uses it across projects.
        </p>
      )}
    </div>
  );
}
