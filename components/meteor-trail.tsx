"use client";
import { useEffect, useRef } from "react";

/** One reusable canvas; no trail nodes or state updates on pointer movement. */
export function MeteorTrail() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const query = matchMedia(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
    );
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      element.dataset.active = String(query.matches);
      if (!query.matches) return;
      const ctx = element.getContext("2d");
      if (!ctx) return;
      let frame = 0;
      let last: { x: number; y: number } | null = null;
      let lastTime = 0;
      type Meteor = {
        x: number;
        y: number;
        dx: number;
        dy: number;
        life: number;
        hue: number;
      };
      let particles: Meteor[] = [];
      const resize = () => {
        const ratio = Math.min(devicePixelRatio, 2);
        element.width = innerWidth * ratio;
        element.height = innerHeight * ratio;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        particles = [];
        last = null;
      };
      const draw = (now: number) => {
        const delta = Math.min((now - lastTime) / 16.67 || 1, 3);
        lastTime = now;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        particles = particles.filter((p) => p.life > 0);
        for (const p of particles) {
          p.life -= 0.032 * delta;
          p.x += p.dx * delta;
          p.y += p.dy * delta;
          const alpha = Math.max(0, p.life);
          const gradient = ctx.createLinearGradient(
            p.x - p.dx * 12,
            p.y - p.dy * 12,
            p.x,
            p.y,
          );
          gradient.addColorStop(0, `hsla(${p.hue},90%,65%,0)`);
          gradient.addColorStop(1, `hsla(${p.hue},90%,58%,${alpha * 0.8})`);
          ctx.beginPath();
          ctx.moveTo(p.x - p.dx * 12, p.y - p.dy * 12);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.6 * alpha;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8 * alpha, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},95%,65%,${alpha})`;
          ctx.fill();
        }
        if (particles.length) frame = requestAnimationFrame(draw);
        else {
          frame = 0;
          lastTime = 0;
        }
      };
      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (last) {
          const dx = e.clientX - last.x,
            dy = e.clientY - last.y;
          if (Math.hypot(dx, dy) < 5) return;
          const length = Math.hypot(dx, dy);
          particles.push({
            x: e.clientX,
            y: e.clientY,
            dx: (dx / length) * 1.8,
            dy: (dy / length) * 1.8,
            life: 1,
            hue: 195 + (particles.length % 4) * 28,
          });
          if (particles.length > 48) particles.shift();
          if (!frame) frame = requestAnimationFrame(draw);
        }
        last = { x: e.clientX, y: e.clientY };
      };
      const reset = () => {
        last = null;
      };
      const pause = () => {
        if (document.hidden) {
          cancelAnimationFrame(frame);
          frame = 0;
          particles = [];
          last = null;
          ctx.clearRect(0, 0, innerWidth, innerHeight);
        }
      };
      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerleave", reset);
      document.addEventListener("visibilitychange", pause);
      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", reset);
        document.removeEventListener("visibilitychange", pause);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
      };
    };
    setup();
    query.addEventListener("change", setup);
    return () => {
      cleanup();
      query.removeEventListener("change", setup);
    };
  }, []);
  return <canvas ref={canvas} className="meteor-trail" aria-hidden="true" />;
}
