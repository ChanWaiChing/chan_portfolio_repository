import {test,expect} from '@playwright/test';

test('titles use Noto Sans JP and larger explanations use Noto Serif JP',async({page})=>{
 await page.goto('/');
 const titles=page.locator('.portfolio-site :is(h2,h3,h4):not(.reference-hero h2)');
 expect(await titles.count()).toBeGreaterThan(30);
 for(const title of await titles.all()) await expect(title).toHaveCSS('font-family',/Noto Sans JP Variable/);
 const sizes=await page.locator('.content-heading h2,#packages h3,#works h3,.content-heading > span').evaluateAll(elements=>elements.map(el=>({tag:el.tagName,size:parseFloat(getComputedStyle(el).fontSize)})));
 for(const item of sizes) expect(item.size).toBeGreaterThanOrEqual(item.tag==='SPAN'?15:item.tag==='H2'?29:19);
 expect(await page.evaluate(async()=>{await document.fonts.load('600 32px "Noto Sans JP Variable"');return document.fonts.check('600 32px "Noto Sans JP Variable"');})).toBe(true);
 const explanation=page.locator('.hero-primary-copy > p:not(.eyebrow)').first();
 await expect(explanation).toHaveCSS('font-family',/Noto Serif JP Variable/);
 expect(await explanation.evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(18);
 expect(await page.evaluate(async()=>{await document.fonts.load('18px "Noto Serif JP Variable"');return document.fonts.check('18px "Noto Serif JP Variable"');})).toBe(true);
 await expect(page.locator('.brand-name')).toHaveCSS('font-family',/Noto Sans JP Variable/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
