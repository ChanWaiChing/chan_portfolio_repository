import { test, expect } from '@playwright/test';

test('compact browser keeps market, filters and results in reading order', async ({ page, isMobile }, testInfo) => {
  if (isMobile) await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/#works');
  const section = page.locator('#works');
  await expect(section.locator('h2')).toContainText('制作実績');
  const panel = section.locator('.portfolio-filter-panel');
  await expect(panel.locator('.portfolio-filter-row h3')).toHaveText(['サイト種別', '業種']);
  await expect(section.locator('.portfolio-results p')).toContainText('32件の制作実績');
  const reset = section.locator('.portfolio-results button');
  await expect(reset).toBeDisabled();
  await expect(section.locator('.portfolio-market-switch')).toHaveCSS('display', 'grid');
  const [first, second] = await section.locator('[data-market]').evaluateAll(els => els.map(el => el.getBoundingClientRect().toJSON()));
  expect(Math.abs(first.y - second.y)).toBeLessThan(2);
  expect(first.height).toBeGreaterThanOrEqual(44);
  const options = panel.locator('.portfolio-filter-button');
  for (const button of await options.all()) {
    await expect(button).toHaveCSS('box-shadow', 'none');
    expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await expect(button.locator('.filter-count')).toHaveCSS('position', 'static');
  }
  await panel.locator('[data-field="beauty"]').click();
  await expect(panel.locator('[data-field="beauty"] .filter-check')).toBeVisible();
  await expect(section.locator('.portfolio-results p')).toContainText('12件の制作実績');
  await panel.locator('[data-category="ECサイト"]').click();
  await expect(section.locator('.portfolio-results p')).toContainText('1件の制作実績');
  await reset.click();
  await expect(section.locator('.portfolio-results p')).toContainText('32件の制作実績');
  await expect(section.locator('.portfolio-card')).toHaveCount(6);
  await expect(reset).toBeDisabled();
  await expect(page).not.toHaveURL(/field=|work=/);
  await section.locator('.portfolio-browser-heading').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('compact-browser.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
