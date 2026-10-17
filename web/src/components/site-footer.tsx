import Link from 'next/link';

import { CONTACT_EMAIL } from '@/content/site';

import { Logo } from './logo';

const LINKS = [
  { href: '/confidentialite', label: 'Confidentialité' },
  { href: '/conditions', label: 'Conditions d’utilisation' },
  { href: '/supprimer-compte', label: 'Supprimer mon compte' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-ink">
            <Logo className="size-8" />
            Voxlivre
          </Link>
          <p className="max-w-sm text-sm text-ink-2">
            Vos PDF deviennent des livres audio, le texte s’illumine mot à mot. Conçu à Yaoundé pour
            les lecteurs du Cameroun.
          </p>
        </div>
        <nav aria-label="Informations légales" className="space-y-3">
          <h2 className="text-sm font-semibold text-ink">Informations</h2>
          <ul className="space-y-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-ink">Contact</h2>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex min-h-11 items-center text-sm break-all text-ink-2 transition-colors hover:text-ink"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-sm text-ink-2">Sans publicité, sans traceur, sans cookie.</p>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-ink-2">
        © 2026 Voxlivre · Sielinou Fonou Diderot, Yaoundé
      </div>
    </footer>
  );
}
