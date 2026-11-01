import { test, expect } from '@playwright/test';

test('technology search finds the new projects and preserves package tags', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.package-card').first().locator('.card-technologies')).toContainText('WordPress');
  await expect(page.locator('.package-card').nth(1).locator('.card-technologies')).toContainText('要件に応じて選定');
  await expect(page.locator('.portfolio-card').first().locator('.card-technologies')).toContainText('CMS');
  const search = page.getByRole('searchbox', { name: 'ポートフォリオを検索' });
  await search.fill('Next.js');
  const cards = page.locator('.portfolio-card');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('MOMO');
  await cards.first().getByRole('button').click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('.card-technologies')).toContainText('React');
  await expect(dialog.locator('.card-technologies')).toContainText('Vercel');
  await expect(dialog).toContainText('予約システム連携');
  await page.keyboard.press('Escape');
  await search.fill('Astro');
  await expect(cards).toHaveCount(3);
  await expect(cards.first()).toContainText('FITS you. STORE');
  await search.fill('Nuxt');
  await expect(cards).toHaveCount(0);
  await search.fill('');
  await expect(cards).toHaveCount(6);
});
