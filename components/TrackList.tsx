'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import type { ExtendedTrack } from '@/lib/tracks';

interface TrackListProps {
  tracks: ExtendedTrack[];
  currentTrack: number;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
  currentProgress?: number;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const TrackList = memo(function TrackList({ tracks, currentTrack, isPlaying, onTrackSelect, currentProgress = 0 }: TrackListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, staggerChildren: 0.05 }}
      className="space-y-3"
    >
      {tracks.map((track, index) => {
        const isActive = index === currentTrack;
        
        return (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03, x: 8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTrackSelect(index)}
            className="relative group cursor-pointer"
          >
            {/* Background */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: isActive 
                  ? `linear-gradient(135deg, ${track.color}40, ${track.color}20)`
                  : 'rgba(255, 255, 255, 0.05)',
                border: isActive 
                  ? `3px solid ${track.color}` 
                  : '2px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isActive 
                  ? `0 0 30px ${track.color}60, inset 0 0 20px ${track.color}30`
                  : 'none',
              }}
              animate={isActive && isPlaying ? {
                boxShadow: [
                  `0 0 30px ${track.color}60, inset 0 0 20px ${track.color}30`,
                  `0 0 40px ${track.color}80, inset 0 0 30px ${track.color}50`,
                  `0 0 30px ${track.color}60, inset 0 0 20px ${track.color}30`,
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at center, ${track.color}20, transparent)`,
              }}
            />

            {/* Content */}
            <div className="relative p-5 flex items-center justify-between">
              <div className="flex items-center gap-5 flex-1">
                {/* Track number */}
                <motion.div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    background: isActive 
                      ? `linear-gradient(135deg, ${track.color}, ${track.color}80)`
                      : 'rgba(255, 255, 255, 0.1)',
                    border: `2px solid ${isActive ? track.color : 'rgba(255, 255, 255, 0.2)'}`,
                    boxShadow: isActive ? `0 0 20px ${track.color}80` : 'none',
                  }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span
                    className="text-white font-syne font-bold"
                    style={{
                      fontSize: '16px',
                      textShadow: isActive ? `0 0 10px ${track.color}` : 'none',
                    }}
                  >
                    {index + 1}
                  </span>
                </motion.div>

                {/* Track title */}
                <div className="flex-1">
                  <motion.h3
                    className="text-white font-space-grotesk"
                    style={{
                      fontSize: isActive ? '18px' : '17px',
                      fontWeight: isActive ? '700' : '600',
                      textShadow: isActive 
                        ? `2px 2px 0px ${track.color}, 0 0 20px ${track.color}80`
                        : '1px 1px 2px rgba(0,0,0,0.5)',
                      letterSpacing: '0.01em',
                    }}
                    animate={isActive ? {
                      color: ['#ffffff', '#fffacd', '#ffffff'],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {track.title}
                  </motion.h3>
                </div>

                {/* Visualizer bars (only for active playing track) */}
                {isActive && isPlaying && (
                  <motion.div 
                    className="flex gap-1 items-end h-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-full"
                        style={{
                          background: `linear-gradient(to top, ${track.color}, ${track.color}40)`,
                          boxShadow: `0 0 10px ${track.color}`,
                        }}
                        animate={{
                          height: ['12px', '28px', '12px'],
                        }}
                        transition={{
                          duration: 0.5 + Math.random() * 0.3,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Duration */}
                <motion.span
                  className="text-white/70"
                  style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    minWidth: '45px',
                    textAlign: 'right',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  }}
                  animate={isActive ? {
                    color: [track.color + 'CC', '#ffffff', track.color + 'CC'],
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {formatTime(track.durationSeconds)}
                </motion.span>
              </div>
            </div>

            {/* Play indicator */}
            {isActive && (
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3/4 rounded-r-full"
                style={{
                  background: `linear-gradient(to bottom, ${track.color}, ${track.color}40)`,
                  boxShadow: `0 0 20px ${track.color}`,
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              />
            )}

            {/* Live Progress Bar - only for current track */}
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  className="absolute inset-0 bg-black/30"
                  style={{ backdropFilter: 'blur(4px)' }}
                />
                <motion.div
                  className="h-full relative"
                  style={{
                    width: `${(currentProgress / track.durationSeconds) * 100}%`,
                    background: `linear-gradient(90deg, ${track.color}, ${track.color}80)`,
                    boxShadow: `0 0 15px ${track.color}80`,
                  }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
});

