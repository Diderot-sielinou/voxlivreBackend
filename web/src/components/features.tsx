import {
  Bookmark,
  Highlighter,
  Lock,
  MoonStar,
  ScanLine,
  Signal,
  WifiOff,
  type LucideIcon,
} from 'lucide-react';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

interface Feature {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly text: string;
}

const FEATURES: readonly Feature[] = [
  {
    icon: WifiOff,
    title: 'Hors connexion',
    text: 'Téléchargez un livre une fois, écoutez-le partout. Votre position se synchronise au retour du réseau.',
  },
  {
    icon: ScanLine,
    title: 'Scans compris',
    text: 'Les PDF photographiés ou scannés sont lus par reconnaissance de caractères, page par page.',
  },
  {
    icon: Bookmark,
    title: 'Marque-pages et sommaire',
    text: 'Notez un passage, sautez à un chapitre : la table des matières est retrouvée dans le document.',
  },
  {
    icon: MoonStar,
    title: 'Minuterie de sommeil',
    text: 'Endormez-vous en écoutant : la lecture s’arrête à l’heure choisie ou en fin de page.',
  },
  {
    icon: Signal,
    title: 'Économe en données',
    text: 'Audio compressé, téléchargement en Wi-Fi par défaut, reprise d’un import coupé là où il s’était arrêté.',
  },
];

export function Features() {
  return (
    <section aria-labelledby="fonctionnalites" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading
        id="fonctionnalites"
        eyebrow="Fonctionnalités"
        title="Pensé pour lire vraiment, ici"
      >
        Un téléphone d’entrée de gamme, une connexion qui va et vient, des données qui coûtent :
        Voxlivre a été construit pour ces conditions-là.
      </SectionHeading>

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:row-span-2">
          <article className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-sheet)] border border-line bg-surface p-7">
            <span className="grid size-12 place-items-center rounded-[var(--radius-chip)] border border-line bg-elevated text-accent">
              <Highlighter aria-hidden className="size-6" strokeWidth={1.75} />
            </span>
            <h3 className="mt-6 text-2xl font-semibold text-ink">Le texte suit la voix</h3>
            <p className="mt-3 leading-relaxed text-ink-2">
              Chaque mot est surligné à l’instant où il est prononcé, la phrase en cours est marquée
              dans la marge. Idéal pour réviser, apprendre le français ou lire sans fatiguer vos
              yeux.
            </p>
            <div className="mt-auto rounded-[var(--radius-card)] border border-line bg-bg p-5 pt-5">
              <p className="border-l-2 border-primary bg-halo py-1.5 pl-3 font-reading text-[17px] leading-[1.75] text-ink-2">
                <span className="text-ink">La lecture devient </span>
                <span className="word" data-active="true">
                  vivante
                </span>
                <span>, page après page, à votre rythme.</span>
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                  <div className="bg-braise h-full w-2/5 rounded-full" />
                </div>
                <span className="tabular text-xs text-ink-2">0:12 / 0:31</span>
              </div>
            </div>
          </article>
        </Reveal>

        {FEATURES.map((feature) => (
          <Reveal key={feature.title}>
            <article className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-colors duration-300 hover:border-primary/50">
              <feature.icon aria-hidden className="size-6 text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-semibold text-ink">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{feature.text}</p>
            </article>
          </Reveal>
        ))}

        <Reveal className="lg:col-span-2">
          <article className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:flex-row sm:items-center">
            <span className="grid size-12 shrink-0 place-items-center rounded-[var(--radius-chip)] border border-line bg-elevated text-success">
              <Lock aria-hidden className="size-6" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-ink">Vos documents restent les vôtres</h3>
              <p className="mt-1 leading-relaxed text-ink-2">
                Le PDF est supprimé dès que son texte est extrait. Le texte et l’audio ne sont
                visibles que par vous. Aucune publicité, aucun traceur.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
