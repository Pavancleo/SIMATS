import React, { useState } from 'react';
import { ShieldCheck, ShieldX, Ban, AlertOctagon, Search, Copy, Check, FileText, CheckCircle2 } from 'lucide-react';
import { SecurityRecommendation, FullThreatAnalysisResult } from '../types';

interface RecommendationsActionCenterProps {
  recommendations: SecurityRecommendation[];
  analysis: FullThreatAnalysisResult;
}

export const RecommendationsActionCenter: React.FC<RecommendationsActionCenterProps> = ({
  recommendations,
  analysis
}) => {
  const [copiedReport, setCopiedReport] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'Immediate':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'Secondary':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
  };

  const generateMarkdownReport = () => {
    return `# 🛡️ CYBERSENTINEL INCIDENT ADVISORY & THREAT REPORT
Generated at: ${new Date(analysis.timestamp).toUTCString()}
Scan Reference: ${analysis.scanId}
Threat Classification: ${analysis.threatLevel.toUpperCase()} (${analysis.categoryName})
Composite Risk Score: ${analysis.overallRiskScore} / 100
- Human Manipulation Risk: ${analysis.humanManipulationRiskScore} / 100
- Technical Threat Index: ${analysis.technicalThreatRiskScore} / 100

## 1. Executive Verdict
${analysis.executiveVerdict}

## 2. Multi-Layer Threat Highlights
- Tone / Sentiment: ${analysis.nlpLayer.tone} | ${analysis.nlpLayer.sentiment}
- Primary Social Engineering Tactic: ${analysis.socialEngineeringLayer.primaryTactic}
- Sender Identity Spoofed: ${analysis.senderIdentityLayer.isSpoofed ? 'YES' : 'NO'} (${analysis.senderIdentityLayer.claimedIdentity} vs ${analysis.senderIdentityLayer.actualSender})
- Authentication Headers: SPF=${analysis.senderIdentityLayer.authHealth.spf}, DKIM=${analysis.senderIdentityLayer.authHealth.dkim}, DMARC=${analysis.senderIdentityLayer.authHealth.dmarc}

## 3. Attack DNA Markers
${analysis.attackDNA.map(d => `- [${d.severity.toUpperCase()}] ${d.name} (${d.mitreRef || 'N/A'}): ${d.description} | Evidence: "${d.evidence}"`).join('\n')}

## 4. Projected Impact Simulation
- Severity: ${analysis.projectedImpact.severityLevel}
- Potential Exposure: ${analysis.projectedImpact.financialExposureEstimate}
- Blast Radius: ${analysis.projectedImpact.blastRadius}

## 5. Required Remediation Actions
${analysis.recommendations.map(r => `[${r.priority}] ${r.action}: ${r.detail}`).join('\n')}
`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(analysis, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="container">
      <div id="cybersentinel-recommendations-panel" className="card p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="innerText text-sm font-semibold uppercase tracking-wide">
                Actionable Security Recommendations & SOC Remediation
              </h3>
              <p className="desc text-xs">
                Immediate containment steps, user guidance, and incident advisory escalation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-copy-markdown-report"
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/60 transition-colors"
            >
              {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{copiedReport ? 'Copied Markdown' : 'Copy SOC Markdown'}</span>
            </button>

            <button
              id="btn-copy-json-report"
              onClick={handleCopyJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJson ? 'Copied JSON' : 'Export JSON'}</span>
            </button>
          </div>
        </div>

        {/* Recommendations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 relative z-10">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="container">
              <div
                id={`rec-card-${idx}`}
                className="card p-4 flex items-start gap-3 hover:border-slate-500 transition-all"
              >
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getPriorityBadge(rec.priority)}`}>
                      {rec.priority}
                    </span>
                    <span className="innerText text-xs font-bold">
                      {rec.action}
                    </span>
                  </div>
                  <p className="desc text-xs leading-relaxed">
                    {rec.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
