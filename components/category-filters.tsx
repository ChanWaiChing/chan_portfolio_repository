import { categories } from "@/lib/catalog";

export function CategoryFilters({ items, selected, onChange, label, options = categories }: { items: { category: string }[]; selected: string; onChange: (category: string) => void; label: string; options?: readonly string[] }) {
  return <div className="catalog-filters" role="group" aria-label={label}>{options.map(category => {
    const count = category === "すべて" ? items.length : items.filter(item => item.category === category).length;
    return <button type="button" key={category} data-category={category} data-count={count} aria-label={`${category}、${count}件`} aria-pressed={selected === category} onClick={() => onChange(category)}><span>{category === "人工知能・業務改善" ? "業務改善" : category === "コンサルティング" ? "技術相談" : category}</span><span className="category-count" aria-hidden="true">{count}</span></button>;
  })}</div>;
}
