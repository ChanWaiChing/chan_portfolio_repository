import { ArrowRight, Check, ClipboardCheck, Layers3, MessageCircle, MousePointer2, PenTool, RefreshCw, Rocket } from "lucide-react";
import { BotMascot } from "./bot-mascot";

export function BrandStory() {
  return <div className="brand-story"><div><span className="eyebrow">ふたりの視点を、ひとつのチームに。</span><h3>つくる前から、<br />同じゴールを見ていたい。</h3></div><div><p>デザインを考えるときも、実装を考えるときも、出発点は「誰の、どんな課題を解くか」。大穂兄弟は、技術を担当する兄とデザインを担当する弟のチームです。</p><p>見た目と仕組みを別々に決めず、使う人と運用する人の両方から考えます。小さなチームでも相談しやすい、顔の見える制作パートナーを目指しています。</p><ul><li><Check size={16} />兄：要件・技術・保守性を整理</li><li><Check size={16} />弟：情報・導線・使い心地を設計</li><li><Check size={16} />ふたり：同じ仕様と試作を見ながら確認</li></ul></div></div>;
}

const entrances = [
  { title: "ウェブサイトをつくる", label: "ウェブサイト制作", icon: PenTool, forWhom: "事業やサービスの魅力を、きちんと伝えたい方へ。", deliver: "構成・デザイン・実装・更新方法をまとめて整理します。", category: "ウェブ制作", topic: "ウェブサイト制作", tags: "コーポレートサイト / 紹介ページ / 更新システム" },
  { title: "業務の仕組みをつくる", label: "業務システム開発", icon: Layers3, forWhom: "入力・集計・情報共有の手間を見直したい方へ。", deliver: "業務フローから画面・データ・運用まで設計します。", category: "システム開発", topic: "ウェブ・業務システム開発", tags: "管理画面 / ウェブアプリ / 外部連携" },
  { title: "公開後を、もっとよくする", label: "公開後の改善", icon: RefreshCw, forWhom: "今あるサイトや業務を、小さく改善したい方へ。", deliver: "課題を絞り、画面改善・人工知能活用・自動化を段階的に検討します。", category: "人工知能・業務改善", topic: "人工知能活用 / 業務改善", tags: "画面改善 / 人工知能活用 / 運用相談" },
];

export function ServiceEntrances({ onConsult, onBrowse }: { onConsult: (topic: string) => void; onBrowse: (category: string) => void }) {
  return <div className="service-entrances">{entrances.map(({ icon: Icon, ...item }, index) => <article className="service-entrance luminous-card" key={item.label}><div className="service-overview"><span className="eyebrow">0{index + 1} / {item.label}</span><span className="service-icon"><Icon size={28} aria-hidden="true" /></span><h3>{item.title}</h3><p className="service-fit">{item.forWhom}</p><p>{item.deliver}</p></div><small>{item.tags}</small><button className="catalog-cta" onClick={() => onConsult(item.topic)}>このサービスを相談する<ArrowRight size={16} /></button><a href="#packages" onClick={() => onBrowse(item.category)}>関連パッケージを見る<ArrowRight size={16} /></a></article>)}</div>;
}

const process = [
  ["相談・整理", "目的、使う人、今の課題を一緒に整理。", "確認するもの", "課題と優先順位 / ご希望の予算・時期"],
  ["範囲・計画の合意", "つくるものと、今回つくらないものを明確に。", "合意するもの", "制作範囲 / 見積もり / 納期 / 運用条件"],
  ["試作・制作", "デザインと実装の両面から、途中の画面を確認。", "確認するもの", "画面構成 / 操作できる試作 / 修正事項"],
  ["公開・引き継ぎ", "使い始める準備と、その先の改善を整理。", "引き継ぐもの", "操作方法 / 更新手順 / 保守の相談事項"],
];
export function WorkingProcess() {
  return <><ol className="working-process">{process.map(([title, text, label, output], index) => { const Icon = [MessageCircle, ClipboardCheck, MousePointer2, Rocket][index]; return <li key={title}><div className="process-step-top"><span>0{index + 1}</span><Icon size={24} aria-hidden="true" /></div><h3>{title}</h3><p>{text}</p><small>{label}</small><strong>{output}</strong></li>; })}</ol><div className="collaboration-note"><BotMascot variant="ocean" /><div><span className="eyebrow">技術ガイドからのご案内</span><h3>認識をそろえるために、途中も共有。</h3><p>兄が実現性と保守性、弟が情報の伝わり方と使いやすさを確認します。ご要望が変わった場合は、費用・納期への影響を整理してから進めます。保守や機能追加は、制作費とは別に範囲を相談します。</p></div></div></>;
}

export function ContactExpectations() {
  return <div className="contact-expectations"><h4>ご連絡のあとに確認すること</h4><ol><li>ご相談内容と、ご希望の進め方</li><li>必要に応じたヒアリング・資料の確認</li><li>対応範囲・見積もり・スケジュールのご提案</li></ol><p>フォームの送信だけで契約が成立することはありません。決まっていない項目は、相談しながら整理できます。</p></div>;
}
