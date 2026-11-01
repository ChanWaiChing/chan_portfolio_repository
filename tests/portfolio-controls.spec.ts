import { test, expect } from '@playwright/test';
import { portfolioItems } from '../lib/projects';

test.beforeEach(async ({ page, baseURL }) => {
  const response = await page.request.post('/api/auth/login', { headers: { Origin: new URL(baseURL!).origin }, data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD } });
  expect(response.ok()).toBe(true);
});

test('refined controls preserve filtering, reset, English labels and reduced motion', async ({ page, isMobile }, testInfo) => {
  if (isMobile) await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/#works');
  const section = page.locator('#works');
  if (isMobile) for (const label of await section.locator('.portfolio-market-switch .filter-label').all()) expect((await label.boundingBox())!.height).toBeLessThan(24);
  await expect(section.locator('h2')).toHaveText('制作実績');
  const type = section.locator('[data-category="ECサイト"]');
  await type.scrollIntoViewIfNeeded();
  if (!isMobile) {
    await type.hover();
    await page.waitForTimeout(800);
    expect(await type.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42)).toBeLessThan(-1);
    expect(await type.locator('.filter-label').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41)).toBeGreaterThan(.9);
    await expect(type).toHaveCSS('opacity', '1', { timeout: 1000 });
  }
  await type.click();
  await expect(type).toHaveAttribute('aria-pressed', 'true');
  await expect(section.locator('.portfolio-card')).toHaveCount(5);
  await section.locator('[data-field="fashion"]').click();
  await expect(section.locator('.portfolio-card')).toHaveCount(2);
  await section.getByRole('searchbox').fill('Ryuyu');
  await expect(section.locator('.portfolio-card')).toHaveCount(1);
  await section.getByRole('button', { name: '検索キーワードをクリア', exact: true }).click();
  await expect(section.getByRole('searchbox')).toHaveValue('');
  await expect(section.locator('.portfolio-card')).toHaveCount(2);
  await section.locator('.portfolio-results button').click();
  await expect(section.locator('.portfolio-results p')).toContainText(`${portfolioItems.filter(item => item.market === 'japan').length}件の制作実績`);
  await expect(section.getByRole('searchbox')).toHaveValue('');
  await section.locator('.portfolio-browser-heading').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: testInfo.outputPath('refined-controls.png') });
  await section.locator('.portfolio-filter-panel').screenshot({ path: testInfo.outputPath('filter-panel.png') });
  await section.locator('[data-market="global"]').click();
  await expect(section.locator('h2')).toHaveText('Our Work');
  expect(await section.innerText()).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/);
  await expect(section.locator('.portfolio-market-switch')).toHaveAttribute('data-selected', 'global');
  await section.getByRole('searchbox').fill('Shopify');
  await expect(section.getByRole('button', { name: 'Clear search', exact: true })).toBeVisible();
  await section.getByRole('button', { name: 'Clear search', exact: true }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(section.locator('[data-field="all"] .filter-check')).toHaveCSS('animation-name', 'none');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const tab of await section.locator('[data-market]').all()) expect((await tab.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
});
