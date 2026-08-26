"use client";

import { useRouter } from "next/navigation";

import { SiteImage } from "@/components/site/SiteImage";
import { SiteButton } from "@/components/site/SiteButton";
import type { CatalogInquiryKind } from "@/data/contact";
import { resolveCatalogImageSrc } from "@/lib/catalogMedia";
import type { ServiceCardItem } from "../data/serviceCards";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  item: ServiceCardItem;
  revealDirection?: "left" | "right" | "top" | "";
  href?: string;
  catalogKind?: CatalogInquiryKind;
  hideDispatchBadge?: boolean;
};

export function ServiceCard({
  item,
  revealDirection,
  href,
  catalogKind = "service",
  hideDispatchBadge,
}: ServiceCardProps) {
  const router = useRouter();
  const detailHref = href ?? (item.kind === "product" || catalogKind === "product" ? `/product/${item.slug}` : `/services/${item.slug}`);
  const cardImageSrc = resolveCatalogImageSrc(item.image);

  const isClickable = !["weighing-scale", "crane-handling", "coated-profile-sheets"].includes(item.slug);

  const shouldHideDispatchBadge =
    hideDispatchBadge ??
    (item.hideDispatchBadge ||
      item.section === "processing" ||
      item.section === "fabrication");

  const openDetails = () => {
    if (isClickable) {
      router.push(detailHref);
    }
  };

  return (
    <div
      data-scroll-reveal={revealDirection}
      className={cn(
        "group relative flex h-[300px] items-end overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm md:h-[320px] lg:h-[300px]",
        isClickable ? "cursor-pointer" : "cursor-default"
      )}
      onClick={isClickable ? openDetails : undefined}
      onKeyDown={isClickable ? (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDetails();
        }
      } : undefined}
      role={isClickable ? "link" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `View ${item.title} details` : undefined}
    >
      <SiteImage
        src={cardImageSrc}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn("transition-transform duration-700", isClickable && "group-hover:scale-110")}
      />
      <div className={cn("absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent transition-opacity duration-300", isClickable && "group-hover:opacity-90")} />
      {!shouldHideDispatchBadge ? (
        <span className="absolute right-4 top-4 z-20 bg-emerald-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-lg">
          Ready for Dispatch
        </span>
      ) : null}
      <div className={cn("relative z-10 w-full transform p-4 transition-transform duration-300 sm:p-6", isClickable && "group-hover:-translate-y-2")}>
        {item.eyebrow ? (
          <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-secondary-fixed">
            {item.eyebrow}
          </p>
        ) : null}
        <h3 className="mb-2 font-headline-md text-headline-md text-on-primary">{item.title.toUpperCase()}</h3>
        <p className="mb-4 line-clamp-2 font-body-md text-sm text-surface-container-lowest opacity-90">{item.description}</p>
        <SiteButton
          href={detailHref}
          variant="service-card"
          icon="mail"
          iconClassName="text-sm"
          className={cn("relative z-20 min-h-11 w-full", !isClickable && "invisible pointer-events-none")}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          Inquire
        </SiteButton>
      </div>
    </div>
  );
}
