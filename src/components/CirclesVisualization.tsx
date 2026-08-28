import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface AvatarConfig {
  id: string;
  imgUrl: string;
  orbitIndex: 1 | 2 | 3 | 4;
  angleDeg: number;
  radiusPx: number;
  sizePx: number;
  borderRadius: string;
  glowType: 'purple' | 'yellow' | 'pink' | 'blue' | 'orange';
  flyInDelaySec: number;
}

const AVATARS: AvatarConfig[] = [
  {
    id: 'av-orbit1-1',
    imgUrl: 'https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png',
    orbitIndex: 1,
    angleDeg: 270,
    radiusPx: 177,
    sizePx: 58,
    borderRadius: '20px',
    glowType: 'purple',
    flyInDelaySec: 0.6,
  },
  {
    id: 'av-orbit2-1',
    imgUrl: 'https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png',
    orbitIndex: 2,
    angleDeg: 60,
    radiusPx: 251,
    sizePx: 58,
    borderRadius: '50%',
    glowType: 'yellow',
    flyInDelaySec: 0.8,
  },
  {
    id: 'av-orbit2-2',
    imgUrl: 'https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png',
    orbitIndex: 2,
    angleDeg: 180,
    radiusPx: 251,
    sizePx: 78,
    borderRadius: '50%',
    glowType: 'pink',
    flyInDelaySec: 1.0,
  },
  {
    id: 'av-orbit2-3',
    imgUrl: 'https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png',
    orbitIndex: 2,
    angleDeg: 300,
    radiusPx: 251,
    sizePx: 58,
    borderRadius: '20px',
    glowType: 'blue',
    flyInDelaySec: 1.2,
  },
  {
    id: 'av-orbit3-1',
    imgUrl: 'https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png',
    orbitIndex: 3,
    angleDeg: 130,
    radiusPx: 325,
    sizePx: 88,
    borderRadius: '50%',
    glowType: 'pink',
    flyInDelaySec: 1.4,
  },
  {
    id: 'av-orbit4-1',
    imgUrl: 'https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png',
    orbitIndex: 4,
    angleDeg: 30,
    radiusPx: 399,
    sizePx: 58,
    borderRadius: '50%',
    glowType: 'purple',
    flyInDelaySec: 1.6,
  },
  {
    id: 'av-orbit4-2',
    imgUrl: 'https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png',
    orbitIndex: 4,
    angleDeg: 95,
    radiusPx: 399,
    sizePx: 88,
    borderRadius: '24px',
    glowType: 'orange',
    flyInDelaySec: 1.8,
  },
  {
    id: 'av-orbit4-3',
    imgUrl: 'https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png',
    orbitIndex: 4,
    angleDeg: 220,
    radiusPx: 399,
    sizePx: 88,
    borderRadius: '24px',
    glowType: 'pink',
    flyInDelaySec: 2.0,
  },
  {
    id: 'av-orbit4-4',
    imgUrl: 'https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png',
    orbitIndex: 4,
    angleDeg: 320,
    radiusPx: 399,
    sizePx: 58,
    borderRadius: '50%',
    glowType: 'purple',
    flyInDelaySec: 2.3,
  },
];

const GLOW_CLASSES: Record<AvatarConfig['glowType'], string> = {
  purple: 'glow-purple',
  yellow: 'glow-yellow',
  pink: 'glow-pink',
  blue: 'glow-blue',
  orange: 'glow-orange',
};

