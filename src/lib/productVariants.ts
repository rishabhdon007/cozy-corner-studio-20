import type {
  ProductSizeBand,
  ProductThicknessBand,
  ProductThicknessVariant,
  ProductVariantCatalog,
} from "@/data/catalogTypes";
import type { CatalogDetail } from "@/data/catalogBuilder";

export function thicknessVariantToBand(variant: ProductThicknessVariant): ProductThicknessBand {
  return {
    id: variant.id,
    label: variant.label,
    thickness: variant.thickness,
    images: variant.images,
    details: variant.details,
    specs: variant.specs,
  };
}

/** Merge legacy flat thicknessVariants into a single-size catalog for backward compatibility */
export function thicknessVariantsToCatalog(
  thicknessBands: ProductThicknessBand[],
  sizeLabel: string,
  size: string,
  sizeId = "default-size",
): ProductVariantCatalog {
  return {
    sizeBands: [
      {
        id: sizeId,
        label: sizeLabel,
        size,
        thicknessBands,
      },
    ],
  };
}

export function resolveProductVariantCatalog(item: CatalogDetail): ProductVariantCatalog | null {
  if (item.variantCatalog?.sizeBands.length) {
    return item.variantCatalog;
  }

  if (item.thicknessVariants?.length) {
    const sizeSpec = item.specs.find((s) => s.label === "Size")?.value ?? "Standard";
    return thicknessVariantsToCatalog(
      item.thicknessVariants.map(thicknessVariantToBand),
      sizeSpec,
      sizeSpec,
    );
  }

  return null;
}

export function hasProductVariantCatalog(item: CatalogDetail): boolean {
  return resolveProductVariantCatalog(item) !== null;
}

export function findSizeBand(catalog: ProductVariantCatalog, sizeId: string): ProductSizeBand | undefined {
  return catalog.sizeBands.find((band) => band.id === sizeId) ?? catalog.sizeBands[0];
}

export function findThicknessBand(
  sizeBand: ProductSizeBand | undefined,
  thicknessId: string,
): ProductThicknessBand | undefined {
  if (!sizeBand) return undefined;
  return sizeBand.thicknessBands.find((band) => band.id === thicknessId) ?? sizeBand.thicknessBands[0];
}

export function getDefaultSelection(catalog: ProductVariantCatalog): {
  sizeId: string;
  thicknessId: string;
} {
  const size = catalog.sizeBands[0];
  const thickness = size?.thicknessBands[0];
  return {
    sizeId: size?.id ?? "",
    thicknessId: thickness?.id ?? "",
  };
}

export function shouldShowSizeSelector(catalog: ProductVariantCatalog): boolean {
  return catalog.sizeBands.length > 1;
}
