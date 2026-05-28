import { cn } from "@/lib/utils";

type SectionPlaceholderProps = {
  minHeight?: number | string;
  className?: string;
};

export function SectionPlaceholder({ minHeight = 320, className }: SectionPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("w-full animate-pulse bg-surface-container-low/40", className)}
      style={{ minHeight }}
    />
  );
}
