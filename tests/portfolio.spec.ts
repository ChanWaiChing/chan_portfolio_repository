import { test, expect } from "@playwright/test";

test("section order, navigation and page health", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/大穂兄弟/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("デザインと開発を");
  expect(await page.locator("main > section").evaluateAll(elements => elements.map(element => element.id)))
    .toEqual(["introduction", "services", "strengths", "packages", "works", "faq", "contact"]);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if (isMobile) {
    await page.getByRole("button", { name: "メニューを開く" }).click();
    await page.getByRole("navigation", { name: "モバイルナビゲーション" }).getByRole("link", { name: /パッケージ/ }).click();
    await expect(page.getByRole("button", { name: "メニューを開く" })).toHaveAttribute("aria-expanded", "false");
  }
  await expect(page.getByRole("contentinfo")).toContainText("大穂兄弟");
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
  await section.locator('.catalog-filters button[data-category="ウェブ制作"]').click();
  await expect(section.locator(".package-card")).toHaveCount(5);
  await expect(section.locator(".catalog-summary")).toContainText("5件中 1〜5件");
  const opener = section.getByRole("button", { name: /プランの詳細を見る/ }).first();
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
  await page.getByRole("searchbox", { name: "ポートフォリオを検索" }).fill("ながれ");
  await expect(section.locator(".portfolio-card")).toHaveCount(1);
  await section.locator(".portfolio-card button").click();
  await expect(page.getByRole("dialog")).toContainText("架空の自主制作コンセプト");
  await page.keyboard.press("Escape");
  await page.getByRole("searchbox").fill("no-such-example-999");
  await expect(section.locator(".catalog-empty")).toBeVisible();
  await section.getByRole("button", { name: "検索条件をリセット" }).click();
  await expect(section.locator(".catalog-summary")).toContainText("30件中 1〜9件");
  await section.locator('.catalog-filters button[data-category="デザイン"]').click();
  await expect(section.locator(".portfolio-card")).toHaveCount(7);
});

test("FAQ and contact validation, mail draft and edit invalidation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /費用や制作期間/ }).click();
  await expect(page.locator("#faq-answer-2")).toBeVisible();
  await page.getByRole("button", { name: "内容を確認する" }).click();
  await expect(page.locator("#contact-review")).toHaveCount(0);
  await page.getByLabel("お名前").fill("テスト 太郎");
  await page.getByRole("textbox", { name: "メールアドレス 必須" }).fill("test@example.com");
  await page.getByLabel("会社名・屋号").fill("サンプル株式会社");
  await page.getByLabel("相談したいこと").selectOption("人工知能活用 / 業務改善");
  await page.getByLabel("ご相談内容").fill("日々の集計作業を効率化したいです。");
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
  await page.getByRole("tab", { name: /02 情報技術コンサルティング/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("進むべき道筋を。");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /03 デザイン・開発/ })).toBeFocused();
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText("可能性を広げる。");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("four hero images cycle every four seconds and can be paused", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-10-29T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-10-29T00:00:01Z"));
  await page.goto("/");
  await page.getByRole("tab", { name: /01 トータルサポート/ }).click();
  await page.getByRole("button", { name: "自動切替を再生" }).click();
  await expect(page.locator(".reference-hero")).toHaveAttribute("data-playing", "true");
  const frames = page.locator(".hero-photo-layer");
  await expect(frames).toHaveCount(4);
  await expect(frames.nth(0)).toHaveAttribute("data-active", "true");
  await page.clock.runFor(3999);
  await expect(frames.nth(0)).toHaveAttribute("data-active", "true");
  await page.clock.runFor(1);
  await expect(frames.nth(1)).toHaveAttribute("data-active", "true");
  await page.clock.runFor(4000);
  await expect(frames.nth(2)).toHaveAttribute("data-active", "true");
  await page.clock.runFor(4000);
  await expect(frames.nth(3)).toHaveAttribute("data-active", "true");
  await page.clock.runFor(4000);
  await expect(frames.nth(0)).toHaveAttribute("data-active", "true");
  await page.getByRole("button", { name: "自動切替を停止" }).click();
  await page.clock.runFor(8000);
  await expect(frames.nth(0)).toHaveAttribute("data-active", "true");
  await page.getByRole("button", { name: "自動切替を再生" }).click();
  await page.clock.runFor(4000);
  await expect(frames.nth(1)).toHaveAttribute("data-active", "true");
});

