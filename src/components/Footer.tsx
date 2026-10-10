import React from 'react';
import { Building2, ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050912] border-t border-white/5 text-slate-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#14233c] border border-[#e5a93c]/40 flex items-center justify-center overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/26/b5/ec/26b5ece3bc56f913229650535343d43f.jpg"
                  alt="Stratech Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-widest text-white uppercase">
                  STRATECH
                </span>
                <span className="text-[9px] tracking-[0.25em] text-slate-400 font-semibold uppercase -mt-0.5">
                  BUILDING TOMORROW
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Global civil engineering, architectural design, and construction management. Advancing innovative structural systems, supertall developments, and sustainable urban solutions.
            </p>

            <div className="flex items-center gap-2 text-slate-300 text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-[#e5a93c]" />
              <span>ISO 9001:2015 & ISO 14001:2015 Accredited</span>
            </div>
          </div>

          {/* Core Disciplines */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-[#e5a93c] hover:translate-x-1.5 transition-all duration-200 inline-block">Infrastructure Development</a></li>
              <li><a href="#services" className="hover:text-[#e5a93c] hover:translate-x-1.5 transition-all duration-200 inline-block">Commercial High-Rises</a></li>
              <li><a href="#services" className="hover:text-[#e5a93c] hover:translate-x-1.5 transition-all duration-200 inline-block">Urban Solutions & Transit</a></li>
              <li><a href="#services" className="hover:text-[#e5a93c] hover:translate-x-1.5 transition-all duration-200 inline-block">Project & EPC Management</a></li>
              <li><a href="#products" className="hover:text-[#e5a93c] hover:translate-x-1.5 transition-all duration-200 inline-block">Direct BIM & CAD Catalog</a></li>
            </ul>
          </div>

          {/* Global Operations */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Engineering Hubs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2 group hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#e5a93c] shrink-0 mt-0.5 group-hover:scale-120 transition-transform" />
                <span>New York: 450 Financial Way, Level 40</span>
              </li>
              <li className="flex items-start gap-2 group hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#e5a93c] shrink-0 mt-0.5 group-hover:scale-120 transition-transform" />
                <span>London: 1 Canada Square, Canary Wharf</span>
              </li>
              <li className="flex items-start gap-2 group hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#e5a93c] shrink-0 mt-0.5 group-hover:scale-120 transition-transform" />
                <span>Singapore: Marina One West Tower</span>
              </li>
              <li className="flex items-start gap-2 group hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#e5a93c] shrink-0 mt-0.5 group-hover:scale-120 transition-transform" />
                <span>Dubai: DIFC Gate Precinct 4</span>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Corporate Inquiries
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 group hover:text-[#e5a93c] transition-colors cursor-pointer">
                <Mail className="w-3.5 h-3.5 text-[#e5a93c] group-hover:scale-120 transition-transform" />
                <span>inquiries@stratech-global.com</span>
              </p>
              <p className="flex items-center gap-2 group hover:text-[#e5a93c] transition-colors cursor-pointer">
                <Phone className="w-3.5 h-3.5 text-[#e5a93c] group-hover:scale-120 transition-transform" />
                <span>+1 (800) 420-STRATECH</span>
              </p>
              <p className="flex items-center gap-2 group hover:text-white transition-colors cursor-pointer">
                <Globe className="w-3.5 h-3.5 text-[#e5a93c] group-hover:scale-120 transition-transform" />
                <span>24/7 Global EPC Command</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Hairline & Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Stratech Engineering & Construction Global. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">FIDIC Member #4092</span>
            <span className="hover:text-slate-400 cursor-pointer">Escrow Protocols</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy & Data Governance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
