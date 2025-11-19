'use client';

import { useRef } from 'react';

interface UseAudioAnalyzerReturn {
  frequencyData: Uint8Array;
  connect: (audioElement: HTMLAudioElement) => void;
  disconnect: () => void;
}

// Throttled audio analyzer that provides simulated frequency data at 30fps
// This avoids CORS issues, infinite render loops, and reduces CPU usage
export function useAudioAnalyzer(): UseAudioAnalyzerReturn {
  const frequencyDataRef = useRef<Uint8Array>(new Uint8Array(48));
  const animationFrameRef = useRef<number | undefined>(undefined);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  const connect = (audioElement: HTMLAudioElement) => {
    audioElementRef.current = audioElement;
    lastUpdateTimeRef.current = performance.now();
    
    // Generate simulated frequency data based on audio playback
    // Throttled to 30fps (~33ms between updates)
    const simulateFrequencyData = (currentTime: number) => {
      const timeSinceLastUpdate = currentTime - lastUpdateTimeRef.current;
      
      // Only update every ~33ms (30fps) for better performance
      if (timeSinceLastUpdate >= 33) {
        if (!audioElementRef.current || audioElementRef.current.paused) {
          // Fade out when paused - use direct array manipulation (faster)
          for (let i = 0; i < 48; i++) {
            frequencyDataRef.current[i] = Math.max(0, frequencyDataRef.current[i] * 0.9);
          }
        } else {
          // Simulate frequency bars with some randomness when playing
          for (let i = 0; i < 48; i++) {
            // Lower frequencies (bass) tend to be stronger
            const bassBoost = i < 12 ? 1.5 : 1.0;
            const target = (Math.random() * 120 + 60) * bassBoost;
            // Smooth transition using lerp
            frequencyDataRef.current[i] = frequencyDataRef.current[i] * 0.7 + target * 0.3;
          }
        }
        
        lastUpdateTimeRef.current = currentTime;
      }
      
      animationFrameRef.current = requestAnimationFrame(simulateFrequencyData);
    };

    animationFrameRef.current = requestAnimationFrame(simulateFrequencyData);
  };

  const disconnect = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
    audioElementRef.current = null;
    // Reset to zeros - reuse existing array
    frequencyDataRef.current.fill(0);
  };

  return {
    frequencyData: frequencyDataRef.current,
    connect,
    disconnect,
  };
}

