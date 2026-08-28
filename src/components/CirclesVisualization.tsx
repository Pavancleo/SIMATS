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

        {/* Center Content: Uiverse Gooey Liquid Orbital Pulse */}
        <div
          id="center-specialists-stat"
          className="absolute inset-0 m-auto z-30 flex flex-col items-center justify-center pointer-events-none"
          style={{ width: '220px', height: '220px' }}
        >
          {/* From Uiverse.io by prikshit_1236 */}
          <div className="pb-ball pb-ball-1">
            <div className="pb-ball pb-ball-2" />
            <div className="pb-ball pb-ball-3" />
          </div>

          {/* SVG Gooey Liquid Filter */}
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
            <defs>
              <filter id="gooey-liquid">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};


