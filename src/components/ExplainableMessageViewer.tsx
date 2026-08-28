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
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'fear':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'authority':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'credential_lure':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'link_deception':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="container">
      <div id="cybersentinel-explainable-panel" className="card p-5 sm:p-6 shadow-sm border border-slate-200 bg-white relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wide text-black">
                10. Explainable AI Rationale & Message Evidence Inspector
              </h3>
              <p className="text-xs text-black font-medium">
                Interactive explainability: Click flagged phrases to reveal exact threat reasoning and behavioral classification
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-black bg-blue-50 px-2.5 py-1 rounded border border-blue-200 font-bold">
            {flags.length} Red-Flag Markers Identified
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
          
          {/* Left / Top: Interactive Flagged Text View */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-[11px] font-bold text-black uppercase tracking-wider flex items-center justify-between">
              <span>Payload Content Inspector:</span>
              <span className="text-[10px] text-black font-semibold">Click any flagged card below to inspect</span>
            </div>

            {/* Raw Text Box */}
            <div className="p-4 bg-slate-50/90 rounded-xl border border-slate-300 font-mono text-xs text-black font-semibold whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
              {content}
            </div>

            {/* Highlighted Evidence Cards */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-black uppercase tracking-wider">
                Flagged Evidence Excerpts:
              </div>
              <div className="space-y-2">
                {flags.map((flag, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedFlag(flag)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedFlag?.text === flag.text
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-400 shadow-sm'
                        : 'bg-white border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getCategoryBadgeColor(flag.category)}`}>
                        {flag.category.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-black uppercase font-bold">
                        Severity: {flag.severity}
                      </span>
                    </div>

                    <div className="font-mono text-xs text-blue-800 font-black mb-1">
                      "{flag.text}"
                    </div>

                    <p className="text-xs text-black font-medium leading-relaxed">
                      {flag.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right / Bottom: Why Dangerous Deep-Dive Rationale */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-slate-50/90 rounded-xl border border-slate-300 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-black text-black uppercase tracking-wider">
                  Why CyberSentinel Flagged This Communication
                </span>
              </div>

              <ul className="space-y-2.5">
                {whyDangerous.map((reason, idx) => (
                  <li key={idx} className="text-xs text-black font-medium leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Selected Flag Detail Box */}
            {selectedFlag && (
              <div className="p-4 bg-blue-50/90 rounded-xl border border-blue-300 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-blue-900 uppercase">
                    Deep Inspector Token:
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-950 font-mono">
                    {selectedFlag.category}
                  </span>
                </div>
                <div className="text-xs font-mono font-black text-blue-900">
                  "{selectedFlag.text}"
                </div>
                <p className="text-xs text-black font-medium leading-relaxed">
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
