import { PROMO_VIDEO } from '@/content/video';

import { PromoVideoPlayer } from './promo-video-player';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

/**
 * Publicité de la landing (lecteur : `PromoVideoPlayer`). Jamais de lecture
 * automatique, rien de téléchargé avant ▶ (données mobiles).
 */
export function PromoVideo() {
  if (!PROMO_VIDEO.src) return null;
  return (
    <section aria-labelledby="video" className="mx-auto max-w-5xl px-5 py-24">
      <SectionHeading id="video" eyebrow="En vidéo" title={PROMO_VIDEO.title} />
      <Reveal className="mt-12">
        <div className="overflow-hidden rounded-[var(--radius-sheet)] border border-line bg-surface shadow-[var(--shadow-vx)]">
          <PromoVideoPlayer video={PROMO_VIDEO} />
        </div>
      </Reveal>
    </section>
  );
}
