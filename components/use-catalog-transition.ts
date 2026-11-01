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
    const animations = Array.from(element.children).map((card, index) => card.animate([
      { opacity: 0, transform: `translate3d(${change.direction * 14}px, 8px, 0) scale(.985)` },
      { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
    ], { duration: 360, delay: index * 28, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" }));
    return () => animations.forEach(animation => animation.cancel());
  }, [page]);

  const prepare = (nextPage: number) => {
    const element = grid.current;
    if (!element || nextPage === page) return;
    pending.current = { x: window.scrollX, y: window.scrollY, direction: nextPage > page ? 1 : -1 };
    element.style.minHeight = `${element.getBoundingClientRect().height}px`;
  };
  return { grid, prepare };
}
