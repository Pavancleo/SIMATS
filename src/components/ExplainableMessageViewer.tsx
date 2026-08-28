import React, { useState } from 'react';
import { Eye, AlertCircle, Info, Sparkles, Tag, ShieldAlert } from 'lucide-react';
import { HighlightFlag } from '../types';

interface ExplainableMessageViewerProps {
  content: string;
  flags: HighlightFlag[];
  whyDangerous: string[];
}

export const ExplainableMessageViewer: React.FC<ExplainableMessageViewerProps> = ({
  content,
  flags,
  whyDangerous
}) => {
  const [selectedFlag, setSelectedFlag] = useState<HighlightFlag | null>(null);

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'urgency':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'fear':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'authority':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'credential_lure':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'link_deception':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
    }
  };

  return (
    <div className="container">
      <div id="cybersentinel-explainable-panel" className="card p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="innerText text-sm font-semibold uppercase tracking-wide">
                10. Explainable AI Rationale & Message Evidence Inspector
              </h3>
              <p className="desc text-xs">
                Interactive explainability: Click flagged phrases to reveal exact threat reasoning and behavioral classification
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/40">
            {flags.length} Red-Flag Markers Identified
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
          
          {/* Left / Top: Interactive Flagged Text View */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Payload Content Inspector:</span>
              <span className="text-[10px] text-slate-500 font-normal">Click any flagged card below to inspect</span>
            </div>

            {/* Raw Text Box */}
            <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
              {content}
            </div>

            {/* Highlighted Evidence Cards */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Flagged Evidence Excerpts:
              </div>
              <div className="space-y-2">
                {flags.map((flag, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedFlag(flag)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedFlag?.text === flag.text
                        ? 'bg-slate-800/90 border-cyan-500/60 ring-1 ring-cyan-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded border ${getCategoryBadgeColor(flag.category)}`}>
                        {flag.category.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        Severity: {flag.severity}
                      </span>
                    </div>

                    <div className="font-mono text-xs text-cyan-300 font-semibold mb-1">
                      "{flag.text}"
                    </div>

                    <p className="text-xs text-slate-300">
                      {flag.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right / Bottom: Why Dangerous Deep-Dive Rationale */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Why CyberSentinel Flagged This Communication
                </span>
              </div>

              <ul className="space-y-2.5">
                {whyDangerous.map((reason, idx) => (
                  <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Selected Flag Deep Rationale Popup if clicked */}
            {selectedFlag && (
              <div className="p-4 bg-cyan-950/30 rounded-xl border border-cyan-500/30 space-y-2 animate-in fade-in duration-150">
                <div className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Active Focus Signal
                </div>
                <div className="text-xs font-mono text-white font-bold">
                  "{selectedFlag.text}"
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedFlag.explanation}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
