import { portfolioFields, type PortfolioField } from "@/lib/portfolio-fields";
import type { PortfolioProject } from "@/lib/projects";
import { PortfolioFilterButton } from "./portfolio-filter-button";
import { Shapes } from "lucide-react";
export function PortfolioFields({ items, selected, english, onChange }: { items: PortfolioProject[]; selected: PortfolioField | "all"; english: boolean; onChange: (field: PortfolioField | "all") => void }) {
  const options = [{ id: "all" as const, ja: "すべての業種", en: "All industries" }, ...portfolioFields.filter(field => items.some(item => item.field === field.id))];
  return <div className="portfolio-fields portfolio-filter-row"><h3><Shapes size={18} aria-hidden="true" />{english ? "Industry" : "業種"}</h3><div className="portfolio-filter-options" role="group" aria-label={english ? "Project fields" : "制作実績の分野"}>
    {options.map(field => { const count = items.filter(item => field.id === "all" || item.field === field.id).length; const label = english ? field.en : field.ja;
      return <PortfolioFilterButton key={field.id} selected={selected === field.id} count={count} data-field={field.id} aria-label={english ? label + ", " + count + " projects" : label + "、" + count + "件"} onClick={() => onChange(field.id)}>{label}</PortfolioFilterButton>;
    })}</div></div>;
}
