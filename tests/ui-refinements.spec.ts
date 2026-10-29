import { test, expect } from "@playwright/test";

test("mobile controls stay readable and the inquiry form follows a compact contact panel",async({page,isMobile})=>{
  if(!isMobile) return;
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto('/');
  const tabLabels=page.locator('.hero-tab-short');
  for(const label of await tabLabels.all()) expect((await label.boundingBox())!.height).toBeLessThan(30);
  const card=await page.locator('#packages .package-card').first().boundingBox();
  expect(card!.width).toBeGreaterThan(300);
  const section=await page.locator('#packages').boundingBox();
  expect(card!.y-section!.y).toBeLessThan(520);
  const overview=await page.locator('.contact-overview').boundingBox();
  expect(overview!.height).toBeLessThan(360);
  const form=await page.locator('.contact-form-column').boundingBox();
  expect(form!.y-overview!.y).toBeLessThan(390);
  for(const arrow of await page.locator('.page-scroll-control > button').all()) {
    const rect=await arrow.boundingBox();expect(rect!.width).toBeGreaterThanOrEqual(44);expect(rect!.height).toBeGreaterThanOrEqual(44);
  }
});

test("the site-wide stop control pauses autonomous hero and skill motion",async({page,isMobile})=>{
  if(isMobile) return;
  await page.goto('/');
  await page.getByRole('button',{name:'演出を停止',exact:true}).click();
  await expect(page.locator('.reference-hero')).toHaveAttribute('data-playing','false');
  await expect(page.locator('.skill-tool-universe')).toHaveAttribute('data-paused','true');
  await expect(page.locator('.hero-motion-toggle')).toBeDisabled();
  await page.getByRole('button',{name:'演出を再生',exact:true}).click();
  await expect(page.locator('.hero-motion-toggle')).toBeEnabled();
  await expect(page.locator('.skill-tool-universe')).toHaveAttribute('data-paused','false');
});
