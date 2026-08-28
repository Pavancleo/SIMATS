import React, { useEffect, useRef } from 'react';

interface CodexRevealBackgroundProps {
  fontSize?: number;
  maxOpacity?: number;
  textColor?: string; // RGB format: e.g. "255, 77, 79" or "160, 104, 255"
  className?: string;
}

export const CodexRevealBackground: React.FC<CodexRevealBackgroundProps> = ({
  fontSize = 15,
  maxOpacity = 0.35,
  textColor = '71, 85, 105', // Natural slate glyphs on light background
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const chars = ['·', '.', '-', '~', '=', '+', 'x', '*', '#', '%', '@'];
    const charsLen = chars.length - 1;

    // Grid properties
    const cellW = fontSize * 1.1;
    const cellH = fontSize * 1.4;
    let cols = 0;
    let rows = 0;

    // Cursor ripple physics points
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      strength: number;
      speed: number;
    }
    const ripples: Ripple[] = [];

    // Smooth cursor tracker
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };

    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = canvas.width = Math.floor(rect.width);
      height = canvas.height = Math.floor(rect.height);
      cols = Math.ceil(width / cellW);
      rows = Math.ceil(height / cellH);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const parentSection = container.closest('section') || container.parentElement || container;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const px = clientX - rect.left;
      const py = clientY - rect.top;

      if (px >= 0 && px <= rect.width && py >= 0 && py <= rect.height) {
        mouse.targetX = px;
        mouse.targetY = py;
        mouse.active = true;

        // Add periodic ripples on pointer move
        if (Math.random() > 0.4) {
          ripples.push({
            x: px,
            y: py,
            radius: 4,
            maxRadius: 160 + Math.random() * 80,
            strength: 1.0,
            speed: 3.5 + Math.random() * 2.0,
          });
          if (ripples.length > 25) ripples.shift();
        }
      } else {
        mouse.active = false;
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      // Burst ripples on click
      for (let i = 0; i < 3; i++) {
        ripples.push({
          x: px + (Math.random() - 0.5) * 20,
          y: py + (Math.random() - 0.5) * 20,
          radius: 2 + i * 15,
          maxRadius: 280 + i * 60,
          strength: 1.5,
          speed: 4.5 + i * 1.2,
        });
      }
      if (ripples.length > 30) ripples.splice(0, ripples.length - 30);
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    parentSection.addEventListener('mousemove', handlePointerMove as EventListener, { passive: true });
    parentSection.addEventListener('mousedown', handlePointerDown as EventListener, { passive: true });
    parentSection.addEventListener('mouseleave', handlePointerLeave as EventListener, { passive: true });
    parentSection.addEventListener('touchmove', handlePointerMove as EventListener, { passive: true });
    parentSection.addEventListener('touchstart', handlePointerDown as EventListener, { passive: true });

    let time = 0;

    const render = () => {
      if (!ctx || width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.025;

      // Smooth cursor lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.2;
      mouse.y += (mouse.targetY - mouse.y) * 0.2;

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.strength *= 0.97;
        if (r.radius >= r.maxRadius || r.strength < 0.02) {
          ripples.splice(i, 1);
        }
      }

      // Add gentle random ambient ripple occasionally
      if (Math.random() < 0.015 && ripples.length < 8) {
        ripples.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 2,
          maxRadius: 180 + Math.random() * 80,
          strength: 0.7,
          speed: 2.2,
        });
      }

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const numRipples = ripples.length;

      // Loop through visible grid cells
      for (let r = 0; r < rows; r++) {
        const cy = r * cellH + cellH / 2;

        for (let c = 0; c < cols; c++) {
          const cx = c * cellW + cellW / 2;

          // 1. Ambient gentle fluid wave
          let intensity =
            (Math.sin(cx * 0.012 + time * 0.8) * Math.cos(cy * 0.015 + time * 0.6) + 1) * 0.08;

          // 2. Cursor hover proximity glow
          if (mouse.active) {
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const mouseFactor = (1 - dist / 220);
              intensity += mouseFactor * mouseFactor * 0.75;
            }
          }

          // 3. Water ripples contribution
          for (let i = 0; i < numRipples; i++) {
            const rp = ripples[i];
            const dx = cx - rp.x;
            const dy = cy - rp.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const waveDist = Math.abs(dist - rp.radius);

            if (waveDist < 35) {
              const waveFactor = (1 - waveDist / 35) * rp.strength;
              intensity += waveFactor * 0.65;
            }
          }

          if (intensity > 0.04) {
            const charIdx = Math.min(Math.floor(intensity * (charsLen + 1)), charsLen);
            const char = chars[charIdx] || '·';
            const alpha = Math.min(intensity * maxOpacity, maxOpacity);

            ctx.fillStyle = `rgba(${textColor}, ${alpha.toFixed(3)})`;
            ctx.fillText(char, cx, cy);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      parentSection.removeEventListener('mousemove', handlePointerMove as EventListener);
      parentSection.removeEventListener('mousedown', handlePointerDown as EventListener);
      parentSection.removeEventListener('mouseleave', handlePointerLeave as EventListener);
      parentSection.removeEventListener('touchmove', handlePointerMove as EventListener);
      parentSection.removeEventListener('touchstart', handlePointerDown as EventListener);
      cancelAnimationFrame(animId);
    };
  }, [fontSize, maxOpacity, textColor]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{
        background: 'transparent',
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
};

export default CodexRevealBackground;
