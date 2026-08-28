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
import { FeaturesNavBar, FeatureTabType } from './components/FeaturesNavBar';
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
  Info,
  Dna,
  GitCommit,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'scanner'>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#scanner')) {
      return 'scanner';
    }
    return 'home';
  });

  const [activeTab, setActiveTab] = useState<FeatureTabType>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#scanner/')) {
      const subRoute = window.location.hash.replace('#scanner/', '') as FeatureTabType;
      const validRoutes: FeatureTabType[] = ['ingest', 'explainable', 'matrix', 'dna', 'chain', 'trust', 'impact', 'remediation', 'overview'];
      if (validRoutes.includes(subRoute)) {
        return subRoute;
      }
    }
    return 'ingest';
  });

  const [selectedSample, setSelectedSample] = useState<SampleThreatItem>(SAMPLE_THREATS[0]);
  const [input, setInput] = useState<ThreatInput>(SAMPLE_THREATS[0].input);
  const [analysis, setAnalysis] = useState<FullThreatAnalysisResult | null>(() => generateDynamicHeuristicAnalysis(SAMPLE_THREATS[0].input));
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync with browser hash for back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#scanner')) {
        setCurrentView('scanner');
        const subRoute = hash.replace('#scanner/', '') as FeatureTabType;
        const validRoutes: FeatureTabType[] = ['ingest', 'explainable', 'matrix', 'dna', 'chain', 'trust', 'impact', 'remediation', 'overview'];
        if (validRoutes.includes(subRoute)) {
          setActiveTab(subRoute);
        } else {
          setActiveTab('ingest');
        }
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: 'home' | 'scanner', initialTab?: FeatureTabType) => {
    setCurrentView(view);
    const targetTab = initialTab || 'ingest';
    setActiveTab(targetTab);
    if (view === 'scanner') {
      window.location.hash = `scanner/${targetTab}`;
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const switchFeaturePage = (tab: FeatureTabType) => {
    setActiveTab(tab);
    window.location.hash = `scanner/${tab}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
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
    navigateTo('scanner', 'explainable');
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

  // Feature ordered list for bottom pager (Ingestion -> Deep Analysis -> SOC Playbook -> Final Verdict)
  const ALL_PAGES: { id: FeatureTabType; label: string }[] = [
    { id: 'ingest', label: 'Scan Input / Ingestion' },
    { id: 'explainable', label: 'Explainable AI Evidence' },
    { id: 'matrix', label: '6-Perspective Matrix' },
    { id: 'dna', label: 'Attack DNA & MITRE' },
    { id: 'chain', label: 'Manipulation Chain' },
    { id: 'trust', label: 'Trust Graph' },
    { id: 'impact', label: 'Breach Impact' },
    { id: 'remediation', label: 'SOC Playbook' },
    { id: 'overview', label: 'Executive Verdict & Summary' },
  ];

  const currentIdx = ALL_PAGES.findIndex((p) => p.id === activeTab);
  const prevPage = currentIdx > 0 ? ALL_PAGES[currentIdx - 1] : null;
  const nextPage = currentIdx < ALL_PAGES.length - 1 ? ALL_PAGES[currentIdx + 1] : null;

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
              <HeroLeft onScanThreat={() => navigateTo('scanner', 'ingest')} />

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
                    onClick={() => navigateTo('scanner', 'ingest')}
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
        <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300 min-h-screen">
          
          {/* Dedicated Scanner Header */}
          <Header
            currentView="scanner"
            onNavigate={navigateTo}
            onOpenPitch={() => setIsJudgeModalOpen(true)}
          />

          {/* Scanner Page Content */}
          <main className="flex-1 w-full bg-slate-950/95 py-4 sm:py-6 px-4 sm:px-6 lg:px-8 relative z-30">
            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Dedicated Sticky Features Navigation Bar */}
              <FeaturesNavBar
                activeTab={activeTab}
                setActiveTab={switchFeaturePage}
                analysis={analysis}
                selectedSampleId={selectedSample?.id || ''}
                onSelectSampleById={handleSelectSampleById}
                isAnalyzing={isAnalyzing}
                onReAnalyze={() => runAnalysis()}
                onNavigateHome={() => navigateTo('home')}
              />

              {/* Loading State Banner */}
              {isAnalyzing && (
                <div className="bg-slate-900/90 border border-[#A068FF]/40 rounded-2xl p-8 sm:p-12 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 py-16 animate-pulse">
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

              {/* =========================================================
                  FEATURE PAGE 1: VERDICT & EXECUTIVE DASHBOARD OVERVIEW
                  ========================================================= */}
              {!isAnalyzing && analysis && activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Problem Statement Mission Bar */}
                  <div className="container">
                    <div className="card p-5 sm:p-6 shadow-2xl relative overflow-hidden">
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
                            Executive Verdict & Threat Intelligence Dashboard
                          </h2>
                          <p className="desc text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Comprehensive evaluation combining neural linguistics, cognitive bias profiling, deceptive domain telemetry, and projected blast radius.
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

                  {/* Real-Time Analysis Overview Card */}
                  <AnalysisOverview
                    analysis={analysis}
                    onExportReport={() => switchFeaturePage('remediation')}
                  />

                  {/* Interactive Feature Pages Directory (Click to Open Dedicated Feature Page) */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#A068FF] animate-pulse" />
                        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">
                          Dedicated Threat Intelligence Pages
                        </h3>
                      </div>
                      <span className="text-xs text-slate-400">
                        Click any feature to open its dedicated view
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Card 1: Input / Ingestion */}
                      <div className="container">
                        <div
                          onClick={() => switchFeaturePage('ingest')}
                          className="card p-5 cursor-pointer hover:border-blue-500/60 hover:scale-[1.02] transition-all group flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                              <Terminal className="w-4 h-4" />
                            </div>
                            <h4 className="innerText text-sm font-bold group-hover:text-blue-300 transition-colors">
                              Scan Ingestion & Protocol
                            </h4>
                            <p className="desc text-xs text-slate-400 line-clamp-3">
                              Inspect message content, target URLs, sender headers, SPF, DKIM, and DMARC alignment.
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-semibold group-hover:text-white">
                            <span>Open Ingestion Page</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 2: Explainable AI */}
                      <div className="container">
                        <div
                          onClick={() => switchFeaturePage('explainable')}
                          className="card p-5 cursor-pointer hover:border-teal-500/60 hover:scale-[1.02] transition-all group flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <h4 className="innerText text-sm font-bold group-hover:text-teal-300 transition-colors">
                              Explainable AI Evidence
                            </h4>
                            <p className="desc text-xs text-slate-400 line-clamp-3">
                              Interactive highlighted red-flags in message text and deep cognitive explanations.
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-teal-400 font-semibold group-hover:text-white">
                            <span>Open Evidence Page</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 3: 6-Layer Matrix */}
                      <div className="container">
                        <div
                          onClick={() => switchFeaturePage('matrix')}
                          className="card p-5 cursor-pointer hover:border-purple-500/60 hover:scale-[1.02] transition-all group flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                              <Brain className="w-4 h-4" />
                            </div>
                            <h4 className="innerText text-sm font-bold group-hover:text-purple-300 transition-colors">
                              6-Perspective Matrix
                            </h4>
                            <p className="desc text-xs text-slate-400 line-clamp-3">
                              NLP semantics, social engineering triggers, deceptive links, sender identity, behavioral anomaly, and context.
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-semibold group-hover:text-white">
                            <span>Open Matrix Page</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 4: Attack DNA */}
                      <div className="container">
                        <div
                          onClick={() => switchFeaturePage('dna')}
                          className="card p-5 cursor-pointer hover:border-rose-500/60 hover:scale-[1.02] transition-all group flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                              <Dna className="w-4 h-4" />
                            </div>
                            <h4 className="innerText text-sm font-bold group-hover:text-rose-300 transition-colors">
                              Attack DNA & MITRE
                            </h4>
                            <p className="desc text-xs text-slate-400 line-clamp-3">
                              MITRE ATT&CK technique IDs, genetic attack markers, and severity weights.
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-rose-400 font-semibold group-hover:text-white">
                            <span>Open Attack DNA</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 5: Manipulation Chain */}
                      <div className="container">
                        <div
                          onClick={() => switchFeaturePage('chain')}
                          className="card p-5 cursor-pointer hover:border-amber-500/60 hover:scale-[1.02] transition-all group flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                              <GitCommit className="w-4 h-4" />
                            </div>
                            <h4 className="innerText text-sm font-bold group-hover:text-amber-300 transition-colors">
                              Manipulation Chain
                            </h4>
                            <p className="desc text-xs text-slate-400 line-clamp-3">
                              Step-by-step cognitive exploitation timeline reconstructing attacker persuasion steps.
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold group-hover:text-white">
                            <span>Open Chain Timeline</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 6: Trust Graph */}
                      <div className="container">
                        <div
                          onClick={() => switchFeaturePage('trust')}
                          className="card p-5 cursor-pointer hover:border-cyan-500/60 hover:scale-[1.02] transition-all group flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                              <Network className="w-4 h-4" />
                            </div>
                            <h4 className="innerText text-sm font-bold group-hover:text-cyan-300 transition-colors">
                              Trust Graph Mapping
                            </h4>
                            <p className="desc text-xs text-slate-400 line-clamp-3">
                              Visual entity relationship graph mapping claimed vs actual trust boundaries and DNS.
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:text-white">
                            <span>Open Trust Graph</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 7: Impact Simulator */}
                      <div className="container">
                        <div
                          onClick={() => switchFeaturePage('impact')}
                          className="card p-5 cursor-pointer hover:border-orange-500/60 hover:scale-[1.02] transition-all group flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                              <Flame className="w-4 h-4" />
                            </div>
                            <h4 className="innerText text-sm font-bold group-hover:text-orange-300 transition-colors">
                              Breach Impact Simulation
                            </h4>
                            <p className="desc text-xs text-slate-400 line-clamp-3">
                              Blast radius projections across financial loss, compliance fines, and data breach.
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-orange-400 font-semibold group-hover:text-white">
                            <span>Open Impact Simulator</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 8: SOC Playbook */}
                      <div className="container">
                        <div
                          onClick={() => switchFeaturePage('remediation')}
                          className="card p-5 cursor-pointer hover:border-emerald-500/60 hover:scale-[1.02] transition-all group flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                            <h4 className="innerText text-sm font-bold group-hover:text-emerald-300 transition-colors">
                              SOC Remediation Playbook
                            </h4>
                            <p className="desc text-xs text-slate-400 line-clamp-3">
                              Immediate tactical checklist, executive summaries, and exportable Markdown/JSON reports.
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-semibold group-hover:text-white">
                            <span>Open SOC Playbook</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  FEATURE PAGE 2: SCAN INGESTION & PROTOCOL INSPECTOR
                  ========================================================= */}
              {!isAnalyzing && activeTab === 'ingest' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-blue-400" />
                        <span>Suspicious Content Ingestion & Protocol Inspector</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Ingest emails, SMS, social DMs, web URLs, or custom text with email protocol authentication headers
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-8">
                      <InputPanel
                        input={input}
                        setInput={setInput}
                        onAnalyze={() => {
                          runAnalysis();
                          switchFeaturePage('explainable');
                        }}
                        isAnalyzing={isAnalyzing}
                        onSelectSampleById={handleSelectSampleById}
                      />
                    </div>

                    <div className="lg:col-span-4 space-y-4">
                      {selectedSample && (
                        <div className="container">
                          <div className="card p-5 text-xs text-slate-400 space-y-3 shadow-lg">
                            <div className="flex items-center justify-between text-slate-300 font-medium">
                              <span className="font-semibold text-slate-200">Loaded Threat Scenario:</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                selectedSample.threatLevelExpected === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                                selectedSample.threatLevelExpected === 'High' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' :
                                selectedSample.threatLevelExpected === 'Suspicious' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                                selectedSample.threatLevelExpected === 'Moderate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' :
                                selectedSample.threatLevelExpected === 'Low' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                                'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              }`}>
                                {selectedSample.badge}
                              </span>
                            </div>
                            <p className="innerText text-base font-semibold">{selectedSample.name}</p>
                            <p className="desc text-xs leading-relaxed">{selectedSample.description}</p>
                            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                              <button
                                onClick={() => {
                                  runAnalysis();
                                  switchFeaturePage('explainable');
                                }}
                                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#A068FF] to-cyan-500 text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                              >
                                Run AI Analysis & View Findings →
                              </button>
                              <button
                                onClick={() => {
                                  runAnalysis();
                                  switchFeaturePage('overview');
                                }}
                                className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#A068FF] text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                              >
                                Jump Directly to Final Verdict 🛡️
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  FEATURE PAGE 3: EXPLAINABLE AI EVIDENCE INSPECTOR
                  ========================================================= */}
              {!isAnalyzing && analysis && activeTab === 'explainable' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-teal-400" />
                        <span>Explainable AI Red-Flag & Linguistic Evidence Inspector</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Word-level red-flag token mapping, cognitive bias rationales, and psychological lure explanations
                      </p>
                    </div>
                  </div>

                  <ExplainableMessageViewer
                    content={input.content}
                    flags={analysis.highlightedFlags || []}
                    whyDangerous={analysis.whyDangerousExplanation || []}
                  />
                </div>
              )}

              {/* =========================================================
                  FEATURE PAGE 4: 6-PERSPECTIVE MULTI-LAYER MATRIX
                  ========================================================= */}
              {!isAnalyzing && analysis && activeTab === 'matrix' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <span>6-Perspective Multi-Layer Intelligence Matrix</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Deep evaluation across NLP semantic, social engineering, URL/domain, sender identity, behavioral anomaly, and context
                      </p>
                    </div>
                  </div>

                  <MultiLayerAnalysisView analysis={analysis} />
                </div>
              )}

              {/* =========================================================
                  FEATURE PAGE 5: ATTACK DNA & MITRE ATT&CK MAPPING
                  ========================================================= */}
              {!isAnalyzing && analysis && activeTab === 'dna' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Dna className="w-5 h-5 text-rose-400" />
                        <span>Attack DNA Breakdown & MITRE ATT&CK Matrix Alignment</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Genetic signature breakdown mapping threats directly to MITRE ATT&CK framework techniques
                      </p>
                    </div>
                  </div>

                  <AttackDNAPanel techniques={analysis.attackDNA || []} />
                </div>
              )}

              {/* =========================================================
                  FEATURE PAGE 6: COGNITIVE MANIPULATION CHAIN
                  ========================================================= */}
              {!isAnalyzing && analysis && activeTab === 'chain' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <GitCommit className="w-5 h-5 text-amber-400" />
                        <span>Psychological Manipulation Chain Reconstruction</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        5-Stage cognitive persuasion sequence tracing from initial hook to final exploitation
                      </p>
                    </div>
                  </div>

                  <ManipulationChainVisualizer steps={analysis.manipulationChain || []} />
                </div>
              )}

              {/* =========================================================
                  FEATURE PAGE 7: TRUST GRAPH & RELATIONAL MAPPING
                  ========================================================= */}
              {!isAnalyzing && analysis && activeTab === 'trust' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Network className="w-5 h-5 text-cyan-400" />
                        <span>Trust Graph & Relational Identity Mapping</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Interactive entity trust boundaries comparing claimed organizational identity against verified SPF/DKIM DNS telemetry
                      </p>
                    </div>
                  </div>

                  <TrustGraphVisualizer trustGraph={analysis.trustGraph} />
                </div>
              )}

              {/* =========================================================
                  FEATURE PAGE 8: BREACH IMPACT & BLAST RADIUS SIMULATION
                  ========================================================= */}
              {!isAnalyzing && analysis && activeTab === 'impact' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-400" />
                        <span>Projected Breach Impact & Blast Radius Simulation</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Simulates hypothetical organizational damage across financial loss, operational disruption, and compliance fines
                      </p>
                    </div>
                  </div>

                  <ProjectedImpactSimulator impact={analysis.projectedImpact} />
                </div>
              )}

              {/* =========================================================
                  FEATURE PAGE 9: SOC REMEDIATION PLAYBOOK & ACTION CENTER
                  ========================================================= */}
              {!isAnalyzing && analysis && activeTab === 'remediation' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        <span>SOC Action Center & Remediation Playbook</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Actionable containment checklist, priority incident mitigation steps, and full SOC markdown export
                      </p>
                    </div>
                  </div>

                  <RecommendationsActionCenter
                    recommendations={analysis.recommendations || []}
                    analysis={analysis}
                  />
                </div>
              )}

              {/* Feature Pager Toolbar (Previous / Next Page Navigator) */}
              {!isAnalyzing && analysis && (
                <div className="flex items-center justify-between gap-3 p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl">
                  {prevPage ? (
                    <button
                      onClick={() => switchFeaturePage(prevPage.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                    >
                      <span>← {prevPage.label}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigateTo('home')}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                    >
                      <span>← Back to Landing</span>
                    </button>
                  )}

                  {activeTab !== 'overview' && (
                    <button
                      onClick={() => switchFeaturePage('overview')}
                      className="px-3 py-1.5 rounded-lg text-xs text-[#A068FF] hover:bg-[#A068FF]/10 font-semibold cursor-pointer"
                    >
                      Verdict Overview
                    </button>
                  )}

                  {nextPage && (
                    <button
                      onClick={() => switchFeaturePage(nextPage.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#A068FF] to-cyan-500 hover:from-[#8f4ff8] hover:to-cyan-400 text-white shadow-md transition-all cursor-pointer"
                    >
                      <span>{nextPage.label} →</span>
                    </button>
                  )}
                </div>
              )}

            </div>
          </main>

          {/* Dedicated Scanner Footer */}
          <footer className="border-t border-slate-800 bg-slate-950 py-4 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigateTo('home')}
                  className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                >
                  ← Return to Landing
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




