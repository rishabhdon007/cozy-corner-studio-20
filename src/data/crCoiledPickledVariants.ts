import type { ProductThicknessVariant, ProductVariantCatalog } from "@/data/catalogTypes";

export const CR_PICKLED_SHEETS_SIZE = "7 to 11FT x 3! x 4 x 4! FT (RANDOM)";

const PICKLE_BASE = "/assests/products/pickle";

/** Browser-safe formats only — HEIC is not supported in web browsers. */
const WEB_IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;

export function isPickleProductImageSrc(src?: string | null): boolean {
  const normalized = src?.trim() ?? "";
  return normalized.includes("/assests/products/pickle/") || normalized.includes("/products/pickle/");
}

export function isWebDisplayImageFilename(file: string): boolean {
  return WEB_IMAGE_PATTERN.test(file);
}

/** Encode folder + file so spaces and special chars load correctly. */
export function pickleAsset(folder: string, file: string): string {
  return `${PICKLE_BASE}/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

function variantImages(folder: string, files: string[]): string[] {
  return files.filter(isWebDisplayImageFilename).map((file) => pickleAsset(folder, file));
}

export const crCoiledPickledThicknessVariants: ProductThicknessVariant[] = [
  {
    id: "1-80-2-10",
    label: "1.80 to 2.10 mm",
    thickness: "1.80 to 2.10",
    images: variantImages("Pick 1.80 to 2.10 mm", ["1.jpg", "2.jpg", "3.png", "4.png"]),
    details: ["Soft pickled secondary sheets", "Ready stock ex Indore yard"],
  },
  {
    id: "2-15-2-35",
    label: "2.15 to 2.35 mm",
    thickness: "2.15 to 2.35",
    images: variantImages("Pick 2.15 to 2.35 mm", ["1.webp", "2.webp", "3.webp"]),
    details: ["Coil-end pickled material", "Random length sheets"],
  },
  {
    id: "2-40-2-60",
    label: "2.40 to 2.60 mm",
    thickness: "2.40 to 2.60",
    images: variantImages("Pick 2.40 to 2.60 mm", ["1.webp", "2.webp", "3.webp", "4.jpg"]),
    details: ["Pickled CR secondary sheets", "Width bands: 3! / 4 / 4! FT"],
  },
  {
    id: "2-70-3-10",
    label: "2.70 to 3.10 mm",
    thickness: "2.70 to 3.10",
    images: variantImages("Pick 2.70 to 3.10 mm", ["1.webp", "2.webp", "3.webp"]),
    details: ["Medium thickness pickled band", "Suitable for fabrication lots"],
  },
  {
    id: "3-20-3-50",
    label: "3.20 to 3.50 mm",
    thickness: "3.20 to 3.50",
    images: variantImages("Pick 3.20 to 3.50 mm", ["1.jpg", "2.png"]),
    details: ["Heavier pickled secondary sheets", "Bundled for bulk dispatch"],
  },
  {
    id: "3-50-4-50",
    label: "3.50 to 4.50 mm",
    thickness: "3.50 to 4.50",
    images: variantImages("Pick 3.80 to 4.10 mm", ["1.png", "2.png", "3.png"]),
    details: ["Thick pickled secondary band", "Confirm availability before booking"],
  },
];

/** CMS-ready catalog: single random size with thickness bands */
export const crCoiledPickledVariantCatalog: ProductVariantCatalog = {
  sizeBands: [
    {
      id: "pickled-random",
      label: CR_PICKLED_SHEETS_SIZE,
      size: CR_PICKLED_SHEETS_SIZE,
      thicknessBands: crCoiledPickledThicknessVariants.map((variant) => ({
        id: variant.id,
        label: variant.label,
        thickness: variant.thickness,
        images: variant.images,
        details: variant.details,
        specs: variant.specs,
      })),
    },
  ],
};
