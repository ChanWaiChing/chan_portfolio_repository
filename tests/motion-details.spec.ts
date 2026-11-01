import { test, expect } from '@playwright/test';

test('avatar rings have distinct motions and FAQ opens and closes accessibly', async ({ page }, testInfo) => {
  await page.goto('/');
  const rings = page.locator('.brother-portrait-orbit');
  await expect(rings).toHaveCount(2);
  await expect(rings.first()).toHaveCSS('animation-name', 'portrait-arc-drift');
  await expect(rings.first()).toHaveCSS('animation-duration', '10s');
  await expect(rings.last()).toHaveCSS('animation-direction', 'reverse');
  await expect(page.locator('.brother-portrait-satellite')).toHaveCount(2);
  await page.locator('.brother-profiles').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('avatar-rings.png') });
  const button = page.locator('#faq-question-0');
  const answer = page.locator('#faq-answer-0');
  await expect(answer).toHaveAttribute('aria-hidden', 'true');
  await expect(answer).not.toBeVisible();
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(answer).toHaveAttribute('aria-hidden', 'false');
  await expect(answer).toBeVisible();
  await expect(answer).toHaveCSS('opacity', '1');
  await page.locator('#faq-question-1').click();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(answer).not.toBeVisible();
  await page.locator('#faq-question-1').press('Enter');
  await expect(page.locator('#faq-question-1')).toHaveAttribute('aria-expanded', 'false');
  await button.click();
  await page.waitForTimeout(500);
  await page.locator('#faq .faq-guide-list').screenshot({ path: testInfo.outputPath('faq-open.png') });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const ring of await rings.all()) await expect(ring).toHaveCSS('animation-name', 'none');
  await expect(answer).toHaveCSS('transition-duration', '0s');
  await button.click();
  await expect(answer).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('page-change animation uses directional depth and a blur-to-sharp reveal', async ({ page }) => {
  await page.goto('/');
  for (const id of ['packages', 'works']) {
    const next = page.locator(`#${id} .catalog-pagination`).getByRole('button', { name: '次のページ' });
    await next.click();
    const frames = await page.locator(`#${id} article`).first().evaluate(el => el.getAnimations().map(a => ({ duration: a.effect?.getTiming().duration, frames: (a.effect as KeyframeEffect)?.getKeyframes() })));
    expect(frames.some(a => a.duration === 510 && a.frames.some(f => String(f.transform).includes('perspective')) && a.frames.some(f => f.filter === 'blur(3px)'))).toBe(true);
  }
});
