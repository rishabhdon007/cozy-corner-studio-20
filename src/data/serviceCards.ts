import { productCardMeta } from "@/data/catalogProducts";
import { serviceCardMeta, specialtyServiceCardMeta } from "@/data/catalogServices";

export type ServiceCardItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  kind?: "service" | "product";
};

const toCard = (item: {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  kind?: "service" | "product";
}): ServiceCardItem => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  description: item.description,
  image: item.image,
  kind: item.kind,
});

export const processingServiceCards: ServiceCardItem[] = serviceCardMeta
  .filter((item) => item.section === "processing")
  .map((item) => toCard({ ...item, kind: "service" }));

export const specialtyServiceCards: ServiceCardItem[] = specialtyServiceCardMeta.map((item) =>
  toCard(item),
);

export const primeProductCards: ServiceCardItem[] = productCardMeta
  .filter((item) => item.section === "prime")
  .map((item) => toCard({ ...item, kind: "product" }));

export const secondaryProductCards: ServiceCardItem[] = productCardMeta
  .filter((item) => item.section === "secondary")
  .map((item) => toCard({ ...item, kind: "product" }));

/** @deprecated Use primeProductCards or secondaryProductCards */
export const productCatalogCards: ServiceCardItem[] = [...primeProductCards, ...secondaryProductCards];

export const fabricationServiceCards: ServiceCardItem[] = serviceCardMeta
  .filter((item) => item.section === "fabrication")
  .map((item) => toCard({ ...item, kind: "service" }));

/** Featured cards for home page carousel */
export const featuredServiceCards: ServiceCardItem[] = [
  processingServiceCards.find((c) => c.slug === "slitting")!,
  processingServiceCards.find((c) => c.slug === "cut-to-length")!,
  specialtyServiceCards.find((c) => c.id === "deck-sheets")!,
  specialtyServiceCards.find((c) => c.id === "wooden-pallet")!,
  specialtyServiceCards.find((c) => c.id === "z-c-purlin")!,
  specialtyServiceCards.find((c) => c.id === "profiling")!,
];

/** Full catalogue shown on the Services page */
export const allServiceCards: ServiceCardItem[] = [
  ...processingServiceCards,
  ...fabricationServiceCards,
  ...specialtyServiceCards,
  ...primeProductCards,
  ...secondaryProductCards,
];
