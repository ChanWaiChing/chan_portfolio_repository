"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Code2, Copy, Layers3, Menu, Minus, PenTool, Plus, Search, Sparkles, X } from "lucide-react";
import { HeroShowcase } from "./hero-showcase";
import { Robot } from "./robot";
import { categories, portfolioItems, servicePackages, type PortfolioItem, type ServicePackage } from "@/lib/catalog";
import { site } from "@/lib/site";

const navigation = [["はじめに", "introduction"], ["サービス・スキル", "services"], ["私たちの強み", "strengths"], ["パッケージ", "packages"], ["ポートフォリオ", "works"], ["よくあるご質問", "faq"]];
const skills = ["Next.js", "React", "TypeScript", "Node.js", "Python", "Figma", "WordPress", "UI / UX", "iOS / Android", "Generative AI"];
const scope = [
  { icon: Layers3, title: "ITコンサルティング", en: "PLAN", text: "事業や業務の「こうしたい」を整理し、要件定義・技術選定から実現の道筋を描きます。", tags: ["課題整理", "要件定義", "技術選定"] },
  { icon: PenTool, title: "デザイン・UI / UX", en: "DESIGN", text: "見た目の美しさと使いやすさを一緒に考え、ブランドと利用者に合う体験を設計します。", tags: ["Web・LP", "アプリUI", "ブランド設計"] },
  { icon: Code2, title: "Web・システム開発", en: "BUILD", text: "Webサイトから業務システム、モバイルまで。保守性と拡張性を大切に実装します。", tags: ["Webアプリ", "EC・CMS", "業務システム"] },
  { icon: Sparkles, title: "AI活用・継続改善", en: "GROW", text: "日々の業務のAI活用から、公開後の保守・改善まで。つくった先も一緒に考えます。", tags: ["生成AI", "業務自動化", "運用・改善"] },
];
const faqs = [
  ["まだアイデアがまとまっていなくても相談できますか？", "はい。「こんなことができたら」という段階からご相談ください。目的や現在の課題を聞きながら、必要なことと優先順位を一緒に整理します。"],
  ["デザインだけ、開発だけの依頼もできますか？", "はい。企画から開発までの一括対応はもちろん、デザインや実装、既存サイトの改善など、必要な範囲からご相談いただけます。"],
  ["費用や制作期間はどのくらいですか？", "ご依頼の範囲・機能・スケジュールを確認して、個別にお見積もりします。掲載中のパッケージ金額と期間は表示確認用のサンプルであり、正式な提供条件ではありません。"],
  ["掲載されている制作例は実際の実績ですか？", "現在の30件は、今後コンテンツを追加するために用意した架空のサンプルです。実在するクライアントや納品実績を示すものではありません。"],
  ["公開後の運用や改善もお願いできますか？", "はい。保守・運用、機能追加、使いやすさの改善まで、必要な支援と進め方をご相談いただけます。"],
  ["お問い合わせフォームから直接メールが送信されますか？", "内容を確認した後、ご自身のメールアプリを開いて送信する方式です。サイトからの自動送信や入力内容の保存は行いません。メールアプリが使えない場合は内容をコピーできます。"],
];

function Heading({ label, title, text }: { label: string; title: string; text?: string }) {
  return <div className="content-heading"><span>{label}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}
