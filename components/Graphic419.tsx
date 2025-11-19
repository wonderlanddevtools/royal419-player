import React from 'react';

export function Graphic419() {
  return (
    <svg viewBox="0 0 500 250" className="w-full h-auto mt-4 drop-shadow-[5px_5px_0px_#3d2b7c]">
      <defs>
        <pattern id="stars-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <text x="0" y="15" fill="white" fontSize="15">★</text>
        </pattern>
        <radialGradient id="eye-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" />
          <stop offset="40%" stopColor="#5c2c0c" />
          <stop offset="100%" stopColor="#fff" />
        </radialGradient>
      </defs>

      <g transform="translate(50, 20)">
        {/* 4 - Fill with star pattern/texture */}
        <g transform="translate(0, 0)">
          <path d="M80,180 L80,140 L120,140 L120,180 L140,180 L140,20 L110,20 L110,110 L30,110 L30,140 L80,140 L30,180 Z" 
            fill="#1a1240" stroke="#ffd700" strokeWidth="3" />
          <path d="M35,115 L105,115 L105,25 L135,25 L135,175 L125,175 L125,145 L85,145 L85,175 L35,175 Z" 
            fill="url(#stars-pattern)" />
        </g>

        {/* 1 - Mushroom-like organic shape */}
        <g transform="translate(160, 0)">
          <path d="M40,180 C20,180 20,160 40,160 C50,160 55,140 60,100 C65,60 40,50 20,50 C10,50 10,20 50,20 C90,20 90,50 70,60 C75,100 80,140 90,160 C110,160 110,180 90,180 Z" 
            fill="#fff" stroke="black" strokeWidth="3" />
          <path d="M50,20 C70,20 80,40 50,40 C20,40 30,20 50,20" fill="#ffd700" />
          <path d="M60,60 C60,100 60,140 60,180" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="4,4" />
        </g>

        {/* 9 - Pink/Purple swirl with the "Eye" graphic inside */}
        <g transform="translate(280, 0)">
          <path d="M100,180 C80,180 70,150 80,120 C60,130 40,120 30,90 C20,60 40,20 80,20 C120,20 140,60 130,90 C120,120 100,130 100,180 Z" 
            fill="#ff0099" stroke="white" strokeWidth="3" />
          
          {/* The Eye */}
          <g transform="translate(80, 75) scale(0.8)">
            <path d="M-30,0 Q0,-20 30,0 Q0,20 -30,0 Z" fill="white" stroke="black" strokeWidth="2" />
            <circle cx="0" cy="0" r="12" fill="url(#eye-grad)" />
            <circle cx="3" cy="-3" r="3" fill="white" />
          </g>
          
          {/* Swirl/Comet tail */}
          <path d="M130,50 Q150,40 160,20 M135,60 Q155,50 165,30 M140,70 Q160,60 170,40" 
            fill="none" stroke="#ffd700" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}
