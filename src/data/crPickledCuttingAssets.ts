const PICKLED_CUTTING_FOLDER = "CR PICKELED CUTTING";
const PICKLED_CUTTING_BASE = `/assests/products/${encodeURIComponent(PICKLED_CUTTING_FOLDER)}`;

const WEB_IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;

export function isPickledCuttingProductImageSrc(src?: string | null): boolean {
  const normalized = src?.trim() ?? "";
  return normalized.includes("/assests/products/CR PICKELED CUTTING");
}

export function pickledCuttingAsset(file: string): string {
  return `${PICKLED_CUTTING_BASE}/${encodeURIComponent(file)}`;
}

function cuttingImages(files: string[]): string[] {
  return files.filter((file) => WEB_IMAGE_PATTERN.test(file)).map((file) => pickledCuttingAsset(file));
}

export const crPickledCuttingImages = cuttingImages(["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"]);
