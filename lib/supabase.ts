import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We don't need auth for this public player
  },
});

/**
 * Get the public URL for a file in Supabase Storage
 * @param bucket - The storage bucket name
 * @param path - The file path in the bucket
 * @returns The public URL for the file
 */
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Get all track URLs from Supabase Storage
 * @returns Object mapping track IDs to their audio URLs
 */
export function getTrackUrls() {
  return {
    'international-luv': getPublicUrl('royal419-audio', '01-international-luv.mp3'),
    'urgent-opportunity': getPublicUrl('royal419-audio', '02-urgent-opportunity.mp3'),
    'wire-transferrable-love': getPublicUrl('royal419-audio', '03-wire-transferrable-love.mp3'),
    'u-got-the-routing': getPublicUrl('royal419-audio', '04-u-got-the-routing.mp3'),
    'money-never-lies': getPublicUrl('royal419-audio', '05-money-never-lies.mp3'),
    'beneficiary-dreams': getPublicUrl('royal419-audio', '06-beneficiary-dreams.mp3'),
  };
}

