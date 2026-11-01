import { ArrowUp, BriefcaseBusiness, Layers3, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import { site } from "@/lib/site";

const links = [["紹介","about"],["パッケージ","packages"],["ポートフォリオ","works"],["FAQ","faq"],["お問い合わせ","contact"]];

export function PatternFooter() {
  return <footer className="pattern-footer">
    <figure className="footer-artwork mx-auto my-[26px] w-[calc(100%-64px)] max-w-[1480px] max-[760px]:w-[calc(100%-28px)]"><div className="footer-scene m-0 w-full"><Image src="/images/environments/footer-collaboration.webp" alt="兄弟と女性二人がボットとともにベンチで制作の相談をする情景" fill unoptimized sizes="100vw" style={{ objectFit: "contain" }} /></div><figcaption className="mt-5 px-4 text-center font-heading text-[clamp(20px,2.2vw,32px)] leading-[1.7] font-bold tracking-[.05em] text-balance text-[#e1edff]">お客様のために、時間をつくる</figcaption></figure>
    <div className="footer-circle-links" aria-label="便利なリンク">
      <a className="icon-link-blue" href="#packages"><Layers3 size={19} />パッケージ</a>
      <a className="icon-link-orange" href="#works"><BriefcaseBusiness size={19} />制作例</a>
      <a className="icon-link-purple" href="#contact"><MessageCircle size={19} />お問い合わせ</a>
      <a className="icon-link-green" href={site.contactUrl}><Mail size={19} />メール</a>
    </div>
    <div className="footer-end relative mx-auto mt-10 flex min-h-[220px] max-w-[1480px] flex-col items-center justify-center gap-8 px-6 max-[760px]:px-4">
      <div className="footer-vertical-lockup footer-brand self-start max-[999px]:ml-4 min-[1000px]:absolute min-[1000px]:top-1/2 min-[1000px]:left-14 min-[1000px]:-translate-y-1/2"><div className="footer-vertical-copy h-[220px] gap-4 max-[760px]:h-[200px]"><p>想いをつなぎ、<br />次の一歩へ</p><a href="#introduction" className="footer-vertical-wordmark">大穂兄弟</a><p>想いをつなぐ、<br />デザインとテクノロジー</p><span>デザインと開発</span></div></div>
      <div className="footer-end-details mx-auto w-full min-w-0 max-w-[760px] min-[1000px]:max-w-[min(760px,calc(100%_-_560px))]">
    <p className="pattern-copyright">© {new Date().getFullYear()} 大穂兄弟. 無断転載を禁じます。</p>
    <p className="pattern-sample-note">パッケージ料金は税別です。</p>
    <div className="footer-bottom-bar relative grid grid-cols-[56px_minmax(0,1fr)_56px] items-center gap-4 px-0 max-[760px]:grid-cols-[48px_minmax(0,1fr)_48px] max-[760px]:gap-2.5 max-[480px]:grid-cols-1 max-[480px]:pb-16"><nav className="footer-nav-pill col-start-2 flex flex-wrap max-[480px]:col-start-1 justify-center gap-1.5 rounded-[22px] border border-solid border-[#7899c14d] bg-[#0e1b35e6] p-2 shadow-[inset_0_1px_0_#cce9ff14,0_8px_28px_#02081733] backdrop-blur-[12px] max-[760px]:flex-1 max-[760px]:gap-1 max-[760px]:p-1.5" aria-label="フッターナビゲーション">{links.map(([label, id]) => <a className="inline-flex min-h-11 items-center rounded-[15px] border border-solid border-transparent px-4 py-2.5 text-[13px] text-[#c8dff6] no-underline transition-[background,border-color,box-shadow,color] duration-200 active:bg-[linear-gradient(135deg,#62caff20,#a08bff20)] hover:border-[#9edcff70] hover:bg-[linear-gradient(135deg,#62caff20,#a08bff20)] hover:text-[#f0fbff] hover:shadow-[inset_0_1px_0_#d1f3ff20,0_0_18px_#61b9ff1f] focus-visible:border-[#9edcff70] focus-visible:bg-[linear-gradient(135deg,#62caff20,#a08bff20)] focus-visible:text-[#f0fbff] max-[760px]:px-2.5 max-[760px]:py-2 max-[760px]:text-xs" key={id} href={`#${id}`}>{label}</a>)}</nav><a className="footer-top-pill col-start-3 grid size-14 justify-self-start max-[480px]:absolute max-[480px]:right-0 max-[480px]:bottom-0 shrink-0 place-items-center rounded-full border border-solid border-[var(--tone-edge)] bg-[linear-gradient(135deg,var(--tone-top),var(--tone-bottom))] p-0 text-white shadow-[inset_0_1px_0_#ffffff70,0_4px_0_#083b8b,0_8px_20px_#0a63c72b] hover:bg-[linear-gradient(135deg,var(--tone-bottom),var(--tone-edge))] hover:shadow-[inset_0_1px_0_#ffffff90,0_4px_0_#083b8b,0_0_22px_#61b9ff66] focus-visible:bg-[linear-gradient(135deg,var(--tone-bottom),var(--tone-edge))] active:translate-y-0.5 max-[760px]:size-12" href="#introduction" aria-label="ページの先頭へ"><ArrowUp size={18} /></a></div>
      </div>
    </div>
  </footer>;
}
