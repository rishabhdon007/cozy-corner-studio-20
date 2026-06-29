import { featureFlags } from "@/config/featureFlags";
import { isCatalogProductImageSrc, isLocalProductAssetSrc } from "@/data/productAssetPaths";
import { SITE_IMAGES } from "@/lib/siteImages";

const LEGACY_PRODUCT_PLACEHOLDERS = new Set<string>([
  SITE_IMAGES.products.coil,
  SITE_IMAGES.products.iron,
  SITE_IMAGES.products.plate,
]);

function decodeAssetPath(src?: string | null): string {
  const trimmed = src?.trim() ?? "";
  if (!trimmed) return "";
  try {
    return decodeURIComponent(trimmed);
  } catch {
    return trimmed;
  }
}

/** Generic stock images at /assests/products/*.png (not folder-organized assets). */
export function usesLegacyProductPlaceholder(image?: string | null): boolean {
  const decoded = decodeAssetPath(image);
  if (!decoded) return true;
  if (LEGACY_PRODUCT_PLACEHOLDERS.has(decoded)) return true;
  return /\/assests\/products\/(colled|iron|plate)\.png$/i.test(decoded);
}

/** Product uses dedicated folder assets (pickle, coil leader end, cutting folders, etc.). */
export function hasFolderProductAssets(image?: string | null): boolean {
  const decoded = decodeAssetPath(image);
  if (!decoded) return false;
  if (usesLegacyProductPlaceholder(decoded)) return false;
  return isLocalProductAssetSrc(decoded) || isCatalogProductImageSrc(decoded);
}

export function isSecondaryCatalogProductVisible(mainImage?: string | null): boolean {
  if (featureFlags.showLegacySecondaryCatalogProducts) return true;
  return hasFolderProductAssets(mainImage);
}
