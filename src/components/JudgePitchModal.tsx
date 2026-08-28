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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 text-white shadow-lg shadow-emerald-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              🛡️ CyberSentinel: 10-Stage Workflow & Judge Pitch
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              AI-Powered Phishing & Social Engineering Threat Intelligence
            </p>
          </div>
        </div>

        {/* Judge Pitch Highlight Box */}
        <div className="p-4 bg-gradient-to-r from-emerald-950/40 via-slate-950 to-cyan-950/40 rounded-xl border border-emerald-500/30 mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              🎤 Super-Short Pitch for Judges
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans italic">
            "CyberSentinel takes suspicious content as input, extracts its important components, and performs multi-layer analysis on the language, sender, URL, behavior, and context. An AI intelligence engine then combines these signals to calculate a risk score. Unlike traditional phishing detectors, we also identify the attacker's psychological manipulation techniques and reconstruct the manipulation chain. Finally, we predict the possible impact and provide an explainable security report with recommended actions."
          </p>
        </div>

        {/* 10-Step Workflow Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Complete 10-Stage Analysis Workflow:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {workflowSteps.map((s) => (
              <div key={s.num} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/60 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  {s.num}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200 mb-0.5">{s.title}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Close CTA */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20"
          >
            Close & Return to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
