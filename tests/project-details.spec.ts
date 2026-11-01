import { test, expect } from '@playwright/test';
import { portfolioItems } from '../lib/projects';

test('all supplied projects show complete details, images and distinct links', async ({ page }, testInfo) => {
  test.setTimeout(120000);
  await page.goto('/');
  const section = page.locator('#works');
  const pagination = section.getByRole('navigation', { name: 'ポートフォリオのページ切り替え' });
  const japanItems = portfolioItems.filter(item => item.market === "japan");
  expect(japanItems).toHaveLength(32);
  const links = new Set<string>();
  for (let n = 0; n < 6; n++) {
    await pagination.getByRole('button', { name: `${n + 1}ページ目` }).click();
    const cards = section.locator('.portfolio-card');
    const count = n === 5 ? 2 : 6;
    await expect(cards).toHaveCount(count);
    for (let i = 0; i < count; i++) {
      const item = japanItems[n * 6 + i], card = cards.nth(i);
      await expect(card).toContainText(item.title);
      await card.scrollIntoViewIfNeeded();
      await card.locator('img').evaluate((image: HTMLImageElement) => image.decode());
      await card.getByRole('button').click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.locator('.project-details')).toContainText(item.period);
      await expect(dialog.locator('.project-details')).toContainText(item.description);
      await expect(dialog.locator('.project-details')).toContainText(item.scope);
      const link = dialog.locator('.project-visit');
      if (item.url) await expect(link).toHaveAttribute('href', item.url);
      else await expect(link).toHaveCount(0);
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      links.add((await link.getAttribute('href'))!);
      if (item.preview) await expect(link).toContainText('プレビュー');
      if (n === 0 && i === 0) await page.screenshot({ path: testInfo.outputPath('project-detail.png') });
      await page.keyboard.press('Escape');
      await expect(card.getByRole('button')).toBeFocused();
    }
  }
  expect(links.size).toBe(32);
  await section.locator('.catalog-filters button[data-category="ECサイト"]').click();
  await expect(section.locator('.portfolio-card')).toHaveCount(5);
  await section.locator('.catalog-filters button[data-category="すべて"]').click();
  await section.locator('.portfolio-grid').screenshot({ path: testInfo.outputPath('project-grid.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
