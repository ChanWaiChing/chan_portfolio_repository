import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  const response = await page.request.post('/api/auth/login', {
    headers: { Origin: new URL(baseURL!).origin },
    data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD },
  });
  expect(response.ok()).toBe(true);
  await page.goto('/');
});

test('language menu fits the viewport and supports sequential keyboard navigation', async ({ page }) => {
  const trigger = page.locator('.language-menu-trigger');
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  const menu = page.getByRole('menu');
  const options = menu.getByRole('menuitemradio');
  await expect(options).toHaveCount(4);
  await expect(options.nth(0)).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(options.nth(1)).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(options.nth(2)).toBeFocused();
  await page.keyboard.press('End');
  await expect(options.nth(3)).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(options.nth(0)).toBeFocused();
  const bounds = await menu.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(15);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width - 15);
  await page.keyboard.press('Escape');
  await expect(menu).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('all language choices update the interface, persist, and expose the selected option', async ({ page }) => {
  const choices = [
    { lang: 'en', label: 'English', title: 'Design and development, one team', contact: 'Tell us about your idea' },
    { lang: 'zh-CN', label: '简体中文', title: '设计与开发由一个团队携手完成', contact: '聊聊您的想法' },
    { lang: 'zh-HK', label: '廣東話', title: '設計與開發由同一團隊攜手完成', contact: '同我哋分享你嘅想法' },
    { lang: 'ja', label: '日本語', title: 'デザインと開発をひとつのチームで', contact: 'そのアイデア、聞かせてください' },
  ];
  for (const choice of choices) {
    await page.locator('.language-menu-trigger').click();
    await page.getByRole('menuitemradio').filter({ has: page.locator('.language-menu-label', { hasText: choice.label }) }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', choice.lang);
    await expect(page.locator('#hero-title')).toHaveText(choice.title);
    await expect(page.locator('#contact h2')).toHaveText(choice.contact);
    await expect(page.locator('.language-menu-trigger')).toBeFocused();
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', choice.lang);
    await page.locator('.language-menu-trigger').click();
    await expect(page.getByRole('menuitemradio', { checked: true }).locator('.language-menu-label')).toHaveText(choice.label);
    await page.keyboard.press('Escape');
  }
});

test('language selection works when browser storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage unavailable'); };
    Storage.prototype.setItem = () => { throw new Error('Storage unavailable'); };
  });
  await page.reload();
  await page.locator('.language-menu-trigger').click();
  await page.getByRole('menuitemradio').filter({ hasText: 'English' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#contact h2')).toHaveText('Tell us about your idea');
});
