import { portfolioFields, type PortfolioField } from "@/lib/portfolio-fields";
import type { PortfolioProject } from "@/lib/projects";

export function PortfolioFields({ items, selected, english, onChange }: {
  items: PortfolioProject[]; selected: PortfolioField | "all"; english: boolean;
  onChange: (field: PortfolioField | "all") => void;
}) {
  const options = [{ id: "all" as const, ja: "すべての分野", en: "All fields" }, ...portfolioFields.filter(field => items.some(item => item.field === field.id))];
  return <div className="portfolio-fields mb-7 rounded-[20px] border border-solid border-[#8ab5d530] bg-[#122238a6] px-5 py-4 max-[480px]:px-3">
    <h3 className="m-0 mb-3 font-heading text-xs font-bold tracking-wide text-[#bcd8ed]">{english ? "Browse by field" : "分野から探す"}</h3>
    <div className="flex flex-wrap gap-2" role="group" aria-label={english ? "Project fields" : "制作実績の分野"}>
      {options.map(field => {
        const count = items.filter(item => field.id === "all" || item.field === field.id).length;
        const label = english ? field.en : field.ja;
        return <button key={field.id} type="button" data-field={field.id} aria-pressed={selected === field.id} aria-label={english ? `${label}, ${count} projects` : `${label}、${count}件`} onClick={() => onChange(field.id)}
          className="flex min-h-11 items-center gap-2 rounded-full border border-solid border-[#9abed540] bg-[#1c3148] px-3 py-2 font-heading text-xs font-medium text-[#bdd2e5] shadow-none transition-colors hover:border-[#b7d7ec] hover:bg-[#294b65] aria-pressed:border-[#b3d9f0] aria-pressed:bg-[#c5e7fb] aria-pressed:text-[#113650] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b3d9f0] motion-reduce:transition-none">
          {label}<span className="text-[10px] opacity-70" aria-hidden="true">{count}</span>
        </button>;
      })}
    </div>
  </div>;
}
