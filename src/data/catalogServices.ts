import {
  buildServiceEntry,
  CATALOG_IMAGES,
  withPurchaseTerms,
  type CatalogDetail,
} from "@/data/catalogBuilder";
import { productRecommendations } from "@/data/catalogProducts";

const rec = productRecommendations;

const processingServices = [
  buildServiceEntry({
    slug: "slitting",
    title: "Slitting",
    category: "Steel Processing",
    eyebrow: "High-Speed Service",
    badge: "Industrial Grade: Burr-Free Slit Coils",
    summary: "Precision coil slitting for accurate widths, clean edges, and consistent output across production batches.",
    description:
      "Our slitting lines convert master coils into narrow-width slit coils with controlled edge quality and tight width tolerance. The service supports HR, CR, galvanized, coated, and mild steel material for fabrication, component manufacturing, and repeat industrial supply.",
    mainImage: CATALOG_IMAGES.slitting,
    specs: [
      { label: "Width Range", value: "Custom Coil Widths" },
      { label: "Edge Finish", value: "Clean / Burr-Controlled" },
      { label: "Material", value: "HR, CR, GI, MS" },
      { label: "Use Case", value: "Fabrication & Components" },
    ],
    variants: ["Narrow slit coils", "CRCA slit coils", "Coated steel slitting"],
    technicalSpecs: withPurchaseTerms([
      { property: "Width Accuracy", value: "As per order tolerance", method: "Inline width check" },
      { property: "Edge Condition", value: "Burr-controlled slit edge", method: "Visual inspection" },
      { property: "Coil Handling", value: "Protected loading and unloading", method: "Material handling SOP" },
      { property: "Batch Traceability", value: "Grade and size verified", method: "Dispatch documentation" },
    ]),
    process: ["Master coil loading", "Blade setup and width calibration", "High-speed slitting run", "Recoiling, inspection, and dispatch"],
    recommendations: [rec.crCoils, rec.gpSheets, rec.hrSheets],
  }),
  buildServiceEntry({
    slug: "cut-to-length",
    title: "Cut to Length (CTL)",
    category: "Sheet Processing",
    eyebrow: "On-Premises CTL Machine",
    badge: "Industrial Grade: Custom Length Sheets",
    summary: "Coil-to-sheet cutting on our CTL machine for accurate sizes, flatness control, and reduced wastage.",
    description:
      "Our cut-to-length (CTL) machine converts coils into sheets according to project and production requirements. It is suited for CR, HR, coated, and mild steel material where predictable length, clean stacking, and dispatch-ready packaging matter.",
    mainImage: CATALOG_IMAGES.cutToLength,
    specs: [
      { label: "Length", value: "Up to 10000mm" },
      { label: "Output", value: "Sheets / Blanks" },
      { label: "Material", value: "HR, CR, Coated" },
      { label: "Packing", value: "Stacked & Bundled" },
    ],
    variants: ["CR sheet cutting", "HR sheet cutting", "Pickled sheet cutting"],
    technicalSpecs: withPurchaseTerms([
      { property: "Length Accuracy", value: "Project-specific tolerance", method: "Measuring inspection" },
      { property: "Sheet Flatness", value: "Controlled through leveling", method: "Visual and surface check" },
      { property: "Stacking", value: "Aligned bundles", method: "Dispatch readiness check" },
      { property: "Wastage Control", value: "Optimized coil usage", method: "CTL process planning" },
    ]),
    process: ["Coil loading and leveling", "Length setup", "Cutting and stacking", "Bundle inspection and loading"],
    recommendations: [rec.crCoils, rec.msPlates, rec.colorCoated],
  }),
  buildServiceEntry({
    slug: "annealing",
    title: "Annealing Processing",
    category: "Heat Treatment",
    eyebrow: "Annealing Furnaces On-Premises",
    badge: "Industrial Grade: Softer Formable Steel",
    summary: "Annealing furnaces on-premises for improved ductility, softness, and workability in forming applications.",
    description:
      "Annealing processing at NRK involves heating steel to a particular temperature and cooling it at a controlled rate. We serve clients who need thinner and softer materials for manufacturing, drawing, and component forming.",
    mainImage: CATALOG_IMAGES.annealing,
    specs: [
      { label: "Purpose", value: "Softness & Formability" },
      { label: "Treatment", value: "Controlled Heating" },
      { label: "Material", value: "CR / Mild Steel" },
      { label: "Applications", value: "Deep Drawing" },
    ],
    variants: ["Soft CR material", "Forming-grade sheet", "Batch heat treatment"],
    technicalSpecs: withPurchaseTerms([
      { property: "Hardness Control", value: "As per grade requirement", method: "Hardness testing" },
      { property: "Formability", value: "Improved ductility", method: "Material validation" },
      { property: "Batch Cycle", value: "Controlled heat profile", method: "Furnace process log" },
      { property: "Surface Condition", value: "Application suitable finish", method: "Visual inspection" },
    ]),
    process: ["Material verification", "Heat cycle planning", "Annealing furnace run", "Cooling, inspection, and release"],
    recommendations: [rec.crCoils, rec.annealed, rec.hrSheets],
  }),
  buildServiceEntry({
    slug: "crane-handling",
    title: "Crane Handling",
    category: "Material Handling",
    eyebrow: "On-Premises Cranes",
    badge: "Industrial Grade: 10–30 Ton Capacity",
    summary: "Heavy-duty crane handling for safe loading, unloading, and movement of coils, sheets, and plates.",
    description:
      "NRK maintains cranes on-premises with approximately 10 to 30-ton load bearing capacity each. Cranes help in loading and unloading while reducing damage risk to prime and processed steel products.",
    mainImage: CATALOG_IMAGES.logistics,
    specs: [
      { label: "Capacity", value: "10–30 Ton Cranes" },
      { label: "Purpose", value: "Loading / Unloading" },
      { label: "Material", value: "Coils, Sheets, Plates" },
      { label: "Location", value: "NRK Indore Facility" },
    ],
    variants: ["Coil lifting", "Plate handling", "Dispatch loading"],
    technicalSpecs: withPurchaseTerms([
      { property: "Crane Capacity", value: "10–30 ton per unit", method: "Equipment specification" },
      { property: "Handling SOP", value: "Protected lifting procedures", method: "Operator procedure" },
      { property: "Damage Prevention", value: "Controlled movement paths", method: "Material handling SOP" },
      { property: "Integration", value: "Warehousing & dispatch", method: "Logistics workflow" },
    ]),
    process: ["Material positioning", "Crane lift and transfer", "Stacking or loading", "Safety inspection"],
    recommendations: [rec.hrSheets, rec.crCoils, rec.msPlates],
  }),
  buildServiceEntry({
    slug: "weighing-scale",
    title: "Weighing Scale Service",
    category: "Quality Assurance",
    eyebrow: "High-Accuracy Weighing",
    badge: "Industrial Grade: Bench & Platform Scales",
    summary: "High-accuracy industrial weighing for transparent transactions and in-house customer service.",
    description:
      "Our weighing scale assists in high-accuracy weighing with industrial bench scales and platforms. This supports transparent working with clients and helps deliver dependable in-house service at NRK Indore.",
    mainImage: CATALOG_IMAGES.ms,
    specs: [
      { label: "Equipment", value: "Bench & Platform Scales" },
      { label: "Purpose", value: "Transparent Weighing" },
      { label: "Material", value: "Coils, Sheets, Plates, Scrap" },
      { label: "Service", value: "In-House at NRK" },
    ],
    variants: ["Dispatch weighing", "Bulk lot verification", "Centering plate weight check"],
    technicalSpecs: withPurchaseTerms([
      { property: "Accuracy", value: "Industrial grade calibration", method: "Scale calibration log" },
      { property: "Application", value: "Dispatch & receiving", method: "Weighing SOP" },
      { property: "Transparency", value: "Customer-visible weighing", method: "In-house service" },
      { property: "Documentation", value: "Weight records on dispatch", method: "Delivery note" },
    ]),
    process: ["Material placement on scale", "Weight verification", "Documentation", "Release for dispatch"],
    recommendations: [rec.centering, rec.msPlates, rec.secondaryCrfh],
  }),
] as const;

