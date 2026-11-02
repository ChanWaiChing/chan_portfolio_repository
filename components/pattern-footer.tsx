import { ArrowUp, BriefcaseBusiness, Layers3, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import { site } from "@/lib/site";
import { useSiteLanguage } from "./site-language";

const links = [["nav.about","about"],["nav.packages","packages"],["nav.works","works"],["nav.faq","faq"],["nav.contact","contact"]] as const;

export function PatternFooter() {
  const { language, text } = useSiteLanguage();
  const brandName = { ja: site.name, en: "OHO Brothers", "zh-CN": "大穗兄弟", "zh-HK": "大穗兄弟" }[language];
  const copy = language === "ja" ? { promise: "お客様のために、時間をつくる", upper: ["想いをつなぎ、", "次の一歩へ"], lower: "想いをつなぐ、デザインとテクノロジー", services: "デザインと開発", projects: "制作例", email: "メール", copyright: "無断転載を禁じます。", tax: "パッケージ料金は税別です。", useful: "便利なリンク" }
    : language === "en" ? { promise: "Making time for what matters to you", upper: ["Connecting ideas,", "moving forward"], lower: "Design and technology that bring ideas together", services: "Design and development", projects: "Our work", email: "Email", copyright: "All rights reserved.", tax: "Package prices exclude tax.", useful: "Quick links" }
      : language === "zh-CN" ? { promise: "为客户创造更多时间", upper: ["连接想法，", "迈向下一步"], lower: "让设计与技术连接想法", services: "设计与开发", projects: "作品案例", email: "电子邮件", copyright: "保留所有权利。", tax: "方案价格不含税。", useful: "快捷链接" }
        : { promise: "為客戶創造更多時間", upper: ["連繫想法，", "邁向下一步"], lower: "讓設計與科技連繫想法", services: "設計與開發", projects: "作品案例", email: "電郵", copyright: "保留所有權利。", tax: "方案價格未連稅。", useful: "快速連結" };
  return <footer className="pattern-footer">
    <figure className="footer-artwork mx-auto my-[26px] w-[calc(100%-64px)] max-w-[1480px] max-[760px]:w-[calc(100%-28px)]"><div className="footer-scene m-0 w-full"><Image src="/images/environments/footer-collaboration.webp" alt={copy.promise} fill unoptimized sizes="100vw" style={{ objectFit: "contain" }} /></div><figcaption className="mt-5 px-4 text-center font-heading text-[clamp(20px,2.2vw,32px)] leading-[1.7] font-bold tracking-[.05em] text-balance text-[#e1edff]">{copy.promise}</figcaption></figure>
    <div className="footer-circle-links" aria-label={copy.useful}>
      <a className="icon-link-blue" href="#packages"><Layers3 size={19} />{text("nav.packages")}</a>
      <a className="icon-link-orange" href="#works"><BriefcaseBusiness size={19} />{copy.projects}</a>
      <a className="icon-link-purple" href="#contact"><MessageCircle size={19} />{text("nav.contact")}</a>
      <a className="icon-link-green" href={site.contactUrl}><Mail size={19} />{copy.email}</a>
    </div>
    <div className="footer-end relative mx-auto mt-10 flex min-h-[220px] max-w-[1480px] flex-col items-center justify-center gap-8 px-6 max-[760px]:px-4">
      <div className="footer-vertical-lockup footer-brand self-start max-[999px]:ml-4 min-[1000px]:absolute min-[1000px]:top-1/2 min-[1000px]:left-14 min-[1000px]:-translate-y-1/2"><div className="footer-vertical-copy h-[220px] gap-4 max-[760px]:h-[200px]"><p>{copy.upper.map((part, i) => <span key={part}>{part}{i === 0 && <br />}</span>)}</p><a href="#introduction" className="footer-vertical-wordmark">大穂兄弟</a><p>{copy.lower}</p><span>{copy.services}</span></div></div>
      <div className="footer-end-details mx-auto w-full min-w-0 max-w-[760px] min-[1000px]:max-w-[min(760px,calc(100%_-_560px))]">
    <p className="pattern-copyright">© {new Date().getFullYear()} {brandName}{language === "en" ? "." : ""} {copy.copyright}</p>
    <p className="pattern-sample-note">{copy.tax}</p>
    <div className="footer-bottom-bar relative grid grid-cols-[56px_minmax(0,1fr)_56px] items-center gap-4 px-0 max-[760px]:grid-cols-[48px_minmax(0,1fr)_48px] max-[760px]:gap-2.5 max-[480px]:grid-cols-1 max-[480px]:pb-16"><nav className="footer-nav-pill col-start-2 flex flex-wrap max-[480px]:col-start-1 justify-center gap-1.5 rounded-[22px] border border-solid border-[#7899c14d] bg-[#0e1b35e6] p-2 shadow-[inset_0_1px_0_#cce9ff14,0_8px_28px_#02081733] backdrop-blur-[12px] max-[760px]:flex-1 max-[760px]:gap-1 max-[760px]:p-1.5" aria-label={text("footer.nav")}>{links.map(([key, id]) => <a className="inline-flex min-h-11 items-center rounded-[15px] border border-solid border-transparent px-4 py-2.5 text-[13px] text-[#c8dff6] no-underline transition-[background,border-color,box-shadow,color] duration-200 active:bg-[linear-gradient(135deg,#62caff20,#a08bff20)] hover:border-[#9edcff70] hover:bg-[linear-gradient(135deg,#62caff20,#a08bff20)] hover:text-[#f0fbff] hover:shadow-[inset_0_1px_0_#d1f3ff20,0_0_18px_#61b9ff1f] focus-visible:border-[#9edcff70] focus-visible:bg-[linear-gradient(135deg,#62caff20,#a08bff20)] focus-visible:text-[#f0fbff] max-[760px]:px-2.5 max-[760px]:py-2 max-[760px]:text-xs" key={id} href={`#${id}`}>{text(key)}</a>)}</nav><a className="footer-top-pill col-start-3 grid size-14 justify-self-start max-[480px]:absolute max-[480px]:right-0 max-[480px]:bottom-0 shrink-0 place-items-center rounded-full border border-solid border-[var(--tone-edge)] bg-[linear-gradient(135deg,var(--tone-top),var(--tone-bottom))] p-0 text-white shadow-[inset_0_1px_0_#ffffff70,0_4px_0_#083b8b,0_8px_20px_#0a63c72b] hover:bg-[linear-gradient(135deg,var(--tone-bottom),var(--tone-edge))] hover:shadow-[inset_0_1px_0_#ffffff90,0_4px_0_#083b8b,0_0_22px_#61b9ff66] focus-visible:bg-[linear-gradient(135deg,var(--tone-bottom),var(--tone-edge))] active:translate-y-0.5 max-[760px]:size-12" href="#introduction" aria-label={text("footer.top")}><ArrowUp size={18} /></a></div>
      </div>
    </div>
  </footer>;
}
