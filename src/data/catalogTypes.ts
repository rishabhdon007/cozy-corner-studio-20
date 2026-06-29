export type ProductRecommendation = {
  slug: string;
  title: string;
  type: string;
  image: string;
  note: string;
};

export type CatalogOffering = {
  id: string;
  title: string;
  /** e.g. "₹ 35,000" — use "Not mentioned" when unknown */
  price: string;
  /** e.g. "Tonne", "Kg" */
  priceUnit?: string;
  /** e.g. "+ GST EX Indore" */
  priceNote?: string;
  minOrderQty?: string;
  minOrderUnit?: string;
  specs: Array<{ label: string; value: string }>;
  /** Optional footer note (IndiaMART-style offer line) */
  highlight?: string;
};

/** Thickness band within a size — CMS-friendly leaf node with images and optional rate */
export type ProductThicknessBand = {
  id: string;
  /** Display label, e.g. "1.80 to 2.10 mm" */
  label: string;
  /** Thickness range for specs and WhatsApp, e.g. "1.80 to 2.10" */
  thickness: string;
  /** Web-friendly image paths for this band */
  images: string[];
  details?: string[];
  specs?: Array<{ label: string; value: string }>;
  /** Optional per-band pricing (e.g. "₹ 46,000") */
  price?: string;
  priceUnit?: string;
};

/** Size band containing nested thickness bands — matches folder Size > Thickness layout */
export type ProductSizeBand = {
  id: string;
  /** Short tab label, e.g. "8 x 4 FT" */
  label: string;
  /** Full size string for specs / WhatsApp */
  size: string;
  thicknessBands: ProductThicknessBand[];
};

/**
 * Hierarchical product variants for detail pages.
 * Designed for future CMS: Name → Size → Thickness → images/rates.
 */
export type ProductVariantCatalog = {
  sizeBands: ProductSizeBand[];
};

/** @deprecated Prefer ProductThicknessBand inside ProductVariantCatalog */
export type ProductThicknessVariant = {
  id: string;
  label: string;
  thickness: string;
  images: string[];
  details?: string[];
  specs?: Array<{ label: string; value: string }>;
};

export type CatalogCardMeta = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  kind: "service" | "product";
  section: "processing" | "fabrication" | "prime" | "secondary";
};
