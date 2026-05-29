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

export type CatalogCardMeta = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  kind: "service" | "product";
  section: "processing" | "fabrication" | "prime" | "secondary";
};
