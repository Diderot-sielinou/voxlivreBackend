import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';
import { VoiceDemo } from './voice-demo';

export function VoicesSection() {
  return (
    <section aria-labelledby="voix" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeading id="voix" eyebrow="Les voix" title="Écoutez avant de télécharger">
        Deux voix naturelles, au phrasé proche d’une lecture humaine, et deux voix standard, plus
        économes. Appuyez sur lecture : le texte suit la voix.
      </SectionHeading>
      <Reveal className="mt-14">
        <VoiceDemo />
      </Reveal>
    </section>
  );
}
