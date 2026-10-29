import { Code2, Figma, Globe2, Layers3, Palette, Search, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Workflow } from "lucide-react";
import type { ServicePackage } from "@/lib/service-packages";

export function CatalogArtwork({ item }: { item: ServicePackage }) {
  const icons = item.category === "デザイン" ? [Palette,Figma] : item.category === "人工知能・業務改善" ? [Sparkles,Workflow] : item.title.includes("診断") ? [ShieldCheck,Search] : item.title.includes("通販") || item.title.includes("キューブ") ? [ShoppingBag,Layers3] : item.title.includes("アプリ開発") ? [Smartphone,Code2] : item.category === "ウェブ制作" ? [Globe2,Palette] : [Layers3,Code2];
  const Icon=icons[0], Secondary=icons[1];
  return <div className={`package-thumbnail catalog-artwork artwork-${item.category === "ウェブ制作" ? "web" : item.category === "デザイン" ? "design" : item.category === "システム開発" ? "system" : item.category === "人工知能・業務改善" ? "automation" : "consulting"}`} aria-hidden="true">
    <svg viewBox="0 0 360 220" className="package-artwork-svg" focusable="false"><rect x="26" y="23" width="308" height="165" rx="12" fill="#ffffffed" stroke="#fff"/><path d="M27 46h306" stroke="#e7eaf2"/>{[40,48,56].map(x=><circle key={x} cx={x} cy="35" r="2" fill="#c4cbda"/>)}<text x="316" y="38" textAnchor="end" fontSize="7" fill="var(--art-ink)">{item.category}</text><rect x="44" y="65" width="55" height="55" rx="15" fill="var(--art-tint)"/><g transform="translate(55 76)" color="var(--art-ink)"><Icon width={33} height={33}/></g><path d="M115 79h186m-186 12h186m-186 12h120" stroke="var(--art-ink)" strokeOpacity=".2" strokeWidth="4" strokeLinecap="round"/>{[0,1,2].map(i=><rect key={i} x={44+i*91} y="136" width="82" height="28" rx="5" fill={i===1?"var(--art-pop)":"var(--art-tint)"}/>)}<rect x="286" y="143" width="48" height="48" rx="13" fill="#fff" stroke="var(--art-tint)"/><g transform="translate(298 155)" color="var(--art-ink)"><Secondary width={24} height={24}/></g></svg><span className="artwork-caption">{item.title}</span>
  </div>;
}
