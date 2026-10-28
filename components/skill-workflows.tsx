"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, ClipboardList, Code2, FileInput, FileText, Globe2, Layers3, Pause, PenTool, Play, Send, Sparkles } from "lucide-react";
import { BotMascot } from "./bot-mascot";

const workflows = [
  { category: "Web制作", title: "想いを整理して、使いやすいWebサイトへ。", steps: [
    { title: "ヒアリング・要件を整理", icon: ClipboardList, color: "green" },
    { title: "FigmaでUIをデザイン", icon: PenTool, color: "pink" },
    { title: "Next.jsでサイトを実装", icon: Globe2, color: "yellow" },
  ] },
  { category: "システム開発", title: "情報をつなぎ、日々の業務をもっと軽やかに。", steps: [
    { title: "フォームにデータを入力", icon: FileInput, color: "blue" },
    { title: "APIで必要な情報を連携", icon: Layers3, color: "green" },
    { title: "集計・通知を自動化", icon: Send, color: "purple" },
  ] },
  { category: "AI・業務改善", title: "AIと人の得意をつなぎ、制作をスムーズに。", steps: [
    { title: "キーワード・資料を追加", icon: FileText, color: "purple" },
    { title: "AIが構成・草案を作成", icon: Sparkles, color: "pink" },
    { title: "人が確認して公開", icon: Code2, color: "blue" },
  ] },
];
const outerTools = [
  ["Next.js", "N", "#24292f"], ["React", "⚛", "#149eca"], ["TypeScript", "TS", "#3178c6"],
  ["Figma", "Fi", "#a259ff"], ["Python", "Py", "#3572a5"], ["WordPress", "W", "#21759b"],
  ["Node.js", "JS", "#539e43"], ["UI / UX", "UI", "#f17bb1"],
];
const innerTools = [["iOS", "iOS", "#25292f"], ["Android", "A", "#36a86b"], ["API", "API", "#5e5ce6"], ["AI", "✦", "#e99a29"], ["Git", "Git", "#e45a3d"]];

export function SkillWorkflows({ onSelectCategory }: { onSelectCategory: (category: string) => void }) {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return <div className="workflow-skills" aria-labelledby="skills-title">
    <div className="workflow-heading"><span>SKILL INTRODUCTION</span><h3 id="skills-title">スキルをつなぐ。<br />できることが、広がる。</h3><p>企画・デザイン・開発から、AIを活かした業務改善まで。<br />あなたの「こうしたい」に合わせて、最適な流れを考えます。</p></div>
    <div className="workflow-grid">{workflows.map(workflow => <a className="workflow-card luminous-card" href="#packages" key={workflow.category} onClick={() => onSelectCategory(workflow.category)}>
      <div className="workflow-diagram"><ol>{workflow.steps.map(({ title, icon: Icon, color }, index) => <li key={title}>
        <span className={`workflow-node node-${color}`}><Icon size={23} strokeWidth={1.8} /></span><span>{title}</span>
        <span className="workflow-step-number" aria-hidden="true">0{index + 1}</span>
      </li>)}</ol></div>
      <div className="workflow-outcome"><span>{workflow.category} / 活用イメージ</span><h4>{workflow.title}</h4><span className="workflow-detail">関連するパッケージを見る<ArrowRight size={17} /></span></div>
    </a>)}</div>
    <div className="workflow-all"><a href="#packages" onClick={() => onSelectCategory("すべて")}>すべてのパッケージを見る<ArrowRight size={20} /></a></div>
    <div className="skill-tool-universe" data-paused={paused || reducedMotion}>
      <div className="skill-universe-copy"><span>DESIGN × ENGINEERING × AI</span><h3>アイデアに合わせて、<br />スキルを自在に。</h3><p>ひとつの技術に縛られず、目的から考える。<br />デザインと開発、AIの得意を組み合わせて、<br />使いやすい仕組みを一緒につくります。</p><ul>{[...outerTools, ...innerTools].map(([name]) => <li key={name}>{name}</li>)}</ul><small>技術・ツールは要件と運用体制に合わせて選定します。</small></div>
      <div className="skill-orbit-stage" aria-hidden="true">
        {[outerTools, innerTools].map((tools, ring) => <div key={ring} className={`skill-orbit-ring orbit-ring-${ring}`} style={{ "--orbit-count": tools.length } as CSSProperties}>{tools.map(([name, mark, color], index) => <div className="skill-orbit-spoke" key={name} style={{ "--orbit-index": index } as CSSProperties}><div className="skill-tool-badge"><strong style={{ color }}>{mark}</strong><span>{name}</span></div></div>)}</div>)}
        <BotMascot variant="mint" className="skill-orbit-bot" />
      </div>
      <button className="skill-motion-control" type="button" disabled={reducedMotion} aria-pressed={paused || reducedMotion} aria-label={paused || reducedMotion ? "スキルアニメーションを再生" : "スキルアニメーションを停止"} onClick={() => setPaused(!paused)}>{paused || reducedMotion ? <Play size={15} /> : <Pause size={15} />}<span>{reducedMotion ? "動きを抑えています" : paused ? "アニメーションを再生" : "アニメーションを停止"}</span></button>
    </div>
  </div>;
}
