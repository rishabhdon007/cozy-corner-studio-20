import {
  buildCatalogMap,
  buildPrimeProduct,
  buildSecondaryProduct,
  CATALOG_IMAGES,
  withPurchaseTerms,
  type CatalogDetail,
} from "@/data/catalogBuilder";
import {
  centeringPlateOfferings,
  coldRolledCoilOfferings,
  crfhBhattiOfferings,
  crSheetsOfferings,
  galvanizedPlainCoilOfferings,
  hotRolledSheetsOfferings,
  hrSheetOfferings,
  newItemsOfferings,
  pickledCuttingOfferings,
  rollingShutterOfferings,
  roofingSheetOfferings,
  crSemiHardCuttingStock,
  crPickledCuttingStock,
} from "@/data/catalogOfferings";
import type { ProductRecommendation } from "@/data/catalogTypes";
import { isSecondaryCatalogProductVisible } from "@/lib/catalogVisibility";
import {
  crCoiledPickledThicknessVariants,
  crCoiledPickledVariantCatalog,
  CR_PICKLED_SHEETS_SIZE,
} from "@/data/crCoiledPickledVariants";
import { crPickledCuttingImages } from "@/data/crPickledCuttingAssets";
import {
  crSemiHardVariantCatalog,
  getCrSemiHardPrimaryImage,
} from "@/data/crSemiHardVariantCatalog";
import {
  crSemiHardCuttingVariantCatalog,
  getCrSemiHardCuttingPrimaryImage,
} from "@/data/crSemiHardCuttingVariantCatalog";
import { bpSheetImages } from "@/data/bpSheetVariantCatalog";
import { centeringPlateImages } from "@/data/centeringPlateVariantCatalog";
import { shutterChannelImages } from "@/data/shutterChannelVariantCatalog";
import { acStandImages } from "@/data/acStandVariantCatalog";

const MAKES_HR = "SAIL, Jindal, AMNS, TATA, Bhushan";
const MAKES_CR = "SAIL, Jindal, AMNS, TATA, Posco, Bhushan Power, JSW, TATA BSL";
const MAKES_MS = "SAIL, Jindal, AMNS, TATA, JSW, JSPL";
const MAKES_SECONDARY = "JSW, AMNS, National, TATA";

export const productRecommendations = {
  hrSheets: {
    slug: "hr-sheets-coils",
    title: "HR Sheets & Coils",
    type: "Hot Rolled",
    image: CATALOG_IMAGES.hr,
    note: "Structural-grade prime HR inventory for fabrication and infrastructure.",
  },
  crCoils: {
    slug: "cold-rolled-coils",
    title: "Cold Rolled Coils",
    type: "Cold Rolled",
    image: CATALOG_IMAGES.cr,
    note: "CRCA and CRFH coils with precision finish and dependable supply.",
  },
  annealed: {
    slug: "annealed-sheets",
    title: "Annealed Sheets",
    type: "Annealed CR",
    image: CATALOG_IMAGES.cr,
    note: "Soft, formable annealed sheets for drawing and component work.",
  },
  msPlates: {
    slug: "ms-plates",
    title: "MS Plates",
    type: "Mild Steel",
    image: CATALOG_IMAGES.ms,
    note: "E250/E350 plate stock for heavy fabrication and structural use.",
  },
  gpSheets: {
    slug: "galvanized-plain-sheets",
    title: "Galvanized Plain Sheets",
    type: "GP Coated",
    image: CATALOG_IMAGES.coated,
    note: "Corrosion-resistant GP sheets for roofing and cladding.",
  },
  gcSheets: {
    slug: "galvanized-corrugated-sheets",
    title: "Galvanized Corrugated Sheets",
    type: "GC Roofing",
    image: CATALOG_IMAGES.profile,
    note: "GC sheets for durable roofing and industrial panel applications.",
  },
  colorCoated: {
    slug: "color-coated-sheets",
    title: "Color Coated Sheets",
    type: "Color Coated",
    image: CATALOG_IMAGES.coated,
    note: "Color coated coils and sheets in project-specific finishes.",
  },
  centering: {
    slug: "centering-plates",
    title: "Centering Plates",
    type: "Construction",
    image: centeringPlateImages[0] || CATALOG_IMAGES.centering,
    note: "In-house centering and shuttering plates for construction sites.",
  },
  secondaryCrfh: {
    slug: "cr-semi-tempered-crfh",
    title: "CR Semi Tempered / CRFH",
    type: "Secondary Material",
    image: CATALOG_IMAGES.cr,
    note: "Value coil-end and semi hard material for cost-effective supply.",
  },
  crSemiHardCutting: {
    slug: "cr-semi-hard-cutting",
    title: "CR Semi-Hard Cutting",
    type: "Secondary Material",
    image: getCrSemiHardCuttingPrimaryImage() || CATALOG_IMAGES.cr,
    note: "CRFH and CR semi hard cutting sheets in multiple sizes and thickness bands.",
  },
  bpSheet: {
    slug: "bp-sheet",
    title: "BP Sheet (Bhatti Material)",
    type: "Secondary Material",
    image: bpSheetImages[0] || CATALOG_IMAGES.cr,
    note: "BP Sheets (Bhatti Material) for high-heat and industrial processing.",
  },
  acStand: {
    slug: "ac-stand",
    title: "AC Stand",
    type: "Manufacturing Product",
    image: acStandImages[0] || CATALOG_IMAGES.centering,
    note: "Heavy-duty outdoor air conditioner stands manufactured in-house.",
  },
  shutterChannel: {
    slug: "shutter-channel",
    title: "Shutter Channel",
    type: "Manufacturing Product",
    image: shutterChannelImages[0] || CATALOG_IMAGES.purlin,
    note: "High-strength rolling shutter channels manufactured in-house.",
  },
  crPickled: {
    slug: "cr-coiled-pickled",
    title: "CR - Pickled Sheets",
    type: "Secondary Material",
    image: crCoiledPickledThicknessVariants[0].images[0],
    note: "Pickled secondary sheets in multiple thickness bands — random lengths ex Indore.",
  },
  galvalume: {
    slug: "galvalume-sheets",
    title: "Galvalume Sheets",
    type: "Galvalume",
    image: CATALOG_IMAGES.coated,
    note: "AZ70/AZ150 galvalume for long-life roofing applications.",
  },
  profileSheets: {
    slug: "profile-sheets",
    title: "Profile Sheets",
    type: "Profiled Roofing",
    image: CATALOG_IMAGES.profile,
    note: "Corrugated profile sheets for roofing and cladding projects.",
  },
} satisfies Record<string, ProductRecommendation>;

