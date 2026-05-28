export type ProductDetail = {
  slug: string;
  title: string;
  category: string;
  eyebrow: string;
  badge: string;
  summary: string;
  description: string;
  mainImage: string;
  processImage: string;
  processVideo?: string;
  gallery: string[];
  specs: Array<{ label: string; value: string }>;
  variants: string[];
  technicalSpecs: Array<{ property: string; value: string; method: string }>;
  featureCards: Array<{ icon: "gauge" | "shield" | "truck"; title: string; body: string }>;
  process: string[];
  recommendations: ProductRecommendation[];
};

export type ProductRecommendation = {
  slug: string;
  title: string;
  type: string;
  image: string;
  note: string;
};

const gallerySet = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBRKVZ7OTc54HY7px_IqK8IxBw7DBGJMM5ThTrK647yBQMXSlaSxNsdaLQctQu-8gJbNDTB0YHO3eYOhF8ur_gsbIu1Y4d6zHOG9OcLj2fmcy7gyNJRIolPBBdl-m7shRcFHnxlPXIS0KdCuk_fxOLQYQ-9NnNlpBTWbdin817CizhsNzZhbJScA9I99Me2FtiMWFKVQU3EDHQWiJzxUNaPUrmqK6RSwHfYT3yGcnNT1xTsR1CftjNgOTAkcEs5MMSgN-hKI5nOtWE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9ZpmlTi9am7jAl3U69ngMTXiV7YHlzoRweLAmBg3U0RavWxTHJ2b8IPruaQ9-dnjFUwuQL1xNZK3LBkggzBv1l8DtaQdmxOKFUWUOs07kpOxvYHIR2JpYxH0rexpvWJQ6fGejqpa5AiBFrUL7Tye0qUdPKUM06F3Jee_vttkYUqoFFByAHosY8tUmo5j5CPpTt_T5F_XPrQgnxvPP_AJEwx_FY5STNvE5dvPOsAnCOV8AB-RmL7qlceqMvm3HoBGYRxvu7pIfys",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDB0V8AkOvGcfFYxE2ed-7p9yTbfHgwusGX0YJPJiWlQ6LtK8_fMgtMpIWkh5LBeQRsFE3TPoKv2DeP-jBKRXCuBj20dsQggHyp7lEK9P-DmAiVRv8C0fFhkI3ifeUcWszFt38r-adOR2x86Jnmvtl25Uu61Fdfyogckz2ub6Kr0ahiUCWppxsiiG2XinepiY7a560BYqW4Blpzr1SoHiAUIq7Nst3WySQUQBIJI-JaCBcURjJgPGnXBId3w0dc-528UA64lZDbGjU",
];

const processImage =
  "https://lh3.googleusercontent.com/aida/ADBb0ujPEXWWg0iI87xROhYOFi07NvkaakLAKcufgsmsIULakcaTeHZTBoIc_SxWcBJJ_XJXykvO25FlqnSvlL2F2-qayNrL4cFeH77NIYfPrDj7cPcOgWyaoKvxwlrpSEHlZKBjl6X4VE8b3F2mfO97oySF6u5pyG3CEJy3o0ht1wmhFITEbVwKqYEQKEAzVynO-vMzEP2_ED04Cr3uAEBun4G0G363gZ2HgbEP0sHEUcbr6f0mh2B_d0W_Br0";

export const productRecommendations = {
  crCoils: {
    slug: "cold-rolled-coils",
    title: "Cold Rolled Coils",
    type: "CR Products",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCu_AF4dpTBmmHegSorKBsEdCUm3I3JfVSx-XDp7nW5n2ACrXY9J0CwN8jLoATp9dx0caHq31eUOSVbKeaHMKJzjupwoBrIK4jxfcIsnTr8TBQxD-0C98JSDHjG-OdTpegwo_gsOy2i-sOqIkEyz6x-hSP1L-xFv5WSgkSEd1eEuYryj9gEMid7FVJuc8NxOzfqCsFI9ZsUBqJC3_YM-jOg7zVDEf7NY08107lVgXiQ56XFQE-7ka9R9lxfEI9Tx4mH7_kGlulQTAc",
    note: "Precision surface finish with dependable dimensional tolerance.",
  },
  hrPlates: {
    slug: "hr-sheets-plates",
    title: "HR Sheets & Plates",
    type: "Hot Rolled",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWEdwMeNFxKE61YEA_hposv1SW7wwWs7ZpM87Yvzj4ZW5FuYnfj5N4Dvl4HOD6cXk1oKKj0kzvxZ1s2Zxj5ryEcxpqaHQfhnQd76vZ2VETh5WX4LOiEvMSdOWRcz2l6Yo7-xFXWO4ztf2th7pDtA_FSNFPa5hWS-3itr7dfvd-a79mm8WP7ZbQbw5HVlAS_wQF84OA52bx0QSxFRLqn2p85Y_Q2R60-mBSn7NxEQ3NYfyTbfNTjQ3oLalfM363PxPqeaxhNLTdz6o",
    note: "Structural-grade inventory for fabrication and infrastructure work.",
  },
  coated: {
    slug: "galvanized-coated-sheets",
    title: "Galvanized & Coated Sheets",
    type: "Coated Products",
    image: "",
    note: "Corrosion-resistant sheets for roofing, cladding, and durable panels.",
  },
  msPlates: {
    slug: "ms-plates",
    title: "MS Plates",
    type: "Mild Steel",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRKVZ7OTc54HY7px_IqK8IxBw7DBGJMM5ThTrK647yBQMXSlaSxNsdaLQctQu-8gJbNDTB0YHO3eYOhF8ur_gsbIu1Y4d6zHOG9OcLj2fmcy7gyNJRIolPBBdl-m7shRcFHnxlPXIS0KdCuk_fxOLQYQ-9NnNlpBTWbdin817CizhsNzZhbJScA9I99Me2FtiMWFKVQU3EDHQWiJzxUNaPUrmqK6RSwHfYT3yGcnNT1xTsR1CftjNgOTAkcEs5MMSgN-hKI5nOtWE",
    note: "Reliable plate stock for machining, fabrication, and heavy duty frames.",
  },
} satisfies Record<string, ProductRecommendation>;

