import { useSiteLanguage } from "./site-language";

export function ProjectCopyStatus({ compact = false }: { compact?: boolean }) {
  const { language } = useSiteLanguage();
  const copy = {
    ja: { badge: "仮の紹介文", notice: "概要と担当範囲は紹介文のサンプルです。実際の担当内容を確認したうえで確定します。" },
    en: { badge: "Draft copy", notice: "The overview and contribution are sample editorial copy. Actual responsibilities must be confirmed before these descriptions are finalized." },
    "zh-CN": { badge: "介绍文案草稿", notice: "项目简介与负责范围为示例文案，需确认实际负责内容后再定稿。" },
    "zh-HK": { badge: "介紹文案草稿", notice: "項目簡介同負責範圍係示例文案，需要確認實際負責內容後先定稿。" },
  }[language];
  if (compact) return <span data-copy-status="draft" className="portfolio-copy-badge">{copy.badge}</span>;
  return <p data-copy-status="draft" className="!my-5 rounded-xl border border-solid border-[#bdcce0] bg-[#edf3fb] px-4 py-3 !font-heading !text-sm !leading-relaxed text-[#355375]">{copy.notice}</p>;
}
