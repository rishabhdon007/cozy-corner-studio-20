import type { StaticImageData } from "next/image";

/** Public paths — served from /public (optimized via next/image). */
export const SITE_IMAGES = {
  construction: "/assests/constrution area.webp",
  teamMember: "/assests/team_member.webp",
  companyLogo: "/company_logo.webp",
  indiaMartLogo: "/assests/IndiaMART_logo.webp",
  justDialLogo: "/assests/jdlogosvg.svg",
  about: {
    screen1: "/assests/aboutus/screen.webp",
    screen2: "/assests/aboutus/screen 2.webp",
    screen3: "/assests/aboutus/screen 3.webp",
  },
  clients: {
    essar: "/assests/client_logo/essar_steel.webp",
    jindal: "/assests/client_logo/Jindal_Steel_Limited_Logo.webp",
    sail: "/assests/client_logo/sail.webp",
    tata: "/assests/client_logo/Tata_Steel_Logo.webp",
  },
  products: {
    coil: "/assests/products/colled.png",
    iron: "/assests/products/iron.png",
    plate: "/assests/products/plate.png",
  },
} as const;

export const DEFAULT_CATALOG_IMAGE = SITE_IMAGES.construction;

export type ImageSource = string | StaticImageData;

export function toImageSrc(src: ImageSource | undefined | null): string {
  if (!src) return DEFAULT_CATALOG_IMAGE;
  return typeof src === "string" ? src : src.src;
}

export const DEFAULT_PROCESS_VIDEO = "/assests/banner_video.mp4";

export type CatalogMediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  label: string;
};

/** Block legacy placeholder URLs — use local assets instead. */
const BLOCKED_IMAGE_URLS = new Set<string>([
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDb9_Y_WHvzw5qyfg_kWZGIEDL1IUmyuYrnq2dmwjVywQ-tr5KnJhWJvxwxr5LnZJZABkBvzPo8ebB9l-aE4SpRISo5m45JP3lEk1e4paWLH0wcNs6veu9_pq2K_94W8Apy5xG_fu1TVnXFM5oKBeBnkfGxQSwxH2UQP7_qVIjg6Z-3MXjhabz7hOjJBhMGtD66Zmk-hsUfpG9v_J20kanmHiAC4mQeWKhvx8ea31HErSomuIY3AklCqkk3NEAldks772zPnqA2XEE",
]);

export function isBlockedImageSrc(src?: string | null): boolean {
  const trimmed = src?.trim();
  if (!trimmed) return true;
  return BLOCKED_IMAGE_URLS.has(trimmed);
}

/** Prefer local /public paths; fall back for empty or blocked remote URLs. */
export function normalizeImageSrc(src?: string | null): string {
  const trimmed = src?.trim();
  if (!trimmed || isBlockedImageSrc(trimmed)) {
    return DEFAULT_CATALOG_IMAGE;
  }
  if (trimmed.startsWith("/")) return trimmed;
  return trimmed;
}

/** Leadership portraits — hosted remotely; keep explicit URLs for SiteImage. */
export const LEADERSHIP_IMAGES = {
  nimesh:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3TgUu2LrQ9yxbiPLUURPYM_MlspId_DSUN_ng_w2uMLbxA535POuz-nxCKeEkC3DNlUVfqbij1FLw4q0uUviq5T037fr1KboZ3HDy_GCz9x3w-21Z7jjNg3zyEOFMIOU9G8oD48X2Z4TYxgvrNyGajrz9U7PC7i_40U_1g1CFSyVpd0JN4xNTS1LRSkWEp4yW_XvXtMsLWm3ilgdpqky-2zedyBY5hwybPHzPMORDxkrGycHQTVS8X4JxkuzyjMwhHJ9cIDDQoLw",
  nishant:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAj7n5lAwMcVPrQrg5h8KK0TWK2pKPodYhZ5K3IUr0_UWty9yuZc-WvUimut6KiBphtbJWKxFGId8WJZiiW6-DrsyDMY6g34m7-_I_rXvh6REaiR2qOWYIlQ0EvKC2y7ztv2PPqUqK_S2j2Tq_QEX2b4juiDIy8oWKUre40jJVFpqDvgm_xFJ1XertgyDCWiNNx73XfAA_QCdFEF3eo-8AbdqfdT5jKehqAzXqi5InIxn4T0sDrgcoS6DjRh4iTZtGdVw-RMm_V9Zc",
  dhaval:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDWBw7mymMo3O9SVSgQxtjOXA5CQIaopTnVqiesY2dAWfReGiRHyg1s5OF7og0raZsEMoA9igZEADmXhKrvMnNeerK54yUByqBJAP99AYrJ08J1uYjNn-zYbJxglejJbxyFyymJLWZGsxNvf8zKJm1tex5FGggweCKeMtMZFPOKQrJc02Avq303grL_QN2yTJJoG4-QwXyKh6dM2qPP_SFJg6Z9Gfkqz2y8fqqMX2zK7R4kd_z1UvlCDn19KsPyCjNUTiYEJVe0sMU",
} as const;

export const HOMEPAGE_BANNER_VIDEO = "/homepage_banner_bg.mp4";

export function isSvgSrc(src: string): boolean {
  return src.endsWith(".svg");
}
