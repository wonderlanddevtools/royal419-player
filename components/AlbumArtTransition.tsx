'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { ExtendedTrack } from '@/lib/tracks';

interface AlbumArtTransitionProps {
  currentTrack: ExtendedTrack;
  isVisible: boolean;
}

export function AlbumArtTransition({ currentTrack, isVisible }: AlbumArtTransitionProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentTrack.id}
            className="absolute inset-0"
            initial={{ 
              opacity: 0,
              scale: 1.05,
              filter: 'blur(40px)',
            }}
            animate={{ 
              opacity: 0.3,
              scale: 1,
              filter: 'blur(60px)',
            }}
            exit={{ 
              opacity: 0,
              scale: 0.95,
              filter: 'blur(80px)',
            }}
            transition={{
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smooth transitions
            }}
            style={{
              backgroundImage: `url(/images/album-cover.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              willChange: 'transform, opacity, filter',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Color overlay based on track color */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, ${currentTrack.color}40, ${currentTrack.color}20 50%, transparent 80%)`,
              }}
              animate={{
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