const fabricationServices = [
  buildServiceEntry({
    slug: "profiling-fabrication",
    title: "Profiling & Fabrication",
    category: "Fabrication Services",
    eyebrow: "Deck, Purlin & Profiling",
    badge: "Industrial Grade: Custom Profiles",
    summary: "Deck sheets, Z & C purlins, and custom profiling for roofing and steel building frameworks.",
    description:
      "NRK offers profiling and fabrication support including deck sheets, Z and C purlins, and custom corrugation for roofing and construction needs. This complements our profile sheets, color coated, and GC product range.",
    mainImage: CATALOG_IMAGES.profile,
    specs: [
      { label: "Products", value: "Deck / Purlin / Profiles" },
      { label: "Application", value: "Roofing & PEB" },
      { label: "Material", value: "Coated & HR/CR" },
      { label: "Output", value: "Custom lengths" },
    ],
    variants: ["Deck sheets", "Z & C Purlin", "Custom corrugation profiling"],
    technicalSpecs: withPurchaseTerms([
      { property: "Profile Options", value: "Project-specific profiles", method: "Template verification" },
      { property: "Purlin Supply", value: "Z & C sections", method: "Fabrication specification" },
      { property: "Length", value: "Up to 10000mm", method: "Cut-to-length integration" },
      { property: "Material", value: "Coated or plain steel", method: "Order specification" },
    ]),
    process: ["Profile specification", "Material selection", "Profiling or roll forming", "Bundling and dispatch"],
    recommendations: [rec.profileSheets, rec.colorCoated, rec.gcSheets],
  }),
  buildServiceEntry({
    slug: "logistics-warehousing",
    title: "Logistics & Transportation",
    category: "Supply Chain",
    eyebrow: "Doorstep Delivery",
    badge: "Industrial Grade: 10–15 Ton Transport",
    summary: "Warehousing, wooden pallet packaging, and doorstep delivery across Madhya Pradesh and pan-India.",
    description:
      "NRK provides dedicated warehousing, wooden pallet packaging, and transportation with approximately 10–15 ton capacity for doorstep delivery. Combined with crane handling and weighing, this completes the supply path from inventory to customer site.",
    mainImage: CATALOG_IMAGES.logistics,
    processVideo: "/assests/banner_video.mp4",
    specs: [
      { label: "Transport", value: "10–15 Ton Capacity" },
      { label: "Storage", value: "Dedicated Warehousing" },
      { label: "Packaging", value: "Wooden Pallet Bundles" },
      { label: "Service", value: "Door-to-Door" },
    ],
    variants: ["Processed material dispatch", "Warehoused coil supply", "Wooden pallet packaging"],
    technicalSpecs: withPurchaseTerms([
      { property: "Transport Capacity", value: "10–15 tons per trip", method: "Logistics planning" },
      { property: "Storage", value: "Organized material bays", method: "Inventory records" },
      { property: "Packaging", value: "Wooden pallet protection", method: "Dispatch SOP" },
      { property: "Coverage", value: "Indore & pan-India", method: "Route coordination" },
    ]),
    process: ["Material receiving", "Storage and batch identification", "Load planning", "Dispatch documentation and delivery"],
    recommendations: [rec.hrSheets, rec.crCoils, rec.gpSheets],
  }),
] as const;

