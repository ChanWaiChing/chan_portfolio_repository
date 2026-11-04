import { test, expect } from '@playwright/test';
import { portfolioItems } from '../lib/projects';

test('market filters isolate projects and preserve the global selection in the URL', async ({ page, baseURL }, testInfo) => {
  test.setTimeout(240000);
  const login = await page.request.post('/api/auth/login', {
    headers: { Origin: new URL(baseURL!).origin },
    data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD },
  });
  expect(login.ok()).toBe(true);
  await page.goto('/');
  const section = page.locator('#works');
  const markets = section.locator('.portfolio-markets [role="group"]');
  await expect(markets.locator('[data-market="japan"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(markets.locator('[data-market="japan"]')).toContainText('45');
  await markets.locator('[data-market="global"]').click();
  await expect(section.locator('.market-period')).toContainText('2019–2024');
  await expect(section.locator('.portfolio-card')).toHaveCount(6);
  await expect(markets.locator('[data-market="global"]')).toContainText('47');
  const globals = portfolioItems.filter(item => item.market === 'global');
  for (const item of globals.slice(0, 6)) {
    const card = section.locator('.portfolio-card').filter({ has: page.getByRole('heading', { name: item.shortTitle || item.title, exact: true }) });
    await expect(card).toHaveCount(1);
    await card.scrollIntoViewIfNeeded();
    if (item.thumbnail) await card.locator('img').evaluate((image: HTMLImageElement) => image.decode());
    else await expect(card.locator('.project-thumbnail-placeholder')).toHaveAttribute('role', 'img');
    await card.getByRole('button').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('h2')).toHaveText(item.title);
    if (item.url) await expect(dialog.locator('.project-visit')).toHaveAttribute('href', item.url);
    else await expect(dialog.locator('.project-visit')).toHaveCount(0);
    await expect(dialog.locator('.project-details')).toContainText(item.description);
    if (item.skills?.length) await expect(dialog.locator('.project-details')).toContainText('Skills applied');
    else if (item.technologies.length) await expect(dialog.locator('.project-details')).toContainText('Technology stack');
    else await expect(dialog.locator('.project-details')).toContainText('Not specified in supplied notes');
    if (!item.technologies.length) await expect(dialog.locator('.project-details')).not.toContainText('未掲載');
    await page.keyboard.press('Escape');
  }
  await section.getByRole('button', { name: 'Page 2', exact: true }).click();
  await page.reload();
  await expect(markets.locator('[data-market="global"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(section.locator('.portfolio-card')).toHaveCount(6);
  await section.locator('[data-category="ECサイト"]').click();
  const ecommerceCount = globals.filter(item => item.category === 'ECサイト').length;
  await expect(section.locator('.portfolio-results')).toContainText(`${ecommerceCount} projects`);
  await section.getByRole('searchbox').fill('WooCommerce');
  const wooCommerceCount = globals.filter(item => item.category === 'ECサイト' && `${item.title} ${item.shortTitle || ''} ${item.description} ${item.scope} ${item.period} ${item.technologies.join(' ')} ${(item.skills || []).join(' ')}`.toLowerCase().includes('woocommerce')).length;
  await expect(section.locator('.portfolio-card')).toHaveCount(Math.min(6, wooCommerceCount));
  await markets.locator('[data-market="japan"]').click();
  await expect(section.getByRole('searchbox')).toHaveValue('');
  await expect(section.locator('.portfolio-card')).toHaveCount(6);
  await markets.locator('[data-market="global"]').click();
  await section.scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('global-portfolio.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
