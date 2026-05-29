"use client";

import { ChevronRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { SiteButton } from "@/components/site/SiteButton";
import { SiteImage } from "@/components/site/SiteImage";
import {
  buildCatalogWhatsAppMessage,
  buildWhatsAppHref,
  type CatalogInquiryKind,
} from "@/data/contact";
import { getProduct } from "@/data/products";
import { getService } from "@/data/services";
import { resolveCatalogImageSrc } from "@/lib/catalogMedia";
import { cn } from "@/lib/utils";

type CatalogQuickViewModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  slug: string;
  catalogKind?: CatalogInquiryKind;
};

export function CatalogQuickViewModal({
  isOpen,
  onOpenChange,
  slug,
  catalogKind = "service",
}: CatalogQuickViewModalProps) {
  const item =
    catalogKind === "product" ? getProduct(slug) : getService(slug);

  if (!item) return null;

  const detailHref =
    catalogKind === "product" ? `/product/${item.slug}` : `/services/${item.slug}`;
  const inquireWhatsAppHref = buildWhatsAppHref(
    buildCatalogWhatsAppMessage(item.title, catalogKind, "inquire"),
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="catalog-quick-view-dialog inset-x-0 bottom-0 top-auto max-h-[92dvh] w-full max-w-none translate-x-0 translate-y-0 overflow-x-hidden overflow-y-auto rounded-t-2xl rounded-b-none border-0 bg-[#f7fafc] p-0 text-gray-900 md:inset-auto md:bottom-auto md:left-1/2 md:top-1/2 md:max-h-[90vh] md:max-w-3xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl lg:max-w-4xl">
        <div className="sticky top-0 z-10 border-b border-gray-200/80 bg-[#f7fafc]/95 px-4 py-3 backdrop-blur-sm md:static md:border-0 md:bg-transparent md:px-8 md:pt-8 md:backdrop-blur-none">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary md:mb-2 md:text-xs">
            {item.eyebrow}
          </p>
          <DialogTitle className="border-l-4 border-primary pl-3 pr-10 text-xl font-black uppercase leading-tight tracking-tight text-primary md:mb-6 md:pl-4 md:pr-0 md:text-2xl lg:text-3xl">
            {item.title}
          </DialogTitle>
        </div>

        <div className="min-w-0 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] md:px-8 md:pb-8">
          <section className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <div className="flex min-w-0 flex-col gap-6 md:col-span-1 lg:col-span-2">
              <div className="group relative h-52 w-full min-w-0 overflow-hidden rounded-xl bg-gray-200 sm:h-56 md:h-64 lg:h-72">
                <SiteImage
                  src={resolveCatalogImageSrc(item.mainImage)}
                  alt={`${item.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 right-3 max-w-[calc(100%-1.5rem)] bg-primary px-3 py-1.5 text-[10px] font-bold uppercase leading-snug tracking-wider text-white sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-none">
                  {item.badge}
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-3 md:grid md:grid-cols-3 md:gap-3">
                {item.gallery.slice(0, 3).map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative aspect-[16/9] w-full min-w-0 overflow-hidden rounded-lg bg-gray-200 md:aspect-[4/3]"
                  >
                    <SiteImage
                      src={resolveCatalogImageSrc(image)}
                      alt={`${item.title} detail ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 120px"
                      className="transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="mb-4 text-xs font-black uppercase tracking-wider text-gray-500">
                  Processing Flow
                </h3>
                <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-3">
                  {item.process.map((step, index) => (
                    <div key={step} className="flex min-w-0 items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-primary text-xs font-black text-white">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Step {index + 1}
                        </p>
                        <h4 className="text-sm font-bold leading-snug text-gray-800">{step}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="min-w-0 md:col-span-1 lg:col-span-1">
              <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                <h2 className="mb-3 text-lg font-black uppercase tracking-wide text-gray-900">
                  {item.category}
                </h2>
                <DialogDescription className="mb-4 text-xs leading-relaxed text-gray-600">
                  {item.summary}
                </DialogDescription>
                <p className="mb-6 text-xs leading-relaxed text-gray-600">{item.description}</p>

                <div className="mb-6 grid grid-cols-1 gap-4 border-y border-gray-100 py-4 sm:grid-cols-2">
                  {item.specs.map((spec) => (
                    <div key={spec.label} className="min-w-0">
                      <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {spec.label}
                      </p>
                      <p className="text-xs font-semibold text-gray-800">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto space-y-2">
                  <SiteButton
                    href={detailHref}
                    variant="modal"
                    layout="full"
                    lucideIcon={ChevronRight}
                    iconClassName="h-3.5 w-3.5"
                  >
                    View Details Page
                  </SiteButton>
                  <SiteButton
                    href={inquireWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="modal-outline"
                    layout="full"
                  >
                    Inquire on WhatsApp
                  </SiteButton>
                </div>
              </div>
            </aside>
          </section>

          <section className="mt-6 border-t border-gray-200 pt-5 sm:mt-8 sm:pt-6">
            <h3 className="mb-3 text-xs font-black uppercase tracking-wider text-gray-500 sm:mb-4">
              Technical Specifications
            </h3>

            {/* Mobile: stacked cards — no horizontal scroll */}
            <div className="space-y-3 md:hidden">
              {item.technicalSpecs.map((row, index) => (
                <div
                  key={row.property}
                  className={cn(
                    "rounded-lg border border-gray-200 bg-white p-4 shadow-sm",
                    index % 2 ? "bg-gray-50" : "bg-white",
                  )}
                >
                  <p className="mb-2 text-xs font-black uppercase tracking-wider text-primary">{row.property}</p>
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-bold uppercase tracking-wider text-gray-400">Standard Value</p>
                      <p className="mt-0.5 font-semibold text-gray-800">{row.value}</p>
                    </div>
                    <div>
                      <p className="font-bold uppercase tracking-wider text-gray-400">Check Method</p>
                      <p className="mt-0.5 text-gray-600">{row.method}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden overflow-x-auto md:block">
              <div className="rounded border border-gray-200 bg-white shadow-sm">
                <table className="w-full divide-y divide-gray-200 text-left">
                  <thead className="bg-primary text-[10px] font-bold uppercase tracking-wider text-white">
                    <tr>
                      <th className="px-4 py-3" scope="col">
                        Parameter
                      </th>
                      <th className="px-4 py-3" scope="col">
                        Standard Value
                      </th>
                      <th className="px-4 py-3" scope="col">
                        Check Method
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-xs">
                    {item.technicalSpecs.map((row, index) => (
                      <tr key={row.property} className={index % 2 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-4 py-2.5 font-bold text-gray-900">{row.property}</td>
                        <td className="px-4 py-2.5 text-gray-600">{row.value}</td>
                        <td className="px-4 py-2.5 text-[10px] text-gray-500">{row.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** @deprecated Use CatalogQuickViewModal */
export function ServiceDetailModal({
  isOpen,
  onOpenChange,
  serviceId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  serviceId: string;
}) {
  return (
    <CatalogQuickViewModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      slug={serviceId}
      catalogKind="service"
    />
  );
}
