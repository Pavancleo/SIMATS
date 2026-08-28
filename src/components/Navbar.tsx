import React from 'react';
import { Shield, ShieldAlert, Zap, BookOpen, Terminal, Sparkles, AlertTriangle } from 'lucide-react';
import { SAMPLE_THREATS, SampleThreatItem } from '../data/sampleThreats';
import { ThreatInput } from '../types';

interface NavbarProps {
  onSelectSample: (sample: SampleThreatItem) => void;
  onOpenJudgePitch: () => void;
  onReset: () => void;
  isAnalyzing: boolean;
  currentScore?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectSample,
  onOpenJudgePitch,
  onReset,
  isAnalyzing,
  currentScore
}) => {
  return (
    <header id="cybersentinel-header" className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
            <Shield className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                CyberSentinel
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider font-semibold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                AI SOC v3.7
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">
              Multi-Layer Phishing & Social Engineering Threat Engine
            </p>
          </div>
        </div>

        {/* Action Controls & Presets */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sample Threats Dropdown */}
          <div className="relative group">
            <button
              id="btn-sample-threats"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 transition-colors shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Sample Attack Scenarios</span>
              <span className="md:hidden">Presets</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1 rounded">▼</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-1 w-80 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-semibold text-slate-400 px-2.5 py-1 uppercase tracking-wider">
                Load Realistic Threat Scenarios
              </div>
              <div className="space-y-1 mt-1">
                {SAMPLE_THREATS.map((sample) => (
                  <button
                    key={sample.id}
                    id={`sample-item-${sample.id}`}
                    onClick={() => onSelectSample(sample)}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/90 transition-all flex items-start gap-2.5 group/item"
                  >
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      sample.threatLevelExpected === 'Critical' ? 'bg-rose-500 shadow-rose-500/50 shadow-sm' :
                      sample.threatLevelExpected === 'High' ? 'bg-amber-500 shadow-amber-500/50 shadow-sm' :
                      sample.threatLevelExpected === 'Suspicious' ? 'bg-yellow-500' : 'bg-emerald-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-200 group-hover/item:text-cyan-300 truncate">
                        {sample.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {sample.category} • {sample.badge}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Workflow & Pitch Explanation for Judges Button */}
          <button
            id="btn-judge-workflow"
            onClick={onOpenJudgePitch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-teal-500/20 to-emerald-500/20 hover:from-teal-500/30 hover:to-emerald-500/30 text-teal-300 border border-teal-500/40 transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">10-Stage Workflow & Pitch</span>
            <span className="sm:hidden">Workflow</span>
          </button>

          {/* Live Scanner Indicator */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Engine Active</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
