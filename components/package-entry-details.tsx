import { Check } from "lucide-react";
import type { ServicePackage } from "@/lib/service-packages";
import { PackageScope } from "./package-scope";
import { useSiteLanguage } from "./site-language";

/** Entry pricing and conditions belong with the complete plan information. */
export function PackageEntryDetails({ item }: { item: ServicePackage }) {
  const { language } = useSiteLanguage();
  const copy = language === "ja" ? { unit: "単体制作の目安・税別", base: "ベーシック・税別", duration: "制作期間" }
    : language === "en" ? { unit: "Indicative standalone price · excl. tax", base: "Basic · excl. tax", duration: "Estimated duration" }
      : language === "zh-CN" ? { unit: "单项制作参考价・未含税", base: "基础方案・未含税", duration: "制作周期" }
        : { unit: "單項製作參考價・未連稅", base: "基本方案・未連稅", duration: "製作週期" };
  return <div className="package-entry-details">
    <div className="package-price">
      <small>{item.plans.length === 4 ? copy.unit : copy.base}</small>
      <strong>¥{item.price.toLocaleString("ja-JP")}<span>〜</span></strong>
      <span>{copy.duration}: {item.duration}</span>
    </div>
    <PackageScope item={item} />
    <div className="package-detail-deliverables"><h3>{language === "ja" ? "対応内容" : language === "en" ? "Deliverables" : language === "zh-CN" ? "交付内容" : "交付內容"}</h3>
      <ul className="dialog-deliverables">{item.deliverables.map(value => <li key={value}><Check size={16} aria-hidden="true" />{value}</li>)}</ul>
    </div>
  </div>;
}
