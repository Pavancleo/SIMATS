import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Activity, Download, Share2, Copy, Check, FileCheck2, Cpu, Brain, Flame, Target } from 'lucide-react';
import { FullThreatAnalysisResult } from '../types';

interface AnalysisOverviewProps {
  analysis: FullThreatAnalysisResult;
  onExportReport: () => void;
}

export const AnalysisOverview: React.FC<AnalysisOverviewProps> = ({
  analysis,
  onExportReport
}) => {
  const [copiedScanId, setCopiedScanId] = React.useState(false);

  const getThreatColor = (score: number) => {
    if (score >= 80) return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (score >= 60) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (score >= 35) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  };

  const getGaugeStrokeColor = (score: number) => {
    if (score >= 80) return '#f43f5e'; // rose-500
    if (score >= 60) return '#f59e0b'; // amber-500
    if (score >= 35) return '#eab308'; // yellow-500
    return '#10b981'; // emerald-500
  };

  const handleCopyScanId = () => {
    navigator.clipboard.writeText(analysis.scanId);
    setCopiedScanId(true);
    setTimeout(() => setCopiedScanId(false), 2000);
  };

  // SVG Gauge calculations
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (analysis.overallRiskScore / 100) * circumference;

  return (
    <div id="cybersentinel-overview-card" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      
      {/* Top Bar with Scan ID, Timestamp & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Scan ID:</span>
            <button
              id="btn-copy-scan-id"
              onClick={handleCopyScanId}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-xs font-mono text-cyan-400 hover:bg-slate-700 transition-colors"
            >
              <span>{analysis.scanId}</span>
              {copiedScanId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
            </button>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">•</span>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            {new Date(analysis.timestamp).toLocaleTimeString()} UTC
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">AI Confidence:</span>
          <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {analysis.confidenceScore}% High Certainty
          </span>
          <button
            id="btn-export-incident-report"
            onClick={onExportReport}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span>Advisory Report</span>
          </button>
        </div>
      </div>

      {/* Main Score Dials & Threat Verdict Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 items-stretch">
        
        {/* Left: Overall Threat Gauge */}
        <div className="flex flex-col items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Composite Threat Index
          </div>
          <div className="relative flex items-center justify-center w-32 h-32 my-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke={getGaugeStrokeColor(analysis.overallRiskScore)}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold font-mono tracking-tight text-white">
                {analysis.overallRiskScore}
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
                / 100 Risk
              </span>
            </div>
          </div>

          <div className="mt-2 w-full">
            <div className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border w-full ${getThreatColor(analysis.overallRiskScore)}`}>
              {analysis.overallRiskScore >= 60 ? (
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              )}
              <span>{analysis.threatLevel}</span>
            </div>
          </div>
        </div>

        {/* Middle: Dual Breakdown Dials (Human Manipulation vs Technical Threat) */}
        <div className="flex flex-col justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-3">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Risk Vectors Breakdown
          </div>

          {/* Human Manipulation Score */}
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Brain className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">Human Manipulation</div>
                  <div className="text-[10px] text-slate-400">Psychological coercion</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-purple-400">
                {analysis.humanManipulationRiskScore}%
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full transition-all duration-700"
                style={{ width: `${analysis.humanManipulationRiskScore}%` }}
              />
            </div>
          </div>

          {/* Technical Threat Risk Score */}
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">Technical Vector</div>
                  <div className="text-[10px] text-slate-400">URL & auth headers</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {analysis.technicalThreatRiskScore}%
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${analysis.technicalThreatRiskScore}%` }}
              />
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 text-center">
            Evaluated against 40+ heuristic algorithms
          </div>
        </div>

        {/* Right: Executive Verdict & MITRE Mappings */}
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-rose-400" />
                Executive AI Verdict
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {analysis.categoryName}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-4">
              {analysis.executiveVerdict}
            </p>
          </div>

          {analysis.mitreAttackMappings && analysis.mitreAttackMappings.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-slate-800">
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                MITRE ATT&CK Matrix Alignment:
              </div>
              <div className="flex flex-wrap gap-1">
                {analysis.mitreAttackMappings.map((m, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
