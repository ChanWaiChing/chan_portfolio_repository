"use client";

import Image from "next/image";
import { BotMascot } from "./bot-mascot";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";

type HeroSlide = { label: string; title: string[]; phase: string; note: string; steps: string[]; image?: string; alt?: string };
const slides: HeroSlide[] = [
  { label: "トータルサポート", title: ["考える兄と、", "描く弟。"], phase: "ひとつのチーム", note: "課題から、ひとつのチームで。", steps: ["目的を整理", "体験を設計", "仕組みを実装"] },
  { label: "情報技術コンサルティング", title: ["その課題に、", "進むべき道筋を。"], image: "/images/heroes/consulting-human-led.webp", alt: "二人の男性が図面と端末を使って企画を進め、二体の小さなボットが付箋とアイデアで支える制作イメージ", phase: "企画・設計", note: "何をつくるか、一緒に決める。", steps: ["課題・制約", "優先順位", "実行する計画"] },
  { label: "デザイン・開発", title: ["伝わるデザイン。", "使いやすい仕組み。"], image: "/images/heroes/design-human-led.webp", alt: "女性が紙の設計案を説明し、男性がパソコンを操作するかたわら、二体のボットが配色と資料を補助する制作イメージ", phase: "デザインと開発", note: "使う人と、運用する人のために。", steps: ["情報と導線", "操作できる試作", "デザインと実装"] },
  { label: "人工知能活用・運用改善", title: ["つくった先の、", "可能性を広げる。"], image: "/images/heroes/improvement-human-led.webp", alt: "男女が端末とチェックリストで改善を検討し、二体の小さなボットが材料と発想を補助する制作イメージ", phase: "改善・運用", note: "必要なところから、小さく改善。", steps: ["現状を確認", "改善を試す", "運用に引き継ぐ"] },
];

const SLIDE_INTERVAL_MS = 4000;

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const stage = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const slide = slides[active];

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
    if (paused || reducedMotion || !visible) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && document.body.style.overflow !== "hidden")
        setActive((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, visible]);

  return <>
    <div className="site-intro">
      小さなチームのための、デザインと開発
      <span>アイデアから、事業の次の一歩まで。</span>
    </div>
    <section ref={stage} className="reference-hero" aria-label="大穂兄弟のサービス" data-playing={!paused && !reducedMotion && visible} data-border-motion={!reducedMotion && visible}>
      <div className="hero-primary-copy"><p className="eyebrow">大穂兄弟のデザインと開発</p><h1 id="hero-title">デザインと開発を、<br /><span>ひとつのチームで。</span></h1><p>中小企業・小さなチームのウェブサイトと業務システムを、企画から公開後の改善まで。考える兄と描く弟が、事業の次の一歩を一緒につくります。</p><div className="hero-primary-actions"><a className="catalog-cta" href="#contact">プロジェクトを相談する<ArrowRight size={18} /></a><a className="catalog-outline-button" href="#selected-work">制作イメージを見る<ArrowRight size={18} /></a></div><p className="hero-experience">開発・情報技術相談 11年 <span>×</span> デザイン 3年</p></div>
      <div className="reference-hero-stage hero-scene-stage" id="hero-panel" role="tabpanel"
        aria-labelledby={`hero-tab-${active}`} tabIndex={0}
        onFocusCapture={() => setPaused(true)} data-slide={active}>
        <div className="hero-photo-deck">
          {slides.map((item, index) => <div className={`hero-photo-layer brand-scene-layer scene-${index}`} key={item.phase} data-active={index === active} aria-hidden={index !== active}>
            {item.image ? <div className="human-led-image"><div className="human-led-photo"><Image src={item.image} alt={item.alt || "人が主役の制作イメージ"} fill sizes="(max-width: 760px) 100vw, (max-width: 1440px) 55vw, 780px" loading={index === 1 ? "eager" : "lazy"} /></div><span className="hero-image-label">人とボットが協力する制作イメージ</span><div className="hero-photo-support">{item.steps.map((step, stepIndex) => <span key={step}><small>0{stepIndex + 1}</small>{step}</span>)}</div></div> : <div className="hero-brand-scene"><span className="scene-phase">{item.phase}</span><div className="scene-orbit-line" aria-hidden="true" /><div className="scene-brothers"><div><BotMascot variant="ocean" /><span>設計・開発</span></div><div><BotMascot variant="sunset" /><span>デザイン</span></div></div><strong>{item.note}</strong><div className="scene-steps">{item.steps.map((step, stepIndex) => <span key={step}><small>0{stepIndex + 1}</small>{step}</span>)}</div><small className="scene-note">大穂兄弟のブランドキャラクター</small></div>}
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
