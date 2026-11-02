import { portfolioFields, type PortfolioField } from "@/lib/portfolio-fields";
import type { PortfolioProject } from "@/lib/projects";
import { PortfolioFilterButton } from "./portfolio-filter-button";
import { Shapes } from "lucide-react";
import { localizeField } from "@/lib/localization";
import type { SiteLanguage } from "./site-language";
export function PortfolioFields({ items, selected, english, language = english ? "en" : "ja", onChange }: { items: PortfolioProject[]; selected: PortfolioField | "all"; english: boolean; language?: SiteLanguage; onChange: (field: PortfolioField | "all") => void }) {
  const options = [{ id: "all" as const, ja: "すべての業種", en: "All industries" }, ...portfolioFields.filter(field => items.some(item => item.field === field.id))];
  const industry = language === "ja" ? "業種" : language === "en" ? "Industry" : language === "zh-CN" ? "行业" : "行業";
  return <div className="portfolio-fields portfolio-filter-row"><h3><Shapes size={18} aria-hidden="true" />{industry}</h3><div className="portfolio-filter-options" role="group" aria-label={industry}>
    {options.map(field => { const count = items.filter(item => field.id === "all" || item.field === field.id).length; const label = language === "ja" ? (english ? field.en : field.ja) : field.id === "all" ? (language === "en" ? field.en : language === "zh-CN" ? "所有行业" : "所有行業") : localizeField(field.ja, language);
      const countLabel = language === "ja" ? `${count}件` : language === "en" ? `${count} projects` : `${count}个项目`;
      return <PortfolioFilterButton key={field.id} selected={selected === field.id} count={count} data-field={field.id} aria-label={`${label}, ${countLabel}`} onClick={() => onChange(field.id)}>{label}</PortfolioFilterButton>;
    })}</div></div>;
}
