import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Building2, 
  CheckCircle2, 
  Bookmark, 
  FileCheck,
  Send,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    selectedProject, 
    currentUser, 
    toggleSaveProject, 
    openModal 
  } = useApp();

  if (activeModal !== 'project-details' || !selectedProject) {
    return null;
  }

  const project = selectedProject;
  const isSaved = currentUser?.savedProjectIds?.includes(project.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl my-6 rounded-2xl bg-[#0c1626] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#0e192c] shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#e5a93c]/15 text-[#e5a93c] border border-[#e5a93c]/30">
              {project.category}
            </span>
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveProject(project.id)}
              className={`p-2 rounded-lg transition-colors ${
                isSaved ? 'bg-[#e5a93c] text-[#070d17]' : 'bg-[#14233c] text-slate-300 hover:text-white'
              }`}
              title={isSaved ? 'Saved in Profile' : 'Save to Profile'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={closeModal}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Visual & Key Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 rounded-xl overflow-hidden border border-white/10 relative group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1626]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-[#e5a93c]" />
                <span>{project.location}</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Project Key Performance Metrics
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#101c30] border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      {m.label}
                    </span>
                    <span className="text-base font-extrabold text-white tabular-nums block">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-[#14233c] border border-white/5 space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Commissioning Client:</span>
                  <span className="text-white font-medium">{project.client}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Completed Year:</span>
                  <span className="text-white font-medium">{project.year}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Total Capital Scope:</span>
                  <span className="text-[#e5a93c] font-bold">{project.budget}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white">Engineering Overview</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Structural & Material Specifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.specifications.map((spec, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#101c30] border border-white/5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#e5a93c] shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/5 bg-[#0e192c] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <FileCheck className="w-4 h-4 text-[#e5a93c]" />
            <span>Full LOD 400 CAD sets and seismic calculation logs available.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                closeModal();
                openModal('quote-request');
              }}
              className="py-2.5 px-4 text-xs font-bold text-[#070d17] bg-[#e5a93c] hover:bg-[#f3b94e] rounded-lg transition-all flex items-center gap-1.5 shadow-md"
            >
              <span>Inquire for Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
