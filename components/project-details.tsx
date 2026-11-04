import { ArrowUpRight, LockKeyhole } from "lucide-react";
import type { PortfolioProject } from "@/lib/projects";
import { TechnologyTags } from "./technology-tags";
import { ProjectStack } from "./project-stack";
import { ProjectCopyStatus } from "./project-copy-status";
import { ProjectThumbnail } from "./project-thumbnail";
import Image from "next/image";
import { fieldLabel } from "@/lib/portfolio-fields";
import { useSiteLanguage } from "./site-language";
import { localizeField } from "@/lib/localization";

export function ProjectDetails({ item }: { item: PortfolioProject }) {
  const { language } = useSiteLanguage();
  const english = item.market === "global";
  const labels = language === "ja" ? { field: "分野", period: "制作期間", overview: "概要", scope: "担当範囲", skills: "担当スキル", stack: "使用技術", unspecified: "未掲載", visit: item.preview ? "プレビューページを見る（新しいタブ）" : "公開サイトを見る（新しいタブ）", nda: "守秘義務により、顧客名・実際の画面・実データ・外部リンクは非公開です。掲載画像は説明用の代表例であり、実際の画面やシステム構成を示すものではありません。", representative: "掲載用の代表画像（実際の画面ではありません）" }
    : language === "en" ? { field: "Field", period: "Project period", overview: "Overview", scope: "My contribution", skills: "Skills applied", stack: "Technology stack", unspecified: "Not specified in supplied notes", visit: "Visit website (opens in a new tab)", nda: "Client identities, actual screens, data and project links are withheld under NDA. These representative images are for illustration and do not show the actual screens or system architecture.", representative: "Representative image (not an actual screen)" }
      : language === "zh-CN" ? { field: "领域", period: "项目周期", overview: "项目简介", scope: "负责范围", skills: "应用技能", stack: "技术栈", unspecified: "提供的资料中未注明", visit: "访问网站（在新标签页打开）", nda: "根据保密约定，客户身份、实际画面、数据及项目链接不予公开。所示图片仅为说明用的代表示例，并非实际画面或系统架构。", representative: "展示用代表图片（非实际画面）" }
        : { field: "領域", period: "項目週期", overview: "項目簡介", scope: "負責範圍", skills: "應用技能", stack: "技術組合", unspecified: "提供嘅資料未有註明", visit: "瀏覽網站（於新分頁開啟）", nda: "根據保密協議，客戶身份、實際畫面、資料及項目連結不會公開。所示圖片只作說明用途，並非實際畫面或系統架構。", representative: "展示用代表圖片（並非實際畫面）" };
  return <div className="project-details" lang={language}>
    {item.gallery?.length ? <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">{item.gallery.map((image, index) => <figure className="m-0 overflow-hidden rounded-xl border border-solid border-[#aac0d147] bg-[#f0f5fa] p-2" key={image.src}>
      <Image src={image.src} alt={image.alt} width={1365} height={768} className="h-auto w-full rounded-lg" />
      <figcaption className="px-2 pt-2 font-heading text-xs leading-relaxed text-[#526a80]">{labels.representative} · {index + 1}</figcaption>
    </figure>)}</div> : <ProjectThumbnail item={item} large />}
    {item.copyStatus === "draft" && <ProjectCopyStatus />}
    {item.confidential && <p className="nda-notice flex items-start gap-3 rounded-xl border border-solid border-[#8faec540] bg-[#e6eff6] p-4 font-heading text-sm leading-relaxed text-[#34536d]"><LockKeyhole className="mt-0.5 shrink-0" size={18} aria-hidden="true" /><span>{labels.nda}</span></p>}
    <dl className="my-6 grid gap-6 [&_dt]:mb-2 [&_dt]:font-heading [&_dt]:text-sm [&_dt]:font-bold [&_dt]:text-[#38678b] [&_dd]:m-0 [&_dd]:text-base [&_dd]:leading-[1.9] [&_dd]:text-[#344e66]">
      <div><dt>{labels.field}</dt><dd>{localizeField(fieldLabel(item.field), language)}</dd></div>
      <div><dt>{item.periodLabel || labels.period}</dt><dd>{item.period}</dd></div>
      <div><dt>{labels.overview}</dt><dd>{item.description}</dd></div>
      <div><dt>{labels.scope}</dt><dd>{item.scope}</dd></div>
    </dl>
    {item.highlights && <div className="nda-highlights mb-6 grid gap-4 sm:grid-cols-2">{item.highlights.map(highlight => <section className="rounded-xl border border-solid border-[#aac0d147] bg-[#f0f5fa] p-4" key={highlight.title}><h3 className="m-0 mb-2 font-heading text-base font-bold text-[#244b69]">{highlight.title}</h3><p className="m-0 text-sm leading-[1.9] text-[#405970]">{highlight.text}</p></section>)}</div>}
    {item.skills && <TechnologyTags technologies={item.skills} label={labels.skills} emptyLabel={labels.unspecified} />}
    {item.category === "システム開発" ? <ProjectStack item={item} /> : (item.technologies.length > 0 || !english || item.periodLabel === "Project period and location" || item.periodLabel === "Project period") && <TechnologyTags technologies={item.technologies} label={labels.stack} emptyLabel={labels.unspecified} />}
    {item.url && !item.confidential && <a className="catalog-outline-button project-visit" href={item.url} target="_blank" rel="noopener noreferrer">{labels.visit}<ArrowUpRight size={18} /></a>}
  </div>;
}
