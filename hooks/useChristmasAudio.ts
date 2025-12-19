import { useRef, useCallback, useEffect, useState } from 'react';

const START_TIME = 44;  // 0:44
const END_TIME = 72;    // 1:12
const AUDIO_SRC = '/audio/christmas-list.mp3';

interface UseChristmasAudioReturn {
  play: () => void;
  stop: () => void;
  isPlaying: boolean;
}

export function useChristmasAudio(): UseChristmasAudioReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= END_TIME) {
        audio.currentTime = START_TIME;
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = START_TIME;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.error('Audio playback failed:', err);
    });
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = START_TIME;
    setIsPlaying(false);
  }, []);

  return { play, stop, isPlaying };
}
