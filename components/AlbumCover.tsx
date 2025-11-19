'use client';

export function AlbumCover() {
  return (
    <div className="relative w-full h-full bg-black">
      <img
        src="/images/album-cover.png"
        alt="Royal 419 Album Cover"
        className="w-full h-full object-cover"
        onError={(e) => {
          console.error('Failed to load album cover image');
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
}

