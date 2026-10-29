"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/** A second control for the document scroll, alongside the browser scrollbar. */
export function PageScrollbar() {
  const [progress, setProgress] = useState(0);
  const [available, setAvailable] = useState(false);
  const [chapter, setChapter] = useState("はじめに");
  const [markers, setMarkers] = useState<{label:string;position:number}[]>([]);
  const compact = false;
  const [dragging, setDragging] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      setAvailable(max > 2 && Boolean(document.getElementById("main")));
      setProgress(max ? Math.round(Math.min(1, Math.max(0, scrollY / max)) * 1000) / 10 : 0);
      const sections = [...document.querySelectorAll<HTMLElement>("main > section[id]")];
      const labels: Record<string,string> = { introduction: "はじめに", services: "サービス", strengths: "進め方", packages: "パッケージ", works: "制作実績", faq: "ご質問", contact: "ご相談" };
      const current = sections.filter(section => section.getBoundingClientRect().top <= innerHeight * .3).at(-1);
      setChapter(labels[current?.id || "introduction"]);
      setMarkers(previous => {
        const next = sections.map(section => ({label:labels[section.id],position:Math.min(100,max ? (section.getBoundingClientRect().top+scrollY)/max*100 : 0)}));
        return JSON.stringify(previous) === JSON.stringify(next) ? previous : next;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const media = matchMedia("(max-width: 760px)");
    const layout = () => { schedule(); };
    layout();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", layout);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); media.removeEventListener("change", layout); };
  }, []);

  const seek = (fraction: number, smooth = false) => {
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    window.scrollTo({ top: max * Math.min(1, Math.max(0, fraction)), behavior: smooth && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant" });
  };
  const point = (x: number, y: number) => {
    const rect = track.current?.getBoundingClientRect();
    if (!rect) return;
    seek(compact ? (x - rect.left) / rect.width : (y - rect.top) / rect.height);
  };
  if (!available) return null;
  return <aside className={`page-scroll-control${compact ? " is-compact" : ""}${dragging ? " is-dragging" : ""}`} aria-label="ページを読むためのスクロール操作">
    <span className="scroll-control-label" title="現在のセクション">{chapter}</span>
    <button type="button" aria-label="先頭までスクロール" onClick={() => seek(0, true)}><ChevronUp size={17} /></button>
    <div ref={track} className="page-scroll-track" role="scrollbar" tabIndex={0} aria-label="ページのスクロール位置" aria-controls="main" aria-orientation={compact ? "horizontal" : "vertical"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={`${Math.round(progress)}％`}
      style={{ "--scroll-position": `${progress}%` } as React.CSSProperties}
      onPointerDown={event => { if (event.button !== 0) return; event.preventDefault(); event.currentTarget.focus({ preventScroll: true }); drag.current = true; setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); point(event.clientX, event.clientY); }}
      onPointerMove={event => { if (drag.current) point(event.clientX, event.clientY); }}
      onPointerUp={event => { drag.current = false; setDragging(false); if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
      onLostPointerCapture={() => { drag.current = false; setDragging(false); }}
      onKeyDown={event => {
        const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
        let top = scrollY;
        if (event.key === "Home") top = 0;
        else if (event.key === "End") top = max;
        else if (event.key === "PageDown") top += innerHeight * .85;
        else if (event.key === "PageUp") top -= innerHeight * .85;
        else if (["ArrowDown", "ArrowRight"].includes(event.key)) top += 72;
        else if (["ArrowUp", "ArrowLeft"].includes(event.key)) top -= 72;
        else return;
        event.preventDefault(); seek(max ? top / max : 0);
      }}>
      <span className="scroll-track-line" aria-hidden="true" />
      <span className="scroll-track-progress" aria-hidden="true" />
      {markers.map(marker => <span key={marker.label} title={marker.label} className="scroll-track-mark" style={{ "--mark-position": `${marker.position}%` } as React.CSSProperties} aria-hidden="true" />)}
      <span className="scroll-track-thumb" aria-hidden="true"><span /></span>
    </div>
    <button type="button" aria-label="末尾までスクロール" onClick={() => seek(1, true)}><ChevronDown size={17} /></button>
    <span className="scroll-control-progress" aria-hidden="true">{Math.round(progress)}<small>％</small></span>
  </aside>;
}
