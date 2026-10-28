"use client";
import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export function usePageMotion(
  trackRef: RefObject<HTMLDivElement | null>,
  pointerRef: RefObject<HTMLDivElement | null>,
  cursorRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const media = gsap.matchMedia();
    const setProgress = (p: number) => {
      track.style.setProperty("--hero-progress", String(p));
      track.style.setProperty(
        "--intro-opacity",
        String(Math.max(0, 1 - p * 2.5)),
      );
      track.style.setProperty(
        "--next-opacity",
        String(Math.max(0, (p - 0.45) / 0.55)),
      );
      const intro = track.querySelector<HTMLElement>(".hero-copy");
      const next = track.querySelector<HTMLElement>(".hero-next");
      if (intro) {
        intro.inert = p > 0.6;
        intro.setAttribute("aria-hidden", String(p > 0.6));
      }
      if (next) {
        next.inert = p < 0.6;
        next.setAttribute("aria-hidden", String(p < 0.6));
      }
    };
    media.add(
      {
        moving: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const listeners: Array<() => void> = [];
        const reduced = context.conditions?.reduced;
        document
          .querySelectorAll(".reveal")
          .forEach((el) => el.classList.add("is-visible"));
        setProgress(0);
        if (reduced) return;
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro.fromTo(
          ".hero-copy > *",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            clearProps: "transform,opacity",
            delay: 0.15,
          },
        );
        intro.fromTo(
          ".hero-proof > div",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            clearProps: "transform,opacity",
          },
          0.6,
        );
        gsap.set(".hero-next", { autoAlpha: 0, y: 65, scale: 0.94 });
        const story = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: () =>
              `top ${document.querySelector(".site-header")?.getBoundingClientRect().height || 0}px`,
            end: "+=900",
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });
        story
          .to(
            ".hero-photograph",
            {
              scale: 1.035,
              xPercent: -1,
              rotation: -0.3,
              ease: "none",
              duration: 1,
            },
            0,
          )
          .to(
            ".hero-copy",
            {
              y: -105,
              opacity: 0,
              filter: "blur(8px)",
              duration: 0.35,
              ease: "power1.in",
            },
            0.08,
          )
          .to(".hero-proof", { y: -45, opacity: 0, duration: 0.25 }, 0.05)
          .to(
            ".hero-topline,.hero-bottom",
            { opacity: 0, duration: 0.25 },
            0.05,
          )
          .to(
            ".hero-mascots",
            {
              y: -75,
              x: -35,
              rotation: -6,
              scale: 1.13,
              ease: "none",
              duration: 1,
            },
            0,
          )
          .to(".ether-light", { opacity: 1, scale: 1.6, duration: 0.65 }, 0.1)
          .to(
            ".hero-next",
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: "power2.out",
            },
            0.5,
          );
        gsap.utils.toArray<HTMLElement>(".hero-human").forEach((person, i) => {
          gsap.to(person, {
            y: -1.2 - (i % 2) * 0.4,
            scaleY: 1.004,
            rotation: i % 2 ? 0.035 : -0.035,
            transformOrigin: `${20 + i * 20}% 80%`,
            duration: 3.6 + i * 0.3,
            delay: i * 0.35,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
        gsap.to(".light-ribbon-one", {
          rotate: 24,
          xPercent: 6,
          yPercent: -5,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".light-ribbon-two", {
          rotate: -20,
          xPercent: -5,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".ether-core", {
          scale: 1.18,
          opacity: 0.8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".hero-mascot-caption", {
          y: -7,
          rotation: 3,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.utils
          .toArray<HTMLElement>(".reveal:not(.work-card)")
          .forEach((el, index) => {
            gsap.fromTo(
              el,
              { y: 38, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.85,
                ease: "power3.out",
                delay: el.classList.contains("service-card")
                  ? (index % 4) * 0.05
                  : 0,
                scrollTrigger: { trigger: el, start: "top 94%", once: true },
              },
            );
          });
        gsap.utils.toArray<HTMLElement>(".process-row").forEach((el) => {
          gsap.fromTo(
            el.querySelector(".process-number"),
            { scale: 0.65, rotation: -12 },
            {
              scale: 1,
              rotation: 0,
              ease: "back.out(1.7)",
              duration: 0.8,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });
        const marquee = gsap.fromTo(
          ".marquee-track",
          { xPercent: 0 },
          { xPercent: -50, duration: 40, ease: "none", repeat: -1 },
        );
        const marqueeEl = document.querySelector(".marquee");
        const pause = () => marquee.pause();
        const resume = () => marquee.resume();
        marqueeEl?.addEventListener("pointerenter", pause);
        marqueeEl?.addEventListener("pointerleave", resume);
        listeners.push(() => {
          marqueeEl?.removeEventListener("pointerenter", pause);
          marqueeEl?.removeEventListener("pointerleave", resume);
        });
        if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
          const moveX = pointerRef.current
            ? gsap.quickTo(pointerRef.current, "x", {
                duration: 1,
                ease: "power3.out",
              })
            : null;
          const moveY = pointerRef.current
            ? gsap.quickTo(pointerRef.current, "y", {
                duration: 1,
                ease: "power3.out",
              })
            : null;
          const cursorX = gsap.quickTo(cursorRef.current, "x", {
            duration: 0.18,
            ease: "power2.out",
          });
          const cursorY = gsap.quickTo(cursorRef.current, "y", {
            duration: 0.18,
            ease: "power2.out",
          });
          const pointer = (event: PointerEvent) => {
            cursorX(event.clientX);
            cursorY(event.clientY);
            if (cursorRef.current)
              cursorRef.current.dataset.positioned = "true";
            if (cursorRef.current)
              cursorRef.current.dataset.active = (
                event.target as HTMLElement
              ).closest("[data-cursor]")
                ? "true"
                : "false";
            moveX?.((event.clientX / innerWidth - 0.5) * 35);
            moveY?.((event.clientY / innerHeight - 0.5) * 22);
          };
          document.addEventListener("pointermove", pointer, { passive: true });
          listeners.push(() =>
            document.removeEventListener("pointermove", pointer),
          );
          gsap.utils
            .toArray<HTMLElement>(".animated-button,.contact-channel")
            .forEach((button) => {
              const x = gsap.quickTo(button, "x", {
                duration: 0.45,
                ease: "power3.out",
              });
              const y = gsap.quickTo(button, "y", {
                duration: 0.45,
                ease: "power3.out",
              });
              const move = (e: PointerEvent) => {
                const r = button.getBoundingClientRect();
                x((e.clientX - r.left - r.width / 2) * 0.1);
                y((e.clientY - r.top - r.height / 2) * 0.15);
              };
              const leave = () => {
                x(0);
                y(0);
              };
              button.addEventListener("pointermove", move);
              button.addEventListener("pointerleave", leave);
              listeners.push(() => {
                button.removeEventListener("pointermove", move);
                button.removeEventListener("pointerleave", leave);
              });
            });
        }
        const refresh = () => ScrollTrigger.refresh();
        document.fonts.ready.then(refresh);
        window.addEventListener("load", refresh, { once: true });
        listeners.push(() => window.removeEventListener("load", refresh));
        return () => listeners.forEach((fn) => fn());
      },
    );
    return () => media.revert();
  }, [trackRef, pointerRef, cursorRef]);
}

export function useGalleryMotion(category: string) {
  useEffect(() => {
    const elements = gsap.utils.toArray<HTMLElement>(".work-card");
    const removals: Array<() => void> = [];
    const context = gsap.context(() => {
      elements.forEach((card) => card.classList.add("is-visible"));
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        elements,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.65,
          ease: "power3.out",
          clearProps: "transform,opacity",
        },
      );
      elements.forEach((card) => {
        const preview = card.querySelector<HTMLElement>(".work-preview");
        const visual = card.querySelector<HTMLElement>(".work-preview > div");
        const hover = card.querySelector(".project-hover-label");
        if (!preview || !visual) return;
        const enter = () => {
          gsap.to(visual, {
            scale: 1.12,
            duration: 0.65,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(hover, {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            overwrite: "auto",
          });
        };
        const leave = () => {
          gsap.to(preview, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(visual, {
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(hover, {
            autoAlpha: 0,
            y: 12,
            duration: 0.3,
            overwrite: "auto",
          });
        };
        const move = (e: PointerEvent) => {
          if (!matchMedia("(pointer:fine)").matches) return;
          const r = card.getBoundingClientRect();
          gsap.to(preview, {
            rotateY: ((e.clientX - r.left) / r.width - 0.5) * 12,
            rotateX: -((e.clientY - r.top) / r.height - 0.5) * 10,
            transformPerspective: 1000,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointerleave", leave);
        card.addEventListener("pointermove", move);
        card.addEventListener("focus", enter);
        card.addEventListener("blur", leave);
        removals.push(() => {
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointerleave", leave);
          card.removeEventListener("pointermove", move);
          card.removeEventListener("focus", enter);
          card.removeEventListener("blur", leave);
        });
      });
      ScrollTrigger.refresh();
    });
    return () => {
      removals.forEach((fn) => fn());
      context.revert();
    };
  }, [category]);
}
