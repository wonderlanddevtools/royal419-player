'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ExtendedTrack } from '@/lib/tracks';

interface CDDiscProps {
  currentTrack: number;
  isPlaying: boolean;
  tracks: ExtendedTrack[];
  onTrackSelect: (index: number) => void;
}

export function CDDisc({ currentTrack, isPlaying, tracks, onTrackSelect }: CDDiscProps) {
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)', // Center it perfectly in the tray
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        zIndex: 10,
      }}
      initial={{
        scale: 0.8,
        opacity: 0,
        rotateY: -10,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        rotateY: 0,
      }}
      exit={{
        scale: 0.8,
        opacity: 0,
        rotateY: -10,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
    >
      <motion.div
        className="relative cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '400px', // Slightly smaller to fit nicely in the 500px case with margins
          height: '400px',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        animate={{
          rotate: isPlaying ? 360 : 0,
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{
          rotate: {
            duration: 8, // Slower, more majestic spin
            repeat: isPlaying ? Infinity : 0,
            ease: 'linear',
          },
          rotateX: { type: 'spring', stiffness: 400, damping: 30 },
          rotateY: { type: 'spring', stiffness: 400, damping: 30 },
        }}
      >
        {/* CD Shadow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 65%)',
            transform: 'translateZ(-20px) translateY(30px)',
            filter: 'blur(25px)',
          }}
        />

        {/* Actual CD Disc Surface - matching reference image exactly */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: '#2D1F4A',
            boxShadow: `
              0 0 60px rgba(138, 43, 226, 0.8),
              inset 0 0 80px rgba(255, 255, 255, 0.1),
              inset 0 -30px 50px rgba(0, 0, 0, 0.4)
            `,
          }}
        >
          {/* Base disc image with the actual disc artwork */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <img
              src="/images/disc-artwork.png"
              alt="Royal 419 Disc"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Failed to load disc artwork image');
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>

          {/* Holographic rainbow shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg,
                rgba(255,0,0,0.15),
                rgba(255,154,0,0.15),
                rgba(208,222,33,0.15),
                rgba(79,220,74,0.15),
                rgba(63,218,216,0.15),
                rgba(47,201,226,0.15),
                rgba(28,127,238,0.15),
                rgba(95,21,242,0.15),
                rgba(186,12,248,0.15),
                rgba(251,7,217,0.15),
                rgba(255,0,0,0.15)
              )`,
              mixBlendMode: 'screen',
              opacity: 0.7,
              willChange: 'transform',
            }}
            animate={{
              rotate: isPlaying ? -360 : 0,
            }}
            transition={{
              duration: 5,
              repeat: isPlaying ? Infinity : 0,
              ease: 'linear',
            }}
          />

          {/* Secondary holographic layer */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 90deg, transparent, rgba(255,255,255,0.2), transparent, rgba(255,255,255,0.15), transparent)',
              mixBlendMode: 'overlay',
              willChange: 'transform',
            }}
            animate={{
              rotate: isPlaying ? 360 : 0,
            }}
            transition={{
              duration: 3,
              repeat: isPlaying ? Infinity : 0,
              ease: 'linear',
            }}
          />

          {/* Disc surface reflection */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 20%),
                radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 100%)
              `,
            }}
          />

          {/* Center hole - realistic CD hole */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '90px',
              height: '90px',
              background: `radial-gradient(circle, #0a0a0a 25%, #2a2a2a 45%, #1a1a1a 60%, #0a0a0a 100%)`,
              boxShadow: `
                inset 0 0 30px rgba(0,0,0,0.9),
                inset 0 5px 15px rgba(0,0,0,0.8),
                0 0 20px rgba(0,0,0,0.6)
              `,
            }}
          >
            <div
              className="absolute inset-3 rounded-full"
              style={{
                background: '#000',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9), inset 0 2px 8px rgba(255,255,255,0.05)',
              }}
            />
          </div>

          {/* Rotating shimmer light effect */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)',
              mixBlendMode: 'overlay',
              willChange: 'transform',
            }}
            animate={{
              rotate: isPlaying ? 360 : 0,
            }}
            transition={{
              duration: 2.5,
              repeat: isPlaying ? Infinity : 0,
              ease: 'linear',
            }}
          />
        </div>

        {/* CD edge with realistic depth */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: `
              inset 0 0 15px rgba(0,0,0,0.6),
              inset 0 2px 5px rgba(255,255,255,0.2),
              0 10px 40px rgba(0,0,0,0.5)
            `,
            border: '2px solid rgba(255,255,255,0.15)',
          }}
        />

        {/* Outer glow based on current track */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: isPlaying
              ? [
                  `0 0 50px ${tracks[currentTrack].color}70`,
                  `0 0 80px ${tracks[currentTrack].color}CC`,
                  `0 0 50px ${tracks[currentTrack].color}70`,
                ]
              : `0 0 50px ${tracks[currentTrack].color}60`,
          }}
          transition={{
            duration: 2.5,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
