import type { CatalogInquiryKind } from "@/data/contact";

export type IndiaMartCategory = {
  id: string;
  title: string;
  href: string;
  productCount: number;
  highlights: readonly string[];
};

export const indiaMartProfile = {
  businessName: "NRK Iron And Steels LLP",
  location: "Indore, Madhya Pradesh",
  years: "13 yrs",
  responseRate: "94%",
  href: "https://www.indiamart.com/nrk-ironandsteelsindore/",
} as const;

export const indiaMartCategories = {
  coldRolledCoils: {
    id: "cold-rolled-coils",
    title: "Cold Rolled Coils",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/cold-rolled-coils.html",
    productCount: 3,
    highlights: ["Cr Sheet Cutting", "CR Semi Hard Material", "Cr Cutting Sheet (0.30 to 0.60)"],
  },
  crSheets: {
    id: "cr-sheets",
    title: "CR Sheets",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/cr-sheets.html",
    productCount: 3,
    highlights: ["CR Annealed Sheets", "CR semi hard sheet", "CR Sheets Semi Hard"],
  },
  hrSheet: {
    id: "hr-sheet",
    title: "HR Sheet",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/hr-sheet.html",
    productCount: 2,
    highlights: ["Hot Rolled Sheet Plate", "Iron shutter side channel"],
  },
  hotRolledSheets: {
    id: "hot-rolled-sheets",
    title: "Hot Rolled Sheets",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/hot-rolled-sheets.html",
    productCount: 2,
    highlights: ["CR Pickeled Sheet", "Ms Shuttering Plate"],
  },
  centeringPlate: {
    id: "centering-plate",
    title: "Centering Plate",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/centering-plate.html",
    productCount: 4,
    highlights: ["Centering Sheets", "Mild Steel Shuttering Plate", "Mild Steel Centering Plate"],
  },
  roofingSheet: {
    id: "roofing-sheet",
    title: "Roofing Sheet",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/roofing-sheet.html",
    productCount: 1,
    highlights: ["Iron Sheet Suppliers"],
  },
  galvanizedPlainCoils: {
    id: "galvanized-plain-coils",
    title: "Galvanized Plain Coils",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/galvanized-plain-coils.html",
    productCount: 1,
    highlights: ["CR Coilend Material"],
  },
  rollingShutter: {
    id: "rolling-shutter",
    title: "Rolling Shutter",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/",
    productCount: 1,
    highlights: ["Shutter Channel supplier"],
  },
  coldRolledSteelSheets: {
    id: "cold-rolled-steel-sheets",
    title: "Cold Rolled Steel Sheets",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/",
    productCount: 1,
    highlights: ["Pickled sheet Cutting"],
  },
  packagingMaterial: {
    id: "packaging-material",
    title: "Packaging Material",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/",
    productCount: 1,
    highlights: ["CR Coiled Material Pickled Cutting (Secondary Material)"],
  },
  stainlessSteelBhatti: {
    id: "stainless-steel-bhatti",
    title: "Stainless Steel Bhatti",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/",
    productCount: 1,
    highlights: ["CRFH BHATTI"],
  },
  newItems: {
    id: "new-items",
    title: "New Items",
    href: "https://www.indiamart.com/nrk-ironandsteelsindore/",
    productCount: 5,
    highlights: ["Shuttering Plates", "Secondary MS Sheet", "MS Channel", "Crc Steel Sheet", "Crc Metal Scrap"],
  },
} as const satisfies Record<string, IndiaMartCategory>;

const c = indiaMartCategories;

const serviceListings: Record<string, readonly IndiaMartCategory[]> = {
  slitting: [c.coldRolledCoils, c.crSheets],
  "cut-to-length": [c.coldRolledCoils, c.crSheets, c.hotRolledSheets, c.coldRolledSteelSheets],
  annealing: [c.crSheets, c.stainlessSteelBhatti],
  "crane-handling": [c.hrSheet, c.centeringPlate],
  "weighing-scale": [c.centeringPlate, c.newItems],
  "profiling-fabrication": [c.roofingSheet, c.centeringPlate],
  "logistics-warehousing": [c.coldRolledCoils, c.hrSheet, c.centeringPlate, c.roofingSheet],
  "hr-cr-ms-plates": [c.hrSheet, c.hotRolledSheets, c.centeringPlate, c.crSheets],
  "coated-profile-sheets": [c.roofingSheet, c.galvanizedPlainCoils],
};

const productListings: Record<string, readonly IndiaMartCategory[]> = {
  "hr-sheets-coils": [c.hrSheet],
  "hr-checkered-sheets": [c.hrSheet],
  "cold-rolled-coils": [c.coldRolledCoils, c.newItems],
  "annealed-sheets": [c.crSheets],
  "ms-plates": [c.hrSheet, c.hotRolledSheets, c.centeringPlate],
  "galvanized-plain-sheets": [c.galvanizedPlainCoils],
  "galvanized-corrugated-sheets": [c.roofingSheet],
  "color-coated-sheets": [c.roofingSheet],
  "profile-sheets": [c.roofingSheet],
  "hrpo-coil": [c.hrSheet, c.hotRolledSheets],
  "galvalume-sheets": [c.roofingSheet, c.galvanizedPlainCoils],
  "zincro-sheets": [c.galvanizedPlainCoils],
  "centering-plates": [c.centeringPlate, c.newItems],
  "cr-coiled-pickled": [c.hotRolledSheets],
  "cr-semi-tempered-crfh": [c.coldRolledCoils, c.galvanizedPlainCoils],
  "cr-mix-annealed": [c.crSheets],
  "cr-pickled-cutting": [c.coldRolledSteelSheets, c.packagingMaterial],
  "crfh-cutting": [c.coldRolledCoils, c.stainlessSteelBhatti],
  "secondary-ms-sheet": [c.hotRolledSheets, c.newItems],
  "ms-channel": [c.hrSheet, c.rollingShutter, c.newItems],
  "rolling-shutter-channel": [c.rollingShutter, c.hrSheet],
  "crc-metal-scrap": [c.newItems],
  "hr-sheets-plates": [c.hrSheet, c.hotRolledSheets],
  "galvanized-coated-sheets": [c.roofingSheet, c.galvanizedPlainCoils],
};

export function getIndiaMartListings(
  slug: string,
  kind: CatalogInquiryKind,
): readonly IndiaMartCategory[] {
  const map = kind === "service" ? serviceListings : productListings;
  return map[slug] ?? [];
}
