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
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Severe':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Moderate':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="container">
      <div id="cybersentinel-projected-impact-panel" className="card p-5 sm:p-6 shadow-sm border border-slate-200 bg-white relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                9. Projected Attack Impact & Breach Simulation
              </h3>
              <p className="text-xs text-slate-600">
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
            <div className="card p-3.5 flex items-start gap-3 bg-white border border-slate-200 shadow-2xs">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Estimated Financial Exposure
                </span>
                <span className="text-xs font-mono font-bold block mt-0.5 text-slate-900">
                  {impact.financialExposureEstimate}
                </span>
              </div>
            </div>
          </div>

          {/* Blast Radius */}
          <div className="container">
            <div className="card p-3.5 flex items-start gap-3 bg-white border border-slate-200 shadow-2xs">
              <div className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Breach Blast Radius
                </span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5">
                  {impact.blastRadius}
                </span>
              </div>
            </div>
          </div>

          {/* Data Compromise Types */}
          <div className="container">
            <div className="card p-3.5 flex items-start gap-3 bg-white border border-slate-200 shadow-2xs">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Exposed Data Assets
                </span>
                <div className="flex flex-wrap gap-1">
                  {impact.dataCompromiseTypes.length > 0 ? (
                    impact.dataCompromiseTypes.map((d, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-indigo-700 border border-slate-200 font-medium">
                        {d}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">None anticipated</span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sequential Breach Timeline Stages */}
        {impact.timeline.length > 0 ? (
          <div className="space-y-3 relative z-10">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Sequential Breach Propagation Timeline (If Victim Falls for Attack):
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {impact.timeline.map((step) => (
                <div key={step.stage} className="container">
                  <div
                    id={`impact-stage-${step.stage}`}
                    className="card p-3.5 flex flex-col justify-between space-y-2 hover:border-slate-300 transition-all bg-white border border-slate-200 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                          Stage {step.stage}
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                          step.riskLevel === 'critical' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {step.riskLevel}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-slate-900 mb-1">
                        {step.action}
                      </div>

                      <div className="text-[11px] text-slate-600 leading-tight mb-2">
                        <span className="text-slate-500 font-bold block text-[9px] uppercase">Technical Execution:</span>
                        <p className="text-[11px] text-slate-600">{step.systemResponse}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-rose-600 font-bold block text-[9px] uppercase">Adversary Foothold:</span>
                      <p className="text-[11px] text-rose-700 font-mono leading-tight">
                        {step.attackerOutcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 rounded-xl text-center text-xs text-emerald-800 border border-emerald-200 relative z-10 font-medium">
            No negative operational or security impact projected for legitimate traffic.
          </div>
        )}

      </div>
    </div>
  );
};
