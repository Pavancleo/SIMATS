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
    if (score >= 80) return 'text-rose-700 bg-rose-50 border-rose-200';
    if (score >= 65) return 'text-orange-700 bg-orange-50 border-orange-200';
    if (score >= 45) return 'text-yellow-800 bg-yellow-50 border-yellow-200';
    if (score >= 25) return 'text-slate-700 bg-slate-100 border-slate-200';
    if (score >= 12) return 'text-blue-700 bg-blue-50 border-blue-200';
    return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  };

  const getGaugeStrokeColor = (score: number) => {
    if (score >= 80) return '#e11d48'; // rose-600
    if (score >= 65) return '#ea580c'; // orange-600
    if (score >= 45) return '#ca8a04'; // yellow-600
    if (score >= 25) return '#64748b'; // slate-500
    if (score >= 12) return '#2563eb'; // blue-600
    return '#16a34a'; // emerald-600
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
    <div className="container">
      <div id="cybersentinel-overview-card" className="card p-5 sm:p-6 shadow-sm border border-slate-200 bg-white relative overflow-hidden">
        
        {/* Top Bar with Scan ID, Timestamp & Export */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-black font-bold">Scan ID:</span>
              <button
                id="btn-copy-scan-id"
                onClick={handleCopyScanId}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 text-xs font-mono text-black hover:bg-slate-200 transition-colors cursor-pointer border border-slate-300 font-bold"
              >
                <span>{analysis.scanId}</span>
                {copiedScanId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-black" />}
              </button>
            </div>
            <span className="text-xs text-black font-bold hidden sm:inline">•</span>
            <span className="text-xs text-black font-mono font-bold hidden sm:inline">
              {new Date(analysis.timestamp).toLocaleTimeString()} UTC
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-black font-bold">AI Confidence:</span>
            <span className="px-2 py-0.5 text-xs font-mono font-black rounded bg-blue-50 text-blue-900 border border-blue-200">
              {analysis.confidenceScore}% High Certainty
            </span>
            <button
              id="btn-export-incident-report"
              onClick={onExportReport}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white hover:bg-slate-50 text-black border border-slate-300 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Advisory Report</span>
            </button>
          </div>
        </div>

        {/* Main Score Dials & Threat Verdict Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 items-stretch relative z-10">
          
          {/* Left: Overall Threat Gauge */}
          <div className="container">
            <div className="card flex flex-col items-center justify-between p-4 text-center bg-white border border-slate-300 shadow-xs">
              <div className="text-[12px] font-black uppercase tracking-wider text-black mb-2">
                Composite Threat Index
              </div>
              <div className="relative flex items-center justify-center w-32 h-32 my-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="text-slate-100"
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
                  <span className="text-3xl font-black font-mono tracking-tight text-black">
                    {analysis.overallRiskScore}
                  </span>
                  <span className="text-[10px] font-mono text-black tracking-wider uppercase font-bold">
                    / 100 Risk
                  </span>
                </div>
              </div>

              <div className="mt-2 w-full">
                <div className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border w-full ${getThreatColor(analysis.overallRiskScore)}`}>
                  {analysis.overallRiskScore >= 45 ? (
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{analysis.threatLevel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Dual Breakdown Dials (Human Manipulation vs Technical Threat) */}
          <div className="container">
            <div className="card flex flex-col justify-between p-4 space-y-3 bg-white border border-slate-300 shadow-xs">
              <div className="text-[12px] font-black uppercase tracking-wider text-black">
                Risk Vectors Breakdown
              </div>

              {/* Human Manipulation Score */}
              <div className="p-3 bg-slate-50/90 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                      <Brain className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-black">Human Manipulation</div>
                      <div className="text-[10px] text-black font-medium">Psychological coercion</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-indigo-700">
                    {analysis.humanManipulationRiskScore}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                    style={{ width: `${analysis.humanManipulationRiskScore}%` }}
                  />
                </div>
              </div>

              {/* Technical Threat Risk Score */}
              <div className="p-3 bg-slate-50/90 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-black">Technical Vector</div>
                      <div className="text-[10px] text-black font-medium">URL & auth headers</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-blue-700">
                    {analysis.technicalThreatRiskScore}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-700"
                    style={{ width: `${analysis.technicalThreatRiskScore}%` }}
                  />
                </div>
              </div>

              <div className="text-[10px] font-mono text-black font-bold text-center">
                Evaluated against 40+ heuristic algorithms
              </div>
            </div>
          </div>

          {/* Right: Executive Verdict & MITRE Mappings */}
          <div className="container">
            <div className="card p-4 flex flex-col justify-between bg-white border border-slate-300 shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-rose-600" />
                    Executive AI Verdict
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-black border border-slate-300 font-bold">
                    {analysis.categoryName}
                  </span>
                </div>
                <p className="text-xs text-black font-medium leading-relaxed font-sans line-clamp-4">
                  {analysis.executiveVerdict}
                </p>
              </div>

              {analysis.mitreAttackMappings && analysis.mitreAttackMappings.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-200">
                  <div className="text-[10px] font-black text-black uppercase tracking-wider mb-1.5">
                    MITRE ATT&CK Matrix Alignment:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {analysis.mitreAttackMappings.map((m, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-black border border-slate-300"
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

      </div>
    </div>
  );
};
