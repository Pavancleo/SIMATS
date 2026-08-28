import React from 'react';
import { X, Shield, ArrowDown, Brain, Dna, GitCommit, Network, Flame, Sparkles, CheckCircle2, Award, Terminal } from 'lucide-react';

interface JudgePitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JudgePitchModal: React.FC<JudgePitchModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const workflowSteps = [
    { num: 1, title: 'Input Collection', desc: 'Ingestion of suspicious emails, SMS, social media messages, URLs, or webpage text.' },
    { num: 2, title: 'Content Extraction', desc: 'Deep parsing of message body, URLs, sender envelopes, headers (SPF/DKIM/DMARC), attachments, and DOM anchors.' },
    { num: 3, title: 'Multi-Layer Analysis', desc: '6 multi-perspective analyses: NLP & language, social engineering triggers, URL & typosquatting, sender identity, behavioral anomalies, context consistency.' },
    { num: 4, title: 'AI Intelligence Engine', desc: 'Combines heuristic threat intelligence, cyber rule sets, and Gemini 3.7 Flash reasoning to evaluate deep intent and deceptive payloads.' },
    { num: 5, title: 'Risk Scoring (0–100)', desc: 'Calculates composite risk score plus separate Human Manipulation Risk and Technical Threat Vector dials.' },
    { num: 6, title: 'Attack DNA Profiling', desc: 'Identifies underlying attack techniques (Impersonation, Urgency Coercion, Fear Inducement, Credential Theft, Wire Fraud, Quishing) with MITRE ATT&CK mappings.' },
    { num: 7, title: 'Manipulation Chain', desc: 'Reconstructs the psychological sequence (e.g. Fear → Urgency → Authority → Action Lure → Credential Harvesting → Account Takeover).' },
    { num: 8, title: 'Trust Graph Analysis', desc: 'Cross-correlates claimed organization, sender domain, envelope headers, and destination endpoint to identify broken trust links.' },
    { num: 9, title: 'Projected Impact Simulation', desc: 'Simulates cascading consequences if the victim engages (fake SSO login, session token theft, corporate data loss, financial blast radius).' },
    { num: 10, title: 'Explainable AI + Recommendations', desc: 'Highlights red-flag evidence with interactive rationales and delivers prioritized immediate and SOC escalation playbooks.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              🛡️ CyberSentinel: 10-Stage Workflow & Judge Pitch
            </h2>
            <p className="text-xs text-blue-600 font-mono font-semibold">
              AI-Powered Phishing & Social Engineering Threat Intelligence
            </p>
          </div>
        </div>

        {/* Judge Pitch Highlight Box */}
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <Award className="w-4 h-4 text-blue-700" />
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              🎤 Super-Short Pitch for Judges
            </span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-sans italic">
            "CyberSentinel takes suspicious content as input, extracts its important components, and performs multi-layer analysis on the language, sender, URL, behavior, and context. An AI intelligence engine then combines these signals to calculate a risk score. Unlike traditional phishing detectors, we also identify the attacker's psychological manipulation techniques and reconstruct the manipulation chain. Finally, we predict the possible impact and provide an explainable security report with recommended actions."
          </p>
        </div>

        {/* 10-Step Workflow Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Complete 10-Stage Analysis Workflow:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {workflowSteps.map((s) => (
              <div key={s.num} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 border border-blue-300 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  {s.num}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 mb-0.5">{s.title}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Target Architecture: CyberSentinel Zero-Hour Threat Analysis</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Close Pitch Summary
          </button>
        </div>

      </div>
    </div>
  );
};
