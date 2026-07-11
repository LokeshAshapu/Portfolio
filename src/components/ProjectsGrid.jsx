import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, ExternalLink } from 'lucide-react';
import { featuredProjects, allRepositories } from '../data/portfolioData';

export default function ProjectsGrid({ onSelectProject, theme }) {
  const scrollContainerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const targetScroll = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  // Get unique languages for filtering
  const languages = ['All', ...new Set(allRepositories.map(r => r.language).filter(Boolean))];

  // Filter repositories based on search and selected language
  const filteredRepos = allRepositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          repo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLang === 'All' || repo.language === selectedLang;
    return matchesSearch && matchesLang;
  });

  const getLanguageColor = (lang) => {
    switch (lang) {
      case 'JavaScript': return 'bg-yellow-400';
      case 'TypeScript': return 'bg-blue-400';
      case 'Python': return 'bg-green-500';
      case 'HTML': return 'bg-orange-500';
      case 'PHP': return 'bg-purple-400';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="w-full flex flex-col items-center mb-10 relative">
      {/* Featured Projects Carousel Section */}
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${
          theme === 'dark' ? 'text-slate-100' : 'text-slate-800'
        }`}>
          Featured Projects
        </h2>
        {/* Scroll Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer hover:bg-blue-600 hover:text-white ${
              theme === 'dark' ? 'border-[#1e293b] text-[#94a3b8] hover:bg-[#0f172a]' : 'border-slate-200 text-slate-650'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer hover:bg-blue-600 hover:text-white ${
              theme === 'dark' ? 'border-[#1e293b] text-[#94a3b8] hover:bg-[#0f172a]' : 'border-slate-200 text-slate-650'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Featured Projects Horizontal Slider */}
      <div
        ref={scrollContainerRef}
        className="w-full flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar pt-2 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="shrink-0 w-72 h-96 bg-slate-900 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden cursor-pointer group snap-center shadow-lg transition-all hover:shadow-xl hover:-translate-y-2"
            style={{ isolation: 'isolate' }}
          >
            {/* Dark Overlay with Blur on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-0 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            <img
              src={project.thumbnail}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 ease-out -z-10"
            />
            {/* Category tag */}
            <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md text-white text-[11px] font-bold rounded-full w-fit mb-3 relative z-10">
              {project.category}
            </span>
            {/* Title & Description */}
            <h3 className="text-xl font-bold text-white text-left mt-auto mb-2 font-serif relative z-10">
              {project.title}
            </h3>
            <p className="text-xs text-slate-300 text-left line-clamp-3 leading-relaxed relative z-10 font-normal">
              {project.description}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className={`w-full my-12 border-0 h-px ${theme === 'dark' ? 'bg-[#1e293b]' : 'bg-slate-200'}`} />

      {/* GitHub Repositories Search and Grid Section */}
      <div className="w-full text-left mb-8">
        <h2 className={`text-3xl font-bold tracking-tight mb-2 transition-colors duration-500 ${
          theme === 'dark' ? 'text-slate-100' : 'text-slate-800'
        }`}>
          GitHub Repositories
        </h2>
        <p className={`text-sm ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-500'}`}>
          A filterable list of my open-source code and coding history from GitHub.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search repositories..."
            className={`w-full py-2.5 pl-10 pr-4 rounded-full border text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all ${
              theme === 'dark' ? 'bg-[#0f172a] border-[#1e293b] text-[#f8fafc]' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        {/* Language Filter Tags */}
        <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar py-1">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer hover:scale-105 ${
                selectedLang === lang
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : theme === 'dark'
                  ? 'bg-[#0f172a] border-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc]'
                  : 'bg-white border-slate-200 text-slate-650 hover:text-slate-800'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Repos Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col justify-between border rounded-[1.5rem] p-6 text-left shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group duration-300 ${
                theme === 'dark' ? 'bg-[#0f172a]/60 border-[#1e293b] hover:border-blue-500/50' : 'bg-white border-slate-200/60 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className={`font-heading font-bold text-lg leading-snug group-hover:text-blue-500 transition-colors break-words ${
                    theme === 'dark' ? 'text-[#f8fafc]' : 'text-slate-800'
                  }`}>
                    {repo.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className={`text-xs leading-relaxed line-clamp-3 mb-6 font-normal ${
                  theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-500'
                }`}>
                  {repo.description || "No description provided. Click to view repository and codebase on GitHub."}
                </p>
              </div>

              {repo.language && (
                <div className="flex items-center gap-1.5 mt-auto">
                  <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                  <span className={`text-[11px] font-bold ${theme === 'dark' ? 'text-[#64748b]' : 'text-slate-400'}`}>
                    {repo.language}
                  </span>
                </div>
              )}
            </a>
          ))
        ) : (
          <div className={`col-span-full py-16 text-center rounded-[2rem] border ${
            theme === 'dark' ? 'bg-[#0f172a]/20 border-[#1e293b] text-[#64748b]' : 'bg-slate-50/50 border-slate-200 text-slate-400'
          }`}>
            No repositories match your search or filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
