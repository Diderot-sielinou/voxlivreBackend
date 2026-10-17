import { ChevronDown } from 'lucide-react';

import { CONTACT_EMAIL, FAQ } from '@/content/site';

import { SectionHeading } from './section-heading';

/** Questions en `<details>` : accessibles au clavier, sans JavaScript. */
export function FaqSection() {
  return (
    <section aria-labelledby="questions" className="mx-auto max-w-3xl px-5 py-24">
      <SectionHeading id="questions" eyebrow="Questions" title="Ce que nos testeurs demandent">
        Une autre question ? Écrivez-nous à{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline underline-offset-4">
          {CONTACT_EMAIL}
        </a>
        .
      </SectionHeading>
      <div className="mt-12 space-y-3">
        {FAQ.map((item) => (
          <details
            key={item.q}
            className="group rounded-[var(--radius-card)] border border-line bg-surface transition-colors open:border-primary/50"
          >
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown
                aria-hidden
                className="size-5 shrink-0 text-ink-2 transition-transform duration-300 group-open:rotate-180"
                strokeWidth={1.75}
              />
            </summary>
            <p className="px-6 pb-6 leading-relaxed text-ink-2">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
