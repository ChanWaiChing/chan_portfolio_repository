import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  const response = await page.request.post('/api/auth/login', { headers: { Origin: new URL(baseURL!).origin }, data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD } });
  expect(response.ok()).toBe(true);
});

test('refined controls preserve filtering, reset, English labels and reduced motion', async ({ page, isMobile }, testInfo) => {
  if (isMobile) await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/#works');
  const section = page.locator('#works');
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
  await section.locator('.portfolio-results button').click();
  await expect(section.locator('.portfolio-results p')).toContainText('32件の制作実績');
  await expect(section.getByRole('searchbox')).toHaveValue('');
  await section.locator('.portfolio-browser-heading').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: testInfo.outputPath('refined-controls.png') });
  await section.locator('[data-market="global"]').click();
  await expect(section.locator('h2')).toHaveText('Our Work');
  expect(await section.innerText()).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(section.locator('[data-field="all"] .filter-check')).toHaveCSS('animation-name', 'none');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
