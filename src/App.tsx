import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroLeft } from './components/HeroLeft';
import { CirclesVisualization } from './components/CirclesVisualization';
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
  const [currentView, setCurrentView] = useState<'home' | 'scanner'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#scanner') {
      return 'scanner';
    }
    return 'home';
  });
  const [selectedSample, setSelectedSample] = useState<SampleThreatItem>(SAMPLE_THREATS[0]);
  const [input, setInput] = useState<ThreatInput>(SAMPLE_THREATS[0].input);
  const [analysis, setAnalysis] = useState<FullThreatAnalysisResult | null>(() => generateDynamicHeuristicAnalysis(SAMPLE_THREATS[0].input));
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'explainable' | 'multilayer' | 'dna_chain' | 'trust_impact'>('all');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync with browser hash for back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#scanner') {
        setCurrentView('scanner');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: 'home' | 'scanner', initialTab?: 'all' | 'explainable' | 'multilayer' | 'dna_chain' | 'trust_impact') => {
    setCurrentView(view);
    if (initialTab) {
      setActiveTab(initialTab);
    }
    if (view === 'scanner') {
      window.location.hash = 'scanner';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    navigateTo('scanner');
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
          PAGE 1: LANDING & HERO HOME PAGE (FIT TO VIEWPORT)
          ============================================================= */}
      {currentView === 'home' && (
        <div className="flex-1 flex flex-col justify-between min-h-screen lg:h-screen lg:max-h-screen overflow-hidden animate-in fade-in duration-300">
          <div id="marketeam-app" className="app app-root select-none relative z-20 flex-1 flex flex-col justify-between overflow-hidden">
            {/* Top Header */}
            <Header
              currentView="home"
              onNavigate={navigateTo}
              onOpenPitch={() => setIsJudgeModalOpen(true)}
            />

            {/* Main Hero Container */}
            <main
              id="hero-main"
              className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 py-2 sm:py-4 relative z-20 overflow-hidden"
            >
              {/* Left: Heading, CTA, and AI Sentinel Cursor */}
              <HeroLeft onScanThreat={() => navigateTo('scanner')} />

              {/* Right: Concentric Orbits, Defense Nodes, and Center Gooey Loader */}
              <div className="flex-1 flex items-center justify-center w-full max-w-[720px] scale-[0.75] sm:scale-[0.85] lg:scale-[0.92] xl:scale-100 origin-center my-auto">
                <CirclesVisualization />
              </div>
            </main>

            {/* Compact Bottom Footer */}
            <footer className="border-t border-slate-800/80 bg-slate-950/80 py-3 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 z-30">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#A068FF]" />
                  <span className="font-semibold text-slate-300 text-xs">CyberSentinel: AI-Based Phishing & Social Engineering Detector</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigateTo('scanner')}
                    className="text-[#c4b5fd] hover:text-white font-medium cursor-pointer text-xs flex items-center gap-1.5"
                  >
                    <Terminal className="w-3 h-3 text-[#A068FF]" />
                    <span>Launch Live AI Scanner →</span>
                  </button>
                  <span className="text-slate-700 hidden sm:inline">|</span>
                  <button
                    onClick={() => setIsJudgeModalOpen(true)}
                    className="text-[#A068FF] hover:underline font-medium cursor-pointer text-xs"
                  >
                    10-Stage Evaluation Pitch
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* =============================================================
          PAGE 2: DEDICATED THREAT INTELLIGENCE & DETECTION SCANNER PAGE
          ============================================================= */}
      {currentView === 'scanner' && (
        <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
          
          {/* Dedicated Scanner Header */}
          <Header
            currentView="scanner"
            onNavigate={navigateTo}
            onOpenPitch={() => setIsJudgeModalOpen(true)}
          />

          {/* Scanner Page Content */}
          <main className="flex-1 w-full bg-slate-950/95 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-30">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
              
              {/* Top Navigation & Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigateTo('home')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                  >
                    <span>← Back to Landing</span>
                  </button>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-emerald-400">
                      Real-Time AI Detection Engine Active
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-slate-400 font-medium">Quick Preset:</span>
                  <select
                    value={selectedSample?.id || ''}
                    onChange={(e) => handleSelectSampleById(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-mono focus:outline-none focus:border-[#A068FF]"
                  >
                    {SAMPLE_THREATS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Challenge 8 Mission Header */}
              <div className="container">
                <div className="card p-5 sm:p-7 shadow-2xl relative overflow-hidden">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#A068FF]/20 text-[#A068FF] border border-[#A068FF]/40">
                          Challenge 8: CyberSentinel
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          AI-Based Phishing & Social Engineering Detector
                        </span>
                      </div>
                      <h2 className="innerText text-xl sm:text-2xl font-bold tracking-tight">
                        Multi-Perspective Threat Intelligence & Explainable AI Engine
                      </h2>
                      <p className="desc text-xs sm:text-sm text-slate-300 leading-relaxed">
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
              </div>

              {/* Ingestion Panel & Threat Overview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Left Column: Suspicious Content Ingestion */}
                <div className="lg:col-span-6 space-y-6">
                  <InputPanel
                    input={input}
                    setInput={setInput}
                    onAnalyze={() => runAnalysis()}
                    isAnalyzing={isAnalyzing}
                    onSelectSampleById={handleSelectSampleById}
                  />

                  {/* Active Scenario Card */}
                  {selectedSample && (
                    <div className="container">
                      <div className="card p-4 text-xs text-slate-400 space-y-2 shadow-lg">
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
                        <p className="innerText text-base font-semibold">{selectedSample.name}</p>
                        <p className="desc text-[11px] leading-relaxed">{selectedSample.description}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: AI Threat Overview & Executive Verdict */}
                <div className="lg:col-span-6 space-y-6">
                  
                  {/* Loading State */}
                  {isAnalyzing && (
                    <div className="bg-slate-900/90 border border-[#A068FF]/40 rounded-2xl p-8 sm:p-12 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 py-20 animate-pulse">
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

                  {/* Real-time Analysis Overview Verdict */}
                  {!isAnalyzing && analysis && (
                    <AnalysisOverview
                      analysis={analysis}
                      onExportReport={() => {
                        const reportEl = document.getElementById('cybersentinel-action-center');
                        if (reportEl) reportEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  )}

                </div>

              </div>

              {/* Deep Multi-Layer Intelligence Workspace */}
              {!isAnalyzing && analysis && (
                <div className="space-y-8 pt-4">
                  
                  {/* Navigation View Filter Bar */}
                  <div className="flex items-center justify-between flex-wrap gap-3 p-2 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md sticky top-4 z-20 shadow-xl">
                    <div className="flex items-center gap-2 overflow-x-auto p-1 text-xs">
                      <button
                        onClick={() => setActiveTab('all')}
                        className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                          activeTab === 'all'
                            ? 'bg-[#A068FF]/30 text-white border border-[#A068FF]/50 shadow-md'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>All Intelligence Layers</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('explainable')}
                        className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                          activeTab === 'explainable'
                            ? 'bg-[#A068FF]/30 text-white border border-[#A068FF]/50 shadow-md'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                        <span>Explainable Evidence</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('multilayer')}
                        className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                          activeTab === 'multilayer'
                            ? 'bg-[#A068FF]/30 text-white border border-[#A068FF]/50 shadow-md'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <Brain className="w-3.5 h-3.5 text-purple-400" />
                        <span>6-Perspective Matrix</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('dna_chain')}
                        className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                          activeTab === 'dna_chain'
                            ? 'bg-[#A068FF]/30 text-white border border-[#A068FF]/50 shadow-md'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <Flame className="w-3.5 h-3.5 text-rose-400" />
                        <span>Attack DNA & Chain</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('trust_impact')}
                        className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                          activeTab === 'trust_impact'
                            ? 'bg-[#A068FF]/30 text-white border border-[#A068FF]/50 shadow-md'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <Network className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Trust Graph & Impact</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-400 font-mono hidden md:flex items-center gap-2 pr-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Interactive Threat Layers</span>
                    </div>
                  </div>

                  {/* 2. Explainable AI Red-Flag Highlighting & Evidence Inspector */}
                  {(activeTab === 'all' || activeTab === 'explainable') && (
                    <ExplainableMessageViewer
                      content={input.content}
                      flags={analysis.highlightedFlags || []}
                      whyDangerous={analysis.whyDangerousExplanation || []}
                    />
                  )}

                  {/* 3. Multi-Layer Threat Intelligence (6 Perspectives Matrix) */}
                  {(activeTab === 'all' || activeTab === 'multilayer') && (
                    <MultiLayerAnalysisView analysis={analysis} />
                  )}

                  {/* 4. Attack DNA & 5. Psychological Manipulation Chain */}
                  {(activeTab === 'all' || activeTab === 'dna_chain') && (
                    <div className="space-y-8">
                      <AttackDNAPanel techniques={analysis.attackDNA || []} />
                      <ManipulationChainVisualizer steps={analysis.manipulationChain || []} />
                    </div>
                  )}

                  {/* 6. Trust Graph & 7. Projected Impact Simulation */}
                  {(activeTab === 'all' || activeTab === 'trust_impact') && (
                    <div className="space-y-8">
                      <TrustGraphVisualizer trustGraph={analysis.trustGraph} />
                      <ProjectedImpactSimulator impact={analysis.projectedImpact} />
                    </div>
                  )}

                  {/* 8. Actionable Recommendations & SOC Incident Response */}
                  <div id="cybersentinel-action-center">
                    <RecommendationsActionCenter
                      recommendations={analysis.recommendations || []}
                      analysis={analysis}
                    />
                  </div>

                </div>
              )}

            </div>
          </main>

          {/* Dedicated Scanner Footer */}
          <footer className="border-t border-slate-800 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigateTo('home')}
                  className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                >
                  ← Return to Home
                </button>
                <span className="text-slate-700">|</span>
                <span className="font-semibold text-slate-300">CyberSentinel AI Threat Engine</span>
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

        </div>
      )}

      {/* 10-Stage Evaluation Pitch Modal */}
      <JudgePitchModal
        isOpen={isJudgeModalOpen}
        onClose={() => setIsJudgeModalOpen(false)}
      />
    </div>
  );
}




