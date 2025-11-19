'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

interface DiscInCaseProps {
  isPlaying: boolean;
}

export const DiscInCase = memo(function DiscInCase({ isPlaying }: DiscInCaseProps) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{
        rotate: isPlaying ? 360 : 0,
      }}
      transition={{
        duration: 2,
        repeat: isPlaying ? Infinity : 0,
        ease: 'linear',
      }}
      style={{
        transform: 'translate3d(0,0,0)',
        willChange: isPlaying ? 'transform' : 'auto',
      }}
    >
      <div
        className="relative rounded-full"
        style={{
          width: '85%',
          height: '85%',
          background: 'radial-gradient(circle at center, #8B7FB8 0%, #5A4A8F 40%, #3D2B7C 70%, #2A1F5C 100%)',
          boxShadow: `
            0 0 40px rgba(138, 43, 226, 0.6),
            inset 0 0 60px rgba(255, 255, 255, 0.08),
            inset 0 -20px 40px rgba(0, 0, 0, 0.3)
          `,
        }}
      >
        {/* Holographic effect */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg,
              rgba(255,0,0,0.1),
              rgba(255,154,0,0.1),
              rgba(208,222,33,0.1),
              rgba(79,220,74,0.1),
              rgba(63,218,216,0.1),
              rgba(47,201,226,0.1),
              rgba(28,127,238,0.1),
              rgba(95,21,242,0.1),
              rgba(186,12,248,0.1),
              rgba(251,7,217,0.1),
              rgba(255,0,0,0.1)
            )`,
            mixBlendMode: 'screen',
            opacity: 0.6,
          }}
        />

        {/* Center hole */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '20%',
            height: '20%',
            background: 'radial-gradient(circle, #0a0a0a 30%, #2a2a2a 50%, #1a1a1a 70%, #0a0a0a 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.9)',
          }}
        >
          <div
            className="absolute inset-2 rounded-full"
            style={{
              background: '#000',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.9)',
            }}
          />
        </div>

        {/* Reflection highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 20%)',
          }}
        />
      </div>
    </motion.div>
  );
});

