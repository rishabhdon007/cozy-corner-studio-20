export type ProductRecommendation = {
  slug: string;
  title: string;
  type: string;
  image: string;
  note: string;
};

export type CatalogOffering = {
  id: string;
  title: string;
  /** e.g. "₹ 35,000" — use "Not mentioned" when unknown */
  price: string;
  /** e.g. "Tonne", "Kg" */
  priceUnit?: string;
  /** e.g. "+ GST EX Indore" */
  priceNote?: string;
  minOrderQty?: string;
  minOrderUnit?: string;
  specs: Array<{ label: string; value: string }>;
  /** Optional footer note (IndiaMART-style offer line) */
  highlight?: string;
};

export type ProductThicknessVariant = {
  id: string;
  /** Display label, e.g. "1.80 to 2.10 mm" */
  label: string;
  /** Thickness range for specs and WhatsApp, e.g. "1.80 to 2.10" */
  thickness: string;
  /** Web-friendly image paths (jpg/png) for this thickness band */
  images: string[];
  /** Optional per-thickness detail lines shown in the sidebar */
  details?: string[];
  specs?: Array<{ label: string; value: string }>;
};

export type CatalogCardMeta = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  kind: "service" | "product";
  section: "processing" | "fabrication" | "prime" | "secondary";
};
