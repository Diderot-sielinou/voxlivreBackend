'use client';

import { Loader2, Pause, Play, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';

import { SAMPLE_SOURCE, SAMPLE_TEXT, VOICE_SAMPLES } from '@/content/voices';
import { formatClock } from '@/lib/read-along';
import { useReadAlong } from '@/lib/use-read-along';

import { ReadAlongText } from './read-along-text';

/**
 * Les 4 voix de l'app sur le même extrait. Le surlignage suit le vrai son
 * (repères de mots de Polly). Rien n'est téléchargé avant ▶.
 */
export function VoiceDemo() {
  const [voiceId, setVoiceId] = useState(VOICE_SAMPLES[0]!.id);
  const voice = VOICE_SAMPLES.find((v) => v.id === voiceId) ?? VOICE_SAMPLES[0]!;
  const card = useRef<HTMLDivElement>(null);
  const { active, playing, loading, elapsedMs, durationMs, toggle } = useReadAlong(voice, {
    silentLoop: false,
    rootRef: card,
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <fieldset className="space-y-3">
        <legend className="mb-3 text-sm font-medium text-ink-2">Choisissez une voix</legend>
        {VOICE_SAMPLES.map((v) => {
          const selected = v.id === voiceId;
          return (
            <button
              key={v.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setVoiceId(v.id)}
              className={`flex min-h-16 w-full items-center justify-between gap-3 rounded-[var(--radius-card)] border px-5 py-3 text-left transition-colors duration-200 ${
                selected
                  ? 'border-primary bg-primary/10'
                  : 'border-line bg-surface hover:border-primary/40'
              }`}
            >
              <span>
                <span className="block font-semibold text-ink">{v.name}</span>
                <span className="block text-sm text-ink-2">{v.label}</span>
              </span>
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  v.tier === 'natural'
                    ? 'border border-accent/50 bg-surface text-accent'
                    : 'bg-elevated text-ink-2'
                }`}
              >
                {v.tier === 'natural' ? (
                  <>
                    <Sparkles aria-hidden className="size-3.5" strokeWidth={2} />
                    Naturelle
                  </>
                ) : (
                  'Standard'
                )}
              </span>
            </button>
          );
        })}
      </fieldset>

      <div
        ref={card}
        className="flex flex-col rounded-[var(--radius-sheet)] border border-line bg-surface p-6 sm:p-8"
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? `Mettre en pause ${voice.name}` : `Écouter ${voice.name}`}
            className="bg-braise grid size-16 shrink-0 place-items-center rounded-full text-[#1a1205] shadow-[0_10px_30px_-10px_rgb(245_158_11/0.7)] transition-transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <Loader2 aria-hidden className="size-7 animate-spin" strokeWidth={2} />
            ) : playing ? (
              <Pause aria-hidden className="size-7" fill="currentColor" strokeWidth={0} />
            ) : (
              <Play aria-hidden className="ml-1 size-7" fill="currentColor" strokeWidth={0} />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-ink">
              {voice.name} · {voice.tier === 'natural' ? '4 unités' : '1 unité'} par caractère
            </p>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                <div
                  className="bg-braise h-full rounded-full"
                  style={{ width: `${Math.min(100, (elapsedMs / durationMs) * 100)}%` }}
                />
              </div>
              <span className="tabular text-xs text-ink-2">
                {formatClock(elapsedMs)} / {formatClock(durationMs)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-7 border-l-2 border-primary bg-halo py-2 pr-2 pl-4">
          <ReadAlongText
            text={SAMPLE_TEXT}
            marks={voice.marks}
            active={active}
            className="text-[clamp(1.1rem,2.4vw,1.35rem)] leading-[1.75] tracking-[0.01em]"
          />
          <p className="sr-only">{SAMPLE_TEXT}</p>
        </div>
        <p className="mt-5 text-xs text-ink-2">
          {SAMPLE_SOURCE}. Extrait de 12 secondes, environ 70 Ko.
        </p>
      </div>
    </div>
  );
}
