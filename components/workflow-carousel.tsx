"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Globe2, Layers3, Sparkles, X } from "lucide-react";
import { useSiteMotion } from "./use-site-motion";

const workflows = [
  {
    category: "ウェブ制作", icon: Globe2, accent: "#a6d9ff", glow: "#78b8df30",
    title: "想いを整理して、使いやすいウェブサイトへ",
    summary: "企画・デザイン・実装をひとつの流れで",
    steps: [
      ["ヒアリング・要件を整理", "目的や使う人、日々の更新方法を確認し、必要な情報と制作範囲を整理します。"],
      ["フィグマで画面をデザイン", "情報の優先順位や画面の流れを組み立て、見た目と使いやすさを一緒に確認します。"],
      ["高速なサイトを実装", "スマートフォンでの閲覧や表示速度を意識して実装し、公開後の更新につなげます。"],
    ],
    outputs: ["要件・画面構成の整理", "デザインとスマートフォン対応", "公開後の更新方針"],
  },
  {
    category: "システム開発", icon: Layers3, accent: "#d4c5f3", glow: "#aba1d438",
    title: "情報をつなぎ、日々の業務をもっと軽やかに",
    summary: "入力・連携・通知を、なめらかにつなぐ",
    steps: [
      ["フォームにデータを入力", "入力項目とデータの持ち方を整理し、必要な情報を無理なく集められる画面を考えます。"],
      ["外部連携で必要な情報を共有", "利用中のサービスや権限を確認し、データの受け渡しと共有の仕組みを設計します。"],
      ["集計・通知を自動化", "繰り返す集計や通知をつなぎ、例外時の確認方法も含めて運用を整えます。"],
    ],
    outputs: ["入力・共有フローの設計", "外部サービスとの連携", "集計・通知の自動化"],
  },
  {
    category: "AI・業務改善", icon: Sparkles, accent: "#b7dfd4", glow: "#92c4b830",
    title: "AIと人の得意をつなぎ、制作をスムーズに",
    summary: "草案づくりはAIに、判断と確認は人に",
    steps: [
      ["キーワード・資料を追加", "目的と元資料を整理し、AIに渡す情報と取り扱いの範囲を決めます。"],
      ["AIが構成・草案を作成", "構成案や文章の草案をつくり、作業のどの部分を支援できるか小さく試します。"],
      ["人が確認して公開", "元資料との整合性や表現を人が確認し、修正と公開までの手順を整えます。"],
    ],
    outputs: ["社内資料の整理", "構成・草案の作成", "人による確認フロー"],
  },
];

