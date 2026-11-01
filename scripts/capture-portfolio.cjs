const { chromium } = require('@playwright/test');
const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const source = fs.readFileSync('lib/projects.ts', 'utf8');
  const projects = JSON.parse(source.split('export const portfolioItems: PortfolioProject[] = ')[1].trim().replace(/;$/, ''));
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--no-sandbox'] });
  const results = [];
  const queue = projects.filter(project => project.url && (!process.argv[2] || process.argv.slice(2).includes(project.id)));
  await Promise.all(Array.from({ length: 3 }, async () => {
    while (queue.length) {
      const project = queue.shift();
      const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1, reducedMotion: 'reduce', ignoreHTTPSErrors: true });
      try {
        const response = await page.goto(project.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
        if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`);
        await page.waitForTimeout(project.id === 'towa-corporation' ? 15000 : 4000);
        await page.evaluate(async () => {
          await Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 2500))]);
          await Promise.race([Promise.all(Array.from(document.images).filter(img => img.getBoundingClientRect().top < 960).map(img => img.decode().catch(() => {}))), new Promise(resolve => setTimeout(resolve, 5000))]);
        });
        if (project.id === 'fancl-skinpatch') {
          const close = page.locator('.fsp_modal_close:visible').first();
          if (await close.count()) { await close.click(); await page.waitForTimeout(700); }
        }
        if (project.id === 'obitsu') {
          const close = page.locator('button[class*="-top-12"][class*="bg-white/90"]').first();
          if (await close.isVisible()) { await close.click(); await page.waitForTimeout(700); }
        }
        const title = await page.title();
        if (/access denied|just a moment|403 forbidden|404 not found/i.test(title)) throw new Error(title);
        const target = path.join('public', project.thumbnail);
        await sharp(await page.screenshot({ animations: 'disabled', timeout: 15000 })).resize(1200, 800).webp({ quality: 82 }).toFile(target);
        results.push({ id: project.id, status: 'captured', title, url: page.url() });
        console.log(`${project.id}: captured`);
      } catch (error) {
        results.push({ id: project.id, status: 'unavailable', error: error.message });
        console.log(`${project.id}: unavailable (${error.message.split('\n')[0]})`);
      } finally { await page.close(); }
    }
  }));
  await browser.close();
  fs.mkdirSync('test-results/portfolio-capture', { recursive: true });
  fs.writeFileSync('test-results/portfolio-capture/results.json', JSON.stringify(results, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
