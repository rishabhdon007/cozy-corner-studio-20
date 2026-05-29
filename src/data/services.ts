import type { CatalogDetail } from "@/data/catalogBuilder";
import {
  catalogServices,
  getCatalogService,
  serviceCardMeta,
  serviceLinks,
  serviceSlugs,
  specialtyServiceCardMeta,
} from "@/data/catalogServices";
import type { ProductRecommendation } from "@/data/catalogTypes";

export type ServiceDetail = CatalogDetail;

export { serviceLinks, serviceSlugs, serviceCardMeta, specialtyServiceCardMeta };

export function getService(slug: string): ServiceDetail | undefined {
  return getCatalogService(slug);
}

export const services = catalogServices;

export type { ProductRecommendation };
