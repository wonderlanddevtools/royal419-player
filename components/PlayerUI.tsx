'use client';

import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import type { ExtendedTrack } from '@/lib/tracks';
import { TrackList } from './TrackList';

interface PlayerUIProps {
  tracks: ExtendedTrack[];
  currentTrack: number;
  isPlaying: boolean;
  progress: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  setProgress: (progress: number) => void;
  onTrackSelect?: (index: number) => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function PlayerUI({
  tracks,
  currentTrack,
  isPlaying,
  progress,
  onPlayPause,
  onNext,
  onPrevious,
  setProgress,
  onTrackSelect,
}: PlayerUIProps) {
  const track = tracks[currentTrack];
  const secondaryColor = tracks[(currentTrack + 3) % tracks.length].color;

  // Progress is now managed by the audio player, no simulated interval needed

  const progressPercent = (progress / track.durationSeconds) * 100;

  return (
    <motion.div
      className="relative mt-12 w-[950px] mx-auto"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 60, scale: 0.9 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 25,
        delay: 0.2,
      }}
    >
      <motion.div
        className="backdrop-blur-2xl rounded-3xl p-10 border-2 relative overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          borderColor: track.color + '30',
          boxShadow: `
            0 30px 80px rgba(0,0,0,0.5),
            0 0 100px ${track.color}15,
            inset 0 0 80px ${track.color}08
          `,
        }}
        animate={{
          borderColor: [track.color + '30', track.color + '50', track.color + '30'],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${track.color}20, transparent 50%),
                        radial-gradient(ellipse at bottom right, ${secondaryColor}20, transparent 50%)`,
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Current track title */}
        <motion.div
          className="text-center mb-8 relative z-10"
          key={currentTrack}
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 20,
            delay: 0.1 
          }}
        >
          <motion.h2
            className="text-white mb-3 relative inline-block px-8 py-4"
            style={{
              fontSize: '38px',
              fontWeight: '900',
              background: `linear-gradient(135deg, ${track.color} 0%, ${secondaryColor} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.03em',
              filter: `drop-shadow(0 0 30px ${track.color}80) drop-shadow(4px 4px 0px ${track.color}40)`,
            }}
          >
            <span
              className="absolute inset-0 flex items-center justify-center"
              style={{
                color: track.color,
                opacity: 0.2,
                transform: 'translate(6px, 6px)',
                filter: 'blur(2px)',
              }}
            >
              {track.title}
            </span>
            
            <span className="relative">{track.title}</span>
            
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full"
              style={{
                width: '80%',
                background: `linear-gradient(90deg, transparent, ${track.color}, ${secondaryColor}, transparent)`,
              }}
              animate={{
                scaleX: [1, 1.1, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.h2>
          
          <motion.p
            className="uppercase tracking-wider relative inline-block px-6 py-2"
            style={{
              fontSize: '22px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #FFD700 0%, #FF69B4 50%, #00FFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.2em',
              filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.6))',
            }}
          >
            ROYAL 419
          </motion.p>
        </motion.div>

        {/* Optimized visualizer - 48 bars */}
        {isPlaying && (
          <motion.div
            className="flex items-end justify-center gap-1 mb-8 h-24 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${track.color}20, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {Array.from({ length: 48 }).map((_, i) => {
              const heights = [30, 50, 70, 90, 95, 90, 70, 50];
              const baseHeight = heights[i % heights.length];
              const delay = i * 0.015;

              return (
                <motion.div
                  key={i}
                  className="w-2 rounded-full relative"
                  style={{
                    background: `linear-gradient(to top, ${track.color}, ${secondaryColor})`,
                    boxShadow: `0 0 12px ${track.color}70`,
                    willChange: 'height',
                  }}
                  animate={{
                    height: [
                      `${baseHeight * 0.3}px`,
                      `${baseHeight + Math.random() * 20}px`,
                      `${baseHeight * 0.5}px`,
                      `${baseHeight + Math.random() * 15}px`,
                      `${baseHeight * 0.3}px`,
                    ],
                  }}
                  transition={{
                    duration: 0.6 + Math.random() * 0.3,
                    repeat: Infinity,
                    delay: delay,
                    ease: 'easeInOut',
                  }}
                />
              );
            })}
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="mb-12 relative group">
          <div className="relative h-1.5 rounded-full overflow-hidden cursor-pointer" style={{
            background: 'rgba(255, 255, 255, 0.1)',
          }}>
            <motion.div
              className="h-full relative"
              style={{
                width: `${progressPercent}%`,
                background: `linear-gradient(90deg, ${track.color}, ${secondaryColor})`,
                boxShadow: `0 0 20px ${track.color}66`,
              }}
            />
          </div>

          <div className="flex justify-between mt-2 font-mono text-[10px] tracking-widest text-white/50">
            <span className="tabular-nums">{formatTime(progress)}</span>
            <span className="tabular-nums">{formatTime(track.durationSeconds)}</span>
          </div>
        </div>

        {/* Controls - Minimalist */}
        <div className="flex items-center justify-center gap-12">
          <motion.button
            whileHover={{ scale: 1.1, color: '#fff' }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevious}
            className="text-white/70 transition-colors"
          >
            <SkipBack className="w-8 h-8" strokeWidth={1} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayPause}
            className="w-20 h-20 rounded-full flex items-center justify-center text-black relative overflow-hidden group"
            style={{
              background: '#fff',
              boxShadow: `0 0 40px ${track.color}40`,
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white to-neutral-200 opacity-100"
            />
            <div className="relative z-10">
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-black" strokeWidth={0} />
              ) : (
                <Play className="w-8 h-8 fill-black ml-1" strokeWidth={0} />
              )}
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, color: '#fff' }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="text-white/70 transition-colors"
          >
            <SkipForward className="w-8 h-8" strokeWidth={1} />
          </motion.button>
        </div>

        {/* Track List with live scrubber */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <TrackList
            tracks={tracks}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTrackSelect={onTrackSelect || (() => {})}
            currentProgress={progress}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
