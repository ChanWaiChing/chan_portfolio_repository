import {test,expect} from '@playwright/test';

test('white hero has thick rainbow lettering, centered actions, and four distinct bot selectors',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 const hero=page.locator('.reference-hero');
 await expect(hero).toHaveCSS('background-color','rgb(255, 255, 255)');
 expect(await hero.evaluate(el=>getComputedStyle(el,'::before').content)).toBe('none');
 await expect(page.locator('.hero-scene-stage')).toHaveCSS('border-top-width','0px');
 await expect(page.locator('.hero-motion-toggle')).toHaveCount(0);
 const title=page.locator('#hero-title');
 await expect(title).toHaveCSS('font-family',/Noto Sans JP Variable/);
 await expect(title).toHaveCSS('font-weight','900');
 await expect(title).toHaveCSS('writing-mode','vertical-rl');
 const line=title.locator('.hero-rainbow-line').first();
 await expect(line).toHaveCSS('background-image',/linear-gradient/);
 await expect(line).toHaveCSS('animation-name','none');
 const actions=page.locator('.hero-primary-actions');const bounds=(await actions.boundingBox())!;
 for(const button of await actions.locator('a').all()){const box=(await button.boundingBox())!;expect(Math.abs((box.x+box.width/2)-(bounds.x+bounds.width/2))).toBeLessThan(2);}
 await expect(page.locator('.reference-hero-copy h2')).toHaveCSS('text-align','center');
 const bots=page.locator('.hero-selector-bot img');await expect(bots).toHaveCount(4);
 for(const bot of await page.locator('.hero-selector-bot').all()) await expect(bot).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
 const paths=await bots.evaluateAll(images=>images.map(img=>img.getAttribute('src')));expect(new Set(paths).size).toBe(4);
 await expect(page.locator('.reference-hero-tabs button > .bot-mascot + .hero-tab-copy .hero-tab-number')).toHaveCount(4);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('one global control pauses and resumes the rainbow headline and carousel',async({page})=>{
 await page.goto('/');
 const line=page.locator('.hero-rainbow-line').first();
 await expect(line).toHaveCSS('animation-play-state','running');
 await page.getByRole('button',{name:'演出を停止',exact:true}).click();
 await expect(page.locator('.reference-hero')).toHaveAttribute('data-playing','false');
 await expect(line).toHaveCSS('animation-play-state','paused');
 await page.getByRole('button',{name:'演出を再生',exact:true}).click();
 await expect(page.locator('.reference-hero')).toHaveAttribute('data-playing','true');
 await expect(line).toHaveCSS('animation-play-state','running');
});
