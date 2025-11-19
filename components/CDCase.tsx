'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CDDisc } from './CDDisc';
import { PlayerUI } from './PlayerUI';
import { AlbumCover } from './AlbumCover';
import type { ExtendedTrack } from '@/lib/tracks';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface CDCaseProps {
  tracks: ExtendedTrack[];
  onTrackChange?: (index: number) => void;
  onPlayerOpenChange?: (isOpen: boolean) => void;
}

export function CDCase({ tracks, onTrackChange, onPlayerOpenChange }: CDCaseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const audioPlayer = useAudioPlayer();

  // Find current track index based on audioPlayer's current track
  const currentTrackIndex = audioPlayer.currentTrack 
    ? tracks.findIndex(t => t.id === audioPlayer.currentTrack?.id)
    : 0;
  const currentTrack = currentTrackIndex >= 0 ? currentTrackIndex : 0;

  const handleOpen = () => {
    setIsOpen(true);
    onPlayerOpenChange?.(true);
    // Auto-play first track when opening if nothing is playing
    if (!audioPlayer.currentTrack) {
      audioPlayer.playTrack(tracks[0]);
    }
  };

  const handleTrackSelect = (index: number) => {
    audioPlayer.playTrack(tracks[index]);
    onTrackChange?.(index);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full" style={{ perspective: '2000px', minHeight: '600px', fontFamily: '"Comic Sans MS", "Chalkboard SE", "Marker Felt", sans-serif' }}>
      
      {/* Main Case Container - slightly tilted for 3D effect */}
      <motion.div
        className="relative z-20"
        style={{ 
          width: '500px', 
          height: '450px', 
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
        animate={{
          transform: isOpen ? 'rotateX(10deg)' : 'rotateX(0deg)',
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0.0, 0.2, 1] // Faster cubic-bezier
        }}
      >
        
        {/* BACK TRAY (Static Base) */}
        <div 
          className="absolute inset-0 bg-neutral-900 rounded-sm border border-white/10 shadow-2xl"
          style={{
            transform: 'translateZ(-10px)',
          }}
        >
          {/* Tray Texture/Plastic */}
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black" />
          
          {/* CD Holder Spindle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-black border-4 border-neutral-800 shadow-inner flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-neutral-700 shadow-[0_0_10px_rgba(0,0,0,0.8)]" />
            {/* Spindle Teeth */}
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-1 h-6 bg-neutral-800" 
                style={{ 
                  transform: `rotate(${i * 30}deg) translateY(-12px)`,
                  borderRadius: '2px'
                }} 
              />
            ))}
          </div>

          {/* Tray Details */}
          <div className="absolute bottom-4 right-6 text-neutral-600 font-mono text-[10px] tracking-[0.2em]">
            COMPACT DISC DIGITAL AUDIO
          </div>
        </div>

        {/* FRONT COVER (Hinged) */}
        <motion.div
          className="absolute inset-0 rounded-sm cursor-pointer"
          style={{
            transformOrigin: 'left',
            transformStyle: 'preserve-3d',
            zIndex: 20,
            backfaceVisibility: 'hidden',
          }}
          initial={{ rotateY: 0 }}
          animate={{ 
            rotateY: isOpen ? -175 : 0,
          }}
          transition={{ 
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1], // Smooth cubic-bezier instead of spring
          }}
          onClick={!isOpen ? handleOpen : undefined}
          whileHover={!isOpen ? { 
            rotateY: -15,
          } : {}}
        >
          {/* --- FRONT FACE (Album Art) --- */}
          <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
            {/* Spine (Visual only, attached to front) */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-black -translate-x-3 rounded-l-sm flex items-center justify-center border-r border-white/10">
              <span className="text-[8px] text-white rotate-90 whitespace-nowrap font-bold tracking-widest opacity-50">ROYAL 419</span>
            </div>

            {/* Album Art Container */}
            <div className="w-full h-full relative overflow-hidden rounded-r-sm bg-black">
              <AlbumCover />
              
              {/* Plastic Case Glare */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/40 pointer-events-none" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay" />
              
              {/* Left Hinge Highlight */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

              {/* "Click to Open" Prompt */}
              {!isOpen && (
                <motion.div 
                  className="absolute bottom-8 right-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/20"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[5px] border-y-transparent ml-1" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>

          {/* --- BACK FACE (Booklet/Inside) --- */}
          <div 
            className="absolute inset-0 bg-neutral-900 rounded-l-sm overflow-hidden"
            style={{ 
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.5)' // Shadow from spine
            }}
          >
            <div className="absolute inset-0 bg-black">
              <img 
                src="/images/inside-booklet.png"
                alt="Inside Booklet" 
                className="w-full h-full object-cover opacity-90"
                onError={(e) => {
                  console.error('Failed to load inside booklet image');
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            
            {/* Glossy Overlay for Booklet Page */}
            <div className="absolute inset-0 bg-gradient-to-l from-white/5 to-transparent pointer-events-none mix-blend-overlay" />
          </div>

        </motion.div>

        {/* DISC (Revealed when open) */}
        <AnimatePresence>
          {isOpen && (
            <CDDisc
              currentTrack={currentTrack}
              isPlaying={audioPlayer.isPlaying}
              tracks={tracks}
              onTrackSelect={handleTrackSelect}
            />
          )}
        </AnimatePresence>

      </motion.div>

      {/* Player UI */}
      <AnimatePresence>
        {isOpen && (
          <PlayerUI
            tracks={tracks}
            currentTrack={currentTrack}
            isPlaying={audioPlayer.isPlaying}
            progress={audioPlayer.currentTime}
            isLoading={audioPlayer.isLoading}
            frequencyData={audioPlayer.frequencyData}
            onPlayPause={audioPlayer.togglePlay}
            onNext={audioPlayer.playNext}
            onPrevious={audioPlayer.playPrevious}
            setProgress={(time) => audioPlayer.seek(time)}
            onTrackSelect={handleTrackSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
