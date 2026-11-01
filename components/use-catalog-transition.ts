"use client";

import { useLayoutEffect, useRef } from "react";

/** Reserve the current list footprint so shorter pages cannot pull the viewport upward. */
export function useCatalogTransition(page: number, filterKey: string) {
  const grid = useRef<HTMLDivElement>(null);
  const pending = useRef<{ x: number; y: number; direction: number } | null>(null);

  useLayoutEffect(() => {
    grid.current?.style.removeProperty("min-height");
  }, [filterKey]);

  useLayoutEffect(() => {
    const resize = () => grid.current?.style.removeProperty("min-height");
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useLayoutEffect(() => {
    const change = pending.current;
    const element = grid.current;
    if (!change || !element) return;
    pending.current = null;
    // Restore before paint; prevent scroll anchoring when the card contents change.
    window.scrollTo({ left: change.x, top: change.y, behavior: "instant" });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Reveal the new page as one coherent surface, with crisp text throughout.
    const animation = element.animate([
      { opacity: .15, clipPath: change.direction > 0 ? "inset(0 0 0 8% round 18px)" : "inset(0 8% 0 0 round 18px)", transform: `translate3d(${change.direction * 16}px,0,0)` },
      { opacity: 1, clipPath: "inset(0 0 0 0 round 18px)", transform: "translate3d(0,0,0)" },
    ], { duration: 380, easing: "cubic-bezier(.22,1,.36,1)" });
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => { if (media.matches) animation.cancel(); };
    media.addEventListener("change", stop);
    return () => { media.removeEventListener("change", stop); animation.cancel(); };
  }, [page]);

  const prepare = (nextPage: number) => {
    const element = grid.current;
    if (!element || nextPage === page) return;
    pending.current = { x: window.scrollX, y: window.scrollY, direction: nextPage > page ? 1 : -1 };
    element.style.minHeight = `${element.getBoundingClientRect().height}px`;
  };
  return { grid, prepare };
}
