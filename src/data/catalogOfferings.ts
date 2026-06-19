import type { CatalogOffering } from "@/data/catalogTypes";

export const PRICE_NOT_MENTIONED = "Not mentioned";
export const ASK_FOR_PRICE = "Ask for Price";

/** Cold Rolled Coils — IndiaMART category */
export const coldRolledCoilOfferings: CatalogOffering[] = [
  {
    id: "cr-sheet-cutting",
    title: "Cr Sheet Cutting",
    price: "₹ 35,000",
    priceUnit: "Tonne",
    minOrderQty: "1",
    minOrderUnit: "Tonne",
    specs: [
      { label: "Thickness", value: "0.90mm – 1.60mm" },
      { label: "Width", value: "3 inch – 12 inch" },
      { label: "Grade", value: "Semi Hard" },
      { label: "Material", value: "Mild Steel" },
      { label: "Usage / Application", value: "Industry" },
      { label: "Surface Finish", value: "Cold rolled" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    highlight:
      "Grade: Coil leader end / Semi Hard Material · Thickness: 0.30 to 4mm · Size: 1.5ft and above · Payment Against Delivery · Minimum Quantity 10 MT",
  },
  {
    id: "cr-semi-hard-material-tonne",
    title: "CR Semi Hard Material",
    price: "₹ 45,000",
    priceUnit: "Tonne",
    minOrderQty: "10",
    minOrderUnit: "Tonne",
    specs: [
      { label: "Thickness", value: "0.5mm (16, 18, 20, 22 gauge)" },
      { label: "Material", value: "Mild Steel" },
      { label: "Brand", value: "JSW" },
      { label: "Surface Treatment", value: "Coated" },
      { label: "Length", value: "8/4, 8/3, 6/4, and random sizes (7 to 10 / 4, 3)" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    highlight:
      "We deal in CR Coilend Material such as Semi Hard, CR Cutting in any size and more. Thickness: 16, 18, 20, 22 gauge.",
  },
  {
    id: "cr-cutting-sheet-030-060",
    title: "Cr Cutting Sheet (0.30 to 0.60)",
    price: "₹ 35",
    priceUnit: "Kg",
    priceNote: "Bulk: ₹ 45,500 + GST EX Indore",
    minOrderQty: "30",
    minOrderUnit: "Kg",
    specs: [
      { label: "Thickness", value: "0.5 mm (mostly 0.30 to 0.60)" },
      { label: "Width", value: "1000 mm" },
      { label: "Material", value: "Mild Steel" },
      { label: "Make", value: "National Lot / JSW" },
      { label: "Size", value: "3 ft to 8 ft" },
      { label: "Usage / Application", value: "Industry" },
      { label: "Surface Finish", value: "Cold rolled" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    highlight:
      "NRK offer CR Cutting · Make: National Lot / JSW · 0.30 & above · Qty ~70 MT · Rate ₹ 45,500 + GST EX Indore",
  },
];

/** CR Sheets — IndiaMART category */
export const crSheetsOfferings: CatalogOffering[] = [
  {
    id: "cr-annealed-sheets",
    title: "CR Annealed Sheets",
    price: "₹ 47",
    priceUnit: "Kg",
    minOrderQty: "5000",
    minOrderUnit: "Kg",
    specs: [
      { label: "Thickness", value: "0.30 to 5 mm" },
      { label: "Usage / Application", value: "Industrial" },
      { label: "Capacity", value: "35 Tonne" },
      { label: "Grade", value: "Semi Hard" },
      { label: "Length", value: "2500 mm" },
      { label: "Surface Treatment", value: "Cold Rolled" },
      { label: "Material", value: "Steel" },
      { label: "Shape", value: "Rectangular" },
    ],
    highlight:
      "Make: SAIL, Jindal, AMNS, TATA, Posco, Bhushan Power, JSW, TATA BSL · Thickness: 0.25mm to 1.6mm · Size: 900 / 1250 / 1500 x 2500 / CTL · Payment Against Delivery · Minimum Quantity 10 MT",
  },
  {
    id: "cr-semi-hard-sheet-kg",
    title: "CR Semi Hard Sheet",
    price: "₹ 45",
    priceUnit: "Kg",
    minOrderQty: "5000",
    minOrderUnit: "Kg",
    specs: [
      { label: "Thickness", value: "0.30mm to 5.00mm" },
      { label: "Width", value: "1000mm – 1550mm" },
      { label: "Grade", value: "Semi Hard" },
      { label: "Material", value: "Mild Steel" },
      { label: "Surface Finish", value: "Cold rolled" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    highlight:
      "NRK Iron and Steels LLP — leading suppliers of iron and steel products in Madhya Pradesh. All national and imported brands available.",
  },
  {
    id: "cr-sheets-semi-hard",
    title: "CR Sheets Semi Hard",
    price: "₹ 45",
    priceUnit: "Kg",
    minOrderQty: "5",
    minOrderUnit: "Kg",
    specs: [
      { label: "Thickness", value: "0.25 mm" },
      { label: "Width", value: "600 mm" },
      { label: "Material", value: "Mild Steel" },
      { label: "Surface Finish", value: "Cold rolled" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    highlight:
      "Coil-end secondary material CR semi hard — random sizes: 2.40–2.60m, 2.70–3.10m, 3.20–3.50m width · 4×4, 3×3 length (7–10 ft) · 8×4 in various thickness bands including 0.30–0.60mm",
  },
];

/** HR Sheet — IndiaMART category */
export const hrSheetOfferings: CatalogOffering[] = [
  {
    id: "hot-rolled-sheet-plate",
    title: "Hot Rolled Sheet Plate",
    price: "₹ 55",
    priceUnit: "Kg",
    minOrderQty: "5000",
    minOrderUnit: "Kg",
    specs: [
      { label: "Thickness", value: "15 mm" },
      { label: "Material", value: "Mild Steel" },
      { label: "Material Grade", value: "SS 314" },
      { label: "Surface Treatment", value: "Galvanized" },
      { label: "Usage / Application", value: "Flooring" },
      { label: "Type", value: "Sheet Plate" },
      { label: "Color", value: "Silver" },
    ],
    highlight:
      "HR sheets and coils available in all makes and sizes. Make: SAIL, Jindal, AMNS, TATA, Bhushan · Grade: 1079 / 2062 · Thickness: 1.5mm to 25mm · Size: 1250 / 1500 x 2500 / 5000 / 6300",
  },
  {
    id: "iron-shutter-side-channel",
    title: "Iron Shutter Side Channel",
    price: "₹ 56",
    priceUnit: "Tonne",
    minOrderQty: "25",
    minOrderUnit: "Tonne",
    specs: [
      { label: "Thickness", value: "0.8 mm" },
      { label: "Brand", value: "Jindal" },
      { label: "Usage / Application", value: "Shutter channel" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    highlight:
      "We deal in HR sheets and coils including special grades 2062, 1079 and more. Also available as shutter channel sections.",
  },
];

/** Centering Plate — IndiaMART category */
export const centeringPlateOfferings: CatalogOffering[] = [
  {
    id: "centering-sheets",
    title: "Centering Sheets",
    price: "₹ 66",
    priceUnit: "Kg",
    minOrderQty: "100",
    minOrderUnit: "Kg",
    specs: [
      { label: "Material", value: "CR" },
      { label: "Color", value: "Black" },
      { label: "Size", value: "3 x 2 ft" },
      { label: "Weight", value: "11–12 Kg" },
      { label: "Usage / Application", value: "Construction and Building Material" },
    ],
    highlight:
      "NRK / In-House Make · Grade: CR Secondary Material · Size: 1 / 1.5 / 2 ft x 3 ft · Weight: 10 Kg to 13 Kg · Wholesalers and manufacturers of centring plates.",
  },
  {
    id: "centering-sheets-manufacturer",
    title: "Centering Sheets Manufacturer",
    price: ASK_FOR_PRICE,
    specs: [
      { label: "Make", value: "NRK / In-House" },
      { label: "Material", value: "CR Secondary" },
      { label: "Usage / Application", value: "Construction shuttering" },
      { label: "Supply", value: "Indore & pan-India" },
    ],
    highlight:
      "NRK Iron and Steels LLP — one of the fastest growing iron and steel trading companies in Central India.",
  },
  {
    id: "mild-steel-shuttering-plate",
    title: "Mild Steel Shuttering Plate",
    price: ASK_FOR_PRICE,
    specs: [
      { label: "Plate Thickness", value: "As per requirement" },
      { label: "Plate Size", value: "As per requirement" },
      { label: "Sheet Grade", value: "CR Sheet" },
      { label: "Sheet Material", value: "Mild Steel" },
      { label: "Welding Type", value: "MIG Welded" },
    ],
    highlight: "Custom shuttering plates manufactured and supplied from NRK Indore facility.",
  },
  {
    id: "mild-steel-centering-plate",
    title: "Mild Steel Centering Plate",
    price: ASK_FOR_PRICE,
    specs: [
      { label: "Material", value: "Mild Steel / CR Secondary" },
      { label: "Usage / Application", value: "Construction centering" },
      { label: "Make", value: "NRK / In-House" },
      { label: "Supply", value: "Timely delivery across MP" },
    ],
    highlight: "Complete range of centering and shuttering plates with effective and timely delivery.",
  },
  {
    id: "shuttering-plates",
    title: "Shuttering Plates",
    price: "₹ 62",
    priceUnit: "Kg",
    specs: [
      { label: "Plate Thickness", value: "5 mm" },
      { label: "Plate Size", value: "900 x 600 mm" },
      { label: "Sheet Material", value: "Mild Steel" },
      { label: "Face Type", value: "Plain" },
      { label: "Surface Finish", value: "Painted" },
      { label: "Edge Type", value: "Angle Frame" },
      { label: "Usage", value: "Slab" },
    ],
    highlight: "Listed under IndiaMART New Items — construction-grade shuttering plates from NRK Indore.",
  },
];

/** Hot Rolled Sheets — IndiaMART (CR Pickled + MS Shuttering) */
export const hotRolledSheetsOfferings: CatalogOffering[] = [
  {
    id: "cr-pickeled-sheet",
    title: "CR Pickeled Sheet",
    price: "₹ 45",
    priceUnit: "Kg",
    minOrderQty: "5000",
    minOrderUnit: "Kg",
    specs: [
      { label: "Thickness", value: "1.8 to 4mm and above" },
      { label: "Material", value: "Mild Steel" },
      { label: "Brand", value: "JSW, TATA, AMNS" },
      { label: "Surface Treatment", value: "Galvanized" },
      { label: "Type", value: "Steel Plate" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    highlight:
      "Coil-end material — Pickled · 1.80–2.10m · 2.15–2.35m · 2.40–2.60m · 2.70–3.10m · Width: 3¼ / 4¼ random · Length: 7 to 11 ft",
  },
  {
    id: "ms-shuttering-plate-hr",
    title: "Ms Shuttering Plate",
    price: ASK_FOR_PRICE,
    specs: [
      { label: "Material", value: "Mild Steel" },
      { label: "Plate Weight", value: "15 kg" },
      { label: "Surface Type", value: "CR plain" },
      { label: "Thickness", value: "1mm to 1.5mm" },
    ],
    highlight: "MS shuttering plates for construction — contact NRK for latest pricing and sizes.",
  },
];

/** Roofing Sheet — IndiaMART */
export const roofingSheetOfferings: CatalogOffering[] = [
  {
    id: "iron-sheet-suppliers",
    title: "Iron Sheet Suppliers",
    price: "₹ 35,000",
    priceUnit: "Tonne",
    minOrderQty: "25",
    minOrderUnit: "Tonne",
    specs: [
      { label: "Thickness", value: "0.8 mm" },
      { label: "Usage / Application", value: "Industrial usages" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    highlight:
      "NRK Iron and Steels LLP — complete range of iron and steel roofing and cladding products across Central India.",
  },
];

/** Galvanized Plain Coils — CR Coilend Material */
export const galvanizedPlainCoilOfferings: CatalogOffering[] = [
  {
    id: "cr-coilend-material",
    title: "CR Coilend Material",
    price: "₹ 45",
    priceUnit: "Kg",
    minOrderQty: "30",
    minOrderUnit: "Kg",
    specs: [
      { label: "Thickness", value: "0.90 and above" },
      { label: "Material", value: "CR Coil End" },
      { label: "Type", value: "Plain Coil" },
      { label: "Usage / Application", value: "Construction" },
      { label: "Technique", value: "Hot Dipped" },
      { label: "Color", value: "Silver" },
      { label: "Packaging Type", value: "Coil" },
      { label: "Pattern", value: "Plain" },
    ],
    highlight:
      "We deal in CR Coilend Materials such as Semi-Hard, CR Pickled, CR Cutting and more.",
  },
];

/** Rolling Shutter — Shutter Channel */
export const rollingShutterOfferings: CatalogOffering[] = [
  {
    id: "shutter-channel-supplier",
    title: "Shutter Channel Supplier",
    price: "₹ 56",
    priceUnit: "Kg",
    minOrderQty: "5000",
    minOrderUnit: "Kg",
    specs: [
      { label: "Material", value: "Mild Steel" },
      { label: "Dimension / Size", value: "3 to 4 mm, 7 to 10 feet" },
      { label: "Usage / Application", value: "Shutter Channel" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    highlight: "Shutter channel — Thickness: 3 to 4 mm · Length: 7 to 11 ft",
  },
];

/** Cold Rolled Steel Sheets — Pickled Cutting */
export const pickledCuttingOfferings: CatalogOffering[] = [
  {
    id: "pickled-sheet-cutting",
    title: "Pickled Sheet Cutting",
    price: "₹ 41",
    priceUnit: "Kg",
    minOrderQty: "25",
    minOrderUnit: "Kg",
    specs: [
      { label: "Thickness", value: "2 mm" },
      { label: "Material", value: "Mild Steel" },
      { label: "Packaging Type", value: "Patti Packing" },
      { label: "Surface Treatment", value: "Cold Rolled" },
      { label: "Length", value: "7 to 11 feet" },
      { label: "Size", value: "4 feet" },
    ],
    highlight: "Pickled sheet cutting from NRK Indore — secondary coil-end material in cut sizes.",
  },
  {
    id: "cr-coiled-pickled-cutting-secondary",
    title: "CR Coiled Material Pickled Cutting (Secondary)",
    price: "₹ 41",
    priceUnit: "Kg",
    minOrderQty: "5000",
    minOrderUnit: "Kg",
    specs: [
      { label: "Thickness", value: "0.5mm (1.80 to 4.5mm range)" },
      { label: "Material", value: "Steel" },
      { label: "Brand", value: "JSW, AMNS, National, TATA" },
      { label: "Size", value: "6 inch above to 4 ft" },
      { label: "Surface Treatment", value: "Coated" },
      { label: "Grade", value: "Coil leader end / Soft Material" },
    ],
    highlight:
      "Grade: Coil Leader end / Soft Material · Thickness: 1.80 to 4.5mm · Payment Against Delivery · Minimum Quantity 10 MT",
  },
];

/** Stainless Steel Bhatti — CRFH BHATTI */
export const crfhBhattiOfferings: CatalogOffering[] = [
  {
    id: "crfh-bhatti",
    title: "CRFH BHATTI",
    price: "₹ 51",
    priceUnit: "Kg",
    specs: [
      { label: "Thickness", value: "0.5 mm (1.70–1.80 mm & 2.30–2.40 mm)" },
      { label: "Width", value: "1000 mm" },
      { label: "Material", value: "Mild Steel" },
      { label: "Power Source", value: "Corded Electricity" },
      { label: "Item Weight", value: "30–34 kg and 37–40 kg per sheet" },
      { label: "Surface Finish", value: "Cold rolled" },
      { label: "Size / Dimension", value: "910 x 2500 mm" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    highlight:
      "CRFH BHATTI Material · Thickness: 1.70 to 1.80 mm & 2.30 to 2.40 mm · Size: 910 x 2500 · Payment Against Delivery · Minimum Quantity 10 MT",
  },
];

/** New Items — IndiaMART */
export const newItemsOfferings: CatalogOffering[] = [
  {
    id: "secondary-ms-sheet",
    title: "Secondary MS Sheet",
    price: "₹ 45",
    priceUnit: "Kg",
    specs: [
      { label: "Thickness", value: "8 mm" },
      { label: "Type", value: "Cold Rolled (CR)" },
      { label: "Grade", value: "Commercial (CQ)" },
      { label: "Width", value: "1220 mm (4 ft)" },
      { label: "Length", value: "2500 mm" },
      { label: "Surface Condition", value: "Plain" },
    ],
    highlight: "Secondary MS sheet supply from NRK Indore — contact for bulk availability.",
  },
  {
    id: "ms-channel-new",
    title: "MS Channel",
    price: "₹ 55",
    priceUnit: "Kg",
    specs: [
      { label: "Material Grade", value: "IS 2062" },
      { label: "Channel Size", value: "50 × 25 mm" },
      { label: "Length", value: "6 m" },
      { label: "Section Type", value: "ISMC" },
      { label: "Surface Finish", value: "Hot Rolled" },
      { label: "Usage", value: "Structural" },
      { label: "Edge Condition", value: "Mill Edge" },
      { label: "Test Certificate", value: "Mill TC" },
    ],
    highlight: "Structural MS channel for framing and shutter applications.",
  },
  {
    id: "crc-steel-sheet",
    title: "CRC Steel Sheet",
    price: ASK_FOR_PRICE,
    specs: [
      { label: "Material", value: "Cold Rolled Close Annealed" },
      { label: "Supply", value: "Prime & secondary grades" },
      { label: "Make", value: "SAIL, Jindal, AMNS, TATA, JSW" },
      { label: "Application", value: "Fabrication & components" },
    ],
    highlight: "Contact NRK for CRC steel sheet pricing, grade, and size availability.",
  },
  {
    id: "crc-metal-scrap",
    title: "CRC Metal Scrap",
    price: ASK_FOR_PRICE,
    specs: [
      { label: "Material", value: "Cold Rolled Scrap" },
      { label: "Form", value: "Scrap / offcuts" },
      { label: "Application", value: "Recycling & remelting" },
      { label: "Supply", value: "Bulk lots from Indore" },
    ],
    highlight: "CRC metal scrap — contact NRK for latest rates and available quantity.",
  },
  {
    id: "crca-scrap",
    title: "CRCA Scrap",
    price: ASK_FOR_PRICE,
    specs: [
      { label: "Material", value: "CRCA Scrap" },
      { label: "Form", value: "Scrap / offcuts" },
      { label: "Application", value: "Recycling & remelting" },
      { label: "Supply", value: "Bulk lots" },
    ],
    highlight: "CRCA scrap material — contact NRK for pricing and dispatch details.",
  },
];

export const crSemiHardSheetsStock: CatalogOffering[] = [
  {
    id: "cr-semi-hard-8x4",
    title: "CR Semi-Hard Sheets (8 x 4 FT)",
    price: "₹ 48,000 - ₹ 49,000",
    priceUnit: "Tonne",
    priceNote: "+ GST Ex Indore",
    specs: [
      { label: "Size", value: "8 x 4 FT" },
      { label: "Material", value: "Coil Leader End - CR Secondary" },
      { label: "Thickness Range", value: "0.30mm to 2.10mm" },
      { label: "Ready Stock", value: "Ex Indore Yard" },
      { label: "Payment Terms", value: "Against Delivery" },
    ],
    highlight: "Thickness-wise rates:\n• 1.80 to 2.10 mm : ₹ 48,000 / Tonne\n• 1.40 to 1.60 mm : ₹ 49,000 / Tonne\n• 1.10 to 1.30 mm : ₹ 49,000 / Tonne\n• 0.90 to 1.00 mm : ₹ 49,000 / Tonne\n• 0.70 to 0.85 mm : ₹ 48,000 / Tonne\n• 0.55 to 0.65 mm : ₹ 49,000 / Tonne\n• 0.30 to 0.50 mm : ₹ 49,000 / Tonne"
  },
  {
    id: "cr-semi-hard-8x3",
    title: "CR Semi-Hard Sheets (8x3 / 3! / 3!! FT)",
    price: "₹ 49,000",
    priceUnit: "Tonne",
    priceNote: "+ GST Ex Indore",
    specs: [
      { label: "Size", value: "8x3 / 3! / 3!! FT" },
      { label: "Material", value: "Coil Leader End - CR Secondary" },
      { label: "Thickness Range", value: "0.70mm to 1.60mm" },
      { label: "Ready Stock", value: "Ex Indore Yard" },
      { label: "Payment Terms", value: "Against Delivery" },
    ],
    highlight: "Rate: ₹ 49,000 / Tonne. Arising stock: please check availability before booking."
  },
  {
    id: "cr-semi-hard-random",
    title: "CR Semi-Hard Sheets (7-10FT x 3! x 4 x 4! FT Random)",
    price: "₹ 46,000",
    priceUnit: "Tonne",
    priceNote: "+ GST Ex Indore",
    specs: [
      { label: "Size", value: "7 to 10FT x 3! x 4 x 4! FT" },
      { label: "Material", value: "Semi Hard Random Coil End" },
      { label: "Thickness Range", value: "2.15mm to 4.50mm" },
      { label: "Ready Stock", value: "Ex Indore Yard" },
      { label: "Payment Terms", value: "Against Delivery" },
    ],
    highlight: "Thickness-wise rates:\n• 2.15 to 2.35 mm : ₹ 46,000 / Tonne\n• 2.40 to 2.60 mm : ₹ 46,000 / Tonne\n• 2.70 to 3.10 mm : ₹ 46,000 / Tonne\n• 3.20 to 3.50 mm : ₹ 46,000 / Tonne\n• 3.80 to 4.29 mm : ₹ 46,000 / Tonne\n• 4.20 to 4.50 mm : ₹ 46,000 / Tonne"
  }
];

export const crPickledSheetsStock: CatalogOffering[] = [
  {
    id: "cr-pickled-sheets-random",
    title: "CR Pickled Sheets (7-11FT x 3! x 4 x 4! FT Random)",
    price: "₹ 47,000 - ₹ 48,000",
    priceUnit: "Tonne",
    priceNote: "+ GST Ex Indore",
    specs: [
      { label: "Size", value: "7 to 11FT x 3! x 4 x 4! FT" },
      { label: "Material", value: "CR - Pickled Sheets Random" },
      { label: "Thickness Range", value: "1.80mm to 4.50mm" },
      { label: "Ready Stock", value: "Ex Indore Yard" },
      { label: "Payment Terms", value: "Against Delivery" },
    ],
    highlight: "Thickness-wise rates:\n• 1.80 to 2.10 mm : ₹ 48,000 / Tonne\n• 2.15 to 2.35 mm : ₹ 47,000 / Tonne\n• 2.40 to 2.60 mm : ₹ 47,000 / Tonne\n• 2.70 to 3.10 mm : ₹ 47,000 / Tonne\n• 3.20 to 3.50 mm : ₹ 47,000 / Tonne\n• 3.50 to 4.50 mm : ₹ 47,000 / Tonne"
  }
];

export const crSemiHardCuttingStock: CatalogOffering[] = [
  {
    id: "cr-semi-hard-cutting-stock",
    title: "CR Semi-Hard Cutting",
    price: "₹ 40,000 - ₹ 45,000",
    priceUnit: "Tonne",
    priceNote: "+ GST Ex Indore",
    specs: [
      { label: "Size", value: "1.5ft to 5ft x 4 / 4! FT" },
      { label: "Material", value: "CR Semi-Hard Cutting Secondary" },
      { label: "Thickness Range", value: "0.30mm to 4.00mm" },
      { label: "Ready Stock", value: "Ex Indore Yard" },
      { label: "Payment Terms", value: "Against Delivery" },
    ],
    highlight: "Thickness-wise rates:\n• 0.30 to 0.60 mm : ₹ 40,000 / Tonne\n• 1.80 to 4.00 mm : ₹ 45,000 / Tonne"
  }
];

export const crPickledCuttingStock: CatalogOffering[] = [
  {
    id: "cr-pickled-cutting-stock",
    title: "CR Pickled Cutting",
    price: "₹ 45,000",
    priceUnit: "Tonne",
    priceNote: "+ GST Ex Indore",
    specs: [
      { label: "Size", value: "1.5ft to 5ft x 4 / 4! FT" },
      { label: "Material", value: "CR Pickled Cutting Secondary" },
      { label: "Thickness Range", value: "1.80mm to 4.00mm" },
      { label: "Ready Stock", value: "Ex Indore Yard" },
      { label: "Payment Terms", value: "Against Delivery" },
    ],
    highlight: "Rate: ₹ 45,000 / Tonne. Arising stock: please check availability before booking."
  }
];

/** Generic single-line offering when only category-level specs are known */
export function offeringWithUnknownPrice(
  title: string,
  specs: Array<{ label: string; value: string }>,
  highlight?: string,
): CatalogOffering {
  return {
    id: title.toLowerCase().replace(/\s+/g, "-"),
    title,
    price: PRICE_NOT_MENTIONED,
    specs,
    highlight,
  };
}
