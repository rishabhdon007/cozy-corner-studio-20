
import { productRecommendations, type ProductRecommendation } from "@/data/products";

export type ServiceDetail = {
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

const relatedProducts = productRecommendations;

const services: Record<string, ServiceDetail> = {
  slitting: {
    slug: "slitting",
    title: "Slitting",
    category: "Steel Processing",
    eyebrow: "High-Speed Service",
    badge: "Industrial Grade: Burr-Free Slit Coils",
    summary: "Precision coil slitting for accurate widths, clean edges, and consistent output across production batches.",
    description:
      "Our slitting lines convert master coils into narrow-width slit coils with controlled edge quality and tight width tolerance. The service supports HR, CR, galvanized, coated, and mild steel material for fabrication, component manufacturing, and repeat industrial supply.",
    mainImage:
      "https://lh3.googleusercontent.com/aida/ADBb0ujHU7ebzYPuh3XqZZW0eS1FVKhRs9JQaSaYMYTQXj9POv1Gn2riWzjjzZ4voyRPwg3X4cUGxIinOkwU3IwHsS6m3Z2W93W5qrdXRw56QCyJPY41arGtOn0FdZr8gIgo4SUyE3hlGX-3d-AqYKTjoi5-9myM4Up2-Tnchin4AeQmZEz0AK355Ei3fcRsdNwGmAlPLnoggbXnKrkjPWJc5HKwfO8N1zoFxpBBxRzr-aDrVCB94XKKNfkZD00",
    processImage:
      "https://lh3.googleusercontent.com/aida/ADBb0ujPEXWWg0iI87xROhYOFi07NvkaakLAKcufgsmsIULakcaTeHZTBoIc_SxWcBJJ_XJXykvO25FlqnSvlL2F2-qayNrL4cFeH77NIYfPrDj7cPcOgWyaoKvxwlrpSEHlZKBjl6X4VE8b3F2mfO97oySF6u5pyG3CEJy3o0ht1wmhFITEbVwKqYEQKEAzVynO-vMzEP2_ED04Cr3uAEBun4G0G363gZ2HgbEP0sHEUcbr6f0mh2B_d0W_Br0",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9ZpmlTi9am7jAl3U69ngMTXiV7YHlzoRweLAmBg3U0RavWxTHJ2b8IPruaQ9-dnjFUwuQL1xNZK3LBkggzBv1l8DtaQdmxOKFUWUOs07kpOxvYHIR2JpYxH0rexpvWJQ6fGejqpa5AiBFrUL7Tye0qUdPKUM06F3Jee_vttkYUqoFFByAHosY8tUmo5j5CPpTt_T5F_XPrQgnxvPP_AJEwx_FY5STNvE5dvPOsAnCOV8AB-RmL7qlceqMvm3HoBGYRxvu7pIfys",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB0V8AkOvGcfFYxE2ed-7p9yTbfHgwusGX0YJPJiWlQ6LtK8_fMgtMpIWkh5LBeQRsFE3TPoKv2DeP-jBKRXCuBj20dsQggHyp7lEK9P-DmAiVRv8C0fFhkI3ifeUcWszFt38r-adOR2x86Jnmvtl25Uu61Fdfyogckz2ub6Kr0ahiUCWppxsiiG2XinepiY7a560BYqW4Blpzr1SoHiAUIq7Nst3WySQUQBIJI-JaCBcURjJgPGnXBId3w0dc-528UA64lZDbGjU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRKVZ7OTc54HY7px_IqK8IxBw7DBGJMM5ThTrK647yBQMXSlaSxNsdaLQctQu-8gJbNDTB0YHO3eYOhF8ur_gsbIu1Y4d6zHOG9OcLj2fmcy7gyNJRIolPBBdl-m7shRcFHnxlPXIS0KdCuk_fxOLQYQ-9NnNlpBTWbdin817CizhsNzZhbJScA9I99Me2FtiMWFKVQU3EDHQWiJzxUNaPUrmqK6RSwHfYT3yGcnNT1xTsR1CftjNgOTAkcEs5MMSgN-hKI5nOtWE",
    ],
    specs: [
      { label: "Width Range", value: "Custom Coil Widths" },
      { label: "Edge Finish", value: "Clean / Burr-Controlled" },
      { label: "Material", value: "HR, CR, GI, MS" },
      { label: "Use Case", value: "Fabrication & Components" },
    ],
    variants: ["Narrow slit coils", "CRCA slit coils", "Coated steel slitting"],
    technicalSpecs: [
      { property: "Width Accuracy", value: "As per order tolerance", method: "Inline width check" },
      { property: "Edge Condition", value: "Burr-controlled slit edge", method: "Visual inspection" },
      { property: "Coil Handling", value: "Protected loading and unloading", method: "Material handling SOP" },
      { property: "Batch Traceability", value: "Grade and size verified", method: "Dispatch documentation" },
      { property: "Surface Care", value: "Reduced handling marks", method: "Process inspection" },
    ],
    featureCards: [
      { icon: "gauge", title: "Tight Width Control", body: "Setups are matched to required output widths for repeatable coil supply." },
      { icon: "shield", title: "Edge Quality Checks", body: "Each batch is reviewed for slit condition, surface marks, and coil packing quality." },
      { icon: "truck", title: "Ready Dispatch", body: "Processed coils can move directly into dispatch for planned production schedules." },
    ],
    process: ["Master coil loading", "Blade setup and width calibration", "High-speed slitting run", "Recoiling, inspection, and dispatch"],
    recommendations: [relatedProducts.crCoils, relatedProducts.coated, relatedProducts.hrPlates],
  },
  "cut-to-length": {
    slug: "cut-to-length",
    title: "Cut to Length",
    category: "Sheet Processing",
    eyebrow: "Precision Service",
    badge: "Industrial Grade: Custom Length Sheets",
    summary: "Coil-to-sheet cutting for accurate sizes, flatness control, and reduced material wastage.",
    description:
      "Our cut-to-length service converts coils into sheets according to project and production requirements. It is suited for CR, HR, coated, and mild steel material where predictable length, clean stacking, and dispatch-ready packaging matter.",
    mainImage:
      "https://lh3.googleusercontent.com/aida/ADBb0uivdi1gtq1TGu910WV5iy4kr7Vpsh3NqNR6Xt_aBSacWZlPipe-q8DQ3I-LVLuyrkVFlH_dmkAd6u7YAJz-J0O1aqQExJ6SE-3lhHW6a4T-9wVrgXfGBnxKqZM5dHHJ2CSHJsgMkbikHnO2yoVSAtVOv-CpEpoiLudhVzGEmGR0spg0QfCRa5pLZV5WO9vF6f19Udr5ZMb3pkrpK20Xe_RH2jqs2VA8A65TJHkXzU5Um0WyIU9k2n9uFH4",
    processImage:
      "https://lh3.googleusercontent.com/aida/ADBb0ujNeJfj5wjuiu3qa5PPpnbdTCPvKNZ6N2yri4I15sFCyU37e27ZxTaBi-X_HrEEoMrBQ_Y87Eky8g_cWUxRDlugbnlELvSyUYarJSXBSVn3wUXaFOlujrxI8ykr_gOeXzy-9wgeAJ9fdfdpExYYPQ4PuLncFTJa42kasKT_q9zpCwhLgzElMiOrDPJ6PkodKV-52kPNF3ODoLhOUdTcw0k9CTEY048brLSdv86qeEhwYXr-VqT5vRXSubc",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRKVZ7OTc54HY7px_IqK8IxBw7DBGJMM5ThTrK647yBQMXSlaSxNsdaLQctQu-8gJbNDTB0YHO3eYOhF8ur_gsbIu1Y4d6zHOG9OcLj2fmcy7gyNJRIolPBBdl-m7shRcFHnxlPXIS0KdCuk_fxOLQYQ-9NnNlpBTWbdin817CizhsNzZhbJScA9I99Me2FtiMWFKVQU3EDHQWiJzxUNaPUrmqK6RSwHfYT3yGcnNT1xTsR1CftjNgOTAkcEs5MMSgN-hKI5nOtWE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCu_AF4dpTBmmHegSorKBsEdCUm3I3JfVSx-XDp7nW5n2ACrXY9J0CwN8jLoATp9dx0caHq31eUOSVbKeaHMKJzjupwoBrIK4jxfcIsnTr8TBQxD-0C98JSDHjG-OdTpegwo_gsOy2i-sOqIkEyz6x-hSP1L-xFv5WSgkSEd1eEuYryj9gEMid7FVJuc8NxOzfqCsFI9ZsUBqJC3_YM-jOg7zVDEf7NY08107lVgXiQ56XFQE-7ka9R9lxfEI9Tx4mH7_kGlulQTAc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB0V8AkOvGcfFYxE2ed-7p9yTbfHgwusGX0YJPJiWlQ6LtK8_fMgtMpIWkh5LBeQRsFE3TPoKv2DeP-jBKRXCuBj20dsQggHyp7lEK9P-DmAiVRv8C0fFhkI3ifeUcWszFt38r-adOR2x86Jnmvtl25Uu61Fdfyogckz2ub6Kr0ahiUCWppxsiiG2XinepiY7a560BYqW4Blpzr1SoHiAUIq7Nst3WySQUQBIJI-JaCBcURjJgPGnXBId3w0dc-528UA64lZDbGjU",
    ],
    specs: [
      { label: "Length", value: "Up to 10000mm" },
      { label: "Output", value: "Sheets / Blanks" },
      { label: "Material", value: "HR, CR, Coated" },
      { label: "Packing", value: "Stacked & Bundled" },
    ],
    variants: ["CR sheet cutting", "HR sheet cutting", "Coated sheet blanks"],
    technicalSpecs: [
      { property: "Length Accuracy", value: "Project-specific tolerance", method: "Measuring inspection" },
      { property: "Sheet Flatness", value: "Controlled through leveling", method: "Visual and surface check" },
      { property: "Stacking", value: "Aligned bundles", method: "Dispatch readiness check" },
      { property: "Surface Protection", value: "Handled for low marking", method: "Material handling SOP" },
      { property: "Grade Verification", value: "As per purchase order", method: "Batch documentation" },
    ],
    featureCards: [
      { icon: "gauge", title: "Accurate Lengths", body: "Sheet output is cut to suit fabrication and production drawings." },
      { icon: "shield", title: "Reduced Wastage", body: "Custom sizing helps minimize offcuts at the customer end." },
      { icon: "truck", title: "Clean Bundling", body: "Sheets are stacked and bundled for easier receiving and handling." },
    ],
    process: ["Coil loading and leveling", "Length setup", "Cutting and stacking", "Bundle inspection and loading"],
    recommendations: [relatedProducts.crCoils, relatedProducts.msPlates, relatedProducts.coated],
  },
  annealing: {
    slug: "annealing",
    title: "Annealing Processing",
    category: "Heat Treatment",
    eyebrow: "Heat Treatment Service",
    badge: "Industrial Grade: Softer Formable Steel",
    summary: "Annealing support for improved ductility, softness, and workability in forming applications.",
    description:
      "Annealing processing helps tune steel properties for downstream forming, bending, drawing, and component manufacturing. The service is built for requirements where material softness and controlled mechanical behavior are central to performance.",
    mainImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDu8Ky62X-5F853bdedSvtzNaVQ1B9jp5Izn0_BQJN75iCU9SwQBLaVyRCGy7DIfEg43klsgnRSYpuaJdPJ5UwEIZeb6cif4ohXJrtD7t7ZQt-a_h1YK2wUwMlBeZ2gZexI_bRO06LT45aiHPwTgxW7e1GO4y67nsVuJSyVnEEvSsCONefQg6DrNLLT5yjCNt2PT4XjX3fOh_or_sd-e5RuY9XU9nmu62ib5ThCrE8KeJRM3ciNoA3EwT1C6XKVcl2k_PfmkKz6OvA",
    processImage:
      "https://lh3.googleusercontent.com/aida/ADBb0ujPEXWWg0iI87xROhYOFi07NvkaakLAKcufgsmsIULakcaTeHZTBoIc_SxWcBJJ_XJXykvO25FlqnSvlL2F2-qayNrL4cFeH77NIYfPrDj7cPcOgWyaoKvxwlrpSEHlZKBjl6X4VE8b3F2mfO97oySF6u5pyG3CEJy3o0ht1wmhFITEbVwKqYEQKEAzVynO-vMzEP2_ED04Cr3uAEBun4G0G363gZ2HgbEP0sHEUcbr6f0mh2B_d0W_Br0",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9ZpmlTi9am7jAl3U69ngMTXiV7YHlzoRweLAmBg3U0RavWxTHJ2b8IPruaQ9-dnjFUwuQL1xNZK3LBkggzBv1l8DtaQdmxOKFUWUOs07kpOxvYHIR2JpYxH0rexpvWJQ6fGejqpa5AiBFrUL7Tye0qUdPKUM06F3Jee_vttkYUqoFFByAHosY8tUmo5j5CPpTt_T5F_XPrQgnxvPP_AJEwx_FY5STNvE5dvPOsAnCOV8AB-RmL7qlceqMvm3HoBGYRxvu7pIfys",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB0V8AkOvGcfFYxE2ed-7p9yTbfHgwusGX0YJPJiWlQ6LtK8_fMgtMpIWkh5LBeQRsFE3TPoKv2DeP-jBKRXCuBj20dsQggHyp7lEK9P-DmAiVRv8C0fFhkI3ifeUcWszFt38r-adOR2x86Jnmvtl25Uu61Fdfyogckz2ub6Kr0ahiUCWppxsiiG2XinepiY7a560BYqW4Blpzr1SoHiAUIq7Nst3WySQUQBIJI-JaCBcURjJgPGnXBId3w0dc-528UA64lZDbGjU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCu_AF4dpTBmmHegSorKBsEdCUm3I3JfVSx-XDp7nW5n2ACrXY9J0CwN8jLoATp9dx0caHq31eUOSVbKeaHMKJzjupwoBrIK4jxfcIsnTr8TBQxD-0C98JSDHjG-OdTpegwo_gsOy2i-sOqIkEyz6x-hSP1L-xFv5WSgkSEd1eEuYryj9gEMid7FVJuc8NxOzfqCsFI9ZsUBqJC3_YM-jOg7zVDEf7NY08107lVgXiQ56XFQE-7ka9R9lxfEI9Tx4mH7_kGlulQTAc",
    ],
    specs: [
      { label: "Purpose", value: "Softness & Formability" },
      { label: "Treatment", value: "Controlled Heating" },
      { label: "Material", value: "CR / Mild Steel" },
      { label: "Applications", value: "Deep Drawing" },
    ],
    variants: ["Soft CR material", "Forming-grade sheet", "Batch heat treatment"],
    technicalSpecs: [
      { property: "Hardness Control", value: "As per grade requirement", method: "Hardness testing" },
      { property: "Formability", value: "Improved ductility", method: "Material validation" },
      { property: "Batch Cycle", value: "Controlled heat profile", method: "Furnace process log" },
      { property: "Surface Condition", value: "Application suitable finish", method: "Visual inspection" },
      { property: "Grade Traceability", value: "Batch-level records", method: "Dispatch documentation" },
    ],
    featureCards: [
      { icon: "gauge", title: "Controlled Properties", body: "Treatment cycles are planned around the required material behavior." },
      { icon: "shield", title: "Batch Discipline", body: "Material is identified and processed with traceability at batch level." },
      { icon: "truck", title: "Production Support", body: "Annealed material can be supplied with downstream cutting or dispatch." },
    ],
    process: ["Material verification", "Heat cycle planning", "Annealing furnace run", "Cooling, inspection, and release"],
    recommendations: [relatedProducts.crCoils, relatedProducts.msPlates, relatedProducts.hrPlates],
  },
  "hr-cr-ms-plates": {
    slug: "hr-cr-ms-plates",
    title: "HR, CR & MS Plates",
    category: "Prime Materials",
    eyebrow: "Prime Material Supply",
    badge: "Industrial Grade: Verified Steel Inventory",
    summary: "Sourcing and supply of HR, CR, and MS plates from trusted steel manufacturers.",
    description:
      "NRK Iron & Steel maintains dependable access to hot rolled, cold rolled, and mild steel plate inventory for structural, fabrication, and manufacturing demand. Material is checked for grade, size, and order fit before dispatch.",
    mainImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWEdwMeNFxKE61YEA_hposv1SW7wwWs7ZpM87Yvzj4ZW5FuYnfj5N4Dvl4HOD6cXk1oKKj0kzvxZ1s2Zxj5ryEcxpqaHQfhnQd76vZ2VETh5WX4LOiEvMSdOWRcz2l6Yo7-xFXWO4ztf2th7pDtA_FSNFPa5hWS-3itr7dfvd-a79mm8WP7ZbQbw5HVlAS_wQF84OA52bx0QSxFRLqn2p85Y_Q2R60-mBSn7NxEQ3NYfyTbfNTjQ3oLalfM363PxPqeaxhNLTdz6o",
    processImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRKVZ7OTc54HY7px_IqK8IxBw7DBGJMM5ThTrK647yBQMXSlaSxNsdaLQctQu-8gJbNDTB0YHO3eYOhF8ur_gsbIu1Y4d6zHOG9OcLj2fmcy7gyNJRIolPBBdl-m7shRcFHnxlPXIS0KdCuk_fxOLQYQ-9NnNlpBTWbdin817CizhsNzZhbJScA9I99Me2FtiMWFKVQU3EDHQWiJzxUNaPUrmqK6RSwHfYT3yGcnNT1xTsR1CftjNgOTAkcEs5MMSgN-hKI5nOtWE",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCu_AF4dpTBmmHegSorKBsEdCUm3I3JfVSx-XDp7nW5n2ACrXY9J0CwN8jLoATp9dx0caHq31eUOSVbKeaHMKJzjupwoBrIK4jxfcIsnTr8TBQxD-0C98JSDHjG-OdTpegwo_gsOy2i-sOqIkEyz6x-hSP1L-xFv5WSgkSEd1eEuYryj9gEMid7FVJuc8NxOzfqCsFI9ZsUBqJC3_YM-jOg7zVDEf7NY08107lVgXiQ56XFQE-7ka9R9lxfEI9Tx4mH7_kGlulQTAc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9ZpmlTi9am7jAl3U69ngMTXiV7YHlzoRweLAmBg3U0RavWxTHJ2b8IPruaQ9-dnjFUwuQL1xNZK3LBkggzBv1l8DtaQdmxOKFUWUOs07kpOxvYHIR2JpYxH0rexpvWJQ6fGejqpa5AiBFrUL7Tye0qUdPKUM06F3Jee_vttkYUqoFFByAHosY8tUmo5j5CPpTt_T5F_XPrQgnxvPP_AJEwx_FY5STNvE5dvPOsAnCOV8AB-RmL7qlceqMvm3HoBGYRxvu7pIfys",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB0V8AkOvGcfFYxE2ed-7p9yTbfHgwusGX0YJPJiWlQ6LtK8_fMgtMpIWkh5LBeQRsFE3TPoKv2DeP-jBKRXCuBj20dsQggHyp7lEK9P-DmAiVRv8C0fFhkI3ifeUcWszFt38r-adOR2x86Jnmvtl25Uu61Fdfyogckz2ub6Kr0ahiUCWppxsiiG2XinepiY7a560BYqW4Blpzr1SoHiAUIq7Nst3WySQUQBIJI-JaCBcURjJgPGnXBId3w0dc-528UA64lZDbGjU",
    ],
    specs: [
      { label: "Grades", value: "E250 / E350 / CRCA" },
      { label: "Supply", value: "Sheets, Coils, Plates" },
      { label: "Source", value: "Prime Manufacturers" },
      { label: "Use Case", value: "Fabrication" },
    ],
    variants: ["HR sheets", "CRCA sheets", "MS plates"],
    technicalSpecs: [
      { property: "Grade Match", value: "As per customer specification", method: "Material documentation" },
      { property: "Size Verification", value: "Thickness and dimension checked", method: "Receiving inspection" },
      { property: "Inventory Control", value: "Batch-wise identification", method: "Stock records" },
      { property: "Surface Quality", value: "Application-grade finish", method: "Visual inspection" },
      { property: "Dispatch Readiness", value: "Bundled or coil supply", method: "Logistics checklist" },
    ],
    featureCards: [
      { icon: "gauge", title: "Reliable Sizing", body: "Stock is aligned to required thickness, width, and plate format." },
      { icon: "shield", title: "Verified Grades", body: "Material grade and source documentation are checked before supply." },
      { icon: "truck", title: "Flexible Supply", body: "Inventory can move as full coils, sheets, plates, or processed lots." },
    ],
    process: ["Requirement mapping", "Grade and stock selection", "Optional processing", "Bundling and dispatch"],
    recommendations: [relatedProducts.hrPlates, relatedProducts.crCoils, relatedProducts.msPlates],
  },
  "coated-profile-sheets": {
    slug: "coated-profile-sheets",
    title: "Coated & Profile Sheets",
    category: "Corrosion Resistant",
    eyebrow: "Coated Material Supply",
    badge: "Industrial Grade: Protected Sheet Products",
    summary: "Galvanized, galvalume, color-coated, and profile sheet solutions for durable applications.",
    description:
      "Our coated and profile sheet range supports roofing, cladding, industrial panels, and corrosion-resistant fabrication. Material can be supplied in plain, corrugated, coated, or profile formats based on project needs.",
    mainImage: "",
    processImage:
      "https://lh3.googleusercontent.com/aida/ADBb0uivdi1gtq1TGu910WV5iy4kr7Vpsh3NqNR6Xt_aBSacWZlPipe-q8DQ3I-LVLuyrkVFlH_dmkAd6u7YAJz-J0O1aqQExJ6SE-3lhHW6a4T-9wVrgXfGBnxKqZM5dHHJ2CSHJsgMkbikHnO2yoVSAtVOv-CpEpoiLudhVzGEmGR0spg0QfCRa5pLZV5WO9vF6f19Udr5ZMb3pkrpK20Xe_RH2jqs2VA8A65TJHkXzU5Um0WyIU9k2n9uFH4",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB0V8AkOvGcfFYxE2ed-7p9yTbfHgwusGX0YJPJiWlQ6LtK8_fMgtMpIWkh5LBeQRsFE3TPoKv2DeP-jBKRXCuBj20dsQggHyp7lEK9P-DmAiVRv8C0fFhkI3ifeUcWszFt38r-adOR2x86Jnmvtl25Uu61Fdfyogckz2ub6Kr0ahiUCWppxsiiG2XinepiY7a560BYqW4Blpzr1SoHiAUIq7Nst3WySQUQBIJI-JaCBcURjJgPGnXBId3w0dc-528UA64lZDbGjU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9ZpmlTi9am7jAl3U69ngMTXiV7YHlzoRweLAmBg3U0RavWxTHJ2b8IPruaQ9-dnjFUwuQL1xNZK3LBkggzBv1l8DtaQdmxOKFUWUOs07kpOxvYHIR2JpYxH0rexpvWJQ6fGejqpa5AiBFrUL7Tye0qUdPKUM06F3Jee_vttkYUqoFFByAHosY8tUmo5j5CPpTt_T5F_XPrQgnxvPP_AJEwx_FY5STNvE5dvPOsAnCOV8AB-RmL7qlceqMvm3HoBGYRxvu7pIfys",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRKVZ7OTc54HY7px_IqK8IxBw7DBGJMM5ThTrK647yBQMXSlaSxNsdaLQctQu-8gJbNDTB0YHO3eYOhF8ur_gsbIu1Y4d6zHOG9OcLj2fmcy7gyNJRIolPBBdl-m7shRcFHnxlPXIS0KdCuk_fxOLQYQ-9NnNlpBTWbdin817CizhsNzZhbJScA9I99Me2FtiMWFKVQU3EDHQWiJzxUNaPUrmqK6RSwHfYT3yGcnNT1xTsR1CftjNgOTAkcEs5MMSgN-hKI5nOtWE",
    ],
    specs: [
      { label: "Products", value: "GP, GC, GL, Color Coated" },
      { label: "Coating", value: "AZ70 / AZ150 Options" },
      { label: "Formats", value: "Plain / Profile" },
      { label: "Use Case", value: "Roofing & Panels" },
    ],
    variants: ["Galvanized sheets", "Galvalume sheets", "Color coated profile sheets"],
    technicalSpecs: [
      { property: "Coating Type", value: "Zinc / Al-Zn / Color coated", method: "Product documentation" },
      { property: "Profile Options", value: "Project-specific profiles", method: "Order specification" },
      { property: "Surface Finish", value: "Clean visual finish", method: "Visual inspection" },
      { property: "Length Supply", value: "Custom lengths available", method: "Cutting setup check" },
      { property: "Packaging", value: "Protected bundles", method: "Dispatch SOP" },
    ],
    featureCards: [
      { icon: "gauge", title: "Project Fit", body: "Sheet format can be selected for roofing, cladding, and panel work." },
      { icon: "shield", title: "Corrosion Protection", body: "Coated options support longer service life in exposed applications." },
      { icon: "truck", title: "Site-Ready Bundles", body: "Processed sheets are organized for practical handling at site." },
    ],
    process: ["Application review", "Coating and profile selection", "Cutting or profiling", "Packing and dispatch"],
    recommendations: [relatedProducts.coated, relatedProducts.crCoils, relatedProducts.hrPlates],
  },
  "logistics-warehousing": {
    slug: "logistics-warehousing",
    title: "Logistics & Warehousing",
    category: "Supply Chain",
    eyebrow: "Supply Chain Service",
    badge: "Industrial Grade: Managed Steel Movement",
    summary: "Material handling, warehousing, and transport support for dependable steel supply.",
    description:
      "Our logistics and warehousing capabilities help customers receive processed and prime steel material with fewer handoff delays. Crane-assisted handling, organized storage, and planned transport keep orders moving from inventory to site.",
    processVideo: "/assests/banner_video.mp4",
    mainImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6Kc9N6DGv9yY4wvzS_HrS_QTitHzJXYX0Wi0Fb6hqe9bnD6wSqtHxKTJaUcjUtkLbXJVLfWTNthUYbql4EMwPsvy1vzCCQkmBV5JYrI2mppuyh_8rK6BU0vapoOC0tYuqSmtQcDUQcNSNlOELAsCcLMaD_ypL52BJ65h9vjTlZLRzrgrHeqabhO-pfRIfxIME3FRnPgL51eJree-8LFhfbIwkuHEJ-R66ITRigpfSvbzjC5hVal2eDlWHY3shoQLepJ0mcG2II8Q",
    processImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARazNhVD--bIOwm-AShqW_1EPdsYcI12GmMddZ1chwZuZfqLh_o3iK0DgF_yqTWIZvfYjhV7wwoa4vyc9GZsChLLnLNNCFnghKciDxGViYE8d7SLcl10VHmDLWoufMJQI--b19eyCNvPHkvUcln62pL5SEyHRsz5UfoaHSe4N7dfUkUxbc-w3HOjguJqLuuC0hdhxg9yDP3OZK-ASV0w3UBrIcsbYPnWP5QFK0CGngnbdFoMyGdUGlQ_BZ7X23Oaie2xhK5E8en8c",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWEdwMeNFxKE61YEA_hposv1SW7wwWs7ZpM87Yvzj4ZW5FuYnfj5N4Dvl4HOD6cXk1oKKj0kzvxZ1s2Zxj5ryEcxpqaHQfhnQd76vZ2VETh5WX4LOiEvMSdOWRcz2l6Yo7-xFXWO4ztf2th7pDtA_FSNFPa5hWS-3itr7dfvd-a79mm8WP7ZbQbw5HVlAS_wQF84OA52bx0QSxFRLqn2p85Y_Q2R60-mBSn7NxEQ3NYfyTbfNTjQ3oLalfM363PxPqeaxhNLTdz6o",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRKVZ7OTc54HY7px_IqK8IxBw7DBGJMM5ThTrK647yBQMXSlaSxNsdaLQctQu-8gJbNDTB0YHO3eYOhF8ur_gsbIu1Y4d6zHOG9OcLj2fmcy7gyNJRIolPBBdl-m7shRcFHnxlPXIS0KdCuk_fxOLQYQ-9NnNlpBTWbdin817CizhsNzZhbJScA9I99Me2FtiMWFKVQU3EDHQWiJzxUNaPUrmqK6RSwHfYT3yGcnNT1xTsR1CftjNgOTAkcEs5MMSgN-hKI5nOtWE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCu_AF4dpTBmmHegSorKBsEdCUm3I3JfVSx-XDp7nW5n2ACrXY9J0CwN8jLoATp9dx0caHq31eUOSVbKeaHMKJzjupwoBrIK4jxfcIsnTr8TBQxD-0C98JSDHjG-OdTpegwo_gsOy2i-sOqIkEyz6x-hSP1L-xFv5WSgkSEd1eEuYryj9gEMid7FVJuc8NxOzfqCsFI9ZsUBqJC3_YM-jOg7zVDEf7NY08107lVgXiQ56XFQE-7ka9R9lxfEI9Tx4mH7_kGlulQTAc",
    ],
    specs: [
      { label: "Handling", value: "10-30 Ton Cranes" },
      { label: "Transport", value: "10-15 Ton Capacity" },
      { label: "Storage", value: "Dedicated Warehousing" },
      { label: "Service", value: "Door-to-Door" },
    ],
    variants: ["Processed material dispatch", "Warehoused coil supply", "Door-to-door delivery"],
    technicalSpecs: [
      { property: "Crane Handling", value: "Heavy coil and plate movement", method: "Handling SOP" },
      { property: "Storage", value: "Organized material bays", method: "Inventory records" },
      { property: "Dispatch Planning", value: "Route and load coordination", method: "Logistics checklist" },
      { property: "Material Safety", value: "Protected lifting and loading", method: "Operator procedure" },
      { property: "Documentation", value: "Order-wise dispatch records", method: "Delivery note" },
    ],
    featureCards: [
      { icon: "gauge", title: "Planned Movement", body: "Dispatches are coordinated around order readiness and transport capacity." },
      { icon: "shield", title: "Material Care", body: "Crane-assisted movement reduces damage risk during loading." },
      { icon: "truck", title: "Doorstep Supply", body: "Transport support connects warehouse, processing, and customer site." },
    ],
    process: ["Material receiving", "Storage and batch identification", "Load planning", "Dispatch documentation and delivery"],
    recommendations: [relatedProducts.hrPlates, relatedProducts.crCoils, relatedProducts.coated],
  },
};

export const serviceLinks = Object.values(services).map(({ slug, title, eyebrow }) => ({ slug, title, eyebrow }));

export function getService(slug: string): ServiceDetail | undefined {
  return services[slug];
}

export const serviceSlugs = Object.keys(services);
