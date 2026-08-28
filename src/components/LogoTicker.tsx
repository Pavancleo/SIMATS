import React from 'react';
import { Brain, Sparkles, Globe, Shield, Activity, Dna, Cpu, Lock } from 'lucide-react';

const TECH_BADGES = [
  { id: 't1', label: 'NLP Language Processing', icon: <Brain className="w-4 h-4 text-[#A068FF]" /> },
  { id: 't2', label: 'LLM Intent Detection', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
  { id: 't3', label: 'Machine Learning Models', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
  { id: 't4', label: 'Cybersecurity AI SOC', icon: <Shield className="w-4 h-4 text-purple-400" /> },
  { id: 't5', label: 'URL & Typosquat Analysis', icon: <Globe className="w-4 h-4 text-amber-400" /> },
  { id: 't6', label: 'Anomaly Detection', icon: <Activity className="w-4 h-4 text-rose-400" /> },
  { id: 't7', label: 'Explainable AI Engine', icon: <Dna className="w-4 h-4 text-teal-400" /> },
];

const REPEATED_TECH = [...TECH_BADGES, ...TECH_BADGES, ...TECH_BADGES];

export const LogoTicker: React.FC = () => {
  return (
    <div
      id="tech-ticker-section"
      className="logos-fade-up w-full relative z-30 py-6 sm:py-8 select-none overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        <div
          className="ticker-container relative w-full overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, transparent 100%)',
          }}
        >
          <div className="ticker-track flex items-center gap-[48px] w-max animate-ticker">
            {REPEATED_TECH.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#060218]/90 border border-[#A068FF]/30 shadow-md hover:border-[#A068FF] transition-all"
              >
                {item.icon}
                <span className="text-[#ffffff] text-[14px] font-medium tracking-tight font-['Inter'] whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



