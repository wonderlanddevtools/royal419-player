'use client';

import { useState, useEffect } from 'react';
import { CDCase } from '@/components/CDCase';
import { StarField } from '@/components/StarField';
import { SparkleEffect } from '@/components/SparkleEffect';
import { AlbumArtTransition } from '@/components/AlbumArtTransition';
import { getExtendedTracks } from '@/lib/tracks';
import { motion } from 'framer-motion';

export default function Home() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [scale, setScale] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const tracks = getExtendedTracks();

  useEffect(() => {
    const handleResize = () => {
      // Design targets a 1400x1000 canvas comfortably
      const targetWidth = 1400;
      const targetHeight = 1000;
      
      const scaleX = window.innerWidth / targetWidth;
      const scaleY = window.innerHeight / targetHeight;
      
      // Use the smaller scale to fit both dimensions, but cap it at 1.2 to avoid over-scaling on huge screens
      // Minimum scale ensures it doesn't get microscopic on mobile, though this design is desktop-first
      const newScale = Math.min(Math.min(scaleX, scaleY) * 0.9, 1.2); 
      
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSparkles = Array.from({ length: 16 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));
    
    setSparkles(prev => [...prev, ...newSparkles]);
    
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 1200);
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <div 
      className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center"
      onClick={handleClick}
    >
      {/* Dynamic background with track color */}
      <motion.div
        className="fixed inset-0"
        animate={{
          background: isPlayerOpen
            ? `radial-gradient(ellipse at center, ${currentTrack.color}30 0%, #4A3575 50%, #2D1F4A 100%)`
            : 'radial-gradient(ellipse at center, #6B4FA3 0%, #4A3575 50%, #2D1F4A 100%)',
        }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      {/* Album art transition background */}
      <AlbumArtTransition 
        currentTrack={currentTrack}
        isVisible={isPlayerOpen}
      />
      
      <StarField />
      
      {sparkles.map(sparkle => (
        <SparkleEffect key={sparkle.id} x={sparkle.x} y={sparkle.y} />
      ))}
      
      <div 
        style={{ 
          transform: `scale(${scale})`,
          width: '1400px',
          height: '1000px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center gap-8">
          <CDCase 
            tracks={tracks}
            onTrackChange={setCurrentTrackIndex}
            onPlayerOpenChange={setIsPlayerOpen}
          />
        </div>
      </div>
    </div>
  );
}
