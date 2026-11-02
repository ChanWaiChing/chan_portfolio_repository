import { useSiteLanguage } from "./site-language";
import { localizeCategory } from "@/lib/localization";
import { Layers3, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { ServicePackage } from "@/lib/service-packages";

export function PackageThumbnail({ item }: { item: ServicePackage }) {
  const { language } = useSiteLanguage();
  const suffix = language === "ja" ? "の紹介画像" : language === "en" ? " — service overview" : language === "zh-CN" ? " — 服务介绍" : " — 服務介紹";
  if (language !== "ja") return <div className="package-thumbnail localized-package-cover" role="img" aria-label={`${item.title}${suffix}`}>
    <span className="localized-package-cover-icon" aria-hidden="true"><Layers3 size={27} /></span>
    <span>{localizeCategory(item.category, language)}</span>
    <strong>{item.title}</strong>
    <ArrowUpRight className="localized-package-cover-arrow" size={22} aria-hidden="true" />
  </div>;
  return <div className="package-thumbnail"><Image src={item.thumbnail} alt={`${item.title}${suffix}`} fill style={{ objectFit: "contain" }} sizes="(max-width: 600px) calc(100vw - 64px), (max-width: 999px) 45vw, 33vw" /></div>;
}
