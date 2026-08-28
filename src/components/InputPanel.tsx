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
    <div id="cybersentinel-input-panel" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      
      {/* Background Cyber Pattern subtle glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header bar with quick attack presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
              1. Suspicious Content Ingestion
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Input email, SMS, chat, URL, or select from curated enterprise threat scenarios.
          </p>
        </div>

        {/* Quick attack pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-500 font-medium mr-1">Quick Load:</span>
          {SAMPLE_THREATS.map((sample) => (
            <button
              key={sample.id}
              id={`quick-pill-${sample.id}`}
              onClick={() => onSelectSampleById(sample.id)}
              className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700/60 transition-all truncate max-w-[140px] sm:max-w-none"
              title={sample.name}
            >
              {sample.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Input Channel Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-slate-950/70 border border-slate-800 rounded-xl mb-4">
        {inputTypeTabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-channel-${tab.id}`}
            onClick={() => setInput({ ...input, type: tab.id })}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              input.type === tab.id
                ? 'bg-gradient-to-r from-cyan-900/60 to-slate-800 text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Metadata Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {/* Claimed Organization */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            Claimed Organization / Entity
          </label>
          <input
            id="input-claimed-org"
            type="text"
            value={input.claimedOrganization || ''}
            onChange={(e) => setInput({ ...input, claimedOrganization: e.target.value })}
            placeholder="e.g. Microsoft 365, Apex Global, IRS, DHL"
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 transition-colors outline-none"
          />
        </div>

        {/* Sender Display Name / Entity */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            Sender Display Name
          </label>
          <input
            id="input-sender-name"
            type="text"
            value={input.senderName || ''}
            onChange={(e) => setInput({ ...input, senderName: e.target.value })}
            placeholder="e.g. Microsoft Security Desk, David Sterling (CEO)"
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 transition-colors outline-none"
          />
        </div>

        {/* Sender Email / Phone / Origin */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            Sender Email / Phone / Handle
          </label>
          <input
            id="input-sender-email"
            type="text"
            value={input.senderEmailOrPhone || ''}
            onChange={(e) => setInput({ ...input, senderEmailOrPhone: e.target.value })}
            placeholder="e.g. alert@sec-microsoft-verify-auth.xyz, +1-833-492-0193"
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 transition-colors outline-none"
          />
        </div>
      </div>

      {/* Subject Line (For emails) */}
      {input.type === 'email' && (
        <div className="mb-3">
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Email Subject Line
          </label>
          <input
            id="input-subject"
            type="text"
            value={input.subject || ''}
            onChange={(e) => setInput({ ...input, subject: e.target.value })}
            placeholder="e.g. URGENT: Suspicious Login Detected - Action Required"
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 transition-colors outline-none"
          />
        </div>
      )}

      {/* Target URL / Link Embedded in Message */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5 text-purple-400" />
          Target / Action URL Embedded in Message
        </label>
        <input
          id="input-target-url"
          type="text"
          value={input.targetUrl || ''}
          onChange={(e) => setInput({ ...input, targetUrl: e.target.value })}
          placeholder="e.g. https://login.micros0ft-portal-auth.xyz/verify-token"
          className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 placeholder-slate-600 transition-colors outline-none"
        />
      </div>

      {/* Main Message Content Textarea */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-slate-400">
            Full Message Body / Text Payload
          </label>
          <span className="text-[10px] text-slate-500 font-mono">
            {input.content.length} characters
          </span>
        </div>
        <textarea
          id="input-message-content"
          rows={6}
          value={input.content}
          onChange={(e) => setInput({ ...input, content: e.target.value })}
          placeholder="Paste full email text, SMS body, social media message, or webpage content here..."
          className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder-slate-600 leading-relaxed transition-colors outline-none resize-y"
        />
      </div>

      {/* Advanced Headers & Attachments Toggle */}
      <div className="mb-4">
        <button
          type="button"
          id="btn-toggle-headers"
          onClick={() => setShowAdvancedHeaders(!showAdvancedHeaders)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          {showAdvancedHeaders ? <ChevronUp className="w-3.5 h-3.5 text-cyan-400" /> : <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />}
          <span>Advanced Email Authentication Headers (SPF/DKIM/DMARC) & Attachments</span>
        </button>

        {showAdvancedHeaders && (
          <div className="mt-2.5 p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-3 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* SPF Header */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">SPF Record Check</label>
                <select
                  id="select-spf"
                  value={input.headers?.spf || 'none'}
                  onChange={(e) => setInput({
                    ...input,
                    headers: { ...input.headers, spf: e.target.value as any }
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                >
                  <option value="pass">SPF: Pass (Legit Origin)</option>
                  <option value="fail">SPF: Fail (Unauthorized IP)</option>
                  <option value="neutral">SPF: Neutral / SoftFail</option>
                  <option value="none">SPF: None / Missing</option>
                </select>
              </div>

              {/* DKIM Header */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">DKIM Cryptographic Signature</label>
                <select
                  id="select-dkim"
                  value={input.headers?.dkim || 'none'}
                  onChange={(e) => setInput({
                    ...input,
                    headers: { ...input.headers, dkim: e.target.value as any }
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                >
                  <option value="pass">DKIM: Pass (Cryptographically Valid)</option>
                  <option value="fail">DKIM: Fail (Invalid Signature)</option>
                  <option value="none">DKIM: None / Unsigned</option>
                </select>
              </div>

              {/* DMARC Policy */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">DMARC Policy Alignment</label>
                <select
                  id="select-dmarc"
                  value={input.headers?.dmarc || 'none'}
                  onChange={(e) => setInput({
                    ...input,
                    headers: { ...input.headers, dmarc: e.target.value as any }
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                >
                  <option value="pass">DMARC: Pass (Strict Reject Enforced)</option>
                  <option value="fail">DMARC: Fail (Domain Mismatch)</option>
                  <option value="none">DMARC: None / Quarantine Only</option>
                </select>
              </div>
            </div>

            {/* Reply-To Discrepancy & Attachments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Reply-To Header (If Different)</label>
                <input
                  id="input-reply-to"
                  type="text"
                  value={input.headers?.replyTo || ''}
                  onChange={(e) => setInput({
                    ...input,
                    headers: { ...input.headers, replyTo: e.target.value }
                  })}
                  placeholder="e.g. harvester-relay@protonmail.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Simulated Attachments (Comma separated)</label>
                <input
                  id="input-attachments"
                  type="text"
                  value={input.attachments?.join(', ') || ''}
                  onChange={(e) => setInput({
                    ...input,
                    attachments: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="e.g. Security_Incident.pdf, invoice.pdf.exe"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-600 outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action CTA Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Multi-Layer NLP, URL, Behavioral & Trust Graph Pipeline</span>
        </div>

        <button
          id="btn-run-analysis"
          onClick={onAnalyze}
          disabled={isAnalyzing || !input.content.trim()}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all ${
            isAnalyzing || !input.content.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold shadow-emerald-500/20 active:scale-95'
          }`}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              <span>Scanning NLP, URL, Trust & Manipulation Layers...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Execute CyberSentinel AI Analysis</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
