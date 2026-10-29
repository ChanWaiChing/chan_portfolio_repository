import { CatalogArtwork } from "./catalog-artwork";
import type { ServicePackage } from "@/lib/service-packages";

export function PackageThumbnail({ item }: { item: ServicePackage }) {
  return <CatalogArtwork item={item} />;
}
