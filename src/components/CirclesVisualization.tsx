import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Brain, 
  Sparkles, 
  Globe, 
  Lock, 
  Terminal, 
  Cpu, 
  Target, 
  Dna, 
  Flame, 
  Zap, 
  ShieldAlert, 
  Network, 
  UserCheck,
  Radio,
  FileCode2
} from 'lucide-react';

interface CyberNodeConfig {
  id: string;
  orbitIndex: 1 | 2 | 3 | 4;
  angleDeg: number;
  radiusPx: number;
  sizePx: number;
  borderRadius: string;
  glowType: 'purple' | 'yellow' | 'pink' | 'blue' | 'orange';
  spinClass: string;
  title: string;
  subtitle: string;
  badgeTag: string;
  icon: React.ReactNode;
  bgGradient: string;
}

const CYBER_NODES: CyberNodeConfig[] = [
  // Orbit 1 (Innermost: diameter 353px, radius 176px, CCW 30s)
  {
    id: 'node-nlp-core',
    orbitIndex: 1,
    angleDeg: 270,
    radiusPx: 176,
    sizePx: 64,
    borderRadius: '18px',
    glowType: 'purple',
    spinClass: 'spin-right-30',
    title: 'Neural NLP Core',
    subtitle: 'Semantic Coercion Scanner',
    badgeTag: 'NLP AI',
    icon: <Brain className="w-6 h-6 text-[#A068FF]" />,
    bgGradient: 'linear-gradient(135deg, #1b0c36 0%, #070319 100%)',
  },

  // Orbit 2 (diameter 501px, radius 250px, CW 40s)
  {
    id: 'node-url-sentinel',
    orbitIndex: 2,
    angleDeg: 45,
    radiusPx: 250,
    sizePx: 60,
    borderRadius: '50%',
    glowType: 'yellow',
    spinClass: 'spin-left-40',
    title: 'URL & Domain Sentinel',
    subtitle: 'Typosquat & TLD Risk',
    badgeTag: 'URL Guard',
    icon: <Globe className="w-5 h-5 text-amber-400" />,
    bgGradient: 'linear-gradient(135deg, #2a1b05 0%, #0c0802 100%)',
  },
  {
    id: 'node-social-eng',
    orbitIndex: 2,
    angleDeg: 165,
    radiusPx: 250,
    sizePx: 76,
    borderRadius: '22px',
    glowType: 'pink',
    spinClass: 'spin-left-40',
    title: 'Social Engineering Lures',
    subtitle: 'Urgency & Fear Profiling',
    badgeTag: 'Cognitive',
    icon: <Flame className="w-7 h-7 text-rose-400" />,
    bgGradient: 'linear-gradient(135deg, #360d1b 0%, #150308 100%)',
  },
  {
    id: 'node-crypto-headers',
    orbitIndex: 2,
    angleDeg: 285,
    radiusPx: 250,
    sizePx: 60,
    borderRadius: '18px',
    glowType: 'blue',
    spinClass: 'spin-left-40',
    title: 'Auth Headers Cryptography',
    subtitle: 'SPF / DKIM / DMARC',
    badgeTag: 'Headers',
    icon: <Lock className="w-5 h-5 text-cyan-400" />,
    bgGradient: 'linear-gradient(135deg, #07253b 0%, #03101c 100%)',
  },

  // Orbit 3 (diameter 649px, radius 324px, CW 50s)
  {
    id: 'node-mitre-matrix',
    orbitIndex: 3,
    angleDeg: 135,
    radiusPx: 324,
    sizePx: 82,
    borderRadius: '24px',
    glowType: 'pink',
    spinClass: 'spin-left-50',
    title: 'MITRE ATT&CK Matrix',
    subtitle: 'Tactics & Techniques',
    badgeTag: 'MITRE',
    icon: <Target className="w-7 h-7 text-pink-400" />,
    bgGradient: 'linear-gradient(135deg, #380b2d 0%, #14030f 100%)',
  },
  {
    id: 'node-trust-graph-3',
    orbitIndex: 3,
    angleDeg: 315,
    radiusPx: 324,
    sizePx: 76,
    borderRadius: '22px',
    glowType: 'blue',
    spinClass: 'spin-left-50',
    title: 'Trust Graph Relational Engine',
    subtitle: 'Identity Envelope Validation',
    badgeTag: 'Trust Map',
    icon: <Network className="w-6 h-6 text-teal-300" />,
    bgGradient: 'linear-gradient(135deg, #083434 0%, #021414 100%)',
  },

  // Orbit 4 (Outermost: diameter 797px, radius 398px, CCW 60s)
  {
    id: 'node-malware-sandbox',
    orbitIndex: 4,
    angleDeg: 30,
    radiusPx: 398,
    sizePx: 62,
    borderRadius: '50%',
    glowType: 'purple',
    spinClass: 'spin-right-60',
    title: 'Malware & Attachment Detonator',
    subtitle: 'Static & Dynamic Heuristics',
    badgeTag: 'Sandbox',
    icon: <ShieldAlert className="w-5 h-5 text-purple-300" />,
    bgGradient: 'linear-gradient(135deg, #240a3e 0%, #090214 100%)',
  },
  {
    id: 'node-soc-automation',
    orbitIndex: 4,
    angleDeg: 120,
    radiusPx: 398,
    sizePx: 80,
    borderRadius: '24px',
    glowType: 'orange',
    spinClass: 'spin-right-60',
    title: 'SOC Autonomous Incident Response',
    subtitle: 'Zero-Hour Containment',
    badgeTag: 'SOC AI',
    icon: <Terminal className="w-7 h-7 text-amber-300" />,
    bgGradient: 'linear-gradient(135deg, #3d1c06 0%, #170a02 100%)',
  },
  {
    id: 'node-cognitive-dna',
    orbitIndex: 4,
    angleDeg: 210,
    radiusPx: 398,
    sizePx: 78,
    borderRadius: '22px',
    glowType: 'pink',
    spinClass: 'spin-right-60',
    title: 'Attack DNA Profiler',
    subtitle: 'Technique Fingerprinting',
    badgeTag: 'Attack DNA',
    icon: <Dna className="w-6 h-6 text-rose-300" />,
    bgGradient: 'linear-gradient(135deg, #380b2d 0%, #14030f 100%)',
  },
  {
    id: 'node-xai-inspector',
    orbitIndex: 4,
    angleDeg: 300,
    radiusPx: 398,
    sizePx: 62,
    borderRadius: '50%',
    glowType: 'blue',
    spinClass: 'spin-right-60',
    title: 'Explainable AI Rationale',
    subtitle: 'Evidence Highlighting',
    badgeTag: 'XAI',
    icon: <Sparkles className="w-5 h-5 text-cyan-300" />,
    bgGradient: 'linear-gradient(135deg, #072e42 0%, #02121c 100%)',
  },
];

