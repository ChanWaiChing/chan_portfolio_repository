"use client";

import Image from "next/image";
import { ProjectDetails } from "./project-details";
import { SectionLabel } from "./section-label";
import { BrandWordmark } from "./brand-wordmark";
import { portfolioItems, portfolioCategories, type PortfolioProject, type PortfolioMarket } from "@/lib/projects";
import { englishCategory } from "@/lib/portfolio-language";
import { PortfolioFields } from "./portfolio-fields";
import { fieldLabel, portfolioFields, type PortfolioField } from "@/lib/portfolio-fields";
import { PortfolioMarkets } from "./portfolio-markets";
import { useCatalogTransition } from "./use-catalog-transition";
import { useEffect, useRef, useState } from "react";
import { trackInteraction } from "@/lib/interaction-events";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Menu, Search, X } from "lucide-react";
import { PortfolioArtwork } from "./portfolio-artwork";
import { EvidenceNotes } from "./evidence-notes";
import { PackageEntryDetails } from "./package-entry-details";
import { DesignWalkthrough } from "./design-walkthrough";
import { TechnologyTags } from "./technology-tags";
import { PackageThumbnail } from "./package-thumbnail";
import { PackagePlanDetails } from "./package-plan-details";
import { CategoryFilters } from "./category-filters";
import { HeroShowcase } from "./hero-showcase";
import { ConceptDemo } from "./concept-demo";
import { BrotherIntroductions } from "./brother-introductions";
import { PatternFooter } from "./pattern-footer";
import { ContactForm } from "./contact-form";
import { ContactInformation } from "./contact-information";
import { FaqSection } from "./faq-section";
import { categories, servicePackages, type PortfolioItem, type ServicePackage } from "@/lib/catalog";

const CATALOG_PAGE_SIZE = 6;

const navigation = [["紹介","about"],["パッケージ","packages"],["ポートフォリオ","works"],["FAQ","faq"],["お問い合わせ","contact"]];
function Heading({ label, title, text }: { label: string; title: string; text?: string }) {
  return <div className="content-heading mx-auto mb-9 max-w-[780px] text-center max-[760px]:mb-7 max-[760px]:text-left"><SectionLabel>{label}</SectionLabel><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}
function Pagination({ page, total, size, onChange, label, english = false }: { page: number; total: number; size: number; onChange: (page: number) => void; label: string; english?: boolean }) {
  const pages = Math.max(1, Math.ceil(total / size));
  if (pages === 1) return null;
  return <nav className="catalog-pagination" aria-label={label}>
    <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label={english ? "Previous page" : "前のページ"}><ChevronLeft size={17} /></button>
    {Array.from({ length: pages }, (_, i) => <button type="button" key={i} aria-label={english ? `Page ${i + 1}` : `${i + 1}ページ目`} aria-current={page === i + 1 ? "page" : undefined} onClick={() => onChange(i + 1)}>{i + 1}</button>)}
    <button type="button" disabled={page === pages} onClick={() => onChange(page + 1)} aria-label={english ? "Next page" : "次のページ"}><ChevronRight size={17} /></button>
  </nav>;
}
const WorkVisual = PortfolioArtwork;

