import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { portfolioItems } from '../lib/projects';

const systemProjects = portfolioItems.filter(item => item.category === 'システム開発');

test('all system projects have distinct concept assets and clearly separated suggested stacks', () => {
  expect(systemProjects).toHaveLength(12);
  expect(new Set(systemProjects.map(item => item.thumbnail)).size).toBe(12);
  for (const item of systemProjects) {
    expect(item.thumbnailKind).toBe('concept');
    expect(existsSync('public' + item.thumbnail)).toBe(true);
    expect(item.suggestedStack?.languages.length).toBeGreaterThan(0);
    expect(item.suggestedStack?.frameworks.length).toBeGreaterThan(0);
    expect(item.suggestedStack?.technologies.length).toBeGreaterThan(0);
    // Guesses must never become purportedly verified language/framework records.
    expect(item.programmingLanguages).toBeUndefined();
    expect(item.frameworks).toBeUndefined();
  }
});

test('SaaS project uses the new concept thumbnail and separates documented stack details', async ({ page, baseURL }, testInfo) => {
  await page.addInitScript(() => localStorage.setItem('oho-site-language', 'en'));
  const response = await page.request.post('/api/auth/login', {
    headers: { Origin: new URL(baseURL!).origin },
    data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD },
  });
  expect(response.ok()).toBe(true);
  await page.goto('/');
  const works = page.locator('#works');
  await works.locator('[data-market="global"]').click();
  await works.getByRole('searchbox').fill('SaaS System Development');
  const card = works.locator('.portfolio-card');
  await expect(card).toHaveCount(1);
  await card.scrollIntoViewIfNeeded();
  await card.locator('img').evaluate((image: HTMLImageElement) => image.decode());
  await expect(card.locator('img')).toHaveAttribute('src', /nda-saas-dashboard-v2/);
  await expect(card.locator('.project-stack-compact li')).toHaveCount(4);
  await expect(card.locator('.project-stack-compact')).not.toContainText('Programming languages');
  await expect(card.locator('.project-stack-compact')).not.toContainText('Frameworks');
  await expect(card.locator('.project-stack-compact')).toContainText('TypeScript');
  await expect(card.locator('.project-stack-compact')).toContainText('Next.js');
  await expect(card.locator('[data-stack-status="suggested"]')).toHaveText('Suggested stack (unverified)');
  expect((await card.boundingBox())!.height).toBeLessThan(650);
  await card.screenshot({ path: testInfo.outputPath('saas-project-card.png') });
  await card.getByRole('button').click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('.project-stack')).toContainText('API Integration');
  await expect(dialog.locator('.project-stack')).toContainText('Programming languages');
  await expect(dialog.locator('.project-stack')).toContainText('Frameworks');
  await expect(dialog.locator('[data-stack-status="suggested"]')).toHaveText('Suggested stack (unverified)');
  await expect(dialog.locator('.nda-notice')).toBeVisible();
  await expect(dialog.locator('.project-visit')).toHaveCount(0);
  await expect(dialog.locator('img')).toHaveAttribute('alt', /concept preview/i);
  await page.screenshot({ path: testInfo.outputPath('saas-project-detail.png') });
});

test('every system project thumbnail and suggested stack loads in its card and detail panel', async ({ page, baseURL }, testInfo) => {
  test.setTimeout(120000);
  await page.addInitScript(() => localStorage.setItem('oho-site-language', 'en'));
  const response = await page.request.post('/api/auth/login', {
    headers: { Origin: new URL(baseURL!).origin },
    data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD },
  });
  expect(response.ok()).toBe(true);
  await page.goto('/');
  const works = page.locator('#works');
  for (const market of ['japan', 'global'] as const) {
    await works.locator(`[data-market="${market}"]`).click();
    for (const item of systemProjects.filter(item => item.market === market)) {
      await works.getByRole('searchbox').fill(item.shortTitle || item.title);
      const card = works.locator('.portfolio-card');
      await expect(card).toHaveCount(1);
      await card.scrollIntoViewIfNeeded();
      await card.locator('img').evaluate((image: HTMLImageElement) => image.decode());
      await expect(card).toContainText('Concept preview');
      await expect(card.locator('[data-stack-status="suggested"]')).toHaveText('Suggested stack (unverified)');
      await card.getByRole('button').click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.locator('.project-stack')).toContainText(item.suggestedStack!.languages[0]);
      await expect(dialog.locator('.project-stack')).toContainText(item.suggestedStack!.frameworks[0]);
      await expect(dialog.locator('[data-stack-status="suggested"]')).toBeVisible();
      if (item.confidential) await expect(dialog.locator('.project-visit')).toHaveCount(0);
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
    }
    await works.getByRole('searchbox').fill('');
    await works.locator('[data-category="システム開発"]').click();
    await works.locator('.portfolio-grid').scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`${market}-system-projects.png`) });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
