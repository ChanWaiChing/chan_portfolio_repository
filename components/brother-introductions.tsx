import Image from "next/image";
import { ArrowUpRight, Code2, PenTool } from "lucide-react";
import { BotMascot } from "./bot-mascot";

const brothers = [
  {
    id: "engineer", role: "ENGINEERING", order: "THE OLDER BROTHER / 兄", icon: Code2,
    specialty: "ITコンサルタント・フルスタックエンジニア", title: ["考える、つなぐ、", "つくる。"],
    bot: "ocean" as const, narrator: "青ボットから、兄をご紹介！", years: "11",
    introduction: "こちらは、ITコンサルティングと開発を担当する兄。11年の実務経験をもとに、課題の整理から設計・開発・運用まで、事業と技術をつなぎます。",
    tags: ["要件定義", "設計・開発", "運用改善"], href: "#services", action: "対応できることを見る",
    alt: "男性と青いロボットがホワイトボードで設計を検討する制作イメージ",
  },
  {
    id: "designer", role: "DESIGN", order: "THE YOUNGER BROTHER / 弟", icon: PenTool,
    specialty: "デザイナー・UI / UXデザイン", title: ["想いを、伝わる", "デザインに。"],
    bot: "sunset" as const, narrator: "オレンジボットから、弟をご紹介！", years: "3",
    introduction: "こちらは、デザインを担当する弟。3年の実務経験をもとに、ブランドの想いや使う人の気持ちに寄り添い、わかりやすく心地よい体験を考えます。",
    tags: ["UI / UX", "Webデザイン", "Figma"], href: "#works", action: "制作イメージを見る",
    alt: "男性とオレンジのロボットがMacBookでデザインを確認する制作イメージ",
  },
];

export function BrotherIntroductions() {
  return <div className="brother-introductions">{brothers.map(({ icon: Icon, ...brother }) => <article className={`brother-intro-panel intro-${brother.id}`} key={brother.id} aria-labelledby={`intro-${brother.id}-title`}>
    <div className="brother-intro-visual">
      <Image className={`brother-intro-photo photo-${brother.id}`} src="/images/heroes/brothers-natural.webp" alt={brother.alt} fill sizes="(max-width: 760px) 100vw, 540px" />
      <div className="brother-visual-label"><span>MEET THE {brother.id === "engineer" ? "ENGINEER" : "DESIGNER"}</span><strong>{brother.id === "engineer" ? "考える兄。" : "描く弟。"}</strong></div>
    </div>
    <div className="brother-intro-content">
      <div className="brother-intro-meta"><span><Icon size={18} />{brother.role}</span><small>{brother.order}</small></div>
      <p className="brother-intro-specialty">{brother.specialty}</p>
      <h3 id={`intro-${brother.id}-title`}>{brother.title[0]}<br />{brother.title[1]}</h3>
      <div className="bot-narration"><BotMascot variant={brother.bot} className="narrator-bot" /><div className="bot-speech"><span>{brother.narrator}</span><p>{brother.introduction}</p></div></div>
      <ul className="brother-intro-tags" aria-label="得意分野">{brother.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="brother-intro-bottom"><div className="brother-intro-experience"><strong>{brother.years}</strong><span>YEARS<small>年の実務経験</small></span></div><a href={brother.href}>{brother.action}<ArrowUpRight size={17} /></a></div>
    </div>
  </article>)}</div>;
}