test("workflow links select packages, tool motion pauses, and footer navigation works", async ({ page }) => {
  await page.goto("/");
  await page.getByText("対応領域・技術の組み合わせを見る", { exact: true }).click();
  await expect(page.locator(".workflow-card")).toHaveCount(3);
  await page.getByRole("link", { name: /想いを整理して、使いやすいウェブサイトへ/ }).click();
  await expect(page.locator("#packages").locator('.catalog-filters button[data-category="ウェブ制作"]')).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "スキルアニメーションを停止" }).click();
  await expect(page.locator(".skill-tool-universe")).toHaveAttribute("data-paused", "true");
  await expect(page.locator(".skill-orbit-ring").first()).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "スキルアニメーションを再生" }).click();
  await expect(page.locator(".skill-tool-universe")).toHaveAttribute("data-paused", "false");
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "ページの先頭へ" })).toHaveAttribute("href", "#introduction");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByRole("button", { name: "スキルアニメーションを再生" })).toBeDisabled();
});

test("contact platform icons open the correct channels without displaying IDs", async ({ page }) => {
  await page.addInitScript(() => {
    const writes: string[] = [];
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (value: string) => { writes.push(value); } } });
    (window as Window & { contactClipboardWrites?: string[] }).contactClipboardWrites = writes;
  });
  await page.goto("/");
  const panel = page.locator(".contact-method-list");
  await expect(panel.locator(".contact-platform svg")).toHaveCount(4);
  for (const id of ["cbnbc07@gmail.com", "3htt4mii70cg8", "shiner715.", "@shiningstar1997"]) await expect(panel).not.toContainText(id);
  await expect(panel.getByRole("link", { name: "メールで相談する" })).toHaveAttribute("href", "mailto:cbnbc07@gmail.com");
  await expect(panel.getByRole("link", { name: "チャットワークで相談する" })).toHaveAttribute("href", "https://www.chatwork.com/3htt4mii70cg8");
  await expect(panel.getByRole("link", { name: "テレグラムで相談する" })).toHaveAttribute("href", "https://t.me/shiningstar1997");
  await panel.getByRole("button", { name: "ディスコードの連絡先をコピー" }).click();
  expect(await page.evaluate(() => (window as Window & { contactClipboardWrites?: string[] }).contactClipboardWrites?.at(-1))).toBe("shiner715.");
  await expect(panel.getByRole("status")).toContainText("コピーしました");
  await expect(page.locator(".faq-guide-item")).toHaveCount(8);
  await page.locator("#faq-question-7").click();
  await expect(page.locator("#faq-answer-7")).toBeVisible();
});

test("catalog URL restores filters, search and pagination after reload", async ({ page }) => {
  await page.goto("/?package=Web%E5%88%B6%E4%BD%9C&work=%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3&q=%E3%83%95%E3%82%A3%E3%82%B0%E3%83%9E#works");
  await expect(page.locator("#packages .package-card")).toHaveCount(5);
  await expect(page.locator("#works .portfolio-card")).toHaveCount(7);
  await expect(page.getByRole("searchbox")).toHaveValue("フィグマ");
  await page.reload();
  await expect(page.locator("#works").locator('.catalog-filters button[data-category="デザイン"]')).toHaveAttribute("aria-pressed", "true");
  await page.goto("/?pp=4&wp=4");
  await expect(page.locator("#packages .package-card")).toHaveCount(2);
  await expect(page.locator("#works .portfolio-card")).toHaveCount(3);
});

test("dialogs isolate the background and focus returns to the opener", async ({ page, isMobile }) => {
  await page.goto("/");
  const opener = page.locator(".selected-work button").first();
  await opener.click();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await expect(page.locator("main")).not.toHaveAttribute("inert");
  if (isMobile) {
    await page.getByRole("button", { name: "メニューを開く" }).click();
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "メニューを開く" })).toBeFocused();
  }
});

