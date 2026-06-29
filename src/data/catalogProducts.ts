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
  crSemiHardSheetsStock,
  crSemiHardCuttingStock,
  crPickledCuttingStock,
} from "@/data/catalogOfferings";
import type { ProductRecommendation } from "@/data/catalogTypes";
import {
  crCoiledPickledThicknessVariants,
  CR_PICKLED_SHEETS_SIZE,
} from "@/data/crCoiledPickledVariants";

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
    image: CATALOG_IMAGES.centering,
    note: "In-house centering and shuttering plates for construction sites.",
  },
  secondaryCrfh: {
    slug: "cr-semi-tempered-crfh",
    title: "CR Semi Tempered / CRFH",
    type: "Secondary Material",
    image: CATALOG_IMAGES.cr,
    note: "Value coil-end and semi hard material for cost-effective supply.",
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
    mainImage: CATALOG_IMAGES.hr,
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
    mainImage: CATALOG_IMAGES.cr,
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
    mainImage: CATALOG_IMAGES.cr,
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
    mainImage: CATALOG_IMAGES.ms,
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
    mainImage: CATALOG_IMAGES.coated,
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
    mainImage: CATALOG_IMAGES.profile,
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
    mainImage: CATALOG_IMAGES.coated,
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
    slug: "profile-sheets",
    title: "Profile Sheets",
    category: "Prime Material",
    eyebrow: "Profiled Roofing",
    badge: "Industrial Grade: Corrugated Profiles",
    summary: "Profiled and corrugated sheets for roofing, cladding, and long-span building applications.",
    description:
      "Profile Sheets from AMNS, Uttam, JSW, and TATA are supplied in soft grades with color options. Width after corrugation ranges from 1000mm to 1060mm with lengths up to 10000mm.",
    mainImage: CATALOG_IMAGES.profile,
    specs: [
      { label: "Make", value: "AMNS / Uttam / JSW / TATA" },
      { label: "Grade", value: "Soft & all colours" },
      { label: "Thickness", value: "0.40mm to 1.00mm" },
      { label: "Profile Width", value: "1000–1060mm x up to 10000mm" },
    ],
    variants: ["Deck sheets", "Corrugated profiles", "Roofing profile sheets"],
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: "AMNS / Uttam / JSW / TATA", method: "Brochure specification" },
      { property: "Thickness", value: "0.40mm to 1.00mm", method: "Order verification" },
      { property: "Profile Width", value: "1000–1060mm (after corrugation)", method: "Template verification" },
      { property: "Length", value: "Up to 10000mm", method: "Cut-to-length service" },
    ]),
    recommendations: [rec.colorCoated, rec.gcSheets, rec.gpSheets],
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
    mainImage: CATALOG_IMAGES.hr,
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
    mainImage: CATALOG_IMAGES.coated,
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
    mainImage: CATALOG_IMAGES.coated,
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
  buildPrimeProduct({
    slug: "centering-plates",
    title: "Centering Plates",
    category: "Prime Material",
    eyebrow: "Construction Supply",
    badge: "Industrial Grade: NRK In-House Make",
    summary: "Centering and shuttering plates for construction with consistent weight and timely delivery.",
    description:
      "Centering Plates from NRK are manufactured in-house using CR secondary material. Listed on IndiaMART as Centering Sheets, Mild Steel Shuttering Plate, Shuttering Plates, and Mild Steel Centering Plate.",
    mainImage: CATALOG_IMAGES.centering,
    specs: [
      { label: "Make", value: "NRK / In-House" },
      { label: "Grade", value: "CR Secondary Material" },
      { label: "Size", value: "1 / 1.5 / 2ft x 3ft" },
      { label: "Weight", value: "10Kg to 13Kg" },
    ],
    variants: centeringPlateOfferings.map((o) => o.title),
    offerings: centeringPlateOfferings,
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: "NRK / In-House Make", method: "Brochure specification" },
      { property: "Grade", value: "CR Secondary Material", method: "In-house production" },
      { property: "Size", value: "1 / 1.5 / 2ft x 3ft", method: "Standard sizes" },
      { property: "Weight", value: "10Kg to 13Kg", method: "Weighing scale verification" },
    ]),
    recommendations: [rec.msPlates, rec.secondaryCrfh, rec.hrSheets],
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
      { label: "Thickness", value: "1.80 to 4.10 mm (select below)" },
      { label: "Size", value: CR_PICKLED_SHEETS_SIZE },
    ],
    variants: crCoiledPickledThicknessVariants.map((variant) => variant.label),
    thicknessVariants: crCoiledPickledThicknessVariants,
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
    title: "CR Semi Tempered / CRFH (Secondary)",
    category: "Secondary Material",
    eyebrow: "Coil-End Supply",
    badge: "Secondary Grade: Semi Hard",
    summary: "CR coil-end and semi tempered CRFH material for economical semi hard sheet requirements.",
    description:
      "CR Coil-end Material in semi tempered and CRFH grades serves fabrication and construction needs. Listed on IndiaMART as CR Semi Hard Material, CR Coilend Material, and Cr Cutting Sheet (0.30 to 0.60).",
    mainImage: CATALOG_IMAGES.cr,
    specs: [
      { label: "Make", value: MAKES_SECONDARY },
      { label: "Grade", value: "Coil leader end / Semi Hard" },
      { label: "Thickness", value: "0.30 to 4.50mm" },
      { label: "Size", value: "4ft / 3.15ft x 8ft / random" },
    ],
    variants: crSemiHardSheetsStock.map((o) => o.title),
    offerings: crSemiHardSheetsStock,
    technicalSpecs: withPurchaseTerms([
      { property: "Make", value: MAKES_SECONDARY, method: "Brochure specification" },
      { property: "Grade", value: "Coil leader end / Semi Hard", method: "Batch identification" },
      { property: "Thickness", value: "0.30 to 4.50mm", method: "Measurement check" },
      { property: "Size", value: "4ft / 3.15ft x 8ft / Random Size", method: "Stock allocation" },
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
    mainImage: CATALOG_IMAGES.cr,
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
    slug: "rolling-shutter-channel",
    title: "Rolling Shutter Channel",
    category: "Secondary Material",
    eyebrow: "Shutter Supply",
    badge: "Shutter Components",
    summary: "Shutter channel and side channel supply for rolling shutter fabrication.",
    description:
      "Rolling Shutter Channel from NRK includes shutter channel supplier listings from IndiaMART and iron shutter side channel from the HR Sheet category.",
    mainImage: CATALOG_IMAGES.purlin,
    specs: [
      { label: "Product", value: "Shutter channel / side channel" },
      { label: "Material", value: "Mild Steel" },
      { label: "Application", value: "Rolling shutter fabrication" },
      { label: "Supply", value: "Indore wholesale" },
    ],
    variants: [rollingShutterOfferings[0].title, hrSheetOfferings[1].title],
    offerings: [...rollingShutterOfferings, hrSheetOfferings[1]],
    technicalSpecs: withPurchaseTerms([
      { property: "Product", value: "Shutter channel / side channel", method: "IndiaMART listing" },
      { property: "Material", value: "Mild Steel", method: "Batch identification" },
      { property: "Application", value: "Rolling shutter fabrication", method: "Project specification" },
      { property: "Dispatch", value: "Bundled supply", method: "Logistics planning" },
    ]),
    recommendations: [rec.centering, rec.msPlates, rec.secondaryCrfh],
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
  return catalogProducts[slug];
}

export const productCardMeta: Array<{
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  section: "prime" | "secondary";
}> = [
  ...primeEntries.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    description: p.summary,
    image: p.mainImage,
    section: "prime" as const,
  })),
  ...secondaryEntries.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    description: p.summary,
    image: p.mainImage,
    section: "secondary" as const,
  })),
];
