'use client';

import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeClick: () => void;
  color: string;
}

export function PlayerControls({ 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious, 
  onVolumeClick,
  color 
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      {/* Shuffle */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/20"
      >
        <Shuffle className="w-4 h-4" />
      </motion.button>

      {/* Previous */}
      <motion.button
        whileHover={{ scale: 1.15, x: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrevious}
        className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white transition-colors border-2 border-white/30"
        style={{
          boxShadow: `0 0 20px ${color}40`,
        }}
      >
        <SkipBack className="w-6 h-6" fill="currentColor" />
      </motion.button>

      {/* Play/Pause */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayPause}
        className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white/40 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}CC)`,
        }}
      >
        {/* Animated background pulse */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: color }}
          animate={{
            scale: isPlaying ? [1, 1.2, 1] : 1,
            opacity: isPlaying ? [0.5, 0, 0.5] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeOut',
          }}
        />
        
        {/* Icon */}
        <motion.div
          className="relative z-10"
          animate={{
            scale: isPlaying ? [1, 0.95, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            repeat: isPlaying ? Infinity : 0,
          }}
        >
          {isPlaying ? (
            <Pause className="w-9 h-9" fill="currentColor" />
          ) : (
            <Play className="w-9 h-9 ml-1" fill="currentColor" />
          )}
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isPlaying
              ? [
                  `0 0 30px ${color}80, 0 0 60px ${color}40`,
                  `0 0 50px ${color}CC, 0 0 80px ${color}60`,
                  `0 0 30px ${color}80, 0 0 60px ${color}40`,
                ]
              : `0 0 30px ${color}60`,
          }}
          transition={{
            duration: 2,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      </motion.button>

      {/* Next */}
      <motion.button
        whileHover={{ scale: 1.15, x: 2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white transition-colors border-2 border-white/30"
        style={{
          boxShadow: `0 0 20px ${color}40`,
        }}
      >
        <SkipForward className="w-6 h-6" fill="currentColor" />
      </motion.button>

      {/* Volume */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onVolumeClick}
        className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/20"
      >
        <Volume2 className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

