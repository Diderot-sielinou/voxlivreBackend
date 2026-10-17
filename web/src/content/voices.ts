import samples from './voice-samples.json';

import type { WordMark } from '@/lib/read-along';

/**
 * Extraits des 4 voix de l'app (Polly : Léa et Rémi naturelles, Céline et
 * Mathieu standard — `conversion/domain/voices.ts` du backend), même texte,
 * avec les repères de mots de Polly convertis en index de caractères.
 */
export interface VoiceSample {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly tier: 'natural' | 'standard';
  readonly src: string;
  readonly marks: readonly WordMark[];
}

export const SAMPLE_TEXT: string = samples.text;
export const SAMPLE_SOURCE: string = samples.source;
// Invariant : un import JSON type les repères en `number[][]`, pas en
// triplets ; le fichier est généré avec exactement 3 nombres par repère.
export const VOICE_SAMPLES = samples.voices as unknown as readonly VoiceSample[];
