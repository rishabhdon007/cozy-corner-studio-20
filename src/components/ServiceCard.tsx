"use client";

import { useRouter } from "next/navigation";

import { SiteImage } from "@/components/site/SiteImage";
import { SiteButton } from "@/components/site/SiteButton";
import type { CatalogInquiryKind } from "@/data/contact";
import { resolveCatalogImageSrc } from "@/lib/catalogMedia";
import type { ServiceCardItem } from "../data/serviceCards";

type ServiceCardProps = {
  item: ServiceCardItem;
  revealDirection?: "left" | "right" | "top" | "";
  href?: string;
  catalogKind?: CatalogInquiryKind;
};

export function ServiceCard({
  item,
  revealDirection,
  href,
  catalogKind = "service",
}: ServiceCardProps) {
  const router = useRouter();
  const detailHref = href ?? (item.kind === "product" || catalogKind === "product" ? `/product/${item.slug}` : `/services/${item.slug}`);
  const cardImageSrc = resolveCatalogImageSrc(item.image);

  const openDetails = () => {
    router.push(detailHref);
  };

  return (
    <div
      data-scroll-reveal={revealDirection}
      className="group relative flex h-[300px] cursor-pointer items-end overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm md:h-[320px] lg:h-[300px]"
      onClick={openDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDetails();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`View ${item.title} details`}
    >
      <SiteImage
        src={cardImageSrc}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
      <span className="absolute right-4 top-4 z-20 bg-emerald-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-lg">
        Ready for Dispatch
      </span>
      <div className="relative z-10 w-full transform p-4 transition-transform duration-300 sm:p-6 group-hover:-translate-y-2">
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
          className="relative z-20 min-h-11 w-full"
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
