import { defineConfig, devices } from '@playwright/test';

/**
 * Tests du site exporté (`out/`), servi comme par CloudFront. Un téléphone
 * Android d'entrée de gamme (360 px) et un écran de bureau.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    // En local, le Chrome installé évite de télécharger Chromium ; la CI
    // installe le sien (`playwright install chromium`).
    ...(process.env.CI ? {} : { channel: 'chrome' }),
  },
  projects: [
    {
      name: 'android',
      use: { ...devices['Galaxy S9+'], viewport: { width: 360, height: 760 } },
    },
    {
      name: 'android-sombre',
      use: {
        ...devices['Galaxy S9+'],
        viewport: { width: 360, height: 760 },
        colorScheme: 'dark',
      },
    },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'node scripts/serve-out.mjs',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