const rec = productRecommendations;

const primeEntries = [
  buildPrimeProduct({
    slug: "hr-sheets-coils",
    title: "Hot Rolled (HR) Sheets & Coils",
    category: "Prime Material",
    eyebrow: "Prime Supply",
    badge: "Industrial Grade: HR Prime Stock",
    summary: "Prime hot rolled sheets and coils from leading national mills for structural and fabrication demand.",
    description:
      "Hot Rolled (HR) Sheets and Coils from NRK Iron & Steel are sourced from SAIL, Jindal, AMNS, TATA, and Bhushan. Suitable for fabrication, infrastructure, and general industrial applications with payment against delivery and bulk dispatch from Indore.",
    mainImage: "/assests/products/HR sheet coils.webp",
    specs: [
      { label: "Make", value: MAKES_HR },
      { label: "Grade", value: "1079 / 2062" },
      { label: "Thickness", value: "1.5mm to 25mm" },
      { label: "Size", value: "1250 / 1500 x 2500 / 5000 / 6300" },
    ],
    variants: hrSheetOfferings.map((o) => o.title),
    offerings: hrSheetOfferings,
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_HR, method: "Brochure specification" },
      { property: "Grade", value: "1079 / 2062", method: "Mill test certificate" },
      { property: "Thickness", value: "1.5mm to 25mm", method: "Measurement check" },
      { property: "Size", value: "1250 / 1500 x 2500 / 5000 / 6300", method: "CTL as required" },
    ]),
    recommendations: [rec.crCoils, rec.msPlates, rec.annealed],
  }),
  buildPrimeProduct({
    slug: "hr-checkered-sheets",
    title: "Hot Rolled Checkered Sheets & Coils",
    category: "Prime Material",
    eyebrow: "Prime Supply",
    badge: "Industrial Grade: HR Checkered",
    summary: "Anti-slip checkered HR sheets and coils for flooring, platforms, and industrial walkways.",
    description:
      "Hot Rolled Checkered Sheets and Coils combine the strength of HR material with a raised pattern for grip and safety. Supplied from prime manufacturers for industrial flooring, stair treads, and platform applications.",
    mainImage: CATALOG_IMAGES.hr,
    specs: [
      { label: "Make", value: "SAIL, Jindal, AMNS, TATA, Bhushan Power" },
      { label: "Grade", value: "1079 / 2062" },
      { label: "Thickness", value: "1.6mm & above" },
      { label: "Size", value: "1250 / 1500 x 2500 / 5000 / 6300" },
    ],
    variants: ["Checkered sheets", "Checkered coils", "HR chequered plate"],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: "SAIL, Jindal, AMNS, TATA, Bhushan Power", method: "Brochure specification" },
      { property: "Grade", value: "1079 / 2062", method: "Mill documentation" },
      { property: "Thickness", value: "1.6mm & above", method: "Order verification" },
      { property: "Pattern", value: "Standard checkered", method: "Visual inspection" },
    ]),
    recommendations: [rec.hrSheets, rec.msPlates, rec.crCoils],
  }),
  buildPrimeProduct({
    slug: "cold-rolled-coils",
    title: "Cold Rolled (CR) Sheets & Coils",
    category: "Prime Material",
    eyebrow: "Product Spotlight",
    badge: "Industrial Grade: CRCA & CRFH",
    summary: "Precision-finished CRCA and CRFH coils for fabrication, component manufacturing, and industrial supply.",
    description:
      "Cold Rolled (CR) Sheets and Coils are supplied in CRCA and CRFH grades from leading mills. Also listed on IndiaMART as Cr Sheet Cutting, CR Semi Hard Material, and CR Cutting Sheet (0.30 to 0.60). Ideal for forming, cutting, and repeat production schedules.",
    mainImage: "/Gallary/Industrial_Capacity.png",
    specs: [
      { label: "Make", value: MAKES_CR },
      { label: "Grade", value: "CRCA / CRFH" },
      { label: "Thickness", value: "0.30mm to 3.00mm" },
      { label: "Size", value: "900 / 1000 / 1250 / 1500 x 2500" },
    ],
    variants: [...coldRolledCoilOfferings.map((o) => o.title), newItemsOfferings[2].title],
    offerings: [...coldRolledCoilOfferings, newItemsOfferings[2]],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_CR, method: "Brochure specification" },
      { property: "Grade", value: "CRCA / CRFH", method: "Mill test certificate" },
      { property: "Thickness", value: "0.30mm to 3.00mm", method: "Measurement check" },
      { property: "Size", value: "900 / 1000 / 1250 / 1500 x 2500 / CTL", method: "Cut-to-length available" },
    ]),
    recommendations: [rec.annealed, rec.hrSheets, rec.gpSheets],
  }),
  buildPrimeProduct({
    slug: "annealed-sheets",
    title: "Annealed Sheets",
    category: "Prime Material",
    eyebrow: "Forming Grade",
    badge: "Industrial Grade: Soft CR Material",
    summary: "Soft, ductile annealed sheets for drawing, bending, and component manufacturing.",
    description:
      "Annealed Sheets from NRK are supplied in cold rolled annealed grades for applications requiring improved formability. Listed on IndiaMART as CR Annealed Sheets, CR semi hard sheet, and CR Sheets Semi Hard.",
    mainImage: "/assests/products/cr-annealed-sheets.jpeg",
    specs: [
      { label: "Make", value: MAKES_CR },
      { label: "Thickness", value: "0.25mm to 1.6mm" },
      { label: "Size", value: "900 / 1250 / 1500 x 2500" },
      { label: "Finish", value: "Annealed / Soft" },
    ],
    variants: crSheetsOfferings.map((o) => o.title),
    offerings: crSheetsOfferings,
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_CR, method: "Brochure specification" },
      { property: "Thickness", value: "0.25mm to 1.6mm", method: "Order verification" },
      { property: "Size", value: "900 / 1250 / 1500 x 2500 / CTL", method: "Cut-to-length available" },
      { property: "Application", value: "Deep drawing & forming", method: "Grade selection" },
    ]),
    recommendations: [rec.crCoils, rec.colorCoated, rec.gpSheets],
  }),
  buildPrimeProduct({
    slug: "ms-plates",
    title: "MS Plates",
    category: "Prime Material",
    eyebrow: "Fabrication Ready",
    badge: "Industrial Grade: E250 / E350",
    summary: "Prime mild steel plates for machining, fabrication, shuttering, and heavy-duty frames.",
    description:
      "MS Plates from NRK support structural fabrication, machining, and construction applications. Also relevant for Ms Shuttering Plate and secondary MS sheet requirements from IndiaMART listings.",
    mainImage: "/Gallary/Warehouse_Operations.png",
    specs: [
      { label: "Make", value: MAKES_MS },
      { label: "Grade", value: "E250, E350" },
      { label: "Thickness", value: "5mm to 32mm & above" },
      { label: "Size", value: "1250 / 1500 / 1830 / 2000 x 2500 / 5000 / 6300" },
    ],
    variants: [hrSheetOfferings[0].title, "MS plate cutting", "Machining blanks"],
    offerings: [hrSheetOfferings[0]],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_MS, method: "Brochure specification" },
      { property: "Grade", value: "E250, E350", method: "Mill test certificate" },
      { property: "Thickness", value: "5mm to 32mm & above", method: "Measurement check" },
      { property: "Size", value: "1250 / 1500 / 1830 / 2000 x 2500 / 5000 / 6300 / CTL", method: "Cut-to-length available" },
    ]),
    recommendations: [rec.hrSheets, rec.centering, rec.crCoils],
  }),
  buildPrimeProduct({
    slug: "galvanized-plain-sheets",
    title: "Galvanized Plain (GP) Sheets",
    category: "Prime Material",
    eyebrow: "Corrosion Protection",
    badge: "Industrial Grade: GP Sheets",
    summary: "Galvanized plain sheets for roofing, cladding, and corrosion-resistant panel work.",
    description:
      "Galvanized Plain (GP) Sheets from Poco, Uttam, and Tata combine zinc coating with practical formability. Listed on IndiaMART under Galvanized Plain Coils alongside coil-end material options.",
    mainImage: "/Gallary/Premium_Steel_Storage.png",
    specs: [
      { label: "Make", value: "Poco / Uttam / Tata" },
      { label: "Grade", value: "90 / 80 / 120 GSM" },
      { label: "Thickness", value: "0.50mm to 0.80mm & above" },
      { label: "Size", value: "As per CTL requirement" },
    ],
    variants: ["GP flat sheets", "Galvanized plain coils", "CR Coilend Material"],
    offerings: galvanizedPlainCoilOfferings,
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: "Poco / Uttam / Tata", method: "Brochure specification" },
      { property: "Coating", value: "90 / 80 / 120 GSM", method: "Coating weight check" },
      { property: "Thickness", value: "0.50mm to 0.80mm & above", method: "Order verification" },
      { property: "Size", value: "CTL as per requirement", method: "Cut-to-length available" },
    ]),
    recommendations: [rec.gcSheets, rec.colorCoated, rec.crCoils],
  }),
  buildPrimeProduct({
    slug: "galvanized-corrugated-sheets",
    title: "Galvanized Corrugated (GC) Sheets",
    category: "Prime Material",
    eyebrow: "Roofing Supply",
    badge: "Industrial Grade: GC Sheets",
    summary: "GC sheets for durable roofing, cladding, and industrial building applications.",
    description:
      "Galvanized Corrugated (GC) Sheets are available in soft and hard grades with spangle or skin pass finish. Also aligned with IndiaMART Roofing Sheet and Iron Sheet Suppliers listings.",
    mainImage: "/assests/products/gc-sheets.webp",
    specs: [
      { label: "Make", value: "TATA, AMNS, JSW & more" },
      { label: "Grade", value: "Soft / Hard" },
      { label: "Thickness", value: "0.14mm to 3.00mm" },
      { label: "Width", value: "600mm to 1500mm" },
    ],
    variants: roofingSheetOfferings.map((o) => o.title),
    offerings: roofingSheetOfferings,
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: "TATA, AMNS, JSW & more", method: "Brochure specification" },
      { property: "Grade", value: "Soft / Hard; Spangle / Skin Pass", method: "Product documentation" },
      { property: "Thickness", value: "0.14mm to 3.00mm", method: "Order verification" },
      { property: "Width", value: "600mm to 1500mm", method: "Profile setup" },
    ]),
    recommendations: [rec.gpSheets, rec.colorCoated, rec.centering],
  }),
  buildPrimeProduct({
    slug: "color-coated-sheets",
    title: "Color Coated Sheets & Coils",
    category: "Prime Material",
    eyebrow: "Coated Products",
    badge: "Industrial Grade: Color Coated Steel",
    summary: "Color coated sheets and coils in project colors for roofing, cladding, and pre-engineered buildings.",
    description:
      "Color Coated Sheets and Coils from AMNS, Uttam, JSW, and TATA offer aesthetic and corrosion-resistant options for modern construction and industrial cladding.",
    mainImage: "/Gallary/Premium_Steel_Storage.png",
    specs: [
      { label: "Make", value: "AMNS / Uttam / JSW / TATA" },
      { label: "Grade", value: "Soft & all colors" },
      { label: "Thickness", value: "0.25mm to 1.50mm" },
      { label: "Width", value: "600mm to 1250mm" },
    ],
    variants: ["Color coated coils", "Color coated flat sheets", "Pre-painted roofing"],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: "AMNS / Uttam / JSW / TATA", method: "Brochure specification" },
      { property: "Finish", value: "Soft & all colors", method: "Color specification" },
      { property: "Thickness", value: "0.25mm to 1.50mm", method: "Order verification" },
      { property: "Width", value: "600mm to 1250mm", method: "Profile setup" },
    ]),
    recommendations: [rec.gcSheets, rec.gpSheets, rec.crCoils],
  }),

  buildPrimeProduct({
    slug: "hrpo-coil",
    title: "HRPO Coil",
    category: "Prime Material",
    eyebrow: "Pickled & Oiled",
    badge: "Industrial Grade: HRPO",
    summary: "Hot rolled pickled and oiled coils for cleaner surface finish and improved downstream processing.",
    description:
      "HRPO Coil from SAIL, Jindal, AMNS, TATA, JSW, and JSPL is supplied in E250 and E350 grades for fabrication shops requiring improved surface condition over standard HR.",
    mainImage: "/Gallary/Premium_Steel_Storage.png",
    specs: [
      { label: "Make", value: MAKES_MS },
      { label: "Grade", value: "E250, E350" },
      { label: "Thickness", value: "2mm to 8mm" },
      { label: "Size", value: "CTL as per requirement" },
    ],
    variants: ["HRPO coils", "Pickled HR coils", "HRPO blanks"],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_MS, method: "Brochure specification" },
      { property: "Grade", value: "E250, E350", method: "Mill documentation" },
      { property: "Thickness", value: "2mm to 8mm", method: "Order verification" },
      { property: "Size", value: "CTL as per requirement", method: "Cut-to-length available" },
    ]),
    recommendations: [rec.hrSheets, rec.msPlates, rec.crCoils],
  }),
  buildPrimeProduct({
    slug: "galvalume-sheets",
    title: "Bare Galvalume Sheets & Coils",
    category: "Prime Material",
    eyebrow: "Al-Zn Coated",
    badge: "Industrial Grade: Galvalume",
    summary: "Bare galvalume sheets and coils with AZ70 and AZ150 coating for long-life roofing and cladding.",
    description:
      "Bare Galvalume Sheets and Coils from Jindal India and JSW offer aluminium-zinc coating for superior corrosion resistance in exposed building applications.",
    mainImage: "/Gallary/Premium_Steel_Storage.png",
    specs: [
      { label: "Make", value: "Jindal India / JSW" },
      { label: "Grade", value: "AZ70 / AZ150" },
      { label: "Thickness", value: "0.40mm & above" },
      { label: "Size", value: "CTL as per requirement" },
    ],
    variants: ["Galvalume coils", "Bare GL sheets", "GL roofing blanks"],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: "Jindal India / JSW", method: "Brochure specification" },
      { property: "Coating", value: "AZ70 / AZ150", method: "Product documentation" },
      { property: "Thickness", value: "0.40mm & above", method: "Order verification" },
      { property: "Size", value: "CTL as per requirement", method: "Cut-to-length available" },
    ]),
    recommendations: [rec.colorCoated, rec.gcSheets, rec.gpSheets],
  }),
  buildPrimeProduct({
    slug: "zincro-sheets",
    title: "Zincro Sheets & Coils",
    category: "Prime Material",
    eyebrow: "Specialty Coated",
    badge: "Industrial Grade: Zincro",
    summary: "Zincro coated sheets and coils from AMNS and JSW for durable exposed applications.",
    description:
      "Zincro Sheets and Coils combine specialty coating performance with practical sizing for roofing, cladding, and industrial panel requirements.",
    mainImage: "/Gallary/Premium_Steel_Storage.png",
    specs: [
      { label: "Make", value: "AMNS / JSW" },
      { label: "Thickness", value: "0.40mm & above" },
      { label: "Size", value: "CTL as per requirement" },
      { label: "Application", value: "Roofing & cladding" },
    ],
    variants: ["Zincro coils", "Zincro flat sheets", "Zincro profile blanks"],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: "AMNS / JSW", method: "Brochure specification" },
      { property: "Thickness", value: "0.40mm & above", method: "Order verification" },
      { property: "Size", value: "CTL as per requirement", method: "Cut-to-length available" },
      { property: "Application", value: "Roofing & cladding", method: "Project specification" },
    ]),
    recommendations: [rec.galvalume, rec.colorCoated, rec.gpSheets],
  }),
] as const;

