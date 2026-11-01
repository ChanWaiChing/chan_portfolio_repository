import { test, expect } from '@playwright/test';

test('profile depth has stable hover poses and accessible motion fallbacks', async ({ page, isMobile }, testInfo) => {
  await page.goto('/');
  const card = page.locator('.brother-profile-card').first();
  const sibling = page.locator('.brother-profile-card').last();
  await card.scrollIntoViewIfNeeded();
  await card.locator('img').evaluate((img: HTMLImageElement) => img.decode());
  const base = await card.evaluate(el => getComputedStyle(el).transform);
  const photo = card.locator('.brother-profile-photo');
  await expect(page.locator('.brother-portrait-orbit')).toHaveCount(2);
  await expect(card.locator('.brother-portrait-orbit')).toHaveCSS('animation-name', 'profile-border-orbit');
  expect(await photo.evaluate(el => parseFloat(getComputedStyle(el).borderTopLeftRadius) >= el.clientWidth / 2)).toBe(true);
  if (!isMobile) {
    await card.hover({ position: { x: 50, y: 60 } });
    await expect.poll(() => card.evaluate(el => getComputedStyle(el).transform)).not.toBe(base);
    await page.waitForTimeout(650);
    const pose = await card.evaluate(el => getComputedStyle(el).transform);
    const bounds = (await card.boundingBox())!;
    await page.mouse.move(bounds.x + bounds.width * .7, bounds.y + bounds.height * .65);
    await expect(card).toHaveCSS('transform', pose);
    await expect(photo).toHaveCSS('transform', 'none');
    await expect(sibling).toHaveCSS('transform', base);
    await page.locator('.brother-profiles').screenshot({ path: testInfo.outputPath('profiles-hover.png'), style: '.site-header { visibility:hidden; }' });
  } else {
    await card.tap({ position: { x: 50, y: 60 } });
    await expect(card).toHaveCSS('transform', base);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(card).toHaveCSS('transform', 'none');
  await expect(card.locator('.brother-portrait-shell')).toHaveCSS('transform', 'none');
  await expect(card.locator('.brother-portrait-orbit')).toHaveCSS('animation-name', 'none');
  await card.locator('.profile-cta').focus();
  await expect(card.locator('.profile-cta')).toHaveCSS('outline-style', 'solid');
  await expect(card.locator('.profile-cta')).toHaveAttribute('href', '#packages');
  await expect(sibling.locator('.profile-cta')).toHaveAttribute('href', '#works');
  await page.locator('.brother-profiles').screenshot({ path: testInfo.outputPath('profiles-static.png'), style: '.site-header { visibility:hidden; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
