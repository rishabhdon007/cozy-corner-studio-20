import { productCardMeta } from "@/data/catalogProducts";
import { serviceCardMeta, specialtyServiceCardMeta } from "@/data/catalogServices";
import { isSecondaryCatalogProductVisible } from "@/lib/catalogVisibility";

export type ServiceCardItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  eyebrow?: string;
  kind?: "service" | "product";
  section?: string;
  hideDispatchBadge?: boolean;
};

const toCard = (item: {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  eyebrow?: string;
  kind?: "service" | "product";
  section?: string;
  hideDispatchBadge?: boolean;
}): ServiceCardItem => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  description: item.description,
  image: item.image,
  eyebrow: item.eyebrow,
  kind: item.kind,
  section: item.section,
  hideDispatchBadge: item.hideDispatchBadge,
});

export const processingServiceCards: ServiceCardItem[] = [
  ...serviceCardMeta
    .filter((item) => item.section === "processing")
    .map((item) => toCard({ ...item, kind: "service" as const, hideDispatchBadge: true })),
  ...productCardMeta
    .filter((item) => item.section === "processing")
    .map((item) => toCard({ ...item, kind: "product" as const, hideDispatchBadge: true })),
];

export const specialtyServiceCards: ServiceCardItem[] = specialtyServiceCardMeta.map((item) =>
  toCard(item),
);

export const primeProductCards: ServiceCardItem[] = productCardMeta
  .filter((item) => item.section === "prime")
  .map((item) => toCard({ ...item, kind: "product" }));

export const secondaryProductCards: ServiceCardItem[] = productCardMeta
  .filter((item) => item.section === "secondary" && isSecondaryCatalogProductVisible(item.image))
  .map((item) => toCard({ ...item, kind: "product" }));

export const manufacturingProductCards: ServiceCardItem[] = productCardMeta
  .filter((item) => item.section === "manufacturing")
  .map((item) => toCard({ ...item, kind: "product" }));

/** Secondary material cards after feature-flag / asset visibility rules */
export function getVisibleSecondaryProductCards(): ServiceCardItem[] {
  return secondaryProductCards;
}

/** @deprecated Use primeProductCards or secondaryProductCards */
export const productCatalogCards: ServiceCardItem[] = [...primeProductCards, ...secondaryProductCards];

export const fabricationServiceCards: ServiceCardItem[] = serviceCardMeta
  .filter((item) => item.section === "fabrication")
  .map((item) => toCard({ ...item, kind: "service", hideDispatchBadge: true }));

/** Full catalogue shown on the Services page */
export const allServiceCards: ServiceCardItem[] = [
  ...processingServiceCards,
  ...fabricationServiceCards,
  ...primeProductCards,
  ...secondaryProductCards,
  ...manufacturingProductCards,
];
