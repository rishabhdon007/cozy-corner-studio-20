/**
 * Site-wide feature flags — flip here or via env when wiring CMS.
 * `NEXT_PUBLIC_*` vars are available on client and server.
 */
export const featureFlags = {
  /**
   * When false, secondary catalog cards use only products with folder-based assets
   * (pickle/, COIL LEADER END/, CR PICKELED CUTTING/, etc.) — not generic
   * /assests/products/colled.png | iron.png | plate.png placeholders.
   */
  showLegacySecondaryCatalogProducts:
    process.env.NEXT_PUBLIC_SHOW_LEGACY_SECONDARY_PRODUCTS === "true",
} as const;