const products: Record<string, ProductDetail> = {
  "cold-rolled-coils": {
    slug: "cold-rolled-coils",
    title: "Cold Rolled Coils",
    category: "Cold Rolled Products",
    eyebrow: "Product Spotlight",
    badge: "Industrial Grade: Mild Steel",
    summary:
      "Precision-finished mild steel coils for fabrication, component manufacturing, and dependable industrial supply.",
    description:
      "Our Cold Rolled Coils are manufactured through a meticulous process of passing hot rolled steel through rollers at room temperature, ensuring superior surface finish and precise dimensional tolerances.",
    mainImage: productRecommendations.crCoils.image,
    processImage,
    gallery: gallerySet,
    specs: [
      { label: "Thickness", value: "0.30 - 4mm" },
      { label: "Grade", value: "Semi Hard" },
      { label: "Size Range", value: "1.5ft & Above" },
      { label: "Material", value: "Mild Steel" },
    ],
    variants: ["CR Sheet Cutting", "CR Semi Hard Material", "CRCA slit coils"],
    technicalSpecs: [
      { property: "Yield Stress (MPa)", value: "240 - 320", method: "ASTM A1008" },
      { property: "Tensile Strength (MPa)", value: "350 - 450", method: "ASTM A1008" },
      { property: "Elongation (%)", value: "Min 20% (on 50mm GL)", method: "ISO 6892-1" },
      { property: "Hardness (HRB)", value: "50 - 65 Max", method: "Rockwell Scale B" },
      { property: "Surface Quality", value: "Oiled / Dry Matt Finish", method: "Visual - Grade A" },
    ],
    featureCards: [
      {
        icon: "gauge",
        title: "High Precision",
        body: "Guaranteed thickness consistency across the entire length of the coil within tight tolerance bands.",
      },
      {
        icon: "shield",
        title: "Quality Grade",
        body: "Every batch undergoes rigorous inspection for surface finish and dimensional accuracy before dispatch.",
      },
      {
        icon: "truck",
        title: "Ready Stock",
        body: "Maintained inventory supports repeat supply for fabrication and component manufacturing schedules.",
      },
    ],
    process: ["Material selection", "Cold rolling process", "Surface inspection", "Coil packing and dispatch"],
    recommendations: [productRecommendations.hrPlates, productRecommendations.coated, productRecommendations.msPlates],
  },
  "hr-sheets-plates": {
    slug: "hr-sheets-plates",
    title: "HR Sheets & Plates",
    category: "Hot Rolled Products",
    eyebrow: "Structural Supply",
    badge: "Industrial Grade: HR Prime Stock",
    summary: "Structural-grade hot rolled sheets and plates for fabrication and infrastructure projects.",
    description:
      "Hot rolled sheets and plates from NRK provide dependable strength for structural frames, fabrication shops, and heavy industrial applications with ready availability across standard sizes.",
    mainImage: productRecommendations.hrPlates.image,
    processImage,
    gallery: gallerySet,
    specs: [
      { label: "Thickness", value: "1.6mm - 100mm" },
      { label: "Grade", value: "IS 2062 / E250" },
      { label: "Form", value: "Sheets & Plates" },
      { label: "Material", value: "Hot Rolled" },
    ],
    variants: ["HR sheets", "MS plates", "Structural plate supply"],
    technicalSpecs: [
      { property: "Yield Strength", value: "250 MPa min", method: "Mill test certificate" },
      { property: "Tensile Strength", value: "410 MPa min", method: "Mill test certificate" },
      { property: "Elongation", value: "23% min", method: "Standard tensile test" },
      { property: "Flatness", value: "As per IS norms", method: "Visual and measurement check" },
      { property: "Traceability", value: "Grade and heat verified", method: "Dispatch documentation" },
    ],
    featureCards: [
      { icon: "gauge", title: "Structural Strength", body: "Prime HR material suited for load-bearing fabrication and infrastructure builds." },
      { icon: "shield", title: "Grade Verified", body: "Material is supplied with documentation aligned to project and compliance needs." },
      { icon: "truck", title: "Bulk Availability", body: "Ready stock supports large project schedules with coordinated dispatch." },
    ],
    process: ["Grade confirmation", "Stock allocation", "Cutting or dispatch prep", "Loading and delivery"],
    recommendations: [productRecommendations.crCoils, productRecommendations.coated, productRecommendations.msPlates],
  },
  "galvanized-coated-sheets": {
    slug: "galvanized-coated-sheets",
    title: "Galvanized & Coated Sheets",
    category: "Coated Products",
    eyebrow: "Corrosion Protection",
    badge: "Industrial Grade: Coated Steel",
    summary: "Corrosion-resistant galvanized and color coated sheets for roofing, cladding, and durable panels.",
    description:
      "Galvanized and coated sheets combine surface protection with formability for roofing, cladding, and pre-engineered building applications where long-term durability matters.",
    mainImage: productRecommendations.coated.image,
    processImage,
    gallery: gallerySet,
    specs: [
      { label: "Coating", value: "GI / Color Coated" },
      { label: "Thickness", value: "0.35 - 1.2mm" },
      { label: "Profile", value: "Flat & Profiled" },
      { label: "Use Case", value: "Roofing & Cladding" },
    ],
    variants: ["Galvanized sheets", "Color coated sheets", "Profile roofing sheets"],
    technicalSpecs: [
      { property: "Coating Mass", value: "As per order spec", method: "Coating weight check" },
      { property: "Surface Finish", value: "Uniform coated surface", method: "Visual inspection" },
      { property: "Profile Accuracy", value: "Project-specific profile", method: "Template verification" },
      { property: "Packing", value: "Protected coil or sheet bundles", method: "Dispatch readiness check" },
      { property: "Grade Match", value: "As per purchase order", method: "Batch documentation" },
    ],
    featureCards: [
      { icon: "gauge", title: "Weather Protection", body: "Coated surfaces help extend service life in exposed roofing and cladding applications." },
      { icon: "shield", title: "Finish Consistency", body: "Batch checks ensure uniform coating and profile quality before dispatch." },
      { icon: "truck", title: "Project Fit Supply", body: "Sheets and profiles can be supplied to match construction timelines." },
    ],
    process: ["Coating specification review", "Material selection", "Profiling or cutting", "Bundling and dispatch"],
    recommendations: [productRecommendations.crCoils, productRecommendations.hrPlates, productRecommendations.msPlates],
  },
  "ms-plates": {
    slug: "ms-plates",
    title: "MS Plates",
    category: "Mild Steel Products",
    eyebrow: "Fabrication Ready",
    badge: "Industrial Grade: MS Plate Stock",
    summary: "Reliable mild steel plate stock for machining, fabrication, and heavy-duty frames.",
    description:
      "MS plates from NRK support general fabrication, machining, and industrial frame work with practical sizing options and dependable supply for repeat production requirements.",
    mainImage: productRecommendations.msPlates.image,
    processImage,
    gallery: gallerySet,
    specs: [
      { label: "Thickness", value: "5mm - 100mm" },
      { label: "Grade", value: "IS 2062" },
      { label: "Form", value: "Plates" },
      { label: "Use Case", value: "Fabrication & Frames" },
    ],
    variants: ["MS plate cutting", "Machining blanks", "Heavy frame supply"],
    technicalSpecs: [
      { property: "Yield Strength", value: "250 MPa min", method: "Mill test certificate" },
      { property: "Thickness Tolerance", value: "As per order tolerance", method: "Measurement check" },
      { property: "Surface Condition", value: "Mill finish", method: "Visual inspection" },
      { property: "Edge Condition", value: "As supplied / cut", method: "Dispatch check" },
      { property: "Documentation", value: "Grade verified", method: "Batch records" },
    ],
    featureCards: [
      { icon: "gauge", title: "Versatile Stock", body: "Plate sizes suited for machining, welding, and general fabrication workflows." },
      { icon: "shield", title: "Dependable Grade", body: "Material supplied with verification aligned to project requirements." },
      { icon: "truck", title: "Dispatch Ready", body: "Organized plate handling and loading for site or shop delivery." },
    ],
    process: ["Requirement review", "Plate allocation", "Cutting if required", "Dispatch and delivery"],
    recommendations: [productRecommendations.hrPlates, productRecommendations.crCoils, productRecommendations.coated],
  },
};

export function getProduct(slug: string): ProductDetail | undefined {
  return products[slug];
}

export const productSlugs = Object.keys(products);
