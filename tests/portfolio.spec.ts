import { test, expect } from "@playwright/test";
test("profile, navigation, scroll effect and page health", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /兄弟の力で、.*アイデアを.*カタチに/ }),
  ).toBeVisible();
  await expect(page).toHaveTitle(/大穂兄弟/);
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  if (isMobile) {
    await page.getByRole("button", { name: "メニューを開く" }).click();
    await page
      .getByRole("navigation", { name: "モバイルナビゲーション" })
      .getByRole("link", { name: /私たちについて/ })
      .click();
    await expect(
      page.getByRole("button", { name: "メニューを開く" }),
    ).toHaveAttribute("aria-expanded", "false");
  }
  await page.locator("#about").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("heading", { name: "考える、つなぐ、つくる。" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "プロジェクトを相談する" }),
  ).toHaveAttribute("href", "mailto:cbnbc07@gmail.com");
  await page.evaluate(() => scrollTo(0, 400));
  await expect
    .poll(() =>
      page
        .locator(".hero-track")
        .evaluate((e) =>
          Number(getComputedStyle(e).getPropertyValue("--hero-progress")),
        ),
    )
    .toBeGreaterThan(0.5);
  await expect(page.locator(".hero-canvas")).toHaveCount(1);
  expect(
    await page
      .locator(".hero-canvas")
      .evaluate((e) => (e as HTMLCanvasElement).width),
  ).toBeGreaterThan(300);
  expect(errors).toEqual([]);
});
test("concept details, FAQ, consultation draft and keyboard dismissal", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "想いが伝わる、ブランドサイト。 詳細を見る" })
    .click();
  await expect(page.getByRole("dialog")).toContainText("自主制作コンセプト");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: /費用や制作期間/ }).click();
  await expect(page.locator("#faq-answer-2")).toBeVisible();
  await page
    .getByRole("button", { name: /相談内容をまとめてから送る/ })
    .click();
  await page.getByLabel("相談したいこと").selectOption("AI活用 / 業務改善");
  await page
    .getByLabel("実現したいこと")
    .fill("業務を効率化するアプリを相談したいです。");
  const mail = page.getByRole("link", { name: "メールアプリで送る" });
  const href = await mail.getAttribute("href");
  expect(decodeURIComponent(href!)).toContain("業務を効率化するアプリ");
  expect(decodeURIComponent(href!)).toContain("\n\n");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("reduced motion keeps content accessible and disables effects", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-next")).toBeHidden();
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-name",
    "none",
  );
  await page.locator("#services").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("heading", { name: "その課題、一緒に整理します。" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
