'use client';

interface RoyalLogoProps {
  className?: string;
}

export function RoyalLogo({ className = '' }: RoyalLogoProps) {
  return (
    <svg 
      viewBox="0 0 800 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients for each letter */}
        <linearGradient id="r-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6600cc" />
          <stop offset="50%" stopColor="#00b8c2" />
          <stop offset="100%" stopColor="#6600cc" />
        </linearGradient>
        
        <linearGradient id="o-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6600cc" />
          <stop offset="50%" stopColor="#00b8c2" />
          <stop offset="100%" stopColor="#6600cc" />
        </linearGradient>
        
        <linearGradient id="y-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00b8c2" />
          <stop offset="50%" stopColor="#c0c0c0" />
          <stop offset="100%" stopColor="#00b8c2" />
        </linearGradient>
        
        <linearGradient id="a-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c0c0c0" />
          <stop offset="50%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#c0c0c0" />
        </linearGradient>
        
        <linearGradient id="l-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f0f0f0" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Texture filter for marker effect */}
        <filter id="marker-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="0" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
      </defs>

      {/* R */}
      <g transform="translate(0, 0)">
        <text 
          x="20" 
          y="140" 
          fontSize="160" 
          fontFamily="Impact, 'Arial Black', sans-serif" 
          fontWeight="900"
          fill="url(#r-gradient)"
          stroke="#ffd700"
          strokeWidth="4"
          filter="url(#marker-texture)"
        >
          R
        </text>
      </g>

      {/* O */}
      <g transform="translate(140, 0)">
        <text 
          x="20" 
          y="140" 
          fontSize="160" 
          fontFamily="Impact, 'Arial Black', sans-serif" 
          fontWeight="900"
          fill="url(#o-gradient)"
          stroke="#ffd700"
          strokeWidth="4"
          filter="url(#marker-texture)"
        >
          O
        </text>
      </g>

      {/* Y */}
      <g transform="translate(290, 0)">
        <text 
          x="20" 
          y="140" 
          fontSize="160" 
          fontFamily="Impact, 'Arial Black', sans-serif" 
          fontWeight="900"
          fill="url(#y-gradient)"
          stroke="#ffd700"
          strokeWidth="4"
          filter="url(#marker-texture)"
        >
          Y
        </text>
      </g>

      {/* A */}
      <g transform="translate(430, 0)">
        <text 
          x="20" 
          y="140" 
          fontSize="160" 
          fontFamily="Impact, 'Arial Black', sans-serif" 
          fontWeight="900"
          fill="url(#a-gradient)"
          stroke="#ffd700"
          strokeWidth="4"
          filter="url(#marker-texture)"
        >
          A
        </text>
      </g>

      {/* L */}
      <g transform="translate(590, 0)">
        <text 
          x="20" 
          y="140" 
          fontSize="160" 
          fontFamily="Impact, 'Arial Black', sans-serif" 
          fontWeight="900"
          fill="url(#l-gradient)"
          stroke="#ffd700"
          strokeWidth="4"
          filter="url(#marker-texture)"
        >
          L
        </text>
      </g>
    </svg>
  );
}
