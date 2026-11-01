import { test, expect } from '@playwright/test';
import { portfolioItems } from '../lib/projects';
import { portfolioFields, fieldLabel } from '../lib/portfolio-fields';

test('field filters show the right projects in both markets and combine with website type', async ({ page }, testInfo) => {
  await page.goto('/#works');
  const section = page.locator('#works');
  for (const market of ['japan', 'global'] as const) {
    await section.locator(`[data-market="${market}"]`).click();
    const items = portfolioItems.filter(item => item.market === market);
    const group = section.locator('.portfolio-fields [role="group"]');
    const fields = portfolioFields.filter(field => items.some(item => item.field === field.id));
    await expect(group.getByRole('button')).toHaveCount(fields.length + 1);
    for (const field of fields) {
      const expected = items.filter(item => item.field === field.id);
      const button = group.locator(`[data-field="${field.id}"]`);
      await button.click();
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      await expect(section.locator('.portfolio-card')).toHaveCount(Math.min(6, expected.length));
      for (const badge of await section.locator('.portfolio-field-badge').all()) {
        await expect(badge).toHaveText(fieldLabel(field.id, market === 'global'));
        await expect(badge).toHaveAttribute('data-project-field', field.id);
      }
    }
    await group.locator('[data-field="beauty"]').click();
    await section.locator('[data-category="ECサイト"]').click();
    await expect(section.locator('.portfolio-card')).toHaveCount(market === 'japan' ? 1 : 0);
    if (market === 'global') {
      await section.getByRole('button', { name: 'Reset filters' }).click();
      await expect(group.locator('[data-field="all"]')).toHaveAttribute('aria-pressed', 'true');
      expect(await section.innerText()).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/);
    }
  }
  await section.locator('[data-field="technology"]').click();
  await page.reload();
  await expect(section.locator('[data-field="technology"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(section.locator('.portfolio-card')).toHaveCount(2);
  await section.getByRole('searchbox').fill('Animoca');
  await expect(section.locator('.portfolio-card')).toHaveCount(1);
  await section.locator('.portfolio-card button').click();
  await expect(page.getByRole('dialog').locator('dd').first()).toHaveText('Technology');
  await page.keyboard.press('Escape');
  await section.locator('[data-market="japan"]').click();
  await expect(section.locator('[data-field="all"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(section.getByRole('searchbox')).toHaveValue('');
  await section.locator('.portfolio-fields').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('portfolio-fields.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
