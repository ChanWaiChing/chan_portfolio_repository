import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="section-label inline-flex items-center gap-3 font-heading text-[clamp(20px,2vw,26px)] leading-[1.5] font-bold tracking-[.08em] text-[#b9e3ff] before:h-5 before:w-[3px] before:rounded-full before:bg-[#99d8ff] before:content-['']">{children}</span>;
}
