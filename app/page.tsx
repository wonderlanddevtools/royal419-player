'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CDCover } from '@/components/CDCover';
import { AudioPlayer } from '@/components/AudioPlayer';
import { TrackList } from '@/components/TrackList';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { tracks } from '@/lib/tracks';
import { getTrackUrls } from '@/lib/supabase';

export default function Home() {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [tracksWithUrls, setTracksWithUrls] = useState(tracks);

  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    togglePlay,
    seek,
    setVolume,
    playTrack,
    playNext,
    playPrevious,
  } = useAudioPlayer();

  // Load track URLs from Supabase on mount
  useEffect(() => {
    try {
      const urls = getTrackUrls();
      const updatedTracks = tracks.map((track) => ({
        ...track,
        audioUrl: urls[track.id as keyof typeof urls] || '',
      }));
      setTracksWithUrls(updatedTracks);
    } catch (error) {
      console.error('Failed to load track URLs:', error);
      // If Supabase isn't configured, tracks will have empty URLs
    }
  }, []);

  const handleSelectTrack = (track: typeof tracks[0]) => {
    // Auto-open player when track is selected
    if (!isPlayerOpen) {
      setIsPlayerOpen(true);
    }
    playTrack(track);
  };

  const handleTogglePlayer = () => {
    setIsPlayerOpen(!isPlayerOpen);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 py-12 relative z-10">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #f9ed32 0%, #fff176 50%, #f9ed32 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(249, 237, 50, 0.3)',
              fontFamily: 'Impact, "Arial Black", sans-serif',
              letterSpacing: '0.05em',
            }}
            animate={{
              textShadow: [
                '0 0 40px rgba(249, 237, 50, 0.3)',
                '0 0 60px rgba(249, 237, 50, 0.5)',
                '0 0 40px rgba(249, 237, 50, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ROYAL 419
          </motion.h1>
          <p className="text-white/80 text-lg md:text-xl">
            Six tracks of untouchable romance,
            <br />
            wire-transfer ballads, and routing number funk
          </p>
        </motion.div>

        {/* CD Cover / Player */}
        <CDCover isOpen={isPlayerOpen} onToggle={handleTogglePlayer} />

        {/* Audio Player Controls */}
        {isPlayerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <AudioPlayer
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              isLoading={isLoading}
              onTogglePlay={togglePlay}
              onSeek={seek}
              onVolumeChange={setVolume}
              onNext={playNext}
              onPrevious={playPrevious}
            />
          </motion.div>
        )}

        {/* Track Listing */}
        {isPlayerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <TrackList
              tracks={tracksWithUrls}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onSelectTrack={handleSelectTrack}
            />
          </motion.div>
        )}

        {/* Footer */}
        {!isPlayerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-12 text-white/60 text-sm"
          >
            <p>Music & Lyrics By The Prince of Nigeria</p>
            <p className="mt-2">
              <span className="text-yellow-accent font-bold">ORDER NOW!</span>
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
