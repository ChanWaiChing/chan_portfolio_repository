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
  const canvas = page.locator(".reading-layout");
  await expect(canvas).toHaveCSS("background-image", /serene-courtyard/);
  expect((await page.request.get("/images/environments/serene-courtyard.webp")).ok()).toBe(true);
  for (const selector of ["#introduction", "#selected-work", ".introduction-copy", "#services", "#strengths", "#packages", "#works", "#faq", "#contact"]) {
    await expect(page.locator(selector)).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(page.locator(selector)).toHaveCSS("background-image", "none");
  }
  for(const title of await page.locator(".section-title-rail h2").all()) {
    await expect(title).toHaveCSS("writing-mode", "vertical-rl");
    await expect(title).toHaveCSS("font-family", /Oho Classic/);
  }
  const rail = await page.locator(".reading-rail").boundingBox();
  expect(rail!.x).toBe(0);
  const section = await page.locator("#packages").boundingBox();
  expect(section!.x).toBeGreaterThanOrEqual(rail!.width);
  await expect(page.locator(".package-card").first()).toHaveCSS("background-color", "rgb(223, 230, 240)");
  await expect(page.locator(".contact-form")).toHaveCSS("background-color", "rgb(224, 230, 237)");
  await expect(page.locator(".contact-form")).toHaveCSS("background-image", /calm-inquiry/);
  await expect(page.locator(".contact-time-intro")).toContainText("本来の仕事に、向き合う時間をつくる。");
  const scene = await page.locator(".footer-scene").boundingBox();
  expect(scene!.width / scene!.height).toBeCloseTo(3, 1);
  const artwork = page.locator(".footer-scene img");
  await expect(artwork).toHaveCount(1);
  await artwork.scrollIntoViewIfNeeded();
  await artwork.evaluate((img: HTMLImageElement) => img.decode());
  await expect(artwork).toHaveAttribute("alt", /お客様のために、時間をつくる。/);
  await expect(artwork).toHaveCSS("object-fit", "contain");
  await expect(page.locator(".footer-scene > :not(img)")).toHaveCount(0);
  await expect(page.locator(".footer-scene")).toHaveCSS("background-image", "none");
  const footer = await page.locator(".pattern-footer").boundingBox();
  expect(scene!.x).toBeGreaterThan(footer!.x);
  expect(scene!.x+scene!.width).toBeLessThan(footer!.x+footer!.width);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
