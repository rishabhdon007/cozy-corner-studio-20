import { isPickleProductImageSrc } from "@/data/crCoiledPickledVariants";
import { isPickledCuttingProductImageSrc } from "@/data/crPickledCuttingAssets";
import { isCoilLeaderEndProductImageSrc } from "@/data/crSemiHardVariantCatalog";
import { isCrSemiHardCuttingProductImageSrc } from "@/data/crSemiHardCuttingVariantCatalog";
import { isBpSheetProductImageSrc } from "@/data/bpSheetVariantCatalog";
import { isCenteringPlateProductImageSrc } from "@/data/centeringPlateVariantCatalog";
import { isShutterChannelProductImageSrc } from "@/data/shutterChannelVariantCatalog";
import { isAcStandProductImageSrc } from "@/data/acStandVariantCatalog";

function decodeAssetPath(src?: string | null): string {
  const trimmed = src?.trim() ?? "";
  if (!trimmed) return "";
  try {
    return decodeURIComponent(trimmed);
  } catch {
    return trimmed;
  }
}

/** Paths served directly from /public — bypass next/image optimization */
export function isCatalogProductImageSrc(src?: string | null): boolean {
  const normalized = decodeAssetPath(src);
  return (
    isPickleProductImageSrc(normalized) ||
    isPickledCuttingProductImageSrc(normalized) ||
    isCoilLeaderEndProductImageSrc(normalized) ||
    isCrSemiHardCuttingProductImageSrc(normalized) ||
    isBpSheetProductImageSrc(normalized) ||
    isCenteringPlateProductImageSrc(normalized) ||
    isShutterChannelProductImageSrc(normalized) ||
    isAcStandProductImageSrc(normalized)
  );
}

/** Any local product asset under /assests/products (CMS-uploaded paths) */
export function isLocalProductAssetSrc(src?: string | null): boolean {
  const normalized = decodeAssetPath(src);
  return normalized.startsWith("/assests/products/");
}
