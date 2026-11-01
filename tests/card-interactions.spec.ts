import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  const response = await page.request.post('/api/auth/login', { headers: { Origin: new URL(baseURL!).origin }, data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD } });
  expect(response.ok()).toBe(true);
  await page.goto('/');
});

test('cards stay stable on hover, press on click, and open details with a spatial reveal', async ({ page, isMobile }, testInfo) => {
  for (const id of ['packages', 'works']) {
    const card = page.locator(`#${id} article`).first();
    const button = card.getByRole('button').first();
    await card.scrollIntoViewIfNeeded();
    await card.locator('img').evaluate((img: HTMLImageElement) => img.decode());
    if (!isMobile) {
      await card.hover();
      await page.waitForTimeout(850);
      await expect(card).toHaveCSS('transform', 'none');
      await expect(card.locator('img')).toHaveCSS('transform', 'none');
      expect(await card.evaluate(el => Number(getComputedStyle(el, '::before').opacity))).toBeGreaterThan(.8);
      await button.hover();
      await page.mouse.down();
      await page.waitForTimeout(140);
      expect(await card.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a)).toBeLessThan(1);
      await page.mouse.up();
    } else await button.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    expect(await dialog.evaluate(el => el.getAnimations().some(a => a.effect?.getTiming().duration === 420))).toBe(true);
    await page.waitForTimeout(450);
    await page.screenshot({ path: testInfo.outputPath(`${id}-detail.png`) });
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(button).toBeFocused();
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('#works article button').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate(el => el.getAnimations().length)).toBe(0);
  await dialog.getByRole('button', { name: '閉じる', exact: true }).click();
  await expect(dialog).toHaveCount(0);
});
