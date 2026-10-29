import { ArrowUpRight, ChartNoAxesCombined, Globe2, GraduationCap } from "lucide-react";
import { BotMascot } from "./bot-mascot";

export function ProfessionalProfile() {
  return <article className="professional-profile" aria-labelledby="professional-profile-title">
    <aside className="profile-guide"><span className="eyebrow">プロフィールガイド</span><BotMascot variant="ocean" className="profile-guide-bot" /><strong>数字で捉え、<br />世界へつなぐ。</strong><p>アオが、経歴と得意分野をご紹介します。</p><small>ボットは紹介役のブランドキャラクターです。</small></aside>
    <div className="profile-biography"><span className="eyebrow">経済学・事業分析・グローバルな視点</span><h3 id="professional-profile-title">挑戦する人と、<br />事業の可能性を広げる。</h3>
      <div className="profile-education"><GraduationCap size={28} aria-hidden="true" /><p><strong>ボストン大学</strong><span>経済学の学位を取得</span></p></div>
      <p>現在はスターティングゲート・ファンドのアシスタントとして、チームとともに初期段階のプロジェクトを支援し、グローバル市場への進出を目指す起業家をサポートしています。</p>
      <p>シーメイトのコミュニティ運営にも貢献。ステラ・キャピタルとデロイト・コンサルティングでの経験を通じて、投資調査・リスク評価・企業戦略への理解を深めてきました。</p>
      <p>事業分析、財務モデリング、国境を越えた事業運営を強みに、多様なチームと協力し、イノベーションと新たな価値の創出に取り組んでいます。</p>
      <ul className="profile-specialties"><li><ChartNoAxesCombined size={19} aria-hidden="true" />事業分析・財務モデリング</li><li><Globe2 size={19} aria-hidden="true" />国際的な事業運営</li></ul>
      <a href="#contact" className="catalog-cta">ご相談・お問い合わせ<ArrowUpRight size={17} /></a>
    </div>
    <div className="profile-career"><h4>これまでの歩み</h4><ul><li><span>現在</span><strong>スターティングゲート・ファンド</strong><p>アシスタント／初期段階のプロジェクト支援</p></li><li><span>これまでの経験</span><strong>ステラ・キャピタル</strong><p>投資・事業に関わる経験</p></li><li><span>これまでの経験</span><strong>デロイト・コンサルティング</strong><p>調査・戦略に関わる経験</p></li><li><span>コミュニティ</span><strong>シーメイト</strong><p>コミュニティ運営に貢献</p></li></ul></div>
  </article>;
}
