import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  Brain, 
  Flame, 
  Network, 
  ShieldCheck, 
  ArrowLeft, 
  RefreshCw, 
  ShieldAlert, 
  FileText, 
  Compass, 
  Dna, 
  GitCommit, 
  Target, 
  Send, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { FullThreatAnalysisResult } from '../types';
import { SAMPLE_THREATS } from '../data/sampleThreats';

export type FeatureTabType = 'all' | 'explainable' | 'multilayer' | 'dna_chain' | 'trust_impact' | 'remediation';

interface FeaturesNavBarProps {
  activeTab: FeatureTabType;
  setActiveTab: (tab: FeatureTabType) => void;
  analysis: FullThreatAnalysisResult | null;
  selectedSampleId: string;
  onSelectSampleById: (id: string) => void;
  isAnalyzing: boolean;
  onReAnalyze: () => void;
  onNavigateHome: () => void;
}

export const FeaturesNavBar: React.FC<FeaturesNavBarProps> = ({
  activeTab,
  setActiveTab,
  analysis,
  selectedSampleId,
  onSelectSampleById,
  isAnalyzing,
  onReAnalyze,
  onNavigateHome
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const featureItems: { id: FeatureTabType; label: string; shortLabel: string; icon: React.ReactNode; badge?: string }[] = [
    { 
      id: 'all', 
      label: 'All Features Stream', 
      shortLabel: 'All Features', 
      icon: <Layers className="w-3.5 h-3.5" /> 
    },
    { 
      id: 'explainable', 
      label: 'Explainable AI Evidence', 
      shortLabel: 'Evidence Inspector', 
      icon: <Sparkles className="w-3.5 h-3.5 text-teal-400" />,
      badge: analysis?.highlightedFlags ? `${analysis.highlightedFlags.length} Flags` : undefined
    },
    { 
      id: 'multilayer', 
      label: '6-Perspective Matrix', 
      shortLabel: '6-Layer Matrix', 
      icon: <Brain className="w-3.5 h-3.5 text-purple-400" />,
      badge: '6 Layers'
    },
    { 
      id: 'dna_chain', 
      label: 'Attack DNA & Cognitive Chain', 
      shortLabel: 'DNA & Chain', 
      icon: <Flame className="w-3.5 h-3.5 text-rose-400" />,
      badge: analysis?.attackDNA ? `${analysis.attackDNA.length} Markers` : undefined
    },
    { 
      id: 'trust_impact', 
      label: 'Trust Graph & Breach Impact', 
      shortLabel: 'Trust & Impact', 
      icon: <Network className="w-3.5 h-3.5 text-cyan-400" />
    },
    { 
      id: 'remediation', 
      label: 'SOC Playbook & Actions', 
      shortLabel: 'Remediation', 
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
      badge: analysis?.recommendations ? `${analysis.recommendations.length} Steps` : undefined
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getThreatBadge = () => {
    if (!analysis) return null;
    const score = analysis.overallRiskScore;
    if (score >= 80) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold animate-pulse">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>{score}/100 CRITICAL</span>
        </div>
      );
    }
    if (score >= 50) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>{score}/100 HIGH RISK</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>{score}/100 BENIGN</span>
      </div>
    );
  };

  return (
    <div 
      id="features-navigation-bar" 
      className="sticky top-2 z-40 w-full transition-all duration-200"
    >
      <div className="bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl rounded-2xl p-2 sm:p-2.5 shadow-2xl shadow-black/80 space-y-2">
        
        {/* Top Control Strip */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap pb-1.5 border-b border-slate-800/80 px-1">
          
          {/* Left: Back button & Breadcrumb / Status */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title="Return to Hero Landing Page"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Landing</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-medium text-slate-300">
                Threat Intelligence Console
              </span>
            </div>
          </div>

          {/* Center / Right: Live Risk Badge & Quick Presets & Re-scan */}
          <div className="flex items-center gap-2 flex-wrap">
            {getThreatBadge()}

            {/* Quick Threat Scenario Selector */}
            <div className="relative flex items-center">
              <select
                id="feature-nav-scenario-select"
                value={selectedSampleId}
                onChange={(e) => onSelectSampleById(e.target.value)}
                className="bg-slate-950/90 border border-slate-700 rounded-xl pl-2.5 pr-7 py-1 text-xs text-slate-200 font-mono focus:outline-none focus:border-[#A068FF] cursor-pointer appearance-none shadow-sm"
                title="Switch Attack Scenario"
              >
                {SAMPLE_THREATS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name.split(' (')[0]} ({s.badge})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none" />
            </div>

            {/* Re-analyze Button */}
            <button
              onClick={onReAnalyze}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#A068FF] to-cyan-500 hover:from-[#8f4ff8] hover:to-cyan-400 text-white shadow-md transition-all cursor-pointer disabled:opacity-50 active:scale-95"
              title="Execute Real-Time Scan"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline">{isAnalyzing ? 'Scanning...' : 'Re-Scan'}</span>
            </button>
          </div>
        </div>

        {/* Feature Tabs & In-Page Section Anchors */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-0.5 no-scrollbar">
          {featureItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`feature-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'all') {
                    scrollToSection('cybersentinel-overview-card');
                  } else if (tab.id === 'explainable') {
                    scrollToSection('cybersentinel-explainable-panel');
                  } else if (tab.id === 'multilayer') {
                    scrollToSection('cybersentinel-multilayer-panel');
                  } else if (tab.id === 'dna_chain') {
                    scrollToSection('cybersentinel-attack-dna-panel');
                  } else if (tab.id === 'trust_impact') {
                    scrollToSection('cybersentinel-trust-graph-panel');
                  } else if (tab.id === 'remediation') {
                    scrollToSection('cybersentinel-action-center');
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#A068FF]/30 text-white border border-[#A068FF]/60 shadow-md shadow-[#A068FF]/10 ring-1 ring-[#A068FF]/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
                {tab.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full border ${
                    isActive ? 'bg-[#A068FF]/40 text-purple-200 border-[#A068FF]/50' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
