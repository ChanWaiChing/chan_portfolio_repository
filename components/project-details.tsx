import Image from "next/image";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import type { PortfolioProject } from "@/lib/projects";
import { TechnologyTags } from "./technology-tags";
import { fieldLabel } from "@/lib/portfolio-fields";

export function ProjectDetails({ item }: { item: PortfolioProject }) {
  const english = item.market === "global";
  return <div className="project-details" lang={english ? "en" : "ja"}>
    <div className="project-thumbnail project-preview"><Image src={item.thumbnail} alt={item.thumbnailAlt || (english ? `${item.title} website preview` : `${item.title}のサイト画面`)} fill sizes="(max-width: 700px) 90vw, 700px" style={{ objectFit: "contain" }} /></div>
    {item.confidential && <p className="nda-notice flex items-start gap-3 rounded-xl border border-solid border-[#8faec540] bg-[#e6eff6] p-4 font-heading text-sm leading-relaxed text-[#34536d]"><LockKeyhole className="mt-0.5 shrink-0" size={18} aria-hidden="true" /><span>{english ? "Client identities, actual screens, data and project links are withheld under NDA. This is a public conceptual illustration, not the actual system architecture." : "守秘義務により、クライアント名・実画面・実データ・外部リンクは非公開です。画像は公開用の概念図で、実際のシステム構成を示すものではありません。"}</span></p>}
    <dl className="my-6 grid gap-6 [&_dt]:mb-2 [&_dt]:font-heading [&_dt]:text-sm [&_dt]:font-bold [&_dt]:text-[#38678b] [&_dd]:m-0 [&_dd]:text-base [&_dd]:leading-[1.9] [&_dd]:text-[#344e66]">
      <div><dt>{english ? "Field" : "分野"}</dt><dd>{fieldLabel(item.field, english)}</dd></div>
      <div><dt>{item.periodLabel || "制作期間"}</dt><dd>{item.period}</dd></div>
      <div><dt>{english ? "Overview" : "概要"}</dt><dd>{item.description}</dd></div>
      <div><dt>{english ? "My contribution" : "担当範囲"}</dt><dd>{item.scope}</dd></div>
    </dl>
    {item.highlights && <div className="nda-highlights mb-6 grid gap-4 sm:grid-cols-2">{item.highlights.map(highlight => <section className="rounded-xl border border-solid border-[#aac0d147] bg-[#f0f5fa] p-4" key={highlight.title}><h3 className="m-0 mb-2 font-heading text-base font-bold text-[#244b69]">{highlight.title}</h3><p className="m-0 text-sm leading-[1.9] text-[#405970]">{highlight.text}</p></section>)}</div>}
    {item.skills && <TechnologyTags technologies={item.skills} label={english ? "Skills applied" : "担当スキル"} />}
    {(item.technologies.length > 0 || !english) && <TechnologyTags technologies={item.technologies} label={english ? "Technology stack" : undefined} />}
    {item.url && !item.confidential && <a className="catalog-outline-button project-visit" href={item.url} target="_blank" rel="noopener noreferrer">{english ? "Visit website (opens in a new tab)" : item.preview ? "プレビューページを見る（新しいタブ）" : "公開サイトを見る（新しいタブ）"}<ArrowUpRight size={18} /></a>}
  </div>;
}
