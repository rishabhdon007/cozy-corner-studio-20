"use client";

import { cn } from "@/lib/utils";

export type ProductBandOption = {
  id: string;
  label: string;
  sublabel?: string;
};

type ProductBandSelectorProps = {
  level: "size" | "thickness";
  options: ProductBandOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
};

const LEVEL_META = {
  size: {
    title: "Select Size",
    hint: "Choose a size to view available thickness bands",
    sublabel: "Size",
    ariaLabel: "Product sizes",
  },
  thickness: {
    title: "Select Thickness",
    hint: "Tap a band to update photos & specs",
    sublabel: "Thickness",
    ariaLabel: "Thickness bands",
  },
} as const;

export function ProductBandSelector({
  level,
  options,
  selectedId,
  onSelect,
  className,
}: ProductBandSelectorProps) {
  const meta = LEVEL_META[level];

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
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{meta.title}</span>
          <span className="rounded-full bg-secondary/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            {options.length} {level === "size" ? "sizes" : "bands"}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-gray-500">{meta.hint}</span>
      </div>
      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label={meta.ariaLabel}
      >
        {options.map((option) => {
          const isSelected = option.id === selectedId;

          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(option.id)}
              className={cn(
                "shrink-0 rounded-xl border-2 px-4 py-2.5 text-left transition-all",
                isSelected
                  ? "border-secondary bg-primary text-white shadow-lg shadow-primary/25"
                  : "border-primary/15 bg-white text-primary hover:border-secondary/40 hover:bg-secondary/5",
              )}
            >
              <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-inherit opacity-70">
                {meta.sublabel}
              </span>
              <span className="block text-sm font-black tracking-tight">{option.label}</span>
              {option.sublabel ? (
                <span className="mt-0.5 block text-[10px] font-semibold opacity-80">{option.sublabel}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
