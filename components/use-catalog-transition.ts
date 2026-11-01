"use client";

import { useLayoutEffect, useRef } from "react";

/** Stage each page as a depth sequence while retaining its footprint and scroll position. */
export function useCatalogTransition(page: number, filterKey: string) {
  const grid = useRef<HTMLDivElement>(null);
  const pending = useRef<{ x: number; y: number; direction: number; target: number; sequence: number } | null>(null);
  const animations = useRef<Animation[]>([]);
  const sequence = useRef(0);

  const release = () => {
    animations.current.forEach(animation => animation.cancel());
    animations.current = [];
    if (grid.current) {
      delete grid.current.dataset.pageMotion;
      grid.current.removeAttribute("aria-busy");
      grid.current.inert = false;
    }
  };

  useLayoutEffect(() => {
    sequence.current++;
    pending.current = null;
    release();
    grid.current?.style.removeProperty("min-height");
  }, [filterKey]);

  useLayoutEffect(() => {
    const resize = () => {
      sequence.current++;
      pending.current = null;
      release();
      grid.current?.style.removeProperty("min-height");
    };
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (media.matches) animations.current.forEach(animation => animation.finish()); };
    window.addEventListener("resize", resize);
    media.addEventListener("change", finish);
    return () => {
      sequence.current++;
      release();
      window.removeEventListener("resize", resize);
      media.removeEventListener("change", finish);
    };
  }, []);

  useLayoutEffect(() => {
    const change = pending.current, element = grid.current;
    if (!change || !element || change.target !== page) return;
    pending.current = null;
    release();
    window.scrollTo({ left: change.x, top: change.y, behavior: "instant" });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.dataset.pageMotion = "arriving";
    element.setAttribute("aria-busy", "true");
    element.inert = true;
    const cards = Array.from(element.children) as HTMLElement[];
    const columns = Math.max(1, getComputedStyle(element).gridTemplateColumns.split(" ").length);
    const desktop = matchMedia("(hover: hover) and (pointer: fine)").matches;
    animations.current = cards.map((card, index) => {
      const column = index % columns, row = Math.floor(index / columns);
      const order = row * 34 + (change.direction > 0 ? column : columns - 1 - column) * 46;
      return card.animate([
        { opacity: 0, filter: "blur(2px)", transform: `perspective(1400px) translate3d(${change.direction * (desktop ? 30 : 16)}px,26px,-36px) rotateX(${desktop ? 6 : 0}deg) rotateY(${desktop ? change.direction * -3 : 0}deg) scale(.965)` },
        { opacity: 1, filter: "blur(0px)", transform: "perspective(1400px) translate3d(0,-2px,0) rotateX(0deg) rotateY(0deg) scale(1.002)", offset: .78 },
        { opacity: 1, filter: "blur(0px)", transform: "perspective(1400px) translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1)" },
      ], { duration: 640, delay: order, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
    });
    void Promise.allSettled(animations.current.map(animation => animation.finished)).then(() => {
      if (sequence.current === change.sequence) release();
    });
  }, [page]);

  const change = async (nextPage: number, commit: () => void) => {
    const element = grid.current;
    const current = ++sequence.current;
    release();
    pending.current = null;
    if (!element || nextPage === page) return;
    const direction = nextPage > page ? 1 : -1;
    pending.current = { x: scrollX, y: scrollY, direction, target: nextPage, sequence: current };
    element.style.minHeight = `${element.getBoundingClientRect().height}px`;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.dataset.pageMotion = "departing";
      element.setAttribute("aria-busy", "true");
      element.inert = true;
      const cards = Array.from(element.children) as HTMLElement[];
      animations.current = cards.map((card, index) => card.animate([
        { opacity: 1, filter: "blur(0px)", transform: "perspective(1400px) translate3d(0,0,0) scale(1)" },
        { opacity: 0, filter: "blur(1px)", transform: `perspective(1400px) translate3d(${direction * -14}px,-6px,-20px) scale(.975)` },
      ], { duration: 160, delay: Math.min(index, 5) * 12, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" }));
      await Promise.allSettled(animations.current.map(animation => animation.finished));
    }
    if (sequence.current === current) commit();
  };
  return { grid, change };
}
