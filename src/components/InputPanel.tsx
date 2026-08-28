import React, { useState } from 'react';
import { Mail, MessageSquare, Globe, FileText, ChevronDown, ChevronUp, Link as LinkIcon, ShieldCheck, Sparkles, Send, RefreshCw, Paperclip, Building2, User, AlertCircle } from 'lucide-react';
import { ThreatInput, InputType } from '../types';
import { SAMPLE_THREATS } from '../data/sampleThreats';

interface InputPanelProps {
  input: ThreatInput;
  setInput: React.Dispatch<React.SetStateAction<ThreatInput>>;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onSelectSampleById: (id: string) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  input,
  setInput,
  onAnalyze,
  isAnalyzing,
  onSelectSampleById
}) => {
  const [showAdvancedHeaders, setShowAdvancedHeaders] = useState(false);

  const inputTypeTabs: { id: InputType; label: string; icon: React.ReactNode }[] = [
    { id: 'email', label: 'Email Phishing', icon: <Mail className="w-4 h-4" /> },
    { id: 'sms', label: 'SMS / Smishing', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'social_dm', label: 'Social DM / Spearphish', icon: <User className="w-4 h-4" /> },
    { id: 'url', label: 'URL / Webpage Lure', icon: <Globe className="w-4 h-4" /> },
    { id: 'raw_text', label: 'Raw Message / Text', icon: <FileText className="w-4 h-4" /> }
  ];

  return (
    <div className="container">
      <div id="cybersentinel-input-panel" className="card p-4 sm:p-6 shadow-sm border border-slate-200 bg-white relative overflow-hidden">
        
        {/* Header bar with quick attack presets */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-200 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-black tracking-wide uppercase text-black whitespace-nowrap m-0 p-0 leading-none">
                1. Suspicious Content Ingestion
              </h2>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <p className="text-xs sm:text-sm text-black font-medium whitespace-normal sm:whitespace-nowrap m-0 p-0">
              Input email, SMS, chat, URL, or select from curated enterprise threat scenarios.
            </p>
          </div>

          {/* Quick attack pills */}
          <div className="flex items-center gap-1.5 flex-wrap shrink-0">
            <span className="text-[11px] sm:text-xs text-black font-bold mr-1 whitespace-nowrap">Quick Load:</span>
            {SAMPLE_THREATS.map((sample) => (
              <button
                key={sample.id}
                id={`quick-pill-${sample.id}`}
                onClick={() => onSelectSampleById(sample.id)}
                className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-black border border-slate-300 transition-all font-mono font-bold whitespace-nowrap cursor-pointer"
                title={sample.name}
              >
                {sample.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Input Channel Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl mb-4 relative z-10">
          {inputTypeTabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-channel-${tab.id}`}
              onClick={() => setInput({ ...input, type: tab.id })}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                input.type === tab.id
                  ? 'bg-white text-blue-700 border border-slate-200 shadow-xs'
                  : 'text-black hover:text-blue-700 hover:bg-white/60'
              }`}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-5 relative z-10">
          
          {/* Row: Sender details and Claimed Org */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-black mb-1">
                Sender Name / From Header
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. IT Helpdesk / CEO / Bank Security"
                  value={input.senderName || ''}
                  onChange={(e) => setInput({ ...input, senderName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-black font-semibold placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-black mb-1">
                Sender Email / Phone / Handle
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. support@paypa1-update.com / +1-800-..."
                  value={input.senderEmailOrPhone || ''}
                  onChange={(e) => setInput({ ...input, senderEmailOrPhone: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-black font-semibold placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Subject Line (if email/message) */}
          {(input.type === 'email' || input.type === 'raw_text') && (
            <div>
              <label className="block text-[11px] font-bold text-black mb-1">
                Subject Line / Topic
              </label>
              <input
                type="text"
                placeholder="e.g. URGENT: Mandatory MFA Reset Required in 2 Hours"
                value={input.subject || ''}
                onChange={(e) => setInput({ ...input, subject: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-black font-semibold placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-2xs"
              />
            </div>
          )}

          {/* Main Content Area */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-black flex items-center gap-1.5">
                <span>Message Body / Payload Text</span>
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <span className="text-[10px] text-black font-mono font-bold">
                {input.content.length} chars
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="Paste the suspicious email, SMS, DM, or webpage body text here..."
              value={input.content}
              onChange={(e) => setInput({ ...input, content: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono font-semibold leading-relaxed transition-all resize-y shadow-2xs"
            />
          </div>

          {/* Embedded URL input */}
          <div>
            <label className="block text-[11px] font-bold text-black mb-1">
              Embedded Destination Link / Hyperlink
            </label>
            <div className="relative flex items-center">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="e.g. https://login-microsoft-auth-portal.com/verify?token=..."
                value={input.targetUrl || ''}
                onChange={(e) => setInput({ ...input, targetUrl: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono font-semibold transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Claimed Organization / Identity */}
          <div>
            <label className="block text-[11px] font-bold text-black mb-1">
              Claimed Organization / Entity
            </label>
            <div className="relative flex items-center">
              <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="e.g. Microsoft Security / PayPal / Wells Fargo"
                value={input.claimedOrganization || ''}
                onChange={(e) => setInput({ ...input, claimedOrganization: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-black placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Collapsible Advanced Headers (SPF, DKIM, DMARC) */}
          <div className="pt-2">
            <button
              type="button"
              id="btn-toggle-advanced-headers"
              onClick={() => setShowAdvancedHeaders(!showAdvancedHeaders)}
              className="flex items-center gap-1.5 text-xs text-black hover:text-blue-600 font-mono font-bold transition-colors cursor-pointer"
            >
              {showAdvancedHeaders ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>Advanced Email Authentication Headers (SPF, DKIM, DMARC)</span>
            </button>

            {showAdvancedHeaders && (
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-mono text-black mb-1 font-bold">SPF Status</label>
                    <select
                      value={input.headers?.spf || 'unknown'}
                      onChange={(e) => setInput({
                        ...input,
                        headers: { ...input.headers, spf: e.target.value as any }
                      })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-black font-bold shadow-2xs"
                    >
                      <option value="pass">Pass</option>
                      <option value="fail">Fail (Spoofed)</option>
                      <option value="softfail">SoftFail</option>
                      <option value="none">None</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-black mb-1 font-bold">DKIM Status</label>
                    <select
                      value={input.headers?.dkim || 'unknown'}
                      onChange={(e) => setInput({
                        ...input,
                        headers: { ...input.headers, dkim: e.target.value as any }
                      })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-black font-bold shadow-2xs"
                    >
                      <option value="pass">Pass</option>
                      <option value="fail">Fail (Tampered)</option>
                      <option value="none">None</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-black mb-1 font-bold">DMARC Policy</label>
                    <select
                      value={input.headers?.dmarc || 'unknown'}
                      onChange={(e) => setInput({
                        ...input,
                        headers: { ...input.headers, dmarc: e.target.value as any }
                      })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-black font-bold shadow-2xs"
                    >
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                      <option value="quarantine">Quarantine</option>
                      <option value="reject">Reject</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-black mb-1 font-bold">Return-Path / Envelope Sender</label>
                  <input
                    type="text"
                    placeholder="e.g. bounce-handler@attacker-owned-domain.xyz"
                    value={input.headers?.returnPath || ''}
                    onChange={(e) => setInput({
                      ...input,
                      headers: { ...input.headers, returnPath: e.target.value }
                    })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-black font-mono font-bold shadow-2xs"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Action Button & Ingestion Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 relative z-10">
          <div className="text-xs text-black flex items-center gap-2 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Multi-Layer NLP, URL, Behavioral & Trust Graph Pipeline</span>
          </div>

          <button
            id="btn-run-analysis"
            onClick={onAnalyze}
            disabled={isAnalyzing || !input.content.trim()}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
              isAnalyzing || !input.content.trim()
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-blue-600 hover:bg-blue-700 text-white font-bold active:scale-95 shadow-blue-500/20'
            }`}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Scanning NLP, URL, Trust & Manipulation Layers...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Execute CyberSentinel AI Analysis</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
