'use client';

import { useEffect, useRef } from 'react';

export default function AudioPlayer({ slug, src }: { slug: string; src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return;
    }

    const storageKey = `course:${slug}:progress`;
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
  }, [slug]);

  return (
    <audio
      ref={audioRef}
      controls
      preload="metadata"
      aria-label="Lecteur audio du cours"
      className="w-full rounded-xl border border-border bg-card p-3"
    >
      <source src={src} type="audio/mpeg" />
      Votre navigateur ne supporte pas la lecture audio.
    </audio>
  );
}
