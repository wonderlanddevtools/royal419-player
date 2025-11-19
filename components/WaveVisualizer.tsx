'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

interface WaveVisualizerProps {
  isPlaying: boolean;
  color: string;
}

export const WaveVisualizer = memo(function WaveVisualizer({ isPlaying, color }: WaveVisualizerProps) {
  // Reduced to 24 bars for better performance
  const bars = Array.from({ length: 24 }, (_, i) => {
    const heights = [30, 50, 70, 90, 95, 90, 70, 50];
    const baseHeight = heights[i % heights.length];
    const delay = i * 0.015;

    return {
      id: i,
      baseHeight,
      delay,
    };
  });

  return (
    <motion.div
      className="flex items-end justify-center gap-1 mb-8 h-24 relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${color}20, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {bars.map((bar) => (
        <motion.div
          key={bar.id}
          className="w-2 rounded-full relative"
          style={{
            background: `linear-gradient(to top, ${color}, ${color}CC)`,
            boxShadow: `0 0 10px ${color}60`,
            transform: 'translate3d(0,0,0)',
          }}
          animate={isPlaying ? {
            height: [
              `${bar.baseHeight * 0.3}px`,
              `${bar.baseHeight + Math.random() * 20}px`,
              `${bar.baseHeight * 0.5}px`,
              `${bar.baseHeight + Math.random() * 15}px`,
              `${bar.baseHeight * 0.3}px`,
            ],
          } : {
            height: `${bar.baseHeight * 0.3}px`,
          }}
          transition={{
            duration: 0.6 + Math.random() * 0.3,
            repeat: isPlaying ? Infinity : 0,
            delay: bar.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
});

