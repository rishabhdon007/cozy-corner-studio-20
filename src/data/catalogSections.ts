import {
  fabricationServiceCards,
  getVisibleSecondaryProductCards,
  primeProductCards,
  processingServiceCards,
  specialtyServiceCards,
  manufacturingProductCards,
  type ServiceCardItem,
} from "@/data/serviceCards";

export type CatalogSection = {
  id: string;
  heading: string;
  description: string;
  items: ServiceCardItem[];
};

export const SECONDARY_MATERIAL_SECTION = {
  heading: "Secondary Material",
  description: "Economical coil-end, pickled, CRFH, and construction secondary supply from Indore.",
} as const;

export const catalogSections: CatalogSection[] = [
  {
    id: "secondary",
    heading: SECONDARY_MATERIAL_SECTION.heading,
    description: SECONDARY_MATERIAL_SECTION.description,
    items: getVisibleSecondaryProductCards(),
  },
  {
    id: "manufacturing",
    heading: "Manufacturing Products",
    description: "High-quality centering plates, shutter channels, AC stands, and steel components manufactured in-house.",
    items: manufacturingProductCards,
  },
  {
    id: "processing",
    heading: "Steel Processing Products",
    description: "Precision processing capabilities for coils, sheets, plates, and coated materials.",
    items: processingServiceCards,
  },
  {
    id: "fabrication",
    heading: "Fabrication & Support",
    description: "Profiling, purlins, deck sheets, logistics, and secure packaging for complete project support.",
    items: fabricationServiceCards,
  },
  {
    id: "specialty",
    heading: "Specialty Capabilities",
    description: "Deck sheets, Z & C purlins, wooden pallet packaging, and custom profiling.",
    items: specialtyServiceCards,
  },
  {
    id: "prime",
    heading: "Prime Steel Products",
    description: "Prime HR, CR, MS, coated, and profile materials from leading national manufacturers.",
    items: primeProductCards,
  },
];
