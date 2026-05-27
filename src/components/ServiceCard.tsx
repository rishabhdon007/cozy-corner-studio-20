"use client";

import { useState } from "react";

import { SiteButton } from "@/components/site/SiteButton";
import type { ServiceCardItem } from "../data/serviceCards";
import { ServiceDetailModal } from "./sections/services/ServiceDetailModal";

type ServiceCardProps = {
  item: ServiceCardItem;
  revealDirection?: "left" | "right" | "top" | "";
  href?: string;
  inquireHref?: string;
  enableModal?: boolean;
};

export function ServiceCard({
  item,
  revealDirection,
  href,
  inquireHref,
  enableModal = true,
}: ServiceCardProps) {
  const serviceHref = href ?? `/services/${item.slug}`;
  const inquiryLink = inquireHref ?? serviceHref;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        data-scroll-reveal={revealDirection}
        className="group relative flex h-[300px] cursor-pointer items-end overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm"
        onClick={() => {
          window.location.href = serviceHref;
        }}
      >
        <img
          alt={item.title}
          src={item.image}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
        <span className="absolute right-4 top-4 z-20 bg-emerald-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-lg">
          Ready for Dispatch
        </span>
        <div className="relative z-10 w-full transform p-6 transition-transform duration-300 group-hover:-translate-y-2">
          <h3 className="mb-2 font-headline-md text-headline-md text-on-primary">{item.title.toUpperCase()}</h3>
          <p className="mb-4 line-clamp-2 font-body-md text-sm text-surface-container-lowest opacity-90">{item.description}</p>
          <div className="flex items-center gap-3">
            <SiteButton
              href={inquiryLink}
              variant="service-card"
              icon="mail"
              iconClassName="text-sm"
              className="relative z-20 flex-1"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              Inquire
            </SiteButton>
            {enableModal ? (
              <SiteButton
                variant="icon-circle"
                icon="arrow_outward"
                iconClassName="text-sm"
                className="relative z-20 cursor-pointer"
                aria-label={`Open ${item.title} quick view modal`}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsModalOpen(true);
                }}
              />
            ) : (
              <SiteButton
                href={serviceHref}
                variant="icon-circle"
                icon="arrow_outward"
                iconClassName="text-sm"
                className="relative z-20"
                aria-label={`View ${item.title} details`}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              />
            )}
          </div>
        </div>
      </div>

      {enableModal ? (
        <ServiceDetailModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          serviceId={item.id}
        />
      ) : null}
    </>
  );
}
