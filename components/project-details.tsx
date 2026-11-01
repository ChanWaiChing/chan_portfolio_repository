import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/projects";
import { TechnologyTags } from "./technology-tags";
import { fieldLabel } from "@/lib/portfolio-fields";

export function ProjectDetails({ item }: { item: PortfolioProject }) {
  const english = item.market === "global";
  return <div className="project-details" lang={english ? "en" : "ja"}>
    <div className="project-thumbnail project-preview"><Image src={item.thumbnail} alt={item.thumbnailAlt || (english ? `${item.title} website preview` : `${item.title}のサイト画面`)} fill sizes="(max-width: 700px) 90vw, 700px" style={{ objectFit: "contain" }} /></div>
    <dl className="my-6 grid gap-6 [&_dt]:mb-2 [&_dt]:font-heading [&_dt]:text-sm [&_dt]:font-bold [&_dt]:text-[#38678b] [&_dd]:m-0 [&_dd]:text-base [&_dd]:leading-[1.9] [&_dd]:text-[#344e66]">
      <div><dt>{english ? "Field" : "分野"}</dt><dd>{fieldLabel(item.field, english)}</dd></div>
      <div><dt>{item.periodLabel || "制作期間"}</dt><dd>{item.period}</dd></div>
      <div><dt>{english ? "Overview" : "概要"}</dt><dd>{item.description}</dd></div>
      <div><dt>{english ? "My contribution" : "担当範囲"}</dt><dd>{item.scope}</dd></div>
    </dl>
    {item.skills && <TechnologyTags technologies={item.skills} label={english ? "Skills applied" : "担当スキル"} />}
    {(item.technologies.length > 0 || !english) && <TechnologyTags technologies={item.technologies} label={english ? "Technology stack" : undefined} />}
    <a className="catalog-outline-button project-visit" href={item.url} target="_blank" rel="noopener noreferrer">{english ? "Visit website (opens in a new tab)" : item.preview ? "プレビューページを見る（新しいタブ）" : "公開サイトを見る（新しいタブ）"}<ArrowUpRight size={18} /></a>
  </div>;
}
