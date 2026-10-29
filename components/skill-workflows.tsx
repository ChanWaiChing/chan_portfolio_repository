"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ClipboardList, Code2, FileInput, FileText, Globe2, Layers3, Pause, PenTool, Play, Send, Sparkles } from "lucide-react";
import { BrandIcon } from "./brand-icons";
import { BotMascot } from "./bot-mascot";

const workflows = [
  { category: "ウェブ制作", title: "想いを整理して、使いやすいウェブサイトへ。", steps: [
    { title: "ヒアリング・要件を整理", icon: ClipboardList, color: "green" },
    { title: "フィグマで画面をデザイン", icon: PenTool, color: "pink" },
    { title: "ネクストでサイトを実装", icon: Globe2, color: "yellow" },
  ] },
  { category: "システム開発", title: "情報をつなぎ、日々の業務をもっと軽やかに。", steps: [
    { title: "フォームにデータを入力", icon: FileInput, color: "blue" },
    { title: "外部連携で必要な情報を連携", icon: Layers3, color: "green" },
    { title: "集計・通知を自動化", icon: Send, color: "purple" },
  ] },
  { category: "人工知能・業務改善", title: "人工知能と人の得意をつなぎ、制作をスムーズに。", steps: [
    { title: "キーワード・資料を追加", icon: FileText, color: "purple" },
    { title: "人工知能が構成・草案を作成", icon: Sparkles, color: "pink" },
    { title: "人が確認して公開", icon: Code2, color: "blue" },
  ] },
];
const outerTools = [
  { name: "ネクスト", icon: "nextdotjs", color: "#182d40" }, { name: "リアクト", icon: "react", color: "#147b9a" }, { name: "タイプスクリプト", icon: "typescript", color: "#3178c6" },
  { name: "フィグマ", icon: "figma", color: "#8553c8" }, { name: "パイソン", icon: "python", color: "#3572a5" }, { name: "ワードプレス", icon: "wordpress", color: "#21759b" },
  { name: "ノード", icon: "nodedotjs", color: "#48833d" }, { name: "画面・体験設計", icon: "ui", color: "#b14d87" },
] as const;
const innerTools = [
  { name: "アイオーエス", icon: "apple", color: "#253546" }, { name: "アンドロイド", icon: "android", color: "#32875c" }, { name: "外部連携", icon: "api", color: "#5e5ca6" },
  { name: "人工知能", icon: "ai", color: "#ba8220" }, { name: "ギット", icon: "git", color: "#d45c3d" },
] as const;

export function SkillWorkflows({ onSelectCategory }: { onSelectCategory: (category: string) => void }) {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const universe = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (universe.current) observer.observe(universe.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return <div className="workflow-skills" aria-labelledby="skills-title">
    <div className="workflow-heading"><span>技術のご紹介</span><h3 id="skills-title">仕事の流れに、<br />技術を組み合わせる。</h3><p>ウェブ制作・システム開発・人工知能活用の具体的な組み合わせです。<br />各カードから、関連する制作範囲を確認できます。</p></div>
    <div className="workflow-grid">{workflows.map(workflow => <a className="workflow-card luminous-card" href="#packages" key={workflow.category} onClick={() => onSelectCategory(workflow.category)}>
      <div className="workflow-diagram"><ol>{workflow.steps.map(({ title, icon: Icon, color }, index) => <li key={title}>
        <span className={`workflow-node node-${color}`}><Icon size={23} strokeWidth={1.8} /></span><span>{title}</span>
        <span className="workflow-step-number" aria-hidden="true">0{index + 1}</span>
      </li>)}</ol></div>
      <div className="workflow-outcome"><span>{workflow.category} / 活用イメージ</span><h4>{workflow.title}</h4><span className="workflow-detail">関連するパッケージを見る<ArrowRight size={17} /></span></div>
    </a>)}</div>
    <div className="workflow-all"><a href="#packages" onClick={() => onSelectCategory("すべて")}>すべてのパッケージを見る<ArrowRight size={20} /></a></div>
    <div ref={universe} className="skill-tool-universe" data-paused={paused || reducedMotion} data-offscreen={!visible}>
      <div className="skill-universe-copy"><span>デザインと開発、人工知能の活用</span><h3>アイデアに合わせて、<br />スキルを自在に。</h3><p>ひとつの技術に縛られず、目的から考える。<br />デザインと開発、人工知能の得意を組み合わせて、<br />使いやすい仕組みを一緒につくります。</p><ul>{[...outerTools, ...innerTools].map(({ name, icon, color }) => <li key={name} title={name}><BrandIcon name={icon} width={24} height={24} style={{ color }} role="img" aria-label={name} /></li>)}</ul><small>技術・ツールは要件と運用体制に合わせて選定します。</small></div>
      <div className="skill-orbit-stage" aria-hidden="true">
        {[outerTools, innerTools].map((tools, ring) => <div key={ring} className={`skill-orbit-ring orbit-ring-${ring}`} style={{ "--orbit-count": tools.length } as CSSProperties}>{tools.map(({ name, icon, color }, index) => <div className="skill-orbit-spoke" key={name} style={{ "--orbit-index": index } as CSSProperties}><div className="skill-tool-badge" title={name}><BrandIcon name={icon} width={34} height={34} style={{ color }} aria-hidden="true" /></div></div>)}</div>)}
        <BotMascot variant="mint" className="skill-orbit-bot" />
      </div>
      <button className="skill-motion-control" type="button" disabled={reducedMotion} aria-pressed={paused || reducedMotion} aria-label={paused || reducedMotion ? "スキルアニメーションを再生" : "スキルアニメーションを停止"} onClick={() => setPaused(!paused)}>{paused || reducedMotion ? <Play size={15} /> : <Pause size={15} />}<span>{reducedMotion ? "動きを抑えています" : paused ? "アニメーションを再生" : "アニメーションを停止"}</span></button>
    </div>
  </div>;
}
