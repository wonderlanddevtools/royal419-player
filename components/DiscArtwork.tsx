'use client';

import { motion } from 'framer-motion';
import type { ExtendedTrack } from '@/lib/tracks';

interface DiscArtworkProps {
  tracks: ExtendedTrack[];
  currentTrack: number;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
}

export function DiscArtwork({ tracks, currentTrack, isPlaying, onTrackSelect }: DiscArtworkProps) {
  return (
    <svg viewBox="0 0 440 440" className="w-full h-full">
      <defs>
        {/* Holographic gradient for center */}
        <radialGradient id="discGradient" cx="50%" cy="50%">
          <stop offset="0%" style={{ stopColor: '#E0C3FC', stopOpacity: 1 }} />
          <stop offset="30%" style={{ stopColor: '#8EC5FC', stopOpacity: 1 }} />
          <stop offset="60%" style={{ stopColor: '#B8A9FF', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4A3575', stopOpacity: 1 }} />
        </radialGradient>

        {/* Path for curved text */}
        {tracks.map((_, index) => (
          <path
            key={`path-${index}`}
            id={`textPath-${index}`}
            d={`
              M ${220 + Math.cos((index * 60 - 90) * Math.PI / 180) * 160}, ${220 + Math.sin((index * 60 - 90) * Math.PI / 180) * 160}
              A 160 160 0 0 1 ${220 + Math.cos(((index + 1) * 60 - 90) * Math.PI / 180) * 160}, ${220 + Math.sin(((index + 1) * 60 - 90) * Math.PI / 180) * 160}
            `}
            fill="none"
          />
        ))}
      </defs>

      {/* Disc base with gradient */}
      <circle cx="220" cy="220" r="220" fill="url(#discGradient)" />

      {/* Holographic rings */}
      <circle
        cx="220"
        cy="220"
        r="200"
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
      />
      <circle
        cx="220"
        cy="220"
        r="180"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />

      {/* Center hole */}
      <circle
        cx="220"
        cy="220"
        r="45"
        fill="#0a0a0a"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
      />
      <circle
        cx="220"
        cy="220"
        r="20"
        fill="#000"
      />

      {/* Track names arranged in circle */}
      {tracks.map((track, index) => {
        const isActive = index === currentTrack;
        const angle = index * 60; // 6 tracks = 60 degrees each
        const iconAngle = (angle - 90) * Math.PI / 180;
        const iconX = 220 + Math.cos(iconAngle) * 145;
        const iconY = 220 + Math.sin(iconAngle) * 145;

        return (
          <g key={track.id}>
            {/* Track number circle - clickable */}
            <motion.g
              style={{ cursor: 'pointer' }}
              onClick={() => onTrackSelect(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <circle
                cx={iconX}
                cy={iconY}
                r="25"
                fill={isActive ? track.color : 'rgba(255,255,255,0.15)'}
                stroke={track.color}
                strokeWidth="2"
                opacity={isActive ? 1 : 0.7}
              />
              <text
                x={iconX}
                y={iconY}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  fill: isActive ? '#000' : '#fff',
                  fontFamily: 'Rock Salt, cursive',
                }}
              >
                {index + 1}
              </text>

              {/* Active indicator pulse */}
              {isActive && isPlaying && (
                <motion.circle
                  cx={iconX}
                  cy={iconY}
                  r="25"
                  fill="none"
                  stroke={track.color}
                  strokeWidth="3"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              )}
            </motion.g>

            {/* Track name text on curved path */}
            <text
              style={{
                fontSize: '11px',
                fontWeight: '700',
                fill: track.color,
                fontFamily: 'Permanent Marker, cursive',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              <textPath
                href={`#textPath-${index}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {track.title.length > 25 ? track.title.substring(0, 22) + '...' : track.title}
              </textPath>
            </text>
          </g>
        );
      })}

      {/* Center label */}
      <text
        x="220"
        y="215"
        textAnchor="middle"
        style={{
          fontSize: '16px',
          fontWeight: '900',
          fill: '#FFD700',
          fontFamily: 'Rock Salt, cursive',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        }}
      >
        ROYAL
      </text>
      <text
        x="220"
        y="235"
        textAnchor="middle"
        style={{
          fontSize: '20px',
          fontWeight: '900',
          fill: '#FF69B4',
          fontFamily: 'Rock Salt, cursive',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        }}
      >
        419
      </text>
    </svg>
  );
}

