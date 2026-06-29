import type { CatalogOffering, ProductRecommendation, ProductVariantCatalog, ProductThicknessVariant } from "@/data/catalogTypes";
import { SITE_IMAGES } from "@/lib/siteImages";

export type CatalogIcon = "gauge" | "shield" | "truck";

export type CatalogDetail = {
  slug: string;
  title: string;
  category: string;
  eyebrow: string;
  badge: string;
  summary: string;
  description: string;
  mainImage: string;
  processImage: string;
  processVideo?: string;
  gallery: string[];
  specs: Array<{ label: string; value: string }>;
  variants: string[];
  technicalSpecs: Array<{ property: string; value: string; method: string }>;
  featureCards: Array<{ icon: CatalogIcon; title: string; body: string }>;
  process: string[];
  recommendations: ProductRecommendation[];
  /** IndiaMART-style product lines with pricing and per-variant specs */
  offerings?: CatalogOffering[];
  /** Hierarchical size → thickness variant catalog (CMS-friendly) */
  variantCatalog?: ProductVariantCatalog;
  /** @deprecated Use variantCatalog — flat thickness list for legacy products */
  thicknessVariants?: ProductThicknessVariant[];
};

export type CatalogEntryInput = {
  slug: string;
  title: string;
  category: string;
  eyebrow: string;
  badge: string;
  summary: string;
  description: string;
  specs: Array<{ label: string; value: string }>;
  variants: string[];
  technicalSpecs?: Array<{ property: string; value: string; method: string }>;
  featureCards?: Array<{ icon: CatalogIcon; title: string; body: string }>;
  process?: string[];
  mainImage?: string;
  processImage?: string;
  processVideo?: string;
  gallery?: string[];
  recommendations?: ProductRecommendation[];
  offerings?: CatalogOffering[];
  variantCatalog?: ProductVariantCatalog;
  thicknessVariants?: ProductThicknessVariant[];
};

export const CATALOG_IMAGES = {
  slitting: SITE_IMAGES.products.iron,
  cutToLength: SITE_IMAGES.products.coil,
  annealing: SITE_IMAGES.construction,
  hr: SITE_IMAGES.products.plate,
  cr: SITE_IMAGES.products.coil,
  coated: SITE_IMAGES.products.iron,
  ms: SITE_IMAGES.products.plate,
  logistics: SITE_IMAGES.construction,
  profile: SITE_IMAGES.products.iron,
  purlin: SITE_IMAGES.products.plate,
  centering: SITE_IMAGES.products.plate,
} as const;

const gallerySet = [
  SITE_IMAGES.products.plate,
  SITE_IMAGES.products.coil,
  SITE_IMAGES.construction,
];

const processImage = SITE_IMAGES.construction;

export const defaultPurchaseTerms = [
  { property: "Payment Terms", value: "Payment Against Delivery", method: "Standard NRK terms" },
  { property: "Minimum Order", value: "10 MT", method: "Brochure terms" },
  { property: "Dispatch", value: "Indore & pan-India", method: "Logistics planning" },
];

export function withPurchaseTerms(
  specs: Array<{ property: string; value: string; method: string }>,
): Array<{ property: string; value: string; method: string }> {
  return [...specs, ...defaultPurchaseTerms];
}

const primeFeatureCards = [
  {
    icon: "gauge" as const,
    title: "Prime Quality",
    body: "Material sourced from leading national brands with grade and size verification before dispatch.",
  },
  {
    icon: "shield" as const,
    title: "Verified Supply",
    body: "Batch documentation and inspection support transparent procurement for repeat industrial orders.",
  },
  {
    icon: "truck" as const,
    title: "Timely Delivery",
    body: "Ready stock and coordinated transport help projects stay on schedule across Central India.",
  },
];

const secondaryFeatureCards = [
  {
    icon: "gauge" as const,
    title: "Value Supply",
    body: "Secondary and coil-end material options for cost-effective fabrication and construction needs.",
  },
  {
    icon: "shield" as const,
    title: "Practical Grades",
    body: "Semi hard, soft, and mixed annealed material supplied with clear size and thickness bands.",
  },
  {
    icon: "truck" as const,
    title: "Bulk Dispatch",
    body: "Cutting, bundling, and transport support available for secondary material lots.",
  },
];

const serviceFeatureCards = [
  {
    icon: "gauge" as const,
    title: "On-Premises Capability",
    body: "Processing and handling are performed at NRK facilities with controlled workflows and inspection.",
  },
  {
    icon: "shield" as const,
    title: "Quality Focus",
    body: "Operations are planned to protect material condition and support dependable customer outcomes.",
  },
  {
    icon: "truck" as const,
    title: "End-to-End Support",
    body: "Processing can be combined with weighing, storage, and dispatch for a complete supply path.",
  },
];

export function buildCatalogEntry(input: CatalogEntryInput): CatalogDetail {
  return {
    slug: input.slug,
    title: input.title,
    category: input.category,
    eyebrow: input.eyebrow,
    badge: input.badge,
    summary: input.summary,
    description: input.description,
    mainImage: input.mainImage ?? SITE_IMAGES.construction,
    processImage: input.processImage ?? processImage,
    processVideo: input.processVideo,
    gallery: input.gallery ?? gallerySet,
    specs: input.specs,
    variants: input.variants,
    technicalSpecs: input.technicalSpecs ?? defaultPurchaseTerms,
    featureCards: input.featureCards ?? primeFeatureCards,
    process: input.process ?? ["Requirement review", "Material allocation", "Processing if required", "Dispatch and delivery"],
    recommendations: input.recommendations ?? [],
    offerings: input.offerings,
    variantCatalog: input.variantCatalog,
    thicknessVariants: input.thicknessVariants,
  };
}

export function buildPrimeProduct(input: Omit<CatalogEntryInput, "featureCards">): CatalogDetail {
  return buildCatalogEntry({ ...input, featureCards: primeFeatureCards });
}

export function buildSecondaryProduct(input: Omit<CatalogEntryInput, "featureCards">): CatalogDetail {
  return buildCatalogEntry({ ...input, featureCards: secondaryFeatureCards });
}

export function buildServiceEntry(input: Omit<CatalogEntryInput, "featureCards">): CatalogDetail {
  return buildCatalogEntry({ ...input, featureCards: serviceFeatureCards });
}

export function buildCatalogMap<T extends CatalogEntryInput>(
  entries: readonly T[],
  builder: (input: T) => CatalogDetail = buildCatalogEntry,
): Record<string, CatalogDetail> {
  return Object.fromEntries(entries.map((entry) => [entry.slug, builder(entry)]));
}
