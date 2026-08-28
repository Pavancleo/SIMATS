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
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case 'Clock':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'Award':
        return <Award className="w-4 h-4 text-indigo-600" />;
      case 'ExternalLink':
        return <ExternalLink className="w-4 h-4 text-blue-600" />;
      case 'Key':
        return <Key className="w-4 h-4 text-rose-600" />;
      case 'DollarSign':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="container">
      <div id="cybersentinel-manipulation-chain" className="card p-5 sm:p-6 shadow-sm border border-slate-200 bg-white relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-slate-200 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              <GitCommit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                7. Psychological Manipulation Chain Reconstruction
              </h3>
              <p className="text-xs text-slate-600">
                Step-by-step cognitive deconstruction: How the attacker exploits human emotional and behavioral reflexes
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500 font-semibold">
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
                    className="card p-3.5 flex flex-col justify-between hover:border-slate-300 transition-all group bg-white border border-slate-200 shadow-2xs"
                  >
                    {/* Step Index Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-mono font-bold border border-slate-200">
                          {step.stepNumber}
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200">
                          {getStepIcon(step.iconName, step.stepNumber)}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-700 font-bold uppercase tracking-wider">
                        Phase {step.stepNumber}
                      </span>
                    </div>

                    {/* Phase Title & Trigger */}
                    <div className="space-y-1.5 mb-3">
                      <div className="text-xs font-bold text-slate-900">
                        {step.phase}
                      </div>
                      <div className="text-[11px] font-mono text-blue-700 bg-blue-50/70 px-2 py-1 rounded border border-blue-200 font-medium">
                        Trigger: "{step.trigger}"
                      </div>
                    </div>

                    {/* Psychological Mechanism & Victim Reaction */}
                    <div className="space-y-2 pt-2 border-t border-slate-200 text-[11px]">
                      <div>
                        <span className="text-slate-500 uppercase tracking-wider text-[9px] block font-bold">Attacker Hook</span>
                        <p className="text-xs text-slate-700 leading-tight">{step.psychologicalMechanism}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase tracking-wider text-[9px] block font-bold">Target Victim Reaction</span>
                        <p className="text-amber-800 leading-tight italic text-xs">"{step.victimReaction}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sequential Flow Banner */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2 overflow-x-auto text-xs shadow-2xs">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold shrink-0">Chain Sequence:</span>
              <div className="flex items-center gap-1.5 font-mono text-xs text-slate-700 shrink-0">
                {steps.map((s, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-indigo-700 font-medium shadow-2xs">
                      {s.phase}
                    </span>
                    {idx < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-emerald-50 rounded-xl text-center text-xs text-emerald-800 border border-emerald-200 relative z-10 font-medium">
            No psychological manipulation sequence detected in this communication.
          </div>
        )}

      </div>
    </div>
  );
};
