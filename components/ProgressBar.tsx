'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  currentTime: number;
  duration: number;
  color: string;
  isPlaying: boolean;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function ProgressBar({ progress, currentTime, duration, color, isPlaying }: ProgressBarProps) {
  return (
    <div className="mb-8 relative">
      <div className="relative h-4 rounded-full overflow-hidden mb-4" style={{
        background: 'rgba(255, 255, 255, 0.08)',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <motion.div
          className="h-full relative"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)`,
            willChange: 'width',
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>

        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-3"
          style={{
            left: `${progress}%`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${color}, ${color}CC)`,
            borderColor: 'rgba(255,255,255,0.8)',
            boxShadow: `0 0 30px ${color}CC, 0 4px 12px rgba(0,0,0,0.4)`,
            willChange: 'left',
          }}
          animate={{
            scale: isPlaying ? [1, 1.3, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: isPlaying ? Infinity : 0,
          }}
        />
      </div>

      <div className="flex justify-between px-2">
        <span
          className="tabular-nums"
          style={{
            fontSize: '17px',
            fontWeight: '700',
            background: `linear-gradient(135deg, ${color}, #ffffff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 10px ${color}60)`,
          }}
        >
          {formatTime(currentTime)}
        </span>
        <span
          className="text-white/60 tabular-nums"
          style={{
            fontSize: '17px',
            fontWeight: '700',
          }}
        >
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

