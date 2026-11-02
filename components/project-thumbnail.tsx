import { useSiteLanguage } from "./site-language";
import Image from "next/image";
import type { PortfolioProject } from "@/lib/projects";

export function ProjectThumbnail({ item, large = false }: { item: PortfolioProject; large?: boolean }) {
  const { language } = useSiteLanguage();
  const english = language === "en";
  const scale = large ? 1 : item.thumbnailScale || 1;
  const preview = language === "ja" ? "サイト画面" : language === "en" ? "website preview" : language === "zh-CN" ? "网站预览" : "網站預覽";
  const unavailable = language === "ja" ? "サイト画像は未提供です" : language === "en" ? "website screenshot unavailable" : language === "zh-CN" ? "暂未提供网站图片" : "暫未提供網站圖片";
  const concept = language === "ja" ? "コンセプト画像。実際のクライアント画面ではありません" : language === "en" ? "concept preview, not an actual client screen" : language === "zh-CN" ? "概念预览，并非实际客户界面" : "概念預覽，並非實際客戶介面";
  return <div className={`project-thumbnail${large ? " project-preview" : ""}`}>
    {item.thumbnail ? <Image
      src={item.thumbnail}
      alt={`${item.title} — ${item.thumbnailKind === "concept" ? concept : preview}`}
      fill
      sizes={large ? "(max-width: 700px) 90vw, 700px" : `(max-width: 600px) ${Math.round(100 * scale)}vw, (max-width: 999px) ${Math.round(50 * scale)}vw, ${Math.round(33 * scale)}vw`}
      style={{ objectFit: large ? "contain" : "cover", scale, transformOrigin: large ? "center" : item.thumbnailOrigin || "center top" }}
    /> : <div className={`project-thumbnail-placeholder${english ? " is-global" : ""}`} role="img" aria-label={`${item.title} — ${unavailable}`}>
      <span>{language === "ja" ? "制作実績" : language === "en" ? "PORTFOLIO PROJECT" : language === "zh-CN" ? "项目案例" : "項目案例"}</span>
      <strong>{item.shortTitle || item.title}</strong>
      <small>{item.period}</small>
    </div>}
    {item.thumbnailKind === "concept" && <span className="pointer-events-none absolute right-2 bottom-2 rounded-full border border-solid border-[#b4c9e080] bg-[#102139e8] px-2.5 py-1 font-heading text-[10px] leading-tight font-semibold text-[#e5f3ff] shadow-sm">{language === "ja" ? "コンセプト画像" : language === "en" ? "Concept preview" : language === "zh-CN" ? "概念预览" : "概念預覽"}</span>}
  </div>;
}
