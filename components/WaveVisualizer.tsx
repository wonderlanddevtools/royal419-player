'use client';

import { useRef, useEffect, memo } from 'react';

interface WaveVisualizerProps {
  isPlaying: boolean;
  color: string;
  frequencyData: Uint8Array;
}

// Linear interpolation function for smooth animation
function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export const WaveVisualizer = memo(function WaveVisualizer({ 
  isPlaying, 
  color, 
  frequencyData 
}: WaveVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousHeightsRef = useRef<number[]>(new Array(48).fill(10));
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastDrawTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true, // Better performance for animations
    });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size accounting for device pixel ratio
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const barCount = 48;
    const barWidth = rect.width / barCount;
    const barGap = barWidth * 0.2;
    const actualBarWidth = barWidth - barGap;
    const maxHeight = rect.height * 0.9;

    // Throttle drawing to 30fps for better performance
    const draw = (currentTime: number) => {
      const timeSinceLastDraw = currentTime - lastDrawTimeRef.current;
      
      if (timeSinceLastDraw >= 33) { // 30fps (~33ms)
        // Clear canvas with transparency
        ctx.clearRect(0, 0, rect.width, rect.height);

        // Disable shadows by default for better performance
        ctx.shadowBlur = 0;

        for (let i = 0; i < barCount; i++) {
          // Get frequency data for this bar
          const freqValue = isPlaying && frequencyData[i] !== undefined ? frequencyData[i] : 0;
          
          // Normalize to 0-1 range and apply some scaling
          const normalized = freqValue / 255;
          const targetHeight = Math.max(10, normalized * maxHeight);
          
          // Smooth interpolation for fluid animation
          const currentHeight = previousHeightsRef.current[i];
          const newHeight = lerp(currentHeight, targetHeight, 0.25);
          previousHeightsRef.current[i] = newHeight;

          // Calculate position using integer math for better performance
          const x = Math.floor(i * barWidth + barGap / 2);
          const y = Math.floor(rect.height - newHeight);

          // Simplified gradient - only create when needed
          const intensity = newHeight / maxHeight;
          if (intensity > 0.7) {
            const gradient = ctx.createLinearGradient(x, y, x, rect.height);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.4, color);
            gradient.addColorStop(1, color + 'AA');
            ctx.fillStyle = gradient;
          } else {
            // Use solid color for lower bars (much faster)
            ctx.fillStyle = color;
          }

          // Draw bar with rounded top
          ctx.beginPath();
          ctx.roundRect(x, y, actualBarWidth, newHeight, [actualBarWidth / 2, actualBarWidth / 2, 0, 0]);
          ctx.fill();
        }
        
        lastDrawTimeRef.current = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    lastDrawTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, color]);

  // Simplified fade out when not playing - no interval needed
  useEffect(() => {
    if (!isPlaying) {
      // Fade handled by main draw loop, no extra timer needed
      return;
    }
  }, [isPlaying]);

  return (
    <div className="relative mb-8 h-24 flex items-center justify-center">
      {/* Simplified radial glow background - no dynamic animation */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at center, ${color}20, transparent 70%)`,
          opacity: isPlaying ? 0.7 : 0.4,
        }}
      />
      
      {/* Canvas visualizer */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          width: '100%',
          height: '100%',
          willChange: isPlaying ? 'contents' : 'auto',
        }}
      />
    </div>
  );
});
