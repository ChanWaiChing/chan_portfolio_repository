"use client";

import Image from "next/image";
import { BrandWordmark } from "./brand-wordmark";
import { portfolioItems, portfolioCategories, type PortfolioProject } from "@/lib/projects";
import { useEffect, useRef, useState } from "react";
import { trackInteraction } from "@/lib/interaction-events";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Code2, Layers3, Menu, PenTool, Search, Sparkles, X } from "lucide-react";
import { PortfolioArtwork } from "./portfolio-artwork";
import { EvidenceNotes } from "./evidence-notes";
import { PackageEntryDetails } from "./package-entry-details";
import { DesignWalkthrough } from "./design-walkthrough";
import { PackageThumbnail } from "./package-thumbnail";
import { PackagePlanDetails } from "./package-plan-details";
import { CategoryFilters } from "./category-filters";
import { HeroShowcase } from "./hero-showcase";
import { ContactExpectations, ServiceEntrances, WorkingProcess } from "./brand-story";
import { ConceptDemo } from "./concept-demo";
import { ProfessionalProfile } from "./professional-profile";
import { SkillWorkflows } from "./skill-workflows";
import { PatternFooter } from "./pattern-footer";
import { ContactForm } from "./contact-form";
import { ContactMethods } from "./contact-methods";
import { FaqSection } from "./faq-section";
import { BotMascot } from "./bot-mascot";
import { categories, demoItems, servicePackages, type PortfolioItem, type ServicePackage } from "@/lib/catalog";

