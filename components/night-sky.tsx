"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useSiteMotion } from "./use-site-motion";

// Seeded random values keep the server and client skies identical, without rows.
function createStars() {
 let seed = 0x61c89f23;
 const random = () => {
  seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
  return (seed >>> 0) / 4294967296;
 };
 return Array.from({ length: 140 }, () => ({
  x: random() * 100, y: random() * 100,
  size: 1.3 + random() ** 3 * 3,
  duration: 2.4 + random() * 3, delay: -random() * 9,
 }));
}
const stars = createStars();
// Handle (Alkaid to Megrez), followed by the bowl, in a familiar sky orientation.
const bigDipper = [[24,93],[75,68],[119,78],[164,98],[228,118],[258,61],[193,46]];

/** One fixed sky serves every section without duplicating animated layers. */
export function NightSky() {
 const motionEnabled=useSiteMotion();
 const sky=useRef<HTMLDivElement>(null);
 const [visible,setVisible]=useState(true);
 useEffect(()=>{
  const update=()=>setVisible(!document.hidden);
  update();
  document.addEventListener("visibilitychange",update);
  return ()=>document.removeEventListener("visibilitychange",update);
 },[]);
 useEffect(() => {
  const element = sky.current;
  if (!element || !motionEnabled || !visible) return;
  let lastScroll = scrollY;
  let lastPulse = -Infinity;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const illuminate = () => {
   const distance = Math.abs(scrollY - lastScroll);
   if (distance < 40 || performance.now() - lastPulse < 2600) return;
   lastScroll = scrollY;
   lastPulse = performance.now();
   element.dataset.constellationPulse = 'true';
   timer = setTimeout(() => delete element.dataset.constellationPulse, 2400);
  };
  addEventListener('scroll', illuminate, { passive: true });
  return () => {
   removeEventListener('scroll', illuminate);
   clearTimeout(timer);
   delete element.dataset.constellationPulse;
  };
 }, [motionEnabled, visible]);
 return <div ref={sky} className="site-night-sky pointer-events-none fixed inset-0 z-0 isolate overflow-hidden" data-sky-motion={motionEnabled && visible} aria-hidden="true">
    <div className="night-sky" aria-hidden="true">
      <div className="milky-way" /><div className="sky-resonance" />
      <div className="night-stars">{stars.map((star, index) => <span key={index} className="night-star" style={{ left: star.x + '%', top: star.y + '%', '--star-size': star.size + 'px', '--star-duration': star.duration + 's', '--star-delay': star.delay + 's', '--echo-delay': Math.round(Math.hypot(star.x - 35, star.y - 25) * 12) + 'ms' } as CSSProperties} />)}</div>
      <svg className="big-dipper absolute top-[13%] left-[22%] w-[clamp(220px,21vw,300px)] overflow-visible max-[760px]:left-[24%] max-[760px]:w-[65vw]" viewBox="0 0 285 145" aria-hidden="true">
       <path d="M24 93 75 68 119 78 164 98 228 118 258 61 193 46 164 98" fill="none" stroke="#b6dbff" strokeWidth=".7" opacity=".28" />
       <path className="constellation-trace" d="M24 93 75 68 119 78 164 98 228 118 258 61 193 46 164 98" pathLength="1" fill="none" stroke="#c7edff" strokeWidth="1.3" />
       {bigDipper.map(([x,y], index) => <g key={index} className="dipper-star" style={{ '--star-duration': (3.4 + index * .3) + 's', '--star-delay': -index * .7 + 's' } as CSSProperties}>
        <circle className="constellation-halo" style={{ animationDelay: index * 110 + 'ms' }} cx={x} cy={y} r="11" fill="#91d8ff" />
        <circle cx={x} cy={y} r="7" fill="#9dcfff" opacity=".12" />
        <path d={'M' + (x-5) + ' ' + y + 'h10M' + x + ' ' + (y-5) + 'v10'} stroke="#d6eeff" strokeWidth=".7" opacity=".65" />
        <circle cx={x} cy={y} r={index === 5 || index === 6 ? 2 : 1.7} fill="#f0f8ff" />
       </g>)}
      </svg>
      <div className="night-meteors">{Array.from({ length: 8 }, (_, index) => <span key={index} className="night-meteor" style={{ left: `${24 + (index * 17) % 90}%`, top: `${2 + (index * 11) % 49}%`, "--meteor-duration": `${12 + (index % 4) * 2}s`, "--meteor-delay": `${-index * 1.7}s` } as CSSProperties} />)}</div>
    </div>
  </div>;
}
