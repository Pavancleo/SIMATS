import React, { useState, useEffect } from 'react';

interface TypewriterHeadingProps {
  text?: string;
  speedMs?: number;
  startDelayMs?: number;
  onComplete?: () => void;
}

const FULL_TEXT = "Detect AI-Powered Phishing & Social Engineering Attacks That Evade Traditional Filters -- Now Powered by Explainable Cyber AI!";
const BLACK_TEXT_LEN = 88;

export const TypewriterHeading: React.FC<TypewriterHeadingProps> = ({
  text = FULL_TEXT,
  speedMs = 35,
  startDelayMs = 400,
  onComplete,
}) => {
  const [charCount, setCharCount] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      timer = setInterval(() => {
        setCharCount((prev) => {
          if (prev >= text.length) {
            clearInterval(timer);
            setIsDone(true);
            if (onComplete) onComplete();
            return text.length;
          }
          return prev + 1;
        });
      }, speedMs);
    }, startDelayMs);

    return () => {
      clearTimeout(startTimeout);
      if (timer) clearInterval(timer);
    };
  }, [text, speedMs, startDelayMs, onComplete]);

  const blackPart = text.slice(0, Math.min(charCount, BLACK_TEXT_LEN));
  const whitePart = charCount > BLACK_TEXT_LEN ? text.slice(BLACK_TEXT_LEN, charCount) : '';

  return (
    <h1
      id="hero-typewriter-heading"
      className="hero-heading select-none"
      style={{
        fontFamily: "'Urbanist', sans-serif",
        fontWeight: 600,
        letterSpacing: '-1.5px',
      }}
    >
      <span className="text-[#000000]">{blackPart}</span>
      {whitePart && <span className="text-[#ffffff]">{whitePart}</span>}
      <span
        className={`inline-block ml-1 font-normal select-none ${
          isDone ? 'cursor-blink' : 'cursor-typing'
        }`}
        style={{
          color: '#A068FF',
          transform: 'translateY(-2px)',
        }}
        aria-hidden="true"
      >
        |
      </span>
    </h1>
  );
};



