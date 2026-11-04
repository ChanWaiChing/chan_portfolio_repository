import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { portfolioItems } from '../lib/projects';
import { localizeProject } from '../lib/catalog-localization';

const linkedIds = ['global-qipology', 'global-icanread', 'global-ms-chu', 'global-lifeyoung', 'global-propman', 'global-cuthys', 'global-brilliant-mlle', 'global-designgood', 'global-paka-wellness', 'global-lean-fitness', 'global-sparky', 'global-healing-voices', 'global-wintech', 'global-woaw', 'global-wild-organic'];
const suppliedProjectIds = [
  'utage-teacher-training', 'utage-toeic-course', 'utage-parent-course', 'utage-trial-lesson', 'utage-treatment-trial', 'utage-regional-trial-events',
  'global-hush-uk', 'global-lomi-cafe', 'global-lambert-bags', 'global-la-crawfish', 'global-facefacts-buxton', 'global-van-michael',
  'global-koko-hair', 'global-beauty-lounge-bergedorf', 'global-anushka-spa', 'global-manor-real-estate', 'global-charcot-immobilier',
  'global-lancastrian-estates', 'global-kent-place', 'global-sgs', 'global-beacon-derm', 'global-pillway', 'global-jetts', 'global-catering',
];
const additions = portfolioItems.filter(item => linkedIds.includes(item.id) || item.confidential || suppliedProjectIds.includes(item.id));

test('new projects have complete assets, market data and NDA safeguards', () => {
  expect(additions).toHaveLength(53);
  expect(new Set(portfolioItems.map(item => item.id)).size).toBe(portfolioItems.length);
  expect(portfolioItems.filter(item => suppliedProjectIds.includes(item.id))).toHaveLength(24);
  for (const item of additions) {
    if (item.thumbnail) expect(existsSync('public' + item.thumbnail)).toBe(true);
    for (const image of item.gallery || []) expect(existsSync('public' + image.src)).toBe(true);
    expect(item.description.length).toBeGreaterThan(30);
    expect(item.scope.length).toBeGreaterThan(30);
    if (item.confidential) {
      expect(item.url).toBeUndefined();
      if (!item.thumbnail) throw new Error(`Confidential project ${item.id} needs a conceptual thumbnail`);
      expect(item.thumbnailAlt).toMatch(/concept|概念|コンセプト|代表/i);
      expect(item.period).not.toMatch(/\(illustrative periods?\)|（参考期間）/);
      expect(item.periodLabel).toMatch(/Illustrative|参考|開発期間/);
      expect(item.period).toMatch(/202[4-6]/);
    } else {
      expect(new URL(item.url!).protocol).toBe('https:');
    }
    if (item.market === 'global') {
      expect([item.title, item.description, item.scope, item.period, ...(item.skills || [])].join(' ')).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/);
    }
  }
  expect(portfolioItems).toHaveLength(92);
  expect(portfolioItems.filter(item => item.market === 'japan')).toHaveLength(45);
  expect(portfolioItems.filter(item => item.market === 'global')).toHaveLength(47);
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
    await page.locator('.language-menu-trigger').click();
    await page.getByRole('menuitemradio').filter({ has: page.locator('.language-menu-label', { hasText: market === 'japan' ? '日本語' : 'English' }) }).click();
    await section.locator(`[data-market="${market}"]`).click();
    await expect(section.locator(`[data-market="${market}"]`)).toContainText(market === 'japan' ? '45' : '47');
    for (const item of additions.filter(item => item.market === market)) {
      const localized = localizeProject(item, market === 'japan' ? 'ja' : 'en');
      await section.getByRole('searchbox').fill(item.title);
      const card = section.locator('.portfolio-card').filter({ has: page.getByRole('heading', { name: localized.shortTitle || localized.title, exact: true }) });
      await expect(card).toHaveCount(1);
      if (item.thumbnail) await card.locator('img').evaluate((image: HTMLImageElement) => image.decode());
      else await expect(card.locator('.project-thumbnail-placeholder')).toHaveAttribute('role', 'img');
      await card.getByRole('button').click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(localized.title);
      await expect(dialog.locator('.project-details')).toContainText(localized.description);
      await expect(dialog.locator('.project-details')).toContainText(localized.period);
      if (item.confidential) {
        await expect(dialog.locator('.nda-notice')).toBeVisible();
        await expect(dialog.locator('.project-visit')).toHaveCount(0);
        if (item.gallery?.length) {
          const images = dialog.locator('.project-details figure img');
          await expect(images).toHaveCount(item.gallery.length);
          await expect(dialog.locator('.project-details')).toContainText('掲載用の代表画像');
          for (const image of await images.all()) await image.evaluate((element: HTMLImageElement) => element.decode());
        }
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
