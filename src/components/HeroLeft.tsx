import React from 'react';
import { TypewriterHeading } from './TypewriterHeading';

export const HeroLeft: React.FC = () => {
  return (
    <div
      id="hero-left-section"
      className="hero-left-fade-up flex flex-col justify-start relative z-20 w-full max-w-[600px] pt-2 sm:pt-4 md:pt-6 lg:pt-10"
      style={{ flex: '0 1 600px' }}
    >
      {/* Typewriter Main Heading */}
      <TypewriterHeading />

      {/* Action Area with CTA Button and SOC Cursor Tag */}
      <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-start relative">
        {/* Start Detection CTA Button */}
        <div
          className="btn-border-wrap hero-btn-animate"
          id="start-project-wrap"
          style={{ animationDelay: '3.2s' }}
        >
          <button
            type="button"
            id="start-project-button"
            onClick={() => {
              const el = document.getElementById('cybersentinel-workspace');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-start-project cursor-pointer"
          >
            <span className="relative z-10 text-[16px] font-medium text-white tracking-[-0.2px]">
              Scan Threat
            </span>
            <svg
              className="relative z-10 w-[18px] h-[18px] text-white transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* AI Sentinel Cursor Element */}
        <div
          id="david-cursor-element"
          className="david-cursor-animate absolute flex items-center gap-1 pointer-events-none select-none"
          style={{
            marginLeft: '290px',
            marginTop: '40px',
            animationDelay: '3.6s',
          }}
        >
          {/* Custom SVG Mouse Pointer */}
          <div className="relative -mt-3 -mr-1 z-10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-md"
            >
              <path
                d="M3.5 3.5L10.5 21L14 14L21 10.5L3.5 3.5Z"
                fill="#A068FF"
                stroke="#060218"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Pill Badge */}
          <div
            className="px-4 py-2 rounded-[20px] shadow-lg flex items-center justify-center"
            style={{
              backgroundColor: '#A068FF',
              boxShadow: '0 4px 14px rgba(160, 104, 255, 0.45)',
            }}
          >
            <span
              className="text-white text-[16px] font-medium leading-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              AI Sentinel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};



