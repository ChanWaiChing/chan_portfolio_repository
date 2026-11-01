import { Check } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export function PortfolioFilterButton({ selected, count, children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
  selected: boolean; count: number; children: ReactNode;
}) {
  return <button {...props} type="button" aria-pressed={selected} className={`portfolio-filter-button ${className}`}>
    <Check size={15} className="filter-check" aria-hidden="true" style={{ visibility: selected ? "visible" : "hidden" }} />
    <span className="filter-label">{children}</span><span className="filter-count" aria-hidden="true">{count}</span>
  </button>;
}
