import { ArrowUpRight, Code2, PenTool } from "lucide-react";
import { BotMascot } from "./bot-mascot";

const brothers = [
  {
    id: "engineer", role: "設計・開発", order: "兄・設計開発担当", icon: Code2,
    specialty: "技術相談・システム全体の設計開発", title: ["考える、つなぐ、", "つくる。"],
    bot: "ocean" as const, narrator: "技術ガイド「アオ」から、兄をご紹介！", years: "11",
    introduction: "兄は、課題の整理と技術選定から開発・運用までを担当。事業の目的と、無理なく使い続けられる仕組みをつなぎます。",
    tags: ["要件定義", "設計・開発", "運用改善"], href: "#services", action: "対応できることを見る",
    alt: "男性と青いロボットがホワイトボードで設計を検討する制作イメージ",
  },
  {
    id: "designer", role: "デザイン", order: "弟・デザイン担当", icon: PenTool,
    specialty: "ウェブデザイン・使いやすさの設計", title: ["想いを、伝わる", "デザインに。"],
    bot: "sunset" as const, narrator: "デザインガイド「イロ」から、弟をご紹介！", years: "3",
    introduction: "弟は、情報の整理と画面のデザインを担当。ブランドの想いを、迷わず使える導線と心地よい見た目に整えます。",
    tags: ["画面・体験設計", "ウェブデザイン", "フィグマ"], href: "#works", action: "制作イメージを見る",
    alt: "男性とオレンジのロボットがノートパソコンでデザインを確認する制作イメージ",
  },
];

export function BrotherIntroductions() {
  return <div className="brother-introductions">{brothers.map(({ icon: Icon, ...brother }) => <article className={`brother-intro-panel intro-${brother.id}`} key={brother.id} aria-labelledby={`intro-${brother.id}-title`}>
    <div className="brother-intro-visual">
      <BotMascot variant={brother.bot} className="profile-brand-bot" /><p className="profile-image-note">紹介役のブランドキャラクターです。<br />スタッフ本人の肖像ではありません。</p>
      <div className="brother-visual-label"><span>ご紹介： {brother.id === "engineer" ? "設計開発担当" : "デザイン担当"}</span><strong>{brother.id === "engineer" ? "考える兄。" : "描く弟。"}</strong></div>
    </div>
    <div className="brother-intro-content">
      <div className="brother-intro-meta"><span><Icon size={18} />{brother.role}</span><small>{brother.order}</small></div>
      <p className="brother-intro-specialty">{brother.specialty}</p>
      <h3 id={`intro-${brother.id}-title`}>{brother.title[0]}<br />{brother.title[1]}</h3>
      <div className="bot-narration"><div className="bot-speech"><span>{brother.narrator}</span><p>{brother.introduction}</p></div></div>
      <ul className="brother-intro-tags" aria-label="得意分野">{brother.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="brother-intro-bottom"><div className="brother-intro-experience"><strong>{brother.years}</strong><span>年の実務経験</span></div><a href={brother.href}>{brother.action}<ArrowUpRight size={17} /></a></div>
    </div>
  </article>)}</div>;
}
