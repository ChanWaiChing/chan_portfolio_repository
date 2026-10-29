import { test, expect } from "@playwright/test";

test("catalogs have four desktop columns and eight items per page", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const id of ["packages", "works"]) {
    const grid = page.locator(`#${id} .${id === "packages" ? "package" : "portfolio"}-grid`);
    await expect(grid.locator(":scope > article")).toHaveCount(8);
    const columns = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns.split(" ").length);
    expect(columns).toBe(isMobile ? id === "packages" ? 1 : 2 : 4);
  }
});

test("cursor meteor is decorative, pauses, and honors reduced motion", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) { await expect(page.locator(".meteor-canvas")).toHaveCount(0); return; }
  const canvas = page.locator(".meteor-canvas");
  await expect(canvas).toHaveCount(1);
  await expect(canvas).toHaveCSS("pointer-events", "none");
  await page.mouse.move(80, 180);
  await page.mouse.move(500, 270, { steps: 20 });
  await expect(canvas).toHaveAttribute("data-active", "true");
  await page.getByRole("button", { name: "演出を停止" }).click();
  await expect(canvas).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveAttribute("data-site-motion");
  await page.reload();
  await expect(page.getByRole("button", { name: "演出を再生" })).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".site-motion-toggle")).toHaveCount(0);
  await expect(page.locator("[data-reveal-state='waiting']")).toHaveCount(0);
});

test("sections use distinct transitions and the contact flow stays balanced", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.locator("#services .content-heading")).toHaveAttribute("data-reveal", "slide");
  await expect(page.locator("#works .content-heading")).toHaveAttribute("data-reveal", "glide");
  await expect(page.locator("#contact .content-heading")).toHaveAttribute("data-reveal", "settle");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const aside = await page.locator(".contact-overview").boundingBox();
  const form = await page.locator(".contact-form-column").boundingBox();
  const followup = await page.locator(".contact-followup").boundingBox();
  if (isMobile) expect(form!.y).toBeGreaterThan(aside!.y);
  else { expect(form!.x).toBeGreaterThan(aside!.x); expect(form!.width).toBeGreaterThan(aside!.width); }
  expect(followup!.y).toBeGreaterThan(form!.y + form!.height - 1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
