'use client';

import { Play } from 'lucide-react';
import { useRef, useState, useSyncExternalStore } from 'react';

const noSubscription = () => () => {};

import type { PROMO_VIDEO } from '@/content/video';

/**
 * Lecteur de la publicité : un grand ▶ centré (l'image d'attente montre le
 * bouton pause du lecteur de l'app, trompeur), puis les contrôles natifs.
 * `preload="none"` : rien n'est téléchargé avant ce geste.
 */
export function PromoVideoPlayer({ video }: { video: typeof PROMO_VIDEO }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  // Sans JavaScript, le grand ▶ ne ferait rien : contrôles natifs seulement.
  const hydrated = useSyncExternalStore(
    noSubscription,
    () => true,
    () => false,
  );
  if (!video.src) return null;
  const overlay = hydrated && !started;
  return (
    <div className="relative">
      <video
        ref={ref}
        controls={!overlay}
        playsInline
        preload="none"
        poster={video.poster ?? undefined}
        onPlay={() => setStarted(true)}
        className="aspect-video w-full"
      >
        {video.webm ? <source src={video.webm} type="video/webm" /> : null}
        <source src={video.src} type="video/mp4" />
        {video.captions ? (
          <track kind="captions" src={video.captions} srcLang="fr" label="Français" default />
        ) : null}
      </video>
      {overlay ? (
        <button
          type="button"
          onClick={() => {
            setStarted(true);
            void ref.current?.play();
          }}
          className="group absolute inset-0 grid place-items-center bg-[rgb(11_11_26/0.35)]"
          aria-label={`Lire la vidéo : ${video.title}`}
        >
          <span className="bg-braise grid size-20 place-items-center rounded-full text-[#1a1205] shadow-[0_16px_40px_-12px_rgb(249_115_22/0.8)] transition-transform duration-200 group-hover:scale-105 sm:size-24">
            <Play aria-hidden className="ml-1 size-9" fill="currentColor" strokeWidth={0} />
          </span>
        </button>
      ) : null}
    </div>
  );
}
