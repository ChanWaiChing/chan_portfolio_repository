import { categories } from "@/lib/catalog";
import { englishCategory } from "@/lib/portfolio-language";
import { PortfolioFilterButton } from "./portfolio-filter-button";
import { localizeCategory } from "@/lib/localization";
import type { SiteLanguage } from "./site-language";
export function CategoryFilters({ items, selected, onChange, label, options = categories, english = false, language = english ? "en" : "ja", compact = false }: { items: { category: string }[]; selected: string; onChange: (category: string) => void; label: string; options?: readonly string[]; english?: boolean; language?: SiteLanguage; compact?: boolean }) {
  return <div className="catalog-filters" role="group" aria-label={label}>{options.map(category => {
    const count = category === "すべて" ? items.length : items.filter(item => item.category === category).length;
    const name = language === "ja" ? (english ? englishCategory(category) : category) : localizeCategory(category, language);
    const countLabel = language === "ja" ? `${count}件` : language === "en" ? `${count} projects` : language === "zh-CN" ? `${count}个项目` : `${count}個項目`;
    if (compact) return <PortfolioFilterButton key={category} selected={selected === category} count={count} data-category={category} data-count={count} aria-label={`${name}, ${countLabel}`} onClick={() => onChange(category)}>{name}</PortfolioFilterButton>;
    return <button type="button" key={category} data-category={category} data-count={count} aria-label={`${name}, ${countLabel}`} aria-pressed={selected === category} onClick={() => onChange(category)}><span>{name}</span><span className="category-count" aria-hidden="true">{count}</span></button>;
  })}</div>;
}
