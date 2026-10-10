import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  BarChart3, 
  Leaf, 
  Compass, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { openModal } = useApp();

  const expertiseItems = [
    {
      id: 'eng',
      title: 'Advanced Engineering',
      description: 'FEA simulation, aerodynamic analysis, and seismic zone structural resilience.',
      icon: Settings,
    },
    {
      id: 'planning',
      title: 'Strategic Planning',
      description: 'Integrated BIM Level 400 schedules, supply chain risk mitigation, and CPM paths.',
      icon: BarChart3,
    },
    {
      id: 'sustainable',
      title: 'Sustainable Solutions',
      description: 'LEED Platinum, carbon-sequestering mass timber, and circular building lifecycle.',
      icon: Leaf,
    },
    {
      id: 'design',
      title: 'Innovative Design',
      description: 'Biophilic architectural envelopes, dynamic facades, and adaptive reuse.',
      icon: Compass,
    },
  ];

  return (
    <section id="about" className="relative py-20 bg-[#070d17] border-t border-white/5 overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Zone Architecture Section matching the screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Zone 1: Architectural Building Visual (4 cols) */}
          <div className="lg:col-span-4 relative group cursor-pointer">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#e5a93c]/50 transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_35px_rgba(229,169,60,0.25)]">
              <img
                src="/src/assets/images/about_architecture_1791630069743.jpg"
                alt="Contemporary commercial headquarters building"
                className="w-full h-[440px] object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070d17]/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Trust Badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#0b1424]/90 backdrop-blur-md border border-white/10 group-hover:border-[#e5a93c]/40 transition-colors flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#e5a93c] shrink-0" />
                <p className="text-[11px] text-slate-300 font-medium leading-tight">
                  ISO 9001 & 14001 Certified Construction Precision
                </p>
              </div>
            </div>
          </div>

          {/* Zone 2: ABOUT US Editorial Statement (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5a93c]">
                ABOUT US
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Engineering Progress. <br />
                <span className="text-slate-100">Building Trust.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              At Stratech, we combine innovation, technical expertise and industry experience to deliver high-quality construction solutions that stand the test of time.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              With multi-disciplinary teams across structural, civil, geotechnical, and MEP sectors, we turn complex blueprints into enduring civic and commercial landmarks.
            </p>

            <div className="pt-2">
              <button
                onClick={() => openModal('quote-request')}
                className="group inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-[#070d17] bg-[#e5a93c] hover:bg-[#f3b94e] hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(229,169,60,0.45)] rounded-lg transition-all duration-300 cursor-pointer shadow-md"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

          {/* Zone 3: OUR EXPERTISE (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="pb-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5a93c]">
                OUR EXPERTISE
              </span>
            </div>

            <div className="space-y-4">
              {expertiseItems.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-3.5 rounded-xl bg-[#0c1626]/70 border border-white/5 hover:border-[#e5a93c] hover:bg-[#14233c] hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(229,169,60,0.2)] transition-all duration-300 group cursor-pointer"
                  >
                    {/* Gold Circular Outline Icon (matches screenshot) */}
                    <div className="w-10 h-10 rounded-full border border-[#e5a93c]/50 bg-[#e5a93c]/10 flex items-center justify-center text-[#e5a93c] shrink-0 group-hover:scale-115 group-hover:border-[#e5a93c] group-hover:bg-[#e5a93c] group-hover:text-[#070d17] group-hover:shadow-[0_0_15px_rgba(229,169,60,0.5)] transition-all duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#e5a93c] transition-colors duration-200">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed transition-colors duration-200">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
