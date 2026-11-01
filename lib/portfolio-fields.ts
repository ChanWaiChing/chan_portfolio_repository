export const portfolioFields = [
  { id: "corporate", ja: "企業・製造業", en: "Corporate & Industry" },
  { id: "technology", ja: "IT・テクノロジー", en: "Technology" },
  { id: "beauty", ja: "美容・サロン", en: "Beauty & Salons" },
  { id: "fitness", ja: "フィットネス", en: "Fitness" },
  { id: "fashion", ja: "ファッション", en: "Fashion" },
  { id: "lifestyle", ja: "食品・暮らし", en: "Food & Lifestyle" },
  { id: "healthcare", ja: "医療・福祉", en: "Healthcare" },
  { id: "finance", ja: "金融", en: "Finance" },
  { id: "education", ja: "教育・学習", en: "Education" },
  { id: "realestate", ja: "不動産", en: "Real Estate" },
] as const;
export type PortfolioField = (typeof portfolioFields)[number]["id"];
export const fieldLabel = (field: PortfolioField, english = false) => {
  const entry = portfolioFields.find(item => item.id === field)!;
  return english ? entry.en : entry.ja;
};
