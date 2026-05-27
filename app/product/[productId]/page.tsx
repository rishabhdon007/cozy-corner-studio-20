import type { Metadata } from "next";

import { ProductDetailPage } from "@/components/sections/services/ServiceDetailPage";
import { getProduct } from "@/data/products";

type PageProps = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = getProduct(productId);
  return {
    title: `${product?.title ?? "Product Details"} | NRK Iron & Steel`,
  };
}

export default async function ProductDetailRoute({ params }: PageProps) {
  const { productId } = await params;
  return <ProductDetailPage productId={productId} />;
}
