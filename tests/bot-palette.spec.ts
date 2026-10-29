import {test,expect} from '@playwright/test';

test('four bot palettes repeat consistently through cards and selected tabs',async({page})=>{
 await page.goto('/');
 const cards=page.locator('#packages .package-card');
 const colors=await cards.evaluateAll(els=>els.map(el=>getComputedStyle(el).backgroundColor));
 expect(new Set(colors.slice(0,4)).size).toBe(4);
 expect(colors.slice(0,4)).toEqual(['rgb(228, 237, 248)','rgb(247, 233, 226)','rgb(246, 232, 237)','rgb(224, 240, 233)']);
 expect(colors.slice(4,8)).toEqual(colors.slice(0,4));
 for(let i=0;i<4;i++){
  await page.getByRole('tab').nth(i).click();
  const tab=page.getByRole('tab').nth(i);
  await expect(tab).toHaveAttribute('aria-selected','true');
  await expect(tab).toHaveCSS('background-color',['rgb(204, 221, 244)','rgb(242, 208, 217)','rgb(239, 208, 220)','rgb(194, 228, 213)'][i]);
 }
});

test('bot-tinted badges and white call-to-action text meet readable contrast',async({page})=>{
 await page.goto('/');
 const ratios=await page.locator('#packages .catalog-card-meta > span,.service-entrance .catalog-cta,.hero-primary-actions > .catalog-cta,.contact-submit,.footer-invitation .catalog-cta').evaluateAll(els=>{
  const rgb=(v:string)=>(v.match(/[\d.]+/g)||[]).slice(0,3).map(Number);
  const lum=(v:number[])=>v.map(x=>{const c=x/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4}).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
  return els.flatMap(el=>{const s=getComputedStyle(el),fg=lum(rgb(s.color)),stops=s.backgroundImage.match(/rgb\([^)]+\)/g)||[s.backgroundColor];return stops.map(stop=>{const bg=lum(rgb(stop));return (Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05)});});
 });
 for(const ratio of ratios)expect(ratio).toBeGreaterThanOrEqual(4.5);
});
