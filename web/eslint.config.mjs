// @ts-check
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/** Règles Next.js (Core Web Vitals, TypeScript), comme cinaf-engine-front. */
const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'next-env.d.ts',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default config;
