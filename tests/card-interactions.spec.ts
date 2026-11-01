import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  const response = await page.request.post('/api/auth/login', { headers: { Origin: new URL(baseURL!).origin }, data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD } });
  expect(response.ok()).toBe(true);
  await page.goto('/');
});

test('brighter cards reveal depth and light trails, with accessible details and reduced motion', async ({ page, isMobile }, testInfo) => {
  for (const id of ['packages', 'works']) {
    const card = page.locator(`#${id} article`).first();
    const button = card.getByRole('button').first();
    await card.scrollIntoViewIfNeeded();
    await card.locator('img').evaluate((img: HTMLImageElement) => img.decode());
    if (!isMobile) {
      await card.hover();
      await page.waitForTimeout(850);
      expect(await card.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42)).toBeLessThan(-5);
      expect(await card.locator('img').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a)).toBeGreaterThan(1.01);
      expect(await card.evaluate(el => Number(getComputedStyle(el, '::before').opacity))).toBeGreaterThan(.8);
      expect(await card.evaluate(el => getComputedStyle(el, '::before').animationName)).toBe('catalog-edge-travel');
      await card.screenshot({ path: testInfo.outputPath(`${id}-hover.png`) });
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
  const quietCard = page.locator('#works article').first();
  await quietCard.hover();
  await expect(quietCard).toHaveCSS('transform', 'none');
  expect(await quietCard.evaluate(el => getComputedStyle(el, '::before').display)).toBe('none');
  await page.locator('#works article button').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate(el => el.getAnimations().length)).toBe(0);
  await dialog.getByRole('button', { name: '閉じる', exact: true }).click();
  await expect(dialog).toHaveCount(0);
});
