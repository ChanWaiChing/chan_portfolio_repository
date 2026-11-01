import type { PortfolioMarket, PortfolioProject } from "@/lib/projects";
import { PortfolioFilterButton } from "./portfolio-filter-button";
export function PortfolioMarkets({ items, selected, onChange }: { items: PortfolioProject[]; selected: PortfolioMarket; onChange: (market: PortfolioMarket) => void }) {
  const english = selected === "global";
  return <div className="portfolio-markets"><div className="portfolio-market-switch" role="group" aria-label={english ? "Project market" : "制作実績の対象市場"}>
    {(["japan", "global"] as const).map(market => <PortfolioFilterButton key={market} data-market={market} selected={selected === market} count={items.filter(item => item.market === market).length} onClick={() => onChange(market)}>{english ? (market === "japan" ? "Japan" : "Global") : (market === "japan" ? "日本向け" : "グローバル向け")}</PortfolioFilterButton>)}
  </div>{english && <p className="market-period">Linked projects · 2019–2024<br />NDA case summaries · 2024–2026 (illustrative periods)</p>}</div>;
}
