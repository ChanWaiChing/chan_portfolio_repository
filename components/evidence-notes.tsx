import { Check, Code2, MousePointer2 } from "lucide-react";

export function EvidenceNotes() {
  return <div className="evidence-notes"><div><span className="eyebrow">この場で確かめられること</span><h3>動く画面と、設計の理由を公開。</h3><p>三つの自主制作デモで、操作したときの変化と実装の考え方をご確認いただけます。</p></div><ul><li><MousePointer2 size={18} /><span>商品絞り込み・タスク更新・記録追加を実際に操作</span></li><li><Code2 size={18} /><span>詳細に課題・設計判断・確認できる動作を記載</span></li><li><Check size={18} /><span>架空データの自主制作。顧客実績・成果数値とは区別</span></li></ul></div>;
}
