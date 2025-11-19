'use client';

import { RoyalLogo } from './RoyalLogo';
import { FourOneNineLogo } from './FourOneNineLogo';
import { Graphic419 } from './Graphic419';

export function AlbumArtwork() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#3d2b7c]">
      {/* Starry background pattern - static to avoid hydration mismatch */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="star-pattern-bg" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="white" opacity="0.5" />
            <circle cx="25" cy="30" r="1" fill="white" opacity="0.3" />
            <circle cx="40" cy="10" r="1.5" fill="white" opacity="0.4" />
            <circle cx="15" cy="45" r="0.8" fill="white" opacity="0.6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#star-pattern-bg)" />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-4">
        
        {/* Royal Logo */}
        <div className="w-full relative z-10">
          <RoyalLogo className="w-full h-auto drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]" />
        </div>

        {/* 419 Graphic */}
        <div className="w-full relative z-10 -mt-8">
          <Graphic419 />
        </div>
      </div>
    </div>
  );
}
