import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingAlign = "center" | "left";
type SectionHeadingVariant = "default" | "dark" | "hero";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: SectionHeadingAlign;
  variant?: SectionHeadingVariant;
  className?: string;
  titleClassName?: string;
  leadClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  variant = "default",
  className,
  titleClassName,
  leadClassName,
}: SectionHeadingProps) {
  const isDark = variant === "dark" || variant === "hero";

  return (
    <div
      className={cn(
        "site-section-header",
        align === "left" && "site-section-header--left",
        className,
      )}
    >
      {eyebrow ? (
        <span
          data-scroll-reveal=""
          className={cn("site-section-eyebrow", isDark && "site-section-eyebrow--dark")}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        data-scroll-reveal=""
        className={cn(
          "site-section-title",
          variant === "hero" && "site-section-title--hero",
          isDark && "site-section-title--dark",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          data-scroll-reveal=""
          className={cn("site-section-lead", isDark && "site-section-lead--dark", leadClassName)}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