export default function Portfolio({ directSend = false }: { directSend?: boolean }) {
  const [menu, setMenu] = useState(false);
  const [packageCategory, setPackageCategory] = useState("すべて");
  const [workCategory, setWorkCategory] = useState("すべて");
  const [workMarket, setWorkMarket] = useState<PortfolioMarket>("japan");
  const [workField, setWorkField] = useState<PortfolioField | "all">("all");
  const [query, setQuery] = useState("");
  const [packagePage, setPackagePage] = useState(1);
  const [workPage, setWorkPage] = useState(1);
  const packageTransition = useCatalogTransition(packagePage, packageCategory);
  const workTransition = useCatalogTransition(workPage, `${workMarket}/${workField}/${workCategory}/${query}`);
  const [detail, setDetail] = useState<{ kind: "package"; item: ServicePackage } | { kind: "work"; item: PortfolioItem } | { kind: "project"; item: PortfolioProject } | null>(null);
  const [topic, setTopic] = useState("まずは相談したい");
  const [activeSection, setActiveSection] = useState("about");
  const [catalogReady, setCatalogReady] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const resultSummary = useRef<HTMLParagraphElement>(null);
  const workSummary = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const read = () => {
      const params = new URLSearchParams(location.search);
      const category = (key: string) => { const value = params.get(key); const aliases: Record<string,string> = { "Web制作": "ウェブ制作", "人工知能・業務改善": "AI・業務改善" }; return (key === "work" ? portfolioCategories : categories).find(item => item === (aliases[value || ""] || value)) || "すべて"; };
      const page = (key: string) => Math.max(1, Math.min(100, Math.floor(Number(params.get(key))) || 1));
      setPackageCategory(category("package")); setWorkCategory(category("work"));
      setWorkMarket(params.get("market") === "global" ? "global" : "japan");
      setWorkField(portfolioFields.find(field => field.id === params.get("field"))?.id || "all");
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
    const values = { field: workField === "all" ? "" : workField, market: workMarket === "global" ? "global" : "", package: packageCategory === "すべて" ? "" : packageCategory, work: workCategory === "すべて" ? "" : workCategory, q: query, pp: packagePage === 1 ? "" : String(packagePage), wp: workPage === 1 ? "" : String(workPage) };
    Object.entries(values).forEach(([key, value]) => value ? url.searchParams.set(key, value) : url.searchParams.delete(key));
    history.replaceState(null, "", url);
  }, [catalogReady, packageCategory, workMarket, workField, workCategory, query, packagePage, workPage]);

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

  const englishWorks = workMarket === "global";
  const globalDetail = detail?.kind === "project" && detail.item.market === "global";
  const filteredPackages = servicePackages.filter(item => packageCategory === "すべて" || item.category === packageCategory);
  const marketWorks = portfolioItems.filter(item => item.market === workMarket);
  const fieldWorks = marketWorks.filter(item => workField === "all" || item.field === workField);
  const filteredWorks = fieldWorks.filter(item => (workCategory === "すべて" || item.category === workCategory) && `${fieldLabel(item.field)} ${fieldLabel(item.field, true)} ${item.title} ${item.shortTitle || ""} ${(item.skills || []).join(" ")} ${item.description} ${item.scope} ${item.period} ${item.technologies.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  useEffect(() => { setPackagePage(page => Math.min(page, Math.max(1, Math.ceil(filteredPackages.length / CATALOG_PAGE_SIZE)))); setWorkPage(page => Math.min(page, Math.max(1, Math.ceil(filteredWorks.length / CATALOG_PAGE_SIZE)))); }, [filteredPackages.length, filteredWorks.length]);
  const changePackagePage = (page: number) => { packageTransition.prepare(page); setPackagePage(page); resultSummary.current?.focus({ preventScroll: true }); };
  const changeWorkPage = (page: number) => { workTransition.prepare(page); setWorkPage(page); workSummary.current?.focus({ preventScroll: true }); };
  const consult = (title: string) => {
    setTopic(title); setDetail(null); trackInteraction("contact_intent");
    requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "instant" });
      document.getElementById("contact-topic")?.focus({ preventScroll: true });
    });
  };

  return <div className="portfolio-site relative z-[1] bg-transparent text-[#e1edff]" onClickCapture={event => { if (event.target instanceof Element && event.target.closest('a[href="#contact"]')) trackInteraction("contact_intent"); }}>
    <a className="skip-link" href="#main">本文へスキップ</a>
    <header className="site-header">
      <BrandWordmark />
      <nav className="desktop-nav" aria-label="メインナビゲーション">{navigation.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}</nav>
      <a className="header-contact catalog-cta" href="#contact">相談する<ArrowUpRight size={16} /></a>
      <button className="menu-toggle" aria-label={menu ? "メニューを閉じる" : "メニューを開く"} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>
    {menu && <nav className="mobile-nav" ref={menuRef} id="mobile-menu" aria-label="モバイルナビゲーション">{navigation.map(([label, id], i) => <a href={`#${id}`} key={id} onClick={() => setMenu(false)}><span>0{i + 1}</span>{label}<ArrowUpRight /></a>)}<button onClick={() => setMenu(false)}>メニューを閉じる <X size={16} /></button></nav>}
    <main id="main">
      <div id="introduction" aria-label="ファーストビュー"><HeroShowcase /></div>
      <section className="content-section introduction-copy" id="about" aria-label="紹介">
        <Heading label="紹介" title="技術で支え、デザインで伝える" text="仕組みを設計・開発する兄と、想いを伝わる形にする弟　技術と表現をひとつにつなぎ、事業の次の一歩をつくります" />
        <BrotherIntroductions />
      </section>


      <section className="content-section content-pale min-[1000px]:px-[max(32px,calc((100%_-_1600px)/2))]" id="packages"><Heading label="制作パッケージ" title="具体的な制作範囲を、見てみる" text="相談内容をイメージするためのパッケージ一覧です　正式な範囲・費用・期間は、ご相談のあとに決めます" />        <CategoryFilters items={servicePackages} selected={packageCategory} label="パッケージのカテゴリ" onChange={category => { setPackageCategory(category); setPackagePage(1); }} />
        <p className="catalog-result-status sr-only" ref={resultSummary} tabIndex={-1} aria-live="polite">{filteredPackages.length}件中 {(packagePage - 1) * CATALOG_PAGE_SIZE + 1}〜{Math.min(packagePage * CATALOG_PAGE_SIZE, filteredPackages.length)}件を表示 <span>全{servicePackages.length}パッケージ</span></p>
        <div ref={packageTransition.grid} className="package-grid mt-6 grid grid-cols-3 gap-6 max-[999px]:grid-cols-2 max-[600px]:grid-cols-1 [&_h3]:my-3 [&_h3]:text-lg [&_h3]:leading-[1.6] [&_p]:text-sm [&_p]:leading-[1.8] [&_p]:mb-4 [&_.catalog-card-meta>span]:text-xs [&_.catalog-card-meta>b]:text-[11px]">{filteredPackages.slice((packagePage - 1) * CATALOG_PAGE_SIZE, packagePage * CATALOG_PAGE_SIZE).map((item, i) => <article className={`package-card luminous-card p-3 [&>.package-thumbnail]:mb-3 [&>button]:text-[13px] [&>button]:min-h-11 package-tone-${i % 3}`} key={item.id}><PackageThumbnail item={item} /><div className="catalog-card-meta"><span>{item.category}</span><b>{item.plans.length === 4 ? "制作メニュー" : "三つのプラン"}</b></div><h3>{item.title}</h3><p>{item.description}</p><TechnologyTags technologies={item.technologies} packageOffer /><button className="catalog-outline-button" aria-label={`${item.title} プランの詳細を見る`} onClick={() => { trackInteraction("package_open", { id:item.id }); setDetail({ kind: "package", item }); }}>プランの詳細を見る<ArrowRight size={17} /></button></article>)}</div>
        <Pagination page={packagePage} total={filteredPackages.length} size={CATALOG_PAGE_SIZE} onChange={changePackagePage} label="パッケージのページ切り替え" />
      </section>
      <section className="content-section min-[1000px]:px-[max(32px,calc((100%_-_1600px)/2))]" id="works" lang={englishWorks ? "en" : "ja"}>
        <Heading label={englishWorks ? "GLOBAL PORTFOLIO" : "制作実績"} title={englishWorks ? "Digital experiences that connect" : "さまざまな事業に、伝わる体験を"} text={englishWorks ? "Explore websites and digital experiences created for international audiences" : "これまでに制作したウェブサイトや紹介ページをご覧いただけます"} />        <PortfolioMarkets items={portfolioItems} selected={workMarket} onChange={market => { setWorkMarket(market); setWorkField("all"); setWorkCategory("すべて"); setQuery(""); setWorkPage(1); }} />
        <PortfolioFields items={marketWorks} selected={workField} english={englishWorks} onChange={field => { setWorkField(field); setWorkPage(1); }} />
        <div className="work-toolbar" id="work-catalog"><CategoryFilters english={englishWorks} options={portfolioCategories} items={fieldWorks} selected={workCategory} label={englishWorks ? "Project categories" : "ポートフォリオのカテゴリ"} onChange={category => { setWorkCategory(category); setWorkPage(1); }} /><label className="catalog-search"><Search size={17} /><input type="search" aria-label={englishWorks ? "Search projects" : "ポートフォリオを検索"} placeholder={englishWorks ? "Search projects or skills" : "キーワードで探す"} value={query} onChange={event => { setQuery(event.target.value); setWorkPage(1); }} /></label></div>
        <p className="catalog-result-status sr-only" ref={workSummary} tabIndex={-1} aria-live="polite">{englishWorks ? (filteredWorks.length ? `Showing ${(workPage - 1) * CATALOG_PAGE_SIZE + 1}–${Math.min(workPage * CATALOG_PAGE_SIZE, filteredWorks.length)} of ${filteredWorks.length} projects` : "No projects found") : filteredWorks.length ? `${filteredWorks.length}件中 ${(workPage - 1) * CATALOG_PAGE_SIZE + 1}〜${Math.min(workPage * CATALOG_PAGE_SIZE, filteredWorks.length)}件を表示` : "該当する制作実績はありません"}<span>{englishWorks ? `${marketWorks.length} projects in total` : `全${marketWorks.length}件の制作実績`}</span></p>
        <div ref={workTransition.grid} className="portfolio-grid mt-6 grid grid-cols-3 gap-6 max-[999px]:grid-cols-2 max-[600px]:grid-cols-1 max-[760px]:gap-4 [&_h3]:my-3 [&_h3]:text-lg [&_h3]:leading-[1.6] [&_p]:text-sm [&_p]:leading-[1.8] [&_p]:mb-4 [&_.catalog-card-meta>span]:text-xs [&_.catalog-card-meta>b]:text-[11px]">{filteredWorks.slice((workPage - 1) * CATALOG_PAGE_SIZE, workPage * CATALOG_PAGE_SIZE).map(item => <article className="portfolio-card luminous-card" key={item.id}><button onClick={() => { trackInteraction("portfolio_open", { id: item.id }); setDetail({ kind: "project", item }); }} aria-label={englishWorks ? `${item.title} — View project` : `${item.title} 詳細を見る`}><div className="project-thumbnail"><Image src={item.thumbnail} alt={item.thumbnailAlt || (englishWorks ? `${item.title} website preview` : `${item.title}のサイト画面`)} fill sizes="(max-width: 600px) 100vw, (max-width: 999px) 50vw, 33vw" style={{ objectFit: "cover" }} /></div><div className="portfolio-card-body px-3 pt-3 pb-4 [&>.portfolio-detail-link]:text-xs [&>.portfolio-detail-link]:pt-3"><div className="catalog-card-meta"><span>{englishWorks ? englishCategory(item.category) : item.category}</span><span className="portfolio-field-badge" data-project-field={item.field}>{fieldLabel(item.field, englishWorks)}</span></div><h3>{item.shortTitle || item.title}</h3><span className="mb-3 block font-heading text-[11px] leading-relaxed text-[#526a80]">{item.period}</span><p className="line-clamp-3">{item.description}</p><TechnologyTags technologies={item.market === "global" ? item.skills || [] : item.technologies} label={item.market === "global" ? "Skills applied" : undefined} /><span className="portfolio-detail-link">{englishWorks ? "View project" : "制作実績を見る"}<ArrowUpRight size={18} /></span></div></button></article>)}</div>
        {!filteredWorks.length && <div className="catalog-empty"><Search size={28} /><p>{englishWorks ? "Try another keyword or category" : "別のキーワードやカテゴリでお試しください。"}</p><button className="catalog-outline-button" onClick={() => { setQuery(""); setWorkCategory("すべて"); setWorkField("all"); setWorkPage(1); }}>{englishWorks ? "Reset filters" : "検索条件をリセット"}</button></div>}
        <Pagination page={workPage} total={filteredWorks.length} size={CATALOG_PAGE_SIZE} onChange={changeWorkPage} english={englishWorks} label={englishWorks ? "Portfolio pagination" : "ポートフォリオのページ切り替え"} />
      
      </section>

      <FaqSection directSend={directSend} />
      <section className="content-section" id="contact"><Heading label="お問い合わせ" title="そのアイデア、聞かせてください" text="まだ、ふんわりした想いでも大丈夫　まずは、今の状況をお聞かせください" />
        <div className="contact-layout contact-reference-layout"><ContactInformation />
          <div className="contact-form-column"><ContactForm topic={topic} onTopic={setTopic} directSend={directSend} /></div>
        </div>
      </section></main>
    <PatternFooter />
    {detail && <div className="catalog-backdrop" onClick={event => { if (event.target === event.currentTarget) setDetail(null); }}><div className="catalog-dialog" lang={globalDetail ? "en" : "ja"} ref={dialog} role="dialog" aria-modal="true" aria-labelledby="catalog-dialog-title"><button className="catalog-dialog-close" aria-label={globalDetail ? "Close" : "閉じる"} onClick={() => setDetail(null)}><X size={22} /></button><span className="dialog-eyebrow">{detail.kind === "package" ? "サービスパッケージ" : detail.kind === "project" ? (globalDetail ? "GLOBAL PROJECT" : "制作実績") : "自主制作コンセプト / サンプル"}</span><h2 id="catalog-dialog-title">{detail.item.title}</h2>{detail.kind !== "project" && <p>{detail.item.description}</p>}{detail.kind === "project" ? <ProjectDetails item={detail.item} /> : detail.kind === "work" ? <><ConceptDemo key={detail.item.id} brand={detail.item.brand} /><DesignWalkthrough item={detail.item} />{!["もり", "ながれ", "日々、"].includes(detail.item.brand) && <WorkVisual item={detail.item} />}<p className="dialog-tags">{detail.item.technologies.join(" / ")}</p><div className="concept-brief"><h3>想定する課題</h3><p>{detail.item.challenge}</p><h3>設計のアプローチ</h3><p>{detail.item.approach}</p><h3>検証すること</h3><p>{detail.item.validation}</p></div></> : <><PackageEntryDetails item={detail.item} /><TechnologyTags technologies={detail.item.technologies} packageOffer /><PackagePlanDetails item={detail.item} /></>}<p className="dialog-notice">{detail.kind === "work" ? "架空の自主制作コンセプトです。実在のクライアントや納品実績ではありません。" : detail.kind === "project" ? (globalDetail ? "The current website may differ from the version delivered during this project" : "掲載先の現在の表示は、制作時から変更されている場合があります。") : "掲載資料に基づくご案内です。正式な費用・納期・支援範囲は、お打ち合わせ後のお見積もりで確認します。"}</p><button className="catalog-cta" onClick={() => consult(detail.item.title)}>{globalDetail ? "Discuss a similar project" : "この内容について相談する"}<ArrowRight size={18} /></button></div></div>}
  </div>;
}
