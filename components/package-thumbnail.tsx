import Image from "next/image";
import type { ServicePackage } from "@/lib/service-packages";

export function PackageThumbnail({ item }: { item: ServicePackage }) {
  return <div className="package-thumbnail">
    <Image src={item.thumbnail} alt={`${item.title}の紹介画像`} fill sizes="(max-width: 600px) calc(100vw - 92px), (max-width: 980px) 40vw, 340px" />
  </div>;
}
