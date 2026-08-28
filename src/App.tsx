import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroLeft } from './components/HeroLeft';
import { CirclesVisualization } from './components/CirclesVisualization';
import { LogoTicker } from './components/LogoTicker';
import { InputPanel } from './components/InputPanel';
import { AnalysisOverview } from './components/AnalysisOverview';
import { ExplainableMessageViewer } from './components/ExplainableMessageViewer';
import { MultiLayerAnalysisView } from './components/MultiLayerAnalysisView';
import { AttackDNAPanel } from './components/AttackDNAPanel';
import { ManipulationChainVisualizer } from './components/ManipulationChainVisualizer';
import { TrustGraphVisualizer } from './components/TrustGraphVisualizer';
import { ProjectedImpactSimulator } from './components/ProjectedImpactSimulator';
import { RecommendationsActionCenter } from './components/RecommendationsActionCenter';
import { JudgePitchModal } from './components/JudgePitchModal';
import { SAMPLE_THREATS, SampleThreatItem } from './data/sampleThreats';
import { ThreatInput, FullThreatAnalysisResult } from './types';
import { generateDynamicHeuristicAnalysis } from './utils/threatAnalyzer';
import { 
  ShieldAlert, 
  Brain, 
  Sparkles, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Terminal, 
  Network, 
  Flame, 
  FileText,
  HelpCircle,
  Zap,
  Info
} from 'lucide-react';

