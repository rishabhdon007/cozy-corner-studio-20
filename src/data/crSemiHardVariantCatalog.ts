import type { ProductSizeBand, ProductVariantCatalog } from "@/data/catalogTypes";

const COIL_LEADER_END_ROOT = "COIL LEADER END (CR Semi Hard)";
const COIL_LEADER_END_BASE = `/assests/products/${encodeURIComponent(COIL_LEADER_END_ROOT)}`;

const WEB_IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;

export function isCoilLeaderEndProductImageSrc(src?: string | null): boolean {
  const normalized = src?.trim() ?? "";
  return normalized.includes("/assests/products/COIL LEADER END");
}

export function coilLeaderEndAsset(sizeFolder: string, thicknessFolder: string, file: string): string {
  return `${COIL_LEADER_END_BASE}/${encodeURIComponent(sizeFolder)}/${encodeURIComponent(thicknessFolder)}/${encodeURIComponent(file)}`;
}

function bandImages(sizeFolder: string, thicknessFolder: string, files: string[]): string[] {
  return files
    .filter((file) => WEB_IMAGE_PATTERN.test(file))
    .map((file) => coilLeaderEndAsset(sizeFolder, thicknessFolder, file));
}

function thicknessBand(
  id: string,
  label: string,
  thickness: string,
  sizeFolder: string,
  thicknessFolder: string,
  files: string[],
  details?: string[],
): ProductSizeBand["thicknessBands"][number] {
  return {
    id,
    label,
    thickness,
    images: bandImages(sizeFolder, thicknessFolder, files),
    details,
  };
}

const SIZE_8X4 = "8 x 4 FT";
const SIZE_7X11_FOLDER = "7 x 11 FT";
const SIZE_RANDOM = "7 to 11FT x 3! x 4 x 4! FT (RANDOM)";

/** COIL LEADER END — CR Semi-Hard Sheets (size → thickness → folder assets) */
export const crSemiHardVariantCatalog: ProductVariantCatalog = {
  sizeBands: [
    {
      id: "random-7-11",
      label: SIZE_RANDOM,
      size: SIZE_RANDOM,
      thicknessBands: [
        thicknessBand("rnd-2-15-2-35", "2.15 to 2.35 mm", "2.15 to 2.35", SIZE_7X11_FOLDER, " 2.15 to 2.35m", ["1.webp", "2.webp", "3.webp"]),
        thicknessBand("rnd-2-40-2-60", "2.40 to 2.60 mm", "2.40 to 2.60", SIZE_7X11_FOLDER, "2.40 too 2.60mm", ["1.jpeg", "2.jpeg"]),
        thicknessBand("rnd-2-70-3-10", "2.70 to 3.10 mm", "2.70 to 3.10", SIZE_7X11_FOLDER, "2.70 to 3.10mm", ["1.webp", "2.webp", "3.webp"]),
        thicknessBand("rnd-3-20-3-50", "3.20 to 3.50 mm", "3.20 to 3.50", SIZE_7X11_FOLDER, "3.20 to 3.50mm", ["1.webp", "2.webp"]),
        thicknessBand("rnd-3-50-4-50", "3.50 to 4.50 mm", "3.50 to 4.50", SIZE_7X11_FOLDER, "3.50 to 4.50mm", []),
      ],
    },
    {
      id: "8x4",
      label: "8 x 4 FT",
      size: "8 x 4 FT",
      thicknessBands: [
        thicknessBand("8x4-1-80-2-10", "1.80 to 2.10 mm", "1.80 to 2.10", SIZE_8X4, "1.80 to 2.10 mm", ["1.jpeg"]),
        thicknessBand("8x4-1-40-1-60", "1.40 to 1.60 mm", "1.40 to 1.60", SIZE_8X4, "1.40 to 1.60 mm", []),
        thicknessBand("8x4-1-10-1-30", "1.10 to 1.30 mm", "1.10 to 1.30", SIZE_8X4, "1.10 t0 1.30", ["1.jpeg", "2.jpeg"]),
        thicknessBand("8x4-0-90-1-00", "0.90 to 1.00 mm", "0.90 to 1.00", SIZE_8X4, "0.90 t0 1.05 mm", ["1.jpeg", "2.jpeg", "3.jpeg"]),
        thicknessBand("8x4-0-70-0-85", "0.70 to 0.85 mm", "0.70 to 0.85", SIZE_8X4, "0.70 to 0.85 mm", ["1.jpeg", "2.jpeg"]),
        thicknessBand("8x4-0-55-0-65", "0.55 to 0.65 mm", "0.55 to 0.65", SIZE_8X4, "0.55 to 0.60 mm", ["1.jpeg", "2.jpeg", "3.jpeg"]),
        thicknessBand("8x4-0-30-0-50", "0.30 to 0.50 mm", "0.30 to 0.50", SIZE_8X4, "0.30  to 0.50 mm", ["1.jpeg", "2.jpeg"]),
      ],
    },
    {
      id: "8x3",
      label: "8x3 / 3! / 3!! FT",
      size: "8x3 / 3! / 3!! FT",
      thicknessBands: [
        thicknessBand(
          "8x3-0-70-1-60",
          "0.70 to 1.60 mm",
          "0.70 to 1.60",
          "8x3 / 3! / 3!! FT",
          "0.70 to 1.60 mm",
          [],
          ["Arising stock — confirm availability before booking"],
        ),
      ],
    },
  ],
};

/** First band with images for card hero / main image */
export function getCrSemiHardPrimaryImage(): string {
  for (const size of crSemiHardVariantCatalog.sizeBands) {
    for (const band of size.thicknessBands) {
      if (band.images[0]) return band.images[0];
    }
  }
  return "";
}
