import { categories } from "@/lib/catalog";

export function CategoryFilters({ items, selected, onChange, label }: { items: { category: string }[]; selected: string; onChange: (category: string) => void; label: string }) {
  return <div className="catalog-filters" role="group" aria-label={label}>{categories.map(category => {
    const count = category === "すべて" ? items.length : items.filter(item => item.category === category).length;
    return <button type="button" key={category} data-category={category} data-count={count} aria-label={`${category}、${count}件`} aria-pressed={selected === category} onClick={() => onChange(category)}><span>{category}</span><span className="category-count" aria-hidden="true">{count}</span></button>;
  })}</div>;
}
