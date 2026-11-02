import { test, expect } from '@playwright/test';

test('top and bottom pagination stay synchronized for packages and portfolio', async ({ page, baseURL }, testInfo) => {
  const response = await page.request.post('/api/auth/login', {
    headers: { Origin: new URL(baseURL!).origin },
    data: { id: process.env.TEST_SITE_LOGIN_ID, password: process.env.TEST_SITE_LOGIN_PASSWORD },
  });
  expect(response.ok()).toBe(true);
  await page.goto('/?market=global');
  for (const [id, parameter, cardSelector] of [['packages', 'pp', '.package-card'], ['works', 'wp', '.portfolio-card']] as const) {
    const section = page.locator(`#${id}`);
    const top = section.locator('[data-pagination-position="top"]');
    const bottom = section.locator('[data-pagination-position="bottom"]');
    await expect(top).toHaveCount(1);
    await expect(bottom).toHaveCount(1);
    await expect(top.locator('[aria-current="page"]')).toHaveText('1');
    const firstTitle = await section.locator(`${cardSelector} h3`).first().innerText();
    await top.getByRole('button', { name: '2ページ目', exact: true }).click();
    await expect(top.locator('[aria-current="page"]')).toHaveText('2');
    await expect(bottom.locator('[aria-current="page"]')).toHaveText('2');
    await expect(section.locator(`${cardSelector} h3`).first()).not.toHaveText(firstTitle);
    expect(new URL(page.url()).searchParams.get(parameter)).toBe('2');
    await bottom.getByRole('button', { name: '次のページ', exact: true }).click();
    await expect(top.locator('[aria-current="page"]')).toHaveText('3');
    await expect(bottom.locator('[aria-current="page"]')).toHaveText('3');
    await page.reload();
    await expect(top.locator('[aria-current="page"]')).toHaveText('3');
    await expect(bottom.locator('[aria-current="page"]')).toHaveText('3');
    await top.getByRole('button', { name: '1ページ目', exact: true }).click();
    await expect(bottom.getByRole('button', { name: '前のページ', exact: true })).toBeDisabled();
    await top.scrollIntoViewIfNeeded();
    const topBounds = await top.boundingBox();
    const firstCard = await section.locator(cardSelector).first().boundingBox();
    expect(topBounds!.y + topBounds!.height).toBeLessThanOrEqual(firstCard!.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`${id}-top-pagination.png`) });
  }
  const works = page.locator('#works');
  await works.getByRole('searchbox').fill('SaaS System Development');
  await expect(works.locator('.portfolio-card')).toHaveCount(1);
  await expect(works.locator('.catalog-pagination')).toHaveCount(0);
  await works.getByRole('searchbox').fill('');
  await expect(works.locator('.catalog-pagination')).toHaveCount(2);
  await expect(works.locator('[aria-current="page"]')).toHaveText(['1', '1']);
});
