import { PROMO_VIDEO } from '@/content/video';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

/**
 * Publicité de la landing. `preload="none"` + image d'attente : rien n'est
 * téléchargé avant ▶ (données mobiles) ; jamais de lecture automatique.
 */
export function PromoVideo() {
  if (!PROMO_VIDEO.src) return null;
  return (
    <section aria-labelledby="video" className="mx-auto max-w-5xl px-5 py-24">
      <SectionHeading id="video" eyebrow="En vidéo" title={PROMO_VIDEO.title} />
      <Reveal className="mt-12">
        <div className="overflow-hidden rounded-[var(--radius-sheet)] border border-line bg-surface shadow-[var(--shadow-vx)]">
          <video
            controls
            playsInline
            preload="none"
            poster={PROMO_VIDEO.poster ?? undefined}
            className="aspect-video w-full"
          >
            {PROMO_VIDEO.webm ? <source src={PROMO_VIDEO.webm} type="video/webm" /> : null}
            <source src={PROMO_VIDEO.src} type="video/mp4" />
            {PROMO_VIDEO.captions ? (
              <track
                kind="captions"
                src={PROMO_VIDEO.captions}
                srcLang="fr"
                label="Français"
                default
              />
            ) : null}
          </video>
        </div>
      </Reveal>
    </section>
  );
}
