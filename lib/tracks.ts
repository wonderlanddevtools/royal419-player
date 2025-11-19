export interface Track {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
  trackNumber: number;
}

// Track metadata for Royal 419 album
// Note: audioUrl will be updated once Supabase storage is configured
export const tracks: Track[] = [
  {
    id: 'international-luv',
    title: 'International Luv (Western Union Mix)',
    duration: '3:45',
    audioUrl: '', // Will be populated from Supabase
    trackNumber: 1,
  },
  {
    id: 'urgent-opportunity',
    title: 'Urgent Opportunity',
    duration: '4:12',
    audioUrl: '', // Will be populated from Supabase
    trackNumber: 2,
  },
  {
    id: 'wire-transferrable-love',
    title: 'Wire-Transferrable Love',
    duration: '3:58',
    audioUrl: '', // Will be populated from Supabase
    trackNumber: 3,
  },
  {
    id: 'u-got-the-routing',
    title: 'U Got the Routing #!',
    duration: '4:20',
    audioUrl: '', // Will be populated from Supabase
    trackNumber: 4,
  },
  {
    id: 'money-never-lies',
    title: 'Money Never Lies, but, I might',
    duration: '3:33',
    audioUrl: '', // Will be populated from Supabase
    trackNumber: 5,
  },
  {
    id: 'beneficiary-dreams',
    title: 'Beneficiary Dreams',
    duration: '4:05',
    audioUrl: '', // Will be populated from Supabase
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

