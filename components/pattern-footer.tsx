import { ArrowUp, ArrowUpRight, BriefcaseBusiness, Layers3, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import { site } from "@/lib/site";

const links = [["はじめに", "introduction"], ["サービス", "services"], ["進め方", "strengths"], ["パッケージ", "packages"], ["制作実績", "works"], ["よくあるご質問", "faq"]];

export function PatternFooter() {
  return <footer className="pattern-footer">
    <div className="footer-closing"><div className="footer-vertical-lockup"><div className="footer-vertical-copy"><p>考える兄と、描く弟。<br />ふたりで、次の一歩へ。</p><a href="#introduction" className="footer-vertical-wordmark">大穂兄弟</a><p>想いをつなぐ、<br />デザインとテクノロジー。</p><span>デザインと開発</span></div></div><div className="footer-invitation"><span className="eyebrow">次の一歩をご一緒に</span><h2><span>お困りごとを、</span><span>ひとつ聞かせてください。</span></h2><p>つくる内容が決まっていなくても<span className="keep-phrase">大丈夫。</span><br />必要なことと、進める順番から整理します。</p><a href="#contact" className="catalog-cta">相談内容を伝える<ArrowUpRight size={17} /></a></div></div>
    <div className="footer-scene"><picture><source media="(max-width: 760px)" srcSet="/images/environments/footer-mobile-ja.webp" /><img src="/images/environments/footer-original-ja.webp" alt="お客様のために、時間をつくる。四人とボットが街角のベンチで協力する情景。" loading="lazy" width="2172" height="724" /></picture></div>
    <div className="footer-circle-links" aria-label="便利なリンク">
      <a className="icon-link-blue" href="#services"><Layers3 size={19} />サービス</a>
      <a className="icon-link-orange" href="#works"><BriefcaseBusiness size={19} />制作例</a>
      <a className="icon-link-purple" href="#contact"><MessageCircle size={19} />お問い合わせ</a>
      <a className="icon-link-green" href={site.contactUrl}><Mail size={19} />メール</a>
    </div>
    <p className="pattern-copyright">© {new Date().getFullYear()} 大穂兄弟. 無断転載を禁じます。</p>
    <p className="pattern-sample-note">パッケージ料金は税別です。三つの操作できる制作デモは架空の自主制作です。</p>
    <div className="footer-bottom-bar"><nav className="footer-nav-pill" aria-label="フッターナビゲーション">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}<a className="footer-contact-pill" href="#contact">相談する<ArrowUpRight size={16} /></a></nav><a className="footer-top-pill" href="#introduction" aria-label="ページの先頭へ"><ArrowUp size={18} /></a></div>
  </footer>;
}
