/**
 * Publicité motion design (prompt : doc-projet/prompt-pub-motion-design.md).
 * Tant que `src` est `null`, la section n'est pas affichée. Pour l'activer :
 * déposer les fichiers dans `public/video/`, puis renseigner les chemins.
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
  src: null,
  webm: null,
  poster: null,
  captions: null,
  title: 'Voxlivre en 30 secondes',
};
