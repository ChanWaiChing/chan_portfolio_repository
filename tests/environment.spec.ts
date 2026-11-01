import { test, expect } from "@playwright/test";

test("package cards stay concise and preserve the complete pricing and scope in details", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("#packages .package-card").first();
  await expect(card.locator(".package-price, .package-entry-scope, details")).toHaveCount(0);
  await expect(card.locator(".package-thumbnail img")).toHaveCount(1);
  await expect(card.locator(":scope > p")).toHaveCSS("min-height", "0px");
  await card.getByRole("button").click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator(".package-entry-details .package-price")).toContainText("¥30,000");
  await expect(dialog.locator(".package-entry-details")).toContainText("制作期間：ご相談のうえ決定");
  await expect(dialog.locator(".package-entry-scope")).toContainText("標準テーマ");
  await expect(dialog.locator(".package-detail-deliverables li")).not.toHaveCount(0);
  await dialog.getByText("修正・追加費用の条件", { exact: true }).click();
  await expect(dialog).toContainText("追加制作・大幅な変更は別途相談");
  await page.keyboard.press("Escape");
  await expect(card.getByRole("button")).toBeFocused();
});

test("bot-colored badges and primary controls retain readable contrast", async ({ page }) => {
  await page.goto("/");
  const ratios = await page.locator("#packages .package-card .catalog-card-meta > span, .hero-primary-actions > .catalog-cta, .contact-submit").evaluateAll(elements => {
    const luminance = (rgb: number[]) => rgb.map(v => {
      const c = v / 255;
      return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
    }).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0);
    const parse = (color: string) => (color.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
    return elements.flatMap(el => {
      const style = getComputedStyle(el), foreground = luminance(parse(style.color));
      const stops = style.backgroundImage.match(/rgb\([^)]+\)/g) || [style.backgroundColor];
      return stops.map(color => {
        const background = luminance(parse(color));
        return (Math.max(foreground, background) + .05) / (Math.min(foreground, background) + .05);
      });
    });
  });
  for (const ratio of ratios) expect(ratio).toBeGreaterThanOrEqual(4.5);
});

test("all sections share the fixed night sky and honor reduced motion",async({page,isMobile},testInfo)=>{
 await page.goto('/');
 const sky=page.locator('.site-night-sky');
 await expect(sky).toHaveCount(1);
 await expect(sky).toHaveCSS('position','fixed');
 await expect(sky).toHaveCSS('pointer-events','none');
 await expect(page.locator('.night-star')).toHaveCount(140);
 await expect(page.locator('.night-meteor')).toHaveCount(8);
 await expect(page.locator('.night-star').first()).toHaveCSS('animation-name','night-twinkle');
 await expect(page.locator('.milky-way')).toHaveCSS('animation-name','milky-way-drift');
 await expect(page.locator('.night-meteor').first()).toHaveCSS('animation-name','night-shooting-star');
 const universe=page.locator('.skill-tool-universe');
 await universe.scrollIntoViewIfNeeded();
 await universe.screenshot({caret:'initial',path:testInfo.outputPath('skills-night.png')});
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const selector of ['.introduction-copy','#skills','#packages','#works','#faq','#contact','.pattern-footer']) {
  const section=page.locator(selector);
  await section.scrollIntoViewIfNeeded();
  await expect(section).toHaveCSS('background-image','none');
  await expect(section).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
  expect(await section.evaluate(el=>getComputedStyle(el,'::before').content)).toBe('none');
  const bounds=(await sky.boundingBox())!;
  expect(bounds.y).toBe(0);
  expect(bounds.height).toBe(page.viewportSize()!.height);
  await page.screenshot({caret:"initial",path:testInfo.outputPath(selector.replace(/[^a-z]/g,'')+'.png')});
 }
 await expect(page.locator('.milky-way')).toHaveCSS('animation-name','none');
 await expect(page.locator('.night-meteor').first()).toHaveCSS('display','none');
 await expect(page.locator('[data-reveal]')).toHaveCount(0);
 await expect(page.locator('#selected-work')).toHaveCount(0);
 await expect(page.locator('.faq-guide-heading > span')).toHaveText('FAQ');
 await expect(page.locator('#faq-title')).not.toHaveText('FAQ');
 await expect(page.locator('.footer-artwork img')).toHaveAttribute('src',/footer-collaboration/);
 const scene=(await page.locator('.footer-scene').boundingBox())!;
 const caption=(await page.locator('.footer-artwork figcaption').boundingBox())!;
 expect(caption.y).toBeGreaterThanOrEqual(scene.y+scene.height);
 await expect(page.locator('.footer-top-pill svg')).toHaveCount(1);
 const primary=await page.locator('.hero-primary-actions .catalog-cta').evaluate(el=>getComputedStyle(el).backgroundImage);
 await expect(page.locator('.footer-top-pill')).toHaveCSS('background-image',primary);
 await expect(page.locator('.footer-nav-pill a')).toHaveCount(5);
 await expect(page.locator('.footer-nav-pill a[href="#faq"]')).toHaveText('FAQ');
 await expect(page.locator('.footer-invitation,.footer-closing')).toHaveCount(0);
 await expect(page.locator('.footer-end .footer-vertical-lockup')).toHaveCount(1);
 const brand=(await page.locator('.footer-brand').boundingBox())!;
 expect(brand.y).toBeGreaterThanOrEqual(caption.y+caption.height);
 const details=(await page.locator('.footer-end-details').boundingBox())!;
 const upper=(await page.locator('.footer-circle-links').boundingBox())!;
 expect(Math.abs(details.x+details.width/2-upper.x-upper.width/2)).toBeLessThan(2);
 const nav=(await page.locator('.footer-nav-pill').boundingBox())!;
 expect(Math.abs(nav.x+nav.width/2-upper.x-upper.width/2)).toBeLessThan(2);
 if(!isMobile) expect(brand.x+brand.width).toBeLessThan(details.x);


 if(isMobile) await page.locator('.footer-nav-pill a').first().focus();
 else await page.locator('.footer-nav-pill a').first().hover();
 await expect(page.locator('.footer-nav-pill a').first()).toHaveCSS('background-image',/linear-gradient/);
 await page.screenshot({path:testInfo.outputPath('footer-refined.png')});
 await page.locator('.footer-nav-pill a[href="#faq"]').click();
 await expect.poll(()=>page.locator('#faq').evaluate(el=>el.getBoundingClientRect().top)).toBeLessThan(180);

 await expect(page.locator('.contact-form')).toHaveCSS('background-image',/linear-gradient/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
