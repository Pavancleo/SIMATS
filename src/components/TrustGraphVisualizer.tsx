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
        return <Building className="w-4 h-4 text-blue-600" />;
      case 'sender_entity':
        return <Mail className="w-4 h-4 text-indigo-600" />;
      case 'domain':
        return <Globe className="w-4 h-4 text-amber-600" />;
      case 'destination_url':
        return <Link2 className="w-4 h-4 text-rose-600" />;
      default:
        return <Server className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="container">
      <div id="cybersentinel-trust-graph-panel" className="card p-5 sm:p-6 shadow-sm border border-slate-200 bg-white relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                8. Trust Graph & Relational Identity Mapping
              </h3>
              <p className="text-xs text-slate-600">
                Cross-validates authentic brand namespaces against sender envelopes, DNS records, and destination endpoints
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Valid Link
            </span>
            <span className="flex items-center gap-1 text-rose-700 font-semibold">
              <XCircle className="w-3.5 h-3.5" /> Broken Trust Link
            </span>
          </div>
        </div>

        {/* Summary Rationale */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4 text-xs text-slate-700 flex items-start gap-2 relative z-10 shadow-2xs">
          <AlertOctagon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900">Trust Graph Diagnostic: </span>
            {trustGraph.summary}
          </div>
        </div>

        {/* Nodes Display & Visual Relationship Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 relative z-10">
          {trustGraph.nodes.map((node, idx) => (
            <div key={node.id} className="container">
              <div
                id={`trust-node-${node.id}`}
                className={`card p-3.5 flex flex-col justify-between transition-all bg-white border shadow-2xs ${
                  node.isCompromisedOrMalicious
                    ? 'border-rose-300 text-rose-900'
                    : 'border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-slate-50 border border-slate-200">
                        {getNodeIcon(node.type)}
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                        Node {idx + 1}: {node.type.replace('_', ' ')}
                      </span>
                    </div>
                    {node.isCompromisedOrMalicious ? (
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>

                  <div className="text-xs font-bold truncate mb-1 text-slate-900" title={node.label}>
                    {node.label}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 mt-2">
                  <span className={`text-[11px] font-medium font-mono px-2 py-0.5 rounded block text-center ${
                    node.isCompromisedOrMalicious
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {node.statusText}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Relational Edge Inspections */}
        <div className="space-y-2 relative z-10">
          <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            Trust Link Validations & Relationship Diagnostics:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {trustGraph.edges.map((edge, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border text-xs shadow-2xs ${
                  edge.isBrokenTrust
                    ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between font-semibold mb-1">
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <span>{edge.from}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span>{edge.to}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase font-bold ${
                    edge.isBrokenTrust ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {edge.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {edge.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
