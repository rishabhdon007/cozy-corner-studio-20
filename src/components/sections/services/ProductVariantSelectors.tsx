"use client";

import type { ProductVariantCatalog } from "@/data/catalogTypes";
import {
  findSizeBand,
  findThicknessBand,
  shouldShowSizeSelector,
} from "@/lib/productVariants";

import { ProductBandSelector } from "./ProductBandSelector";

type ProductVariantSelectorsProps = {
  catalog: ProductVariantCatalog;
  selectedSizeId: string;
  selectedThicknessId: string;
  onSizeSelect: (id: string) => void;
  onThicknessSelect: (id: string) => void;
  className?: string;
};

export function ProductVariantSelectors({
  catalog,
  selectedSizeId,
  selectedThicknessId,
  onSizeSelect,
  onThicknessSelect,
  className,
}: ProductVariantSelectorsProps) {
  const activeSize = findSizeBand(catalog, selectedSizeId);
  const thicknessOptions = activeSize?.thicknessBands ?? [];
  const showSize = shouldShowSizeSelector(catalog);

  return (
    <div className={className}>
      {showSize ? (
        <ProductBandSelector
          level="size"
          options={catalog.sizeBands.map((band) => ({
            id: band.id,
            label: band.label,
          }))}
          selectedId={activeSize?.id ?? selectedSizeId}
          onSelect={onSizeSelect}
          className="mb-4"
        />
      ) : null}
      {thicknessOptions.length > 0 ? (
        <ProductBandSelector
          level="thickness"
          options={thicknessOptions.map((band) => ({
            id: band.id,
            label: band.label,
          }))}
          selectedId={
            findThicknessBand(activeSize, selectedThicknessId)?.id ?? thicknessOptions[0]?.id ?? ""
          }
          onSelect={onThicknessSelect}
        />
      ) : null}
    </div>
  );
}
