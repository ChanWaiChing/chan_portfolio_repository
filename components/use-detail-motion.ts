"use client";
import { useLayoutEffect, useRef, type RefObject } from "react";

export function useDetailMotion<T>(detail: T | null, onClose: () => void, dialog: RefObject<HTMLDivElement | null>) {
  const source = useRef<DOMRect | null>(null);
  const running = useRef<Animation | null>(null);
  const closing = useRef(false);

  useLayoutEffect(() => {
    closing.current = false;
    const element = dialog.current;
    if (!detail || !element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const bounds = element.getBoundingClientRect(), origin = source.current;
    const x = origin ? Math.max(12, Math.min(88, (origin.x + origin.width / 2 - bounds.x) / bounds.width * 100)) : 50;
    const y = origin ? Math.max(8, Math.min(75, (origin.y + origin.height / 2 - bounds.y) / bounds.height * 100)) : 30;
    element.style.transformOrigin = `${x}% ${y}%`;
    running.current = element.animate([
      { opacity: 0, filter: "blur(2px)", transform: `translate3d(${(x - 50) * .35}px,12px,0) scale(.955)` },
      { opacity: 1, filter: "blur(0px)", transform: "translate3d(0,-1px,0) scale(1.002)", offset: .8 },
      { opacity: 1, filter: "blur(0px)", transform: "translate3d(0,0,0) scale(1)" },
    ], { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" });
    const stop = () => { if (media.matches) running.current?.cancel(); };
    media.addEventListener("change", stop);
    return () => { media.removeEventListener("change", stop); running.current?.cancel(); };
  }, [detail, dialog]);

  const rememberSource = (button: HTMLElement) => {
    const card = button.closest("article");
    source.current = (card?.querySelector(".project-thumbnail,.package-thumbnail") || button).getBoundingClientRect();
  };
  const close = async () => {
    if (closing.current || !detail) return;
    closing.current = true;
    running.current?.cancel();
    if (dialog.current && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      running.current = dialog.current.animate([
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(6px) scale(.985)" },
      ], { duration: 160, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" });
      try { await running.current.finished; } catch { /* A motion preference change can cancel it. */ }
    }
    onClose();
  };
  return { rememberSource, close };
}