const navigation = [["はじめに", "introduction"], ["サービス・スキル", "services"], ["進め方", "strengths"], ["パッケージ", "packages"], ["ポートフォリオ", "works"], ["よくあるご質問", "faq"]];
const scope = [
  { icon: Layers3, title: "情報技術コンサルティング", en: "企画・設計", text: "事業や業務の「こうしたい」を整理し、要件定義・技術選定から実現の道筋を描きます。", tags: ["課題整理", "要件定義", "技術選定"] },
  { icon: PenTool, title: "デザインと画面と使い心地の設計", en: "デザイン", text: "見た目の美しさと使いやすさを一緒に考え、ブランドと利用者に合う体験を設計します。", tags: ["ウェブ・紹介ページ", "アプリ画面", "ブランド設計"] },
  { icon: Code2, title: "ウェブ・システム開発", en: "開発", text: "ウェブサイトから業務システム、モバイルまで。保守性と拡張性を大切に実装します。", tags: ["ウェブアプリ", "通販・更新システム", "業務システム"] },
  { icon: Sparkles, title: "人工知能活用・継続改善", en: "改善・運用", text: "日々の業務の人工知能活用から、公開後の保守・改善まで。つくった先も一緒に考えます。", tags: ["生成系の人工知能", "業務自動化", "運用・改善"] },
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
const WorkVisual = PortfolioArtwork;

export default function Portfolio({ directSend = false }: { directSend?: boolean }) {
  const [menu, setMenu] = useState(false);
  const [packageCategory, setPackageCategory] = useState("すべて");
  const [workCategory, setWorkCategory] = useState("すべて");
  const [query, setQuery] = useState("");
  const [packagePage, setPackagePage] = useState(1);
  const [workPage, setWorkPage] = useState(1);
  const [detail, setDetail] = useState<{ kind: "package"; item: ServicePackage } | { kind: "work"; item: PortfolioItem } | { kind: "project"; item: PortfolioProject } | null>(null);
  const [topic, setTopic] = useState("まずは相談したい");
  const [activeSection, setActiveSection] = useState("introduction");
  const [catalogReady, setCatalogReady] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const resultSummary = useRef<HTMLParagraphElement>(null);
  const workSummary = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const read = () => {
      const params = new URLSearchParams(location.search);
      const category = (key: string) => { const value = params.get(key); const aliases: Record<string,string> = { "Web制作": "ウェブ制作", "AI・業務改善": "人工知能・業務改善" }; return (key === "work" ? portfolioCategories : categories).find(item => item === (aliases[value || ""] || value)) || "すべて"; };
      const page = (key: string) => Math.max(1, Math.min(100, Math.floor(Number(params.get(key))) || 1));
      setPackageCategory(category("package")); setWorkCategory(category("work"));
      setQuery((params.get("q") || "").slice(0, 100));
      setPackagePage(page("pp")); setWorkPage(page("wp")); setCatalogReady(true);
    };
    read(); window.addEventListener("popstate", read);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: "-80px 0px -55% 0px", threshold: [0, .1, .5] });
    document.querySelectorAll("main > section[id]").forEach(section => observer.observe(section));
    return () => { observer.disconnect(); window.removeEventListener("popstate", read); };
  }, []);
  useEffect(() => {
    if (!catalogReady) return;
    const url = new URL(location.href);
    const values = { package: packageCategory === "すべて" ? "" : packageCategory, work: workCategory === "すべて" ? "" : workCategory, q: query, pp: packagePage === 1 ? "" : String(packagePage), wp: workPage === 1 ? "" : String(workPage) };
    Object.entries(values).forEach(([key, value]) => value ? url.searchParams.set(key, value) : url.searchParams.delete(key));
    history.replaceState(null, "", url);
  }, [catalogReady, packageCategory, workCategory, query, packagePage, workPage]);

  useEffect(() => {
    if (!detail && !menu) return;
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const container = detail ? dialog.current : menuRef.current;
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, footer, .site-header"));
    background.forEach(element => { element.inert = true; });
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
    return () => { background.forEach(element => { element.inert = false; }); document.body.style.overflow = overflow; document.removeEventListener("keydown", key); opener?.focus({ preventScroll: true }); };
  }, [detail, menu]);

  const filteredPackages = servicePackages.filter(item => packageCategory === "すべて" || item.category === packageCategory);
  const filteredWorks = portfolioItems.filter(item => (workCategory === "すべて" || item.category === workCategory) && `${item.title} ${item.description} ${item.technologies.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  useEffect(() => { setPackagePage(page => Math.min(page, Math.max(1, Math.ceil(filteredPackages.length / 8)))); setWorkPage(page => Math.min(page, Math.max(1, Math.ceil(filteredWorks.length / 8)))); }, [filteredPackages.length, filteredWorks.length]);
  const changePackagePage = (page: number) => { setPackagePage(page); resultSummary.current?.focus(); };
  const changeWorkPage = (page: number) => { setWorkPage(page); workSummary.current?.focus(); };
  const consult = (title: string) => {
    setTopic(title); setDetail(null); trackInteraction("contact_intent");
    requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "instant" });
      document.getElementById("contact-topic")?.focus({ preventScroll: true });
    });
  };

  return <div className="portfolio-site" onClickCapture={event => { if (event.target instanceof Element && event.target.closest('a[href="#contact"]')) trackInteraction("contact_intent"); }}>
    <a className="skip-link" href="#main">本文へスキップ</a>
    <header className="site-header">
      <BrandWordmark />
      <nav className="desktop-nav" aria-label="メインナビゲーション">{navigation.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}</nav>
      <a className="header-contact catalog-cta" href="#contact">相談する<ArrowUpRight size={16} /></a>
      <button className="menu-toggle" aria-label={menu ? "メニューを閉じる" : "メニューを開く"} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>
    {menu && <nav className="mobile-nav" ref={menuRef} id="mobile-menu" aria-label="モバイルナビゲーション">{[...navigation, ["お問い合わせ", "contact"]].map(([label, id], i) => <a href={`#${id}`} key={id} onClick={() => setMenu(false)}><span>0{i + 1}</span>{label}<ArrowUpRight /></a>)}<button onClick={() => setMenu(false)}>メニューを閉じる <X size={16} /></button></nav>}
    <main id="main">
      <section id="introduction" aria-label="はじめに"><HeroShowcase />
        <div className="content-section selected-work" id="selected-work"><Heading label="操作できる制作例" title="触ってわかる、3つの制作デモ。" text="商品検索・チーム管理・記録の三つの自主制作デモ。画面を触りながら、設計と実装の考え方をご確認ください。" /><EvidenceNotes /><p className="mobile-gallery-hint">横にスワイプして、三つのデモをご覧いただけます。 →</p><div className="portfolio-grid">{demoItems.map(item => <article className="portfolio-card luminous-card" key={item.id}><button onClick={() => { trackInteraction("concept_open", { id: item.id }); setDetail({ kind: "work", item }); }} aria-label={`${item.title} コンセプト詳細`}><WorkVisual item={item} /><div className="portfolio-card-body"><span className="eyebrow">{item.category} / 制作例</span><h3>{item.title}</h3><span className="portfolio-detail-link">デモと設計意図を見る<ArrowUpRight size={18} /></span></div></button></article>)}</div><a className="text-link" href="#works">制作実績を見る<ArrowRight size={17} /></a></div>
        <div className="content-section introduction-copy"><Heading label="プロフィール" title="事業を読み解き、世界へつなぐ。" text="経済学と投資・戦略の経験をもとに、多様なチームと新たな価値の創出を目指しています。" />
          <ProfessionalProfile />
        </div>
      </section>
      <section className="content-section content-pale" id="services"><Heading label="サービスと技術" title="今の課題から、入口を選ぶ。" text="中小企業・小さなチームのウェブサイトと業務の仕組みづくり。必要なところから一緒に考えます。" />
        <ServiceEntrances onConsult={consult} onBrowse={category => { setPackageCategory(category); setPackagePage(1); trackInteraction("service_browse", { id: category }); }} /><details className="capability-details"><summary>対応領域・技術の組み合わせを見る</summary><div className="scope-grid">{scope.map(({ icon: Icon, en, title, text, tags }, i) => <article className="scope-card" key={en}><div className="scope-top"><span>0{i + 1} / {en}</span><Icon size={29} /></div><h3>{title}</h3><p>{text}</p><ul>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
        </details><SkillWorkflows onSelectCategory={(category) => { setPackageCategory(category); setPackagePage(1); trackInteraction("service_browse", { id: category }); }} />
      </section>
      <section className="content-section" id="strengths"><Heading label="ご相談から公開まで" title="進め方が見えると、相談しやすい。" text="ご相談から公開・引き継ぎまで。各段階で確認することをそろえ、認識のずれを減らします。" /><WorkingProcess /></section>
      <section className="content-section content-pale" id="packages"><Heading label="制作パッケージ" title="具体的な制作範囲を、見てみる。" text="相談内容をイメージするためのパッケージ一覧です。正式な範囲・費用・期間は、ご相談のあとに決めます。" />
        <p className="sample-notice"><Sparkles size={17} />{servicePackages.length}のサービスから、ご希望に合う内容をお選びください。価格は税別です。各詳細で料金・制作期間・支援範囲をご確認いただけます。</p>
        <CategoryFilters items={servicePackages} selected={packageCategory} label="パッケージのカテゴリ" onChange={category => { setPackageCategory(category); setPackagePage(1); }} />
        <p className="catalog-summary" ref={resultSummary} tabIndex={-1} aria-live="polite">{filteredPackages.length}件中 {(packagePage - 1) * 8 + 1}〜{Math.min(packagePage * 8, filteredPackages.length)}件を表示 <span>全{servicePackages.length}パッケージ</span></p>
        <div className="package-grid">{filteredPackages.slice((packagePage - 1) * 8, packagePage * 8).map((item, i) => <article className={`package-card luminous-card package-tone-${i % 3}`} key={item.id}><PackageThumbnail item={item} /><div className="catalog-card-meta"><span>{item.category}</span><b>{item.plans.length === 4 ? "制作メニュー" : "三つのプラン"}</b></div><h3>{item.title}</h3><p>{item.description}</p><button className="catalog-outline-button" aria-label={`${item.title} プランの詳細を見る`} onClick={() => { trackInteraction("package_open", { id:item.id }); setDetail({ kind: "package", item }); }}>プランの詳細を見る<ArrowRight size={17} /></button></article>)}</div>
        <Pagination page={packagePage} total={filteredPackages.length} size={8} onChange={changePackagePage} label="パッケージのページ切り替え" />
      </section>
      <section className="content-section" id="works"><Heading label="制作実績" title="さまざまな事業に、伝わる体験を。" text="これまでに制作したウェブサイトや紹介ページをご覧いただけます。" />
        <p className="sample-notice">{portfolioItems.length}件の制作実績をご紹介します。各詳細から公開サイトをご覧いただけます。</p>
        <div className="work-toolbar"><CategoryFilters options={portfolioCategories} items={portfolioItems} selected={workCategory} label="ポートフォリオのカテゴリ" onChange={category => { setWorkCategory(category); setWorkPage(1); }} /><label className="catalog-search"><Search size={17} /><input type="search" aria-label="ポートフォリオを検索" placeholder="キーワードで探す" value={query} onChange={event => { setQuery(event.target.value); setWorkPage(1); }} /></label></div>
        <p className="catalog-summary" ref={workSummary} tabIndex={-1} aria-live="polite">{filteredWorks.length ? `${filteredWorks.length}件中 ${(workPage - 1) * 8 + 1}〜${Math.min(workPage * 8, filteredWorks.length)}件を表示` : "該当する制作実績はありません"}<span>全{portfolioItems.length}件の制作実績</span></p>
        <div className="portfolio-grid">{filteredWorks.slice((workPage - 1) * 8, workPage * 8).map(item => <article className="portfolio-card luminous-card" key={item.id}><button onClick={() => { trackInteraction("portfolio_open", { id: item.id }); setDetail({ kind: "project", item }); }} aria-label={`${item.title} 詳細を見る`}><div className="project-thumbnail"><Image src={item.thumbnail} alt={`${item.title}のサイト画面`} fill sizes="(max-width: 600px) 50vw, (max-width: 1099px) 50vw, 25vw" style={{ objectFit: "cover" }} /></div><div className="portfolio-card-body"><div className="catalog-card-meta"><span>{item.category}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="portfolio-detail-link">制作実績を見る<ArrowUpRight size={18} /></span></div></button></article>)}</div>
        {!filteredWorks.length && <div className="catalog-empty"><Search size={28} /><p>別のキーワードやカテゴリでお試しください。</p><button className="catalog-outline-button" onClick={() => { setQuery(""); setWorkCategory("すべて"); setWorkPage(1); }}>検索条件をリセット</button></div>}
        <Pagination page={workPage} total={filteredWorks.length} size={8} onChange={changeWorkPage} label="ポートフォリオのページ切り替え" />
      </section>
      <FaqSection directSend={directSend} />
      <section className="content-section" id="contact"><Heading label="お問い合わせ" title="そのアイデア、聞かせてください。" text="まだ、ふんわりした想いでも大丈夫。まずは、今の状況をお聞かせください。" />
        <div className="contact-layout"><aside className="contact-aside contact-overview"><div className="contact-brand-scene"><BotMascot variant="peach" /><div><span className="eyebrow">お問い合わせガイドのトモ</span><strong>まずは、今のお話から。</strong></div></div><div className="contact-overview-copy"><h3>小さな相談が、<br />次の一歩になる。</h3><p>要件が決まっていなくても、お気軽に。<br />内容を整理するところからご一緒します。</p><ContactMethods /></div></aside>
          <div className="contact-form-column"><ContactForm topic={topic} onTopic={setTopic} directSend={directSend} /></div>
        </div><div className="contact-followup"><ContactExpectations /></div></section></main>
    <PatternFooter />
    {detail && <div className="catalog-backdrop" onClick={event => { if (event.target === event.currentTarget) setDetail(null); }}><div className="catalog-dialog" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="catalog-dialog-title"><button className="catalog-dialog-close" aria-label="閉じる" onClick={() => setDetail(null)}><X size={22} /></button><span className="dialog-eyebrow">{detail.kind === "package" ? "サービスパッケージ" : detail.kind === "project" ? "制作実績" : "自主制作コンセプト / サンプル"}</span><h2 id="catalog-dialog-title">{detail.item.title}</h2><p>{detail.item.description}</p>{detail.kind === "project" ? <><div className="project-thumbnail project-preview"><Image src={detail.item.thumbnail} alt={`${detail.item.title}のサイト画面`} fill sizes="(max-width: 700px) 90vw, 700px" style={{ objectFit: "contain" }} /></div>{detail.item.technologies.length > 0 && <p className="dialog-tags">使用技術：{detail.item.technologies.join(" / ")}</p>}<a className="catalog-outline-button project-visit" href={detail.item.url} target="_blank" rel="noopener noreferrer">公開サイトを見る（新しいタブ）<ArrowUpRight size={18} /></a></> : detail.kind === "work" ? <><ConceptDemo key={detail.item.id} brand={detail.item.brand} /><DesignWalkthrough item={detail.item} />{!["もり", "ながれ", "日々、"].includes(detail.item.brand) && <WorkVisual item={detail.item} />}<p className="dialog-tags">{detail.item.technologies.join(" / ")}</p><div className="concept-brief"><h3>想定する課題</h3><p>{detail.item.challenge}</p><h3>設計のアプローチ</h3><p>{detail.item.approach}</p><h3>検証すること</h3><p>{detail.item.validation}</p></div></> : <><PackageEntryDetails item={detail.item} /><PackagePlanDetails item={detail.item} /></>}<p className="dialog-notice">{detail.kind === "work" ? "架空の自主制作コンセプトです。実在のクライアントや納品実績ではありません。" : detail.kind === "project" ? "掲載先の現在の表示は、制作時から変更されている場合があります。" : "掲載資料に基づくご案内です。正式な費用・納期・支援範囲は、お打ち合わせ後のお見積もりで確認します。"}</p><button className="catalog-cta" onClick={() => consult(detail.item.title)}>この内容について相談する<ArrowRight size={18} /></button></div></div>}
  </div>;
}
