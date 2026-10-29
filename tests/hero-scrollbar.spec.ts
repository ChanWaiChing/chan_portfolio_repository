import { test, expect } from "@playwright/test";

test("hero title is vertical brush text with a loaded local font", async ({ page }) => {
  await page.goto("/");
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toContainText("デザインと開発を");
  await expect(heading).toHaveCSS("writing-mode", "vertical-rl");
  await expect(heading).toHaveCSS("font-family", /Oho Brush Title/);
  const loaded = await page.evaluate(async () => {
    await document.fonts.load('40px "Oho Brush Title"');
    return document.fonts.check('40px "Oho Brush Title"');
  });
  expect(loaded).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("custom scrollbar supports position seeking and keyboard navigation", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const control = page.getByRole("scrollbar", { name: "ページのスクロール位置" });
  await expect(control).toHaveAttribute("aria-orientation", isMobile ? "horizontal" : "vertical");
  await expect(control).toHaveAttribute("aria-controls", "main");
  const box = await control.boundingBox();
  await control.click({ position: isMobile ? { x: box!.width * .4, y: box!.height / 2 } : { x: box!.width / 2, y: box!.height * .4 } });
  await expect.poll(async () => Number(await control.getAttribute("aria-valuenow"))).toBeGreaterThan(25);
  await expect.poll(async () => Number(await control.getAttribute("aria-valuenow"))).toBeLessThan(55);
  await control.press("End");
  await expect(control).toHaveAttribute("aria-valuenow", "100");
  await control.press("Home");
  await expect(control).toHaveAttribute("aria-valuenow", "0");
  await control.press("PageDown");
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(200);
  await page.getByRole("button", { name: "末尾までスクロール" }).click();
  await expect(control).toHaveAttribute("aria-valuenow", "100");
  await page.getByRole("button", { name: "先頭までスクロール" }).click();
  await expect(control).toHaveAttribute("aria-valuenow", "0");
});

test("scroll thumb can be dragged without hiding normal page scrolling", async ({ page, isMobile }) => {
  if (isMobile) return;
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const control = page.getByRole("scrollbar", { name: "ページのスクロール位置" });
  await expect(control).toBeVisible();
  const box = (await control.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + 8);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height * .75, { steps: 12 });
  await page.mouse.up();
  await expect.poll(async () => Number(await control.getAttribute("aria-valuenow"))).toBeGreaterThan(60);
  const before = await page.evaluate(() => scrollY);
  await page.mouse.move(500, 500);
  await page.mouse.wheel(0, 600);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
});
