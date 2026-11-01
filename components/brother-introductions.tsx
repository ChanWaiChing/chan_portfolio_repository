import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

const brothers = [
  {
    name: "兄", role: "設計・開発", number: "01", portraitLeft: "-180%", portraitTop: "-40%", portraitWidth: "550%",
    edge: "#79dfff", glow: "#71b7df22", accent: "#9be7ff", line: "#69c9ed59", tint: "#63d5ff12", surface: "linear-gradient(145deg,#19364d,#112338 70%,#102035)", ring: "border-dashed",
    ctaTop: "#9be7ff", ctaBottom: "#67c4f0", ctaInk: "#07243a",
    texture: "bg-[linear-gradient(#8edcff12_1px,transparent_1px),linear-gradient(90deg,#8edcff12_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_72%)]",
    title: "課題を整理し、仕組みにする",
    description: "ご相談の背景を整理し、使う人と運用する人に合う仕組みを設計します。開発から公開後の改善まで、技術で制作を支えます。",
    tags: ["要件整理", "システム設計", "開発・改善"], href: "#packages", action: "パッケージを見る",
  },
  {
    name: "弟", role: "デザイン", number: "02", portraitLeft: "-320%", portraitTop: "-50%", portraitWidth: "650%",
    edge: "#bc9cff", glow: "#aea4db24", accent: "#d6c1ff", line: "#b49ae059", tint: "#b28cff14", surface: "linear-gradient(145deg,#252d49,#1b253e 70%,#151f34)", ring: "border-solid",
    ctaTop: "#dfceff", ctaBottom: "#bda1f2", ctaInk: "#251343",
    texture: "bg-[radial-gradient(ellipse_at_100%_0%,#a395d51c,transparent_55%),radial-gradient(ellipse_at_15%_100%,#c4c6e512,transparent_65%)]",
    title: "想いを、伝わるデザインに",
    description: "伝えたい想いを、わかりやすく心地よいデザインへ。情報と画面を整え、兄と連携しながら実装につなげます。",
    tags: ["情報設計", "ウェブデザイン", "画面・体験設計"], href: "#works", action: "ポートフォリオを見る",
  },
];

