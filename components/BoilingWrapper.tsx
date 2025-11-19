'use client';

import { useEffect, useState, ReactNode } from 'react';

interface BoilingWrapperProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // 0-10, higher = more distortion
}

export function BoilingWrapper({ children, className = '', intensity = 3 }: BoilingWrapperProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 3);
    }, 80); // 12.5fps for hand-drawn feel

    return () => clearInterval(interval);
  }, []);

  // Generate slight variations for each frame
  const frameStyles = [
    {
      transform: `translate(${intensity * 0.3}px, ${intensity * 0.2}px) rotate(${intensity * 0.15}deg) scale(${1 + intensity * 0.001})`,
      filter: `blur(${intensity * 0.05}px)`,
    },
    {
      transform: `translate(${-intensity * 0.2}px, ${intensity * 0.3}px) rotate(${-intensity * 0.1}deg) scale(${1 - intensity * 0.001})`,
      filter: `blur(${intensity * 0.03}px)`,
    },
    {
      transform: `translate(${intensity * 0.1}px, ${-intensity * 0.25}px) rotate(${intensity * 0.05}deg) scale(1)`,
      filter: `blur(${intensity * 0.04}px)`,
    },
  ];

  return (
    <div 
      className={`${className} transition-all duration-0`}
      style={frameStyles[frame]}
    >
      {children}
    </div>
  );
}
