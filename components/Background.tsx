'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Generate stars
    const numStars = 150;
    const stars: Star[] = [];
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      });
    }
    
    starsRef.current = stars;

    // Create star elements
    const starElements = stars.map((star) => {
      const el = document.createElement('div');
      el.className = 'star';
      el.style.left = `${star.x}%`;
      el.style.top = `${star.y}%`;
      el.style.width = `${star.size}px`;
      el.style.height = `${star.size}px`;
      el.style.animationDelay = `${star.delay}s`;
      el.style.animationDuration = `${star.duration}s`;
      containerRef.current?.appendChild(el);
      return el;
    });

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mousePositionRef.current = {
        x: (clientX / innerWidth - 0.5) * 2,
        y: (clientY / innerHeight - 0.5) * 2,
      };

      // Apply parallax to stars based on their size (bigger stars move more)
      starElements.forEach((el, i) => {
        const star = stars[i];
        const depth = star.size / 4; // Bigger stars = more movement
        const moveX = mousePositionRef.current.x * depth * 10;
        const moveY = mousePositionRef.current.y * depth * 10;
        
        gsap.to(el, {
          x: moveX,
          y: moveY,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      starElements.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-b from-purple-primary via-purple-dark to-purple-darker -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-primary/50 to-purple-darker opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-purple-darker to-transparent" />
    </div>
  );
}

