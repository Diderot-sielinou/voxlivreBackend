/**
 * Publicité motion design (prompt : doc-projet/prompt-pub-motion-design.md).
 * Rendue avec le projet Remotion du prompt (30 s, 16:9). `src` à `null`
 * masque la section.
 * Formats : MP4 H.264 (lu partout) + WebM VP9 (plus léger), 16:9, ≤ 4 Mo,
 * muette, avec une image d'attente.
 */
export const PROMO_VIDEO: {
  readonly src: string | null;
  readonly webm: string | null;
  readonly poster: string | null;
  readonly captions: string | null;
  readonly title: string;
} = {
  src: '/video/voxlivre-30s.mp4',
  webm: '/video/voxlivre-30s.webm',
  poster: '/video/voxlivre-poster.webp',
  captions: '/video/voxlivre-30s.fr.vtt',
  title: 'Voxlivre en 30 secondes',
};
