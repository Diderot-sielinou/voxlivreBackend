import type { NextConfig } from 'next';

/**
 * Export statique (ADR-0031) : `next build` écrit `out/`, synchronisé tel quel
 * dans le bucket du site derrière CloudFront. Aucun serveur Node en prod.
 *
 * - `trailingSlash: false` : `/conditions` → `out/conditions.html`, que la
 *   fonction CloudFront `router.js` sert déjà (URL propres, ADR-0020).
 * - `images.unoptimized` : pas d'optimiseur d'images sans serveur ; les images
 *   sont livrées déjà compressées (WebP) et dimensionnées.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
