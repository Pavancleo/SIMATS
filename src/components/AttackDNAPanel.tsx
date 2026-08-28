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
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="container">
      <div id="cybersentinel-attack-dna-panel" className="card p-5 sm:p-6 shadow-sm border border-slate-200 bg-white relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200">
              <Dna className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                6. Attack DNA Breakdown
              </h3>
              <p className="text-xs text-slate-600">
                Granular identification of adversarial techniques, psychological triggers, and exploit mechanics
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
            {techniques.length} Genetic Markers
          </span>
        </div>

        {/* Techniques Grid */}
        {techniques.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 relative z-10">
            {techniques.map((tech) => (
              <div key={tech.id} className="container">
                <div
                  id={`dna-card-${tech.id}`}
                  className="card p-4 flex flex-col justify-between hover:border-slate-300 transition-all group bg-white border border-slate-200 shadow-2xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getSeverityBadge(tech.severity)}`}>
                        {tech.severity}
                      </span>
                      {tech.mitreRef && (
                        <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 font-semibold">
                          {tech.mitreRef}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 mb-1.5">
                      {tech.name}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {tech.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Fingerprint className="w-3 h-3 text-slate-500" />
                      Evidence in Content:
                    </div>
                    <div className="text-xs font-mono text-slate-800 bg-slate-50 p-2 rounded border border-slate-200 break-words">
                      "{tech.evidence}"
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-emerald-50 rounded-xl text-center text-xs text-emerald-800 border border-emerald-200 relative z-10 font-medium">
            No malicious Attack DNA signatures detected. Communication conforms to legitimate behavioral standards.
          </div>
        )}

      </div>
    </div>
  );
};
