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
    { id: 'nlp', label: '1. NLP & Language', icon: <Brain className="w-4 h-4" />, score: analysis.nlpLayer.coerciveLanguageScore, riskColor: analysis.nlpLayer.coerciveLanguageScore > 60 ? 'text-rose-600' : 'text-emerald-600' },
    { id: 'social', label: '2. Social Engineering', icon: <Smile className="w-4 h-4" />, score: analysis.socialEngineeringLayer.emotionalManipulationScore, riskColor: analysis.socialEngineeringLayer.emotionalManipulationScore > 60 ? 'text-rose-600' : 'text-emerald-600' },
    { id: 'url', label: '3. URL & Domain', icon: <Globe className="w-4 h-4" />, score: analysis.urlLayer.urlRiskScore, riskColor: analysis.urlLayer.urlRiskScore > 60 ? 'text-rose-600' : 'text-emerald-600' },
    { id: 'sender', label: '4. Sender Identity', icon: <UserCheck className="w-4 h-4" />, score: analysis.senderIdentityLayer.identityRiskScore, riskColor: analysis.senderIdentityLayer.identityRiskScore > 60 ? 'text-rose-600' : 'text-emerald-600' },
    { id: 'behavior', label: '5. Behavioral Patterns', icon: <Activity className="w-4 h-4" />, score: analysis.behavioralLayer.behaviorRiskScore, riskColor: analysis.behavioralLayer.behaviorRiskScore > 60 ? 'text-rose-600' : 'text-emerald-600' },
    { id: 'context', label: '6. Context Consistency', icon: <SearchCheck className="w-4 h-4" />, score: 100 - analysis.contextConsistencyLayer.consistencyScore, riskColor: analysis.contextConsistencyLayer.consistencyScore < 50 ? 'text-rose-600' : 'text-emerald-600' }
  ];

  return (
    <div className="container">
      <div id="cybersentinel-multilayer-panel" className="card p-5 sm:p-6 shadow-sm border border-slate-200 bg-white relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              3. Multi-Layer Intelligence Analysis
            </h3>
          </div>
          <span className="text-xs text-slate-600">
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
            className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
              activeTab === layer.id
                ? 'bg-blue-50 border-blue-400 shadow-2xs'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className={`p-1 rounded-md ${activeTab === layer.id ? 'bg-blue-100 text-blue-700' : 'text-slate-500'}`}>
                {layer.icon}
              </div>
              <span className={`text-xs font-mono font-bold ${layer.riskColor}`}>
                {layer.score}%
              </span>
            </div>
            <div className={`text-xs font-semibold truncate ${activeTab === layer.id ? 'text-blue-900' : 'text-slate-700'}`}>
              {layer.label}
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content Display Area */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
        
        {/* 1. NLP & Language Tab */}
        {activeTab === 'nlp' && (
          <div id="content-layer-nlp" className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  NLP Linguistic Diagnostics & Semantic Coercion
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                Coercive Score: {analysis.nlpLayer.coerciveLanguageScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Detected Tone & Sentiment
                </div>
                <div className="text-xs font-medium text-slate-800 mb-1">
                  Tone: <span className="text-blue-700 font-semibold">{analysis.nlpLayer.tone}</span>
                </div>
                <div className="text-xs font-medium text-slate-800">
                  Sentiment: <span className="text-rose-700 font-semibold">{analysis.nlpLayer.sentiment}</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Grammatical & Structural Anomalies
                </div>
                {analysis.nlpLayer.grammaticalAnomalies.length > 0 ? (
                  <ul className="space-y-1">
                    {analysis.nlpLayer.grammaticalAnomalies.map((item, idx) => (
                      <li key={idx} className="text-xs text-amber-800 flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>No grammatical manipulation flags detected.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Homoglyphs & Linguistic Markers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Homoglyphs & Evasive Obfuscations
                </div>
                {analysis.nlpLayer.homoglyphOrEvasiveTricks.length > 0 ? (
                  <div className="space-y-1">
                    {analysis.nlpLayer.homoglyphOrEvasiveTricks.map((trick, idx) => (
                      <div key={idx} className="text-xs font-mono text-rose-700 bg-rose-50 p-1.5 rounded border border-rose-200">
                        {trick}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">No homoglyph character substitutions detected.</div>
                )}
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  High-Impact Linguistic Markers
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.nlpLayer.linguisticMarkers.map((marker, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
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
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Smile className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Psychological Trigger Profiling & Exploitation Tactics
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                Primary: {analysis.socialEngineeringLayer.primaryTactic}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis.socialEngineeringLayer.psychologicalTriggers.map((trig, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-800">{trig.name}</span>
                    <span className={`text-xs font-mono font-bold ${trig.intensity > 70 ? 'text-rose-600' : trig.intensity > 40 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {trig.intensity}% Intensity
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${trig.intensity > 70 ? 'bg-rose-500' : trig.intensity > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${trig.intensity}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
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
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  URL, Domain Reputation & Typosquatting Analysis
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                URL Threat Index: {analysis.urlLayer.urlRiskScore}/100
              </span>
            </div>

            {analysis.urlLayer.detectedUrls.length > 0 ? (
              <div className="space-y-3">
                {analysis.urlLayer.detectedUrls.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="font-mono text-xs text-blue-700 font-semibold break-all">
                        {item.originalUrl}
                      </div>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border shrink-0 ${
                        item.isSuspicious ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {item.isSuspicious ? 'Malicious / Untrusted' : 'Legitimate'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 bg-slate-50 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Domain</span>
                        <span className="font-mono text-slate-800 truncate block font-medium">{item.domain}</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Typosquat Risk</span>
                        <span className={`font-semibold ${item.typosquattingRisk === 'Critical' || item.typosquattingRisk === 'High' ? 'text-rose-600' : 'text-slate-700'}`}>
                          {item.typosquattingRisk} {item.lookalikeTarget && `(vs ${item.lookalikeTarget})`}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">TLD Danger</span>
                        <span className={`font-semibold ${item.tldRisk === 'High Risk' ? 'text-amber-700' : 'text-slate-700'}`}>
                          {item.tldRisk}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Domain Age</span>
                        <span className="text-slate-700 font-medium">{item.domainAgeEstimate || 'Unknown'}</span>
                      </div>
                    </div>

                    {item.findings && item.findings.length > 0 && (
                      <div className="pt-2 border-t border-slate-200">
                        <div className="text-[10px] font-bold text-slate-700 uppercase mb-1">Key Heuristic Signals:</div>
                        <ul className="space-y-1">
                          {item.findings.map((f, fIdx) => (
                            <li key={fIdx} className="text-xs text-slate-700 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
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
              <div className="text-xs text-slate-500 py-3 text-center">
                No URLs were detected in the inspected payload.
              </div>
            )}
          </div>
        )}

        {/* 4. Sender Identity Tab */}
        {activeTab === 'sender' && (
          <div id="content-layer-sender" className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Sender Origin & Cryptographic Header Health
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                Identity Risk: {analysis.senderIdentityLayer.identityRiskScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Claimed vs Actual Identity
                </div>
                <div className="text-xs">
                  <span className="text-slate-500">Claimed Identity: </span>
                  <span className="text-slate-900 font-semibold">{analysis.senderIdentityLayer.claimedIdentity}</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-500">Actual Sender: </span>
                  <span className="font-mono text-blue-700 font-medium">{analysis.senderIdentityLayer.actualSender}</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-500">Domain Alignment: </span>
                  <span className={`font-semibold ${analysis.senderIdentityLayer.domainAlignment === 'Aligned' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {analysis.senderIdentityLayer.domainAlignment}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Email Authentication Headers
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 block font-semibold">SPF</span>
                    <span className={`text-xs font-bold uppercase ${analysis.senderIdentityLayer.authHealth.spf === 'pass' ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {analysis.senderIdentityLayer.authHealth.spf}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 block font-semibold">DKIM</span>
                    <span className={`text-xs font-bold uppercase ${analysis.senderIdentityLayer.authHealth.dkim === 'pass' ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {analysis.senderIdentityLayer.authHealth.dkim}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 block font-semibold">DMARC</span>
                    <span className={`text-xs font-bold uppercase ${analysis.senderIdentityLayer.authHealth.dmarc === 'pass' ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {analysis.senderIdentityLayer.authHealth.dmarc}
                    </span>
                  </div>
                </div>
                {analysis.senderIdentityLayer.freeWebmailDiscrepancy && (
                  <div className="text-xs text-amber-800 flex items-center gap-1.5 pt-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
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
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Behavioral Anomalies & Protocol Bypass Indicators
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                Behavior Risk: {analysis.behavioralLayer.behaviorRiskScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Time Pressure & Windows
                </div>
                <div className="text-xs text-slate-800">
                  Imposed Urgency Window: <span className="font-semibold text-rose-700">{analysis.behavioralLayer.urgencyWindow}</span>
                </div>
                <div className="text-xs text-slate-800">
                  Requested Action: <span className="font-semibold text-amber-800">{analysis.behavioralLayer.sensitiveActionRequested}</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Operational Protocol Compliance
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Attempting Standard Protocol Bypass:</span>
                  <span className={`font-semibold ${analysis.behavioralLayer.protocolBypassAttempt ? 'text-rose-700' : 'text-emerald-700'}`}>
                    {analysis.behavioralLayer.protocolBypassAttempt ? 'YES (High Risk)' : 'NO'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Out-of-Band Channel Requested:</span>
                  <span className={`font-semibold ${analysis.behavioralLayer.outOfBandCommunicationRequested ? 'text-rose-700' : 'text-emerald-700'}`}>
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
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <SearchCheck className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Contextual Baseline & Channel Consistency
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
                Consistency Rating: {analysis.contextConsistencyLayer.consistencyScore}/100
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Organizational Context Mismatch
                </div>
                <p className="text-xs text-slate-700">
                  {analysis.contextConsistencyLayer.organizationContextMismatch}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Channel Appropriateness
                  </div>
                  <span className={`text-xs font-semibold ${
                    analysis.contextConsistencyLayer.channelAppropriateness === 'Normal' ? 'text-emerald-700' : 'text-rose-700'
                  }`}>
                    {analysis.contextConsistencyLayer.channelAppropriateness}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Historical Baseline Deviation
                  </div>
                  <span className="text-xs text-slate-700 font-medium">
                    {analysis.contextConsistencyLayer.historicalBaselineDeviation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
    </div>
  );
};
