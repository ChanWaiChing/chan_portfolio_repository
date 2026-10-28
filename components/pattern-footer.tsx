import { ArrowUp, ArrowUpRight, BriefcaseBusiness, Layers3, Mail, MessageCircle } from "lucide-react";
import { BotTeam } from "./bot-mascot";
import { site } from "@/lib/site";

const links = [["はじめに", "introduction"], ["サービス", "services"], ["私たちの強み", "strengths"], ["パッケージ", "packages"], ["ポートフォリオ", "works"], ["FAQ", "faq"]];

export function PatternFooter() {
  return <footer className="pattern-footer">
    <div className="footer-vertical-lockup"><div className="footer-vertical-copy"><p>考える兄と、描く弟。<br />ふたりの得意で、あなたの次の一歩を。</p><a href="#introduction" className="footer-vertical-wordmark">大穂兄弟</a><p>想いをつなぐ、<br />デザインとテクノロジー。</p><span>OHO BROTHERS</span></div></div>
    <BotTeam className="pattern-footer-bots" />
    <div className="footer-circle-links" aria-label="便利なリンク">
      <a className="icon-link-blue" href="#services" aria-label="サービス・スキル"><Layers3 size={19} /></a>
      <a className="icon-link-orange" href="#works" aria-label="ポートフォリオ"><BriefcaseBusiness size={19} /></a>
      <a className="icon-link-purple" href="#contact" aria-label="お問い合わせフォーム"><MessageCircle size={19} /></a>
      <a className="icon-link-green" href={site.contactUrl} aria-label="メールでお問い合わせ"><Mail size={19} /></a>
    </div>
    <p className="pattern-copyright">© {new Date().getFullYear()} 大穂兄弟 / OHO BROTHERS. All Rights Reserved.</p>
    <p className="pattern-sample-note">パッケージ・ポートフォリオは仮のサンプルです。</p>
    <div className="footer-bottom-bar"><nav className="footer-nav-pill" aria-label="フッターナビゲーション">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}<a className="footer-contact-pill" href="#contact">相談する<ArrowUpRight size={16} /></a></nav><a className="footer-top-pill" href="#introduction" aria-label="ページの先頭へ"><ArrowUp size={18} /></a></div>
  </footer>;
}
