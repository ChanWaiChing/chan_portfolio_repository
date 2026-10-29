import {test,expect} from '@playwright/test';

test('titles and subtitle labels use larger self-hosted Mincho lettering',async({page})=>{
 await page.goto('/');
 const titles=page.locator('.portfolio-site :is(h2,h3,h4):not(.reference-hero h2)');
 expect(await titles.count()).toBeGreaterThan(30);
 for(const title of await titles.all()) await expect(title).toHaveCSS('font-family',/Oho Classic Mincho/);
 const sizes=await page.locator('.content-heading h2,#packages h3,#works h3,.content-heading > span').evaluateAll(elements=>elements.map(el=>({tag:el.tagName,size:parseFloat(getComputedStyle(el).fontSize)})));
 for(const item of sizes) expect(item.size).toBeGreaterThanOrEqual(item.tag==='SPAN'?15:item.tag==='H2'?29:19);
 expect(await page.evaluate(async()=>{await document.fonts.load('600 32px "Oho Classic Mincho"');return document.fonts.check('600 32px "Oho Classic Mincho"');})).toBe(true);
 await expect(page.locator('.brand-name')).toHaveCSS('font-family',/Oho Brand Brush/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
