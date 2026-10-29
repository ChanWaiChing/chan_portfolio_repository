import { test, expect } from "@playwright/test";

test("hero title is vertical modern Japanese text with a loaded local font", async ({ page }) => {
  await page.goto("/");
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toContainText("デザインと開発を");
  await expect(heading).toHaveCSS("writing-mode", "vertical-rl");
  await expect(heading).toHaveCSS("font-family", /Noto Sans JP Variable/);
  const loaded = await page.evaluate(async () => {
    await document.fonts.load('900 40px "Noto Sans JP Variable"');
    return document.fonts.check('900 40px "Noto Sans JP Variable"');
  });
  expect(loaded).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("native page scrolling remains available without a custom reading rail", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".page-scroll-control")).toHaveCount(0);
  await expect(page.locator(".portfolio-site")).toHaveCSS("padding-left", "0px");
  await expect(page.locator(".portfolio-site")).toHaveCSS("padding-right", "0px");
  await page.evaluate(() => scrollTo(0,500));
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
