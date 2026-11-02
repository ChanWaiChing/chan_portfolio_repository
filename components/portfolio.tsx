"use client";
import Image from "next/image";
import { ProjectDetails } from "./project-details";
import { ProjectStack } from "./project-stack";
import { ProjectCopyStatus } from "./project-copy-status";
import { ProjectThumbnail } from "./project-thumbnail";
import { SectionLabel } from "./section-label";
import { BrandWordmark } from "./brand-wordmark";
import { HeaderAccessActions } from "./header-access-actions";
import { portfolioItems, portfolioCategories, type PortfolioProject, type PortfolioMarket } from "@/lib/projects";
import { PortfolioFields } from "./portfolio-fields";
import { fieldLabel, portfolioFields, type PortfolioField } from "@/lib/portfolio-fields";
import { PortfolioMarkets } from "./portfolio-markets";
import { useDetailMotion } from "./use-detail-motion";
import { useCatalogTransition } from "./use-catalog-transition";
import { useEffect, useRef, useState } from "react";
import { trackInteraction } from "@/lib/interaction-events";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Layers, Menu, SlidersHorizontal, RotateCcw, Search, X } from "lucide-react";
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
import { useSiteLanguage } from "./site-language";
import { localizeProject, localizePackage } from "@/lib/catalog-localization";
import { localizeCategory, localizeField } from "@/lib/localization";

const CATALOG_PAGE_SIZE = 6;
const projectSources = new Map(portfolioItems.map(item => [item.id, item]));

