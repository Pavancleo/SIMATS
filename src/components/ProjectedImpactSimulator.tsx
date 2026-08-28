import React from 'react';
import { Flame, DollarSign, Database, Target, ArrowRight, ShieldX, Skull, AlertTriangle, Layers } from 'lucide-react';
import { ProjectedImpact } from '../types';

interface ProjectedImpactSimulatorProps {
  impact: ProjectedImpact;
}

export const ProjectedImpactSimulator: React.FC<ProjectedImpactSimulatorProps> = ({ impact }) => {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'Catastrophic':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/40';
      case 'Severe':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/40';
      case 'Moderate':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/40';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
    }
  };

  return (
    <div className="container">
      <div id="cybersentinel-projected-impact-panel" className="card p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="innerText text-sm font-semibold uppercase tracking-wide">
                9. Projected Attack Impact & Breach Simulation
              </h3>
              <p className="desc text-xs">
                Simulates downstream cascading consequences, blast radius, and potential financial liability if victim engages
              </p>
            </div>
          </div>
          <span className={`text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${getSeverityBadge(impact.severityLevel)}`}>
            Severity: {impact.severityLevel}
          </span>
        </div>

        {/* Metrics Row (Financial Exposure, Blast Radius, Data Compromise) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5 relative z-10">
          
          {/* Financial Exposure */}
          <div className="container">
            <div className="card p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Estimated Financial Exposure
                </span>
                <span className="innerText text-xs font-mono font-bold block mt-0.5">
                  {impact.financialExposureEstimate}
                </span>
              </div>
            </div>
          </div>

          {/* Blast Radius */}
          <div className="container">
            <div className="card p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Breach Blast Radius
                </span>
                <span className="innerText text-xs font-medium block mt-0.5">
                  {impact.blastRadius}
                </span>
              </div>
            </div>
          </div>

          {/* Data Compromise Types */}
          <div className="container">
            <div className="card p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Exposed Data Assets
                </span>
                <div className="flex flex-wrap gap-1">
                  {impact.dataCompromiseTypes.length > 0 ? (
                    impact.dataCompromiseTypes.map((d, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-purple-300 border border-slate-800">
                        {d}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">None anticipated</span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sequential Breach Timeline Stages */}
        {impact.timeline.length > 0 ? (
          <div className="space-y-3 relative z-10">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Sequential Breach Propagation Timeline (If Victim Falls for Attack):
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {impact.timeline.map((step) => (
                <div key={step.stage} className="container">
                  <div
                    id={`impact-stage-${step.stage}`}
                    className="card p-3.5 flex flex-col justify-between space-y-2 hover:border-slate-500 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          Stage {step.stage}
                        </span>
                        <span className={`text-[10px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded ${
                          step.riskLevel === 'critical' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {step.riskLevel}
                        </span>
                      </div>

                      <div className="innerText text-xs font-bold mb-1">
                        {step.action}
                      </div>

                      <div className="text-[11px] text-slate-400 leading-tight mb-2">
                        <span className="text-slate-400 font-semibold block text-[9px] uppercase">Technical Execution:</span>
                        <p className="desc text-[11px]">{step.systemResponse}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-rose-400 font-semibold block text-[9px] uppercase">Adversary Foothold:</span>
                      <p className="text-[11px] text-rose-300 font-mono leading-tight">
                        {step.attackerOutcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-950/40 rounded-xl text-center text-xs text-emerald-400 border border-emerald-500/20 relative z-10">
            No negative operational or security impact projected for legitimate traffic.
          </div>
        )}

      </div>
    </div>
  );
};
