'use client';

import { motion } from 'framer-motion';
import type { Track } from '@/lib/tracks';

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onSelectTrack: (track: Track) => void;
}

export function TrackList({ tracks, currentTrack, isPlaying, onSelectTrack }: TrackListProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-bold text-yellow-accent mb-4 text-center">
          Track Listing
        </h3>
        <div className="space-y-2">
          {tracks.map((track, index) => {
            const isCurrentTrack = currentTrack?.id === track.id;
            const isCurrentlyPlaying = isCurrentTrack && isPlaying;

            return (
              <motion.button
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTrack(track)}
                className={`
                  w-full p-4 rounded-lg text-left transition-all duration-200
                  flex items-center gap-4 group
                  ${
                    isCurrentTrack
                      ? 'bg-yellow-accent text-purple-primary shadow-lg'
                      : 'bg-purple-dark/50 hover:bg-purple-dark text-white'
                  }
                `}
              >
                {/* Track Number / Playing Indicator */}
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  {isCurrentlyPlaying ? (
                    <div className="flex gap-1 items-center">
                      <span className="w-1 h-3 bg-purple-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-5 bg-purple-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-3 bg-purple-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <span
                      className={`
                        text-lg font-bold
                        ${isCurrentTrack ? 'text-purple-primary' : 'text-yellow-accent'}
                      `}
                    >
                      {track.trackNumber}
                    </span>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={`
                      font-semibold truncate text-sm md:text-base
                      ${isCurrentTrack ? 'text-purple-primary' : 'text-white'}
                    `}
                  >
                    {track.title}
                  </h4>
                </div>

                {/* Duration */}
                <div
                  className={`
                    flex-shrink-0 text-sm font-mono
                    ${isCurrentTrack ? 'text-purple-primary/80' : 'text-white/60'}
                  `}
                >
                  {track.duration}
                </div>

                {/* Play Icon on Hover */}
                {!isCurrentTrack && (
                  <div className="flex-shrink-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-full h-full text-yellow-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Album Credits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 text-center text-white/60 text-sm"
      >
        <p className="mb-1">Music & Lyrics By</p>
        <p className="text-yellow-accent font-semibold">The Prince of Nigeria</p>
        <p className="mt-4 text-xs">© 2025 Superbloom House</p>
      </motion.div>
    </div>
  );
}

