import React from 'react';
import { Shield, ArrowLeft, Terminal, Sparkles, Home, Layers } from 'lucide-react';

import { FeatureTabType } from './FeaturesNavBar';

interface HeaderProps {
  currentView?: 'home' | 'scanner';
  onNavigate?: (view: 'home' | 'scanner', initialTab?: FeatureTabType) => void;
  onOpenPitch?: () => void;
}

const NAV_LINKS: { label: string; tab: FeatureTabType }[] = [
  { label: 'Scan Ingestion', tab: 'ingest' },
  { label: 'Explainable AI', tab: 'explainable' },
  { label: '6-Layer Matrix', tab: 'matrix' },
  { label: 'Attack DNA', tab: 'dna' },
  { label: 'Trust Graph', tab: 'trust' },
  { label: 'SOC Playbook', tab: 'remediation' },
  { label: 'Executive Verdict', tab: 'overview' },
];

export const Header: React.FC<HeaderProps> = ({
  currentView = 'home',
  onNavigate,
  onOpenPitch,
}) => {
  return (
    <header
      id="main-header"
      className="header-fade-down w-full max-w-[1920px] mx-auto flex items-center justify-between z-50 select-none py-3 px-2 sm:px-4 bg-white/70 backdrop-blur-md border-b border-slate-200/80"
    >
      {/* Left side: Logo + Navigation */}
      <div className="flex items-center gap-6 sm:gap-10 lg:gap-14">
        <button
          onClick={() => onNavigate?.('home')}
          className="flex items-center gap-3.5 group cursor-pointer bg-transparent border-none p-0 text-left"
          id="header-logo-link"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center border border-blue-400/50 shadow-md group-hover:scale-105 transition-transform shadow-blue-500/20 shrink-0">
            <Shield className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-white stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-black font-black text-2xl sm:text-3xl tracking-tight font-['Urbanist'] leading-none">
              CyberSentinel
            </span>
            <span className="text-xs sm:text-sm font-mono text-blue-600 font-bold tracking-wide mt-1">
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
                className="nav-link text-slate-600 hover:text-slate-900 text-[14px] lg:text-[15px] font-medium tracking-[-0.2px] transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
        ) : (
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-slate-400">/</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-medium text-blue-700">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
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
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-blue-600" />
              <span>Home Landing</span>
            </button>

            {onOpenPitch && (
              <button
                onClick={onOpenPitch}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>10-Stage Evaluation Pitch</span>
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => onNavigate?.('scanner')}
              id="header-login-link"
              className="login-link text-slate-600 hover:text-slate-900 text-[14px] sm:text-[15px] font-medium tracking-[-0.2px] bg-transparent border-none cursor-pointer hidden xs:inline-block"
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

