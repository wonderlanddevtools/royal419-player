'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface ProgressBarProps {
  progress: number;
  currentTime: number;
  duration: number;
  color: string;
  isPlaying: boolean;
  onSeek?: (time: number) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function ProgressBar({ progress, currentTime, duration, color, isPlaying, onSeek }: ProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverX, setHoverX] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !onSeek || !duration) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    setHoverX(e.clientX - rect.left);
  };

  return (
    <div className="mb-8 relative">
      <div 
        ref={progressRef}
        className="relative h-4 rounded-full overflow-hidden mb-4 cursor-pointer group" 
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onClick={handleProgressClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
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
          whileHover={{ scale: 1.5 }}
          transition={{
            duration: 1,
            repeat: isPlaying ? Infinity : 0,
          }}
        />

        {/* Hover preview indicator */}
        {isHovering && progressRef.current && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-6 rounded-full bg-white/50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              left: `${hoverX}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </div>

      <div className="flex justify-between px-2 font-inter">
        <motion.span
          className="tabular-nums font-semibold"
          style={{
            fontSize: '17px',
            background: `linear-gradient(135deg, ${color}, #ffffff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 10px ${color}60)`,
          }}
          whileHover={{ scale: 1.05 }}
        >
          {formatTime(currentTime)}
        </motion.span>
        <motion.span
          className="text-white/60 tabular-nums font-semibold"
          style={{
            fontSize: '17px',
          }}
          whileHover={{ scale: 1.05, color: 'rgba(255,255,255,0.8)' }}
        >
          {formatTime(duration)}
        </motion.span>
      </div>
    </div>
  );
}

