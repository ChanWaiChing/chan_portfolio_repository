import type { PortfolioMarket, PortfolioProject } from "@/lib/projects";
import { PortfolioFilterButton } from "./portfolio-filter-button";
import { useSiteLanguage } from "./site-language";
import { localizeMarket } from "@/lib/localization";
export function PortfolioMarkets({ items, selected, onChange }: { items: PortfolioProject[]; selected: PortfolioMarket; onChange: (market: PortfolioMarket) => void }) {
  const { language } = useSiteLanguage();
  const label = language === "ja" ? "制作実績の対象市場" : language === "en" ? "Project market" : language === "zh-CN" ? "项目地区" : "項目地區";
  return <div className="portfolio-markets"><div className="portfolio-market-switch" data-selected={selected} role="group" aria-label={label}>
    {(["japan", "global"] as const).map(market => <PortfolioFilterButton key={market} data-market={market} selected={selected === market} count={items.filter(item => item.market === market).length} onClick={() => onChange(market)}>{localizeMarket(market, language)}</PortfolioFilterButton>)}
  </div></div>;
}
