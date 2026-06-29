"use client";

import { useCallback, useEffect, useState } from "react";

import type { ProductVariantCatalog } from "@/data/catalogTypes";
import {
  findSizeBand,
  findThicknessBand,
  getDefaultSelection,
} from "@/lib/productVariants";

export function useProductVariantSelection(catalog: ProductVariantCatalog | null, productSlug?: string) {
  const defaults = catalog ? getDefaultSelection(catalog) : { sizeId: "", thicknessId: "" };
  const [selectedSizeId, setSelectedSizeId] = useState(defaults.sizeId);
  const [selectedThicknessId, setSelectedThicknessId] = useState(defaults.thicknessId);

  useEffect(() => {
    if (!catalog) return;
    const next = getDefaultSelection(catalog);
    setSelectedSizeId(next.sizeId);
    setSelectedThicknessId(next.thicknessId);
  }, [catalog, productSlug]);

  const handleSizeSelect = useCallback(
    (sizeId: string) => {
      if (!catalog) return;
      setSelectedSizeId(sizeId);
      const sizeBand = findSizeBand(catalog, sizeId);
      const firstThickness = sizeBand?.thicknessBands[0];
      if (firstThickness) {
        setSelectedThicknessId(firstThickness.id);
      }
    },
    [catalog],
  );

  const activeSize = catalog ? findSizeBand(catalog, selectedSizeId) : undefined;
  const activeThickness = findThicknessBand(activeSize, selectedThicknessId);

  return {
    selectedSizeId,
    selectedThicknessId,
    setSelectedThicknessId,
    handleSizeSelect,
    activeSize,
    activeThickness,
  };
}
