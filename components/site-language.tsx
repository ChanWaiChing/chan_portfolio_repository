"use client";

import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";

export const siteLanguages = ["ja", "en", "zh-CN", "zh-HK"] as const;
export type SiteLanguage = (typeof siteLanguages)[number];
const isSiteLanguage = (value: string): value is SiteLanguage => siteLanguages.some(language => language === value);

const messages = {
  ja: {
    "language.label": "表示言語",
    "auth.logout": "ログアウト",
    "skip": "本文へスキップ",
    "nav.about": "紹介",
    "nav.packages": "パッケージ",
    "nav.works": "ポートフォリオ",
    "nav.faq": "FAQ",
    "nav.contact": "お問い合わせ",
    "nav.consult": "相談する",
    "nav.menu.open": "メニューを開く",
    "nav.menu.close": "メニューを閉じる",
    "hero.aria": "大穂兄弟のサービス",
    "hero.tabs": "サービスを選ぶ",
    "hero.motion": "画像にフォーカスしてスペースキーで自動切替を停止・再生できます。",
    "hero.intro": "デザインと開発を、ひとつのチームで",
    "hero.lead": "更新しにくいサイト、手作業の転記、使いづらい管理画面。中小企業・小さなチームの困りごとを、企画・デザイン・開発から公開後の改善まで一緒に解決します。",
    "hero.consult": "まずは無料で相談する",
    "hero.work": "制作実績を見る",
    "about.label": "紹介",
    "about.title": "技術で支え、デザインで伝える",
    "about.text": "事業の課題を整理する兄の技術力と、伝わる体験を形にする弟のデザイン力を組み合わせ、企画から開発・公開後の改善まで一貫して支援します。",
    "packages.label": "制作パッケージ",
    "packages.title": "具体的な制作範囲を、見てみる",
    "packages.text": "相談内容をイメージするためのパッケージ一覧です。正式な範囲・費用・期間は、ご相談のあとに決めます。",
    "packages.menu": "制作メニュー",
    "packages.plans": "三つのプラン",
    "packages.details": "プランの詳細を見る",
    "packages.pages": "パッケージのページ切り替え",
    "packages.label2": "制作パッケージ",
    "works.title": "制作実績",
    "works.description": "これまでに制作したウェブサイトや業務システムをご覧いただけます",
    "works.filter": "条件で絞り込む",
    "works.search": "キーワードで探す",
    "works.search.placeholder": "キーワードで探す",
    "works.search.clear": "検索キーワードをクリア",
    "works.type": "サイト種別",
    "works.field": "業種",
    "works.count": "件の制作実績",
    "works.showing": "表示中",
    "works.reset": "絞り込みを解除",
    "works.empty": "別のキーワードやカテゴリでお試しください。",
    "works.card": "制作実績を見る",
    "works.skills": "担当スキル",
    "works.stack": "使用技術",
    "works.unspecified": "",
    "works.dialog": "制作実績",
    "works.close": "閉じる",
    "works.notice": "掲載先の現在の表示は、制作時から変更されている場合があります。",
    "works.consult": "この内容について相談する",
    "faq.title": "よくあるご質問",
    "contact.title": "そのアイデア、聞かせてください",
    "contact.description": "まだ、ふんわりした想いでも大丈夫。まずは、今の状況をお聞かせください。",
    "footer.top": "ページの先頭へ",
    "footer.nav": "フッターナビゲーション",
  },
  en: {
    "language.label": "Language",
    "auth.logout": "Log out",
    "skip": "Skip to content",
    "nav.about": "Introduction",
    "nav.packages": "Packages",
    "nav.works": "Portfolio",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.consult": "Let’s talk",
    "nav.menu.open": "Open menu",
    "nav.menu.close": "Close menu",
    "hero.aria": "OHO Brothers services",
    "hero.tabs": "Choose a service",
    "hero.motion": "Focus the image and press Space to pause or resume the slideshow.",
    "hero.intro": "Design and development, one team",
    "hero.lead": "Hard-to-update websites, repetitive data entry, and awkward admin tools. We help small businesses and teams solve these challenges—from planning and design to development and ongoing improvements.",
    "hero.consult": "Book a free consultation",
    "hero.work": "View our work",
    "about.label": "Introduction",
    "about.title": "Technology that supports. Design that connects.",
    "about.text": "We combine our older brother’s technical expertise in solving business challenges with our younger brother’s design skills to create clear, useful experiences—from planning and development to improvements after launch.",
    "packages.label": "Services",
    "packages.title": "Explore what we can create",
    "packages.text": "Browse these packages to help shape your ideas. We’ll confirm the exact scope, cost, and schedule together.",
    "packages.menu": "Services",
    "packages.plans": "Three plans",
    "packages.details": "View plan details",
    "packages.pages": "Package pagination",
    "packages.label2": "Services",
    "works.title": "Our Work",
    "works.description": "Explore websites and web applications created for international audiences",
    "works.filter": "Filter projects",
    "works.search": "Search projects",
    "works.search.placeholder": "Search projects or skills",
    "works.search.clear": "Clear search",
    "works.type": "Project type",
    "works.field": "Industry",
    "works.count": "projects",
    "works.showing": "showing",
    "works.reset": "Reset filters",
    "works.empty": "Try another keyword or category.",
    "works.card": "View project",
    "works.skills": "Skills applied",
    "works.stack": "Technology stack",
    "works.unspecified": "Not specified in supplied notes",
    "works.dialog": "PROJECT",
    "works.close": "Close",
    "works.notice": "The current website may differ from the version delivered during this project.",
    "works.consult": "Discuss a similar project",
    "faq.title": "Frequently asked questions",
    "contact.title": "Tell us about your idea",
    "contact.description": "Your idea doesn’t need to be fully formed. Tell us where you are right now.",
    "footer.top": "Back to top",
    "footer.nav": "Footer navigation",
  },
  "zh-CN": {
    "language.label": "语言",
    "auth.logout": "退出登录",
    "skip": "跳到正文",
    "nav.about": "团队介绍",
    "nav.packages": "服务方案",
    "nav.works": "作品集",
    "nav.faq": "常见问题",
    "nav.contact": "联系我们",
    "nav.consult": "咨询我们",
    "nav.menu.open": "打开菜单",
    "nav.menu.close": "关闭菜单",
    "hero.aria": "大穗兄弟服务",
    "hero.tabs": "选择服务",
    "hero.motion": "聚焦图片后按空格键，可暂停或继续播放。",
    "hero.intro": "设计与开发，由一个团队携手完成",
    "hero.lead": "网站难以更新、数据需要重复录入、管理界面不易使用？我们从策划、设计、开发到上线后的持续改进，协助中小企业与小团队解决这些问题。",
    "hero.consult": "免费咨询",
    "hero.work": "查看作品",
    "about.label": "团队介绍",
    "about.title": "以技术为支撑，以设计传达价值",
    "about.text": "我们结合哥哥梳理业务问题的技术能力与弟弟打造清晰体验的设计能力，从策划、开发到上线后的改进，为项目提供连贯支持。",
    "packages.label": "制作方案",
    "packages.title": "了解具体制作范围",
    "packages.text": "这些方案可帮助您梳理需求。具体范围、费用与时间将在沟通后确认。",
    "packages.menu": "制作菜单",
    "packages.plans": "三个方案",
    "packages.details": "查看方案详情",
    "packages.pages": "方案分页",
    "packages.label2": "制作方案",
    "works.title": "作品集",
    "works.description": "浏览我们制作的网站与业务系统",
    "works.filter": "筛选作品",
    "works.search": "搜索作品",
    "works.search.placeholder": "搜索项目或技能",
    "works.search.clear": "清除搜索",
    "works.type": "项目类型",
    "works.field": "行业",
    "works.count": "个项目",
    "works.showing": "显示",
    "works.reset": "清除筛选",
    "works.empty": "请尝试其他关键词或类别。",
    "works.card": "查看项目",
    "works.skills": "应用技能",
    "works.stack": "技术栈",
    "works.unspecified": "提供的资料中未注明",
    "works.dialog": "项目详情",
    "works.close": "关闭",
    "works.notice": "目前网站的内容可能与项目制作时有所不同。",
    "works.consult": "咨询类似项目",
    "faq.title": "常见问题",
    "contact.title": "聊聊您的想法",
    "contact.description": "即使想法还不成熟也没关系，欢迎先告诉我们目前的情况。",
    "footer.top": "返回顶部",
    "footer.nav": "页脚导航",
  },
  "zh-HK": {
    "language.label": "語言",
    "auth.logout": "登出",
    "skip": "跳到正文",
    "nav.about": "團隊介紹",
    "nav.packages": "服務方案",
    "nav.works": "作品集",
    "nav.faq": "常見問題",
    "nav.contact": "聯絡我們",
    "nav.consult": "同我哋傾吓",
    "nav.menu.open": "打開選單",
    "nav.menu.close": "關閉選單",
    "hero.aria": "大穗兄弟服務",
    "hero.tabs": "選擇服務",
    "hero.motion": "聚焦圖片後按空白鍵，可暫停或繼續播放。",
    "hero.intro": "設計與開發，由同一團隊攜手完成",
    "hero.lead": "網站難以更新、資料要重複輸入、管理介面唔易用？我哋由策劃、設計、開發到推出後持續改善，協助中小企同小團隊解決問題。",
    "hero.consult": "免費諮詢",
    "hero.work": "睇吓我哋嘅作品",
    "about.label": "團隊介紹",
    "about.title": "以技術支援，以設計傳達價值",
    "about.text": "我哋結合哥哥整理業務問題嘅技術能力，同弟弟打造清晰體驗嘅設計能力，由策劃、開發到推出後改善，為項目提供連貫支援。",
    "packages.label": "製作方案",
    "packages.title": "了解具體製作範圍",
    "packages.text": "呢啲方案可以幫你整理想法。具體範圍、費用同時間會喺溝通後確認。",
    "packages.menu": "製作服務",
    "packages.plans": "三個方案",
    "packages.details": "查看方案詳情",
    "packages.pages": "方案分頁",
    "packages.label2": "製作方案",
    "works.title": "作品集",
    "works.description": "瀏覽我哋製作嘅網站同業務系統",
    "works.filter": "篩選作品",
    "works.search": "搜尋作品",
    "works.search.placeholder": "搜尋項目或技能",
    "works.search.clear": "清除搜尋",
    "works.type": "項目類型",
    "works.field": "行業",
    "works.count": "個項目",
    "works.showing": "顯示",
    "works.reset": "清除篩選",
    "works.empty": "請試吓其他關鍵字或類別。",
    "works.card": "查看項目",
    "works.skills": "應用技能",
    "works.stack": "技術組合",
    "works.unspecified": "提供的資料中未有註明",
    "works.dialog": "項目詳情",
    "works.close": "關閉",
    "works.notice": "目前網站內容可能同項目製作時有所不同。",
    "works.consult": "查詢類似項目",
    "faq.title": "常見問題",
    "contact.title": "同我哋分享你嘅想法",
    "contact.description": "想法未完全成形都冇問題，歡迎先講吓目前嘅情況。",
    "footer.top": "返回頂部",
    "footer.nav": "頁尾導覽",
  },
} as const;

