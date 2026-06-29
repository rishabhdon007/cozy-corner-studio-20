"use client";

import { cn } from "@/lib/utils";
import type { ProductThicknessVariant } from "@/data/catalogTypes";

type ProductThicknessSelectorProps = {
  variants: ProductThicknessVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
};

export function ProductThicknessSelector({
  variants,
  selectedId,
  onSelect,
  className,
}: ProductThicknessSelectorProps) {
  return (
    <div
      data-scroll-reveal="off"
      className={cn(
        "rounded-2xl border-2 border-primary/15 bg-white p-4 shadow-md shadow-primary/5 sm:p-5",
        className,
      )}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Select Thickness</span>
          <span className="rounded-full bg-secondary/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            {variants.length} bands
          </span>
        </div>
        <span className="text-[11px] font-semibold text-gray-500">
          Tap a band to update photos &amp; specs
        </span>
      </div>
      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Thickness bands"
      >
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId;

          return (
            <button
              key={variant.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(variant.id)}
              className={cn(
                "shrink-0 rounded-xl border-2 px-4 py-2.5 text-left transition-all",
                isSelected
                  ? "border-secondary bg-primary text-white shadow-lg shadow-primary/25"
                  : "border-primary/15 bg-white text-primary hover:border-secondary/40 hover:bg-secondary/5",
              )}
            >
              <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-inherit opacity-70">
                Thickness
              </span>
              <span className="block text-sm font-black tracking-tight">{variant.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
