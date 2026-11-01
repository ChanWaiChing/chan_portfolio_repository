import Image from "next/image";
import type { ServicePackage } from "@/lib/service-packages";

export function PackageThumbnail({ item }: { item: ServicePackage }) {
  return <div className="package-thumbnail"><Image src={item.thumbnail} alt={`${item.title}の紹介画像`} fill style={{ objectFit: "contain" }} sizes="(max-width: 600px) calc(100vw - 64px), (max-width: 999px) 45vw, 33vw" /></div>;
}