type MessageKey = keyof typeof messages.ja;
type SiteLanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
  text: (key: MessageKey) => string;
};

const SiteLanguageContext = createContext<SiteLanguageContextValue | null>(null);

export function SiteLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SiteLanguage>("ja");
  const [preferenceLoaded, setPreferenceLoaded] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("oho-site-language");
      if (saved && isSiteLanguage(saved)) setLanguageState(saved);
    } catch { /* Language selection still works when storage is unavailable. */ }
    setPreferenceLoaded(true);
  }, []);
  useEffect(() => {
    if (!preferenceLoaded) return;
    document.documentElement.lang = language;
    document.title = `${language === "ja" ? "大穂兄弟" : "OHO BROTHERS"} | ${messages[language]["hero.intro"]}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", messages[language]["hero.lead"]);
    try { localStorage.setItem("oho-site-language", language); } catch { /* Storage is optional. */ }
  }, [language, preferenceLoaded]);
  const setLanguage = useCallback((next: SiteLanguage) => setLanguageState(next), []);
  const text = useCallback((key: MessageKey) => messages[language][key], [language]);
  const value = useMemo(() => ({ language, setLanguage, text }), [language, setLanguage, text]);
  return <SiteLanguageContext.Provider value={value}>{children}</SiteLanguageContext.Provider>;
}

export function useSiteLanguage() {
  const context = useContext(SiteLanguageContext);
  if (!context) throw new Error("useSiteLanguage must be used within SiteLanguageProvider");
  return context;
}

export function LanguageSwitcher() {
  const { language, setLanguage, text } = useSiteLanguage();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();
  const [menuOffset, setMenuOffset] = useState(0);
  useLayoutEffect(() => {
    if (!open) return;
    const position = () => {
      const bounds = trigger.current?.getBoundingClientRect();
      const panel = document.getElementById(menuId);
      if (!bounds || !panel) return;
      const naturalLeft = bounds.right - panel.offsetWidth;
      const left = Math.max(16, Math.min(naturalLeft, window.innerWidth - panel.offsetWidth - 16));
      setMenuOffset(left - naturalLeft);
    };
    position();
    window.addEventListener("resize", position);
    return () => window.removeEventListener("resize", position);
  }, [open, menuId]);
  const options: { id: SiteLanguage; label: string; code: string }[] = [
    { id: "ja", label: "日本語", code: "JA" },
    { id: "en", label: "English", code: "EN" },
    { id: "zh-CN", label: "简体中文", code: "简" },
    { id: "zh-HK", label: "廣東話", code: "繁" },
  ];
  const copy = {
    ja: { title: "表示言語を選ぶ", hint: "サイト全体の表示言語", selected: "選択中", names: ["日本語", "英語", "簡体字中国語", "広東語"] },
    en: { title: "Choose your language", hint: "Applies across the site", selected: "Selected", names: ["Japanese", "English", "Simplified Chinese", "Cantonese"] },
    "zh-CN": { title: "选择语言", hint: "应用于整个网站", selected: "已选择", names: ["日语", "英语", "简体中文", "粤语"] },
    "zh-HK": { title: "選擇語言", hint: "套用到整個網站", selected: "已選擇", names: ["日語", "英語", "簡體中文", "廣東話"] },
  }[language];
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    const closeOnFocusOutside = (event: FocusEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("focusin", closeOnFocusOutside);
    optionsRef.current[siteLanguages.indexOf(language)]?.focus();
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOnFocusOutside);
    };
  }, [open, language]);
  const moveFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    const focused = optionsRef.current.findIndex(option => option === document.activeElement);
    const current = focused < 0 ? siteLanguages.indexOf(language) : focused;
    let next = current;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (current + 1) % siteLanguages.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (current + siteLanguages.length - 1) % siteLanguages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = siteLanguages.length - 1;
    else if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); setOpen(false); trigger.current?.focus(); return; }
    else return;
    event.preventDefault();
    optionsRef.current[next]?.focus();
  };
  return <div className="site-language-select" ref={menu}>
    <button ref={trigger} className="language-menu-trigger" type="button" aria-label={`${text("language.label")}: ${options.find(option => option.id === language)?.label}`} aria-haspopup="menu" aria-controls={open ? menuId : undefined} aria-expanded={open} onClick={() => setOpen(value => !value)} onKeyDown={event => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); }
    }}>
      <span className="language-trigger-icon"><Globe2 size={17} aria-hidden="true" /></span><span>{options.find(option => option.id === language)?.label}</span><ChevronDown className="language-chevron" size={14} aria-hidden="true" />
    </button>
    {open && <div className="language-menu" style={{ translate: `${menuOffset}px 0` }} id={menuId} role="menu" aria-label={text("language.label")} onKeyDown={moveFocus}>
      <div className="language-menu-heading" role="presentation"><span>{copy.title}</span><small>{copy.hint}</small></div>
      {options.map((option, index) => <button ref={element => { optionsRef.current[index] = element; }} key={option.id} type="button" role="menuitemradio" aria-checked={language === option.id} tabIndex={language === option.id ? 0 : -1} onClick={() => { setLanguage(option.id); setOpen(false); trigger.current?.focus(); }}>
        <span className="language-option-code" aria-hidden="true">{option.code}</span><span className="language-option-copy"><span className="language-menu-label" lang={option.id}>{option.label}</span><span className="language-menu-native">{copy.names[index]}</span></span><span className="language-option-check" aria-hidden="true">{language === option.id && <Check size={15} strokeWidth={2.5} />}</span>
      </button>)}
    </div>}
  </div>;
}