export function WorkflowCarousel({ onSelectCategory }: { onSelectCategory: (category: string) => void }) {
  const motion = useSiteMotion();
  const [active, setActive] = useState(1);
  const [detail, setDetail] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const activeRef = useRef(1);

  function goTo(index: number, animate = true) {
    const target = Math.max(0, Math.min(workflows.length - 1, index));
    const container = track.current, card = cards.current[target];
    if (!container || !card) return;
    activeRef.current = target;
    setActive(target);
    container.scrollTo({ left: card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2, behavior: motion && animate ? "smooth" : "instant" });
  }

  function nearestCard() {
    const container = track.current;
    if (!container) return 1;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0, distance = Infinity;
    cards.current.forEach((card, index) => {
      if (!card) return;
      const next = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (next < distance) { distance = next; closest = index; }
    });
    return closest;
  }

  useEffect(() => {
    const container = track.current;
    if (!container) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const index = nearestCard();
      activeRef.current = index;
      setActive(index);
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(() => {
      const card = cards.current[activeRef.current];
      if (card) container.scrollTo({ left: card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2, behavior: "instant" });
    });
    resize.observe(container);
    container.addEventListener("scroll", scroll, { passive: true });
    return () => { resize.disconnect(); container.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const modal = dialog.current;
    if (detail === null || !modal) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!modal.open) modal.showModal();
    return () => { document.body.style.overflow = previous; };
  }, [detail]);

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const container = event.currentTarget;
    if (drag.current?.moved) {
      suppressClick.current = true;
      container.style.scrollSnapType = "x mandatory";
      goTo(nearestCard());
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
  }

  const selected = detail === null ? null : workflows[detail];
  const SelectedIcon = selected?.icon;

  return <>
    <div className="workflow-carousel" role="region" aria-roledescription="カルーセル" aria-label="技術の活用例">
      <div ref={track} id="workflow-carousel-track" tabIndex={0}
        className="workflow-grid relative flex gap-0 snap-x snap-mandatory items-stretch overflow-x-auto overscroll-x-contain px-[calc(50%_-_min(41vw,190px))] pt-7 pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onKeyDown={event => {
          suppressClick.current = false;
          const index = event.key === "ArrowRight" ? active + 1 : event.key === "ArrowLeft" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? 2 : null;
          if (index === null) return;
          event.preventDefault();
          const next = Math.max(0, Math.min(2, index));
          triggers.current[next]?.focus({ preventScroll: true });
          goTo(next);
        }}
        onPointerDown={event => {
          suppressClick.current = false;
          if (event.pointerType === "mouse" && event.button === 0) drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
        }}
        onPointerMove={event => {
          const state = drag.current;
          if (!state || event.buttons !== 1) return;
          const delta = event.clientX - state.x;
          if (Math.abs(delta) > 6) {
            state.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.style.scrollSnapType = "none";
          }
          if (state.moved) { event.preventDefault(); event.currentTarget.scrollLeft = state.left - delta; }
        }}
        onPointerUp={endDrag}
        onPointerCancel={event => { endDrag(event); suppressClick.current = false; }}
        onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
        {workflows.map((workflow, index) => {
          const Icon = workflow.icon;
          return <article key={workflow.category} ref={element => { cards.current[index] = element; }} data-active={active === index}
            style={{ "--workflow-accent": workflow.accent, "--workflow-glow": workflow.glow } as CSSProperties}
            className="workflow-slide relative -mr-12 flex w-[min(82vw,380px)] shrink-0 snap-center flex-col rounded-[28px] border border-solid border-transparent [background:linear-gradient(150deg,#1e354b,#111f34_75%)_padding-box,linear-gradient(135deg,#94b3ca80,#34465e55_55%,#6e88a666)_border-box] opacity-70 shadow-[inset_0_1px_0_#eff7ff0d,0_16px_32px_#02081755] transition-[scale,translate,opacity,box-shadow] duration-500 last:mr-0 data-[active=true]:z-10 data-[active=true]:opacity-100 motion-safe:translate-y-4 motion-safe:scale-[.92] motion-safe:data-[active=true]:translate-y-0 motion-safe:data-[active=true]:scale-100 motion-safe:data-[active=true]:hover:-translate-y-[3px] motion-reduce:transition-none">
            <button ref={element => { triggers.current[index] = element; }} type="button" aria-label={`${workflow.category}の詳細を見る`} aria-haspopup="dialog" aria-current={active === index ? "true" : undefined}
              className="workflow-slide-trigger flex h-full w-full transform-none cursor-pointer select-none flex-col overflow-hidden rounded-[27px] border-0 bg-transparent p-0 text-left text-[#e1edff] shadow-none hover:transform-none hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--workflow-accent)] active:transform-none"
              onClick={() => setDetail(index)}>
              <div className="relative grid h-[190px] w-full shrink-0 place-items-center overflow-hidden border-0 border-b border-solid border-[#9ab6cc26] bg-[radial-gradient(ellipse_at_50%_35%,var(--workflow-glow),transparent_75%),linear-gradient(145deg,#203b53,#18273e)]">
                <span aria-hidden="true" className="absolute top-5 left-5 font-heading text-xs tracking-[.16em] text-[#c9d9ed80]">0{index + 1}</span>
                <div aria-hidden="true" className="grid size-24 place-items-center rounded-[30px] border border-solid border-[#d9eaff3d] bg-[linear-gradient(145deg,#c9e8ff12,#0e193b40)] text-[var(--workflow-accent)] shadow-[inset_0_1px_0_#ffffff1f,0_12px_24px_#02081733]"><Icon size={40} strokeWidth={1.3} /></div>
              </div>
              <div className="flex flex-1 flex-col px-6 pt-6 pb-7">
                <span className="font-heading text-xs font-semibold tracking-wide text-[var(--workflow-accent)]">{workflow.category}</span>
                <h3 className="mt-3 mb-4 font-heading text-[25px] leading-[1.55] font-bold text-[#edf4ff]">{workflow.title}</h3>
                <p className="mb-6 text-[15px] leading-[1.85] text-[#c3d2e8]">{workflow.summary}</p>
                <span className="mt-auto inline-flex min-h-10 items-center justify-between gap-6 self-start rounded-full border border-solid border-[#a0bdd43d] bg-[#d7ebff0a] px-4 py-2 font-heading text-[13px] font-semibold text-[#d5e8fa]">詳しく見る<ArrowRight size={16} aria-hidden="true" /></span>
              </div>
            </button>
          </article>;
        })}
      </div>
      <div className="mt-1 flex flex-wrap items-center justify-center gap-5">
        <button className="grid size-11 place-items-center rounded-full border border-solid border-[#8cacc459] bg-[#14283d] p-0 text-[#c7def3] shadow-none hover:bg-[#213c54] disabled:opacity-30" type="button" aria-label="前のカード" aria-controls="workflow-carousel-track" disabled={active === 0} onClick={() => goTo(active - 1)}><ChevronLeft size={19} /></button>
        <div className="flex items-center gap-2" aria-label="カードを選ぶ">{workflows.map((workflow, index) => <button type="button" key={workflow.category} aria-label={`${workflow.category}を表示`} aria-pressed={active === index} onClick={() => goTo(index)} className="grid size-8 place-items-center rounded-full border-0 bg-transparent p-0 shadow-none"><span className={`block h-1.5 rounded-full transition-[width,background] duration-300 motion-reduce:transition-none ${active === index ? "w-6 bg-[#b9d7ef]" : "w-1.5 bg-[#6b859f]"}`} /></button>)}</div>
        <button className="grid size-11 place-items-center rounded-full border border-solid border-[#8cacc459] bg-[#14283d] p-0 text-[#c7def3] shadow-none hover:bg-[#213c54] disabled:opacity-30" type="button" aria-label="次のカード" aria-controls="workflow-carousel-track" disabled={active === 2} onClick={() => goTo(active + 1)}><ChevronRight size={19} /></button>
      </div>
      <p className="mt-3 text-center font-heading text-xs text-[#a8bed4]">横にスワイプして、カードを押すと詳細が開きます</p>
      <span className="sr-only" aria-live="polite">{workflows[active].category}、{active + 1} / 3</span>
    </div>

    <dialog ref={dialog} onClose={() => setDetail(null)} aria-labelledby="workflow-dialog-title" aria-modal="true"
      onKeyDown={event => {
        if (event.key !== "Tab") return;
        const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'));
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}
      onClick={event => { if (event.target !== event.currentTarget) return; const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close(); }}
      className="workflow-dialog fixed inset-0 m-auto max-h-[90dvh] w-[min(760px,calc(100%_-_32px))] overflow-y-auto overscroll-contain rounded-3xl border border-solid border-[#829eb559] bg-[linear-gradient(145deg,#1b3046,#101d32)] p-0 text-[#e1edff] shadow-[0_24px_80px_#02081799] backdrop:bg-[#020817c9] motion-safe:open:animate-[workflow-detail-in_.2s_ease-out]">
      {selected && <div className="p-7 max-[600px]:p-5">
        <div className="mb-5 flex items-center justify-between gap-4"><span className="inline-flex items-center gap-2 font-heading text-sm text-[#bcd8ed]">{SelectedIcon && <SelectedIcon size={20} />}{selected.category}</span><button type="button" onClick={() => dialog.current?.close()} aria-label="詳細を閉じる" className="grid size-10 shrink-0 place-items-center rounded-full border border-solid border-[#829eb559] bg-[#14243c] p-0 text-[#d5e7fa] shadow-none hover:bg-[#243d55]"><X size={20} /></button></div>
        <h3 id="workflow-dialog-title" className="mb-4 font-heading text-[clamp(23px,3vw,32px)] leading-[1.6] font-bold text-[#eff5ff]">{selected.title}</h3>
        <p className="mb-7 text-base leading-[1.9] text-[#c4d6e9]">{selected.summary}</p>
        <h4 className="mb-4 font-heading text-lg text-[#deedff]">制作の流れ</h4>
        <ol className="m-0 mb-7 grid list-none gap-3 p-0">{selected.steps.map(([title, text], index) => <li key={title} className="rounded-2xl border border-solid border-[#8ca8c02e] bg-[#0d1b2f80] p-4"><div className="mb-2 flex items-center gap-3 font-heading"><span className="text-xs tracking-wider text-[#91b5d3]">0{index + 1}</span><h5 className="text-base font-semibold text-[#e5f1ff]">{title}</h5></div><p className="text-[15px] leading-[1.9] text-[#c0d1e5]">{text}</p></li>)}</ol>
        <h4 className="mb-3 font-heading text-lg text-[#deedff]">一緒に整えること</h4>
        <ul className="mb-7 flex list-none flex-wrap gap-2 p-0">{selected.outputs.map(output => <li key={output} className="rounded-full border border-solid border-[#90b4ce40] bg-[#bddef90a] px-3 py-1.5 font-heading text-xs text-[#cbe1f2]">{output}</li>)}</ul>
        <a href="#packages" onClick={() => { dialog.current?.close(); onSelectCategory(selected.category); }} className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-solid border-[#adcfe65c] bg-[#213e57] px-4 py-3 font-heading text-sm font-bold text-[#e2f2ff] hover:bg-[#2b4c67]">関連するパッケージを見る<ArrowRight size={18} /></a>
      </div>}
    </dialog>
  </>;
}
