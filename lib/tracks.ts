export interface Track {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
  trackNumber: number;
}

// Track metadata for Royal 419 album
export const tracks: Track[] = [
  {
    id: 'international-luv',
    title: 'International Luv (Western Union Mix)',
    duration: '3:24',
    audioUrl: 'https://ktqmflssrjjnhhtmrxub.supabase.co/storage/v1/object/public/royal419-audio/01-international-luv.mp3',
    trackNumber: 1,
  },
  {
    id: 'urgent-opportunity',
    title: 'Urgent Opportunity',
    duration: '2:58',
    audioUrl: 'https://ktqmflssrjjnhhtmrxub.supabase.co/storage/v1/object/public/royal419-audio/02-urgent-opportunity.mp3',
    trackNumber: 2,
  },
  {
    id: 'wire-transferrable-love',
    title: 'Wire-Transferrable Love',
    duration: '4:12',
    audioUrl: 'https://ktqmflssrjjnhhtmrxub.supabase.co/storage/v1/object/public/royal419-audio/03-wire-transferrable-love.mp3',
    trackNumber: 3,
  },
  {
    id: 'money-never-lies',
    title: 'Money Never Lies, but, I might',
    duration: '3:45',
    audioUrl: 'https://ktqmflssrjjnhhtmrxub.supabase.co/storage/v1/object/public/royal419-audio/05-money-never-lies.mp3',
    trackNumber: 4,
  },
  {
    id: 'u-got-routing',
    title: 'U Got the Routing #?',
    duration: '3:18',
    audioUrl: 'https://ktqmflssrjjnhhtmrxub.supabase.co/storage/v1/object/public/royal419-audio/04-u-got-the-routing.mp3',
    trackNumber: 5,
  },
  {
    id: 'beneficiary-dreams',
    title: 'Beneficiary Dreams',
    duration: '2:47',
    audioUrl: 'https://ktqmflssrjjnhhtmrxub.supabase.co/storage/v1/object/public/royal419-audio/06-beneficiary-dreams.mp3',
    trackNumber: 6,
  },
];

export function getTrackById(id: string): Track | undefined {
  return tracks.find((track) => track.id === id);
}

export function getTrackByNumber(trackNumber: number): Track | undefined {
  return tracks.find((track) => track.trackNumber === trackNumber);
}

export function getNextTrack(currentId: string): Track | null {
  const currentIndex = tracks.findIndex((track) => track.id === currentId);
  if (currentIndex === -1 || currentIndex === tracks.length - 1) {
    return null;
  }
  return tracks[currentIndex + 1];
}

export function getPreviousTrack(currentId: string): Track | null {
  const currentIndex = tracks.findIndex((track) => track.id === currentId);
  if (currentIndex <= 0) {
    return null;
  }
  return tracks[currentIndex - 1];
}

// Extended track interface for UI display
export interface ExtendedTrack extends Track {
  color: string;
  angle: number;
  durationSeconds: number;
}

// Color palette for tracks
const trackColors = ['#FFD700', '#FF6347', '#00CED1', '#FF69B4', '#9ACD32', '#FF1493'];

// Convert duration string to seconds
export function durationToSeconds(duration: string): number {
  const parts = duration.split(':');
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);
  return minutes * 60 + seconds;
}

// Get extended track data with color and angle for disc visualization
export function getExtendedTracks(): ExtendedTrack[] {
  return tracks.map((track, index) => {
    const angleStep = 360 / tracks.length;
    return {
      ...track,
      color: trackColors[index % trackColors.length],
      angle: 15 + index * angleStep,
      durationSeconds: durationToSeconds(track.duration),
    };
  });
}

// Get extended track by index
export function getExtendedTrackByIndex(index: number): ExtendedTrack | undefined {
  const extendedTracks = getExtendedTracks();
  return extendedTracks[index];
}
