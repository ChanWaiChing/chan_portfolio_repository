"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Sparkles } from "lucide-react";

const colors = ["#ff577c", "#ffad57", "#ffe17b", "#72ddb2", "#62ccff", "#8998ff", "#cb8cff"];
const effects: Record<string, string> = { "selected-work": "rise", services: "slide", strengths: "steps", packages: "scale", works: "glide", faq: "unfold", contact: "settle", footer: "curtain" };
const targets = ".content-heading,.faq-guide-heading,.brand-story,.brother-intro-panel,.professional-profile,.service-entrance,.workflow-card,.working-process > li,.package-card,#works .portfolio-card,.faq-guide-item,.contact-layout,.contact-followup,.footer-closing,.footer-scene";

export function SiteMotion() {
  const [enabled, setEnabled] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [fine, setFine] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {window.dispatchEvent(new CustomEvent("oho-motion-change",{detail:enabled}));},[enabled]);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => { setReduced(motion.matches); setFine(pointer.matches); };
    update();
    try { setEnabled(sessionStorage.getItem("oho-motion") !== "off"); } catch { /* Optional preference. */ }
    motion.addEventListener("change", update); pointer.addEventListener("change", update);
    return () => { motion.removeEventListener("change", update); pointer.removeEventListener("change", update); };
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;
    document.documentElement.dataset.siteMotion = "on";
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.dataset.revealState = "shown";
        observer.unobserve(el);
      });
    }, { threshold: .05, rootMargin: "0px 0px -18px 0px" });
    const prepare = () => document.querySelectorAll<HTMLElement>(targets).forEach(el => {
      if (seen.has(el)) return;
      seen.add(el);
      const section = el.closest("section[id],#selected-work,.introduction-copy,footer");
      const key = section?.tagName === "FOOTER" ? "footer" : section?.classList.contains("introduction-copy") ? "brothers" : section?.id || "brothers";
      el.dataset.reveal = key === "brothers" ? "portrait" : effects[key] || "rise";
      el.style.setProperty("--reveal-delay", `${Math.min(Array.from(el.parentElement?.children || []).indexOf(el) % 4, 3) * 55}ms`);
      el.dataset.revealState = el.getBoundingClientRect().top < innerHeight - 30 ? "static" : "waiting";
      if (el.dataset.revealState === "waiting") observer.observe(el);
    });
    prepare();
    const mutations = new MutationObserver(prepare);
    mutations.observe(document.querySelector("main") || document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect(); mutations.disconnect(); delete document.documentElement.dataset.siteMotion;
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el => { delete el.dataset.reveal; delete el.dataset.revealState; el.style.removeProperty("--reveal-delay"); });
    };
  }, [enabled, reduced]);

  useEffect(() => {
    if (!enabled || reduced || !fine || !canvas.current) return;
    const layer = canvas.current, ctx = layer.getContext("2d");
    if (!ctx) return;
    type Point = { x: number; y: number; time: number };
    let points: Point[] = [], last: Point | null = null, frame = 0, hue = 0;
    const resize = () => {
      const ratio = Math.min(devicePixelRatio || 1, 2);
      layer.width = innerWidth * ratio; layer.height = innerHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = []; last = null;
    };
    const paint = (now: number) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      points = points.filter(p => now - p.time < 620).slice(-64);
      layer.dataset.active = points.length > 1 ? "true" : "false";
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1], b = points[i], life = 1 - (now - b.time) / 620;
        ctx.globalAlpha = Math.max(0, life * .9 * i / points.length);
        ctx.strokeStyle = colors[(i + hue) % colors.length];
        ctx.shadowColor = colors[(i + hue) % colors.length];
        ctx.shadowBlur = i > points.length - 16 ? 5 : 0;
        ctx.lineWidth = .8 + life * 3.2;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      const head = points.at(-1);
      if (head) {
        const life = Math.max(0, 1 - (now - head.time) / 620);
        ctx.globalAlpha = life; ctx.fillStyle = "#fff5de";
        ctx.shadowColor = colors[hue % 7]; ctx.shadowBlur = 9;
        ctx.beginPath(); ctx.moveTo(head.x, head.y - 5); ctx.lineTo(head.x + 1.5, head.y - 1.5); ctx.lineTo(head.x + 5, head.y); ctx.lineTo(head.x + 1.5, head.y + 1.5); ctx.lineTo(head.x, head.y + 5); ctx.lineTo(head.x - 1.5, head.y + 1.5); ctx.lineTo(head.x - 5, head.y); ctx.lineTo(head.x - 1.5, head.y - 1.5); ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
      frame = points.length ? requestAnimationFrame(paint) : 0;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || document.hidden) return;
      const point = { x: event.clientX, y: event.clientY, time: performance.now() };
      if (last && point.time - last.time < 150) {
        const steps = Math.min(10, Math.ceil(Math.hypot(point.x - last.x, point.y - last.y) / 8));
        for (let i = 1; i <= steps; i++) points.push({ x: last.x + (point.x - last.x) * i / steps, y: last.y + (point.y - last.y) * i / steps, time: point.time });
      } else points.push(point);
      last = point; hue = (hue + 1) % 7;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const clear = () => { cancelAnimationFrame(frame); frame = 0; points = []; last = null; ctx.clearRect(0, 0, innerWidth, innerHeight); layer.dataset.active = "false"; };
    resize();
    window.addEventListener("resize", resize); window.addEventListener("pointermove", move, { passive: true }); window.addEventListener("blur", clear); document.addEventListener("visibilitychange", clear);
    return () => { clear(); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); window.removeEventListener("blur", clear); document.removeEventListener("visibilitychange", clear); };
  }, [enabled, fine, reduced]);

  if (reduced) return null;
  return <>
    {enabled && fine && <canvas ref={canvas} className="meteor-canvas" data-active="false" aria-hidden="true" />}
    <button type="button" className="site-motion-toggle" aria-pressed={!enabled} onClick={() => { const next = !enabled; setEnabled(next); try { sessionStorage.setItem("oho-motion", next ? "on" : "off"); } catch { /* Optional preference. */ } }}>
      <Sparkles size={14} aria-hidden="true" />{enabled ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}{enabled ? "演出を停止" : "演出を再生"}
    </button>
  </>;
}
