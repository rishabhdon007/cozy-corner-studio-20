import type { CatalogDetail } from "@/data/catalogBuilder";
import {
  catalogProducts,
  getCatalogProduct,
  productCardMeta,
  productRecommendations,
  productSlugs,
} from "@/data/catalogProducts";

export type { ProductRecommendation } from "@/data/catalogTypes";
export type ProductDetail = CatalogDetail;

export { productRecommendations, productSlugs, productCardMeta };

export function getProduct(slug: string): ProductDetail | undefined {
  return getCatalogProduct(slug);
}

export const products = catalogProducts;