function Pagination({ page, total, size, onChange, label }: { page: number; total: number; size: number; onChange: (page: number) => void; label: string }) {
  const pages = Math.max(1, Math.ceil(total / size));
  if (pages === 1) return null;
  return <nav className="catalog-pagination" aria-label={label}>
    <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="前のページ"><ChevronLeft size={17} /></button>
    {Array.from({ length: pages }, (_, i) => <button type="button" key={i} aria-label={`${i + 1}ページ目`} aria-current={page === i + 1 ? "page" : undefined} onClick={() => onChange(i + 1)}>{i + 1}</button>)}
    <button type="button" disabled={page === pages} onClick={() => onChange(page + 1)} aria-label="次のページ"><ChevronRight size={17} /></button>
  </nav>;
}
function WorkVisual({ item }: { item: PortfolioItem }) {
  return <div className={`catalog-visual visual-${item.accent} visual-${item.kind}`} aria-hidden="true">
    <div className="visual-window"><div className="visual-chrome"><i /><i /><i /><span>{item.brand.toLowerCase()}.example</span></div>
      <div className="visual-content"><small>{item.category === "デザイン" ? "A LITTLE BETTER, EVERY DAY." : "DESIGNED FOR WHAT’S NEXT."}</small><strong>{item.brand}</strong>
        {item.kind === "dashboard" ? <div className="visual-chart">{[35, 65, 48, 86, 57, 95, 76].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div> : <><span className="visual-line" /><span className="visual-line short" /><div className="visual-shapes"><i /><b /><em /></div></>}
      </div>
    </div><span className="visual-caption">CONCEPT / {item.id.slice(-2)}</span>
  </div>;
}

export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const [packageCategory, setPackageCategory] = useState("すべて");
  const [workCategory, setWorkCategory] = useState("すべて");
  const [query, setQuery] = useState("");
  const [packagePage, setPackagePage] = useState(1);
  const [workPage, setWorkPage] = useState(1);
  const [detail, setDetail] = useState<{ kind: "package"; item: ServicePackage } | { kind: "work"; item: PortfolioItem } | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("まずは相談したい");
  const [message, setMessage] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const dialog = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const resultSummary = useRef<HTMLParagraphElement>(null);
  const workSummary = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!detail && !menu) return;
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const container = detail ? dialog.current : menuRef.current;
    container?.querySelector<HTMLElement>("button,a[href]")?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setDetail(null); setMenu(false); }
      if (event.key !== "Tab") return;
      const elements = container?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]');
      if (!elements?.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && (document.activeElement === first || !container?.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !container?.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", key); opener?.focus({ preventScroll: true }); };
  }, [detail, menu]);

  const filteredPackages = servicePackages.filter(item => packageCategory === "すべて" || item.category === packageCategory);
  const filteredWorks = portfolioItems.filter(item => (workCategory === "すべて" || item.category === workCategory) && `${item.title} ${item.brand} ${item.technologies.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  const draft = `【プロジェクトのご相談】\n\nお名前：${name}\nメールアドレス：${email}\n会社・屋号：${company || "未入力"}\n相談したいこと：${topic}\n\n${message}`;
  const mailHref = `mailto:cbnbc07@gmail.com?subject=${encodeURIComponent(`【ご相談】${topic} / ${name}`)}&body=${encodeURIComponent(draft)}`;
  const changePackagePage = (page: number) => { setPackagePage(page); resultSummary.current?.focus(); };
  const changeWorkPage = (page: number) => { setWorkPage(page); workSummary.current?.focus(); };
  const consult = (title: string) => {
    setTopic(title); setReviewed(false); setDetail(null);
    requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "instant" });
      document.getElementById("contact-topic")?.focus({ preventScroll: true });
    });
  };

  return <div className="portfolio-site">
    <a className="skip-link" href="#main">本文へスキップ</a>
    <header className="site-header">
      <a href="#introduction" className="wordmark" aria-label="大穂兄弟 BROTHERS トップ"><svg className="brand-symbol" viewBox="0 0 80 30" aria-hidden="true"><path d="M5 23C15 23 17 5 27 5S38 24 47 24 58 8 67 8" fill="none" stroke="#1767d4" strokeWidth="5" strokeLinecap="round" /><path d="M22 24C32 24 34 7 44 7S56 24 65 24 73 15 76 12" fill="none" stroke="#f27725" strokeWidth="4" strokeLinecap="round" /></svg><span className="brand-name">大穂兄弟<span>OHO BROTHERS</span></span></a>
      <div className="header-actions">
        {[["サービスを知る", "企画から運用まで、一貫して", "services", "green"], ["プロジェクトのご相談", "アイデアの段階から、お気軽に", "contact", "orange"], ["制作イメージを見る", "30件のサンプルをご紹介", "works", "blue"], ["パッケージを探す", "目的に合う入口を見つける", "packages", "navy"]].map(([title, sub, id, color]) => <a className={`header-pill pill-${color}`} href={`#${id}`} key={id}><span className="header-mini-bot"><Robot small /></span><span>{title}<small>{sub}</small></span><ChevronRight size={15} /></a>)}
      </div>
      <nav className="desktop-nav" aria-label="メインナビゲーション">{navigation.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <button className="menu-toggle" aria-label={menu ? "メニューを閉じる" : "メニューを開く"} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>
    {menu && <nav className="mobile-nav" ref={menuRef} id="mobile-menu" aria-label="モバイルナビゲーション">{[...navigation, ["お問い合わせ", "contact"]].map(([label, id], i) => <a href={`#${id}`} key={id} onClick={() => setMenu(false)}><span>0{i + 1}</span>{label}<ArrowUpRight /></a>)}<button onClick={() => setMenu(false)}>メニューを閉じる <X size={16} /></button></nav>}
    <main id="main">
      <section id="introduction" aria-label="はじめに"><HeroShowcase />
        <div className="content-section introduction-copy"><Heading label="INTRODUCTION" title="考える兄と、描く弟。" text="ひとりでは届かないところへ、ふたりなら。ITコンサルティング・開発とデザイン、それぞれの専門性をつなぐクリエイティブチームです。" />
          <div className="brothers-grid"><article><Code2 size={26} /><span>ENGINEERING / 兄</span><h3>考える、つなぐ、つくる。</h3><p>11年の実務経験をもとに、課題の整理から設計・開発・運用まで。事業と技術をつなぎます。</p></article><article><PenTool size={26} /><span>DESIGN / 弟</span><h3>想いを、伝わるデザインに。</h3><p>3年の実務経験をもとに、ブランドと使う人の気持ちに寄り添う、心地よい体験を考えます。</p></article></div>
        </div>
      </section>
      <section className="content-section content-pale" id="services"><Heading label="SERVICES & SKILLS" title="企画から、つくったその先まで。" text="必要なところから、柔軟に。デザインと技術をひとつの窓口で相談できます。" />
        <div className="scope-grid">{scope.map(({ icon: Icon, en, title, text, tags }, i) => <article className="scope-card" key={en}><div className="scope-top"><span>0{i + 1} / {en}</span><Icon size={29} /></div><h3>{title}</h3><p>{text}</p><ul>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
        <div className="skills-panel"><span>OUR TOOLBOX</span><h3>目的に合わせて、最適な選択を。</h3><ul>{skills.map(skill => <li key={skill}>{skill}</li>)}</ul><p>対応する技術・ツールは、要件と運用体制に合わせて選定します。</p></div>
      </section>
      <section className="content-section" id="strengths"><Heading label="WHY BROTHERS" title="得意をつなぐ。それが、私たちの強み。" text="こんなお悩みはありませんか？ その「どうしよう」から、一緒に考えます。" />
        <div className="strength-grid">{[
          ["別々の依頼先とのやりとりが大変", "窓口は、ひとつ。", "仕様とデザインの認識をそろえ、打ち合わせから制作までスムーズに進めます。"],
          ["見た目と使い勝手を両立したい", "ふたりの視点で、考える。", "事業・技術・デザインの視点を掛け合わせて、使いやすい体験をつくります。"],
          ["公開した後のことも相談したい", "長く使える、ものづくり。", "保守性・拡張性を大切に、運用と改善につながる設計を考えます。"],
        ].map(([challenge, title, text], i) => <article className="strength-card" key={title}><div className={`strength-photo strength-photo-${i}`} role="img" aria-label="チームで課題を考えるイメージ" /><div className="strength-body"><span>{challenge}</span><b>0{i + 1}</b><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        <div className="strength-banner"><div><span>DESIGN × TECHNOLOGY × BROTHERHOOD</span><h3>ふたりの得意が、<br />あなたの可能性になる。</h3><p>企画・デザイン・開発・運用を、同じゴールに向かって。</p><a href="#contact" className="catalog-cta">まずは、話してみる<ArrowRight size={18} /></a></div><Image src="/images/teamwork.png" alt="青とオレンジのパズルをつなぐ、ふたりのロボットのイメージ" width={600} height={400} sizes="(max-width:760px) 100vw, 50vw" /></div>
      </section>
      <section className="content-section content-pale" id="packages"><Heading label="SERVICE PACKAGES" title="今の「つくりたい」に、合うプランを。" text="小さな相談から、まとまった制作まで。目的に合わせたパッケージを探せます。" />
        <p className="sample-notice"><Sparkles size={17} />掲載中の20件は仮のサンプルです。金額・期間・内容は表示例で、正式なお見積もりではありません。</p>
        <div className="catalog-filters" role="group" aria-label="パッケージのカテゴリ">{categories.map(category => <button type="button" key={category} aria-pressed={packageCategory === category} onClick={() => { setPackageCategory(category); setPackagePage(1); }}>{category}</button>)}</div>
        <p className="catalog-summary" ref={resultSummary} tabIndex={-1} aria-live="polite">{filteredPackages.length}件中 {(packagePage - 1) * 6 + 1}〜{Math.min(packagePage * 6, filteredPackages.length)}件を表示 <span>全20パッケージ / SAMPLE</span></p>
        <div className="package-grid">{filteredPackages.slice((packagePage - 1) * 6, packagePage * 6).map((item, i) => <article className={`package-card package-tone-${i % 3}`} key={item.id}><div className="catalog-card-meta"><span>{item.category}</span><b>SAMPLE {item.id.slice(-2)}</b></div><h3>{item.title}</h3><p>{item.description}</p><ul>{item.deliverables.map(deliverable => <li key={deliverable}><Check size={15} />{deliverable}</li>)}</ul><div className="package-price"><small>参考表示・税込</small><strong>¥{item.price.toLocaleString("ja-JP")}<span>〜</span></strong><span>想定期間：{item.duration}</span></div><button className="catalog-outline-button" onClick={() => setDetail({ kind: "package", item })}>プランの詳細を見る<ArrowRight size={17} /></button></article>)}</div>
        <Pagination page={packagePage} total={filteredPackages.length} size={6} onChange={changePackagePage} label="パッケージのページ切り替え" />
      </section>
      <section className="content-section" id="works"><Heading label="PORTFOLIO" title="つくれるものは、ひとつじゃない。" text="ご相談のきっかけになる、デザインと開発の制作イメージをご紹介します。" />
        <p className="sample-notice">30件すべて架空のサンプル・制作コンセプトです。実在のクライアントや納品実績ではありません。</p>
        <div className="work-toolbar"><div className="catalog-filters" role="group" aria-label="ポートフォリオのカテゴリ">{categories.map(category => <button type="button" key={category} aria-pressed={workCategory === category} onClick={() => { setWorkCategory(category); setWorkPage(1); }}>{category}</button>)}</div><label className="catalog-search"><Search size={17} /><input type="search" aria-label="ポートフォリオを検索" placeholder="キーワードで探す" value={query} onChange={event => { setQuery(event.target.value); setWorkPage(1); }} /></label></div>
        <p className="catalog-summary" ref={workSummary} tabIndex={-1} aria-live="polite">{filteredWorks.length ? `${filteredWorks.length}件中 ${(workPage - 1) * 9 + 1}〜${Math.min(workPage * 9, filteredWorks.length)}件を表示` : "該当する制作イメージはありません"}<span>全30アイテム / SAMPLE</span></p>
        <div className="portfolio-grid">{filteredWorks.slice((workPage - 1) * 9, workPage * 9).map(item => <article className="portfolio-card" key={item.id}><button onClick={() => setDetail({ kind: "work", item })} aria-label={`${item.title} 詳細を見る`}><WorkVisual item={item} /><div className="portfolio-card-body"><div className="catalog-card-meta"><span>{item.category}</span><b>SAMPLE</b></div><h3>{item.title}</h3><p>{item.technologies.join(" / ")}</p><span className="portfolio-detail-link">制作イメージを見る<ArrowUpRight size={18} /></span></div></button></article>)}</div>
        {!filteredWorks.length && <div className="catalog-empty"><Search size={28} /><p>別のキーワードやカテゴリでお試しください。</p><button className="catalog-outline-button" onClick={() => { setQuery(""); setWorkCategory("すべて"); setWorkPage(1); }}>検索条件をリセット</button></div>}
        <Pagination page={workPage} total={filteredWorks.length} size={9} onChange={changeWorkPage} label="ポートフォリオのページ切り替え" />
      </section>
      <section className="content-section content-pale" id="faq"><Heading label="FAQ" title="気になること、先にお答えします。" /><div className="content-faq">{faqs.map(([question, answer], i) => <article key={question}><h3><button aria-expanded={faq === i} aria-controls={`faq-answer-${i}`} onClick={() => setFaq(faq === i ? null : i)}><span>Q.</span>{question}{faq === i ? <Minus size={18} /> : <Plus size={18} />}</button></h3><div id={`faq-answer-${i}`} hidden={faq !== i}><p>{answer}</p></div></article>)}</div></section>
      <section className="content-section" id="contact"><Heading label="CONTACT" title="そのアイデア、聞かせてください。" text="まだ、ふんわりした想いでも大丈夫。まずは、今の状況をお聞かせください。" />
        <div className="contact-layout"><aside className="contact-aside"><Image src="/images/teamwork.png" alt="ふたりのロボットがパズルをつなぐイメージ" width={600} height={400} sizes="(max-width:760px) 100vw, 35vw" /><h3>小さな相談が、<br />次の一歩になる。</h3><p>要件が決まっていなくても、お気軽に。<br />内容を整理するところからご一緒します。</p><a href={site.contactUrl}>メールで直接相談する<ArrowUpRight size={16} /></a><p className="contact-method-note">このフォームはメール作成用です。内容を確認した後、メールアプリで送信してください。入力内容は保存されません。</p></aside>
          <form className="contact-form" onChange={() => { setReviewed(false); setCopyStatus(""); }} onSubmit={event => { event.preventDefault(); setReviewed(true); setCopyStatus(""); requestAnimationFrame(() => document.getElementById("contact-review")?.focus()); }}>
            <div className="form-row"><label htmlFor="contact-name">お名前 <span>必須</span></label><input id="contact-name" autoComplete="name" required maxLength={100} placeholder="山田 太郎" value={name} onChange={event => setName(event.target.value)} /></div>
            <div className="form-row"><label htmlFor="contact-email">メールアドレス <span>必須</span></label><input id="contact-email" type="email" autoComplete="email" required maxLength={200} placeholder="hello@example.com" value={email} onChange={event => setEmail(event.target.value)} /></div>
            <div className="form-row"><label htmlFor="contact-company">会社名・屋号 <small>任意</small></label><input id="contact-company" autoComplete="organization" maxLength={150} placeholder="株式会社サンプル" value={company} onChange={event => setCompany(event.target.value)} /></div>
            <div className="form-row"><label htmlFor="contact-topic">相談したいこと <span>必須</span></label><select id="contact-topic" value={topic} onChange={event => setTopic(event.target.value)}>{[...new Set(["まずは相談したい", "Webサイト制作", "デザイン / UI・UX", "Web・業務システム開発", "AI活用 / 業務改善", ...servicePackages.map(item => item.title), topic])].map(value => <option key={value}>{value}</option>)}</select></div>
            <div className="form-row"><label htmlFor="contact-message">ご相談内容 <span>必須</span></label><textarea id="contact-message" required minLength={10} maxLength={3000} rows={6} placeholder="実現したいこと、今のお困りごと、ご希望の時期などをお聞かせください。（10文字以上）" value={message} onChange={event => setMessage(event.target.value)} /></div>
            <label className="form-consent"><input type="checkbox" required />内容を確認し、メールアプリで送信することに同意します。</label>
            <button type="submit" className="catalog-cta contact-submit">内容を確認する<ArrowRight size={18} /></button>
            {reviewed && <div className="contact-review" id="contact-review" tabIndex={-1}><h3>送信前に、内容をご確認ください。</h3><p>まだ送信されていません。下のボタンでメールアプリを開き、送信してください。</p><pre>{draft}</pre><a className="catalog-cta" href={mailHref}>メールアプリで送る<ArrowUpRight size={17} /></a><button type="button" className="draft-copy" onClick={async () => { try { await navigator.clipboard.writeText(draft); setCopyStatus("内容をコピーしました。"); } catch { setCopyStatus("コピーできませんでした。上の内容を選択してコピーしてください。"); } }}><Copy size={15} />内容をコピー</button><span role="status">{copyStatus}</span></div>}
          </form>
        </div>
      </section>
    </main>
    <footer className="content-footer"><div className="content-footer-top"><a href="#introduction" className="wordmark"><span className="brand-name">大穂兄弟<span>OHO BROTHERS</span></span></a><p>兄弟の力で、アイデアをカタチに。</p><a href="#introduction">ページの先頭へ ↑</a></div><nav aria-label="フッターナビゲーション">{[...navigation, ["お問い合わせ", "contact"]].map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="content-footer-bottom"><span>パッケージ・ポートフォリオは仮のサンプルです。</span><span>© {new Date().getFullYear()} 大穂兄弟 / BROTHERS</span></div></footer>
    {detail && <div className="catalog-backdrop" onClick={event => { if (event.target === event.currentTarget) setDetail(null); }}><div className="catalog-dialog" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="catalog-dialog-title"><button className="catalog-dialog-close" aria-label="閉じる" onClick={() => setDetail(null)}><X size={22} /></button><span className="dialog-eyebrow">{detail.kind === "package" ? "SERVICE PACKAGE" : "DESIGN CONCEPT"} / SAMPLE</span><h2 id="catalog-dialog-title">{detail.item.title}</h2><p>{detail.item.description}</p>{detail.kind === "work" ? <><WorkVisual item={detail.item} /><p className="dialog-tags">{detail.item.technologies.join(" / ")}</p></> : <><ul className="dialog-deliverables">{detail.item.deliverables.map(value => <li key={value}><Check size={16} />{value}</li>)}</ul><div className="dialog-price">参考：¥{detail.item.price.toLocaleString("ja-JP")}〜（税込） / {detail.item.duration}</div></>}<p className="dialog-notice">{detail.kind === "work" ? "架空の自主制作コンセプトです。実在のクライアントや納品実績ではありません。" : "内容・金額・期間は仮の表示例です。正式な費用・納期は個別にご相談のうえ決定します。"}</p><button className="catalog-cta" onClick={() => consult(detail.item.title)}>この内容について相談する<ArrowRight size={18} /></button></div></div>}
  </div>;
}
