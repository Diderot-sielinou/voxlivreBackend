import { AudioLines, FileUp, Headphones, ScanText, type LucideIcon } from 'lucide-react';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

interface Step {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly text: string;
}

const STEPS: readonly Step[] = [
  {
    icon: FileUp,
    title: 'Importez un PDF',
    text: 'Un cours, un mémoire, un roman. Même un document scanné : le texte est reconnu automatiquement.',
  },
  {
    icon: ScanText,
    title: 'Vérifiez le texte',
    text: 'Les pages douteuses passent en premier. Corrigez un mot, réintégrez une ligne : vous gardez la main.',
  },
  {
    icon: AudioLines,
    title: 'Choisissez une voix',
    text: 'Quatre voix françaises, standard ou naturelles. Le coût s’affiche avant de lancer, jamais de surprise.',
  },
  {
    icon: Headphones,
    title: 'Écoutez et suivez',
    text: 'Le texte défile et s’illumine mot à mot. Reprenez là où vous en étiez, même hors connexion.',
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="fonctionnement" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading
        id="fonctionnement"
        eyebrow="Fonctionnement"
        title="Du PDF à l’écoute, en quatre gestes"
      >
        Connexion avec Google, aucun réglage compliqué : l’app vous guide de l’import jusqu’à la
        dernière page.
      </SectionHeading>

      <div className="relative mt-16">
        <div
          aria-hidden
          className="absolute top-10 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block"
        />
        <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} className="relative">
              <article className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-colors duration-300 hover:border-primary/50">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-[var(--radius-chip)] border border-line bg-elevated text-accent">
                    <step.icon aria-hidden className="size-6" strokeWidth={1.75} />
                  </span>
                  <span aria-hidden className="tabular text-4xl font-bold text-ink-2/80">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{step.text}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