const supplyCategoryServices = [
  buildServiceEntry({
    slug: "hr-cr-ms-plates",
    title: "HR, CR & MS Plates Supply",
    category: "Prime Materials",
    eyebrow: "Prime Material Supply",
    badge: "Industrial Grade: Verified Steel Inventory",
    summary: "Wholesale supply of HR, CR, and MS plates from trusted manufacturers including SAIL, Jindal, and AMNS.",
    description:
      "NRK Iron & Steel is a prominent wholesale distributor from Indore for Hot Rolled Sheet Plate, CR sheets, and MS plates. Material is checked for grade, size, and order fit before dispatch with payment against delivery terms.",
    mainImage: CATALOG_IMAGES.hr,
    specs: [
      { label: "Grades", value: "1079 / 2062 / E250 / E350 / CRCA" },
      { label: "Supply", value: "Sheets, Coils, Plates" },
      { label: "Source", value: "SAIL, Jindal, AMNS, TATA" },
      { label: "MOQ", value: "10 MT minimum" },
    ],
    variants: ["HR sheets & coils", "CRCA sheets", "MS plates", "Hot Rolled Sheet Plate"],
    technicalSpecs: withPurchaseTerms([
      { property: "Grade Match", value: "As per customer specification", method: "Material documentation" },
      { property: "Size Verification", value: "Thickness and dimension checked", method: "Receiving inspection" },
      { property: "Inventory Control", value: "Batch-wise identification", method: "Stock records" },
      { property: "Processing", value: "Slitting, CTL, annealing available", method: "On-premises services" },
    ]),
    process: ["Requirement mapping", "Grade and stock selection", "Optional processing", "Bundling and dispatch"],
    recommendations: [rec.hrSheets, rec.crCoils, rec.msPlates],
  }),
  buildServiceEntry({
    slug: "coated-profile-sheets",
    title: "Coated & Profile Sheets Supply",
    category: "Corrosion Resistant",
    eyebrow: "Coated Material Supply",
    badge: "Industrial Grade: GP / GC / Color / Profile",
    summary: "Galvanized, galvalume, color-coated, zincro, and profile sheet solutions for durable applications.",
    description:
      "Our coated and profile sheet range supports roofing, cladding, industrial panels, and iron sheet supplier requirements from IndiaMART. Material can be supplied in plain, corrugated, coated, or profile formats based on project needs.",
    mainImage: CATALOG_IMAGES.coated,
    specs: [
      { label: "Products", value: "GP, GC, GL, Color, Zincro, Profile" },
      { label: "Coating", value: "AZ70 / AZ150 / GSM options" },
      { label: "Formats", value: "Plain / Corrugated / Profile" },
      { label: "Use Case", value: "Roofing & Panels" },
    ],
    variants: ["Galvanized sheets", "Galvalume sheets", "Color coated profile sheets", "Iron Sheet Suppliers"],
    technicalSpecs: withPurchaseTerms([
      { property: "Coating Type", value: "Zinc / Al-Zn / Color coated", method: "Product documentation" },
      { property: "Profile Options", value: "Project-specific profiles", method: "Order specification" },
      { property: "Surface Finish", value: "Clean visual finish", method: "Visual inspection" },
      { property: "Length Supply", value: "Custom lengths available", method: "CTL & profiling services" },
    ]),
    process: ["Application review", "Coating and profile selection", "Cutting or profiling", "Packing and dispatch"],
    recommendations: [rec.gpSheets, rec.gcSheets, rec.profileSheets],
  }),
] as const;

