import { test, expect } from "@playwright/test";

test("section order, navigation and page health", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/大穂兄弟/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("兄弟の力で");
  expect(await page.locator("main > section").evaluateAll(elements => elements.map(element => element.id)))
    .toEqual(["introduction", "services", "strengths", "packages", "works", "faq", "contact"]);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if (isMobile) {
    await page.getByRole("button", { name: "メニューを開く" }).click();
    await page.getByRole("navigation", { name: "モバイルナビゲーション" }).getByRole("link", { name: /パッケージ/ }).click();
    await expect(page.getByRole("button", { name: "メニューを開く" })).toHaveAttribute("aria-expanded", "false");
  }
  await expect(page.getByRole("contentinfo")).toContainText("BROTHERS");
  expect(errors).toEqual([]);
});

test("all 20 sample packages are reachable, filterable and open for consultation", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#packages");
  const pagination = section.getByRole("navigation", { name: "パッケージのページ切り替え" });
  await expect(section.locator(".catalog-summary")).toContainText("20件中 1〜6件");
  for (const [index, count] of [6, 6, 6, 2].entries()) {
    await pagination.getByRole("button", { name: `${index + 1}ページ目` }).click();
    await expect(section.locator(".package-card")).toHaveCount(count);
  }
  await section.getByRole("button", { name: "Web制作", exact: true }).click();
  await expect(section.locator(".package-card")).toHaveCount(5);
  await expect(section.locator(".catalog-summary")).toContainText("5件中 1〜5件");
  const opener = section.getByRole("button", { name: "プランの詳細を見る" }).first();
  await opener.click();
  await expect(page.getByRole("dialog")).toContainText("正式な費用・納期は個別にご相談");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(opener).toBeFocused();
  await opener.click();
  await page.getByRole("button", { name: "この内容について相談する" }).click();
  await expect(page.getByLabel("相談したいこと")).toHaveValue("はじめてのコーポレートサイト");
});

test("all 30 sample works are reachable with search, empty state and details", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#works");
  const pagination = section.getByRole("navigation", { name: "ポートフォリオのページ切り替え" });
  for (const [index, count] of [9, 9, 9, 3].entries()) {
    await pagination.getByRole("button", { name: `${index + 1}ページ目` }).click();
    await expect(section.locator(".portfolio-card")).toHaveCount(count);
  }
  await page.getByRole("searchbox", { name: "ポートフォリオを検索" }).fill("flow");
  await expect(section.locator(".portfolio-card")).toHaveCount(1);
  await section.locator(".portfolio-card button").click();
  await expect(page.getByRole("dialog")).toContainText("架空の自主制作コンセプト");
  await page.keyboard.press("Escape");
  await page.getByRole("searchbox").fill("no-such-example-999");
  await expect(section.locator(".catalog-empty")).toBeVisible();
  await section.getByRole("button", { name: "検索条件をリセット" }).click();
  await expect(section.locator(".catalog-summary")).toContainText("30件中 1〜9件");
  await section.getByRole("button", { name: "デザイン", exact: true }).click();
  await expect(section.locator(".portfolio-card")).toHaveCount(7);
});

test("FAQ and contact validation, mail draft and edit invalidation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /費用や制作期間/ }).click();
  await expect(page.locator("#faq-answer-2")).toBeVisible();
  await page.getByRole("button", { name: "内容を確認する" }).click();
  await expect(page.locator("#contact-review")).toHaveCount(0);
  await page.getByLabel("お名前").fill("テスト 太郎");
  await page.getByLabel("メールアドレス", { exact: false }).fill("test@example.com");
  await page.getByLabel("会社名・屋号").fill("サンプル株式会社");
  await page.getByLabel("相談したいこと").selectOption("AI活用 / 業務改善");
  await page.getByLabel("ご相談内容").fill("日々の集計作業を効率化したいです。");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "内容を確認する" }).click();
  const review = page.locator("#contact-review");
  await expect(review).toBeVisible();
  await expect(review).toContainText("まだ送信されていません");
  const href = await page.getByRole("link", { name: "メールアプリで送る" }).getAttribute("href");
  expect(href).toMatch(/^mailto:cbnbc07@gmail.com\?/);
  expect(decodeURIComponent(href!)).toContain("test@example.com");
  expect(decodeURIComponent(href!)).toContain("日々の集計作業を効率化したいです。");
  await page.getByLabel("ご相談内容").fill("内容を変更して、もう一度確認します。");
  await expect(review).toHaveCount(0);
});

test("hero keyboard controls and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "自動切替を再生" })).toBeDisabled();
  await page.getByRole("tab", { name: /02 ITコンサルティング/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("進むべき道筋を。");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /03 デザイン・開発/ })).toBeFocused();
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText("可能性を広げる。");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
