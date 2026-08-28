import React from 'react';
import { Dna, ShieldAlert, AlertTriangle, Fingerprint, Lock, Zap, FileText } from 'lucide-react';
import { AttackDNATechnique } from '../types';

interface AttackDNAPanelProps {
  techniques: AttackDNATechnique[];
}

export const AttackDNAPanel: React.FC<AttackDNAPanelProps> = ({ techniques }) => {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div id="cybersentinel-attack-dna-panel" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Dna className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              6. Attack DNA Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              Granular identification of adversarial techniques, psychological triggers, and exploit mechanics
            </p>
          </div>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
          {techniques.length} Genetic Markers
        </span>
      </div>

      {/* Techniques Grid */}
      {techniques.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {techniques.map((tech) => (
            <div
              key={tech.id}
              id={`dna-card-${tech.id}`}
              className="p-4 bg-slate-950/70 border border-slate-800/90 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getSeverityBadge(tech.severity)}`}>
                    {tech.severity}
                  </span>
                  {tech.mitreRef && (
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/40">
                      {tech.mitreRef}
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors mb-1.5">
                  {tech.name}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {tech.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Fingerprint className="w-3 h-3 text-slate-400" />
                  Evidence in Content:
                </div>
                <div className="text-xs font-mono text-slate-300 bg-slate-900/90 p-2 rounded border border-slate-800 break-words">
                  "{tech.evidence}"
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 bg-slate-950/40 rounded-xl text-center text-xs text-emerald-400 border border-emerald-500/20">
          No malicious Attack DNA signatures detected. Communication conforms to legitimate behavioral standards.
        </div>
      )}

    </div>
  );
};
