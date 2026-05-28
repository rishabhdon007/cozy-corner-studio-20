import defaultCatalogImage from "@/assests/constrution area.webp";

export type CatalogMediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  label: string;
};

export const DEFAULT_CATALOG_IMAGE = defaultCatalogImage.src;
export const DEFAULT_PROCESS_VIDEO = "/assests/banner_video.mp4";

/** Placeholder / plain-color images that should never be shown in catalog UI. */
const BLOCKED_CATALOG_IMAGE_URLS = new Set<string>([
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDb9_Y_WHvzw5qyfg_kWZGIEDL1IUmyuYrnq2dmwjVywQ-tr5KnJhWJvxwxr5LnZJZABkBvzPo8ebB9l-aE4SpRISo5m45JP3lEk1e4paWLH0wcNs6veu9_pq2K_94W8Apy5xG_fu1TVnXFM5oKBeBnkfGxQSwxH2UQP7_qVIjg6Z-3MXjhabz7hOjJBhMGtD66Zmk-hsUfpG9v_J20kanmHiAC4mQeWKhvx8ea31HErSomuIY3AklCqkk3NEAldks772zPnqA2XEE",
]);

export function isBlockedCatalogImageSrc(src?: string | null): boolean {
  const trimmed = src?.trim();
  if (!trimmed) return true;
  return BLOCKED_CATALOG_IMAGE_URLS.has(trimmed);
}

export function resolveCatalogImageSrc(src?: string | null): string {
  const trimmed = src?.trim();
  if (!trimmed || isBlockedCatalogImageSrc(trimmed)) {
    return DEFAULT_CATALOG_IMAGE;
  }
  return trimmed;
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
