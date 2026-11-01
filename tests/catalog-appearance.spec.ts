import { test, expect } from '@playwright/test';

const japanese = /[\u3040-\u30ff\u3400-\u9fff]/;
test('global portfolio and all project dialogs use English exclusively', async ({ page }) => {
  await page.goto('/?market=global#works');
  const section = page.locator('#works');
  await expect(section).toHaveAttribute('lang', 'en');
  await expect(section.locator('h2')).toHaveText('Digital experiences that connect');
  for (const n of [1, 2]) {
    if (n === 2) await section.getByRole('button', { name: 'Page 2', exact: true }).click();
    expect(await section.innerText()).not.toMatch(japanese);
    for (const card of await section.locator('.portfolio-card').all()) {
      await card.getByRole('button').click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toHaveAttribute('lang', 'en');
      expect(await dialog.innerText()).not.toMatch(japanese);
      expect(await dialog.locator('[aria-label],[alt]').evaluateAll(els => els.map(el => el.getAttribute('aria-label') || el.getAttribute('alt')).join(' '))).not.toMatch(japanese);
      await expect(dialog.getByRole('link', { name: 'Visit website (opens in a new tab)' })).toBeVisible();
      await page.keyboard.press('Escape');
    }
  }
  await section.getByRole('searchbox').fill('no-such-project');
  await expect(section.getByRole('button', { name: 'Reset filters' })).toBeVisible();
  expect(await section.innerText()).not.toMatch(japanese);
  await section.locator('[data-market="japan"]').click();
  await expect(section).toHaveAttribute('lang', 'ja');
  await expect(section.locator('h2')).toContainText('さまざまな事業');
});

test('bright artwork remains unfiltered and hover responds without pointer tracking', async ({ page, isMobile }, testInfo) => {
  await page.goto('/');
  for (const id of ['packages', 'works']) {
    const card = page.locator(`#${id} article`).first();
    const image = card.locator('img').first();
    await card.scrollIntoViewIfNeeded();
    await image.evaluate((img: HTMLImageElement) => img.decode());
    await expect(image).toHaveCSS('filter', 'none');
    await expect(image).toHaveCSS('opacity', '1');
    if (!isMobile) {
      await card.hover();
      await page.waitForTimeout(750);
      const scale = await image.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a);
      expect(scale).toBeCloseTo(1.025, 2);
    }
    await page.screenshot({ path: testInfo.outputPath(`${id}-bright.png`) });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#works article').first().locator('img')).toHaveCSS('transform', 'none');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
