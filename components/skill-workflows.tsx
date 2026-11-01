"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { WorkflowCarousel } from "./workflow-carousel";
import { BrandIcon } from "./brand-icons";
import { BotMascot } from "./bot-mascot";
import { useSiteMotion } from "./use-site-motion";

const outerTools = [
  { name: "ネクスト", icon: "nextdotjs", color: "#d4edff" }, { name: "リアクト", icon: "react", color: "#73d9f3" }, { name: "タイプスクリプト", icon: "typescript", color: "#81baff" },
  { name: "フィグマ", icon: "figma", color: "#c3a0ff" }, { name: "パイソン", icon: "python", color: "#87c5ef" }, { name: "ワードプレス", icon: "wordpress", color: "#83cbe8" },
  { name: "サーバー側開発", icon: "nodedotjs", color: "#9ed38e" }, { name: "画面と使い心地の設計", icon: "ui", color: "#f3a2d5" },
] as const;
const innerTools = [
  { name: "アイオーエス", icon: "apple", color: "#d8e9f6" }, { name: "アンドロイド", icon: "android", color: "#8bd6b0" }, { name: "外部連携", icon: "api", color: "#b3b0ff" },
  { name: "AI", icon: "ai", color: "#f3ce83" }, { name: "ギット", icon: "git", color: "#ffa48b" },
] as const;


export function SkillWorkflows({ onSelectCategory, showToolUniverse = true }: { onSelectCategory: (category: string) => void; showToolUniverse?: boolean }) {
  const [paused, setPaused] = useState(false);
  const motionEnabled = useSiteMotion();
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

  return <div className="workflow-skills mt-0" aria-labelledby="skills-title">
    <div className="workflow-heading mx-auto mb-9 max-w-[780px] text-center max-[760px]:text-left [&>span]:text-[#9edaff] [&>h2]:my-3 [&>h2]:text-[clamp(30px,3.4vw,46px)] [&>h2]:text-[#e5f3ff] [&>p]:text-[#bfd4ed]"><span>技術のご紹介</span><h2 id="skills-title">仕事の流れに、<br />技術を組み合わせる</h2><p>ウェブ制作・システム開発・AI活用の具体的な組み合わせです<br />各カードから、関連する制作範囲を確認できます</p></div>
    <WorkflowCarousel onSelectCategory={onSelectCategory} />
    <div className="workflow-all"><a className="border-[#749cbb70] bg-[#132841] text-[#ccecff] shadow-[0_3px_0_#07162a] hover:border-[#a9dfff] hover:bg-[#1d3955]" href="#packages" onClick={() => onSelectCategory("すべて")}>すべてのパッケージを見る<ArrowRight size={20} /></a></div>
    {showToolUniverse && <div ref={universe} className="skill-tool-universe border-[#7ba6ce66] bg-[linear-gradient(135deg,#10233be8,#17213ce8_55%,#0c1b31e8)] shadow-[inset_0_1px_0_#c1e8ff14,0_16px_48px_#02081833]" data-paused={paused || reducedMotion || !motionEnabled} data-offscreen={!visible}>
      <div className="skill-universe-copy [&>span]:text-[#98dcff] [&>h3]:text-[#e6f3ff] [&>p]:text-[#c3d9ee] [&>small]:text-[#9fb9d3] [&_li]:border-[#779bc059] [&_li]:bg-[#10223bd9]"><span>デザインと開発、AIの活用</span><h3>アイデアに合わせて、<br />スキルを自在に</h3><p>ひとつの技術に縛られず、目的から考える。<br />デザインと開発、AIの得意を組み合わせて、<br />使いやすい仕組みを一緒につくります。</p><ul>{[...outerTools, ...innerTools].map(({ name, icon, color }) => <li key={name} title={name}><BrandIcon name={icon} width={24} height={24} style={{ color }} role="img" aria-label={name} /></li>)}</ul><small>技術・ツールは要件と運用体制に合わせて選定します。</small></div>
      <div className="skill-orbit-stage" aria-hidden="true">
        {[outerTools, innerTools].map((tools, ring) => <div key={ring} className={`skill-orbit-ring orbit-ring-${ring}`} style={{ "--orbit-count": tools.length } as CSSProperties}>{tools.map(({ name, icon, color }, index) => <div className="skill-orbit-spoke" key={name} style={{ "--orbit-index": index } as CSSProperties}><div className="skill-tool-badge border border-solid border-[#8db6da66] bg-[#142841ed] shadow-[inset_0_1px_0_#d8f3ff14,0_6px_24px_#020b1d55,0_0_20px_#83c9ff0d]" title={name}><BrandIcon name={icon} width={34} height={34} style={{ color }} aria-hidden="true" /></div></div>)}</div>)}
        <BotMascot variant="mint" className="skill-orbit-bot" />
      </div>
      <button className="skill-motion-control border-[#87b3da70] bg-[#142a45] text-[#c9eaff] shadow-[0_3px_0_#07162a] hover:border-[#b6e7ff] hover:bg-[#203b5c] hover:text-white" type="button" disabled={reducedMotion} aria-pressed={paused || reducedMotion} aria-label={paused || reducedMotion ? "スキルアニメーションを再生" : "スキルアニメーションを停止"} onClick={() => setPaused(!paused)}>{paused || reducedMotion ? <Play size={15} /> : <Pause size={15} />}<span>{reducedMotion ? "動きを抑えています" : paused ? "アニメーションを再生" : "アニメーションを停止"}</span></button>
    </div>}
  </div>;
}
