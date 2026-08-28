import React, { useState } from 'react';
import { Brain, Smile, Globe, UserCheck, Activity, SearchCheck, AlertTriangle, CheckCircle, ShieldAlert, Sparkles, Shield, Compass, FileCode, CheckCircle2, XCircle } from 'lucide-react';
import { FullThreatAnalysisResult } from '../types';

interface MultiLayerAnalysisViewProps {
  analysis: FullThreatAnalysisResult;
}

export const MultiLayerAnalysisView: React.FC<MultiLayerAnalysisViewProps> = ({
  analysis
}) => {
  const [activeTab, setActiveTab] = useState<'nlp' | 'social' | 'url' | 'sender' | 'behavior' | 'context'>('nlp');

  const layers = [
    { id: 'nlp', label: '1. NLP & Language', icon: <Brain className="w-4 h-4" />, score: analysis.nlpLayer.coerciveLanguageScore, riskColor: analysis.nlpLayer.coerciveLanguageScore > 60 ? 'text-rose-400' : 'text-emerald-400' },
    { id: 'social', label: '2. Social Engineering', icon: <Smile className="w-4 h-4" />, score: analysis.socialEngineeringLayer.emotionalManipulationScore, riskColor: analysis.socialEngineeringLayer.emotionalManipulationScore > 60 ? 'text-rose-400' : 'text-emerald-400' },
    { id: 'url', label: '3. URL & Domain', icon: <Globe className="w-4 h-4" />, score: analysis.urlLayer.urlRiskScore, riskColor: analysis.urlLayer.urlRiskScore > 60 ? 'text-rose-400' : 'text-emerald-400' },
    { id: 'sender', label: '4. Sender Identity', icon: <UserCheck className="w-4 h-4" />, score: analysis.senderIdentityLayer.identityRiskScore, riskColor: analysis.senderIdentityLayer.identityRiskScore > 60 ? 'text-rose-400' : 'text-emerald-400' },
    { id: 'behavior', label: '5. Behavioral Patterns', icon: <Activity className="w-4 h-4" />, score: analysis.behavioralLayer.behaviorRiskScore, riskColor: analysis.behavioralLayer.behaviorRiskScore > 60 ? 'text-rose-400' : 'text-emerald-400' },
    { id: 'context', label: '6. Context Consistency', icon: <SearchCheck className="w-4 h-4" />, score: 100 - analysis.contextConsistencyLayer.consistencyScore, riskColor: analysis.contextConsistencyLayer.consistencyScore < 50 ? 'text-rose-400' : 'text-emerald-400' }
  ];

  return (
    <div id="cybersentinel-multilayer-panel" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
            3. Multi-Layer Intelligence Analysis
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          6 Independent Deep Threat Evaluation Perspectives
        </span>
      </div>

      {/* Layer Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-5">
        {layers.map((layer) => (
          <button
            key={layer.id}
            id={`tab-layer-${layer.id}`}
            onClick={() => setActiveTab(layer.id as any)}
            className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              activeTab === layer.id
                ? 'bg-slate-800/90 border-cyan-500/50 shadow-md shadow-cyan-500/5'
                : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className={`p-1 rounded-md ${activeTab === layer.id ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'}`}>
                {layer.icon}
              </div>
              <span className={`text-xs font-mono font-bold ${layer.riskColor}`}>
                {layer.score}%
              </span>
            </div>
            <div className={`text-xs font-medium truncate ${activeTab === layer.id ? 'text-slate-100 font-semibold' : 'text-slate-400'}`}>
              {layer.label}
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content Display Area */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 sm:p-5">
        
        {/* 1. NLP & Language Tab */}
        {activeTab === 'nlp' && (
          <div id="content-layer-nlp" className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  NLP Linguistic Diagnostics & Semantic Coercion
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Coercive Score: {analysis.nlpLayer.coerciveLanguageScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Detected Tone & Sentiment
                </div>
                <div className="text-xs font-medium text-slate-200 mb-1">
                  Tone: <span className="text-cyan-300">{analysis.nlpLayer.tone}</span>
                </div>
                <div className="text-xs font-medium text-slate-200">
                  Sentiment: <span className="text-rose-300">{analysis.nlpLayer.sentiment}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Grammatical & Structural Anomalies
                </div>
                {analysis.nlpLayer.grammaticalAnomalies.length > 0 ? (
                  <ul className="space-y-1">
                    {analysis.nlpLayer.grammaticalAnomalies.map((item, idx) => (
                      <li key={idx} className="text-xs text-amber-300 flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>No grammatical manipulation flags detected.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Homoglyphs & Linguistic Markers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Homoglyphs & Evasive Obfuscations
                </div>
                {analysis.nlpLayer.homoglyphOrEvasiveTricks.length > 0 ? (
                  <div className="space-y-1">
                    {analysis.nlpLayer.homoglyphOrEvasiveTricks.map((trick, idx) => (
                      <div key={idx} className="text-xs font-mono text-rose-300 bg-rose-950/30 p-1.5 rounded border border-rose-800/40">
                        {trick}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400">No homoglyph character substitutions detected.</div>
                )}
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  High-Impact Linguistic Markers
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.nlpLayer.linguisticMarkers.map((marker, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {marker}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Social Engineering Tab */}
        {activeTab === 'social' && (
          <div id="content-layer-social" className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Smile className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Psychological Trigger Profiling & Exploitation Tactics
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Primary: {analysis.socialEngineeringLayer.primaryTactic}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis.socialEngineeringLayer.psychologicalTriggers.map((trig, idx) => (
                <div key={idx} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-200">{trig.name}</span>
                    <span className={`text-xs font-mono font-bold ${trig.intensity > 70 ? 'text-rose-400' : trig.intensity > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {trig.intensity}% Intensity
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${trig.intensity > 70 ? 'bg-rose-500' : trig.intensity > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${trig.intensity}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {trig.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. URL & Domain Tab */}
        {activeTab === 'url' && (
          <div id="content-layer-url" className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  URL, Domain Reputation & Typosquatting Analysis
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                URL Threat Index: {analysis.urlLayer.urlRiskScore}/100
              </span>
            </div>

            {analysis.urlLayer.detectedUrls.length > 0 ? (
              <div className="space-y-3">
                {analysis.urlLayer.detectedUrls.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="font-mono text-xs text-cyan-300 break-all">
                        {item.originalUrl}
                      </div>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border shrink-0 ${
                        item.isSuspicious ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}>
                        {item.isSuspicious ? 'Malicious / Untrusted' : 'Legitimate'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
                        <span className="text-[10px] text-slate-500 uppercase block">Domain</span>
                        <span className="font-mono text-slate-200 truncate block">{item.domain}</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
                        <span className="text-[10px] text-slate-500 uppercase block">Typosquat Risk</span>
                        <span className={`font-semibold ${item.typosquattingRisk === 'Critical' || item.typosquattingRisk === 'High' ? 'text-rose-400' : 'text-slate-300'}`}>
                          {item.typosquattingRisk} {item.lookalikeTarget && `(vs ${item.lookalikeTarget})`}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
                        <span className="text-[10px] text-slate-500 uppercase block">TLD Danger</span>
                        <span className={`font-semibold ${item.tldRisk === 'High Risk' ? 'text-amber-400' : 'text-slate-300'}`}>
                          {item.tldRisk}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
                        <span className="text-[10px] text-slate-500 uppercase block">Domain Age</span>
                        <span className="text-slate-300">{item.domainAgeEstimate || 'Unknown'}</span>
                      </div>
                    </div>

                    {item.findings && item.findings.length > 0 && (
                      <div className="pt-2 border-t border-slate-800">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase mb-1">Key Heuristic Signals:</div>
                        <ul className="space-y-1">
                          {item.findings.map((f, fIdx) => (
                            <li key={fIdx} className="text-xs text-slate-300 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 py-3 text-center">
                No URLs were detected in the inspected payload.
              </div>
            )}
          </div>
        )}

        {/* 4. Sender Identity Tab */}
        {activeTab === 'sender' && (
          <div id="content-layer-sender" className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Sender Origin & Cryptographic Header Health
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Identity Risk: {analysis.senderIdentityLayer.identityRiskScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Claimed vs Actual Identity
                </div>
                <div className="text-xs">
                  <span className="text-slate-400">Claimed Identity: </span>
                  <span className="text-slate-200 font-semibold">{analysis.senderIdentityLayer.claimedIdentity}</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400">Actual Sender: </span>
                  <span className="font-mono text-cyan-300">{analysis.senderIdentityLayer.actualSender}</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400">Domain Alignment: </span>
                  <span className={`font-semibold ${analysis.senderIdentityLayer.domainAlignment === 'Aligned' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {analysis.senderIdentityLayer.domainAlignment}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Email Authentication Headers
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-slate-950 rounded border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 block">SPF</span>
                    <span className={`text-xs font-bold uppercase ${analysis.senderIdentityLayer.authHealth.spf === 'pass' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {analysis.senderIdentityLayer.authHealth.spf}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 block">DKIM</span>
                    <span className={`text-xs font-bold uppercase ${analysis.senderIdentityLayer.authHealth.dkim === 'pass' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {analysis.senderIdentityLayer.authHealth.dkim}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 block">DMARC</span>
                    <span className={`text-xs font-bold uppercase ${analysis.senderIdentityLayer.authHealth.dmarc === 'pass' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {analysis.senderIdentityLayer.authHealth.dmarc}
                    </span>
                  </div>
                </div>
                {analysis.senderIdentityLayer.freeWebmailDiscrepancy && (
                  <div className="text-xs text-amber-300 flex items-center gap-1.5 pt-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Free webmail (@gmail/@proton) used for corporate executive impersonation.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 5. Behavioral Patterns Tab */}
        {activeTab === 'behavior' && (
          <div id="content-layer-behavior" className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Behavioral Anomalies & Protocol Bypass Indicators
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Behavior Risk: {analysis.behavioralLayer.behaviorRiskScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Time Pressure & Windows
                </div>
                <div className="text-xs text-slate-200">
                  Imposed Urgency Window: <span className="font-semibold text-rose-300">{analysis.behavioralLayer.urgencyWindow}</span>
                </div>
                <div className="text-xs text-slate-200">
                  Requested Action: <span className="font-semibold text-amber-300">{analysis.behavioralLayer.sensitiveActionRequested}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Operational Protocol Compliance
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Attempting Standard Protocol Bypass:</span>
                  <span className={`font-semibold ${analysis.behavioralLayer.protocolBypassAttempt ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {analysis.behavioralLayer.protocolBypassAttempt ? 'YES (High Risk)' : 'NO'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Out-of-Band Channel Requested:</span>
                  <span className={`font-semibold ${analysis.behavioralLayer.outOfBandCommunicationRequested ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {analysis.behavioralLayer.outOfBandCommunicationRequested ? 'YES' : 'NO'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. Context Consistency Tab */}
        {activeTab === 'context' && (
          <div id="content-layer-context" className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <SearchCheck className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Contextual Baseline & Channel Consistency
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                Consistency Rating: {analysis.contextConsistencyLayer.consistencyScore}/100
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Organizational Context Mismatch
                </div>
                <p className="text-xs text-slate-300">
                  {analysis.contextConsistencyLayer.organizationContextMismatch}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Channel Appropriateness
                  </div>
                  <span className={`text-xs font-semibold ${
                    analysis.contextConsistencyLayer.channelAppropriateness === 'Normal' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {analysis.contextConsistencyLayer.channelAppropriateness}
                  </span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Historical Baseline Deviation
                  </div>
                  <span className="text-xs text-slate-300">
                    {analysis.contextConsistencyLayer.historicalBaselineDeviation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