const secondaryEntries = [
  buildSecondaryProduct({
    slug: "cr-coiled-pickled",
    title: "CR - Pickled Sheets",
    category: "Secondary Material",
    eyebrow: "CR Pickled Sheets",
    badge: "Secondary Grade: Soft Pickled",
    summary:
      "CR pickled secondary sheets supplied in multiple thickness bands with random lengths — ready stock ex Indore yard.",
    description:
      "CR - Pickled Sheets are coil-end secondary material in soft pickled grades. Select a thickness band below to view actual stock photos. Size remains 7 to 11FT x 3! x 4 x 4! FT (random) across all bands.",
    mainImage: crCoiledPickledThicknessVariants[0].images[0],
    processImage: crCoiledPickledThicknessVariants[0].images[0],
    gallery: [],
    specs: [
      { label: "Material", value: "CR - Pickled Sheets" },
      { label: "Grade", value: "Coil leader end / Soft" },
      { label: "Thickness", value: "1.80 to 4.50 mm (select below)" },
      { label: "Size", value: CR_PICKLED_SHEETS_SIZE },
    ],
    variants: crCoiledPickledVariantCatalog.sizeBands[0].thicknessBands.map((variant) => variant.label),
    variantCatalog: crCoiledPickledVariantCatalog,
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_SECONDARY, method: "Brochure specification" },
      { property: "Grade", value: "Coil leader end / Soft Material", method: "Batch identification" },
      { property: "Material", value: "CR - Pickled Sheets", method: "Product classification" },
      { property: "Size", value: CR_PICKLED_SHEETS_SIZE, method: "Stock allocation" },
    ]),
    recommendations: [rec.secondaryCrfh, rec.centering, rec.crCoils],
  }),
  buildSecondaryProduct({
    slug: "cr-semi-tempered-crfh",
    title: "CR - Semi-Hard Sheets",
    category: "Secondary Material",
    eyebrow: "COIL LEADER END — CR Secondary Material",
    badge: "Secondary Grade: Semi Hard",
    summary:
      "CR semi-hard coil-end secondary sheets in multiple sizes and thickness bands — ready stock ex Indore yard.",
    description:
      "CR Semi-Hard Sheets are coil leader end secondary material in semi hard grades. Select a size and thickness band below to view stock photos. Listed on IndiaMART as CR Semi Hard Material and CR Coilend Material.",
    mainImage: getCrSemiHardPrimaryImage() || CATALOG_IMAGES.cr,
    processImage: getCrSemiHardPrimaryImage() || CATALOG_IMAGES.cr,
    gallery: [],
    specs: [
      { label: "Material", value: "CR Semi-Hard Sheets" },
      { label: "Grade", value: "Coil leader end / Semi Hard" },
      { label: "Thickness", value: "0.30 to 4.50 mm (select below)" },
      { label: "Size", value: "7–11FT random / 8 x 4 FT / 8x3" },
    ],
    variants: crSemiHardVariantCatalog.sizeBands.flatMap((size) =>
      size.thicknessBands.map((band) => `${size.label} — ${band.label}`),
    ),
    variantCatalog: crSemiHardVariantCatalog,
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_SECONDARY, method: "Brochure specification" },
      { property: "Grade", value: "Coil leader end / Semi Hard", method: "Batch identification" },
      { property: "Thickness", value: "0.30 to 4.50mm", method: "Measurement check" },
      { property: "Size", value: "4ft / 3.15ft x 8ft / Random Size", method: "Stock allocation" },
    ]),
    recommendations: [rec.crCoils, rec.centering, rec.annealed],
  }),
  buildSecondaryProduct({
    slug: "cr-semi-hard-cutting",
    title: "CR Semi-Hard Cutting",
    category: "Secondary Material",
    eyebrow: "CRFH & CR SEMI-HARD CUTTING",
    badge: "Secondary Grade: Semi Hard Cutting",
    summary:
      "CR semi-hard and CRFH cutting sheets in multiple sizes and thickness bands — ready stock ex Indore yard.",
    description:
      "CR Semi-Hard Cutting sheets are secondary coil-end cut materials in semi-hard and CRFH grades. Select a size and thickness band below to view stock photos. Listed on IndiaMART as CR Semi Hard Cutting and CRFH Cutting.",
    mainImage: getCrSemiHardCuttingPrimaryImage() || CATALOG_IMAGES.cr,
    processImage: getCrSemiHardCuttingPrimaryImage() || CATALOG_IMAGES.cr,
    gallery: [],
    specs: [
      { label: "Material", value: "CR Semi-Hard / CRFH Cutting" },
      { label: "Grade", value: "Coil leader end / Semi Hard" },
      { label: "Thickness", value: "0.30 to 4.00 mm (select below)" },
      { label: "Size", value: "1ft to 5ft Length / Random Widths" },
    ],
    variants: crSemiHardCuttingVariantCatalog.sizeBands.flatMap((size) =>
      size.thicknessBands.map((band) => `${size.label} — ${band.label}`),
    ),
    variantCatalog: crSemiHardCuttingVariantCatalog,
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_SECONDARY, method: "Brochure specification" },
      { property: "Grade", value: "Coil leader end / Semi Hard / CRFH", method: "Batch identification" },
      { property: "Thickness", value: "0.30 to 4.00mm", method: "Measurement check" },
      { property: "Size", value: "1.5-5ft x 4ft / 1-5ft / 3-5ft x 3-12 inch", method: "Stock allocation" },
    ]),
    recommendations: [rec.secondaryCrfh, rec.centering, rec.crCoils],
  }),
  buildSecondaryProduct({
    slug: "cr-semi-hard-sheets-8x4",
    title: "CR - SEMI-HARD SHEETS (8 x 4ft)",
    category: "Secondary Material",
    eyebrow: "COIL LEADER END — CR Secondary Material",
    badge: "Secondary Grade: Semi Hard",
    summary:
      "CR semi-hard coil-end secondary sheets specifically in 8 x 4 FT size — ready stock ex Indore yard.",
    description:
      "CR Semi-Hard Sheets are coil leader end secondary material in semi hard grades. This listing is specifically for the 8 x 4 FT size. Select a thickness band below to view stock photos.",
    mainImage: getCrSemiHardPrimaryImage() || CATALOG_IMAGES.cr,
    processImage: getCrSemiHardPrimaryImage() || CATALOG_IMAGES.cr,
    gallery: [],
    specs: [
      { label: "Material", value: "CR Semi-Hard Sheets" },
      { label: "Grade", value: "Coil leader end / Semi Hard" },
      { label: "Thickness", value: "0.30 to 2.10 mm (select below)" },
      { label: "Size", value: "8 x 4 FT" },
    ],
    variants: crSemiHardVariantCatalog.sizeBands
      .filter((size) => size.id === "8x4")
      .flatMap((size) =>
        size.thicknessBands.map((band) => `${size.label} — ${band.label}`),
      ),
    variantCatalog: {
      ...crSemiHardVariantCatalog,
      sizeBands: crSemiHardVariantCatalog.sizeBands.filter((size) => size.id === "8x4"),
    },
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_SECONDARY, method: "Brochure specification" },
      { property: "Grade", value: "Coil leader end / Semi Hard", method: "Batch identification" },
      { property: "Thickness", value: "0.30 to 2.10mm", method: "Measurement check" },
      { property: "Size", value: "8 x 4 FT", method: "Stock allocation" },
    ]),
    recommendations: [rec.crCoils, rec.centering, rec.annealed],
  }),
  buildSecondaryProduct({
    slug: "cr-mix-annealed",
    title: "CR Mix Annealed Material (Secondary)",
    category: "Secondary Material",
    eyebrow: "Value Supply",
    badge: "Secondary Grade: Soft Mix",
    summary: "Mixed annealed secondary CR material for forming and general fabrication applications.",
    description:
      "CR Mix Annealed Material combines coil leader end stock in soft grades for customers seeking economical annealed supply with flexible sizing.",
    mainImage: CATALOG_IMAGES.cr,
    specs: [
      { label: "Make", value: MAKES_SECONDARY },
      { label: "Grade", value: "Coil leader end / Soft" },
      { label: "Thickness", value: "0.30 to 1.6mm" },
      { label: "Size", value: "4ft / 3.15ft x 8ft / random" },
    ],
    variants: ["CR mix annealed coils", "Soft secondary sheets", "Mixed annealed blanks"],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_SECONDARY, method: "Brochure specification" },
      { property: "Grade", value: "Coil leader end / Soft Material", method: "Batch identification" },
      { property: "Thickness", value: "0.30 to 1.6mm", method: "Measurement check" },
      { property: "Size", value: "4ft / 3.15ft x 8ft / Random Size", method: "Stock allocation" },
    ]),
    recommendations: [rec.annealed, rec.secondaryCrfh, rec.crCoils],
  }),
  buildSecondaryProduct({
    slug: "cr-pickled-cutting",
    title: "CR Pickled Cutting (Secondary)",
    category: "Secondary Material",
    eyebrow: "Cut Secondary Stock",
    badge: "Secondary Grade: Pickled Cutting",
    summary: "Pickled cutting secondary material for packaging, fabrication, and construction use.",
    description:
      "CR Coiled Material – Pickled Cutting is supplied in practical cut sizes from coil leader end stock. Listed on IndiaMART under Packaging Material and Cold Rolled Steel Sheets as Pickled sheet Cutting.",
    mainImage: crPickledCuttingImages[0],
    processImage: crPickledCuttingImages[0],
    gallery: crPickledCuttingImages.slice(1),
    specs: [
      { label: "Make", value: MAKES_SECONDARY },
      { label: "Grade", value: "Coil leader end / Soft" },
      { label: "Thickness", value: "1.80 to 4.5mm" },
      { label: "Size", value: "6 inch above to 4ft" },
    ],
    variants: crPickledCuttingStock.map((o) => o.title),
    offerings: crPickledCuttingStock,
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_SECONDARY, method: "Brochure specification" },
      { property: "Grade", value: "Coil leader end / Soft Material", method: "Batch identification" },
      { property: "Thickness", value: "1.80 to 4.5mm", method: "Measurement check" },
      { property: "Size", value: "6 inch above to 4ft", method: "Cutting service" },
    ]),
    recommendations: [rec.crPickled, rec.centering, rec.msPlates],
  }),
  buildSecondaryProduct({
    slug: "crfh-cutting",
    title: "CRFH Cutting (Secondary)",
    category: "Secondary Material",
    eyebrow: "Semi Hard Cutting",
    badge: "Secondary Grade: CRFH Cutting",
    summary: "CRFH cutting secondary material in semi hard grades for economical sheet and blank supply.",
    description:
      "CR Coiled Material – CRFH Cutting serves customers needing semi hard secondary blanks from coil leader end stock, including CRFH BHATTI and related IndiaMART listings.",
    mainImage: CATALOG_IMAGES.cr,
    specs: [
      { label: "Make", value: MAKES_SECONDARY },
      { label: "Grade", value: "Coil leader end / Semi Hard" },
      { label: "Thickness", value: "0.30 to 4mm" },
      { label: "Size", value: "1.5ft and above" },
    ],
    variants: crSemiHardCuttingStock.map((o) => o.title),
    offerings: crSemiHardCuttingStock,
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_SECONDARY, method: "Brochure specification" },
      { property: "Grade", value: "Coil leader end / Semi Hard Material", method: "Batch identification" },
      { property: "Thickness", value: "0.30 to 4mm", method: "Measurement check" },
      { property: "Size", value: "1.5ft and above", method: "Cutting service" },
    ]),
    recommendations: [rec.secondaryCrfh, rec.crCoils, rec.centering],
  }),
  buildSecondaryProduct({
    slug: "secondary-ms-sheet",
    title: "Secondary MS Sheet",
    category: "Secondary Material",
    eyebrow: "Economy Supply",
    badge: "Secondary Grade: MS Sheet",
    summary: "Secondary mild steel sheet for construction, shuttering, and general fabrication projects.",
    description:
      "Secondary MS Sheet from NRK supports cost-conscious buyers listed on IndiaMART under New Items alongside shuttering plates and MS channel supply.",
    mainImage: CATALOG_IMAGES.ms,
    specs: [
      { label: "Material", value: "Mild Steel Secondary" },
      { label: "Form", value: "Sheets / Plates" },
      { label: "Application", value: "Shuttering & fabrication" },
      { label: "Supply", value: "Bulk lots from Indore" },
    ],
    variants: [newItemsOfferings[0].title, "Ms Shuttering Plate", "Economy plate supply"],
    offerings: [newItemsOfferings[0]],
    technicalSpecs: withPurchaseTerms([
      { property: "Material", value: "Mild Steel Secondary", method: "Batch identification" },
      { property: "Application", value: "Shuttering & fabrication", method: "Customer requirement" },
      { property: "Size", value: "As per available stock", method: "Stock allocation" },
      { property: "Dispatch", value: "Bundled supply", method: "Logistics planning" },
    ]),
    recommendations: [rec.centering, rec.msPlates, rec.hrSheets],
  }),
  buildSecondaryProduct({
    slug: "ms-channel",
    title: "MS Channel",
    category: "Secondary Material",
    eyebrow: "Structural Supply",
    badge: "Secondary Grade: MS Channel",
    summary: "MS channel supply for framing, shutter, and light structural applications.",
    description:
      "MS Channel is listed on IndiaMART under New Items and complements NRK's rolling shutter and construction material range including iron shutter side channel.",
    mainImage: CATALOG_IMAGES.ms,
    specs: [
      { label: "Material", value: "Mild Steel" },
      { label: "Form", value: "Channel sections" },
      { label: "Application", value: "Shutter & framing" },
      { label: "Supply", value: "Indore & pan-India" },
    ],
    variants: [newItemsOfferings[1].title, hrSheetOfferings[1].title, "Shutter channel sections"],
    offerings: [newItemsOfferings[1], hrSheetOfferings[1]],
    technicalSpecs: withPurchaseTerms([
      { property: "Material", value: "Mild Steel", method: "Batch identification" },
      { property: "Application", value: "Shutter & framing", method: "Project specification" },
      { property: "Size", value: "As per available stock", method: "Stock allocation" },
      { property: "Dispatch", value: "Bundled supply", method: "Logistics planning" },
    ]),
    recommendations: [rec.centering, rec.msPlates, rec.secondaryCrfh],
  }),
  buildSecondaryProduct({
    slug: "bp-sheet",
    title: "BP Sheet (Bhatti Material)",
    category: "Secondary Material",
    eyebrow: "BP SHEET - (BHATTI MATERIAL)",
    badge: "Bhatti Material",
    summary:
      "BP sheets (Bhatti Material) specifically for heat treatment bhattis — ready stock ex Indore yard.",
    description:
      "BP Sheets are specialized Bhatti Material suitable for heat treatment ovens and annealing bhattis. Ready stock available ex Indore in multiple thicknesses.",
    mainImage: bpSheetImages[0] || CATALOG_IMAGES.cr,
    processImage: bpSheetImages[0] || CATALOG_IMAGES.cr,
    gallery: bpSheetImages,
    specs: [
      { label: "Material", value: "BP Sheet (Bhatti Material)" },
      { label: "Grade", value: "Bhatti Grade" },
      { label: "Thickness", value: "0.30 to 0.50 mm, 0.55 to 0.60 mm, 0.70 to 0.80 mm, 0.90 to 1.10 mm" },
      { label: "Size", value: "8 x 4 FT" },
    ],
    variants: [".30 TO .50MM", ".55 TO .60MM", ".70 to .80 MM", ".90 TO 1.1 MM"],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_SECONDARY, method: "Brochure specification" },
      { property: "Grade", value: "Bhatti Material", method: "Batch identification" },
      { property: "Thickness Bands", value: "0.30-0.50mm / 0.55-0.60mm / 0.70-0.80mm / 0.90-1.10mm", method: "Measurement check" },
      { property: "Size", value: "8 x 4 FT", method: "Stock allocation" },
    ]),
    recommendations: [rec.secondaryCrfh, rec.centering, rec.crCoils],
    section: "secondary",
  }),
  buildSecondaryProduct({
    slug: "centering-plates",
    title: "Centering Plates",
    category: "Manufacturing Product",
    eyebrow: "NRK IRON AND STEELS LLP",
    badge: "Ready Stock Ex Indore yard",
    summary:
      "Centering and shuttering plates manufactured in-house by NRK using high-quality CR material.",
    description:
      "Centering Plates from NRK are manufactured in-house with single & double support. Available in standard 3x2 and 2x1 sizes with consistent weight and structure.",
    mainImage: centeringPlateImages[0] || CATALOG_IMAGES.centering,
    processImage: centeringPlateImages[0] || CATALOG_IMAGES.centering,
    gallery: centeringPlateImages,
    specs: [
      { label: "Make", value: "NRK" },
      { label: "Product", value: "Centering Plate" },
      { label: "Size", value: "3 x 2 FT / 2 x 1 FT" },
      { label: "Weight", value: "11 to 12 kg (for 3x2)" },
      { label: "Support", value: "Single & Double Support Both available" },
    ],
    variants: ["3 x 2 FT (Single Support)", "3 x 2 FT (Double Support)", "2 x 1 FT (Single Support)", "2 x 1 FT (Double Support)"],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: "NRK (In-House Make)", method: "Manufacturer label" },
      { property: "Size Options", value: "3 x 2 FT / 2 x 1 FT", method: "Standard size check" },
      { property: "Weight Range", value: "11 to 12 kg (for 3x2)", method: "Weighing scale verification" },
      { property: "Support Type", value: "Single & Double Support", method: "Structural inspection" },
    ]),
    recommendations: [rec.msPlates, rec.secondaryCrfh, rec.shutterChannel],
    section: "manufacturing",
  }),
  buildSecondaryProduct({
    slug: "shutter-channel",
    title: "Shutter Channel",
    category: "Manufacturing Product",
    eyebrow: "NRK IRON AND STEELS LLP",
    badge: "Ready Stock Ex Indore yard",
    summary: "In-house manufactured rolling shutter channels and side channels for secure fabrication.",
    description:
      "Shutter Channels from NRK are manufactured in-house using heavy-duty steel to provide strength and stability for rolling shutters. Sourced directly from our Indore yard.",
    mainImage: shutterChannelImages[0] || CATALOG_IMAGES.purlin,
    processImage: shutterChannelImages[0] || CATALOG_IMAGES.purlin,
    gallery: shutterChannelImages,
    specs: [
      { label: "Make", value: "NRK (In-house)" },
      { label: "Product", value: "Shutter Channel / Side Channel" },
      { label: "Material", value: "Mild Steel (HR/CR)" },
      { label: "Application", value: "Rolling Shutter Fabrication" },
    ],
    variants: ["Standard Shutter Channel", "Heavy Side Channel"],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: "NRK (In-House)", method: "Manufacturer label" },
      { property: "Material", value: "Mild Steel (HR/CR)", method: "Batch identification" },
      { property: "Application", value: "Rolling shutter fabrication", method: "Structural specification" },
      { property: "Dispatch", value: "Bundled supply", method: "Logistics planning" },
    ]),
    recommendations: [rec.centering, rec.msPlates, rec.secondaryCrfh],
    section: "manufacturing",
  }),
  buildSecondaryProduct({
    slug: "ac-stand",
    title: "AC Stand",
    category: "Manufacturing Product",
    eyebrow: "NRK IRON AND STEELS LLP",
    badge: "In-House Manufactured",
    summary: "Heavy-duty outdoor air conditioner stands and wall mounting brackets.",
    description:
      "AC Stands from NRK are manufactured in-house using durable structural steel. Designed to withstand heavy loads and harsh weather conditions to support AC outdoor units securely.",
    mainImage: acStandImages[0] || CATALOG_IMAGES.centering,
    processImage: acStandImages[0] || CATALOG_IMAGES.centering,
    gallery: acStandImages,
    specs: [
      { label: "Make", value: "NRK (In-house)" },
      { label: "Product", value: "AC Outdoor Unit Stand / Bracket" },
      { label: "Material", value: "Mild Steel (Heavy-Duty)" },
      { label: "Finish", value: "Anti-Rust Coated / Painted" },
    ],
    variants: ["Heavy Duty AC Stand", "Standard Wall Bracket"],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: "NRK (In-House)", method: "Manufacturer label" },
      { property: "Material", value: "Mild Steel (Heavy-Duty)", method: "Batch identification" },
      { property: "Finish", value: "Anti-Rust Paint / Powder Coated", method: "Finish inspection" },
      { property: "Application", value: "AC Outdoor Unit Mounting", method: "Installation SOP" },
    ]),
    recommendations: [rec.centering, rec.secondaryCrfh, rec.shutterChannel],
    section: "manufacturing",
  }),
  buildSecondaryProduct({
    slug: "crc-metal-scrap",
    title: "CRC Metal Scrap",
    category: "Secondary Material",
    eyebrow: "Recycling Supply",
    badge: "Secondary Grade: CRC Scrap",
    summary: "CRC metal scrap for recycling, remelting, and secondary processing applications.",
    description:
      "CRC Metal Scrap is listed on IndiaMART under New Items and supports buyers seeking cold rolled scrap material from NRK's secondary inventory pipeline.",
    mainImage: CATALOG_IMAGES.cr,
    specs: [
      { label: "Material", value: "Cold Rolled Scrap" },
      { label: "Form", value: "Scrap / offcuts" },
      { label: "Application", value: "Recycling & remelting" },
      { label: "Supply", value: "Bulk lots" },
    ],
    variants: [newItemsOfferings[3].title, newItemsOfferings[4].title, "CR offcuts"],
    offerings: [newItemsOfferings[3], newItemsOfferings[4]],
    technicalSpecs: withPurchaseTerms([
      { property: "Material", value: "Cold Rolled Scrap", method: "Batch identification" },
      { property: "Form", value: "Scrap / offcuts", method: "Stock allocation" },
      { property: "Application", value: "Recycling & remelting", method: "Customer requirement" },
      { property: "Dispatch", value: "Bulk loading", method: "Weighing scale verification" },
    ]),
    recommendations: [rec.secondaryCrfh, rec.crCoils, rec.annealed],
  }),
] as const;

