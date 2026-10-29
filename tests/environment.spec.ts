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

test("section images load, surfaces remain opaque, and the footer scene is not cropped", async ({ page }) => {
  await page.goto("/");
  const backgrounds = new Set<string>();
  for (const selector of ["#introduction", "#selected-work", ".introduction-copy", "#services", "#strengths", "#packages", "#works", "#faq", "#contact", ".footer-scene"]) {
    const style = await page.locator(selector).evaluate(el => getComputedStyle(el).backgroundImage);
    expect(style).toContain("/images/environments/");
    for (const match of style.matchAll(/url\("?([^"\)]+)"?\)/g)) backgrounds.add(match[1]);
  }
  expect(backgrounds.size).toBe(10);
  for (const url of backgrounds) {
    const response = await page.request.get(url);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/webp");
  }
  // The darkest possible photograph pixel must still give body copy sufficient contrast.
  for (const selector of ["#selected-work", ".introduction-copy", "#services", "#strengths", "#packages", "#works", "#faq", "#contact"]) {
    const contrast = await page.locator(selector).evaluate(el => {
      const style = getComputedStyle(el);
      const veil = style.getPropertyValue("--environment-veil").trim().slice(1);
      const ink = style.getPropertyValue("--muted").trim().slice(1);
      const alpha = parseInt(veil.slice(6, 8), 16) / 255;
      const luminance = (hex: string, opacity = 1) => [0, 2, 4].map(i => {
        const channel = parseInt(hex.slice(i, i + 2), 16) / 255 * opacity;
        return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
      }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
      return (luminance(veil, alpha) + .05) / (luminance(ink) + .05);
    });
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  }
  await expect(page.locator(".package-card").first()).toHaveCSS("background-color", "rgb(223, 230, 240)");
  await expect(page.locator(".contact-form")).toHaveCSS("background-color", "rgb(224, 230, 237)");
  await expect(page.locator(".contact-form")).toHaveCSS("background-image", /calm-inquiry/);
  await expect(page.locator(".contact-time-intro")).toContainText("本来の仕事に、向き合う時間をつくる。");
  const scene = await page.locator(".footer-scene").boundingBox();
  expect(scene!.width / scene!.height).toBeCloseTo(3, 1);
  const statement = page.locator(".footer-statement");
  await expect(statement).toHaveText("Creating time for our clients");
  await expect(statement).toHaveAttribute("lang", "en");
  const title = await statement.boundingBox();
  expect(title!.x).toBeGreaterThanOrEqual(scene!.x);
  expect(title!.x + title!.width).toBeLessThanOrEqual(scene!.x + scene!.width + 1);
  const sizing = await page.locator("#packages").evaluate(el => getComputedStyle(el).backgroundSize);
  expect(sizing).toBe("100% 100%, 100% 100%, cover");
  await expect(page.locator("#packages")).toHaveCSS("background-attachment", "scroll, scroll, fixed");
  expect(await statement.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
