import { test, expect } from '@playwright/test';

for (const catalog of [{ id: 'packages', label: 'パッケージ', last: 4 }, { id: 'works', label: 'ポートフォリオ', last: 6 }]) {
  test(`${catalog.id} pagination preserves scroll through shorter final pages`, async ({ page }, testInfo) => {
    await page.goto('/');
    const section = page.locator(`#${catalog.id}`);
    const nav = section.getByRole('navigation', { name: `${catalog.label}のページ切り替え` });
    for (const n of [2, catalog.last, 1]) {
      const button = nav.getByRole('button', { name: `${n}ページ目`, exact: true });
      await button.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      const y = await page.evaluate(() => scrollY);
      await button.click();
      await expect(button).toHaveAttribute('aria-current', 'page');
      await page.waitForTimeout(650);
      expect(Math.abs((await page.evaluate(() => scrollY)) - y)).toBeLessThanOrEqual(2);
    }
    const card = section.locator('article').first();
    await expect(card).toHaveCSS('color', 'rgb(237, 245, 255)');
    await card.scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`${catalog.id}-night.png`) });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('pagination respects reduced motion and retains keyboard operation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const nav = page.locator('#packages .catalog-pagination');
  const next = nav.getByRole('button', { name: '次のページ' });
  await next.focus();
  const y = await page.evaluate(() => scrollY);
  await page.keyboard.press('Enter');
  await expect(nav.getByRole('button', { name: '2ページ目', exact: true })).toHaveAttribute('aria-current', 'page');
  expect(Math.abs((await page.evaluate(() => scrollY)) - y)).toBeLessThanOrEqual(2);
  expect(await page.locator('.package-grid').evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
});
