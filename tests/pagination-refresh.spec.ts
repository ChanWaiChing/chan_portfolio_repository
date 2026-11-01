import { test, expect } from '@playwright/test';

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
      expect(Math.abs((await page.evaluate(() => scrollY)) - y)).toBeLessThanOrEqual(2);
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
