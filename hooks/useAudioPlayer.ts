'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Track } from '@/lib/tracks';
import { getNextTrack, getPreviousTrack } from '@/lib/tracks';
import { useAudioAnalyzer } from './useAudioAnalyzer';

interface UseAudioPlayerReturn {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  frequencyData: Uint8Array;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  playTrack: (track: Track) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isLoading, setIsLoading] = useState(false);
  const audioAnalyzer = useAudioAnalyzer();

  // Initialize audio element ONCE
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      audioRef.current.preload = 'auto';
      
      // Connect audio analyzer
      audioAnalyzer.connect(audioRef.current);
      
      console.log('Audio element initialized');
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      audioAnalyzer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount
  
  // Update volume separately
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = useCallback(async () => {
    if (audioRef.current && !isLoading) {
      try {
        console.log('Attempting to play audio:', audioRef.current.src);
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log('Audio playing successfully');
        }
      } catch (error) {
        // Ignore abort errors - they're normal when switching tracks quickly
        if ((error as Error).name !== 'AbortError') {
          console.error('Playback failed:', error);
          console.error('Audio element state:', {
            src: audioRef.current.src,
            readyState: audioRef.current.readyState,
            networkState: audioRef.current.networkState,
            paused: audioRef.current.paused,
          });
        }
      }
    }
  }, [isLoading]);

  const playTrack = useCallback((track: Track) => {
    if (!audioRef.current || !track.audioUrl) {
      console.error('Cannot play track: audio element or URL missing');
      return;
    }

    const audio = audioRef.current;
    
    console.log('Loading track:', track.title, track.audioUrl);
    
    // Pause current playback before loading new track
    audio.pause();
    
    setIsLoading(true);
    setCurrentTrack(track);
    audio.src = track.audioUrl;
    
    // Wait for audio to be ready before playing
    const handleCanPlay = () => {
      console.log('Audio ready to play');
      audio.removeEventListener('canplay', handleCanPlay);
      setIsLoading(false);
      play();
    };
    
    const handleError = (e: Event) => {
      console.error('Error loading track:', e);
      audio.removeEventListener('error', handleError);
      setIsLoading(false);
    };
    
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.load();
  }, [play]);

  const playNext = useCallback(() => {
    if (!currentTrack) return;
    const nextTrack = getNextTrack(currentTrack.id);
    if (nextTrack) {
      playTrack(nextTrack);
    }
  }, [currentTrack, playTrack]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const playPrevious = useCallback(() => {
    if (!currentTrack) return;
    
    // If we're more than 3 seconds into the track, restart it
    if (currentTime > 3) {
      seek(0);
      return;
    }
    
    const previousTrack = getPreviousTrack(currentTrack.id);
    if (previousTrack) {
      playTrack(previousTrack);
    }
  }, [currentTrack, currentTime, playTrack, seek]);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      try {
        audioRef.current.pause();
      } catch (error) {
        console.error('Pause failed:', error);
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, []);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Throttle timeupdate to 2x per second for better performance
    let lastUpdate = 0;
    const handleTimeUpdate = () => {
      const now = Date.now();
      if (now - lastUpdate >= 500) { // Update every 500ms instead of ~250ms
        setCurrentTime(audio.currentTime);
        lastUpdate = now;
      }
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      console.error('Audio playback error');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [playNext]); // Added playNext to dependency array to fix warning and potential closure staleness

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    frequencyData: audioAnalyzer.frequencyData,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
    playTrack,
    playNext,
    playPrevious,
  };
}
