const { chromium } = require('@playwright/test');
const { mkdirSync, existsSync } = require('node:fs');

(async () => {
  const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || (existsSync(chrome) ? chrome : undefined) });
  mkdirSync('test-results/review', { recursive: true });
  for (const [name, viewport] of [['desktop', { width: 1440, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await page.goto(process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3001');
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.hero-motion-toggle').waitFor();
    await page.screenshot({ path: `test-results/review/${name}-hero.png` });
    await page.locator('.hero-scene-stage').screenshot({ path: `test-results/review/${name}-hero-1.png`, style: '.site-header { visibility: hidden; }' });
    for (const slide of [1,2,3]) {
      await page.locator('[role="tab"]').nth(slide).click();
      await page.locator('.hero-photo-layer[data-active="true"] img').evaluate(element => element.decode());
      await page.locator('.hero-scene-stage').screenshot({ path: `test-results/review/${name}-hero-${slide+1}.png`, style: '.site-header { visibility: hidden; }' });
    }
    for (const section of ['.selected-work', '.brother-intro-panel', '.service-entrances', '.workflow-skills', '#strengths', '#packages .catalog-filters', '#contact', '.pattern-footer']) {
      if (section === '.workflow-skills') await page.locator('.capability-details').evaluate(element => { element.open = true; });
      const element = page.locator(section).first();
      await element.scrollIntoViewIfNeeded();
      await element.screenshot({ path: `test-results/review/${name}-${section.replace(/^[.#]/, '')}.png`, style: '.site-header { visibility: hidden; }' });
    }
    await page.setViewportSize(viewport);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    console.log(JSON.stringify({ name, horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth) }));
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
