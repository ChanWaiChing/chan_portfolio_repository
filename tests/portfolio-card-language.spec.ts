import { test, expect } from '@playwright/test';
import { portfolioItems } from '../lib/projects';
import { localizeProject } from '../lib/catalog-localization';
import { localizeCategory, localizeField } from '../lib/localization';
import { fieldLabel } from '../lib/portfolio-fields';
import cardCopy from '../lib/project-card-copy.json';

const languages = ['ja', 'en', 'zh-CN', 'zh-HK'] as const;
const options = { ja: '日本語', en: 'English', 'zh-CN': '简体中文', 'zh-HK': '廣東話' };

test('every portfolio card has localized copy while recorded numbers and stacks stay unchanged', () => {
  expect(Object.keys(cardCopy).sort()).toEqual(portfolioItems.map(item => item.id).sort());
  for (const item of portfolioItems) for (const language of languages) {
    const localized = localizeProject(item, language);
    expect(localized.technologies).toEqual(item.technologies);
    expect(localized.skills).toEqual(item.skills);
    expect(localized.programmingLanguages).toEqual(item.programmingLanguages);
    expect(localized.frameworks).toEqual(item.frameworks);
    expect(localized.suggestedStack).toEqual(item.suggestedStack);
    for (const key of ['title', 'description', 'period'] as const) {
      for (const number of new Set(item[key].match(/\d+/g) || [])) {
        expect(localized[key].match(/\d+/g) || [], `${item.id} ${language} ${key}: ${number}`).toContain(number);
      }
    }
    if (language === 'ja') {
      expect(localized.description).toMatch(/[\u3040-\u30ff]/);
      expect(localized.period).not.toMatch(/Created:|Renewal:|Development work:|United Kingdom|United States|January|February|March|April|May|June|July|August|September|October|November|December/);
    } else {
      expect(localized.shortTitle || localized.title).not.toMatch(/[\u3040-\u30ff]/);
      expect(localized.description).not.toMatch(/[\u3040-\u30ff]/);
      expect(localized.period).not.toMatch(/[\u3040-\u30ff]/);
    }
  }
});

test('cards in both markets follow the chosen language and default to Japanese', async ({ page, baseURL }, testInfo) => {
  test.setTimeout(240000);
  const auth = await page.request.post('/api/auth/login', {
    headers: { Origin: new URL(baseURL!).origin },
    data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD },
  });
  expect(auth.ok()).toBe(true);
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  const works = page.locator('#works');
  for (const language of languages) {
    await page.locator('.language-menu-trigger').click();
    await page.getByRole('menuitemradio').filter({ has: page.locator('.language-menu-label', { hasText: options[language] }) }).click();
    for (const market of ['japan', 'global'] as const) {
      await works.locator(`[data-market="${market}"]`).click();
      for (const item of portfolioItems.filter(item => item.market === market)) {
        // Search by the unchanged source title as well as checking translated display text.
        await works.getByRole('searchbox').fill(item.title);
        const card = works.locator(`[data-project-id="${item.id}"]`);
        const expected = localizeProject(item, language);
        await expect(card).toHaveCount(1);
        await expect(card.locator('h3')).toHaveText(expected.shortTitle || expected.title);
        await expect(card.locator('.portfolio-card-description')).toHaveText(expected.description);
        await expect(card.locator('.portfolio-card-body > span').first()).toHaveText(expected.period);
        await expect(card.locator('.catalog-card-meta')).toContainText(localizeCategory(item.category, language));
        await expect(card.locator('.catalog-card-meta')).toContainText(localizeField(fieldLabel(item.field), language));
        await expect(card.locator('.portfolio-detail-link')).toHaveText(language === 'ja' ? '制作実績を見る' : language === 'en' ? 'View project' : language === 'zh-CN' ? '查看项目' : '查看項目');
        if (item.confidential) await expect(card.locator('.portfolio-nda-badge')).toHaveText(language === 'ja' ? '守秘義務対象' : language === 'en' ? 'NDA' : language === 'zh-CN' ? '保密项目' : '保密項目');
        if (item.id === 'nda-saas' && language === 'ja') {
          await card.scrollIntoViewIfNeeded();
          await card.locator('img').evaluate((image: HTMLImageElement) => image.decode());
          await page.screenshot({ path: testInfo.outputPath('japanese-system-card.png') });
        }
      }
    }
  }
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-HK');
});
