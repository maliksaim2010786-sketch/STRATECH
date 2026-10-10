import React from 'react';
import { Award, ThumbsUp, HardHat, ShieldCheck } from 'lucide-react';

export const MetricsBanner: React.FC = () => {
  const metrics = [
    {
      id: 'projects',
      value: '150+',
      title: 'Projects Completed',
      subtitle: 'Across diverse sectors',
      icon: Award,
    },
    {
      id: 'satisfaction',
      value: '98%',
      title: 'Client Satisfaction',
      subtitle: 'Quality you can trust',
      icon: ThumbsUp,
    },
    {
      id: 'professionals',
      value: '500+',
      title: 'Skilled Professionals',
      subtitle: 'Experts behind our success',
      icon: HardHat,
    },
    {
      id: 'safety',
      value: 'Safety First',
      title: 'Committed to zero harm',
      subtitle: 'On every project, every day',
      icon: ShieldCheck,
      isTextVal: true,
    },
  ];

  return (
    <section className="bg-[#0b1424] border-t border-b border-white/10 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => {
            const IconComp = m.icon;
            return (
              <div
                key={m.id}
                className="flex items-center gap-4 group p-4 rounded-xl bg-[#0c1626]/40 hover:bg-[#12213a] border border-transparent hover:border-[#e5a93c]/50 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.6),0_0_20px_rgba(229,169,60,0.2)] transition-all duration-300 cursor-pointer"
              >
                {/* Gold Outlined / Fill Icon (matches screenshot bottom bar) */}
                <div className="w-13 h-13 rounded-xl bg-[#14233c] border border-[#e5a93c]/30 flex items-center justify-center text-[#e5a93c] shrink-0 group-hover:border-[#e5a93c] group-hover:bg-[#e5a93c] group-hover:text-[#070d17] group-hover:scale-115 group-hover:shadow-[0_0_15px_rgba(229,169,60,0.5)] transition-all duration-300">
                  <IconComp className="w-6 h-6 stroke-[1.8]" />
                </div>

                <div>
                  <div className={`font-extrabold text-white tracking-tight group-hover:text-[#e5a93c] transition-colors duration-200 ${m.isTextVal ? 'text-lg text-[#e5a93c]' : 'text-2xl sm:text-3xl tabular-nums'}`}>
                    {m.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-white mt-0.5 transition-colors duration-200">
                    {m.title}
                  </div>
                  <div className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors duration-200">
                    {m.subtitle}
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
