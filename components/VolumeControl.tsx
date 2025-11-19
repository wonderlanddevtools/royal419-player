'use client';

import { motion } from 'framer-motion';

interface VolumeControlProps {
  volume: number;
  onChange: (volume: number) => void;
  color: string;
}

export function VolumeControl({ volume, onChange, color }: VolumeControlProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="relative"
    >
      <div 
        className="backdrop-blur-xl rounded-2xl p-6 border-2 relative overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          borderColor: color + '30',
          boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 60px ${color}10`,
        }}
      >
        <div className="flex items-center gap-4">
          <span className="text-white/80 text-sm font-semibold">Volume</span>
          <div className="flex-1 relative h-3">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full h-full appearance-none bg-transparent cursor-pointer relative z-10"
              style={{
                WebkitAppearance: 'none',
              }}
            />
            <div 
              className="absolute top-0 left-0 h-full rounded-full pointer-events-none"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                width: '100%',
              }}
            />
            <motion.div 
              className="absolute top-0 left-0 h-full rounded-full pointer-events-none"
              style={{
                background: `linear-gradient(90deg, ${color}, ${color}CC)`,
                width: `${volume}%`,
                boxShadow: `0 0 15px ${color}60`,
              }}
              animate={{
                boxShadow: [
                  `0 0 15px ${color}60`,
                  `0 0 25px ${color}80`,
                  `0 0 15px ${color}60`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span 
            className="text-white font-semibold text-sm tabular-nums min-w-[3ch]"
            style={{
              color: color,
              textShadow: `0 0 10px ${color}80`,
            }}
          >
            {volume}
          </span>
        </div>
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${color};
          border: 3px solid rgba(255, 255, 255, 0.9);
          cursor: pointer;
          box-shadow: 0 0 20px ${color}CC, 0 2px 8px rgba(0,0,0,0.4);
        }
        
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${color};
          border: 3px solid rgba(255, 255, 255, 0.9);
          cursor: pointer;
          box-shadow: 0 0 20px ${color}CC, 0 2px 8px rgba(0,0,0,0.4);
        }
      `}</style>
    </motion.div>
  );
}