export default function App() {
  const [selectedSample, setSelectedSample] = useState<SampleThreatItem>(SAMPLE_THREATS[0]);
  const [input, setInput] = useState<ThreatInput>(SAMPLE_THREATS[0].input);
  const [analysis, setAnalysis] = useState<FullThreatAnalysisResult | null>(() => generateDynamicHeuristicAnalysis(SAMPLE_THREATS[0].input));
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'explainable' | 'multilayer' | 'dna_chain' | 'trust_impact'>('all');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Trigger analysis function
  const runAnalysis = async (threatInputToAnalyze?: ThreatInput) => {
    const payload = threatInputToAnalyze || input;
    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const result: FullThreatAnalysisResult = await response.json();
      setAnalysis(result);
    } catch (err: any) {
      console.warn('API server call fallback to local analysis:', err);
      // Deterministic immediate local fallback so UI never fails
      const fallbackResult = generateDynamicHeuristicAnalysis(payload);
      setAnalysis(fallbackResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run initial analysis on mount
  useEffect(() => {
    runAnalysis(SAMPLE_THREATS[0].input);
  }, []);

  const handleSelectSample = (sample: SampleThreatItem) => {
    setSelectedSample(sample);
    setInput(sample.input);
    runAnalysis(sample.input);
    const el = document.getElementById('cybersentinel-workspace');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectSampleById = (id: string) => {
    const found = SAMPLE_THREATS.find((s) => s.id === id);
    if (found) {
      handleSelectSample(found);
    }
  };

  const handleReset = () => {
    setInput({
      type: 'email',
      senderName: '',
      senderEmailOrPhone: '',
      subject: '',
      content: '',
      targetUrl: '',
      claimedOrganization: ''
    });
    setAnalysis(null);
  };

  return (
    <div id="cybersentinel-root" className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col selection:bg-[#A068FF]/30 selection:text-white">
      {/* =============================================================
          1. HERO SECTION (Full Viewport Landing Experience)
          ============================================================= */}
      <div id="marketeam-app" className="app app-root select-none relative z-20">
        {/* Top Header */}
        <Header />

        {/* Main Hero Container */}
        <main
          id="hero-main"
          className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 py-4 sm:py-6 lg:py-8 relative z-20"
        >
          {/* Left: Heading, CTA, and AI Sentinel Cursor */}
          <HeroLeft />

          {/* Right: Concentric Orbits, Avatars, and 99.8% Threat Detection */}
          <div className="flex-1 flex items-center justify-center w-full max-w-[720px]">
            <CirclesVisualization />
          </div>
        </main>

        {/* Bottom Technologies Ticker Strip */}
        <LogoTicker />
      </div>

      {/* =============================================================
          2. CYBERSENTINEL AI THREAT DETECTION & INGESTION WORKSPACE
          ============================================================= */}
      <section id="cybersentinel-workspace" className="w-full bg-slate-950 border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Problem Statement Mission Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-[#060218] border border-[#A068FF]/30 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#A068FF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
              <div className="space-y-2.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#A068FF]/20 text-[#A068FF] border border-[#A068FF]/40">
                    Challenge 8: CyberSentinel
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    AI-Based Phishing & Social Engineering Detector
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-['Urbanist']">
                  Multi-Perspective Threat Intelligence & Explainable AI Engine
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Evaluates linguistic patterns, emotional coercion (<strong className="text-amber-300">urgency</strong>, <strong className="text-rose-300">fear</strong>, <strong className="text-purple-300">authority</strong>), deceptive links, sender discrepancies, and contextual indicators to produce an explainable risk assessment and mitigation playbook.
                </p>
              </div>

              {/* Technologies Highlights */}
              <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  <Brain className="w-4 h-4 text-[#A068FF]" />
                  <span>NLP & Cognitive Bias Detection</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  <Network className="w-4 h-4 text-cyan-400" />
                  <span>Trust Graph & Domain Validation</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Explainable AI Annotations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Content Ingestion Panel */}
            <div className="lg:col-span-5 space-y-6">
              <InputPanel
                input={input}
                setInput={setInput}
                onAnalyze={() => runAnalysis()}
                isAnalyzing={isAnalyzing}
                onSelectSampleById={handleSelectSampleById}
              />

              {/* Active Scenario Card */}
              {selectedSample && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-slate-300 font-medium">
                    <span className="font-semibold text-slate-200">Loaded Threat Scenario:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedSample.threatLevelExpected === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      selectedSample.threatLevelExpected === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {selectedSample.badge}
                    </span>
                  </div>
                  <p className="text-slate-200 font-semibold text-sm">{selectedSample.name}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{selectedSample.description}</p>
                </div>
              )}
            </div>

            {/* Right Column: AI Analysis & Multi-Layer Visualizations */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Loading State */}
              {isAnalyzing && (
                <div className="bg-slate-900/90 border border-[#A068FF]/40 rounded-2xl p-12 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 py-20 animate-pulse">
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#A068FF]/20 border border-[#A068FF]/50">
                    <ShieldAlert className="w-8 h-8 text-[#A068FF] animate-bounce" />
                    <span className="absolute inset-0 rounded-full border-2 border-[#A068FF] border-t-transparent animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white font-['Urbanist']">
                      CyberSentinel AI Threat Scan in Progress...
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm">
                      Evaluating NLP tone, extracting psychological lures, verifying domain envelopes, and mapping MITRE ATT&CK techniques.
                    </p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {errorMsg && !isAnalyzing && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Real-time Analysis Results */}
              {!isAnalyzing && analysis && (
                <div className="space-y-6">
                  
                  {/* 1. Risk Assessment Scoring & Executive Verdict */}
                  <AnalysisOverview
                    analysis={analysis}
                    onExportReport={() => {
                      const reportEl = document.getElementById('cybersentinel-action-center');
                      if (reportEl) reportEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />

                  {/* 2. Explainable AI Red-Flag Highlighting */}
                  <ExplainableMessageViewer
                    content={input.content}
                    flags={analysis.highlightedFlags || []}
                    whyDangerous={analysis.whyDangerousExplanation || []}
                  />

                  {/* View Tabs */}
                  <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto text-xs">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        activeTab === 'all'
                          ? 'bg-[#A068FF]/30 text-white border border-[#A068FF]/50'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      All Intelligence Layers
                    </button>
                    <button
                      onClick={() => setActiveTab('multilayer')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        activeTab === 'multilayer'
                          ? 'bg-[#A068FF]/30 text-white border border-[#A068FF]/50'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      6-Perspective Matrix
                    </button>
                    <button
                      onClick={() => setActiveTab('dna_chain')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        activeTab === 'dna_chain'
                          ? 'bg-[#A068FF]/30 text-white border border-[#A068FF]/50'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Attack DNA & Manipulation Chain
                    </button>
                    <button
                      onClick={() => setActiveTab('trust_impact')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        activeTab === 'trust_impact'
                          ? 'bg-[#A068FF]/30 text-white border border-[#A068FF]/50'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Trust Graph & Breach Simulation
                    </button>
                  </div>

                  {/* 3. Multi-Layer Threat Intelligence (6 Perspectives) */}
                  {(activeTab === 'all' || activeTab === 'multilayer') && (
                    <MultiLayerAnalysisView analysis={analysis} />
                  )}

                  {/* 4. Attack DNA & 5. Psychological Manipulation Chain */}
                  {(activeTab === 'all' || activeTab === 'dna_chain') && (
                    <div className="space-y-6">
                      <AttackDNAPanel techniques={analysis.attackDNA || []} />
                      <ManipulationChainVisualizer steps={analysis.manipulationChain || []} />
                    </div>
                  )}

                  {/* 6. Trust Graph & 7. Projected Impact Simulation */}
                  {(activeTab === 'all' || activeTab === 'trust_impact') && (
                    <div className="space-y-6">
                      <TrustGraphVisualizer trustGraph={analysis.trustGraph} />
                      <ProjectedImpactSimulator impact={analysis.projectedImpact} />
                    </div>
                  )}

                  {/* 8. Recommendations & SOC Incident Response */}
                  <div id="cybersentinel-action-center">
                    <RecommendationsActionCenter
                      recommendations={analysis.recommendations || []}
                      analysis={analysis}
                    />
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#A068FF]" />
            <span className="font-semibold text-slate-300">CyberSentinel: AI-Based Phishing & Social Engineering Detector</span>
          </div>
          <span>Technologies: NLP, LLMs, Machine Learning, Cybersecurity AI, URL Analysis, Anomaly Detection, Explainable AI</span>
          <button
            onClick={() => setIsJudgeModalOpen(true)}
            className="text-[#A068FF] hover:underline font-medium cursor-pointer"
          >
            10-Stage Evaluation Pitch
          </button>
        </div>
      </footer>

      {/* 10-Stage Evaluation Pitch Modal */}
      <JudgePitchModal
        isOpen={isJudgeModalOpen}
        onClose={() => setIsJudgeModalOpen(false)}
      />
    </div>
  );
}




