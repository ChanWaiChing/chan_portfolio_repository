"use client";
import { useSiteLanguage, LanguageSwitcher } from "@/components/site-language";
import { translateContent } from "@/lib/catalog-localization";
export default function NotFound() {
  const { language } = useSiteLanguage();
  const t = (value: string) => translateContent(value, language);
  return <main className="content-section not-found-page"><LanguageSwitcher /><p className="eyebrow">大穂兄弟</p><h1>{t("ページが見つかりません")}</h1><p>{t("お探しのページは移動したか、公開されていない可能性があります。")}</p><a href="/" className="catalog-cta">{t("トップページへ戻る")}</a></main>;
}
