const ROOT_FOLDER = "AC stand";
const BASE_PATH = `/assests/products/${encodeURIComponent(ROOT_FOLDER)}`;

const WEB_IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;

export function isAcStandProductImageSrc(src?: string | null): boolean {
  const normalized = src?.trim() ?? "";
  return normalized.includes("/assests/products/AC stand");
}

export function acStandAsset(file: string): string {
  return `${BASE_PATH}/${encodeURIComponent(file)}`;
}

function getImages(files: string[]): string[] {
  return files.filter((file) => WEB_IMAGE_PATTERN.test(file)).map((file) => acStandAsset(file));
}

export const acStandImages = getImages(["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"]);
