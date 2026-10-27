"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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
} from "lucide-react";
import { Robot } from "./robot";
import { site } from "@/lib/site";
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });
const nav = [
  ["私たちについて", "about"],
  ["できること", "services"],
  ["制作イメージ", "works"],
  ["大切にすること", "process"],
];
const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Figma",
  "WordPress",
  "UI / UX",
  "iOS / Android",
  "Generative AI",
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
const works = [
  {
    category: "WEB DESIGN",
    title: "想いが伝わる、ブランドサイト。",
    desc: "余白とタイポグラフィで世界観を表現する、コーポレートサイトの制作イメージです。",
    type: "brand",
    tag: "Webサイト / LP",
    name: "mori.",
    sub: "暮らしに、ひと呼吸の余白を。",
  },
  {
    category: "WEB APPLICATION",
    title: "毎日の業務を、もっとシンプルに。",
    desc: "情報を一画面にまとめ、次にすべきことが見える業務ダッシュボードの制作イメージです。",
    type: "dashboard",
    tag: "業務システム",
    name: "flow",
    sub: "おかえりなさい。今日も、いい一日を。",
  },
  {
    category: "UI / UX DESIGN",
    title: "手のひらから、心地よい体験を。",
    desc: "迷わず使える導線と、親しみやすいインターフェースを持つモバイルアプリの制作イメージです。",
    type: "mobile",
    tag: "モバイルアプリ",
    name: "日々、",
    sub: "小さないいこと、見つけよう。",
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
      {tag && <span className="button-tag">{tag}</span>}
    </a>
  );
}
export default function Portfolio() {
  const [menu, setMenu] = useState(false);
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
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
        const hovered = (e.target as HTMLElement).closest("[data-cursor]");
        cursor.current.dataset.active = hovered ? "true" : "false";
      }
      if (spotlight.current)
        spotlight.current.style.transform = `translate3d(${(e.clientX / innerWidth - 0.5) * 18}px,${(e.clientY / innerHeight - 0.5) * 18}px,0)`;
    };
    const updateHero = () => {
      const track = heroTrack.current;
      if (!track) return;
      const p = matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 0
        : Math.max(0, Math.min(1, -track.getBoundingClientRect().top / 450));
      track.style.setProperty("--hero-progress", String(p));
      const intro = track.querySelector<HTMLElement>(".hero-copy");
      const next = track.querySelector<HTMLElement>(".hero-next");
      if (intro) {
        intro.inert = p > 0.65;
        intro.setAttribute("aria-hidden", String(p > 0.65));
      }
      if (next) {
        next.inert = p < 0.65;
        next.setAttribute("aria-hidden", String(p < 0.65));
      }
      track.style.setProperty(
        "--intro-opacity",
        String(Math.max(0, 1 - p * 2.5)),
      );
      track.style.setProperty(
        "--next-opacity",
        String(Math.max(0, (p - 0.45) / 0.55)),
      );
    };
    window.addEventListener("scroll", updateHero, { passive: true });
    updateHero();
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    reveals.forEach((item) => observer.observe(item));
    document.addEventListener("pointermove", move, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", updateHero);
      observer.disconnect();
    };
  }, []);
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
          brothers<span className="logo-dot">✳</span>
          <span className="brand-jp">大穂兄弟</span>
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {nav.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="header-contact">
          まずは相談する
          <ArrowUpRight size={15} />
        </a>
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
                  <span className="little-star">✳</span>{" "}
                  いいチームで、いいものを。
                </div>
                <h1 id="hero-title">
                  兄弟の力で、
                  <br />
                  アイデアを
                  <br />
                  <span className="hero-emphasis">カタチに。</span>
                  <span className="headline-star" aria-hidden="true">
                    ✳
                  </span>
                </h1>
                <p>
                  考える兄と、描く弟。
                  <br />
                  デザインとテクノロジーで、
                  <br className="mobile-only" />
                  あなたの「つくりたい」を、一緒に。
                </p>
                <AnimatedLink
                  href="#contact"
                  dark
                  tag="アイデア段階でも、お気軽に！"
                >
                  私たちに相談する
                </AnimatedLink>
              </div>
              <div className="hero-art" ref={spotlight}>
                <div className="orb-fallback" />
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="art-star star-one">✦</div>
                <div className="art-star star-two">✳</div>
                <div className="art-star star-three">+</div>
                <div className="bot-bubble">
                  ひらめきを、いっしょに。<span>HELLO, WE ARE BROTHERS!</span>
                </div>
                <div className="hero-bot">
                  <Robot waving />
                </div>
                <div className="floating-chip chip-code">
                  <Code2 size={20} />
                  <span>LOGIC & CODE</span>
                  <i />
                </div>
                <div className="floating-chip chip-design">
                  <PenTool size={17} />
                  <span>DESIGN & FEELING</span>
                  <i />
                </div>
                <div className="bot-shadow" />
                <span className="art-caption">
                  YOUR IDEA. OUR NEXT ADVENTURE.
                </span>
              </div>
            </div>
            <div className="hero-next" inert aria-hidden="true">
              <span>DESIGN × DEVELOPMENT</span>
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
        <div className="statement-strip">
          <span>GOOD IDEAS.</span>
          <span className="strip-star">✳</span>
          <span>GREAT TEAMWORK.</span>
          <span className="strip-star">✳</span>
          <span>BETTER EXPERIENCES.</span>
          <span className="strip-star">✳</span>
        </div>
        <section id="about" className="section about-section">
          <div className="section-heading reveal">
            <Label>01 — ABOUT US</Label>
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
                <span className="illustration-star">✦</span>
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
                <div className="design-cross">✳</div>
                <div className="design-pointer">
                  <svg viewBox="0 0 24 30">
                    <path
                      d="M2 2v23l7-7 7 10 5-3-7-10 9-2Z"
                      fill="currentColor"
                    />
                  </svg>
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
            <span>✦</span>
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
        </section>
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
                  {skills.map((s, i) => (
                    <span key={s}>
                      <i>
                        {
                          ["↗", "⚛", "TS", "⌘", "Py", "◈", "W", "✳", "↗", "✧"][
                            i
                          ]
                        }
                      </i>
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
        </section>
        <section id="works" className="section works-section">
          <div className="section-heading horizontal reveal">
            <div>
              <Label>03 — POSSIBILITIES</Label>
              <h2>
                つくれるものは、
                <br />
                ひとつじゃない。
              </h2>
            </div>
            <div className="works-note">
              <span className="outline-pill">DESIGN CONCEPTS</span>
              <p>
                ご相談のきっかけになる、制作イメージ。
                <br />
                ※掲載内容は自主制作のコンセプトです。
              </p>
            </div>
          </div>
          <div className="works-grid">
            {works.map((item, i) => (
              <button
                className={`work-card reveal work-${item.type}`}
                key={item.type}
                onClick={() => setWork(i)}
                data-cursor="VIEW"
                aria-label={`${item.title} 詳細を見る`}
              >
                <div className="work-preview">
                  {item.type === "brand" ? (
                    <div className="brand-mock">
                      <div className="mock-nav">
                        <b>mori.</b>
                        <span>ABOUT　 COLLECTION　 JOURNAL</span>
                      </div>
                      <div className="brand-visual">
                        <div className="vase vase-one" />
                        <div className="vase vase-two" />
                        <span>
                          less, but
                          <br />
                          <em>meaningful.</em>
                        </span>
                      </div>
                      <div className="mock-bottom">
                        暮らしに、ひと呼吸の余白を。
                        <ArrowUpRight size={12} />
                      </div>
                    </div>
                  ) : item.type === "dashboard" ? (
                    <div className="dashboard-mock">
                      <aside>
                        <b>f.</b>
                        <i />
                        <i />
                        <i />
                        <i />
                      </aside>
                      <div className="dash-main">
                        <div className="dash-nav">
                          Overview <span>●</span>
                        </div>
                        <small>Good morning, team ☀</small>
                        <div className="dash-stats">
                          <div>
                            進行中のプロジェクト
                            <b>
                              12 <small>+ 3</small>
                            </b>
                          </div>
                          <div>
                            今月の達成率
                            <b>
                              86<small>%</small>
                            </b>
                          </div>
                        </div>
                        <div className="dash-chart">
                          <span>PROJECT ACTIVITY</span>
                          <div className="bars">
                            {[
                              35, 56, 43, 70, 59, 85, 68, 95, 79, 90, 72, 100,
                            ].map((h, j) => (
                              <i key={j} style={{ height: `${h}%` }} />
                            ))}
                          </div>
                        </div>
                        <div className="dash-task">
                          <i />
                          ウェブサイトのデザインレビュー<span>進行中</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mobile-mock">
                      <span className="mobile-flower">✳</span>
                      <div className="phone">
                        <div className="phone-island" />
                        <div className="phone-time">
                          9:41 <span>● ▰</span>
                        </div>
                        <div className="phone-content">
                          <span>GOOD MORNING</span>
                          <h4>
                            今日を、
                            <br />
                            ちょっと豊かに。
                          </h4>
                          <div className="phone-art">
                            <span>☀</span>
                            <div />
                            <i />
                          </div>
                          <p>今日の小さな発見</p>
                          <div className="phone-task">
                            公園でひとやすみ。<span>↗</span>
                          </div>
                          <div className="phone-tabs">⌂　♡　＋　◷</div>
                        </div>
                      </div>
                      <span className="mobile-caption">
                        small moments,
                        <br />
                        <em>big happiness.</em>
                      </span>
                    </div>
                  )}
                  <span className="work-view">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <div className="work-meta">
                  <span>{item.category}</span>
                  <span>CONCEPT / 0{i + 1}</span>
                </div>
                <h3>{item.title}</h3>
                <span className="work-tag">{item.tag}</span>
              </button>
            ))}
          </div>
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
        </section>
        <section className="section faq-section">
          <div className="section-heading reveal">
            <Label>05 — FAQ</Label>
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
        </section>
        <section id="contact" className="contact-section">
          <div className="contact-decoration" aria-hidden="true">
            ✳
          </div>
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
              相談内容をまとめてから送る ↗
            </button>
            {!site.contactUrl && (
              <span className="contact-setup-note">
                お問い合わせ窓口は準備中です。ご相談メモを作成できます。
              </span>
            )}
          </div>
          <div className="contact-bot">
            <div className="contact-bubble">いっしょに、ワクワクしよう。</div>
            <Robot small waving />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <a href="#" className="wordmark">
            brothers<span className="logo-dot">✳</span>
            <span className="brand-jp">大穂兄弟</span>
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
                <Label>DESIGN CONCEPT / 0{work + 1}</Label>
                <h2 id="modal-title">{works[work].title}</h2>
                <p>{works[work].desc}</p>
                <div className="concept-detail">
                  <span>{works[work].name}</span>
                  <p>{works[work].sub}</p>
                </div>
                <p className="modal-note">
                  こちらは制作の方向性を示す自主制作コンセプトです。クライアント実績や稼働中のサービスではありません。ご希望に合わせて、企画・設計からご提案します。
                </p>
                <button
                  className="text-button"
                  onClick={() => {
                    setWork(null);
                    setContact(false);
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({
                        behavior: matchMedia("(prefers-reduced-motion: reduce)")
                          .matches
                          ? "instant"
                          : "smooth",
                      });
                  }}
                >
                  このイメージについて相談する
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
