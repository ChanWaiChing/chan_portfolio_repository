import { test, expect } from '@playwright/test';

const id = process.env.TEST_SITE_LOGIN_ID!;
const password = process.env.TEST_SITE_LOGIN_PASSWORD!;
test('site requires valid server credentials, keeps the session and supports logout', async ({ page, context }, testInfo) => {
  expect(Boolean(id && password)).toBe(true);
  const response = await page.goto('/');
  const html = await response!.text();
  expect(html).not.toContain(password);
  await expect(page.getByRole('heading', { name: 'ログイン', exact: true })).toBeVisible();
  await expect(page.locator('.portfolio-site')).toHaveCount(0);
  await expect(page.locator('#site-login')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(page.locator('.wordmark text')).toHaveText('OHO BROTHERS');
  await page.screenshot({ path: testInfo.outputPath('sign-in.png') });
  await page.getByLabel('ログインID', { exact: true }).fill('incorrect');
  await page.getByLabel('パスワード', { exact: true }).fill('incorrect');
  await page.getByRole('button', { name: 'サイトを見る', exact: true }).click();
  await expect(page.locator('#login-error')).toContainText('正しくありません');
  await expect(page.locator('.portfolio-site')).toHaveCount(0);
  await page.getByLabel('ログインID', { exact: true }).fill(id);
  await page.getByLabel('パスワード', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'サイトを見る', exact: true }).click();
  await expect(page.locator('.portfolio-site')).toBeVisible();
  const cookie = (await context.cookies()).find(cookie => cookie.name === 'oho_site_session')!;
  expect(cookie.httpOnly).toBe(true);
  expect(cookie.sameSite).toBe('Lax');
  expect(cookie.value).not.toContain(password);
  await page.reload();
  await expect(page.locator('.portfolio-site')).toBeVisible();
  await page.getByRole('button', { name: 'Log Out', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'ログイン', exact: true })).toBeVisible();
  expect((await context.cookies()).some(cookie => cookie.name === 'oho_site_session')).toBe(false);
  await context.addCookies([{ ...cookie, value: cookie.value.slice(0, -1) + (cookie.value.endsWith('0') ? '1' : '0') }]);
  await page.reload();
  await expect(page.locator('.portfolio-site')).toHaveCount(0);
});

test('unauthenticated APIs and cross-origin login attempts are rejected', async ({ request, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  for (const path of ['/api/contact', '/api/events?access-check=1']) {
    // Local Workers may restart once when a route module is first loaded.
    await expect.poll(async () => (await request.post(path, { headers: { Origin: origin }, data: {} })).status()).toBe(401);
  }
  const crossOrigin = await request.post('/api/auth/login', { headers: { Origin: 'https://example.invalid' }, data: { id, password } });
  // Wrangler's local origin guard can reject the request before the app runs.
  if (crossOrigin.status() === 503 && (await crossOrigin.text()).includes('Your worker restarted mid-request')) {
    expect(crossOrigin.headers()['set-cookie']).toBeUndefined();
  } else expect(crossOrigin.status()).toBe(403);
});
