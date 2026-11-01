import { test, expect } from '@playwright/test';

test('all four hero buttons animate their bot, replay on repeat selection and support the keyboard', async ({ page }) => {
  await page.goto('/');
  const tabs = page.locator('.reference-hero-tabs [role="tab"]');
  for (let i = 0; i < 4; i++) {
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true');
    await expect.poll(() => tabs.nth(i).locator('.hero-selector-bot').evaluate(el => el.getAnimations().filter(a => a.playState === 'running').length)).toBe(1);
    await page.waitForTimeout(1000);
    await tabs.nth(i).click();
    await expect.poll(() => tabs.nth(i).locator('.hero-selector-bot').evaluate(el => el.getAnimations().filter(a => a.playState === 'running').length)).toBe(1);
  }
  await page.keyboard.press('Home');
  await expect(tabs.first()).toBeFocused();
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await tabs.nth(2).click();
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  await expect.poll(() => page.locator('.hero-selector-bot').evaluateAll(els => els.flatMap(el => el.getAnimations()).length)).toBe(0);
});
