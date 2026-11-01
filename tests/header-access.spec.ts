import { test, expect } from '@playwright/test';

test('header keeps logout beside Consultation and removes its login link', async ({ page, baseURL }, testInfo) => {
  const credentials = { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD };
  const login = await page.request.post('/api/auth/login', { headers: { Origin: new URL(baseURL!).origin }, data: credentials });
  expect(login.ok()).toBe(true);
  await page.goto('/');
  const header = page.locator('.site-header');
  await expect(header.locator('.header-actions > .header-contact')).toBeVisible();
  await expect(header.getByRole('link', { name: 'Log In', exact: true })).toHaveCount(0);
  await expect(header.getByRole('button', { name: 'Log Out', exact: true })).toBeVisible();
  await expect(page.locator('footer').getByRole('button', { name: /Log Out|ログアウト/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Log Out', exact: true })).toHaveCount(1);
  for (const width of [1440, 1024, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const boxes = await header.locator('.header-actions > .header-contact,.header-access-actions a,.header-access-actions button').evaluateAll(els => els.map(el => el.getBoundingClientRect().toJSON()));
    expect(boxes.every(box => box.height >= 44 && box.x >= 0 && box.right <= width)).toBe(true);
    expect(Math.max(...boxes.map(box => box.top)) - Math.min(...boxes.map(box => box.top))).toBeLessThan(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 1440 || width === 320) await header.screenshot({ path: testInfo.outputPath(`header-${width}.png`) });
  }
  await page.goto('/login');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: 'ログイン', exact: true })).toBeVisible();
  await page.getByLabel('ログインID', { exact: true }).fill(credentials.id!);
  await page.getByLabel('パスワード', { exact: true }).fill(credentials.password!);
  await page.getByRole('button', { name: 'サイトを見る', exact: true }).click();
  await expect(page).toHaveURL(new URL('/', baseURL!).href);
  await expect(page.locator('.portfolio-site')).toBeVisible();
  await page.locator('.site-header').getByRole('button', { name: 'Log Out', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'ログイン', exact: true })).toBeVisible();
  await expect(page.locator('.portfolio-site')).toHaveCount(0);
});
