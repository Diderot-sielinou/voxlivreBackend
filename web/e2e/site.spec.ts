import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import apk from '../src/content/apk.json';

const PAGES = ['/', '/confidentialite', '/conditions', '/supprimer-compte'];

for (const path of PAGES) {
  test(`${path} : aucune violation d'accessibilité (WCAG 2.1 AA)`, async ({ page }) => {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      violations.flatMap((v) =>
        v.nodes.map((n) => `${v.id} ${n.target.join(' ')} ${n.any[0]?.message ?? ''}`),
      ),
    ).toEqual([]);
  });

  test(`${path} : pas de défilement horizontal`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('le bouton principal pointe vers l’APK publié, version et empreinte affichées', async ({
  page,
}) => {
  await page.goto('/');
  const file = apk.files[0]!;
  const cta = page.getByRole('link', { name: /Télécharger l’APK/ }).first();
  await expect(cta).toHaveAttribute('href', file.path);
  await expect(cta).toContainText(`v${apk.version}`);
  await expect(page.getByText(file.sha256)).toBeVisible();
});

test('le contenu est visible sans JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Commencez sans rien payer' })).toBeVisible();
  await page.getByRole('heading', { name: 'Commencez sans rien payer' }).scrollIntoViewIfNeeded();
  const opacity = await page
    .getByRole('heading', { name: 'Installé en moins de deux minutes' })
    .evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(opacity)).toBeGreaterThan(0);
  await context.close();
});

test('un extrait de voix se charge seulement à la demande', async ({ page }) => {
  const audio: string[] = [];
  page.on('request', (req) => {
    if (req.url().endsWith('.mp3')) audio.push(req.url());
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(audio).toEqual([]);
});

test('les URL propres et la page 404 répondent comme sur CloudFront', async ({ page }) => {
  const legal = await page.goto('/conditions');
  expect(legal?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Conditions d’utilisation');
  const missing = await page.goto('/nexiste-pas');
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page introuvable');
});

test('▶ joue l’extrait et le surlignage avance avec le son', async ({ page }) => {
  await page.goto('/#voix');
  const card = page.locator('section[aria-labelledby="voix"]');
  const audio = page.waitForRequest((req) => req.url().endsWith('/audio/fr-f1.mp3'));
  await card.getByRole('button', { name: 'Écouter Léa' }).click();
  await audio;
  const active = card.locator('.word[data-active="true"]');
  await expect(active).toHaveCount(1, { timeout: 5_000 });
  const first = await active.textContent();
  await expect.poll(async () => active.textContent(), { timeout: 5_000 }).not.toBe(first);
  await card.getByRole('button', { name: 'Mettre en pause Léa' }).click();
});
