import {
  DEFAULT_CATALOG_IMAGE,
  DEFAULT_PROCESS_VIDEO,
  isBlockedImageSrc,
  normalizeImageSrc,
  type CatalogMediaItem,
} from "@/lib/siteImages";
import { isCatalogProductImageSrc, isLocalProductAssetSrc } from "@/data/productAssetPaths";

export type { CatalogMediaItem };

export { DEFAULT_CATALOG_IMAGE, DEFAULT_PROCESS_VIDEO };

export function isBlockedCatalogImageSrc(src?: string | null): boolean {
  return isBlockedImageSrc(src);
}

export function resolveCatalogImageSrc(src?: string | null): string {
  return normalizeImageSrc(src);
}

type CatalogMediaSource = {
  title: string;
  mainImage: string;
  processImage: string;
  processVideo?: string;
  gallery: string[];
};

export function buildCatalogMediaItems(item: CatalogMediaSource): CatalogMediaItem[] {
  const seen = new Set<string>();
  const items: CatalogMediaItem[] = [];

  const push = (entry: CatalogMediaItem) => {
    const key = `${entry.type}:${entry.src}`;
    if (seen.has(key)) return;
    seen.add(key);
    items.push(entry);
  };

  const mainImage = resolveCatalogImageSrc(item.mainImage);
  const processImage = resolveCatalogImageSrc(item.processImage);

  push({
    id: "main",
    type: "image",
    src: mainImage,
    label: "Overview",
  });

  if (processImage !== mainImage) {
    push({
      id: "process-image",
      type: "image",
      src: processImage,
      label: "Process",
    });
  }

  push({
    id: "process-video",
    type: "video",
    src: item.processVideo ?? DEFAULT_PROCESS_VIDEO,
    poster: processImage,
    label: "Process Video",
  });

  item.gallery.forEach((src, index) => {
    push({
      id: `gallery-${index}`,
      type: "image",
      src: resolveCatalogImageSrc(src),
      label: `Gallery ${index + 1}`,
    });
  });

  return items;
}

export function buildThicknessVariantMediaItems(
  images: string[],
  variantLabel: string,
  fallbackImage?: string,
  idPrefix = "variant",
): CatalogMediaItem[] {
  const catalogImages = images.filter(
    (src) => isCatalogProductImageSrc(src) || isLocalProductAssetSrc(src),
  );

  if (catalogImages.length === 0 && fallbackImage) {
    return [
      {
        id: `${idPrefix}-fallback`,
        type: "image" as const,
        src: resolveCatalogImageSrc(fallbackImage),
        label: variantLabel,
      },
    ];
  }

  return catalogImages.map((src, index) => ({
    id: `${idPrefix}-img-${index}`,
    type: "image" as const,
    src: resolveCatalogImageSrc(src),
    label: index === 0 ? variantLabel : `View ${index + 1}`,
  }));
}
