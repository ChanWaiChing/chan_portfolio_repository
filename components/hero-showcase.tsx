"use client";

import Image from "next/image";
import { BotMascot } from "./bot-mascot";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useSiteMotion } from "./use-site-motion";

type HeroSlide = { label: string; phase: string; image: string; alt: string };
const slides: HeroSlide[] = [
  { label: "チーム紹介", image: "/images/heroes/team-introduction-v2.webp", alt: "兄弟二人とGemini、Figma、Claude、Codexの四体のボットがチームを紹介する制作イメージ", phase: "チーム紹介" },
  { label: "デザイン", image: "/images/heroes/design-figma-v2.webp", alt: "弟がMacでデザインし、恋人が励まし、Figmaボットが配色の補助をする制作イメージ", phase: "デザイン" },
  { label: "開発", image: "/images/heroes/development-v2.webp", alt: "兄と恋人がMacとiPhoneを使って大規模開発を進め、Gemini、Claude、Codexが補助する制作イメージ", phase: "開発" },
  { label: "修正", image: "/images/heroes/revisions-v2.webp", alt: "女性二人と弟が座り、兄が大型画面で修正方針を示す。四体のボットのうちGeminiとCodexが補助する制作イメージ", phase: "修正" },
];

const SLIDE_INTERVAL_MS = 4000;
// Each selector has its own short gesture, with no continuous motion or pointer tracking.
const botGestures = [
  ["none", "translateY(-8px) rotate(-7deg)", "translateY(-5px) rotate(7deg)", "translateY(-7px) rotate(-4deg)", "none"],
  ["none", "rotate(-13deg) translateY(-3px)", "rotate(11deg) translateY(-5px)", "rotate(-7deg)", "none"],
  ["none", "translateY(-7px) scale(1.06)", "translateY(-7px) rotate(5deg)", "translateY(-3px) rotate(-5deg)", "none"],
  ["none", "translateX(5px) rotate(8deg)", "translateX(-5px) rotate(-8deg)", "translateY(-6px) scale(1.04)", "none"],
];
const slideCaptions = [
  "事業の可能性を、世界へ",
  "想いを、伝わるかたちに",
  "アイデアを、動く仕組みに",
  "声を重ねて、より良いかたちへ",
];

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [botActivation, setBotActivation] = useState(0);
  const motionEnabled = useSiteMotion();
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const stage = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectSlide = (index: number) => {
    setActive(index);
    setBotActivation(value => value + 1);
  };

  useEffect(() => {
    if (!motionEnabled || reducedMotion || !visible) return;
    const bot = tabs.current[active]?.querySelector(".hero-selector-bot");
    if (!bot) return;
    const animation = bot.animate(botGestures[active].map(transform => ({ transform, transformOrigin: "50% 75%" })), {
      duration: 950, easing: "cubic-bezier(.22,.8,.3,1)", iterations: 1,
    });
    return () => animation.cancel();
  }, [active, botActivation, motionEnabled, reducedMotion, visible]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || !visible || !motionEnabled) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && document.body.style.overflow !== "hidden")
        setActive((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, visible, active, motionEnabled]);

  return <div className="hero-night select-none [&_*]:select-none" data-sky-motion={motionEnabled && !reducedMotion && visible}>
    <div className="site-intro">
      一期一会のご縁を大切に
      <span>一生に一度の出会いであると思い、目の前の人・瞬間を大切にする</span>
    </div>
    <section ref={stage} className="reference-hero" aria-label="大穂兄弟のサービス" data-playing={!paused && !reducedMotion && visible && motionEnabled} data-border-motion={!paused && !reducedMotion && visible && motionEnabled}>
      <div className="hero-primary-copy"><h1 id="hero-title"><span className="hero-title-line" data-text="デザインと開発を">デザインと開発を</span><span className="hero-title-line" data-text="ひとつのチームで">ひとつのチームで</span></h1><p>更新しにくいサイト、手作業の転記、使いづらい管理画面。中小企業・小さなチームの困りごとを、企画・デザイン・開発から公開後の改善まで一緒に解決します。</p><div className="hero-primary-actions"><a className="catalog-cta font-extrabold" href="#contact">まずは無料で相談する<ArrowRight size={18} /></a><a className="catalog-outline-button" href="#works">制作実績を見る<ArrowRight size={18} /></a></div></div>
      <div className="reference-hero-stage hero-scene-stage" id="hero-panel" role="tabpanel"
        aria-labelledby={`hero-tab-${active}`} aria-describedby="hero-motion-hint" tabIndex={0}
        onKeyDown={event => { if(event.key === " "){event.preventDefault();setPaused(value => !value);} }}
        onFocusCapture={() => setPaused(true)} data-slide={active}>
        <div className="hero-photo-deck">
          {slides.map((item, index) => <div className={`hero-photo-layer human-led-photo scene-${index}`} key={item.phase} data-active={index === active} aria-hidden={index !== active}>
            <Image src={item.image} alt={item.alt} fill unoptimized style={{ objectFit: "contain", objectPosition: "center", borderRadius: 20 }} sizes="(max-width: 760px) 100vw, (max-width: 1440px) 57vw, 820px" loading={index === 0 ? "eager" : "lazy"} />
          </div>)}
        </div>
        <div className="hero-scene-caption">
          <div className="reference-hero-copy"><h2>{slideCaptions[active]}</h2></div>
        </div>
      </div>
      <div className="reference-hero-controls">
        <div role="tablist" aria-label="サービスを選ぶ" className="reference-hero-tabs">
          {slides.map((item, index) => <button key={item.label}
            ref={(element) => { tabs.current[index] = element; }}
            id={`hero-tab-${index}`} role="tab" aria-controls="hero-panel"
            aria-selected={active === index} tabIndex={active === index ? 0 : -1}
            onClick={() => selectSlide(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % slides.length;
              else if (event.key === "ArrowLeft") next = (index + slides.length - 1) % slides.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = slides.length - 1;
              else return;
              event.preventDefault();
              selectSlide(next);
              tabs.current[next]?.focus();
            }}>
            <BotMascot variant={(["ocean","peach","sunset","mint"] as const)[index]} className="hero-selector-bot" /><span className="hero-tab-copy"><span className="hero-tab-number">0{index + 1}</span><strong>{item.label}</strong></span>
          </button>)}
        </div>
        <span id="hero-motion-hint" className="hero-motion-hint">画像にフォーカスしてスペースキーで自動切替を停止・再生できます。</span>
      </div>
    </section>
  </div>;
}
