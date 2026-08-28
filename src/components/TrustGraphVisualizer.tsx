import React from 'react';
import { Network, AlertOctagon, CheckCircle2, XCircle, ArrowRight, ShieldCheck, ShieldAlert, Globe, Mail, Building, Link2, Server } from 'lucide-react';
import { TrustGraph } from '../types';

interface TrustGraphVisualizerProps {
  trustGraph: TrustGraph;
}

export const TrustGraphVisualizer: React.FC<TrustGraphVisualizerProps> = ({ trustGraph }) => {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'claimed_org':
        return <Building className="w-4 h-4 text-cyan-400" />;
      case 'sender_entity':
        return <Mail className="w-4 h-4 text-purple-400" />;
      case 'domain':
        return <Globe className="w-4 h-4 text-amber-400" />;
      case 'destination_url':
        return <Link2 className="w-4 h-4 text-rose-400" />;
      default:
        return <Server className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div id="cybersentinel-trust-graph-panel" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              8. Trust Graph & Relational Identity Mapping
            </h3>
            <p className="text-xs text-slate-400">
              Cross-validates authentic brand namespaces against sender envelopes, DNS records, and destination endpoints
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Valid Link
          </span>
          <span className="flex items-center gap-1 text-rose-400">
            <XCircle className="w-3.5 h-3.5" /> Broken Trust Link
          </span>
        </div>
      </div>

      {/* Summary Rationale */}
      <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 mb-4 text-xs text-slate-300 flex items-start gap-2">
        <AlertOctagon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-100">Trust Graph Diagnostic: </span>
          {trustGraph.summary}
        </div>
      </div>

      {/* Nodes Display & Visual Relationship Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        {trustGraph.nodes.map((node, idx) => (
          <div
            key={node.id}
            id={`trust-node-${node.id}`}
            className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
              node.isCompromisedOrMalicious
                ? 'bg-rose-950/20 border-rose-500/40 text-rose-200 shadow-sm shadow-rose-950/30'
                : 'bg-slate-950/80 border-slate-800 text-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-slate-900 border border-slate-800">
                    {getNodeIcon(node.type)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Node {idx + 1}: {node.type.replace('_', ' ')}
                  </span>
                </div>
                {node.isCompromisedOrMalicious ? (
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              <div className="text-xs font-bold text-slate-100 truncate mb-1" title={node.label}>
                {node.label}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 mt-2">
              <span className={`text-[11px] font-medium font-mono px-2 py-0.5 rounded block text-center ${
                node.isCompromisedOrMalicious
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {node.statusText}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Relational Edge Inspections */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Trust Link Validations & Relationship Diagnostics:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {trustGraph.edges.map((edge, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border text-xs ${
                edge.isBrokenTrust
                  ? 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-semibold mb-1">
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <span>{edge.from}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span>{edge.to}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase ${
                  edge.isBrokenTrust ? 'bg-rose-900/60 text-rose-300' : 'bg-emerald-900/60 text-emerald-300'
                }`}>
                  {edge.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {edge.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
