import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Users, 
  Construction, 
  Building, 
  Layers, 
  HardHat 
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { openModal, setActiveSection } = useApp();

  const heroCards = [
    {
      id: 'infra',
      title: 'INFRASTRUCTURE DEVELOPMENT',
      description: 'Building robust infrastructure for a stronger tomorrow.',
      icon: Construction,
    },
    {
      id: 'commercial',
      title: 'COMMERCIAL BUILDINGS',
      description: 'Creating functional spaces that inspire and perform.',
      icon: Building,
    },
    {
      id: 'urban',
      title: 'URBAN SOLUTIONS',
      description: 'Smart, sustainable solutions for modern urban challenges.',
      icon: Layers,
    },
    {
      id: 'pm',
      title: 'PROJECT MANAGEMENT',
      description: 'End-to-end management ensuring quality, safety and on-time delivery.',
      icon: HardHat,
    },
  ];

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#070d17] pt-6 pb-16">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#e5a93c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split: Headline & Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[520px]">
          
          {/* Left Column: Architectural Typographic Statement */}
          <div className="lg:col-span-6 z-10 space-y-8">
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] uppercase">
                ADVANCING <br />
                <span className="text-[#e5a93c] tracking-normal">INNOVATIVE</span> <br />
                ENGINEERING & <br />
                CONSTRUCTION
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal pt-2">
                Delivering exceptional solutions that build stronger, smarter and sustainable futures.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleScrollTo('projects')}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#070d17] bg-[#e5a93c] hover:bg-[#f3b94e] rounded-lg transition-all duration-300 shadow-lg shadow-[#e5a93c]/20 hover:shadow-[0_0_28px_rgba(229,169,60,0.5)] hover:-translate-y-1 hover:scale-105 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={() => handleScrollTo('services')}
                className="px-6 py-3.5 text-sm font-medium text-slate-200 bg-[#101c30]/80 hover:bg-[#162642] border border-white/10 hover:border-[#e5a93c] hover:text-white hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(229,169,60,0.2)] rounded-lg transition-all duration-300 cursor-pointer"
              >
                Our Services
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual with Skyline Image & 20+ Years Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#e5a93c]/50 transition-all duration-500 shadow-2xl group cursor-pointer hover:shadow-[0_0_35px_rgba(229,169,60,0.25)]">
              
              {/* High-fidelity City Skyline Image */}
              <img
                src="/src/assets/images/hero_city_skyline_1791630056183.jpg"
                alt="Modern engineering city skyline at twilight"
                className="w-full h-[400px] sm:h-[460px] object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Sophisticated dark gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070d17]/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge: "20+ Years of Excellence" (matches screenshot) */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3.5 px-4 py-3 rounded-xl bg-[#0b1424]/90 backdrop-blur-md border border-[#e5a93c]/30 hover:border-[#e5a93c] hover:bg-[#101c30] hover:scale-105 hover:shadow-[0_0_25px_rgba(229,169,60,0.35)] transition-all duration-300 shadow-xl cursor-pointer group/badge">
                <div className="p-2 rounded-lg bg-[#e5a93c]/15 text-[#e5a93c] group-hover/badge:bg-[#e5a93c] group-hover/badge:text-[#070d17] transition-colors duration-300">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white tracking-tight flex items-baseline gap-1 group-hover/badge:text-[#e5a93c] transition-colors">
                    <span>20+</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-medium">
                    Years of Excellence
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Lower Shelf: 4 Gold Wireframe Service Cards (matches screenshot) */}
        <div id="services" className="mt-16 pt-8 border-t border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroCards.map((card) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => handleScrollTo('projects')}
                  className="group relative p-6 rounded-xl bg-[#0c1626]/80 hover:bg-[#13223c] border border-white/10 hover:border-[#e5a93c] transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.7),0_0_25px_rgba(229,169,60,0.22)]"
                >
                  {/* Subtle top amber highlight on hover */}
                  <div className="w-12 h-12 rounded-lg bg-[#14233c] border border-[#e5a93c]/30 flex items-center justify-center text-[#e5a93c] mb-5 group-hover:border-[#e5a93c] group-hover:bg-[#e5a93c] group-hover:text-[#070d17] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(229,169,60,0.4)] transition-all duration-300">
                    <IconComp className="w-6 h-6 stroke-[1.6]" />
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-2 group-hover:text-[#e5a93c] transition-colors duration-200">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed transition-colors duration-200">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
