'use client';

interface FourOneNineLogoProps {
  className?: string;
}

export function FourOneNineLogo({ className = '' }: FourOneNineLogoProps) {
  return (
    <svg 
      viewBox="0 0 900 300" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="four-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00b8c2" />
          <stop offset="50%" stopColor="#6600cc" />
          <stop offset="100%" stopColor="#ff0099" />
        </linearGradient>
        
        <linearGradient id="one-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ccff00" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ccff00" />
        </linearGradient>
        
        <radialGradient id="nine-gradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ff0099" />
          <stop offset="50%" stopColor="#6600cc" />
          <stop offset="100%" stopColor="#ff0099" />
        </radialGradient>

        {/* Pattern for 4 */}
        <pattern id="star-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="20,5 23,15 33,15 25,22 28,32 20,25 12,32 15,22 7,15 17,15" fill="#ffd700" opacity="0.6"/>
        </pattern>

        {/* Texture filter */}
        <filter id="rough-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
          <feDisplacementMap in="SourceGraphic" scale="4" />
        </filter>
      </defs>

      {/* 4 - with star pattern inside */}
      <g transform="translate(0, 0)">
        <text 
          x="20" 
          y="230" 
          fontSize="240" 
          fontFamily="'Permanent Marker', Impact, sans-serif" 
          fontWeight="900"
          fill="url(#four-gradient)"
          stroke="#000000"
          strokeWidth="6"
          filter="url(#rough-texture)"
        >
          4
        </text>
        {/* Star fill overlay */}
        <text 
          x="20" 
          y="230" 
          fontSize="240" 
          fontFamily="'Permanent Marker', Impact, sans-serif" 
          fontWeight="900"
          fill="url(#star-pattern)"
          opacity="0.7"
        >
          4
        </text>
      </g>

      {/* 1 - mushroom/organic shape */}
      <g transform="translate(280, 0)">
        <text 
          x="20" 
          y="230" 
          fontSize="240" 
          fontFamily="'Permanent Marker', Impact, sans-serif" 
          fontWeight="900"
          fill="url(#one-gradient)"
          stroke="#000000"
          strokeWidth="6"
          filter="url(#rough-texture)"
        >
          1
        </text>
        {/* Organic decoration */}
        <ellipse cx="80" cy="80" rx="25" ry="35" fill="#ff6600" opacity="0.6"/>
        <ellipse cx="80" cy="180" rx="30" ry="25" fill="#00b8c2" opacity="0.6"/>
      </g>

      {/* 9 - with eye inside */}
      <g transform="translate(480, 0)">
        <text 
          x="20" 
          y="230" 
          fontSize="240" 
          fontFamily="'Permanent Marker', Impact, sans-serif" 
          fontWeight="900"
          fill="url(#nine-gradient)"
          stroke="#000000"
          strokeWidth="6"
          filter="url(#rough-texture)"
        >
          9
        </text>
        
        {/* Eye inside the 9 */}
        <g transform="translate(120, 140)">
          {/* Eye white */}
          <ellipse cx="0" cy="0" rx="45" ry="35" fill="#ffffff" stroke="#000000" strokeWidth="3"/>
          {/* Iris */}
          <circle cx="0" cy="0" r="20" fill="#6600cc"/>
          {/* Pupil */}
          <circle cx="0" cy="0" r="10" fill="#000000"/>
          {/* Highlight */}
          <circle cx="-5" cy="-5" r="4" fill="#ffffff"/>
          {/* Eyelash decorations */}
          <line x1="-45" y1="-20" x2="-55" y2="-30" stroke="#000000" strokeWidth="3" strokeLinecap="round"/>
          <line x1="-35" y1="-30" x2="-40" y2="-42" stroke="#000000" strokeWidth="3" strokeLinecap="round"/>
          <line x1="35" y1="-30" x2="40" y2="-42" stroke="#000000" strokeWidth="3" strokeLinecap="round"/>
          <line x1="45" y1="-20" x2="55" y2="-30" stroke="#000000" strokeWidth="3" strokeLinecap="round"/>
        </g>
      </g>
    </svg>
  );
}

