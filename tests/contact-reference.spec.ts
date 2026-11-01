import { test, expect } from '@playwright/test';

test('contact reference layout keeps the main fields clear and the cards responsive', async ({ page, isMobile }, testInfo) => {
  await page.goto('/');
  const layout = page.locator('.contact-reference-layout');
  const info = layout.locator('.contact-reference-info');
  const form = layout.locator('.contact-form');
  await expect(info.getByRole('heading', { name: '連絡先情報' })).toBeVisible();
  await expect(info.getByRole('link', { name: 'cbnbc07@gmail.com' })).toHaveAttribute('href', 'mailto:cbnbc07@gmail.com');
  await expect(info.locator('.contact-social-icon')).toHaveCount(5);
  await expect(form.locator('.form-row input:visible')).toHaveCount(2);
  await expect(form.locator('textarea:visible')).toHaveCount(1);
  await expect(form.locator('.contact-extra')).not.toHaveAttribute('open', '');
  await expect(page.locator('.contact-orbit-stage,.contact-time-intro')).toHaveCount(0);
  await layout.scrollIntoViewIfNeeded();
  const left = (await info.boundingBox())!, right = (await form.boundingBox())!;
  if (isMobile) expect(Math.abs(left.width - right.width)).toBeLessThan(2);
  else expect(left.width / right.width).toBeCloseTo(2 / 3, 1);
  expect(Math.abs(left.height - right.height)).toBeLessThan(2);
  await expect(page.locator('#contact .contact-privacy,#contact .contact-followup')).toHaveCount(0);
  await expect(page.locator('#contact')).toHaveCSS('background-image', 'none');
  await expect(page.locator('#contact')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(page.locator('#contact .content-heading h2')).toHaveCSS('color', 'rgb(231, 243, 255)');
  if (isMobile) expect(right.y).toBeGreaterThan(left.y + left.height);
  else {
    expect(Math.abs(left.y - right.y)).toBeLessThan(2);
    expect(left.width).toBeLessThan(right.width);
  }
  await expect(form.locator('#contact-name')).toHaveCSS('border-radius', '12px');
  await expect(info.locator('.contact-services li')).toHaveCount(11);
  await layout.screenshot({ path: testInfo.outputPath('contact-reference.png'), style: '.site-header { visibility: hidden; }' });
  await form.locator('.contact-extra > summary').click();
  await expect(form.getByLabel('会社名・屋号')).toBeVisible();
  await expect(form.getByLabel('相談したいこと')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
