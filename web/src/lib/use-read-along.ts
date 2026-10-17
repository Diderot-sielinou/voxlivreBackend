'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

import { activeWordAt, spokenDurationMs, type WordMark } from './read-along';

/** Un seul extrait joue à la fois sur la page. */
let currentAudio: HTMLAudioElement | null = null;

const SILENT_PAUSE_MS = 1_600;

/** Relance depuis le début un extrait terminé, et coupe les autres. */
function startFromHere(audio: HTMLAudioElement): Promise<void> {
  if (currentAudio && currentAudio !== audio) currentAudio.pause();
  currentAudio = audio;
  if (audio.ended) audio.currentTime = 0;
  return audio.play();
}

export interface ReadAlong {
  /** Mot surligné ; -1 avant le premier. */
  readonly active: number;
  readonly playing: boolean;
  readonly loading: boolean;
  readonly elapsedMs: number;
  readonly durationMs: number;
  readonly toggle: () => void;
}

/**
 * Synchronise le surlignage sur l'audio quand il joue ; sinon, si
 * `silentLoop`, rejoue le rythme de la voix sans le son (démonstration du
 * hero), seulement quand `rootRef` est à l'écran et sans mouvement réduit.
 * L'audio n'est téléchargé qu'au premier appui (données mobiles).
 */
export function useReadAlong(
  sample: { readonly src: string; readonly marks: readonly WordMark[] },
  { silentLoop, rootRef }: { silentLoop: boolean; rootRef: RefObject<HTMLElement | null> },
): ReadAlong {
  const durationMs = spokenDurationMs(sample.marks);
  const [elapsedMs, setElapsedMs] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frame = useRef(0);

  // Changement de voix : on coupe l'extrait précédent.
  useEffect(() => {
    return () => {
      cancelAnimationFrame(frame.current);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        if (currentAudio === audio) currentAudio = null;
      }
      audioRef.current = null;
      setPlaying(false);
      setLoading(false);
      setElapsedMs(-1);
    };
  }, [sample.src]);

  // Boucle silencieuse, à l'écran seulement.
  useEffect(() => {
    if (!silentLoop || playing) return;
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setElapsedMs(sample.marks[Math.floor(sample.marks.length / 3)]?.[0] ?? 0);
      return;
    }
    let visible = false;
    let origin = performance.now();
    let pausedAt = 0;
    let lastPaint = 0;
    const tick = (now: number) => {
      // ~12 rendus par seconde suffisent (téléphones d'entrée de gamme).
      if (now - lastPaint >= 80) {
        lastPaint = now;
        setElapsedMs((now - origin) % (durationMs + SILENT_PAUSE_MS));
      }
      frame.current = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      const nowVisible = Boolean(entry?.isIntersecting) && !document.hidden;
      if (nowVisible && !visible) {
        origin += performance.now() - pausedAt;
        frame.current = requestAnimationFrame(tick);
      } else if (!nowVisible && visible) {
        pausedAt = performance.now();
        cancelAnimationFrame(frame.current);
      }
      visible = nowVisible;
    });
    pausedAt = origin;
    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [silentLoop, playing, rootRef, durationMs, sample.marks]);

  const toggle = useCallback(() => {
    const existing = audioRef.current;
    if (existing && !existing.paused) {
      existing.pause();
      return;
    }
    let audio = existing;
    if (!audio) {
      const created = new Audio();
      created.preload = 'none';
      created.src = sample.src;
      // Suit `currentTime` à chaque image tant que l'extrait joue.
      const follow = () => {
        setElapsedMs(created.currentTime * 1000);
        if (!created.paused) frame.current = requestAnimationFrame(follow);
      };
      created.addEventListener('waiting', () => setLoading(true));
      created.addEventListener('playing', () => {
        setLoading(false);
        setPlaying(true);
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(follow);
      });
      created.addEventListener('pause', () => setPlaying(false));
      created.addEventListener('ended', () => {
        setPlaying(false);
        setElapsedMs(-1);
      });
      created.addEventListener('error', () => {
        setLoading(false);
        setPlaying(false);
      });
      audioRef.current = created;
      audio = created;
    }
    setLoading(true);
    startFromHere(audio).catch(() => setLoading(false));
  }, [sample.src]);

  return {
    active: elapsedMs < 0 ? -1 : activeWordAt(sample.marks, elapsedMs),
    playing,
    loading,
    elapsedMs: Math.max(0, elapsedMs),
    durationMs,
    toggle,
  };
}
