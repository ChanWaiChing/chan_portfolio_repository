"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Check,
  Copy,
  X,
  Menu,
  Plus,
  Minus,
  Code2,
  PenTool,
  Layers3,
  Sparkles,
  ChevronRight,
  Asterisk,
  MousePointer2,
} from "lucide-react";
import { Robot } from "./robot";
import { site } from "@/lib/site";
import { HeroMedia } from "./hero-media";
import { ContactChannels } from "./contact-channels";
import { usePageMotion, useGalleryMotion } from "./motion-system";
import { projects as works, projectCategories } from "@/lib/projects";
import { ProjectCover } from "./project-cover";
import { SectionCompanions } from "./section-companions";
import { TeamPortrait } from "./team-portrait";
import { SkillGlyph } from "./skill-glyph";
import { scenes } from "@/lib/visuals";
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });
const LivingMascots = dynamic(() => import("./living-mascots"), { ssr: false });
const nav = [
  ["私たちについて", "about"],
  ["できること", "services"],
  ["ポートフォリオ", "works"],
  ["大切にすること", "process"],
];
const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Three.js",
  "Figma",
  "WordPress",
  "UI / UX",
  "iOS / Android",
  "Generative AI",
  "GSAP",
  "Canva",
];
const services = [
  {
    n: "01",
    en: "CONSULTING",
    title: "その課題、一緒に整理します。",
    text: "事業や業務の「こうしたい」からスタート。現状分析・要件定義・技術選定を通じて、実現までの道筋を描きます。",
    tags: ["ITコンサルティング", "業務改善", "要件定義"],
    icon: Layers3,
  },
  {
    n: "02",
    en: "DESIGN",
    title: "伝わる。使いやすい。心地いい。",
    text: "見た目の美しさだけでなく、使う人の気持ちまで。目的やターゲットに寄り添う、一貫した体験をデザインします。",
    tags: ["UI / UX", "Web・LPデザイン", "Figma / Canva"],
    icon: PenTool,
  },
  {
    n: "03",
    en: "DEVELOPMENT",
    title: "アイデアを、動くサービスに。",
    text: "Webからモバイル、業務システムまで。保守性と拡張性を大切に、事業とともに育つ仕組みをつくります。",
    tags: ["Web・アプリ開発", "EC / CMS", "WordPress"],
    icon: Code2,
  },
  {
    n: "04",
    en: "AI & GROWTH",
    title: "つくった先の、可能性まで。",
    text: "生成AIの活用から、公開後の運用・改善まで。日々の仕事をもっと軽やかにする、新しい選択肢をご提案します。",
    tags: ["AI・生成AI", "運用保守", "継続改善"],
    icon: Sparkles,
  },
];
const faqs = [
  [
    "まだアイデアがまとまっていなくても相談できますか？",
    "もちろんです。「こんなことができたら」という段階からご相談ください。事業の目的や現在のお困りごとをお聞きし、要件と優先順位を一緒に整理します。",
  ],
  [
    "デザインだけ、開発だけの依頼もできますか？",
    "はい。デザインから開発までの一括対応はもちろん、UI / UXデザイン、既存サイトの改善、システム開発など、必要な部分だけのご相談も承ります。",
  ],
  [
    "費用や制作期間はどのくらいですか？",
    "制作範囲や機能、ご希望のスケジュールに応じてお見積もりします。ヒアリングで内容を整理したうえで、進め方・費用・納期をご提案します。",
  ],
  [
    "公開後の運用や改善もお願いできますか？",
    "はい。公開後の保守・運用、機能追加や使いやすさの改善まで対応します。長く安心して使い続けられる仕組みづくりを大切にしています。",
  ],
];
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow">
      <i />
      {children}
    </span>
  );
}
function AnimatedLink({
  href,
  children,
  dark = false,
  tag,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  tag?: string;
}) {
  return (
    <a
      href={href}
      className={`animated-button ${dark ? "button-dark" : ""}`}
      data-cursor="VIEW"
    >
      <span>{children}</span>
      <ArrowUpRight size={18} />
      {tag && (
        <span className="button-tag" aria-hidden="true">
          {tag}
        </span>
      )}
    </a>
  );
}
export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState("ALL");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [work, setWork] = useState<number | null>(null);
  const [contact, setContact] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [topic, setTopic] = useState("Webサイト制作");
  const [message, setMessage] = useState("");
  const cursor = useRef<HTMLDivElement>(null);
  const heroTrack = useRef<HTMLDivElement>(null);
  const spotlight = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const modal = work !== null || contact;
  usePageMotion(heroTrack, spotlight, cursor);
  useGalleryMotion(category);
  useEffect(() => {
    if (!modal && !menu) return;
    opener.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (modal)
      dialog.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setWork(null);
        setContact(false);
        setMenu(false);
      }
      if (e.key !== "Tab") return;
      const container = modal
        ? dialog.current
        : document.querySelector(".mobile-nav");
      const nodes = container?.querySelectorAll<HTMLElement>(
        'a[href],button,input,select,textarea,[tabindex="0"]',
      );
      if (!nodes?.length) return;
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          !container?.contains(document.activeElement))
      ) {
        e.preventDefault();
        last.focus();
      } else if (
        !e.shiftKey &&
        (document.activeElement === last ||
          !container?.contains(document.activeElement))
      ) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", key);
      opener.current?.focus();
    };
  }, [modal, menu]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `【ご相談】${topic}\n\n${message || "実現したいこと：\nご予算：\nご希望の時期："}`,
      );
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <>
      <div className="dreamscape" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="custom-cursor" ref={cursor} aria-hidden="true">
        <span>
          VIEW
          <ArrowUpRight size={12} />
        </span>
      </div>
      <a href="#main" className="skip-link">
        本文へスキップ
      </a>
      <header className="site-header">
        <a href="#" className="wordmark" aria-label="大穂兄弟 BROTHERS トップ">
          <svg className="brand-symbol" viewBox="0 0 80 30" aria-hidden="true">
            <path
              d="M5 23C15 23 17 5 27 5S38 24 47 24 58 8 67 8"
              fill="none"
              stroke="#1767d4"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M22 24C32 24 34 7 44 7S56 24 65 24 73 15 76 12"
              fill="none"
              stroke="#f27725"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <span className="brand-name">
            大穂兄弟<span>OHO BROTHERS</span>
          </span>
        </a>
        <div className="header-actions">
          <a href="#services" className="header-pill pill-green">
            <span className="header-mini-bot">
              <Robot small />
            </span>
            <span>
              デザインから開発まで<small>ふたりの専門性で、一貫して対応</small>
            </span>
            <ChevronRight size={17} />
          </a>
          <a href="#contact" className="header-pill pill-orange">
            <span>
              プロジェクトのご相談<small>アイデアの段階から、お気軽に</small>
            </span>
            <ArrowUpRight size={18} />
          </a>
          <a href="#works" className="header-pill pill-blue">
            <span>
              ポートフォリオを見る<small>Web・システム・モバイル</small>
            </span>
            <ChevronRight size={17} />
          </a>
        </div>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {nav.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
          <a href="#faq">よくあるご質問</a>
          <a href="#contact">お問い合わせ</a>
        </nav>
        <button
          className="menu-toggle"
          aria-label={menu ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menu}
          aria-controls="mobile-menu"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      {menu && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label="モバイルナビゲーション"
        >
          {[...nav, ["まずは相談する", "contact"]].map(([label, id], i) => (
            <a href={`#${id}`} onClick={() => setMenu(false)} key={id}>
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight />
            </a>
          ))}
          <button onClick={() => setMenu(false)}>
            メニューを閉じる <X size={16} />
          </button>
        </nav>
      )}
      <main id="main">
        <div className="hero-track" ref={heroTrack}>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-media-drift" ref={spotlight}>
              <HeroMedia />
            </div>
            <div className="ethereal-field" aria-hidden="true">
              <div className="ether-core" />
              <div className="ether-light light-ribbon-one" />
              <div className="ether-light light-ribbon-two" />
              <div className="light-specks">
                {Array.from({ length: 14 }, (_, i) => (
                  <i key={i} style={{ "--i": i } as React.CSSProperties} />
                ))}
              </div>
            </div>
            <div className="hero-mascots">
              <LivingMascots />
              <span className="hero-mascot-caption">
                つくるって、ワクワクする。
              </span>
            </div>
            <div className="hero-shader">
              <HeroScene />
            </div>
            <div className="hero-topline">
              <span>DESIGN × TECHNOLOGY × BROTHERHOOD</span>
              <span>
                <i className="status-dot" /> ご相談受付中
              </span>
            </div>
            <div className="hero-content">
              <div className="hero-copy">
                <div className="hero-kicker">
                  <span className="little-star">
                    <Sparkles size={16} />
                  </span>{" "}
                  ITコンサル × フルスタック × デザイン
                </div>
                <h1 id="hero-title">
                  兄弟の力で、
                  <br />
                  アイデアを
                  <br />
                  <span className="hero-emphasis">カタチに。</span>
                </h1>
                <p className="hero-subtitle">
                  <strong>
                    デザインも、開発も。
                    <br />
                    その先の運用まで。
                  </strong>
                </p>
                <p className="hero-description">
                  考える兄と、描く弟。
                  <br />
                  企画からデザイン、開発、運用まで。
                  <br />
                  あなたの「つくりたい」に伴走します。
                </p>
                <div className="hero-actions">
                  <AnimatedLink
                    href="#works"
                    tag="分野別に15件の掲載情報を見る"
                  >
                    制作実績を見る
                  </AnimatedLink>
                  <AnimatedLink
                    href="#contact"
                    dark
                    tag="アイデア段階でも、お気軽に！"
                  >
                    制作を相談する
                  </AnimatedLink>
                </div>
              </div>
              <div className="hero-art" aria-hidden="true">
                <div className="hero-art-caption">
                  <span>HELLO, WE’RE YOUR CREATIVE PARTNERS.</span>
                  <i />
                </div>
              </div>
            </div>
            <div className="hero-proof">
              <div>
                <span>兄 / ENGINEERING</span>
                <strong>
                  11<small>年の実務経験</small>
                </strong>
              </div>
              <div>
                <span>弟 / DESIGN</span>
                <strong>
                  3<small>年の実務経験</small>
                </strong>
              </div>
              <div>
                <span>ONE TEAM</span>
                <strong className="proof-team">
                  企画から運用まで<small>窓口ひとつで、一貫して伴走</small>
                </strong>
              </div>
            </div>
            <div className="hero-next" inert aria-hidden="true">
              <span>IMAGINATION BECOMES REAL.</span>
              <h2>
                想いをつなぐ。
                <br />
                可能性が、動き出す。
              </h2>
              <p>
                デザインと開発がひとつのチームに。
                <br />
                ふたりの得意で、あなたの次の一歩を。
              </p>
              <a href="#about" className="next-scroll">
                私たちについて <ArrowDown size={18} />
              </a>
            </div>
            <div className="hero-bottom">
              <a href="#about" className="scroll-link">
                <span className="scroll-circle">
                  <ArrowDown size={16} />
                </span>
                SCROLL TO EXPLORE
              </a>
              <span className="hero-note">
                ふたりの得意が、
                <br />
                あなたの可能性になる。
              </span>
              <span className="hero-coordinate">
                CREATIVE PARTNERS
                <br />
                DESIGN + DEVELOPMENT
              </span>
            </div>
          </section>
        </div>
        <section className="skills-section" aria-label="対応技術とツール">
          <div className="skills-label">
            <span>OUR TOOLBOX</span>
            <p>アイデアに合わせて、最適な選択を。</p>
          </div>
          <div className="marquee">
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <div
                  className="marquee-group"
                  key={copy}
                  aria-hidden={copy === 1}
                >
                  {skills.map((s) => (
                    <span key={s}>
                      <SkillGlyph skill={s} />
                      {s}
                      <b>·</b>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="toolbox-note">
            ツールや技術は、目的に合わせて選定します。
          </p>
          <SectionCompanions
            variant="solo"
            message="技術は、想いを形にするために。"
          />
        </section>
        <section id="works" className="section works-section">
          <div className="section-heading horizontal reveal">
            <div>
              <Label>01 — SELECTED WORKS</Label>
              <h2>
                さまざまな事業に、
                <br />
                それぞれの最適解を。
              </h2>
            </div>
            <div className="works-note">
              <span className="outline-pill">LANCERS PORTFOLIO</span>
              <p>
                Web制作・デザインのポートフォリオ。
                <br />
                企業・採用・医療・ブランドの分野からご覧いただけます。
              </p>
            </div>
          </div>
          <div
            className="portfolio-controls"
            role="group"
            aria-label="ポートフォリオのカテゴリ"
          >
            {projectCategories.map(([value, label]) => (
              <button
                key={value}
                aria-pressed={category === value}
                onClick={() => setCategory(value)}
              >
                {label}
                <span>
                  {value === "ALL"
                    ? works.length
                    : works.filter((w) => w.category === value).length}
                </span>
              </button>
            ))}
          </div>
          <p className="portfolio-count" role="status">
            {category === "ALL"
              ? works.length
              : works.filter((w) => w.category === category).length}
            件のポートフォリオ
          </p>
          <div className="works-grid" key={category}>
            {works
              .map((item, i) => ({ item, i }))
              .filter(
                ({ item }) => category === "ALL" || item.category === category,
              )
              .map(({ item, i }) => (
                <button
                  className={`work-card reveal work-${item.accent}`}
                  key={item.id}
                  onClick={() => setWork(i)}
                  data-cursor="VIEW"
                  aria-label={`${item.title} 詳細を見る`}
                >
                  <div className="work-preview">
                    <ProjectCover project={item} />
                    <span className="project-hover-label">
                      VIEW PROJECT <ArrowUpRight size={16} />
                    </span>
                    <span className="work-view">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                  <div className="work-meta">
                    <span>{item.tag}</span>
                    <span>PROJECT {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="work-description">{item.desc}</p>
                </button>
              ))}
          </div>
          <SectionCompanions
            variant="duo"
            message="一つひとつの想いを、伝わる体験に。"
          />
        </section>
        <section id="services" className="section services-section">
          <div className="section-heading horizontal reveal">
            <div>
              <Label>02 — WHAT WE DO</Label>
              <h2>
                「こんなことできる？」
                <br />
                から、はじめよう。
              </h2>
            </div>
            <p>
              企画からデザイン、開発、運用まで。
              <br />
              窓口はひとつ、可能性はいくつも。
              <br />
              必要なところから、柔軟にお手伝いします。
            </p>
          </div>
          <div className="services-grid">
            {services.map(({ n, en, title, text, tags, icon: Icon }) => (
              <article className="service-card reveal" key={n}>
                <div className="service-top">
                  <span>{n}</span>
                  <Icon size={28} strokeWidth={1.3} />
                </div>
                <span className="service-en">{en}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="service-tags">
                  {tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="service-link"
                  aria-label={`${en}について相談する`}
                >
                  このサービスを相談する
                  <ArrowUpRight size={17} />
                </a>
              </article>
            ))}
          </div>
          <SectionCompanions
            variant="solo"
            message="デザインと開発を、ひとつの窓口で。"
          />
        </section>
        <section id="packages" className="section packages-section">
          <div className="section-heading horizontal reveal">
            <div>
              <Label>WORK WITH US</Label>
              <h2>
                必要なところから、
                <br />
                一緒にはじめましょう。
              </h2>
            </div>
            <p>
              ご相談内容に合わせて、対応範囲と進め方をご提案。
              <br />
              プロフィールの公開パッケージもご覧いただけます。
            </p>
          </div>
          <div className="package-summary">
            <span>まずは、必要なところから。</span>
            <p>
              制作範囲・必要な機能・ご希望の時期をお聞きし、進め方とお見積もりをご提案します。
            </p>
            <a href="#contact">
              制作について相談する <ArrowUpRight size={17} />
            </a>
          </div>
          <a
            href={site.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-source-link"
          >
            Lancersでプロフィール・公開パッケージを見る{" "}
            <ArrowUpRight size={16} />
          </a>
          <SectionCompanions
            variant="duo"
            message="必要なところから、気軽にご相談ください。"
          />
        </section>
        <section
          className="concerns-section section"
          aria-labelledby="concerns-title"
        >
          <div className="concerns-heading reveal">
            <span className="eyebrow">YOUR CHALLENGES</span>
            <h2 id="concerns-title">こんなお悩みはありませんか？</h2>
            <p>その「どうしよう」を、私たちと一緒にほどいていきましょう。</p>
          </div>
          <div className="concern-grid">
            {[
              [
                "アイデアはある。",
                "でも、何から始めよう？",
                "はじめてご依頼する方",
                "要件整理や技術選定から相談して、実現への道筋をつくりたい。",
                "planning",
              ],
              [
                "デザインも開発も、",
                "まとめて任せたい。",
                "制作パートナーをお探しの方",
                "別々の依頼先とのやりとりを減らし、一貫した品質でつくりたい。",
                "team",
              ],
              [
                "今の仕組みを、",
                "もっと使いやすく。",
                "改善・効率化を目指す方",
                "サイトや業務システム、AI活用で、日々の仕事をもっと軽やかにしたい。",
                "improve",
              ],
            ].map(([first, second, tag, text, type], i) => (
              <article
                className={`concern-card reveal concern-${type}`}
                key={type}
              >
                <div
                  className={`concern-photo concern-photo-${i}`}
                  role="img"
                  aria-label={
                    [
                      "オフィスでアイデアを考える人のイメージ",
                      "制作方針を話し合うチームのイメージ",
                      "仕事の改善を検討する人のイメージ",
                    ][i]
                  }
                >
                  <h3>
                    {first}
                    <br />
                    <em>{second}</em>
                  </h3>
                </div>
                <div className="concern-body">
                  <span>{tag}</span>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="solution-arrow" aria-hidden="true" />
          <div className="solution-banner reveal">
            <Image
              src={scenes.trio.src}
              alt={scenes.trio.alt}
              fill
              sizes="(max-width: 760px) 100vw, 1000px"
            />
            <div>
              <span>DESIGN × TECHNOLOGY</span>
              <h2>
                大穂兄弟なら、
                <br />
                <em>一緒にカタチにできます。</em>
              </h2>
            </div>
          </div>
          <p className="solution-intro">
            兄が要件整理と開発、弟がデザインを担当。
            <br className="mobile-only" />
            想いも仕様も揃えて、ゴールまで伴走します。
          </p>
          <div className="solution-benefits">
            {[
              [
                "01",
                "窓口はひとつ。",
                "やりとりは、スムーズに。",
                "企画・デザイン・開発をまとめて相談",
              ],
              [
                "02",
                "得意をつないで、",
                "使いやすい体験に。",
                "美しさと、運用しやすさを両立",
              ],
              [
                "03",
                "つくったその先も、",
                "長く使えるものづくり。",
                "保守性・拡張性を大切に設計",
              ],
            ].map(([n, title, line, sub]) => (
              <div key={n}>
                <span>{n}</span>
                <h3>
                  {title}
                  <br />
                  {line}
                </h3>
                <p>{sub}</p>
              </div>
            ))}
          </div>
          <SectionCompanions
            variant="trio"
            message="アイデアの整理から、ふたりで伴走します。"
          />
        </section>
        <section id="process" className="section process-section">
          <div className="section-heading reveal">
            <Label>04 — OUR APPROACH</Label>
            <h2>
              いいものづくりは、
              <br />
              いい対話から。
            </h2>
            <p>
              認識を揃えながら、ひとつずつ、着実に。
              <br />
              つくる時間も、つくったその先も大切にします。
            </p>
          </div>
          <ol className="process-stages" aria-label="制作工程">
            {[
              "ヒアリング",
              "要件整理・設計",
              "デザイン",
              "開発",
              "検証",
              "公開・改善",
            ].map((stage, i) => (
              <li key={stage}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {stage}
              </li>
            ))}
          </ol>
          <div className="process-list">
            {[
              [
                "01",
                "LISTEN",
                "まずは、じっくり聞く。",
                "ご要望だけでなく、その背景にある想いや課題まで。丁寧な対話で、目指すゴールを一緒に見つけます。",
              ],
              [
                "02",
                "DESIGN & BUILD",
                "ふたりで、一貫してつくる。",
                "仕様とデザインの認識を揃え、細部まで丁寧に。品質と納期を大切にしながら、形にしていきます。",
              ],
              [
                "03",
                "GROW TOGETHER",
                "その先も、一緒に育てる。",
                "公開は、次のスタート。保守性・拡張性を考えた設計で、運用や改善まで長く伴走します。",
              ],
            ].map(([n, en, title, text]) => (
              <div className="process-row reveal" key={n}>
                <span className="process-number">{n}</span>
                <div>
                  <span className="process-en">{en}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <ArrowUpRight
                  className="process-arrow"
                  size={27}
                  strokeWidth={1}
                />
              </div>
            ))}
          </div>
          <SectionCompanions
            variant="trio"
            message="つくったその先も、一緒に育てる。"
          />
        </section>
        <section id="about" className="section about-section">
          <div className="section-heading reveal">
            <Label>05 — ABOUT US</Label>
            <h2>
              得意はちがう。
              <br />
              目指すゴールは、同じ。
            </h2>
            <p>
              ひとりでは届かないところへ、ふたりなら。
              <br />
              それぞれの専門性をつなぎ、想いを形にしていく。
              <br />
              私たち大穂兄弟は、兄弟でつくるクリエイティブチームです。
            </p>
          </div>
          <TeamPortrait />
          <div className="about-grid reveal">
            <div className="profile-card profile-engineer">
              <div className="profile-top">
                <span>THE OLDER BROTHER</span>
                <Code2 size={24} />
              </div>
              <div className="profile-illustration engineer-illustration">
                <div className="abstract-window">
                  <span />
                  <span />
                  <span />
                  <pre>
                    {
                      "< ideas >\n  logic × technology\n  return possibilities;\n</ ideas >"
                    }
                  </pre>
                </div>
                <span className="illustration-star">
                  <Sparkles size={34} />
                </span>
              </div>
              <div className="profile-title">
                <h3>考える、つなぐ、つくる。</h3>
                <span>
                  11<span>YEARS</span>
                </span>
              </div>
              <h4>兄 / ITコンサルタント・フルスタックエンジニア</h4>
              <p>
                事業の課題を整理し、最適な技術で解決へ。要件定義から開発、導入後の改善まで、全体を見渡して伴走します。
              </p>
              <div className="profile-tags">
                <span>戦略・要件定義</span>
                <span>システム開発</span>
                <span>ディレクション</span>
              </div>
            </div>
            <div className="profile-connect" aria-hidden="true">
              &
            </div>
            <div className="profile-card profile-designer">
              <div className="profile-top">
                <span>THE YOUNGER BROTHER</span>
                <PenTool size={24} />
              </div>
              <div className="profile-illustration designer-illustration">
                <div className="design-square" />
                <div className="design-circle" />
                <div className="design-cross">
                  <Asterisk size={88} strokeWidth={1.35} />
                </div>
                <div className="design-pointer">
                  <MousePointer2 size={23} />
                  <span>Designer</span>
                </div>
              </div>
              <div className="profile-title">
                <h3>感じる、描く、伝える。</h3>
                <span>
                  3<span>YEARS</span>
                </span>
              </div>
              <h4>弟 / デザイナー</h4>
              <p>
                想いや目的を、伝わるビジュアルに。Figma・Canvaを活用し、美しさと使いやすさを両立するデザインを届けます。
              </p>
              <div className="profile-tags">
                <span>UI / UXデザイン</span>
                <span>Figma</span>
                <span>Canva</span>
              </div>
            </div>
          </div>
          <div className="about-footnote reveal">
            <span>
              <Sparkles size={26} />
            </span>
            <p>
              好きなものは、ふたりとも「ドラゴンボール」。
              <br />
              個性はそれぞれ。チームワークは、息ぴったりです。
            </p>
            <span className="footnote-en">
              DIFFERENT SKILLS.
              <br />
              ONE GREAT TEAM.
            </span>
          </div>
          <SectionCompanions
            variant="quartet"
            message="ちがう得意が、ひとつのチームになる。"
          />
        </section>
        <section id="faq" className="section faq-section">
          <div className="section-heading reveal">
            <Label>06 — FAQ</Label>
            <h2>
              気になること、
              <br />
              先にお答えします。
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <div
                className={`faq-item ${activeFaq === i ? "faq-open" : ""}`}
                key={q}
              >
                <h3>
                  <button
                    aria-expanded={activeFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  >
                    <span className="faq-q">Q.</span>
                    {q}
                    {activeFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                </h3>
                <div id={`faq-answer-${i}`} hidden={activeFaq !== i}>
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
          <SectionCompanions
            variant="solo"
            message="小さな疑問から、どうぞお気軽に。"
          />
        </section>
        <section id="contact" className="contact-section">
          <div className="contact-content reveal">
            <Label>LET’S MAKE SOMETHING GREAT</Label>
            <h2>
              そのアイデア、
              <br />
              聞かせてください。
            </h2>
            <p>
              まだ、ふんわりした想いでも大丈夫。
              <br />
              ふたりの得意を掛け合わせて、一緒に実現しましょう。
            </p>
            {site.contactUrl ? (
              <AnimatedLink
                href={site.contactUrl}
                dark
                tag="まずは、お話ししませんか？"
              >
                プロジェクトを相談する
              </AnimatedLink>
            ) : (
              <button
                className="animated-button button-dark"
                onClick={() => {
                  setContact(true);
                  setCopied(false);
                  setCopyError(false);
                }}
              >
                <span>相談内容をまとめる</span>
                <ArrowUpRight size={20} />
                <span className="button-tag">まずは、アイデアを言葉に。</span>
              </button>
            )}
            <button
              className="contact-secondary"
              onClick={() => {
                setContact(true);
                setCopied(false);
                setCopyError(false);
              }}
            >
              相談内容をまとめてから送る <ArrowUpRight size={14} />
            </button>
            {!site.contactUrl && (
              <span className="contact-setup-note">
                お問い合わせ窓口は準備中です。ご相談メモを作成できます。
              </span>
            )}
          </div>
          <ContactChannels />
          <SectionCompanions
            variant="duo"
            message="あなたの次の一歩を、私たちと。"
          />
        </section>
      </main>
      <footer className="footer">
        <SectionCompanions
          compact
          variant="duo"
          message="兄弟の力で、アイデアをカタチに。"
        />
        <div className="footer-top">
          <a href="#" className="wordmark">
            <span className="brand-name">
              大穂兄弟<span>OHO BROTHERS</span>
            </span>
          </a>
          <p>兄弟の力で、アイデアをカタチに。</p>
          <a href="#" className="back-top" aria-label="ページの先頭へ">
            BACK TO TOP <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>DESIGN × TECHNOLOGY × BROTHERHOOD</span>
          <span>© {new Date().getFullYear()} 大穂兄弟 / BROTHERS</span>
        </div>
      </footer>
      {modal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setWork(null);
              setContact(false);
            }
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={dialog}
          >
            <button
              className="modal-close"
              onClick={() => {
                setWork(null);
                setContact(false);
              }}
              aria-label="閉じる"
            >
              <X />
            </button>
            {work !== null ? (
              <>
                <Label>
                  LANCERS PORTFOLIO / {String(work + 1).padStart(2, "0")}
                </Label>
                <h2 id="modal-title">{works[work].title}</h2>
                <p>{works[work].desc}</p>
                <div className="project-detail-cover">
                  <ProjectCover project={works[work]} large />
                </div>
                <dl className="project-detail-facts">
                  <div>
                    <dt>掲載名・分野</dt>
                    <dd>{works[work].name}</dd>
                  </div>
                  <div>
                    <dt>カテゴリー</dt>
                    <dd>{works[work].tag}</dd>
                  </div>
                  <div>
                    <dt>情報元</dt>
                    <dd>Lancers掲載ポートフォリオ</dd>
                  </div>
                </dl>
                <p className="modal-note">
                  詳しい制作内容や対応範囲は、ご相談時にご案内します。
                </p>
                <a
                  className="project-source-link"
                  href={site.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lancersで掲載情報を見る <ArrowUpRight size={15} />
                </a>
                <button
                  className="text-button"
                  onClick={() => {
                    setWork(null);
                    setContact(false);
                    document.querySelector("#contact")?.scrollIntoView({
                      behavior: matchMedia("(prefers-reduced-motion: reduce)")
                        .matches
                        ? "instant"
                        : "smooth",
                    });
                  }}
                >
                  このような制作について相談する
                  <ArrowRight size={17} />
                </button>
              </>
            ) : (
              <>
                <Label>YOUR NEXT IDEA</Label>
                <h2 id="modal-title">まずは、想いのメモから。</h2>
                <p>
                  相談したい内容をまとめて、コピーできます。
                  <br />
                  メールアプリを開いて、ご相談を送れます。
                </p>
                <label htmlFor="topic">相談したいこと</label>
                <select
                  id="topic"
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    setCopied(false);
                  }}
                >
                  {[
                    "Webサイト制作",
                    "デザイン / UI・UX",
                    "Web・業務システム開発",
                    "モバイルアプリ開発",
                    "AI活用 / 業務改善",
                    "まずは相談したい",
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <label htmlFor="message">実現したいこと</label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setCopied(false);
                  }}
                  placeholder="つくりたいもの、お困りごと、ご希望の時期など。まとまっていなくても大丈夫です。"
                />
                <a
                  className="mail-button"
                  href={`mailto:cbnbc07@gmail.com?subject=${encodeURIComponent(`【ポートフォリオからのご相談】${topic}`)}&body=${encodeURIComponent(`大穂兄弟 ご担当者様\n\n${message || "実現したいこと：\nご予算：\nご希望の時期："}\n\nお名前：\nご連絡先：`)}`}
                >
                  メールアプリで送る <ArrowUpRight size={16} />
                </a>
                <button
                  className="animated-button button-dark copy-button"
                  onClick={copy}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  <span>
                    {copied ? "相談メモをコピーしました" : "相談メモをコピー"}
                  </span>
                </button>
                <p role="status" className="modal-note">
                  {copyError
                    ? "コピーできませんでした。入力欄の内容を選択してコピーしてください。"
                    : copied
                      ? "コピーしたメモは、ご自身のメモ帳などに保存してお使いください。"
                      : "送信先：cbnbc07@gmail.com。入力内容はサイトに保存されません。"}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