export const catalogServices: Record<string, CatalogDetail> = Object.fromEntries(
  [...processingServices, ...fabricationServices, ...supplyCategoryServices].map((entry) => [entry.slug, entry]),
);

export const serviceSlugs = Object.keys(catalogServices);

export function getCatalogService(slug: string): CatalogDetail | undefined {
  return catalogServices[slug];
}

export const serviceCardMeta = [
  ...processingServices.map((s) => ({
    id: s.slug,
    slug: s.slug,
    title: s.title,
    description: s.summary,
    image: s.mainImage,
    kind: "service" as const,
    section: "processing" as const,
  })),
  ...fabricationServices.map((s) => ({
    id: s.slug,
    slug: s.slug,
    title: s.title,
    description: s.summary,
    image: s.mainImage,
    kind: "service" as const,
    section: "fabrication" as const,
  })),
  ...supplyCategoryServices.map((s) => ({
    id: s.slug,
    slug: s.slug,
    title: s.title,
    description: s.summary,
    image: s.mainImage,
    kind: "service" as const,
    section: "processing" as const,
  })),
];

// Specialty cards that link to profiling-fabrication or logistics
export const specialtyServiceCardMeta = [
  {
    id: "deck-sheets",
    slug: "profiling-fabrication",
    title: "Deck Sheets",
    description: "Durable structural deck sheets ideal for roofing and floor applications.",
    image: CATALOG_IMAGES.profile,
    kind: "service" as const,
    section: "fabrication" as const,
  },
  {
    id: "z-c-purlin",
    slug: "profiling-fabrication",
    title: "Z & C Purlin",
    description: "High-strength Z and C purlins for steel building frameworks and pre-engineered structures.",
    image: CATALOG_IMAGES.purlin,
    kind: "service" as const,
    section: "fabrication" as const,
  },
  {
    id: "profiling",
    slug: "profiling-fabrication",
    title: "Profiling",
    description: "Custom profile and corrugation services for roofing and construction needs.",
    image: CATALOG_IMAGES.profile,
    kind: "service" as const,
    section: "fabrication" as const,
  },
  {
    id: "wooden-pallet",
    slug: "logistics-warehousing",
    title: "Wooden Pallet Packaging",
    description: "Secure wooden pallet packaging for damage-free steel dispatch and site delivery.",
    image: CATALOG_IMAGES.logistics,
    kind: "service" as const,
    section: "fabrication" as const,
  },
] as const;

export const serviceLinks = Object.values(catalogServices).map(({ slug, title, eyebrow }) => ({
  slug,
  title,
  eyebrow,
}));
