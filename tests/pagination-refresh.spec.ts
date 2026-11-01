import { test, expect } from '@playwright/test';
import { portfolioItems } from '../lib/projects';
import { servicePackages } from '../lib/catalog';

test.beforeEach(async ({ page, baseURL }) => {
  const response = await page.request.post('/api/auth/login', { headers: { Origin: new URL(baseURL!).origin }, data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD } });
  expect(response.ok()).toBe(true);
  await page.goto('/');
});

test('pagination stages card depth in a directional cascade while preserving scroll', async ({ page, isMobile }, testInfo) => {
  if (isMobile) await page.setViewportSize({ width: 320, height: 900 });
  for (const [id, last] of [['packages', 4], ['works', 6]] as const) {
    const nav = page.locator(`#${id} .catalog-pagination`);
    await expect(nav).toHaveCSS('flex-wrap', 'nowrap');
    for (const button of await nav.getByRole('button').all()) {
      await expect(button).toHaveCSS('box-shadow', 'none');
      for (const side of ['top', 'right', 'bottom', 'left']) await expect(button).toHaveCSS(`border-${side}-width`, '1px');
      const box = (await button.boundingBox())!;
      expect(Math.abs(box.width - 44)).toBeLessThan(1);
      expect(Math.abs(box.height - 44)).toBeLessThan(1);
    }
    for (const n of [2, last, 1]) {
      const button = nav.getByRole('button', { name: `${n}ページ目`, exact: true });
      await button.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      const y = await page.evaluate(() => scrollY);
      const beforeCount = await page.locator(`#${id} article`).count();
      const pagerTop = (await nav.boundingBox())!.y;
      await button.click();
      await expect(button).toHaveAttribute('aria-current', 'page');
      const grid = page.locator(`#${id} .${id === 'packages' ? 'package' : 'portfolio'}-grid`);
      await expect(grid).toHaveAttribute('data-page-motion', 'arriving');
      const effects = await grid.evaluate(el => el.getAnimations({ subtree: true }).map(a => ({ duration: a.effect?.getTiming().duration, delay: a.effect?.getTiming().delay, frames: (a.effect as KeyframeEffect).getKeyframes() })));
      const arrivals = effects.filter(effect => effect.duration === 640);
      expect(arrivals.length).toBeGreaterThan(1);
      expect(new Set(arrivals.map(effect => effect.delay)).size).toBeGreaterThan(1);
      expect(arrivals.every(effect => effect.frames.some(frame => String(frame.transform).includes('perspective')))).toBe(true);
      await expect(grid).not.toHaveAttribute('data-page-motion');
      expect(await grid.evaluate(el => el.inert)).toBe(false);
      if (beforeCount < 6 || await grid.locator('article').count() < 6) {
        expect(Math.abs((await nav.boundingBox())!.y - pagerTop)).toBeLessThanOrEqual(2);
        expect(await grid.evaluate(el => (el as HTMLElement).style.minHeight)).toBe('');
      } else expect(Math.abs((await page.evaluate(() => scrollY)) - y)).toBeLessThanOrEqual(2);
    }
    await nav.screenshot({ path: testInfo.outputPath(`${id}-pagination.png`) });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('#works .catalog-pagination').getByRole('button', { name: '次のページ' }).click();
  expect(await page.locator('#works .portfolio-grid').evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('rapid selections and filter changes cancel stale page transitions', async ({ page }) => {
  const section = page.locator('#packages');
  const nav = section.locator('.catalog-pagination');
  await nav.getByRole('button', { name: '2ページ目', exact: true }).click();
  await nav.getByRole('button', { name: '4ページ目', exact: true }).click();
  await expect(nav.getByRole('button', { name: '4ページ目', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(section.locator('.package-card')).toHaveCount(2);
  await expect(section.locator('.package-grid')).not.toHaveAttribute('data-page-motion');
  await nav.getByRole('button', { name: '2ページ目', exact: true }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(nav.getByRole('button', { name: '2ページ目', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(section.locator('.package-grid')).not.toHaveAttribute('data-page-motion');
  expect(await section.locator('.package-grid').evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await nav.getByRole('button', { name: '3ページ目', exact: true }).click();
  await section.locator('[data-category="ウェブ制作"]').click();
  await expect(section.locator('[data-category="ウェブ制作"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(nav.getByRole('button', { name: '1ページ目', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(section.locator('.package-grid')).not.toHaveAttribute('data-page-motion');
  expect(await section.locator('.package-grid').evaluate(el => el.inert)).toBe(false);
});

test('short final pages put the pager directly beneath the last card row', async ({ page }, testInfo) => {
  const cases = [
    { id: 'packages', total: servicePackages.length, english: false },
    { id: 'works', total: portfolioItems.filter(item => item.market === 'japan' && item.category === 'ウェブサイト').length, english: false },
    { id: 'works', total: portfolioItems.filter(item => item.market === 'global').length, english: true },
  ];
  for (const scenario of cases) {
    const section = page.locator(`#${scenario.id}`);
    if (scenario.id === 'works') {
      if (scenario.english) await section.locator('[data-market="global"]').click();
      else await section.locator('[data-category="ウェブサイト"]').click();
    }
    const last = Math.ceil(scenario.total / 6), nav = section.locator('.catalog-pagination');
    const lastButton = nav.getByRole('button', { name: scenario.english ? `Page ${last}` : `${last}ページ目`, exact: true });
    await lastButton.click();
    await expect(lastButton).toHaveAttribute('aria-current', 'page');
    const grid = section.locator('.package-grid,.portfolio-grid');
    await expect(grid).not.toHaveAttribute('data-page-motion');
    await expect(grid.locator('article')).toHaveCount(scenario.total % 6);
    const geometry = await grid.evaluate(el => ({
      bottom: el.getBoundingClientRect().bottom,
      lastCardBottom: Math.max(...Array.from(el.children).map(card => card.getBoundingClientRect().bottom)),
      minHeight: (el as HTMLElement).style.minHeight,
    }));
    expect(geometry.minHeight).toBe('');
    expect(Math.abs(geometry.bottom - geometry.lastCardBottom)).toBeLessThan(2);
    const pager = (await nav.boundingBox())!;
    expect(pager.y - geometry.lastCardBottom).toBeLessThan(48);
    expect(pager.y - geometry.lastCardBottom).toBeGreaterThanOrEqual(0);
    expect(pager.y).toBeGreaterThan(0);
    expect(pager.y).toBeLessThan(await page.evaluate(() => innerHeight));
    await page.screenshot({ path: testInfo.outputPath(`${scenario.id}-${scenario.english ? 'global' : 'japan'}-compact-final.png`) });
  }
});