const GLOW_CLASSES: Record<CyberNodeConfig['glowType'], string> = {
  purple: 'glow-purple',
  yellow: 'glow-yellow',
  pink: 'glow-pink',
  blue: 'glow-blue',
  orange: 'glow-orange',
};

export const CirclesVisualization: React.FC = () => {
  const [percentage, setPercentage] = useState<number>(1);
  const [scanDirection, setScanDirection] = useState<'up' | 'down'>('up');
  const [scanSpeed, setScanSpeed] = useState<number>(4820);
  const [latency, setLatency] = useState<number>(14);
  const [signalBars, setSignalBars] = useState<number[]>([40, 65, 85, 55, 90, 75, 60, 95]);

  // Continuously move from 1 to 100 and 100 to 1 with 30% reduced speed (65ms loop)
  useEffect(() => {
    let current = 1;
    let direction: 'up' | 'down' = 'up';
    let isPaused = false;

    const interval = setInterval(() => {
      if (isPaused) return;

      if (direction === 'up') {
        current += 1;

        if (current >= 100) {
          current = 100;
          direction = 'down';
          setScanDirection('down');
          isPaused = true;
          setTimeout(() => { isPaused = false; }, 400);
        }
      } else {
        current -= 1;

        if (current <= 1) {
          current = 1;
          direction = 'up';
          setScanDirection('up');
          isPaused = true;
          setTimeout(() => { isPaused = false; }, 400);
        }
      }

      setPercentage(current);
      setScanSpeed(Math.floor(3800 + (current * 42) + Math.random() * 60));
      setLatency(Math.floor(8 + (current % 12) + Math.random() * 2));
      setSignalBars([
        Math.floor(25 + Math.random() * 70),
        Math.floor(40 + Math.random() * 58),
        Math.floor(30 + Math.random() * 65),
        Math.floor(55 + Math.random() * 42),
        Math.floor(35 + Math.random() * 60),
        Math.floor(65 + Math.random() * 32),
        Math.floor(45 + Math.random() * 50),
        Math.floor(75 + Math.random() * 24),
      ]);
    }, 65); // 65ms: exactly 30% reduced speed from 45ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="hero-circles-wrapper"
      className="hero-right-scale-in relative flex items-center justify-center select-none"
    >
      <div
        id="circles-container"
        className="circles-viewport relative flex items-center justify-center"
      >
        {/* Orbit 4 (Outermost: 797px diameter, radius 398px, CCW 60s) */}
        <div
          className="orbit orbit-4 spin-left-60"
          style={{ width: '797px', height: '797px' }}
        >
          <div className="orbit-ring" />
          {CYBER_NODES.filter((a) => a.orbitIndex === 4).map((node) => (
            <div
              key={node.id}
              className="orbit-node-anchor"
              style={{
                transform: `rotate(${node.angleDeg}deg) translate(${node.radiusPx}px) rotate(-${node.angleDeg}deg)`,
              }}
            >
              <div
                className={`cyber-node-card ${node.spinClass} ${GLOW_CLASSES[node.glowType]} shadow-2xl group`}
                style={{
                  width: `${node.sizePx}px`,
                  height: `${node.sizePx}px`,
                  borderRadius: node.borderRadius,
                  background: node.bgGradient,
                }}
                title={`${node.title}: ${node.subtitle}`}
              >
                {/* Circuit Grid Subtle Texture */}
                <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(#A068FF_1px,transparent_1px)] [background-size:8px_8px] opacity-25 pointer-events-none" />
                
                {/* Cyber Icon */}
                <div className="relative z-10 flex items-center justify-center pointer-events-none">
                  {node.icon}
                </div>

                {/* Badge Tag */}
                <div className="absolute -bottom-2 z-20 px-1.5 py-0.5 rounded-full bg-slate-950/95 border border-slate-700 text-[8px] font-mono font-bold text-slate-200 shadow-md uppercase tracking-wider whitespace-nowrap pointer-events-none">
                  {node.badgeTag}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orbit 3 (649px diameter, radius 324px, CW 50s) */}
        <div
          className="orbit orbit-3 spin-right-50"
          style={{ width: '649px', height: '649px' }}
        >
          <div className="orbit-ring" />
          {CYBER_NODES.filter((a) => a.orbitIndex === 3).map((node) => (
            <div
              key={node.id}
              className="orbit-node-anchor"
              style={{
                transform: `rotate(${node.angleDeg}deg) translate(${node.radiusPx}px) rotate(-${node.angleDeg}deg)`,
              }}
            >
              <div
                className={`cyber-node-card ${node.spinClass} ${GLOW_CLASSES[node.glowType]} shadow-2xl group`}
                style={{
                  width: `${node.sizePx}px`,
                  height: `${node.sizePx}px`,
                  borderRadius: node.borderRadius,
                  background: node.bgGradient,
                }}
                title={`${node.title}: ${node.subtitle}`}
              >
                <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(#A068FF_1px,transparent_1px)] [background-size:8px_8px] opacity-25 pointer-events-none" />
                <div className="relative z-10 flex items-center justify-center pointer-events-none">
                  {node.icon}
                </div>
                <div className="absolute -bottom-2 z-20 px-1.5 py-0.5 rounded-full bg-slate-950/95 border border-slate-700 text-[8px] font-mono font-bold text-slate-200 shadow-md uppercase tracking-wider whitespace-nowrap pointer-events-none">
                  {node.badgeTag}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orbit 2 (501px diameter, radius 250px, CW 40s) */}
        <div
          className="orbit orbit-2 spin-right-40"
          style={{ width: '501px', height: '501px' }}
        >
          <div className="orbit-ring" />
          {CYBER_NODES.filter((a) => a.orbitIndex === 2).map((node) => (
            <div
              key={node.id}
              className="orbit-node-anchor"
              style={{
                transform: `rotate(${node.angleDeg}deg) translate(${node.radiusPx}px) rotate(-${node.angleDeg}deg)`,
              }}
            >
              <div
                className={`cyber-node-card ${node.spinClass} ${GLOW_CLASSES[node.glowType]} shadow-2xl group`}
                style={{
                  width: `${node.sizePx}px`,
                  height: `${node.sizePx}px`,
                  borderRadius: node.borderRadius,
                  background: node.bgGradient,
                }}
                title={`${node.title}: ${node.subtitle}`}
              >
                <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(#A068FF_1px,transparent_1px)] [background-size:8px_8px] opacity-25 pointer-events-none" />
                <div className="relative z-10 flex items-center justify-center pointer-events-none">
                  {node.icon}
                </div>
                <div className="absolute -bottom-2 z-20 px-1.5 py-0.5 rounded-full bg-slate-950/95 border border-slate-700 text-[8px] font-mono font-bold text-slate-200 shadow-md uppercase tracking-wider whitespace-nowrap pointer-events-none">
                  {node.badgeTag}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orbit 1 (Innermost: 353px diameter, radius 176px, CCW 30s) */}
        <div
          className="orbit orbit-1 spin-left-30"
          style={{ width: '353px', height: '353px' }}
        >
          <div className="orbit-ring" />
          {CYBER_NODES.filter((a) => a.orbitIndex === 1).map((node) => (
            <div
              key={node.id}
              className="orbit-node-anchor"
              style={{
                transform: `rotate(${node.angleDeg}deg) translate(${node.radiusPx}px) rotate(-${node.angleDeg}deg)`,
              }}
            >
              <div
                className={`cyber-node-card ${node.spinClass} ${GLOW_CLASSES[node.glowType]} shadow-2xl group`}
                style={{
                  width: `${node.sizePx}px`,
                  height: `${node.sizePx}px`,
                  borderRadius: node.borderRadius,
                  background: node.bgGradient,
                }}
                title={`${node.title}: ${node.subtitle}`}
              >
                <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(#A068FF_1px,transparent_1px)] [background-size:8px_8px] opacity-25 pointer-events-none" />
                <div className="relative z-10 flex items-center justify-center pointer-events-none">
                  {node.icon}
                </div>
                <div className="absolute -bottom-2 z-20 px-1.5 py-0.5 rounded-full bg-slate-950/95 border border-slate-700 text-[8px] font-mono font-bold text-slate-200 shadow-md uppercase tracking-wider whitespace-nowrap pointer-events-none">
                  {node.badgeTag}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Content: Dynamic Real-time Fluctuating Telemetry (1-100 & 100-1) */}
        <div
          id="center-specialists-stat"
          className="absolute inset-0 m-auto z-30 flex flex-col items-center justify-center pointer-events-none"
          style={{ width: '250px', height: '250px' }}
        >
          <div className="flex flex-col items-center text-center space-y-1.5 p-3.5 rounded-full bg-[#060218]/90 backdrop-blur-md border border-[#A068FF]/40 shadow-2xl shadow-purple-950/60">
            {/* Live Telemetry Beacon */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-[10px] font-mono text-emerald-300 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="tracking-wider uppercase font-bold">
                {scanDirection === 'up' ? '▲ Threat Scanning (1→100%)' : '▼ Calibrating (100→1%)'}
              </span>
            </div>

            {/* Dynamic Fluctuating Percentage (1 - 100 & 100 - 1) */}
            <div className="flex items-baseline justify-center">
              <span
                className="text-white text-[50px] sm:text-[58px] font-black leading-none tracking-tight font-mono drop-shadow-[0_0_25px_rgba(160,104,255,0.85)] tabular-nums"
                style={{ fontFamily: "'Urbanist', sans-serif" }}
              >
                {percentage}
              </span>
              <span className="text-[#A068FF] text-[28px] font-bold font-mono ml-0.5">%</span>
            </div>

            {/* Live Telemetry Equalizer Bars */}
            <div className="flex items-end gap-1 h-3 px-2">
              {signalBars.map((bar, idx) => (
                <div
                  key={idx}
                  className="w-1 rounded-full bg-gradient-to-t from-cyan-500 via-emerald-400 to-[#A068FF] transition-all duration-75"
                  style={{ height: `${bar}%` }}
                />
              ))}
            </div>

            {/* Subtitle */}
            <div className="space-y-0.5">
              <div className="text-cyan-300 text-[12px] font-extrabold tracking-[0.5px] uppercase font-mono">
                Live AI Threat Index
              </div>
              <div className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-2">
                <span>{scanSpeed} msg/s</span>
                <span>•</span>
                <span className="text-emerald-400">{latency}ms latency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


