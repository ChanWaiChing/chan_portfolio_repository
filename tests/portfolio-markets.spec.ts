import { test, expect } from '@playwright/test';
import { portfolioItems } from '../lib/projects';

test('market filters isolate projects and preserve the global selection in the URL', async ({ page }, testInfo) => {
  await page.goto('/');
  const section = page.locator('#works');
  const markets = section.locator('.portfolio-markets [role="group"]');
  await expect(markets.locator('[data-market="japan"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(markets.locator('[data-market="japan"]')).toContainText('32');
  await markets.locator('[data-market="global"]').click();
  await expect(section.locator('.market-period')).toContainText('2019–2024');
  await expect(section.locator('.portfolio-card')).toHaveCount(6);
  await expect(section.locator('.catalog-filters [data-category="すべて"]')).toContainText('7');
  await expect(section.locator('.catalog-filters [data-category="ウェブサイト"]')).toContainText('5');
  await expect(section.locator('.catalog-filters [data-category="ECサイト"]')).toContainText('2');
  const globals = portfolioItems.filter(item => item.market === 'global');
  for (let n = 0; n < globals.length; n++) {
    if (n === 6) await section.getByRole('button', { name: 'Page 2', exact: true }).click();
    const item = globals[n];
    const card = section.locator('.portfolio-card').nth(n % 6);
    await expect(card.locator('h3')).toHaveText(item.shortTitle!);
    await card.scrollIntoViewIfNeeded();
    await card.locator('img').evaluate((image: HTMLImageElement) => image.decode());
    await card.getByRole('button').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('h2')).toHaveText(item.title);
    await expect(dialog.locator('.project-visit')).toHaveAttribute('href', item.url);
    await expect(dialog.locator('.project-details')).toContainText(item.description);
    await expect(dialog.locator('.project-details')).toContainText('Skills applied');
    if (!item.technologies.length) await expect(dialog.locator('.project-details')).not.toContainText('未掲載');
    await page.keyboard.press('Escape');
  }
  await page.reload();
  await expect(markets.locator('[data-market="global"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(section.locator('.portfolio-card')).toHaveCount(1);
  await section.locator('[data-category="ECサイト"]').click();
  await expect(section.locator('.portfolio-card')).toHaveCount(2);
  await section.getByRole('searchbox').fill('WooCommerce');
  await expect(section.locator('.portfolio-card')).toHaveCount(1);
  await markets.locator('[data-market="japan"]').click();
  await expect(section.getByRole('searchbox')).toHaveValue('');
  await expect(section.locator('.portfolio-card')).toHaveCount(6);
  await markets.locator('[data-market="global"]').click();
  await section.scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('global-portfolio.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
