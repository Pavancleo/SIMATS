import React from 'react';
import { Shield, ArrowLeft, Terminal, Sparkles, Home, Layers } from 'lucide-react';

interface HeaderProps {
  currentView?: 'home' | 'scanner';
  onNavigate?: (view: 'home' | 'scanner', initialTab?: 'all' | 'explainable' | 'multilayer' | 'dna_chain' | 'trust_impact') => void;
  onOpenPitch?: () => void;
}

const NAV_LINKS: { label: string; tab: 'all' | 'explainable' | 'multilayer' | 'dna_chain' | 'trust_impact' }[] = [
  { label: 'NLP & Intent', tab: 'multilayer' },
  { label: 'URL Analysis', tab: 'trust_impact' },
  { label: 'Attack DNA', tab: 'dna_chain' },
  { label: 'Explainable AI', tab: 'explainable' },
];

export const Header: React.FC<HeaderProps> = ({
  currentView = 'home',
  onNavigate,
  onOpenPitch,
}) => {
  return (
    <header
      id="main-header"
      className="header-fade-down w-full max-w-[1920px] mx-auto flex items-center justify-between z-50 select-none py-3 px-2 sm:px-4"
    >
      {/* Left side: Logo + Navigation */}
      <div className="flex items-center gap-6 sm:gap-10 lg:gap-14">
        <button
          onClick={() => onNavigate?.('home')}
          className="flex items-center gap-2.5 group cursor-pointer bg-transparent border-none p-0 text-left"
          id="header-logo-link"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A068FF] to-[#070319] flex items-center justify-center border border-[#A068FF]/50 shadow-md group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-[18px] sm:text-[20px] tracking-tight font-['Urbanist'] leading-tight">
              CyberSentinel
            </span>
            <span className="text-[10px] font-mono text-[#A068FF] hidden sm:block">
              AI Threat Detection Engine
            </span>
          </div>
        </button>

        {currentView === 'home' ? (
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" id="primary-nav">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate?.('scanner', link.tab)}
                className="nav-link text-slate-300 hover:text-white text-[14px] lg:text-[15px] font-normal tracking-[-0.2px] transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
        ) : (
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-slate-600">/</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A068FF]/10 border border-[#A068FF]/30 text-xs font-mono text-[#c4b5fd]">
              <Layers className="w-3.5 h-3.5 text-[#A068FF]" />
              <span>Threat Intelligence Scanner</span>
            </div>
          </div>
        )}
      </div>

      {/* Right side: Navigation actions */}
      <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
        {currentView === 'scanner' ? (
          <>
            <button
              onClick={() => onNavigate?.('home')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>Home Landing</span>
            </button>

            {onOpenPitch && (
              <button
                onClick={onOpenPitch}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#A068FF]/20 hover:bg-[#A068FF]/30 text-[#c4b5fd] border border-[#A068FF]/40 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A068FF]" />
                <span>10-Stage Evaluation Pitch</span>
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => onNavigate?.('scanner')}
              id="header-login-link"
              className="login-link text-slate-300 hover:text-white text-[14px] sm:text-[15px] font-medium tracking-[-0.2px] bg-transparent border-none cursor-pointer hidden xs:inline-block"
            >
              Live SOC Console
            </button>

            <div className="btn-border-wrap" id="join-now-wrap">
              <button
                type="button"
                id="join-now-button"
                onClick={() => onNavigate?.('scanner')}
                className="btn-join cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>Scan Threat</span>
                  <Terminal className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

