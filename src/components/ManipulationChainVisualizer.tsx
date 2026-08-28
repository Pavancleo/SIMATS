import React from 'react';
import { GitCommit, ArrowRight, ShieldAlert, Clock, Award, ExternalLink, Key, AlertTriangle, Skull, UserCheck, DollarSign } from 'lucide-react';
import { ManipulationStep } from '../types';

interface ManipulationChainVisualizerProps {
  steps: ManipulationStep[];
}

export const ManipulationChainVisualizer: React.FC<ManipulationChainVisualizerProps> = ({ steps }) => {
  const getStepIcon = (iconName: string, stepNumber: number) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'Clock':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'Award':
        return <Award className="w-4 h-4 text-purple-400" />;
      case 'ExternalLink':
        return <ExternalLink className="w-4 h-4 text-cyan-400" />;
      case 'Key':
        return <Key className="w-4 h-4 text-rose-400" />;
      case 'DollarSign':
        return <DollarSign className="w-4 h-4 text-emerald-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="container">
      <div id="cybersentinel-manipulation-chain" className="card p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <GitCommit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="innerText text-sm font-semibold uppercase tracking-wide">
                7. Psychological Manipulation Chain Reconstruction
              </h3>
              <p className="desc text-xs">
                Step-by-step cognitive deconstruction: How the attacker exploits human emotional and behavioral reflexes
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Cognitive Exploitation Sequence
          </span>
        </div>

        {/* Interactive Timeline Progression */}
        {steps.length > 0 ? (
          <div className="space-y-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 relative">
              {steps.map((step) => (
                <div key={step.stepNumber} className="container">
                  <div
                    id={`manipulation-step-${step.stepNumber}`}
                    className="card p-3.5 flex flex-col justify-between hover:border-purple-500/40 transition-all group"
                  >
                    {/* Step Index Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center text-xs font-mono font-bold border border-slate-700">
                          {step.stepNumber}
                        </div>
                        <div className="p-1 rounded bg-slate-900 border border-slate-800">
                          {getStepIcon(step.iconName, step.stepNumber)}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">
                        Phase {step.stepNumber}
                      </span>
                    </div>

                    {/* Phase Title & Trigger */}
                    <div className="space-y-1.5 mb-3">
                      <div className="innerText text-xs font-bold transition-colors">
                        {step.phase}
                      </div>
                      <div className="text-[11px] font-mono text-cyan-300 bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
                        Trigger: "{step.trigger}"
                      </div>
                    </div>

                    {/* Psychological Mechanism & Victim Reaction */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80 text-[11px]">
                      <div>
                        <span className="text-slate-400 uppercase tracking-wider text-[9px] block font-semibold">Attacker Hook</span>
                        <p className="desc text-xs leading-tight">{step.psychologicalMechanism}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 uppercase tracking-wider text-[9px] block font-semibold">Target Victim Reaction</span>
                        <p className="text-amber-300/90 leading-tight italic text-xs">"{step.victimReaction}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sequential Flow Banner */}
            <div className="p-3 bg-gradient-to-r from-purple-950/30 via-slate-900 to-rose-950/30 rounded-xl border border-purple-900/30 flex items-center justify-between gap-2 overflow-x-auto text-xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold shrink-0">Chain Sequence:</span>
              <div className="flex items-center gap-1.5 font-mono text-xs text-slate-300 shrink-0">
                {steps.map((s, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-purple-300">
                      {s.phase}
                    </span>
                    {idx < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-950/40 rounded-xl text-center text-xs text-emerald-400 border border-emerald-500/20 relative z-10">
            No psychological manipulation sequence detected in this communication.
          </div>
        )}

      </div>
    </div>
  );
};
