import { CalendarDays, Gift, Info } from 'lucide-react';

import {
  CHARS_PER_PAGE,
  FREE_TIER_UNITS,
  formatNumber,
  formatXaf,
  OFFERS,
  pagesFor,
  WELCOME_UNITS,
  WELCOME_VALUE_XAF,
} from '@/content/site';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function Pricing() {
  return (
    <section aria-labelledby="tarifs" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading id="tarifs" eyebrow="Tarifs" title="Commencez sans rien payer">
        L’usage se compte en unités : un caractère lu par une voix standard vaut 1 unité, par une
        voix naturelle 4 unités. Le coût exact s’affiche avant chaque conversion.
      </SectionHeading>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Reveal>
          <article className="h-full rounded-[var(--radius-sheet)] border border-line bg-surface p-7">
            <div className="flex items-center gap-2 text-sm font-medium text-ink-2">
              <CalendarDays aria-hidden className="size-5 text-primary" strokeWidth={1.75} />
              Chaque mois, pour tous
            </div>
            <p className="mt-4 text-4xl font-bold text-ink">
              <span className="tabular">{formatNumber(FREE_TIER_UNITS)}</span>
              <span className="ml-2 text-lg font-medium text-ink-2">unités gratuites</span>
            </p>
            <p className="mt-3 leading-relaxed text-ink-2">
              Avec les voix standard, soit environ{' '}
              <strong className="tabular text-ink">
                {pagesFor(FREE_TIER_UNITS, 'standard')} pages
              </strong>{' '}
              par mois. Renouvelées le 1er de chaque mois.
            </p>
          </article>
        </Reveal>
        <Reveal>
          <article className="relative h-full overflow-hidden rounded-[var(--radius-sheet)] border border-accent/40 bg-surface p-7">
            <div className="absolute -top-16 -right-16 size-48 rounded-full bg-accent/10 blur-3xl" />
            <div className="flex items-center gap-2 text-sm font-semibold text-accent">
              <Gift aria-hidden className="size-5" strokeWidth={1.75} />
              Offert à l’inscription pendant l’essai
            </div>
            <p className="mt-4 text-4xl font-bold text-ink">
              <span className="tabular">{formatNumber(WELCOME_UNITS)}</span>
              <span className="ml-2 text-lg font-medium text-ink-2">unités</span>
            </p>
            <p className="mt-3 leading-relaxed text-ink-2">
              L’équivalent de <strong className="text-ink">{formatXaf(WELCOME_VALUE_XAF)}</strong>,
              utilisable avec toutes les voix : environ{' '}
              <strong className="tabular text-ink">
                {pagesFor(WELCOME_UNITS, 'natural')} pages
              </strong>{' '}
              en voix naturelle ou{' '}
              <strong className="tabular text-ink">{pagesFor(WELCOME_UNITS, 'standard')}</strong> en
              voix standard. Sans date d’expiration.
            </p>
          </article>
        </Reveal>
      </div>

      <div className="mt-16">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <h3 className="text-xl font-semibold text-ink">Ensuite, rechargez par Mobile Money</h3>
          <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-sm text-ink-2">
            <span className="size-2 rounded-full bg-warning" aria-hidden />
            Paiement Orange Money et MTN MoMo : ouverture prochaine
          </p>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {OFFERS.map((offer) => (
            <Reveal as="li" key={offer.code}>
              <article className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-4 sm:p-6">
                <h4 className="font-semibold text-ink">{offer.name}</h4>
                <p className="tabular mt-3 text-2xl font-bold text-ink sm:text-3xl">
                  {formatXaf(offer.priceXaf)}
                </p>
                <p className="tabular mt-1 text-ink-2">{formatNumber(offer.units)} unités</p>
                <p className="mt-4 text-sm text-ink-2">{offer.detail}</p>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 flex items-start gap-2 text-sm text-ink-2">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
          Pages estimées sur {formatNumber(CHARS_PER_PAGE)} caractères par page. Si une conversion
          échoue, les unités vous sont rendues automatiquement.
        </p>
      </div>
    </section>
  );
}
