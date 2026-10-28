"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";

const slides = [
  { label: "トータルサポート", title: ["兄弟の力で、", "アイデアをカタチに。"], subtitle: "デザインも、開発も。その先の運用まで。", text: "考える兄と、描く弟。ふたりの専門性で、あなたの「つくりたい」を、一緒に。", image: "/images/heroes/ai-first-view.webp", alt: "AIとともに、もっと速く、もっと良いものを。兄弟でアイデアを出し合い、AIを活用して企画・デザイン・開発を進める、2人の男性と2体のロボット。回答ブロックの設計、構造化と内部リンク、AI流入の可視化を紹介したイメージ。", destination: "contact" },
  { label: "ITコンサルティング", title: ["その課題に、", "進むべき道筋を。"], subtitle: "事業の想いを、実現できる計画へ。", text: "現状の整理から要件定義、技術選定まで。何から始めるか、一緒に考えます。", image: "/images/heroes/brothers-natural.webp", alt: "OHO BROTHERSのスタジオで、2人の男性と2体のロボットがアイデアを検討するイメージ", destination: "services" },
  { label: "デザイン・開発", title: ["伝わるデザイン。", "使いやすい仕組み。"], subtitle: "見た目と、その中の体験まで。", text: "Webサイト、業務システム、モバイルアプリ。デザインと開発をひとつのチームで。", image: "/images/heroes/couple-one-natural.webp", alt: "紺色の服の男性とボブヘアの女性が、2体のロボットと共創するOHO BROTHERSのイメージ", destination: "works" },
  { label: "AI活用・運用改善", title: ["つくった先の、", "可能性を広げる。"], subtitle: "日々の仕事を、もっと軽やかに。", text: "生成AIの活用から、公開後の保守・改善まで。長く使える仕組みを一緒に育てます。", image: "/images/heroes/couple-two-natural.webp", alt: "ベージュの服の男性とロングヘアの女性が、2体のロボットと協力するOHO BROTHERSのイメージ", destination: "services" },
];

const SLIDE_INTERVAL_MS = 4000;

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState([0, 1]);
  const stage = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const slide = slides[active];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    setLoaded(current => [...new Set([...current, active, (active + 1) % slides.length])]);
  }, [active]);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || !visible) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && document.body.style.overflow !== "hidden")
        setActive((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, visible]);

  return <>
    <div className="site-intro">
      ITコンサルティング × デザイン × システム開発
      <span>アイデアから、事業の次の一歩まで。</span>
    </div>
    <section ref={stage} className="reference-hero" aria-label="大穂兄弟のサービス" data-playing={!paused && !reducedMotion && visible}>
      <div className="hero-primary-copy"><p className="eyebrow">OHO BROTHERS / DESIGN & ENGINEERING</p><h1 id="hero-title">兄弟の力で、<br /><span>アイデアをカタチに。</span></h1><p>ITコンサルティング・デザイン・開発を、ひとつのチームで。<br />企画から公開後の改善まで、一緒に進めます。</p><div className="hero-primary-actions"><a className="catalog-cta" href="#contact">プロジェクトを相談する<ArrowRight size={18} /></a><a className="catalog-outline-button" href="#selected-work">制作イメージを見る<ArrowRight size={18} /></a></div><p className="hero-experience">開発・IT相談 11年 <span>×</span> デザイン 3年</p></div>
      <div className="reference-hero-stage hero-scene-stage" id="hero-panel" role="tabpanel"
        aria-labelledby={`hero-tab-${active}`} tabIndex={0}
        onFocusCapture={() => setPaused(true)} data-slide={active}>
        <div className="hero-photo-deck">
          {slides.map((item, index) => <div className="hero-photo-layer" key={item.image}
            data-active={index === active} aria-hidden={index !== active}>
            {loaded.includes(index) && <Image src={item.image} alt={item.alt} fill
              sizes="(max-width: 760px) 100vw, (max-width: 1440px) 55vw, 780px"
              preload={index === 0} loading={index === 0 ? undefined : "lazy"} />}
          </div>)}
        </div>
        <div className="hero-scene-caption">
        <div className="reference-hero-copy">
          <h2>{slide.title.join("")}</h2>
        </div>
        </div>
      </div>
      <div className="reference-hero-controls">
        <div role="tablist" aria-label="サービスを選ぶ" className="reference-hero-tabs"
          onFocusCapture={() => setPaused(true)}>
          {slides.map((item, index) => <button key={item.label}
            ref={(element) => { tabs.current[index] = element; }}
            id={`hero-tab-${index}`} role="tab" aria-controls="hero-panel"
            aria-selected={active === index} tabIndex={active === index ? 0 : -1}
            onClick={() => { setActive(index); setPaused(true); }}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % slides.length;
              else if (event.key === "ArrowLeft") next = (index + slides.length - 1) % slides.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = slides.length - 1;
              else return;
              event.preventDefault();
              setActive(next);
              setPaused(true);
              tabs.current[next]?.focus();
            }}>
            <span>0{index + 1}</span><strong>{item.label}</strong>
          </button>)}
        </div>
        <button className="hero-motion-toggle"
          aria-label={paused || reducedMotion ? "自動切替を再生" : "自動切替を停止"}
          aria-pressed={paused || reducedMotion} disabled={reducedMotion}
          onClick={() => setPaused(!paused)}>
          {paused || reducedMotion ? <Play size={16} /> : <Pause size={16} />}
          <span>{reducedMotion ? "手動切替" : paused ? "再生" : "停止"}</span>
        </button>
      </div>
    </section>
  </>;
}
