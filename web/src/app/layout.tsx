import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SITE_URL } from '@/content/site';

import { atkinson, jakarta } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Voxlivre — Vos PDF deviennent des livres audio synchronisés',
    template: '%s — Voxlivre',
  },
  description:
    'Voxlivre transforme vos PDF en livres audio : le texte s’illumine mot à mot pendant l’écoute. Hors connexion, voix françaises naturelles, prix en FCFA. Pensé pour le Cameroun.',
  applicationName: 'Voxlivre',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'fr_CM',
    url: SITE_URL,
    siteName: 'Voxlivre',
    title: 'Voxlivre — Lisez. Écoutez. Vivez le livre.',
    description:
      'Vos PDF deviennent des livres audio dont le texte s’illumine mot à mot. Application Android, 2 000 FCFA d’unités offerts.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Voxlivre' }],
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0b1a' },
    { media: '(prefers-color-scheme: light)', color: '#fbf7f0' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${atkinson.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only z-50 rounded-full bg-accent px-5 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
