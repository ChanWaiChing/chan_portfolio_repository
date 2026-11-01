import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  const response = await page.request.post('/api/auth/login', { headers: { Origin: new URL(baseURL!).origin }, data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD } });
  expect(response.ok()).toBe(true);
  await page.goto('/');
});

test('pagination has even borders, coherent transitions and stable scroll positions', async ({ page, isMobile }, testInfo) => {
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
      const effects = await page.locator(`#${id} .${id === 'packages' ? 'package' : 'portfolio'}-grid`).evaluate(el => el.getAnimations().map(a => ({ duration: a.effect?.getTiming().duration, frames: (a.effect as KeyframeEffect).getKeyframes() })));
      expect(effects.some(effect => effect.duration === 380 && effect.frames.some(frame => String(frame.clipPath).includes('inset')) && !effect.frames.some(frame => frame.filter))).toBe(true);
      await page.waitForTimeout(500);
      expect(Math.abs((await page.evaluate(() => scrollY)) - y)).toBeLessThanOrEqual(2);
    }
    await nav.screenshot({ path: testInfo.outputPath(`${id}-pagination.png`) });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('#works .catalog-pagination').getByRole('button', { name: '次のページ' }).click();
  expect(await page.locator('#works .portfolio-grid').evaluate(el => el.getAnimations().length)).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
