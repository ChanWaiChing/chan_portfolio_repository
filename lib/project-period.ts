import type { SiteLanguage } from "@/components/site-language";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const countries: Record<string, Record<SiteLanguage, string>> = {
  "United Kingdom": { ja: "イギリス", en: "United Kingdom", "zh-CN": "英国", "zh-HK": "英國" },
  "United States": { ja: "アメリカ", en: "United States", "zh-CN": "美国", "zh-HK": "美國" },
  France: { ja: "フランス", en: "France", "zh-CN": "法国", "zh-HK": "法國" },
  Canada: { ja: "カナダ", en: "Canada", "zh-CN": "加拿大", "zh-HK": "加拿大" },
  Germany: { ja: "ドイツ", en: "Germany", "zh-CN": "德国", "zh-HK": "德國" },
};
const terms: [string, Record<SiteLanguage, string>][] = [
  ["Development work:", { ja: "制作期間：", en: "Development work:", "zh-CN": "制作周期：", "zh-HK": "製作週期：" }],
  ["Created:", { ja: "新規制作：", en: "Created:", "zh-CN": "新建：", "zh-HK": "新建：" }],
  ["Renewal:", { ja: "リニューアル：", en: "Renewal:", "zh-CN": "改版：", "zh-HK": "改版：" }],
  ["リニューアル：", { ja: "リニューアル：", en: "Renewal: ", "zh-CN": "改版：", "zh-HK": "改版：" }],
  ["新規制作：", { ja: "新規制作：", en: "Created: ", "zh-CN": "新建：", "zh-HK": "新建：" }],
];

/** Localize date wording without changing recorded numeric values or precision. */
export function localizeProjectPeriod(period: string, language: SiteLanguage): string {
  let localized = period;
  for (const [source, labels] of terms) {
    if (period.startsWith(source)) { localized = labels[language] + period.slice(source.length); break; }
  }
  for (const [source, labels] of Object.entries(countries)) localized = localized.replace(source, labels[language]);
  if (language === "en") {
    return localized.replace(/(\d{4})年(\d{1,2})月(?:(\d{1,2})日)?/g, (_, year, month, day) => `${year}/${month}${day ? `/${day}` : ""}`);
  }
  return localized.replace(/([A-Z][a-z]+)(?:–([A-Z][a-z]+))? (\d{4})/g, (original, start, end, year) => {
    const first = monthNames.indexOf(start) + 1;
    const last = end ? monthNames.indexOf(end) + 1 : 0;
    if (!first || (end && !last)) return original;
    return `${year}年${first}${end ? `–${last}` : ""}月`;
  });
}
