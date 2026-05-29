import Link from "next/link";

import { contactInfo, assetSrc } from "@/data/contact";
import type { CatalogInquiryKind } from "@/data/contact";
import { getIndiaMartListings, indiaMartProfile } from "@/data/indiaMartListings";
import { SiteButton } from "@/components/site/SiteButton";
import { SiteImage } from "@/components/site/SiteImage";
import { cn } from "@/lib/utils";

type CatalogIndiaMartSectionProps = {
  slug: string;
  kind: CatalogInquiryKind;
  className?: string;
  compact?: boolean;
};

export function CatalogIndiaMartSection({
  slug,
  kind,
  className,
  compact = false,
}: CatalogIndiaMartSectionProps) {
  const listings = getIndiaMartListings(slug, kind);

  if (listings.length === 0) return null;

  if (compact) {
    return (
      <section
        className={cn(
          "flex flex-col gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-5",
          className,
        )}
        data-scroll-reveal=""
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f7fafc] p-1.5 ring-1 ring-gray-100">
            <SiteImage
              src={assetSrc(contactInfo.indiaMart.logo)}
              alt="IndiaMART"
              fill
              sizes="44px"
              className="object-contain"
            />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-secondary">
              Also on IndiaMART
            </p>
            <p className="truncate text-sm font-bold text-primary">
              {listings.map((l) => l.title).join(" · ")}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="inline-flex h-6 items-center gap-1 rounded-full bg-emerald-50 px-2.5 text-[10px] font-bold uppercase leading-none tracking-wide text-emerald-700">
                <span className="material-symbols-outlined text-[12px] leading-none">verified</span>
                TrustSEAL
              </span>
              <span className="inline-flex h-6 items-center rounded-full bg-[#f7fafc] px-2.5 text-[10px] font-bold uppercase leading-none tracking-wide text-gray-600 ring-1 ring-gray-100">
                {indiaMartProfile.responseRate} Response
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          {listings.slice(0, 2).map((listing) => (
            <Link
              key={listing.id}
              href={listing.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-[#f7fafc] px-3 py-2 text-xs font-bold text-primary transition-colors hover:border-primary/25 hover:bg-white"
            >
              {listing.title}
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </Link>
          ))}
          <SiteButton
            href={indiaMartProfile.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-secondary"
            icon="open_in_new"
            className="text-xs"
          >
            Profile
          </SiteButton>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "rounded-[2rem] border border-outline-variant/10 bg-white p-6 shadow-sm md:p-8",
        className,
      )}
      data-scroll-reveal=""
    >
      <div className="mb-6 flex flex-col gap-5 border-b border-gray-100 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-100">
            <SiteImage
              src={assetSrc(contactInfo.indiaMart.logo)}
              alt="IndiaMART logo"
              fill
              sizes="56px"
              className="object-contain"
            />
          </span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-secondary">Verified on IndiaMART</p>
            <h2 className="mt-1 font-display text-xl font-black text-primary md:text-2xl">
              Browse NRK Listings on IndiaMART
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              {indiaMartProfile.businessName} · {indiaMartProfile.location}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#f7fafc] px-3 text-[11px] font-bold uppercase leading-none tracking-wider text-primary ring-1 ring-gray-100">
            <span className="material-symbols-outlined text-sm leading-none text-secondary">verified</span>
            TrustSEAL
          </span>
          <span className="inline-flex h-8 items-center rounded-full bg-[#f7fafc] px-3 text-[11px] font-bold uppercase leading-none tracking-wider text-primary ring-1 ring-gray-100">
            {indiaMartProfile.years}
          </span>
          <span className="inline-flex h-8 items-center rounded-full bg-[#f7fafc] px-3 text-[11px] font-bold uppercase leading-none tracking-wider text-primary ring-1 ring-gray-100">
            {indiaMartProfile.responseRate} Response
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {listings.map((listing, index) => (
          <SiteButton
            key={listing.id}
            href={listing.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="row-card"
            icon={false}
            className="group h-auto w-full items-start p-0"
            data-scroll-reveal=""
            data-scroll-reveal-delay={String(index + 1)}
          >
            <div className="flex w-full flex-col gap-3 rounded-2xl border border-gray-100 bg-[#f7fafc] p-5 text-left transition-all duration-300 group-hover:border-primary/20 group-hover:bg-white group-hover:shadow-md group-hover:shadow-primary/5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary">
                    {listing.productCount} product{listing.productCount === 1 ? "" : "s"} available
                  </p>
                  <h3 className="mt-1 font-headline-md text-lg font-black text-primary">{listing.title}</h3>
                </div>
                <span className="material-symbols-outlined shrink-0 text-primary/35 transition-colors group-hover:text-primary">
                  open_in_new
                </span>
              </div>
              <ul className="space-y-1.5">
                {listing.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined mt-0.5 text-base text-secondary">check_circle</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SiteButton>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-on-surface-variant">
          View live product photos, specifications, and pricing on our verified IndiaMART storefront.
        </p>
        <SiteButton
          href={indiaMartProfile.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline-secondary"
          icon="open_in_new"
          className="shrink-0"
        >
          Visit IndiaMART Profile
        </SiteButton>
      </div>
    </section>
  );
}
