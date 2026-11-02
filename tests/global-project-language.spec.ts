import { test, expect } from '@playwright/test';
import { portfolioItems } from '../lib/projects';
import { localizeProject } from '../lib/catalog-localization';
import projectCopy from '../lib/global-project-copy.json';

const globals = portfolioItems.filter(item => item.market === 'global');
const locales = ['ja', 'en', 'zh-CN', 'zh-HK'] as const;

test('every global overview and contribution has a translation without changing source records', () => {
  expect(globals).toHaveLength(47);
  expect(Object.keys(projectCopy).sort()).toEqual(globals.map(item => item.id).sort());
  for (const original of globals) {
    for (const language of locales) {
      const localized = localizeProject(original, language);
      expect(localized.id).toBe(original.id);
      expect(localized.url).toBe(original.url);
      expect(localized.copyStatus).toBe(original.copyStatus);
      if (language === 'en') {
        expect(localized.description).toBe(original.description);
        expect(localized.scope).toBe(original.scope);
      } else {
        expect(localized.description).not.toBe(original.description);
        expect(localized.scope).not.toBe(original.scope);
        const alphabet = language === 'ja' ? /[\u3040-\u30ff]/ : /[\u3400-\u9fff]/;
        expect(localized.description).toMatch(alphabet);
        expect(localized.scope).toMatch(alphabet);
        if (original.copyStatus === 'draft') expect(localized.scope).toMatch(/文案例|示例/);
      }
    }
  }
});

test.beforeEach(async ({ page, baseURL }) => {
  const response = await page.request.post('/api/auth/login', {
    headers: { Origin: new URL(baseURL!).origin },
    data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD },
  });
  expect(response.ok()).toBe(true);
});

test('all 47 global projects display Japanese overviews and contributions when Japanese is selected', async ({ page }, testInfo) => {
  test.setTimeout(240000);
  await page.goto('/?market=global');
  const works = page.locator('#works');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  for (const item of globals) {
    const expected = localizeProject(item, 'ja');
    await works.getByRole('searchbox').fill(item.shortTitle || item.title);
    const card = works.locator('.portfolio-card');
    await expect(card).toHaveCount(1);
    await expect(card).toContainText(expected.description);
    await card.getByRole('button').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('lang', 'ja');
    const details = dialog.locator('.project-details > dl');
    await expect(details).toContainText(expected.description);
    await expect(details).toContainText(expected.scope);
    await expect(details).not.toContainText(item.description);
    await expect(details).not.toContainText(item.scope);
    if (item.id === 'global-hush-uk') await page.screenshot({ path: testInfo.outputPath('japanese-global-project.png') });
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
  }
});

test('the selected language controls global copy independently of its market and survives reload', async ({ page }, testInfo) => {
  test.setTimeout(90000);
  await page.goto('/?market=global');
  const works = page.locator('#works');
  const item = globals.find(item => item.id === 'global-hush-uk')!;
  const options = { ja: '日本語', en: 'English', 'zh-CN': '简体中文', 'zh-HK': '廣東話' };
  for (const language of ['en', 'zh-CN', 'zh-HK', 'ja'] as const) {
    await page.locator('.language-menu-trigger').click();
    await page.getByRole('menuitemradio').filter({ has: page.locator('.language-menu-label', { hasText: options[language] }) }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await works.getByRole('searchbox').fill('Hush');
    const card = works.locator('.portfolio-card');
    const expected = localizeProject(item, language);
    await expect(card).toContainText(expected.description);
    await card.getByRole('button').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('.project-details > dl')).toContainText(expected.scope);
    await expect(dialog.locator('.project-details > dl')).toContainText(expected.description);
    await expect(dialog.locator('[data-copy-status="draft"]')).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath(`global-copy-${language}.png`) });
    await page.keyboard.press('Escape');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await expect(works.locator('[data-market="global"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(works.locator('.portfolio-card')).toContainText(expected.description);
  }
});