const navigation = [["紹介","about"],["パッケージ","packages"],["ポートフォリオ","works"],["FAQ","faq"],["お問い合わせ","contact"]];
function Heading({ label, title, text }: { label: string; title: string; text?: string }) {
  const { text: translate } = useSiteLanguage();
  const copy = title === "具体的な制作範囲を、見てみる"
    ? { label: translate("packages.label2"), title: translate("packages.title"), text: translate("packages.text") }
    : title === "そのアイデア、聞かせてください"
      ? { label: translate("nav.contact"), title: translate("contact.title"), text: translate("contact.description") }
      : { label, title, text };
  return <div className="content-heading mx-auto mb-9 max-w-[780px] text-center max-[760px]:mb-7 max-[760px]:text-left"><SectionLabel>{copy.label}</SectionLabel><h2>{copy.title}</h2>{copy.text && <p>{copy.text}</p>}</div>;
}
function Pagination({ page, total, size, onChange, label, english = false, position = "bottom" }: { page: number; total: number; size: number; onChange: (page: number) => void; label: string; english?: boolean; position?: "top" | "bottom" }) {
  const { language } = useSiteLanguage();
  const pager = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = pager.current, selected = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (nav && selected) nav.scrollTo({ left: Math.max(0, selected.offsetLeft - nav.clientWidth / 2 + selected.clientWidth / 2), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [page]);
  const pages = Math.max(1, Math.ceil(total / size));
  if (pages === 1) return null;
  const locationLabel = language === "ja" ? "上部" : language === "en" ? "top" : language === "zh-CN" ? "顶部" : "頂部";
  return <nav ref={pager} className={`catalog-pagination${position === "top" ? " is-top" : ""}`} aria-label={position === "top" ? `${label} (${locationLabel})` : label} data-pagination-position={position}>
    <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label={language === "ja" ? "前のページ" : language === "en" ? "Previous page" : language === "zh-CN" ? "上一页" : "上一頁"}><ChevronLeft size={17} /></button>
    {Array.from({ length: pages }, (_, i) => <button type="button" key={i} aria-label={language === "ja" ? `${i + 1}ページ目` : language === "en" ? `Page ${i + 1}` : `第 ${i + 1} ${language === "zh-CN" ? "页" : "頁"}`} aria-current={page === i + 1 ? "page" : undefined} onClick={() => onChange(i + 1)}>{i + 1}</button>)}
    <button type="button" disabled={page === pages} onClick={() => onChange(page + 1)} aria-label={language === "ja" ? "次のページ" : language === "en" ? "Next page" : language === "zh-CN" ? "下一页" : "下一頁"}><ChevronRight size={17} /></button>
  </nav>;
}
const WorkVisual = PortfolioArtwork;

export default function Portfolio({ directSend = false }: { directSend?: boolean }) {
  const { language, text } = useSiteLanguage();
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
  const detailMotion = useDetailMotion(detail, () => setDetail(null), dialog);
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
      if (event.key === "Escape") { void detailMotion.close(); setMenu(false); }
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

  const englishWorks = language === "en";
  const ndaLabel = { ja: "守秘義務対象", en: "NDA", "zh-CN": "保密项目", "zh-HK": "保密項目" }[language];
  const localizedNavigation = navigation.map(([label, id], index) => [text((["nav.about", "nav.packages", "nav.works", "nav.faq", "nav.contact"] as const)[index]), id] as const);
  const dialogCopy = language === "ja" ? { close: "閉じる", package: "サービスパッケージ", work: "制作実績", sample: "自主制作コンセプト / サンプル", challenge: "想定する課題", approach: "設計のアプローチ", validation: "検証すること", idea: "架空の自主制作コンセプトです。実在のクライアントや納品実績ではありません。", nda: "守秘義務により、公開可能な担当領域のみを匿名化して紹介しています", changed: "掲載先の現在の表示は、制作時から変更されている場合があります。", quote: "掲載資料に基づくご案内です。正式な費用・納期・支援範囲は、お打ち合わせ後のお見積もりで確認します。", consult: "この内容について相談する" }
    : language === "en" ? { close: "Close", package: "Service package", work: "Project", sample: "Independent concept / sample", challenge: "The challenge", approach: "Design approach", validation: "What to validate", idea: "This is a fictional independent concept, not a real client or delivered project.", nda: "Only anonymized, publicly shareable areas of contribution are described under NDA.", changed: "The current website may differ from the version delivered during this project.", quote: "Based on the supplied materials. Final costs, schedule, and support scope are confirmed in a tailored estimate.", consult: "Discuss a similar project" }
      : language === "zh-CN" ? { close: "关闭", package: "服务方案", work: "项目案例", sample: "自主概念 / 示例", challenge: "设想的问题", approach: "设计思路", validation: "验证内容", idea: "这是虚构的自主概念，并非真实客户或交付项目。", nda: "根据保密约定，仅匿名介绍可公开的负责范围。", changed: "目前网站内容可能与项目制作时有所不同。", quote: "内容基于所提供的资料。正式费用、周期及支持范围将在沟通后通过报价确认。", consult: "咨询类似项目" }
        : { close: "關閉", package: "服務方案", work: "項目案例", sample: "自主概念 / 示例", challenge: "設想嘅問題", approach: "設計思路", validation: "驗證內容", idea: "呢個係虛構嘅自主概念，並非真實客戶或交付項目。", nda: "根據保密協議，只會匿名介紹可公開嘅負責範圍。", changed: "目前網站內容可能同項目製作時有所不同。", quote: "內容根據所提供嘅資料。正式費用、週期及支援範圍會喺溝通後透過報價確認。", consult: "查詢類似項目" };
  const localizedPackages = servicePackages.map(item => localizePackage(item, language));
  const localizedProjects = portfolioItems.map(item => localizeProject(item, language));
  const localizedDetail = detail ? { ...detail, item: detail.kind === "project" ? localizeProject(detail.item, language) : detail.kind === "package" ? localizePackage(detail.item, language) : detail.item } : null;
  const filteredPackages = localizedPackages.filter(item => packageCategory === "すべて" || item.category === packageCategory);
  const marketWorks = localizedProjects.filter(item => item.market === workMarket);
  const fieldWorks = marketWorks.filter(item => workField === "all" || item.field === workField);
  const filteredWorks = fieldWorks.filter(item => (workCategory === "すべて" || item.category === workCategory) && `${projectSources.get(item.id)?.title || ""} ${projectSources.get(item.id)?.shortTitle || ""} ${fieldLabel(item.field)} ${fieldLabel(item.field, true)} ${item.title} ${item.shortTitle || ""} ${(item.skills || []).join(" ")} ${item.description} ${item.scope} ${item.period} ${item.technologies.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  useEffect(() => { setPackagePage(page => Math.min(page, Math.max(1, Math.ceil(filteredPackages.length / CATALOG_PAGE_SIZE)))); setWorkPage(page => Math.min(page, Math.max(1, Math.ceil(filteredWorks.length / CATALOG_PAGE_SIZE)))); }, [filteredPackages.length, filteredWorks.length]);
  const resetWorks = () => { setQuery(""); setWorkCategory("すべて"); setWorkField("all"); setWorkPage(1); };
  const changePackagePage = (page: number) => { void packageTransition.change(page, () => { setPackagePage(page); resultSummary.current?.focus({ preventScroll: true }); }); };
  const changeWorkPage = (page: number) => { void workTransition.change(page, () => { setWorkPage(page); workSummary.current?.focus({ preventScroll: true }); }); };
  const consult = (title: string) => {
    setTopic(title); setDetail(null); trackInteraction("contact_intent");
    requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "instant" });
      document.getElementById("contact-topic")?.focus({ preventScroll: true });
    });
  };

  return <div className="portfolio-site relative z-[1] bg-transparent text-[#e1edff]" lang={language} onClickCapture={event => { if (event.target instanceof Element && event.target.closest('a[href="#contact"]')) trackInteraction("contact_intent"); }}>
    <a className="skip-link" href="#main">{text("skip")}</a>
    <header className="site-header max-[760px]:grid max-[760px]:h-auto max-[760px]:grid-cols-[minmax(0,1fr)_auto] max-[760px]:gap-y-2 max-[760px]:py-2 max-[760px]:[&>.wordmark]:col-start-1 max-[760px]:[&>.menu-toggle]:col-start-2 max-[760px]:[&>.menu-toggle]:row-start-1">
      <BrandWordmark />
      <nav className="desktop-nav" aria-label={text("nav.contact")}>{localizedNavigation.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}</nav>
      <div className="header-actions ml-auto flex items-center gap-2 max-[760px]:col-span-2 max-[760px]:row-start-2 max-[760px]:w-full max-[760px]:justify-end"><a className="header-contact catalog-cta m-0 h-11 min-h-11 py-0" href="#contact">{text("nav.consult")}<ArrowUpRight size={16} /></a><HeaderAccessActions /></div>
      <button className="menu-toggle" aria-label={menu ? text("nav.menu.close") : text("nav.menu.open")} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>
    {menu && <nav className="mobile-nav" ref={menuRef} id="mobile-menu" aria-label={text("nav.menu.open")}>{localizedNavigation.map(([label, id], i) => <a href={`#${id}`} key={id} onClick={() => setMenu(false)}><span>0{i + 1}</span>{label}<ArrowUpRight /></a>)}<button onClick={() => setMenu(false)}>{text("nav.menu.close")} <X size={16} /></button></nav>}
    <main id="main">
      <div id="introduction" aria-label={text("hero.aria")}><HeroShowcase /></div>
      <section className="content-section introduction-copy" id="about" aria-label={text("about.label")}>
        <Heading label={text("about.label")} title={text("about.title")} text={text("about.text")} />
        <BrotherIntroductions />
      </section>


      <section className="content-section content-pale min-[1000px]:px-[max(32px,calc((100%_-_1600px)/2))]" id="packages"><Heading label={text("packages.label")} title={text("packages.title")} text={text("packages.text")} />              <CategoryFilters items={servicePackages} selected={packageCategory} language={language} label={text("packages.label")} onChange={category => { setPackageCategory(category); setPackagePage(1); }} />
        <p className="catalog-result-status sr-only" ref={resultSummary} tabIndex={-1} aria-live="polite">{language === "ja" ? `${filteredPackages.length}件中 ${(packagePage - 1) * CATALOG_PAGE_SIZE + 1}〜${Math.min(packagePage * CATALOG_PAGE_SIZE, filteredPackages.length)}件を表示　全${servicePackages.length}パッケージ` : `${filteredPackages.length} ${text("packages.label")} · ${(packagePage - 1) * CATALOG_PAGE_SIZE + 1}–${Math.min(packagePage * CATALOG_PAGE_SIZE, filteredPackages.length)} / ${servicePackages.length}`}</p>
        <Pagination position="top" page={packagePage} total={filteredPackages.length} size={CATALOG_PAGE_SIZE} onChange={changePackagePage} label={text("packages.pages")} />
        <div ref={packageTransition.grid} className="package-grid mt-6 grid grid-cols-3 gap-6 max-[999px]:grid-cols-2 max-[600px]:grid-cols-1 [&_h3]:my-3 [&_h3]:text-lg [&_h3]:leading-[1.6] [&_p]:text-sm [&_p]:leading-[1.8] [&_p]:mb-4 [&_.catalog-card-meta>span]:text-xs [&_.catalog-card-meta>b]:text-[11px]">{filteredPackages.slice((packagePage - 1) * CATALOG_PAGE_SIZE, packagePage * CATALOG_PAGE_SIZE).map((item, i) => <article lang={language} className={`package-card luminous-card p-3 [&>.package-thumbnail]:mb-3 [&>button]:text-[13px] [&>button]:min-h-11 package-tone-${i % 3}`} key={item.id}><PackageThumbnail item={item} /><div className="catalog-card-meta"><span>{localizeCategory(item.category, language)}</span><b>{item.plans.length === 4 ? text("packages.menu") : text("packages.plans")}</b></div><h3>{item.title}</h3><p>{item.description}</p><TechnologyTags technologies={item.technologies} packageOffer /><button className="catalog-outline-button" aria-label={`${item.title} ${text("packages.details")}`} onClick={event => { detailMotion.rememberSource(event.currentTarget); trackInteraction("package_open", { id:item.id }); setDetail({ kind: "package", item: servicePackages.find(original => original.id === item.id)! }); }}>{text("packages.details")}<ArrowRight size={17} /></button></article>)}</div>
        <Pagination page={packagePage} total={filteredPackages.length} size={CATALOG_PAGE_SIZE} onChange={changePackagePage} label={text("packages.pages")} />
      </section>
      <section className="content-section min-[1000px]:px-[max(32px,calc((100%_-_1600px)/2))]" id="works" lang={language}>
        <div className="portfolio-browser-heading"><h2>{text("works.title")}</h2><p>{text("works.description")}</p></div>
        <PortfolioMarkets items={portfolioItems} selected={workMarket} onChange={market => { setWorkMarket(market); resetWorks(); }} />
        <div className="portfolio-filter-panel" id="work-catalog">
          <div className="portfolio-filter-header"><div className="portfolio-filter-caption"><SlidersHorizontal size={20} aria-hidden="true" /><span>{text("works.filter")}</span></div><div className="catalog-search"><Search size={20} aria-hidden="true" /><input type="search" aria-label={text("works.search")} placeholder={text("works.search.placeholder")} value={query} onChange={event => { setQuery(event.target.value); setWorkPage(1); }} />{query && <button type="button" className="catalog-search-clear" aria-label={text("works.search.clear")} onClick={() => { setQuery(""); setWorkPage(1); }}><X size={16} aria-hidden="true" /></button>}</div></div>
          <div className="work-toolbar portfolio-filter-row"><h3><Layers size={18} aria-hidden="true" />{text("works.type")}</h3><CategoryFilters compact english={englishWorks} language={language} options={portfolioCategories} items={fieldWorks} selected={workCategory} label={text("works.type")} onChange={category => { setWorkCategory(category); setWorkPage(1); }} /></div>
          <PortfolioFields items={marketWorks} selected={workField} english={englishWorks} language={language} onChange={field => { setWorkField(field); setWorkPage(1); }} />

        </div>
        <div className="portfolio-results"><p ref={workSummary} tabIndex={-1} aria-live="polite">{filteredWorks.length} {text("works.count")}<span className="sr-only">{filteredWorks.length ? `, ${text("works.showing")} ${((workPage - 1) * CATALOG_PAGE_SIZE + 1)}–${Math.min(workPage * CATALOG_PAGE_SIZE, filteredWorks.length)}` : ""}</span></p><Pagination position="top" page={workPage} total={filteredWorks.length} size={CATALOG_PAGE_SIZE} onChange={changeWorkPage} label={language === "ja" ? "ポートフォリオのページ切り替え" : language === "en" ? "Portfolio pagination" : language === "zh-CN" ? "作品集分页" : "作品集分頁"} /><button type="button" onClick={resetWorks} disabled={workField === "all" && workCategory === "すべて" && !query}><RotateCcw size={15} aria-hidden="true" />{text("works.reset")}</button></div>
        <div ref={workTransition.grid} className="portfolio-grid mt-6 grid grid-cols-3 gap-6 max-[999px]:grid-cols-2 max-[600px]:grid-cols-1 max-[760px]:gap-4 [&_h3]:my-3 [&_h3]:text-lg [&_h3]:leading-[1.6] [&_p]:text-sm [&_p]:leading-[1.8] [&_p]:mb-4 [&_.catalog-card-meta>span]:text-xs [&_.catalog-card-meta>b]:text-[11px]">{filteredWorks.slice((workPage - 1) * CATALOG_PAGE_SIZE, workPage * CATALOG_PAGE_SIZE).map(item => <article className="portfolio-card luminous-card" data-project-id={item.id} key={item.id}><button onClick={event => { detailMotion.rememberSource(event.currentTarget); trackInteraction("portfolio_open", { id: item.id }); setDetail({ kind: "project", item: projectSources.get(item.id)! }); }} aria-label={`${item.title} — ${text("works.card")}`}><ProjectThumbnail item={item} /><div className="portfolio-card-body px-3 pt-3 pb-4 [&>.portfolio-detail-link]:text-xs [&>.portfolio-detail-link]:pt-3"><div className="catalog-card-meta"><span>{localizeCategory(item.category, language)}</span><span className="portfolio-field-badge" data-project-field={item.field}>{localizeField(fieldLabel(item.field), language)}</span>{item.confidential && <span className="portfolio-nda-badge">{ndaLabel}</span>}{item.copyStatus === "draft" && <ProjectCopyStatus compact />}</div><h3>{item.shortTitle || item.title}</h3><span className="mb-3 block font-heading text-[11px] leading-relaxed text-[#526a80]">{item.period}</span><p className="portfolio-card-description line-clamp-2">{item.description}</p>{item.category === "システム開発" ? <ProjectStack item={item} compact /> : <TechnologyTags compact technologies={item.market === "global" ? item.skills?.length ? item.skills : item.technologies : item.technologies} label={item.market === "global" ? item.skills?.length ? text("works.skills") : text("works.stack") : undefined} emptyLabel={text("works.unspecified")} />}<span className="portfolio-detail-link">{text("works.card")}<ArrowUpRight size={18} /></span></div></button></article>)}</div>
        {!filteredWorks.length && <div className="catalog-empty"><Search size={28} /><p>{text("works.empty")}</p></div>}
        <Pagination page={workPage} total={filteredWorks.length} size={CATALOG_PAGE_SIZE} english={englishWorks} onChange={changeWorkPage} label={language === "ja" ? "ポートフォリオのページ切り替え" : language === "en" ? "Portfolio pagination" : language === "zh-CN" ? "作品集分页" : "作品集分頁"} />

      </section>

      <FaqSection directSend={directSend} />
      <section className="content-section" id="contact"><Heading label={text("nav.contact")} title={text("contact.title")} text={text("contact.description")} />
        <div className="contact-layout contact-reference-layout"><ContactInformation />
          <div className="contact-form-column"><ContactForm topic={topic} onTopic={setTopic} directSend={directSend} /></div>
        </div>
      </section></main>
    <PatternFooter />
    {detail && <div className="catalog-backdrop" onClick={event => { if (event.target === event.currentTarget) void detailMotion.close(); }}><div className="catalog-dialog" lang={language} ref={dialog} role="dialog" aria-modal="true" aria-labelledby="catalog-dialog-title"><button className="catalog-dialog-close" aria-label={dialogCopy.close} onClick={() => void detailMotion.close()}><X size={22} /></button><span className="dialog-eyebrow">{detail.kind === "package" ? dialogCopy.package : detail.kind === "project" ? dialogCopy.work : dialogCopy.sample}</span><h2 id="catalog-dialog-title">{localizedDetail?.item.title}</h2>{detail.kind !== "project" && <p>{localizedDetail?.item.description}</p>}{detail.kind === "project" ? <ProjectDetails item={localizeProject(detail.item, language)} /> : detail.kind === "work" ? <><ConceptDemo key={detail.item.id} brand={detail.item.brand} /><DesignWalkthrough item={detail.item} />{!["もり", "ながれ", "日々、"].includes(detail.item.brand) && <WorkVisual item={detail.item} />}<p className="dialog-tags">{detail.item.technologies.join(" / ")}</p><div className="concept-brief"><h3>{dialogCopy.challenge}</h3><p>{detail.item.challenge}</p><h3>{dialogCopy.approach}</h3><p>{detail.item.approach}</p><h3>{dialogCopy.validation}</h3><p>{detail.item.validation}</p></div></> : <><PackageEntryDetails item={localizePackage(detail.item, language)} /><TechnologyTags technologies={detail.item.technologies} packageOffer /><PackagePlanDetails item={localizePackage(detail.item, language)} /></>}<p className="dialog-notice">{detail.kind === "work" ? dialogCopy.idea : detail.kind === "project" ? (detail.item.confidential ? dialogCopy.nda : dialogCopy.changed) : dialogCopy.quote}</p><button className="catalog-cta" onClick={() => consult(detail.item.title)}>{dialogCopy.consult}<ArrowRight size={18} /></button></div></div>}
  </div>;
}
