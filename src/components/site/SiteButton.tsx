import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const siteButtonVariants = cva(
  "site-btn relative inline-flex items-center justify-center transition-all duration-300",
  {
    variants: {
      variant: {
        default: "",
        "hero-primary":
          "rounded-xl bg-[#1f6fff] px-8 py-4 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-blue-900/30 hover:bg-[#155de0]",
        "hero-outline":
          "rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-wider text-white backdrop-blur-sm hover:bg-white/10",
        primary:
          "rounded-lg bg-primary px-6 py-3 font-label-md text-on-primary shadow-md hover:bg-primary/90",
        "detail-primary":
          "rounded-xl bg-[#1f6fff] px-4 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-900/30 hover:bg-[#155de0] sm:px-8 sm:py-4 sm:text-xs sm:font-black",
        "detail-outline":
          "rounded-xl border border-white/25 bg-white/5 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm hover:bg-white/10",
        "detail-outline-muted":
          "rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white/90 hover:bg-white/10",
        white:
          "rounded-xl bg-white px-6 py-3 font-label-md text-xs font-black uppercase tracking-wider text-primary shadow-md hover:bg-surface-container-lowest",
        glass:
          "rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-label-md text-xs font-black uppercase tracking-wider text-white backdrop-blur-md hover:border-white/30 hover:bg-white/15",
        outline:
          "rounded-lg border-2 border-primary bg-transparent px-6 py-2 font-label-md text-label-md text-primary hover:bg-primary hover:text-on-primary",
        "outline-secondary":
          "rounded-lg border border-secondary px-6 py-2 font-label-md text-label-md text-secondary hover:bg-secondary-fixed",
        text: "font-label-md text-sm font-bold uppercase tracking-wider text-primary hover:text-secondary",
        "text-light":
          "self-start font-label-md text-sm font-bold uppercase tracking-wider text-secondary-fixed hover:text-white",
        header:
          "rounded-full bg-primary px-6 py-3 font-label-md text-label-md text-on-primary shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:bg-primary-container hover:shadow-xl hover:shadow-primary/25",
        emerald:
          "rounded-2xl bg-emerald-500 px-8 py-5 font-display text-lg font-bold text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-600",
        submit:
          "rounded-2xl bg-primary px-8 py-5 font-display text-lg font-bold text-white shadow-xl shadow-primary/20 hover:bg-primary/90",
        "service-card":
          "rounded-lg border-2 border-on-primary/90 bg-white/10 px-4 py-2.5 font-label-md text-xs font-black uppercase tracking-wider text-on-primary backdrop-blur-sm hover:bg-on-primary hover:text-primary",
        modal:
          "bg-primary py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary-container",
        "modal-outline":
          "border-2 border-primary bg-white py-2.5 text-xs font-bold uppercase tracking-wider text-primary hover:bg-gray-50",
        "icon-circle":
          "h-9 w-9 shrink-0 rounded-full bg-on-primary text-primary hover:bg-secondary hover:text-on-secondary",
        "icon-circle-primary":
          "h-10 w-10 shrink-0 rounded-full bg-primary p-0 text-white shadow-lg hover:scale-110",
        floating:
          "rounded-full bg-primary px-5 py-3 text-white shadow-xl shadow-primary/25 hover:-translate-y-1 hover:bg-primary-container focus:outline-none focus:ring-4 focus:ring-primary/20",
        whatsapp:
          "h-16 w-16 rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-900/25 hover:-translate-y-1 hover:scale-105 hover:bg-[#1fb85a] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30",
        row: "site-btn-row gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md hover:border-white/30 hover:bg-white/15",
        "row-card":
          "site-btn-row gap-6 rounded-3xl border border-outline-variant/5 bg-slate-50 p-6 shadow-sm hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5",
        "row-variant":
          "site-btn-row justify-between rounded-xl border border-white/15 bg-white/5 p-3 hover:border-white/25 hover:bg-white/10",
      },
      layout: {
        default: "",
        row: "site-btn-row justify-start text-left",
        icon: "gap-0 p-0",
        full: "w-full",
      },
      size: {
        default: "",
        sm: "text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      layout: "default",
      size: "default",
    },
  },
);

export type SiteButtonProps = {
  href?: string;
  download?: boolean | string;
  icon?: string | false;
  lucideIcon?: LucideIcon;
  iconNode?: ReactNode;
  iconPosition?: "start" | "end";
  iconClassName?: string;
  className?: string;
  children?: ReactNode;
} & VariantProps<typeof siteButtonVariants> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href">;

export function SiteButtonIcon({
  name,
  lucide: Lucide,
  className,
}: {
  name?: string;
  lucide?: LucideIcon;
  className?: string;
}) {
  if (Lucide) {
    return <Lucide className={cn("site-btn-icon h-4 w-4 shrink-0", className)} aria-hidden="true" />;
  }

  return (
    <span
      className={cn("site-btn-icon material-symbols-outlined text-base leading-none", className)}
      aria-hidden="true"
    >
      {name ?? "arrow_forward"}
    </span>
  );
}

function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  );
}

export function SiteButton({
  href,
  download,
  variant,
  layout,
  size,
  icon = "arrow_forward",
  lucideIcon,
  iconNode,
  iconPosition = "end",
  iconClassName,
  className,
  children,
  type = "button",
  ...props
}: SiteButtonProps) {
  const isIconOnly =
    layout === "icon" ||
    variant === "icon-circle" ||
    variant === "icon-circle-primary" ||
    variant === "whatsapp";
  const showIcon = icon !== false || Boolean(lucideIcon) || Boolean(iconNode);

  const iconEl = showIcon ? (
    iconNode ?? (
      lucideIcon ? (
        <SiteButtonIcon lucide={lucideIcon} className={iconClassName} />
      ) : (
        <SiteButtonIcon name={typeof icon === "string" ? icon : "arrow_forward"} className={iconClassName} />
      )
    )
  ) : null;

  const classes = cn(siteButtonVariants({ variant, layout, size }), className);
  const content = isIconOnly ? (
    iconEl
  ) : (
    <>
      {iconPosition === "start" && iconEl}
      {children}
      {iconPosition === "end" && iconEl}
    </>
  );

  const dataIconStart = iconPosition === "start" ? "true" : undefined;

  if (href) {
    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          className={classes}
          data-icon-start={dataIconStart}
          download={download}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        data-icon-start={dataIconStart}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} data-icon-start={dataIconStart} {...props}>
      {content}
    </button>
  );
}

export { siteButtonVariants };
