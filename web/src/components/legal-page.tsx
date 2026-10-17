import { ArrowUp, CalendarCheck, ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

export interface LegalSection {
  readonly id: string;
  readonly title: string;
}

/**
 * Gabarit des pages légales : en-tête, sommaire (collant sur grand écran,
 * repliable sur mobile) et texte en typographie de lecture (`.prose-vx`).
 */
export function LegalPage({
  title,
  intro,
  updated,
  sections,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: readonly LegalSection[];
  children: ReactNode;
}) {
  return (
    <div className="bg-grid">
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:py-20">
          <p className="text-sm font-semibold tracking-[0.14em] text-accent uppercase">
            Informations légales
          </p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.08] font-bold text-ink">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{intro}</p>
          <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink-2">
            <CalendarCheck aria-hidden className="size-4 text-success" strokeWidth={1.75} />
            Dernière mise à jour : {updated}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[15rem_1fr] lg:gap-16">
        <nav aria-label="Sommaire" className="lg:sticky lg:top-24 lg:self-start">
          {/* Mobile : replié pour laisser le texte en premier. */}
          <details className="group rounded-[var(--radius-card)] border border-line bg-surface lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              Sommaire
              <ChevronDown
                aria-hidden
                className="size-5 text-ink-2 transition-transform group-open:rotate-180"
                strokeWidth={1.75}
              />
            </summary>
            <TocLinks sections={sections} />
          </details>
          {/* Grand écran : toujours visible, collant. */}
          <div className="hidden lg:block">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-ink-2 uppercase">
              Sommaire
            </p>
            <TocLinks sections={sections} />
          </div>
        </nav>

        <article className="prose-vx max-w-[68ch]">
          {children}
          <p className="not-prose mt-14">
            <a
              href="#contenu"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-ink-2 transition-colors hover:text-ink"
            >
              <ArrowUp aria-hidden className="size-4" strokeWidth={1.75} />
              Haut de page
            </a>
          </p>
        </article>
      </div>
    </div>
  );
}

function TocLinks({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <ol className="space-y-0.5 px-3 pb-3 lg:px-0 lg:pb-0">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex min-h-10 items-center border-l-2 border-transparent px-3 text-sm text-ink-2 transition-colors hover:border-primary hover:bg-elevated hover:text-ink"
          >
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
