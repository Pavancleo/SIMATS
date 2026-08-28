import React from 'react';
import { Shield } from 'lucide-react';

const NAV_LINKS = [
  { label: 'NLP & Intent', href: '#nlp' },
  { label: 'URL Analysis', href: '#url' },
  { label: 'Anomaly Detection', href: '#anomaly' },
  { label: 'Explainable AI', href: '#explainable' },
];

export const Header: React.FC = () => {
  return (
    <header
      id="main-header"
      className="header-fade-down w-full max-w-[1920px] mx-auto flex items-center justify-between z-50 select-none"
    >
      {/* Left side: Logo + Navigation */}
      <div className="flex items-center gap-10 lg:gap-14">
        <a href="#" className="flex items-center gap-2.5 group cursor-pointer" id="header-logo-link">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A068FF] to-[#070319] flex items-center justify-center border border-[#A068FF]/50 shadow-md">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-[#000000] font-bold text-[20px] tracking-tight font-['Urbanist']">
            CyberSentinel
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 lg:gap-9" id="primary-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-[#000000] text-[15px] font-normal tracking-[-0.2px]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Right side: Log In + Scan Threat */}
      <div className="flex items-center gap-7 lg:gap-8">
        <button
          onClick={() => {
            const el = document.getElementById('cybersentinel-workspace');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          id="header-login-link"
          className="login-link text-[#ffffff] text-[15px] font-medium tracking-[-0.2px] bg-transparent border-none cursor-pointer"
        >
          Live SOC
        </button>

        <div className="btn-border-wrap" id="join-now-wrap">
          <button
            type="button"
            id="join-now-button"
            onClick={() => {
              const el = document.getElementById('cybersentinel-workspace');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-join"
          >
            <span className="relative z-10">Scan Threat</span>
          </button>
        </div>
      </div>
    </header>
  );
};