export const CirclesVisualization: React.FC = () => {
  const count = useCountUp(20, 2000, 1200);

  return (
    <div
      id="hero-circles-wrapper"
      className="hero-right-scale-in relative flex items-center justify-center select-none"
    >
      <div
        id="circles-container"
        className="circles-viewport relative flex items-center justify-center"
      >
        {/* Orbit 4 (Outermost: 797px diameter, CCW 60s) */}
        <div
          className="orbit orbit-4 spin-left-60"
          style={{ width: '797px', height: '797px' }}
        >
          <div className="orbit-ring" />
          {AVATARS.filter((a) => a.orbitIndex === 4).map((avatar) => (
            <div
              key={avatar.id}
              className="avatar-positioner"
              style={{
                transform: `translate(-50%, -50%) rotate(${avatar.angleDeg}deg) translate(${avatar.radiusPx}px) rotate(-${avatar.angleDeg}deg)`,
              }}
            >
              <div
                className={`avatar-fly-in spin-right-60 ${GLOW_CLASSES[avatar.glowType]}`}
                style={{
                  width: `${avatar.sizePx}px`,
                  height: `${avatar.sizePx}px`,
                  borderRadius: avatar.borderRadius,
                  animationDelay: `${avatar.flyInDelaySec}s`,
                }}
              >
                <img
                  src={avatar.imgUrl}
                  alt="Talent specialist"
                  className="w-full h-full object-cover"
                  style={{ borderRadius: avatar.borderRadius }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Orbit 3 (649px diameter, CW 50s) */}
        <div
          className="orbit orbit-3 spin-right-50"
          style={{ width: '649px', height: '649px' }}
        >
          <div className="orbit-ring" />
          {AVATARS.filter((a) => a.orbitIndex === 3).map((avatar) => (
            <div
              key={avatar.id}
              className="avatar-positioner"
              style={{
                transform: `translate(-50%, -50%) rotate(${avatar.angleDeg}deg) translate(${avatar.radiusPx}px) rotate(-${avatar.angleDeg}deg)`,
              }}
            >
              <div
                className={`avatar-fly-in spin-left-50 ${GLOW_CLASSES[avatar.glowType]}`}
                style={{
                  width: `${avatar.sizePx}px`,
                  height: `${avatar.sizePx}px`,
                  borderRadius: avatar.borderRadius,
                  animationDelay: `${avatar.flyInDelaySec}s`,
                }}
              >
                <img
                  src={avatar.imgUrl}
                  alt="Talent specialist"
                  className="w-full h-full object-cover"
                  style={{ borderRadius: avatar.borderRadius }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Orbit 2 (501px diameter, CW 40s) */}
        <div
          className="orbit orbit-2 spin-right-40"
          style={{ width: '501px', height: '501px' }}
        >
          <div className="orbit-ring" />
          {AVATARS.filter((a) => a.orbitIndex === 2).map((avatar) => (
            <div
              key={avatar.id}
              className="avatar-positioner"
              style={{
                transform: `translate(-50%, -50%) rotate(${avatar.angleDeg}deg) translate(${avatar.radiusPx}px) rotate(-${avatar.angleDeg}deg)`,
              }}
            >
              <div
                className={`avatar-fly-in spin-left-40 ${GLOW_CLASSES[avatar.glowType]}`}
                style={{
                  width: `${avatar.sizePx}px`,
                  height: `${avatar.sizePx}px`,
                  borderRadius: avatar.borderRadius,
                  animationDelay: `${avatar.flyInDelaySec}s`,
                }}
              >
                <img
                  src={avatar.imgUrl}
                  alt="Talent specialist"
                  className="w-full h-full object-cover"
                  style={{ borderRadius: avatar.borderRadius }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Orbit 1 (Innermost: 353px diameter, CCW 30s) */}
        <div
          className="orbit orbit-1 spin-left-30"
          style={{ width: '353px', height: '353px' }}
        >
          <div className="orbit-ring" />
          {AVATARS.filter((a) => a.orbitIndex === 1).map((avatar) => (
            <div
              key={avatar.id}
              className="avatar-positioner"
              style={{
                transform: `translate(-50%, -50%) rotate(${avatar.angleDeg}deg) translate(${avatar.radiusPx}px) rotate(-${avatar.angleDeg}deg)`,
              }}
            >
              <div
                className={`avatar-fly-in spin-right-30 ${GLOW_CLASSES[avatar.glowType]}`}
                style={{
                  width: `${avatar.sizePx}px`,
                  height: `${avatar.sizePx}px`,
                  borderRadius: avatar.borderRadius,
                  animationDelay: `${avatar.flyInDelaySec}s`,
                }}
              >
                <img
                  src={avatar.imgUrl}
                  alt="Talent specialist"
                  className="w-full h-full object-cover"
                  style={{ borderRadius: avatar.borderRadius }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Center Content: "99.8%" and "Threat Detection" */}
        <div
          id="center-specialists-stat"
          className="absolute inset-0 m-auto z-30 flex flex-col items-center justify-center pointer-events-none"
          style={{ width: '220px', height: '220px' }}
        >
          <div className="flex flex-col items-center text-center">
            <span
              className="text-white text-[56px] sm:text-[64px] font-medium leading-[1.05] tracking-tight drop-shadow-md"
              style={{ fontFamily: "'Urbanist', sans-serif" }}
            >
              {count}.8%
            </span>
            <span
              className="text-white/95 text-[15px] sm:text-[16px] font-semibold tracking-[0.2px] mt-1 drop-shadow-sm uppercase"
              style={{ fontFamily: "'Urbanist', sans-serif" }}
            >
              Threat Detection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


