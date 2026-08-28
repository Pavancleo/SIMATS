import React from 'react';
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
  Dna, 
  GitCommit, 
  Shield, 
  Radio, 
  Target, 
  AlertTriangle,
  ChevronDown,
  Terminal,
  Activity,
  Zap
} from 'lucide-react';
import { FullThreatAnalysisResult } from '../types';
import { SAMPLE_THREATS } from '../data/sampleThreats';

export type FeatureTabType = 
  | 'overview' 
  | 'ingest' 
  | 'explainable' 
  | 'matrix' 
  | 'dna' 
  | 'chain' 
  | 'trust' 
  | 'impact' 
  | 'remediation';

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
  const featureItems: { 
    id: FeatureTabType; 
    label: string; 
    shortLabel: string; 
    icon: React.ReactNode; 
    badge?: string;
  }[] = [
    { 
      id: 'ingest', 
      label: 'Scan Input / Ingestion', 
      shortLabel: 'Input', 
      icon: <Terminal className="w-3.5 h-3.5 text-blue-400" /> 
    },
    { 
      id: 'explainable', 
      label: 'Explainable AI Evidence', 
      shortLabel: 'Explainable AI', 
      icon: <Sparkles className="w-3.5 h-3.5 text-teal-400" />,
      badge: analysis?.highlightedFlags ? `${analysis.highlightedFlags.length}` : undefined
    },
    { 
      id: 'matrix', 
      label: '6-Perspective Matrix', 
      shortLabel: '6-Layer Matrix', 
      icon: <Brain className="w-3.5 h-3.5 text-purple-400" />,
      badge: '6 L'
    },
    { 
      id: 'dna', 
      label: 'Attack DNA & MITRE', 
      shortLabel: 'Attack DNA', 
      icon: <Dna className="w-3.5 h-3.5 text-rose-400" />,
      badge: analysis?.attackDNA ? `${analysis.attackDNA.length}` : undefined
    },
    { 
      id: 'chain', 
      label: 'Manipulation Chain', 
      shortLabel: 'Manipulation', 
      icon: <GitCommit className="w-3.5 h-3.5 text-amber-400" /> 
    },
    { 
      id: 'trust', 
      label: 'Trust Graph', 
      shortLabel: 'Trust Graph', 
      icon: <Network className="w-3.5 h-3.5 text-cyan-400" /> 
    },
    { 
      id: 'impact', 
      label: 'Breach Impact', 
      shortLabel: 'Impact Sim', 
      icon: <Flame className="w-3.5 h-3.5 text-orange-400" /> 
    },
    { 
      id: 'remediation', 
      label: 'SOC Playbook', 
      shortLabel: 'SOC Actions', 
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
      badge: analysis?.recommendations ? `${analysis.recommendations.length}` : undefined
    },
    { 
      id: 'overview', 
      label: 'Executive Verdict & Summary', 
      shortLabel: 'Verdict', 
      icon: <Shield className="w-3.5 h-3.5 text-[#A068FF]" /> 
    }
  ];

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
          
          {/* Left: Back to Landing button & Breadcrumb / Status */}
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

        {/* Feature Navigation Bar (Buttons wrap naturally to new lines - No Horizontal Scrolling) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-0.5">
          {featureItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`feature-page-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.location.hash = `scanner/${tab.id}`;
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#A068FF] text-white border border-[#c4b5fd]/60 shadow-lg shadow-[#A068FF]/20 ring-1 ring-[#A068FF]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800/80 bg-slate-950/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full border ${
                    isActive ? 'bg-white/20 text-white border-white/40 font-bold' : 'bg-slate-800 text-slate-400 border-slate-700'
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
