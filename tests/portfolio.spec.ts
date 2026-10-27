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
    page
      .locator("#contact")
      .getByRole("link", { name: "プロジェクトを相談する" }),
  ).toHaveAttribute("href", "mailto:cbnbc07@gmail.com");
  await page.evaluate(() => scrollTo(0, 650));
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

test("category filters preserve project identity and show matching concepts", async ({
  page,
}) => {
  await page.goto("/");
  const controls = page.getByRole("group", {
    name: "ポートフォリオのカテゴリ",
  });
  await controls.getByRole("button", { name: /Webシステム/ }).click();
  await expect(page.locator(".work-card")).toHaveCount(1);
  await expect(page.locator(".work-card")).toContainText(
    "毎日の業務を、もっとシンプルに。",
  );
  await page.locator(".work-card").click();
  await expect(page.getByRole("dialog")).toContainText("ダッシュボード");
  await page.keyboard.press("Escape");
  await controls.getByRole("button", { name: /アプリ/ }).click();
  await expect(page.locator(".work-card")).toHaveCount(1);
  await expect(page.locator(".work-card")).toContainText(
    "手のひらから、心地よい体験を。",
  );
  await controls.getByRole("button", { name: /すべて/ }).click();
  await expect(page.locator(".work-card")).toHaveCount(3);
});

test("contact channels use supplied identifiers and support copying", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Discordの連絡先をコピー" }).click();
  await expect(page.locator(".contact-copy-status")).toContainText(
    "Discordの連絡先をコピーしました",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "shiner715",
  );
  await page.getByRole("button", { name: "Chatworkの連絡先をコピー" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "3htt4mii70cg8",
  );
  await expect(
    page.getByRole("link", { name: "Chatworkで連絡する" }),
  ).toHaveAttribute("href", "https://www.chatwork.com/3htt4mii70cg8");
  await expect(
    page.getByRole("link", { name: "メールを書く" }),
  ).toHaveAttribute("href", "mailto:cbnbc07@gmail.com");
  await expect(
    page.getByRole("link", { name: /Lancersでプロフィール/ }),
  ).toHaveAttribute("href", "https://www.lancers.jp/profile/Ryuji_0524_Xp");
  await page.locator("#contact-name").fill("山田 太郎");
  await page.locator("#contact-email").fill("taro@example.com");
  await page
    .locator("#contact-message")
    .fill("新しいウェブサービスを相談したいです。");
  await page
    .getByRole("button", { name: "相談内容をコピー", exact: true })
    .click();
  const draft = await page.evaluate(() => navigator.clipboard.readText());
  expect(draft).toContain("山田 太郎");
  expect(draft).toContain("taro@example.com");
  expect(draft).toContain("新しいウェブサービスを相談したいです。");
});

test("desktop portfolio hover reveals the project label", async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    "Hover is a mouse interaction. Touch users open the card directly.",
  );
  await page.goto("/");
  const card = page.locator(".work-card").first();
  await card.hover();
  await expect(card.locator(".project-hover-label")).toBeVisible();
  await expect(page.locator(".custom-cursor")).toHaveAttribute("data-active", "true");
  await expect(page.locator(".custom-cursor")).toHaveCSS("opacity", "1");
});