// Legacy aggregate product slugs kept for backward-compatible URLs
const legacyEntries = [
  buildPrimeProduct({
    slug: "hr-sheets-plates",
    title: "HR Sheets & Plates",
    category: "Hot Rolled Products",
    eyebrow: "Structural Supply",
    badge: "Industrial Grade: HR Prime Stock",
    summary: "Structural-grade hot rolled sheets and plates for fabrication and infrastructure projects.",
    description:
      "Hot rolled sheets and plates from NRK provide dependable strength for structural frames, fabrication shops, and heavy industrial applications. See also HR Sheets & Coils and MS Plates for detailed specifications.",
    mainImage: CATALOG_IMAGES.hr,
    specs: [
      { label: "Thickness", value: "1.5mm to 32mm+" },
      { label: "Grade", value: "1079 / 2062 / E250 / E350" },
      { label: "Form", value: "Sheets, Coils & Plates" },
      { label: "Make", value: MAKES_HR },
    ],
    variants: ["HR sheets", "MS plates", "Hot Rolled Sheet Plate"],
    recommendations: [rec.hrSheets, rec.msPlates, rec.crCoils],
  }),
  buildPrimeProduct({
    slug: "galvanized-coated-sheets",
    title: "Galvanized & Coated Sheets",
    category: "Coated Products",
    eyebrow: "Corrosion Protection",
    badge: "Industrial Grade: Coated Steel",
    summary: "Galvanized, color coated, galvalume, and zincro sheets for roofing, cladding, and durable panels.",
    description:
      "Galvanized and coated sheets combine surface protection with formability for roofing, cladding, and pre-engineered building applications. See individual GP, GC, Color Coated, Galvalume, and Zincro pages for full specifications.",
    mainImage: CATALOG_IMAGES.coated,
    specs: [
      { label: "Products", value: "GP / GC / Color / GL / Zincro" },
      { label: "Thickness", value: "0.14mm to 3.00mm" },
      { label: "Profile", value: "Flat & Profiled" },
      { label: "Use Case", value: "Roofing & Cladding" },
    ],
    variants: ["Galvanized sheets", "Color coated sheets", "Profile roofing sheets"],
    recommendations: [rec.gpSheets, rec.gcSheets, rec.colorCoated],
  }),
] as const;

export const catalogProducts: Record<string, CatalogDetail> = Object.fromEntries(
  [...primeEntries, ...secondaryEntries, ...legacyEntries].map((entry) => [entry.slug, entry]),
);

export const productSlugs = Object.keys(catalogProducts);

export function getCatalogProduct(slug: string): CatalogDetail | undefined {
  const product = catalogProducts[slug];
  if (!product) return undefined;

  const isSecondary = productCardMeta.some((item) => item.section === "secondary" && item.slug === slug);
  if (isSecondary && !isSecondaryCatalogProductVisible(product.mainImage)) {
    return undefined;
  }

  return product;
}

export const productCardMeta: Array<{
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  eyebrow?: string;
  section: string;
}> = [
  ...primeEntries.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    description: p.summary,
    image: p.mainImage,
    section: p.section || ("prime" as const),
  })),
  ...secondaryEntries.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    description: p.summary,
    image: p.mainImage,
    eyebrow: p.eyebrow,
    section: p.section || ("secondary" as const),
  })),
];
