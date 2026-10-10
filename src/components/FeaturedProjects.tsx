import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project, ProjectCategory } from '../types';
import { 
  Building, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  ExternalLink,
  Layers,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const FeaturedProjects: React.FC = () => {
  const { projects, openProjectDetails, currentUser, toggleSaveProject } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [startIndex, setStartIndex] = useState<number>(0);

  const categories: string[] = [
    'All',
    'High-rise Development',
    'Commercial Building',
    'Infrastructure Project',
    'Urban Development',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const handleNext = () => {
    if (startIndex + 4 < filteredProjects.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(Math.max(0, filteredProjects.length - 4));
    }
  };

  return (
    <section id="projects" className="py-20 bg-[#070d17] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: matches screenshot layout with arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5a93c]">
              OUR WORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Featured Projects
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed border-l-0 sm:border-l border-white/10 sm:pl-4">
              From iconic landmarks to sustainable communities, we build solutions that shape the future.
            </p>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                aria-label="Previous projects"
                className="w-10 h-10 rounded-full bg-[#101c30] border border-white/10 hover:border-[#e5a93c] hover:bg-[#162642] hover:scale-110 hover:shadow-[0_0_15px_rgba(229,169,60,0.3)] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next projects"
                className="w-10 h-10 rounded-full bg-[#e5a93c] hover:bg-[#f3b94e] hover:scale-110 hover:shadow-[0_0_20px_rgba(229,169,60,0.5)] text-[#070d17] flex items-center justify-center font-bold transition-all duration-300 shadow-md cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setStartIndex(0);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-105 ${
                selectedCategory === cat
                  ? 'bg-[#e5a93c] text-[#070d17] font-semibold shadow-[0_0_15px_rgba(229,169,60,0.35)]'
                  : 'bg-[#0f1a2d] text-slate-300 hover:text-white hover:border-[#e5a93c]/50 hover:bg-[#14233c] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4 Project Showcase Cards (Matches Screenshot layout perfectly) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project: Project) => {
            const isSaved = currentUser?.savedProjectIds?.includes(project.id);
            return (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden bg-[#0c1626] border border-white/10 hover:border-[#e5a93c] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),0_0_30px_rgba(229,169,60,0.25)] flex flex-col cursor-pointer"
              >
                {/* Project Image */}
                <div 
                  className="relative h-56 overflow-hidden cursor-pointer"
                  onClick={() => openProjectDetails(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1626] via-transparent to-transparent" />

                  {/* Bookmark Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveProject(project.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all duration-200 hover:scale-115 cursor-pointer ${
                      isSaved
                        ? 'bg-[#e5a93c] text-[#070d17] shadow-[0_0_12px_rgba(229,169,60,0.4)]'
                        : 'bg-[#070d17]/70 text-slate-300 hover:text-white hover:bg-[#e5a93c] hover:text-[#070d17]'
                    }`}
                    title={isSaved ? 'Saved in Profile' : 'Save Project to Profile'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  {/* Year Tag */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-slate-300 font-medium tracking-wide">
                    {project.year}
                  </div>
                </div>

                {/* Card Content & Circular Gold Emblem (matches screenshot bottom of card) */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 
                          onClick={() => openProjectDetails(project)}
                          className="text-base font-bold text-white group-hover:text-[#e5a93c] transition-colors duration-200 cursor-pointer"
                        >
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {project.category}
                        </p>
                      </div>

                      {/* Gold Circular Icon Badge (matches screenshot) */}
                      <div 
                        onClick={() => openProjectDetails(project)}
                        className="w-9 h-9 rounded-full border border-[#e5a93c]/50 bg-[#e5a93c]/10 flex items-center justify-center text-[#e5a93c] shrink-0 group-hover:bg-[#e5a93c] group-hover:text-[#070d17] group-hover:scale-115 group-hover:shadow-[0_0_15px_rgba(229,169,60,0.5)] transition-all duration-300 cursor-pointer"
                      >
                        <Building className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-[#e5a93c] shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Budget Scope</span>
                      <span className="text-[#e5a93c] font-bold tabular-nums">
                        {project.budget}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5">
                    <button
                      onClick={() => openProjectDetails(project)}
                      className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-[#14233c] hover:bg-[#e5a93c] text-slate-200 hover:text-[#070d17] hover:scale-102 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Specifications</span>
                      <ExternalLink className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
