'use client';

import { motion } from 'framer-motion';

interface SparkleEffectProps {
  x: number;
  y: number;
}

export function SparkleEffect({ x, y }: SparkleEffectProps) {
  const sparkles = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const distance = 40 + Math.random() * 60;
    const size = Math.random() * 8 + 4;
    
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.1,
    };
  });

  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        left: x,
        top: y,
      }}
    >
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: 0,
            top: 0,
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            x: sparkle.x,
            y: sparkle.y,
            scale: [0, 1, 0],
            rotate: [sparkle.rotation, sparkle.rotation + 180],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.8,
            delay: sparkle.delay,
            ease: 'easeOut',
          }}
        >
          {/* Four-point star sparkle */}
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0L11 9L10 10L9 9L10 0Z"
              fill="#FFD700"
              fillOpacity="0.9"
            />
            <path
              d="M10 20L11 11L10 10L9 11L10 20Z"
              fill="#FFD700"
              fillOpacity="0.9"
            />
            <path
              d="M0 10L9 11L10 10L9 9L0 10Z"
              fill="#FFD700"
              fillOpacity="0.9"
            />
            <path
              d="M20 10L11 11L10 10L11 9L20 10Z"
              fill="#FFD700"
              fillOpacity="0.9"
            />
            <circle
              cx="10"
              cy="10"
              r="3"
              fill="#FFFFFF"
              fillOpacity="0.8"
            />
          </svg>
          
          {/* Glow effect */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: sparkle.size * 2,
              height: sparkle.size * 2,
              background: 'radial-gradient(circle, rgba(255,215,0,0.6), transparent)',
              filter: 'blur(4px)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
