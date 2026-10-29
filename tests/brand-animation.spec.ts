import {test,expect} from '@playwright/test';

test('category selection keeps autoplay and the animated border running',async({page,isMobile})=>{
 await page.clock.install({time:new Date('2026-10-29T00:00:00Z')});
 await page.clock.pauseAt(new Date('2026-10-29T00:00:01Z'));
 await page.goto('/');
 const hero=page.locator('.reference-hero');
 await page.getByRole('tab',{name:/02 企画・戦略/}).click();
 await expect(hero).toHaveAttribute('data-playing','true');
 await expect(hero).toHaveAttribute('data-border-motion','true');
 await expect(page.locator('.hero-photo-layer').nth(1)).toHaveAttribute('data-active','true');
 if(!isMobile){const state=await page.locator('.reference-hero-tabs button').nth(1).evaluate(el=>getComputedStyle(el,'::after').animationPlayState);expect(state).toBe('running');}
 await page.clock.runFor(4000);
 await expect(page.locator('.hero-photo-layer').nth(2)).toHaveAttribute('data-active','true');
 await page.getByRole('button',{name:'演出を停止'}).click();
 await page.getByRole('tab',{name:/01 チーム紹介/}).click();
 await expect(hero).toHaveAttribute('data-playing','false');
 await expect(hero).toHaveAttribute('data-border-motion','false');
});

test('brand uses the loaded brush font and stays within the mobile header',async({page})=>{
 await page.goto('/');
 const logo=page.getByRole('link',{name:'大穂兄弟のトップ'});
 await expect(logo.locator('.brand-symbol')).toBeVisible();
 await expect(logo.locator('.brand-name')).toHaveCSS('font-family',/Oho Brand Brush/);
 expect(await page.evaluate(async()=>{await document.fonts.load('32px "Oho Brand Brush"');return document.fonts.check('32px "Oho Brand Brush"');})).toBe(true);
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});const rect=(await logo.boundingBox())!;expect(rect.x).toBeGreaterThanOrEqual(0);expect(rect.x+rect.width).toBeLessThanOrEqual(width);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
});
