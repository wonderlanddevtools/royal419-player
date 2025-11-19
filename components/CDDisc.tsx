'use client';

import { motion } from 'framer-motion';
import { useState, memo } from 'react';
import type { ExtendedTrack } from '@/lib/tracks';

interface CDDiscProps {
  currentTrack: number;
  isPlaying: boolean;
  tracks: ExtendedTrack[];
  onTrackSelect: (index: number) => void;
}

export const CDDisc = memo(function CDDisc({ currentTrack, isPlaying, tracks, onTrackSelect }: CDDiscProps) {
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
        backfaceVisibility: 'hidden',
      }}
      initial={{
        scale: 0.8,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0.8,
        opacity: 0,
      }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
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
          backfaceVisibility: 'hidden',
          willChange: isPlaying ? 'transform' : 'auto', // Only during playback
        }}
        animate={{
          rotate: isPlaying ? 360 : 0,
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{
          rotate: {
            duration: 8,
            repeat: isPlaying ? Infinity : 0,
            ease: 'linear',
          },
          rotateX: { duration: 0.2, ease: 'easeOut' },
          rotateY: { duration: 0.2, ease: 'easeOut' },
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

          {/* Simplified environment map reflection */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg,
                rgba(255,255,255,0.1),
                rgba(200,220,255,0.12) 90deg,
                rgba(255,255,255,0.08) 180deg,
                rgba(255,220,200,0.12) 270deg,
                rgba(255,255,255,0.1)
              )`,
              mixBlendMode: 'overlay',
              opacity: 0.25,
            }}
          />

          {/* Simplified holographic spectrum - single layer */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg,
                rgba(255,0,100,0.15),
                rgba(255,200,0,0.15) 60deg,
                rgba(0,255,150,0.15) 120deg,
                rgba(0,150,255,0.15) 180deg,
                rgba(150,0,255,0.15) 240deg,
                rgba(255,0,150,0.15) 300deg,
                rgba(255,0,100,0.15)
              )`,
              mixBlendMode: 'screen',
              opacity: 0.5,
              willChange: isPlaying ? 'transform' : 'auto',
            }}
            animate={{
              rotate: isPlaying ? -360 : 0,
            }}
            transition={{
              duration: 6,
              repeat: isPlaying ? Infinity : 0,
              ease: 'linear',
            }}
          />

          {/* Simplified surface texture */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 35% 25%, rgba(255,255,255,0.02) 0%, transparent 1%),
                radial-gradient(circle at 65% 70%, rgba(255,255,255,0.015) 0%, transparent 1%)
              `,
              mixBlendMode: 'overlay',
              opacity: 0.3,
            }}
          />

          {/* Disc surface reflection and depth mask */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 20%),
                radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 35%, transparent 50%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.35) 100%)
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

          {/* Single simplified shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)',
              mixBlendMode: 'overlay',
              willChange: isPlaying ? 'transform' : 'auto',
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

        {/* Simplified outer glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-shadow duration-300"
          style={{
            boxShadow: isPlaying 
              ? `0 0 60px ${tracks[currentTrack].color}80`
              : `0 0 40px ${tracks[currentTrack].color}60`,
          }}
        />
      </motion.div>
    </motion.div>
  );
});
