import type { PortfolioMarket, PortfolioProject } from "@/lib/projects";

export function PortfolioMarkets({ items, selected, onChange }: {
  items: PortfolioProject[]; selected: PortfolioMarket; onChange: (market: PortfolioMarket) => void;
}) {
  return <div className="portfolio-markets mb-8">
    <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-2 rounded-[20px] border border-solid border-[#789abb4d] bg-[#0c1930cc] p-2" role="group" aria-label={selected === "global" ? "Project market" : "制作実績の対象市場"}>
      {([{ id: "japan", label: "日本向け", caption: "Japan" }, { id: "global", label: "グローバル向け", caption: "Global" }] as const).map(market => {
        const count = items.filter(item => item.market === market.id).length;
        return <button type="button" key={market.id} data-market={market.id} aria-pressed={selected === market.id} onClick={() => onChange(market.id)}
          className="market-button flex min-h-20 items-center justify-between gap-2 rounded-[14px] border border-solid border-transparent bg-transparent px-5 py-3 text-left font-heading text-[#aec6e0] shadow-none transition-colors hover:bg-[#223d574d] aria-pressed:border-[#87caed70] aria-pressed:bg-[linear-gradient(125deg,#1e4564,#233956)] aria-pressed:text-[#eef8ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a9ddff] motion-reduce:transition-none max-[480px]:px-3">
          <span><span className="mb-1 block text-[10px] tracking-[.12em] text-[#95b5d3]">{market.caption}</span><strong className="block text-[clamp(13px,1.7vw,18px)] font-bold">{selected === "global" ? (market.id === "japan" ? "Japanese market" : "Global market") : market.label}</strong></span><span className="grid size-7 shrink-0 place-items-center rounded-full border border-solid border-[#94bfdf40] bg-[#bedaff0a] text-xs font-semibold">{count}</span>
        </button>;
      })}
    </div>
    {selected === "global" && <p className="market-period mt-4 text-center font-heading text-sm leading-relaxed text-[#bdd4eb]">Global development work <span className="mx-2 text-[#7394b2]">/</span><span className="whitespace-nowrap">2019–2024</span></p>}
  </div>;
}
