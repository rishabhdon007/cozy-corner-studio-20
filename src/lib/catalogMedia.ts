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

  push({
    id: "main",
    type: "image",
    src: mainImage,
    label: "Overview",
  });

  const isPlaceholder = (src: string) =>
    src === "/assests/constrution area.webp" ||
    src === "/assests/products/colled.png" ||
    src === "/assests/products/iron.png" ||
    src === "/assests/products/plate.png";

  const processImage = item.processImage ? resolveCatalogImageSrc(item.processImage) : null;
  if (processImage && processImage !== mainImage && !isPlaceholder(processImage)) {
    push({
      id: "process-image",
      type: "image",
      src: processImage,
      label: "Process",
    });
  }

  if (item.processVideo) {
    push({
      id: "process-video",
      type: "video",
      src: item.processVideo,
      poster: processImage || mainImage,
      label: "Process Video",
    });
  }

  if (item.gallery && item.gallery.length > 0) {
    item.gallery.forEach((src, index) => {
      const resolved = resolveCatalogImageSrc(src);
      if (src && src.trim() !== "" && !isPlaceholder(resolved)) {
        push({
          id: `gallery-${index}`,
          type: "image",
          src: resolved,
          label: `Gallery ${index + 1}`,
        });
      }
    });
  }

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
