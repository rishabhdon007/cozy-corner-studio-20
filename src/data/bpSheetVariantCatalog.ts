const ROOT_FOLDER = "BP SHEET";
const BASE_PATH = `/assests/products/${encodeURIComponent(ROOT_FOLDER)}`;

const WEB_IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;

export function isBpSheetProductImageSrc(src?: string | null): boolean {
  const normalized = src?.trim() ?? "";
  return normalized.includes("/assests/products/BP SHEET");
}

export function bpSheetAsset(file: string): string {
  return `${BASE_PATH}/${encodeURIComponent(file)}`;
}

function getImages(files: string[]): string[] {
  return files.filter((file) => WEB_IMAGE_PATTERN.test(file)).map((file) => bpSheetAsset(file));
}

export const bpSheetImages = getImages(["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg"]);
