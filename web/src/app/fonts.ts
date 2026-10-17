import localFont from 'next/font/local';

/**
 * Polices de l'app mobile (licence OFL, textes dans src/fonts/), réduites aux
 * caractères latins et converties en WOFF2 : ~10-16 Ko par graisse, servies
 * par le site lui-même (aucune requête externe, CSP `font-src 'self'`).
 */
export const jakarta = localFont({
  variable: '--font-jakarta',
  display: 'swap',
  src: [
    { path: '../fonts/PlusJakartaSans-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/PlusJakartaSans-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/PlusJakartaSans-600.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/PlusJakartaSans-700.woff2', weight: '700', style: 'normal' },
  ],
});

export const atkinson = localFont({
  variable: '--font-atkinson',
  display: 'swap',
  preload: false,
  src: [
    { path: '../fonts/AtkinsonHyperlegible-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/AtkinsonHyperlegible-700.woff2', weight: '700', style: 'normal' },
  ],
});
