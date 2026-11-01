import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { portfolioItems } from '../lib/projects';

const linkedIds = ['global-qipology', 'global-icanread', 'global-ms-chu', 'global-lifeyoung', 'global-propman', 'global-cuthys', 'global-brilliant-mlle', 'global-designgood', 'global-paka-wellness', 'global-lean-fitness', 'global-sparky', 'global-healing-voices', 'global-wintech', 'global-woaw', 'global-wild-organic'];
const additions = portfolioItems.filter(item => linkedIds.includes(item.id) || item.confidential);

test('new projects have complete assets, market data and NDA safeguards', () => {
  expect(additions).toHaveLength(26);
  expect(new Set(portfolioItems.map(item => item.id)).size).toBe(portfolioItems.length);
  for (const item of additions) {
    expect(existsSync('public' + item.thumbnail)).toBe(true);
    expect(item.description.length).toBeGreaterThan(30);
    expect(item.scope.length).toBeGreaterThan(30);
    if (item.confidential) {
      expect(item.url).toBeUndefined();
      expect(existsSync('public' + item.thumbnail.replace('.webp', '.svg'))).toBe(true);
      expect(item.period).not.toMatch(/\(illustrative periods?\)|（参考期間）/);
      expect(item.periodLabel).toMatch(/Illustrative|参考/);
      expect(item.period).toMatch(/202[4-6]/);
    } else {
      expect(new URL(item.url!).protocol).toBe('https:');
    }
    if (item.market === 'global') {
      expect([item.title, item.description, item.scope, item.period, ...(item.skills || [])].join(' ')).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/);
    }
  }
  expect(portfolioItems.filter(item => item.market === 'japan')).toHaveLength(36);
  expect(portfolioItems.filter(item => item.market === 'global')).toHaveLength(29);
});

test('new linked and anonymized projects open correctly in both markets', async ({ page, baseURL }, testInfo) => {
  test.setTimeout(180000);
  await page.request.post('/api/auth/login', {
    headers: { Origin: new URL(baseURL!).origin },
    data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD },
  });
  await page.goto('/');
  const section = page.locator('#works');
  for (const market of ['japan', 'global'] as const) {
    await section.locator(`[data-market="${market}"]`).click();
    await expect(section.locator(`[data-market="${market}"]`)).toContainText(market === 'japan' ? '36' : '29');
    for (const item of additions.filter(item => item.market === market)) {
      await section.getByRole('searchbox').fill(item.title);
      const card = section.locator('.portfolio-card').filter({ has: page.getByRole('heading', { name: item.shortTitle || item.title, exact: true }) });
      await expect(card).toHaveCount(1);
      await card.locator('img').evaluate((image: HTMLImageElement) => image.decode());
      await card.getByRole('button').click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(item.title);
      await expect(dialog.locator('.project-details')).toContainText(item.description);
      await expect(dialog.locator('.project-details')).toContainText(item.period);
      if (item.confidential) {
        await expect(dialog.locator('.nda-notice')).toBeVisible();
        await expect(dialog.locator('.project-visit')).toHaveCount(0);
      } else {
        await expect(dialog.locator('.project-visit')).toHaveAttribute('href', item.url!);
      }
      if (market === 'global') expect(await dialog.innerText()).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/);
      if (item.id === 'nda-api-security') await page.screenshot({ path: testInfo.outputPath('nda-detail.png') });
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
    }
  }
  await section.getByRole('searchbox').fill('');
  await section.locator('[data-category="システム開発"]').click();
  await expect(section.locator('.portfolio-card')).toHaveCount(6);
  const systemCount = portfolioItems.filter(item => item.market === 'global' && item.category === 'システム開発').length;
  await expect(section.locator('.portfolio-results')).toContainText(`${systemCount} projects`);
  await section.scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('nda-project-grid.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
