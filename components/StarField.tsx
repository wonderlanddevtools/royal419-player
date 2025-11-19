'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, memo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  glitterDelay: number;
  brightness: number;
}

export const StarField = memo(function StarField() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Reduced from 100 to 50 stars for better performance
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 3,
      glitterDelay: Math.random() * 10,
      brightness: Math.random() * 0.4 + 0.6,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            transform: 'translate3d(0,0,0)',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1 * star.brightness, 1 * star.brightness, 0.1 * star.brightness],
            scale: [0.7, 1.6, 0.7],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        >
          {/* Main star body */}
          <motion.div 
            className="w-full h-full rounded-full relative" 
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,${star.brightness}), rgba(255,255,255,${star.brightness * 0.3}))`,
              boxShadow: `0 0 ${star.size * 3}px rgba(255,255,255,${0.6 * star.brightness})`,
            }}
          />
          
          {/* Glitter cross effect - reduced to only every 5th star for performance */}
          {star.id % 5 === 0 && (
            <motion.div
              className="absolute inset-0"
              style={{ transform: 'translate3d(0,0,0)' }}
              animate={{
                rotate: [0, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: star.glitterDelay,
                ease: 'linear',
              }}
            >
              {/* Horizontal beam */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-0.5"
                style={{
                  width: `${star.size * 5}px`,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: `linear-gradient(to right, transparent, rgba(255,255,255,${star.brightness}), transparent)`,
                }}
              />
              {/* Vertical beam */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-0.5"
                style={{
                  height: `${star.size * 5}px`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: `linear-gradient(to bottom, transparent, rgba(255,255,255,${star.brightness}), transparent)`,
                }}
              />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
});

