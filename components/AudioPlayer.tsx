'use client';

import { useEffect, useRef } from 'react';

type AudioPlayerProps = {
  progressKey: string;
  src: string;
  ariaLabel?: string;
};

export default function AudioPlayer({ progressKey, src, ariaLabel }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return;
    }

    const storageKey = `audio-progress:${progressKey}`;
    const savedProgress = window.localStorage.getItem(storageKey);
    if (savedProgress) {
      audioElement.currentTime = Number(savedProgress);
    }

    const handleTimeUpdate = () => {
      window.localStorage.setItem(storageKey, audioElement.currentTime.toString());
    };

    const handleEnded = () => {
      window.localStorage.removeItem(storageKey);
    };

    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [progressKey]);

  return (
    <audio
      ref={audioRef}
      controls
      preload="metadata"
      aria-label={ariaLabel ?? 'Lecteur audio'}
      className="w-full rounded-xl border border-border/70 bg-card/80 p-3 shadow-inner backdrop-blur-sm dark:border-white/15 dark:bg-white/10"
    >
      <source src={src} type="audio/mpeg" />
      Votre navigateur ne supporte pas la lecture audio.
    </audio>
  );
}
