import type { SiteLanguage } from "@/components/site-language";

const categories: Record<string, Partial<Record<SiteLanguage, string>>> = {
  "すべて": { en: "All", "zh-CN": "全部", "zh-HK": "全部" },
  "ウェブ制作": { en: "Web", "zh-CN": "网站制作", "zh-HK": "網站製作" },
  "ウェブサイト": { en: "Websites", "zh-CN": "网站", "zh-HK": "網站" },
  "ECサイト": { en: "E-commerce", "zh-CN": "电商网站", "zh-HK": "網店" },
  "ランディングページ": { en: "Landing pages", "zh-CN": "落地页", "zh-HK": "登陸頁" },
  "システム開発": { en: "Systems & automation", "zh-CN": "系统开发", "zh-HK": "系統開發" },
  "デザイン": { en: "Design", "zh-CN": "设计", "zh-HK": "設計" },
  "AI・業務改善": { en: "AI & operations", "zh-CN": "AI与业务改善", "zh-HK": "AI及業務改善" },
  "コンサルティング": { en: "Consulting", "zh-CN": "咨询", "zh-HK": "顧問服務" },
};

export function localizeCategory(category: string, language: SiteLanguage) {
  return categories[category]?.[language] || category;
}

const marketLabels = {
  en: { japan: "Japan", global: "Global" },
  "zh-CN": { japan: "日本项目", global: "全球项目" },
  "zh-HK": { japan: "日本項目", global: "全球項目" },
} as const;

export function localizeMarket(market: "japan" | "global", language: SiteLanguage) {
  return language === "ja" ? (market === "japan" ? "日本向け" : "グローバル向け") : marketLabels[language][market];
}

const fields: Record<string, Partial<Record<SiteLanguage, string>>> = {
  "企業・製造業": { en: "Corporate & Industry", "zh-CN": "企业与制造业", "zh-HK": "企業及製造業" },
  "IT・テクノロジー": { en: "Technology", "zh-CN": "IT与科技", "zh-HK": "IT及科技" },
  "美容・サロン": { en: "Beauty & Salons", "zh-CN": "美容与沙龙", "zh-HK": "美容及美容院" },
  "フィットネス": { en: "Fitness", "zh-CN": "健身", "zh-HK": "健身" },
  "ファッション": { en: "Fashion", "zh-CN": "时尚", "zh-HK": "時尚" },
  "食品・暮らし": { en: "Food & Lifestyle", "zh-CN": "食品与生活", "zh-HK": "食品及生活" },
  "医療・福祉": { en: "Healthcare", "zh-CN": "医疗与福利", "zh-HK": "醫療及福利" },
  "金融": { en: "Finance", "zh-CN": "金融", "zh-HK": "金融" },
  "教育・学習": { en: "Education", "zh-CN": "教育与学习", "zh-HK": "教育及學習" },
  "不動産": { en: "Real Estate", "zh-CN": "房地产", "zh-HK": "房地產" },
};

export function localizeField(field: string, language: SiteLanguage) {
  return fields[field]?.[language] || field;
}
