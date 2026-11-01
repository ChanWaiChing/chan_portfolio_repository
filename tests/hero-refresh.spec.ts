import {test,expect} from '@playwright/test';

test('night sky hero has luminous solid lettering, a two-man introduction, and centered actions',async({page,isMobile},testInfo)=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 const hero=page.locator('.reference-hero');
 await expect(hero).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
 await expect(page.locator('.hero-night')).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
 await expect(page.locator('.site-night-sky')).toHaveCount(1);
 await expect(page.locator('.night-sky')).toHaveAttribute('aria-hidden','true');
 await expect(page.locator('.night-star')).toHaveCount(140);
 await expect(page.locator('.night-meteor')).toHaveCount(5);
 await expect(page.locator('.night-star').first()).toHaveCSS('animation-name','none');
 await expect(page.locator('.night-meteor').first()).toHaveCSS('display','none');
 expect(await hero.evaluate(el=>getComputedStyle(el,'::before').content)).toBe('none');
 await expect(page.locator('.hero-scene-stage')).toHaveCSS('border-top-width','0px');
 await expect(page.locator('.hero-motion-toggle')).toHaveCount(0);
 const title=page.locator('#hero-title');
 await expect(title).toHaveCSS('font-family',/Noto Sans JP Variable/);
 await expect(title).toHaveCSS('font-weight','900');
 await expect(title).toHaveCSS('writing-mode','vertical-rl');
 const line=title.locator('.hero-title-line').first();
 await expect(line).toHaveCSS('background-image','none');
 await expect(line).toHaveCSS('color','rgb(217, 243, 255)');
 await expect(title).not.toContainText(/[\u3001\u3002]/);
 await expect(page.locator('.site-motion-toggle')).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Open Next.js Dev Tools'})).toHaveCount(0);
 await expect(page.locator('.hero-primary-copy > .eyebrow')).toHaveCount(0);
 await expect(page.locator('.hero-primary-copy > p')).toHaveCSS('color','rgb(214, 237, 255)');
 await expect(page.locator('.scene-0 img')).toHaveAttribute('src',/team-introduction-v2/);
 await expect(line).toHaveCSS('animation-name','none');
 const slideImages=page.locator('.hero-photo-layer img');
 for(const [index,name] of ['team-introduction-v2','design-figma-v2','development-v2','revisions-v2'].entries()) {
  await expect(slideImages.nth(index)).toHaveAttribute('src',new RegExp(name));
  await expect(slideImages.nth(index)).toHaveCSS('object-fit','contain');
  await expect(slideImages.nth(index)).toHaveCSS('border-radius','20px');
 }
 const row=(await page.locator('.reference-hero-controls').boundingBox())!;
 const parent=(await hero.boundingBox())!;
 expect(Math.abs(row.x+row.width/2-parent.x-parent.width/2)).toBeLessThan(2);

 const actions=page.locator('.hero-primary-actions');const bounds=(await actions.boundingBox())!;
 for(const button of await actions.locator('a').all()){const box=(await button.boundingBox())!;expect(Math.abs((box.x+box.width/2)-(bounds.x+bounds.width/2))).toBeLessThan(2);}
 await expect(page.locator('.hero-image-label')).toHaveCount(0);
 await expect(page.locator('.hero-scene-caption')).toBeVisible();
 await expect(page.locator('.hero-photo-deck')).toHaveCSS('border-radius','20px');
 const bots=page.locator('.hero-selector-bot img');await expect(bots).toHaveCount(4);
 for(const bot of await page.locator('.hero-selector-bot').all()) await expect(bot).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
 const paths=await bots.evaluateAll(images=>images.map(img=>img.getAttribute('src')));expect(new Set(paths).size).toBe(4);
 await expect(page.locator('.reference-hero-tabs button > .bot-mascot + .hero-tab-copy .hero-tab-number')).toHaveCount(4);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(page.locator('.hero-selector-bot .bot-accessory')).toHaveCount(0);
 await expect(page.locator('.brand-name > span')).toHaveCount(0);
 const primaryBackground=await page.locator('.hero-primary-actions .catalog-cta').evaluate(el=>getComputedStyle(el).backgroundImage);
 await expect(page.locator('.header-contact')).toHaveCSS('background-image',primaryBackground);
 for(const label of await page.locator('.hero-tab-copy').all()) await expect(label).toHaveCSS('align-items','center');
 if(!isMobile) {
  const original=page.viewportSize()!;
  for(const [width,height] of [[1280,600],[1280,720],[1440,900],[1778,900],[1920,1080]]) {
   await page.setViewportSize({width,height});
   for(const selector of ['.hero-primary-copy h1','.hero-primary-copy > p','.hero-primary-actions','.hero-scene-stage','.hero-scene-caption','.reference-hero-tabs']) {
    const box=(await page.locator(selector).boundingBox())!;
    expect(box.y,selector).toBeGreaterThanOrEqual(0);
    expect(box.y+box.height,selector+' at '+width+'x'+height).toBeLessThanOrEqual(height+1);
   }
   const deck=(await page.locator('.hero-photo-deck').boundingBox())!;
   expect(deck.width/deck.height).toBeCloseTo(1.5,2);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.setViewportSize(original);
 }
 const tabs=page.getByRole('tab');
 for(const [index,name] of ["チーム紹介","デザイン","開発","修正"].entries()) {
  await expect(tabs.nth(index)).toContainText(name);
  await tabs.nth(index).click();
  const img=slideImages.nth(index);
  await expect(img).toBeVisible();
  await expect(page.locator('.hero-scene-caption h2')).toBeVisible();
  await expect.poll(()=>img.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const dimensions=await img.evaluate(el=>({width:(el as HTMLImageElement).naturalWidth,height:(el as HTMLImageElement).naturalHeight}));
  expect(dimensions.width/dimensions.height).toBeCloseTo(1.5,1);
  await page.screenshot({path:testInfo.outputPath('slide-'+index+'.png')});
 }
 await tabs.first().click();
 await page.screenshot({path:testInfo.outputPath('hero.png')});
});

test('system motion preferences pause and resume the luminous headline and carousel',async({page})=>{
 await page.goto('/');
 const line=page.locator('.hero-title-line').first();
 await expect(line).toHaveCSS('animation-play-state','running');
 await expect(page.locator('.night-star').first()).toHaveCSS('animation-play-state','running');
 await page.emulateMedia({ reducedMotion: "reduce" });
 await expect(page.locator('.reference-hero')).toHaveAttribute('data-playing','false');
 await expect(line).toHaveCSS('animation-play-state','paused');
 await expect(page.locator('.milky-way')).toHaveCSS('animation-name','none');
 await expect(page.locator('.night-meteor').first()).toHaveCSS('display','none');
 await page.emulateMedia({ reducedMotion: "no-preference" });
 await expect(page.locator('.reference-hero')).toHaveAttribute('data-playing','true');
 await expect(line).toHaveCSS('animation-play-state','running');
});
