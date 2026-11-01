import { categories } from "@/lib/catalog";
import { englishCategory } from "@/lib/portfolio-language";

export function CategoryFilters({ items, selected, onChange, label, options = categories, english = false }: { items: { category: string }[]; selected: string; onChange: (category: string) => void; label: string; options?: readonly string[]; english?: boolean }) {
  return <div className="catalog-filters" role="group" aria-label={label}>{options.map(category => {
    const count = category === "すべて" ? items.length : items.filter(item => item.category === category).length;
    const name = english ? englishCategory(category) : category;
    return <button type="button" key={category} data-category={category} data-count={count} aria-label={english ? `${name}, ${count} projects` : `${category}、${count}件`} aria-pressed={selected === category} onClick={() => onChange(category)}><span>{name}</span><span className="category-count" aria-hidden="true">{count}</span></button>;
  })}</div>;
}
