type TechnologyTagsProps = { technologies: string[]; packageOffer?: boolean; label?: string };

/** Keep unavailable project stacks distinct from package stacks chosen per brief. */
export function TechnologyTags({ technologies, packageOffer = false, label: customLabel }: TechnologyTagsProps) {
  const label = customLabel || (packageOffer ? '技術・ツール' : '使用技術');
  return <div className="card-technologies mb-4 text-left">
    <span className="mb-1.5 block font-heading text-[11px] leading-relaxed font-semibold tracking-wide text-[#526a80]">{label}</span>
    {technologies.length ? <ul className="m-0 flex list-none flex-wrap gap-1.5 border-0 p-0" aria-label={label}>
      {technologies.map(technology => <li key={technology} className="m-0 rounded-md border border-solid border-[#abc8df80] bg-[#eaf3fb] px-2 py-0.5 font-heading text-xs leading-[1.6] font-medium text-[#285678]">{technology}</li>)}
    </ul> : <span className="block font-heading text-xs leading-[1.7] text-[#526a80]">{packageOffer ? '要件に応じて選定' : '未掲載'}</span>}
  </div>;
}
