import {test,expect} from '@playwright/test';

test('main navigation includes the FAQ anchor alongside the existing sections',async({page,isMobile},testInfo)=>{
 await page.goto('/');
 expect(await page.locator('main > section').evaluateAll(elements=>elements.map(el=>el.id))).toEqual(['about','packages','works','faq','contact']);
 await expect(page.locator('#introduction .reference-hero')).toHaveCount(1);
 await expect(page.locator('#about .brother-profile-card')).toHaveCount(2);
 await expect(page.locator('.team-background,.professional-profile')).toHaveCount(0);
 await expect(page.locator('#about .brother-profile-card').first().locator('h3')).toHaveText('\u5144');
 await expect(page.locator('#about .brother-profile-card').last().locator('h3')).toHaveText('\u5f1f');
 await expect(page.locator('#services,.working-process')).toHaveCount(0);
 await expect(page.locator('#selected-work')).toHaveCount(0);
 await expect(page.locator('main > #faq')).toHaveCount(1);
 const expected=['\u7d39\u4ecb','\u30d1\u30c3\u30b1\u30fc\u30b8','\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa','FAQ','\u304a\u554f\u3044\u5408\u308f\u305b'];
 await expect(page.locator('.desktop-nav a')).toHaveText(expected);
 if(isMobile){
  await page.locator('.menu-toggle').click();
  await page.locator('.mobile-nav a[href="#faq"]').click();
 }else await page.locator('.desktop-nav a[href="#faq"]').click();
 await expect(page).toHaveURL(/#faq$/);
 const faq=page.locator('#faq');
 await expect.poll(()=>faq.evaluate(el=>Math.round(el.getBoundingClientRect().top))).toBeLessThan(150);
 await expect.poll(()=>faq.evaluate(el=>Math.round(el.getBoundingClientRect().top))).toBeGreaterThanOrEqual(60);
 await expect(page.locator('.faq-bot-speech')).toHaveCount(0);
 await expect(page.locator('.faq-bot-guide > a')).toHaveCSS('color','rgb(182, 223, 255)');
 await page.locator('#faq-question-0').click();
 await expect(page.locator('#faq-answer-0')).toBeVisible();
 for(const item of await page.locator('.faq-guide-item').all()){
  await expect(item).toHaveCSS('border-top-width','1px');
  await expect(item).toHaveCSS('border-bottom-width','1px');
  await expect(item).toHaveCSS('overflow','hidden');
 }
 expect(await page.locator('#faq-question-0').evaluate(el=>getComputedStyle(el).boxShadow)).not.toMatch(/rgba\(0, 0, 0, 0\.[1-9]/);
 await page.screenshot({caret:'initial',path:testInfo.outputPath('faq.png')});

 if(isMobile){
  await page.locator('.menu-toggle').click();
  await expect(page.locator('.mobile-nav a')).toHaveCount(5);
  await page.locator('.mobile-nav a').first().click();
 }else await page.locator('.desktop-nav a').first().click();
 await page.locator('#about').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
 await page.screenshot({path:testInfo.outputPath('brothers.png')});
 await expect(page.locator('.hero-experience')).toHaveCount(0);
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
});