test("hero stops outside the viewport and all small layouts fit", async ({ page }) => {
  await page.goto("/");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator(".reference-hero")).toHaveAttribute("data-playing", "false");
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 3000 });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("three selected concepts have usable demos and reset on close", async ({ page }) => {
  await page.goto("/");
  const openers = page.locator(".selected-work .portfolio-card button");
  await openers.nth(0).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "布もの", exact: true }).click();
  await expect(dialog.locator(".demo-products article")).toHaveCount(1);
  await expect(dialog.locator(".demo-products")).toContainText("リネンクロス");
  await dialog.getByRole("button", { name: "食器", exact: true }).click();
  await expect(dialog.locator(".demo-products article")).toHaveCount(2);
  await page.keyboard.press("Escape");
  await openers.nth(1).click();
  await dialog.getByRole("button", { name: "トップページの構成を確認を完了にする", exact: true }).click();
  await expect(dialog.locator(".demo-progress")).toHaveText("2 / 3 件完了");
  await dialog.getByRole("checkbox", { name: "未完了だけ表示" }).check();
  await expect(dialog.locator(".demo-tasks li")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await openers.nth(2).click();
  const add = dialog.getByRole("button", { name: "記録を追加" });
  await expect(add).toBeDisabled();
  await dialog.getByLabel("今日の記録").fill("使いやすい画面をつくれました。");
  await add.click();
  await expect(dialog.locator(".demo-entries")).toContainText("使いやすい画面をつくれました。");
  await expect(add).toBeDisabled();
  await page.keyboard.press("Escape");
  await openers.nth(2).click();
  await expect(dialog.locator(".demo-entries li")).toHaveCount(0);
});

test("service entry points preselect consultation topics and explain contact handling", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".service-entrance")).toHaveCount(3);
  const topics = ["ウェブサイト制作", "ウェブ・業務システム開発", "人工知能活用 / 業務改善"];
  for (let index = 0; index < topics.length; index++) {
    await page.locator(".service-entrance").nth(index).getByRole("button", { name: "このサービスを相談する" }).click();
    await expect(page.getByLabel("相談したいこと")).toHaveValue(topics[index]);
  }
  await page.getByText("お問い合わせ情報の取り扱い", { exact: true }).click();
  await expect(page.locator(".contact-privacy")).toContainText("大穂兄弟");
  await expect(page.locator(".contact-expectations")).toContainText("送信だけで契約が成立することはありません");
});

test("category counts are attached to centered filter buttons", async ({ page }) => {
  await page.goto("/");
  for (const [id, counts] of [["packages", [20,5,4,4,4,3]], ["works", [30,9,7,6,4,4]]] as const) {
    const section = page.locator(`#${id}`);
    const buttons = section.locator(".catalog-filters button");
    for (let index=0; index<counts.length; index++) {
      await expect(buttons.nth(index).locator(".category-count")).toHaveText(String(counts[index]));
      await expect(buttons.nth(index)).toHaveAttribute("data-count", String(counts[index]));
    }
    const position = await section.locator(".catalog-filters").evaluate(element => { const rect=element.getBoundingClientRect(); return { center: rect.x+rect.width/2, window: innerWidth/2 }; });
    expect(Math.abs(position.center-position.window)).toBeLessThan(3);
    const badge = await buttons.first().locator(".category-count").evaluate(element => getComputedStyle(element).position);
    expect(badge).toBe("absolute");
  }
});

test("site-owned copy is Japanese and the skill orbit uses icons", async ({ page }) => {
  await page.goto("/");
  await page.getByText("対応領域・技術の組み合わせを見る", { exact:true }).click();
  await expect(page.locator(".skill-tool-badge > svg")).toHaveCount(13);
  await expect(page.locator(".skill-tool-badge > strong")).toHaveCount(0);
  const latin = await page.locator("body").innerText();
  expect(latin.match(/[A-Za-z]+/g)).toBeNull();
  const placeholders = await page.locator("input[placeholder],textarea[placeholder]").evaluateAll(elements=>elements.map(element=>element.getAttribute("placeholder")).join(" "));
  expect(placeholders.match(/[A-Za-z]+/g)).toBeNull();
  await page.goto("/does-not-exist");
  await expect(page.getByRole("heading", { level:1 })).toHaveText("ページが見つかりません");
});

test("hero keeps the first brand scene and uses three human-led images", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  await expect(page.locator(".hero-photo-layer").first().locator(".hero-brand-scene")).toHaveCount(1);
  await expect(page.locator(".human-led-image img")).toHaveCount(3);
  for (const index of [1,2,3]) {
    await page.locator('[role="tab"]').nth(index).click();
    await expect(page.locator(".hero-photo-layer").nth(index)).toHaveAttribute("data-active","true");
    const src=await page.locator(".hero-photo-layer").nth(index).locator("img").getAttribute("src");
    expect(decodeURIComponent(src || "")).toContain("human-led.webp");
  }
});
