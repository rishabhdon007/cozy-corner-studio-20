import type { ProductSizeBand, ProductVariantCatalog } from "@/data/catalogTypes";

const ROOT_FOLDER = "CR Semi Hard cutting";
const BASE_PATH = `/assests/products/${encodeURIComponent(ROOT_FOLDER)}`;

const WEB_IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;

export function isCrSemiHardCuttingProductImageSrc(src?: string | null): boolean {
  const normalized = src?.trim() ?? "";
  return normalized.includes("/assests/products/CR Semi Hard cutting");
}

export function crSemiHardCuttingAsset(subfolder: string, file: string): string {
  return `${BASE_PATH}/${encodeURIComponent(subfolder)}/${encodeURIComponent(file)}`;
}

function bandImages(subfolder: string, files: string[]): string[] {
  return files
    .filter((file) => WEB_IMAGE_PATTERN.test(file))
    .map((file) => crSemiHardCuttingAsset(subfolder, file));
}

function thicknessBand(
  id: string,
  label: string,
  thickness: string,
  subfolder: string,
  files: string[],
  details?: string[],
): ProductSizeBand["thicknessBands"][number] {
  return {
    id,
    label,
    thickness,
    images: bandImages(subfolder, files),
    details,
  };
}

export const crSemiHardCuttingVariantCatalog: ProductVariantCatalog = {
  sizeBands: [
    {
      id: "1.5ft-5ft",
      label: "SIZE: 1.5ft to 5ft x 4/4!",
      size: "1.5ft to 5ft x 4/4!",
      thicknessBands: [
        thicknessBand(
          "cutting-1-80-4-00",
          "1.80 to 4.00 mm",
          "1.80 to 4.00",
          "1.5ft to 5ft",
          ["1.jpeg", "2.jpeg"],
          [
            "CRFH CUTTING 1.8 TO 4MM",
            "CR SEMI-HARD CUTTING",
            "SIZE: 1.5ft to 5ft x 4/4! (width: 4ft / 4.25ft)",
            "Thickness: 1.80 to 4.00 mm",
            "Ready stock ex Indore yard"
          ]
        ),
      ],
    },
    {
      id: "1ft-5ft",
      label: "SIZE: 1ft to 5ft Length",
      size: "1ft to 5ft Length",
      thicknessBands: [
        thicknessBand(
          "cutting-0-30-0-60",
          "0.30 to 0.60 mm",
          "0.30 to 0.60",
          "1ft to 5ft",
          ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"],
          [
            "CRFH CUTTING",
            "Length: 1ft to 5ft",
            "Width: 3 / 3.25 / 3.5 / 4 / 4.25 / 4.5 FT (3/3L/3LL/4/4L/4LL)",
            "Thickness: 0.30 to 0.60 mm",
            "Ready stock ex Indore yard"
          ]
        ),
      ],
    },
    {
      id: "3ft-5ft",
      label: "SIZE: 3ft to 5ft (Narrow Width)",
      size: "3ft to 5ft (Narrow Width)",
      thicknessBands: [
        thicknessBand(
          "cutting-0-90-1-60",
          "0.90 to 1.60 mm",
          "0.90 to 1.60",
          "3ft to 5ft",
          ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"],
          [
            "CRFH CUTTING",
            "Width: 3 inch to 12 inch",
            "Length: 3ft to 5ft",
            "Thickness: 0.90 to 1.60 mm",
            "Ready stock ex Indore yard"
          ]
        ),
      ],
    },
  ],
};

export function getCrSemiHardCuttingPrimaryImage(): string {
  for (const size of crSemiHardCuttingVariantCatalog.sizeBands) {
    for (const band of size.thicknessBands) {
      if (band.images[0]) return band.images[0];
    }
  }
  return "";
}
