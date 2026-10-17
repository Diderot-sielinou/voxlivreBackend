import Link from 'next/link';

import { Logo } from './logo';

const NAV = [
  { href: '/#fonctionnement', label: 'Fonctionnement' },
  { href: '/#voix', label: 'Voix' },
  { href: '/#tarifs', label: 'Tarifs' },
  { href: '/#installer', label: 'Installer' },
  { href: '/#questions', label: 'Questions' },
];

/** En-tête collant en verre dépoli ; navigation par ancres sur grand écran. */
export function SiteHeader() {
  return (
    <header className="glass sticky top-0 z-40 border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link
          href="/"
          className="flex min-h-12 items-center gap-2.5 text-lg font-bold tracking-tight text-ink"
        >
          <Logo className="size-9" />
          Voxlivre
        </Link>
        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-elevated hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#installer"
          className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-on-primary transition-opacity hover:opacity-90"
        >
          Télécharger
        </Link>
      </div>
    </header>
  );
}
