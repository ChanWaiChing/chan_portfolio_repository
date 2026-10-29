import type { PortfolioItem } from "@/lib/catalog";

const decisions: Record<string, string[]> = {
  "もり": ["選択中のカテゴリだけを状態として保持し、同じ商品データから一覧と表示件数を計算します。", "選択中のボタンを読み上げでも判別できるようにしています。売上や集客の改善効果は未測定です。"],
  "ながれ": ["各タスクの完了状態を更新し、一覧・完了件数・未完了フィルタを同じデータから再計算します。", "未完了がなくなった場合も状態を表示します。認証や実際のチーム共有は含まない画面内の試作です。"],
  "日々、": ["空欄や空白だけの入力では追加できず、入力できる長さを制限しています。記録は新しい順に表示します。", "入力内容を文字として表示し、この画面の状態だけに保持します。保存機能・通知・端末間同期は含みません。"],
};
export function DesignWalkthrough({ item }: { item: PortfolioItem }) {
  const notes=decisions[item.brand]; if(!notes)return null;
  return <details className="design-walkthrough"><summary>設計判断と実装の解説を見る</summary><ol>{notes.map(note=><li key={note}>{note}</li>)}</ol><a href="https://github.com/ChanWaiChing/chan_portfolio_repository/blob/main/components/concept-demo.tsx" target="_blank" rel="noreferrer">公開している実装コードを見る ↗</a><p>上のデモで動作をご確認いただけます。自動テストでは、絞り込み・状態更新・空欄の処理・閉じた後のリセットを検証しています。</p></details>;
}