export function BrotherIntroductions() {
  return <>
    <div className="brother-profiles grid grid-cols-2 gap-6 max-[760px]:grid-cols-1 max-[760px]:gap-[18px]">
      {brothers.map(brother => <article
        key={brother.name}
        style={{ '--profile-turn': brother.number === '01' ? '-.9deg' : '.9deg', '--profile-edge': brother.edge, '--profile-glow': brother.glow, '--profile-accent': brother.accent, '--profile-line': brother.line, '--profile-tint': brother.tint, '--profile-surface': brother.surface, '--profile-cta-top': brother.ctaTop, '--profile-cta-bottom': brother.ctaBottom, '--profile-cta-ink': brother.ctaInk } as CSSProperties}
        className="brother-profile-card group relative flex flex-col rounded-3xl border border-solid border-transparent [background:var(--profile-surface)_padding-box,linear-gradient(135deg,#8aaec680,#344b6655_55%,#647f9d66)_border-box] p-7 text-[#e7efff] max-[760px]:p-[22px]">
        <div aria-hidden="true" className={'brother-profile-texture pointer-events-none absolute inset-0 rounded-[inherit] opacity-30 '+brother.texture} />
        <div className="brother-profile-top mb-7 flex items-center justify-between gap-4">
          <div>
            <span className="brother-role inline-flex items-center gap-2 font-heading text-xs leading-[1.6] font-medium tracking-[.08em] text-[var(--profile-accent)]"><span>{brother.number}</span><span aria-hidden="true" className="opacity-50">/</span>{brother.role}</span>
            <h3 className="mt-3 font-heading text-[56px] leading-[1.2] font-semibold max-[360px]:text-[48px]">{brother.name}</h3>
          </div>
          <div className={'brother-portrait-shell relative size-[132px] shrink-0 rounded-full before:pointer-events-none before:absolute before:-inset-8 before:-z-10 before:rounded-full before:bg-[radial-gradient(circle,var(--profile-glow),transparent_70%)] border border-[var(--profile-line)] p-1.5 max-[760px]:size-[116px] max-[360px]:size-[100px] '+brother.ring}>
            <span className="brother-portrait-orbit pointer-events-none absolute rounded-full" aria-hidden="true" />
            <div className="brother-profile-photo relative size-full overflow-hidden rounded-full border border-solid border-[var(--profile-edge)] bg-[#14213b] shadow-[0_0_12px_var(--profile-glow)]">
              <Image src="/images/heroes/team-introduction-v2.webp" alt={brother.name+'のポートレート'} width={1536} height={1024} unoptimized className="absolute h-auto max-w-none" style={{ left: brother.portraitLeft, top: brother.portraitTop, width: brother.portraitWidth }} />
            </div>
          </div>
        </div>
        <h4 className="mt-1 mb-5 font-heading text-[clamp(23.5px,2.36vw,29.5px)] leading-[1.55] font-extrabold text-[#f1f6ff]">{brother.title}</h4>
        <p className="flex-1 text-base leading-[1.95] text-[#dbe6f6]">{brother.description}</p>
        <ul className="my-6 flex list-none flex-wrap gap-1.5 p-0" aria-label={brother.name+'の担当領域'}>{brother.tags.map(tag => <li className="rounded-full border border-solid border-[var(--profile-line)] bg-[var(--profile-tint)] px-2.5 py-1 font-heading text-xs leading-[1.7] text-[var(--profile-accent)]" key={tag}>{tag}</li>)}</ul>
        <a className="profile-cta group/cta relative mt-auto flex min-h-14 items-center justify-between gap-3 overflow-hidden rounded-xl border border-solid border-[#ffffff50] bg-[linear-gradient(135deg,var(--profile-cta-top),var(--profile-cta-bottom))] py-2.5 pr-3 pl-4 font-heading text-[15px] font-extrabold text-[var(--profile-cta-ink)] shadow-[0_3px_0_#02081750,0_6px_20px_var(--profile-glow)] transition-[filter,box-shadow] duration-200 after:pointer-events-none after:absolute after:right-4 after:bottom-1.5 after:left-4 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--profile-cta-ink)] after:transition-transform after:duration-300 after:content-[''] hover:brightness-110 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--profile-accent)] focus-visible:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none" href={brother.href}>
          <span>{brother.action}</span>
          <span className="profile-cta-arrow grid size-9 shrink-0 place-items-center rounded-full border border-solid border-[#ffffff70] bg-[#ffffff33] transition-[background,color] duration-300 group-hover/cta:bg-[var(--profile-cta-ink)] group-hover/cta:text-[var(--profile-cta-top)] group-focus-visible/cta:bg-[var(--profile-cta-ink)] group-focus-visible/cta:text-[var(--profile-cta-top)] motion-reduce:transition-none" aria-hidden="true"><ArrowUpRight className="transition-transform duration-300 motion-safe:group-hover/cta:translate-x-0.5 motion-safe:group-hover/cta:-translate-y-0.5 motion-safe:group-focus-visible/cta:translate-x-0.5 motion-safe:group-focus-visible/cta:-translate-y-0.5 motion-reduce:transition-none" size={18} /></span>
        </a>
      </article>)}
    </div>
    <div className="brother-collaboration mx-auto mt-6 flex max-w-[620px] flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-solid border-[#98b6da26] bg-[#0c1730b3] px-5 py-3 text-center font-heading text-sm">
      <span className="font-semibold text-[#9be7ff]">兄の技術</span><span aria-hidden="true" className="text-[#aab9d5]">×</span><span className="font-semibold text-[#d6c1ff]">弟の表現</span>
      <span className="text-xs text-[#bfcee5]">仕組みと伝わり方を、一緒に設計する</span>
    </div>
  </>;
}
