'use client';

import { Bookmark, ChevronDown, ListTree, Pause, Play, RotateCcw, RotateCw } from 'lucide-react';
import { useRef } from 'react';

import { SAMPLE_TEXT, VOICE_SAMPLES } from '@/content/voices';
import { formatClock } from '@/lib/read-along';
import { useReadAlong } from '@/lib/use-read-along';

import { ReadAlongText } from './read-along-text';

const SAMPLE = VOICE_SAMPLES[0]!;

/**
 * Maquette du lecteur de l'app (écran plein, fond « Nuit »). Rejoue le
 * surlignage en silence tant qu'elle est visible ; ▶ fait entendre la voix
 * de Léa avec le même texte.
 */
export function PhonePlayer() {
  const root = useRef<HTMLDivElement>(null);
  const { active, playing, loading, elapsedMs, durationMs, toggle } = useReadAlong(SAMPLE, {
    silentLoop: true,
    rootRef: root,
  });
  const progress = durationMs === 0 ? 0 : Math.min(1, elapsedMs / durationMs);

  return (
    <div
      ref={root}
      className="relative mx-auto w-[min(100%,330px)] rounded-[48px] border border-white/10 bg-[#05050d] p-2.5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_255_255/0.04)_inset]"
    >
      <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_50%_15%,#1e1b4b_0%,#0b0b1a_70%)] text-[#f5f3ff]">
        {/* Encoche */}
        <div className="absolute top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

        <div className="flex items-center justify-between px-5 pt-11 text-[#a5a3c2]">
          <ChevronDown aria-hidden className="size-5" strokeWidth={1.75} />
          <div className="text-center">
            <p className="text-[11px] tracking-[0.12em] uppercase">Chapitre 1</p>
            <p className="text-[13px] font-semibold text-[#f5f3ff]">Le Tour du monde en 80 jours</p>
          </div>
          <ListTree aria-hidden className="size-5" strokeWidth={1.75} />
        </div>

        <div className="relative flex-1 px-5 pt-6">
          <div className="border-l-2 border-[#6366f1] bg-[rgb(99_102_241/0.12)] py-2 pr-2 pl-3 [--vx-on-word:#1a1205] [--vx-text-2:#a5a3c2] [--vx-text:#f5f3ff] [--vx-word:#f59e0b]">
            <ReadAlongText
              text={SAMPLE_TEXT}
              marks={SAMPLE.marks}
              active={active}
              className="text-[15px] leading-[1.75] tracking-[0.01em]"
            />
          </div>
          <p className="mt-4 font-reading text-[15px] leading-[1.75] text-[#a5a3c2]/45">
            Il ne fréquentait ni la Bourse, ni la Banque, ni aucun des comptoirs de la Cité. Ni les
            bassins ni les docks de Londres n’avaient jamais reçu un navire ayant pour armateur
            Phileas Fogg…
          </p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b0b1a] to-transparent" />
        </div>

        <div className="mx-3 mb-3 rounded-[28px] border border-white/[0.08] bg-[rgb(22_22_43/0.75)] px-4 pt-3 pb-4 backdrop-blur-xl">
          <div className="h-1 overflow-hidden rounded-full bg-white/10" role="presentation">
            <div
              className="bg-braise h-full rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="tabular mt-1.5 flex justify-between text-[11px] text-[#a5a3c2]">
            <span>{formatClock(elapsedMs)}</span>
            <span>{formatClock(durationMs)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="tabular rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold">
              1,0×
            </span>
            <RotateCcw aria-hidden className="size-5 text-[#a5a3c2]" strokeWidth={1.75} />
            <button
              type="button"
              onClick={toggle}
              aria-label={
                playing ? 'Mettre en pause l’extrait' : 'Écouter l’extrait avec la voix de Léa'
              }
              className="bg-braise grid size-16 place-items-center rounded-full text-[#1a1205] shadow-[0_10px_30px_-8px_rgb(245_158_11/0.7)] transition-transform active:scale-95"
            >
              {playing ? (
                <Pause aria-hidden className="size-7" fill="currentColor" strokeWidth={0} />
              ) : (
                <Play
                  aria-hidden
                  className={`ml-1 size-7 ${loading ? 'animate-pulse' : ''}`}
                  fill="currentColor"
                  strokeWidth={0}
                />
              )}
            </button>
            <RotateCw aria-hidden className="size-5 text-[#a5a3c2]" strokeWidth={1.75} />
            <Bookmark aria-hidden className="size-5 text-[#a5a3c2]" strokeWidth={1.75} />
          </div>
        </div>
      </div>
    </div>
  );
}
