"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Robot } from "./robot";

export default function LivingMascots() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const bots = root.current?.querySelectorAll<HTMLElement>(".robot");
        if (!bots) return;
        bots.forEach((bot, i) => {
          gsap.to(bot, {
            y: i ? -9 : -5,
            rotation: i ? 4 : -3,
            duration: 2.7 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
        if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
        const setters = [...bots].map((bot) =>
          gsap.quickTo(bot, "rotationY", { duration: 0.7, ease: "power2.out" }),
        );
        const move = (e: PointerEvent) =>
          setters.forEach((set) => set((e.clientX / innerWidth - 0.5) * 20));
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
      },
      root,
    );
    return () => media.revert();
  }, []);
  return (
    <div ref={root} className="living-mascots" aria-hidden="true">
      <Robot small waving />
      <Robot small warm />
    </div>
  );
}
