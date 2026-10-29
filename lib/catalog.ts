/** Package data comes from supplied PDFs; the three interactive demos remain illustrative. */
export const categories = ["すべて", "ウェブ制作", "デザイン", "システム開発", "人工知能・業務改善", "コンサルティング"] as const;
export type Category = Exclude<(typeof categories)[number], "すべて">;
export { servicePackages, type ServicePackage } from "./service-packages";

export type PortfolioItem = {
  id: string; title: string; brand: string; category: Category;
  description: string; technologies: string[]; accent: string; kind: "website" | "dashboard" | "mobile";
  challenge: string; approach: string; validation: string;
};
const conceptBriefs: Record<Category, [string, string, string]> = {
  "ウェブ制作": ["サービスの魅力が伝わりにくく、必要な情報を探す手間がかかる。", "閲覧する人の目的を整理し、情報の優先順位とお問い合わせまでの導線を設計。", "スマートフォンでの読みやすさ、主要ページへの到達、キーボード操作を確認する想定です。"],
  "デザイン": ["画面や媒体によって見た目が異なり、操作の意味が伝わりにくい。", "利用シーンとユーザーフローから、色・文字・コンポーネントのルールをそろえる。", "主要タスクをプロトタイプで試し、迷いやすい箇所と文字の視認性を確認する想定です。"],
  "システム開発": ["情報が複数のシートに分かれ、状況把握や引き継ぎに時間がかかる。", "業務フローと権限を整理し、必要な情報をひとつの画面に集約。", "入力・検索・更新の流れ、例外処理、権限ごとの表示を確認する想定です。"],
  "人工知能・業務改善": ["繰り返す情報整理に時間を取られ、判断に使う情報がそろわない。", "入力資料を整理し、人工知能の草案作成と人の確認をつなぐワークフローを検討。", "元資料との整合性、確認手順、誤った出力への対応を小さく検証する想定です。"],
  "コンサルティング": ["改善したいことはあるが、取り組む順序と必要な体制が決まっていない。", "課題・制約・運用体制を整理し、優先順位と段階的な実行計画を作成。", "目的に対する実現性、費用と運用の負担、次の判断に必要な条件を確認する想定です。"],
};
const featuredBriefs: Record<string, [string, string, string]> = {
  "もり": ["暮らしのブランドらしい穏やかさと、商品を探しやすい構成を両立したい。", "余白を活かした商品一覧と、迷わず選べるカテゴリ切り替えを実装。", "「食器」「布もの」で表示内容と件数が切り替わる動作を確認できます。架空の商品データを使う自主制作デモで、売上などの成果数値はありません。"],
  "ながれ": ["担当者ごとの進捗が分散し、確認待ちのタスクを見落としやすい。", "タスク・担当・状態をまとめ、未完了の仕事を絞り込める一覧を実装。", "完了・未完了の切り替え、完了件数の更新、未完了フィルタを操作できます。架空のタスクを使う画面内のデモです。"],
  "日々、": ["記録を続けたいが、毎日の入力が負担になる。", "ひと言を入力して一覧に追加する、短い記録フローを実装。", "記録の追加、空欄での追加防止、長い文章の表示を試せます。この画面内だけのデモで、閉じると内容はリセットされます。"],
};
const workSeeds: [string, string, Category][] = [
  ["もり", "暮らしに余白をつくるブランドサイト", "ウェブ制作"],
  ["ながれ", "チームの仕事が見えるダッシュボード", "システム開発"],
  ["日々、", "毎日を記録するモバイルアプリ画面", "デザイン"],

];
export const demoItems: PortfolioItem[] = workSeeds.map(([brand, title, category], i) => ({
  id: `work-${String(i + 1).padStart(2, "0")}`, brand, title, category,
  description: `架空の「${brand}」を題材にした、${category}の制作イメージです。目的と利用シーンを整理し、わかりやすい導線と使いやすさを検討したサンプルです。`,
  technologies: category === "デザイン" ? ["フィグマ", "画面と使い心地の設計"] : category === "人工知能・業務改善" ? ["パイソン", "人工知能ワークフロー"] : category === "コンサルティング" ? ["要件定義", "業務設計"] : ["ネクスト", "タイプスクリプト"],
  accent: ["blue", "teal", "orange", "violet", "green"][i % 5],
  kind: category === "システム開発" || category === "人工知能・業務改善" ? "dashboard" : category === "デザイン" ? "mobile" : "website",
  challenge: (featuredBriefs[brand] || conceptBriefs[category])[0],
  approach: (featuredBriefs[brand] || conceptBriefs[category])[1],
  validation: (featuredBriefs[brand] || conceptBriefs[category])[2],
}));
