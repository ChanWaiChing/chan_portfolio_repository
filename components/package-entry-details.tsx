import { Check } from "lucide-react";
import type { ServicePackage } from "@/lib/service-packages";
import { PackageScope } from "./package-scope";

/** Entry pricing and conditions belong with the complete plan information. */
export function PackageEntryDetails({ item }: { item: ServicePackage }) {
  return <div className="package-entry-details">
    <div className="package-price">
      <small>{item.plans.length === 4 ? "単体制作の目安・税別" : "ベーシック・税別"}</small>
      <strong>¥{item.price.toLocaleString("ja-JP")}<span>〜</span></strong>
      <span>制作期間：{item.duration}</span>
    </div>
    <PackageScope item={item} />
    <div className="package-detail-deliverables"><h3>対応内容</h3>
      <ul className="dialog-deliverables">{item.deliverables.map(value => <li key={value}><Check size={16} aria-hidden="true" />{value}</li>)}</ul>
    </div>
  </div>;
}
