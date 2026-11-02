import { useSiteLanguage } from "./site-language";

type TechnologyTagsProps = { technologies: string[]; packageOffer?: boolean; label?: string; emptyLabel?: string; compact?: boolean };

/** Keep unavailable project stacks distinct from package stacks chosen per brief. */
export function TechnologyTags({ technologies, packageOffer = false, label: customLabel, emptyLabel, compact = false }: TechnologyTagsProps) {
  const { language } = useSiteLanguage();
  const label = customLabel || (language === "ja" ? (packageOffer ? "技術・ツール" : "使用技術") : language === "en" ? (packageOffer ? "Tools & technology" : "Technology") : language === "zh-CN" ? "技术与工具" : "技術與工具");
  const empty = emptyLabel || (language === "ja" ? (packageOffer ? "要件に応じて選定" : "未掲載") : language === "en" ? (packageOffer ? "Selected to fit project requirements" : "Not listed") : language === "zh-CN" ? (packageOffer ? "根据需求选择" : "未列出") : (packageOffer ? "按需求選擇" : "未有列出"));
  if (compact && !technologies.length) return null;
  const visible = compact ? technologies.slice(0, 3) : technologies;
  const remaining = technologies.length - visible.length;
  const more = language === "ja" ? `ほか${remaining}件。詳細で確認` : language === "en" ? `${remaining} more; view project for the full list` : language === "zh-CN" ? `另有${remaining}项，请查看详情` : `另有${remaining}項，請查看詳情`;
  return <div className={`card-technologies mb-4 text-left${compact ? " is-compact" : ""}`}>
    {!compact && <span className="mb-1.5 block font-heading text-[11px] leading-relaxed font-semibold tracking-wide text-[#526a80]">{label}</span>}
    {technologies.length ? <ul className="m-0 flex list-none flex-wrap gap-1.5 border-0 p-0" aria-label={label}>
      {visible.map(technology => <li key={technology} className="m-0 rounded-md border border-solid border-[#abc8df80] bg-[#eaf3fb] px-2 py-0.5 font-heading text-xs leading-[1.6] font-medium text-[#285678]">{technology}</li>)}
      {remaining > 0 && <li className="m-0 rounded-md border border-solid border-[#abc8df80] bg-[#eaf3fb] px-2 py-0.5 font-heading text-xs leading-[1.6] font-medium text-[#285678]" aria-label={more}>+{remaining}</li>}
    </ul> : <span className="block font-heading text-xs leading-[1.7] text-[#526a80]">{empty}</span>}
  </div>;
}
