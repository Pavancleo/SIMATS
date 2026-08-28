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
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-mono font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>{score}/100 CRITICAL</span>
        </div>
      );
    }
    if (score >= 65) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-mono font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-orange-600" />
          <span>{score}/100 HIGH</span>
        </div>
      );
    }
    if (score >= 45) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-800 border border-yellow-200 text-xs font-mono font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-yellow-600" />
          <span>{score}/100 SUSPICIOUS</span>
        </div>
      );
    }
    if (score >= 25) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-600" />
          <span>{score}/100 MODERATE</span>
        </div>
      );
    }
    if (score >= 12) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>{score}/100 LOW RISK</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>{score}/100 BENIGN</span>
      </div>
    );
  };

  return (
    <div 
      id="features-navigation-bar" 
      className="sticky top-2 z-40 w-full transition-all duration-200"
    >
      <div className="bg-white/95 border border-slate-200 backdrop-blur-xl rounded-2xl p-2 sm:p-2.5 shadow-md shadow-slate-200/50 space-y-2">
        
        {/* Top Control Strip */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap pb-1.5 border-b border-slate-200/80 px-1">
          
          {/* Left: Back to Landing button & Breadcrumb / Status */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
              title="Return to Hero Landing Page"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
              <span>Landing</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono font-semibold text-slate-700">
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
                className="bg-white border border-slate-200 rounded-xl pl-2.5 pr-7 py-1 text-xs text-slate-800 font-mono font-medium focus:outline-none focus:border-blue-500 cursor-pointer appearance-none shadow-xs"
                title="Switch Attack Scenario"
              >
                {SAMPLE_THREATS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name.split(' (')[0]} ({s.badge})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 pointer-events-none" />
            </div>

            {/* Re-analyze Button */}
            <button
              onClick={onReAnalyze}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer disabled:opacity-50 active:scale-95"
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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white border border-blue-600 shadow-md font-black'
                    : 'text-black hover:text-blue-700 hover:bg-slate-100 border border-slate-300 bg-white font-bold'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full border ${
                    isActive ? 'bg-white/25 text-white border-white/50 font-black' : 'bg-slate-100 text-black border-slate-300 font-bold'
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
