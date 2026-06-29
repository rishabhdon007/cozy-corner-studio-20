"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronRight, FileText, Phone, Ruler } from "lucide-react";

import { CatalogOfferingsSection } from "@/components/site/CatalogOfferingsSection";
import { CatalogIndiaMartSection } from "@/components/site/CatalogIndiaMartSection";
import { ServiceCard } from "@/components/ServiceCard";
import { SiteButton } from "@/components/site/SiteButton";
import { SiteImage } from "@/components/site/SiteImage";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useHeroTypewriter } from "@/hooks/useTypewriter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { rescanUnrevealedSections } from "@/scrollRevealDom";
import type { ServiceCardItem } from "@/data/serviceCards";
import { getProduct, type ProductDetail, type ProductRecommendation } from "@/data/products";
import { getService, type ServiceDetail } from "@/data/services";
import {
  buildCatalogWhatsAppMessage,
  buildProductThicknessWhatsAppMessage,
  buildWhatsAppHref,
  type CatalogInquiryKind,
} from "@/data/contact";
import { CR_PICKLED_SHEETS_SIZE } from "@/data/crCoiledPickledVariants";
import {
  buildCatalogMediaItems,
  buildThicknessVariantMediaItems,
  resolveCatalogImageSrc,
} from "@/lib/catalogMedia";
import { PRICE_NOT_MENTIONED, ASK_FOR_PRICE } from "@/data/catalogOfferings";
import type { CatalogOffering } from "@/data/catalogTypes";

import { CatalogMediaCarousel } from "./CatalogMediaCarousel";
import { ProductThicknessSelector } from "./ProductThicknessSelector";

type CatalogDetail = ServiceDetail | ProductDetail;

type CatalogDetailPageProps = {
  item: CatalogDetail | undefined;
  parent: { label: string; href: string };
  notFound: { title: string; backHref: string; backLabel: string };
  variantsHeading?: string;
  catalogKind: CatalogInquiryKind;
};

const SPEC_ROW_ICONS = [
  "straighten",
  "content_cut",
  "handyman",
  "verified",
  "texture",
] as const;

const SIDEBAR_SPEC_ICONS = ["straighten", "content_cut", "category", "factory"] as const;

export function ServiceDetailPage({ serviceId }: { serviceId: string }) {
  return (
    <CatalogDetailPage
      item={getService(serviceId)}
      parent={{ label: "Our Products", href: "/services" }}
      notFound={{
        title: "This service page is not available.",
        backHref: "/services",
        backLabel: "Back to Our Products",
      }}
      catalogKind="service"
    />
  );
}

export function ProductDetailPage({ productId }: { productId: string }) {
  return (
    <CatalogDetailPage
      item={getProduct(productId)}
      parent={{ label: "Our Products", href: "/services" }}
      notFound={{
        title: "This product page is not available.",
        backHref: "/services",
        backLabel: "Back to Our Products",
      }}
      variantsHeading="Available Variants"
      catalogKind="product"
    />
  );
}

function CatalogDetailPage({
  item,
  parent,
  notFound,
  variantsHeading = "Available Service Options",
  catalogKind,
}: CatalogDetailPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const mounted = useHasMounted();
  const thicknessVariants = item?.thicknessVariants;
  const [selectedThicknessId, setSelectedThicknessId] = useState(
    () => item?.thicknessVariants?.[0]?.id ?? "",
  );

  useScrollReveal(pageRef, mounted && Boolean(item));

  useEffect(() => {
    if (thicknessVariants?.[0]) {
      setSelectedThicknessId(thicknessVariants[0].id);
    }
  }, [item?.slug, thicknessVariants]);

  useEffect(() => {
    if (!mounted || !thicknessVariants?.length) return;
    const timeoutIds = [
      window.setTimeout(() => rescanUnrevealedSections(pageRef.current ?? document.body), 150),
      window.setTimeout(() => rescanUnrevealedSections(pageRef.current ?? document.body), 600),
    ];
    return () => timeoutIds.forEach((id) => window.clearTimeout(id));
  }, [mounted, item?.slug, thicknessVariants?.length]);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#f7fafc]">
        <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-gray-500">Page not found</p>
          <h1 className="mb-6 text-3xl font-black text-primary md:text-5xl">{notFound.title}</h1>
          <SiteButton
            href={notFound.backHref}
            variant="primary"
            lucideIcon={ArrowRight}
          >
            {notFound.backLabel}
          </SiteButton>
        </main>
      </div>
    );
  }

  const selectedThickness =
    thicknessVariants?.find((variant) => variant.id === selectedThicknessId) ?? thicknessVariants?.[0];
  const hasThicknessVariants = Boolean(thicknessVariants && thicknessVariants.length > 0);

  const activeThickness = hasThicknessVariants
    ? (selectedThickness ?? thicknessVariants![0])
    : undefined;

  const mediaItems = hasThicknessVariants && activeThickness
    ? buildThicknessVariantMediaItems(activeThickness.images, activeThickness.label)
    : buildCatalogMediaItems(item);

  const inquireWhatsAppHref = buildWhatsAppHref(
    buildCatalogWhatsAppMessage(item.title, catalogKind, "inquire"),
  );
  const salesWhatsAppHref = buildWhatsAppHref(
    buildCatalogWhatsAppMessage(item.title, catalogKind, "sales"),
  );

  const thicknessQuoteWhatsAppHref = hasThicknessVariants && activeThickness
    ? buildWhatsAppHref(
        buildProductThicknessWhatsAppMessage(
          item.title,
          {
            material: item.specs.find((spec) => spec.label === "Material")?.value ?? "CR - Pickled Sheets",
            thickness: activeThickness.thickness,
            size: CR_PICKLED_SHEETS_SIZE,
            grade: item.specs.find((spec) => spec.label === "Grade")?.value,
            notes: activeThickness.details,
          },
          "quote",
        ),
      )
    : inquireWhatsAppHref;

  const displaySpecs = hasThicknessVariants && activeThickness
    ? item.specs.map((spec) => {
        if (spec.label === "Thickness") {
          return { ...spec, value: `${activeThickness.thickness} mm` };
        }
        if (spec.label === "Size") {
          return { ...spec, value: CR_PICKLED_SHEETS_SIZE };
        }
        return spec;
      })
    : item.specs;

  const technicalRows = hasThicknessVariants && activeThickness
    ? [
        {
          property: "Thickness",
          value: `${activeThickness.thickness} mm`,
          method: "Measurement check",
        },
        ...item.technicalSpecs.filter((row) => row.property !== "Thickness"),
      ]
    : item.technicalSpecs;

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f7fafc] text-gray-900 reveal">
      <CatalogDetailHero
        item={item}
        parent={parent}
        heroImage={activeThickness?.images[0] ?? item.mainImage}
      />

      <main className="mx-auto max-w-container-max px-gutter py-10 md:py-12">
        <section className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-2 lg:h-full">
            <div className="shrink-0" data-scroll-reveal="">
              <CatalogMediaCarousel
                key={hasThicknessVariants && activeThickness ? activeThickness.id : item.slug}
                items={mediaItems}
                title={item.title}
              />
            </div>
            {hasThicknessVariants ? (
              <ProductThicknessSelector
                variants={thicknessVariants!}
                selectedId={selectedThickness?.id ?? thicknessVariants![0].id}
                onSelect={setSelectedThicknessId}
              />
            ) : null}
            <KeyAdvantagesCompact cards={item.featureCards} className="lg:flex-1" />
          </div>

          <aside className="flex md:col-span-2 lg:col-span-1 lg:self-start">
            <div className="flex w-full flex-col rounded-2xl border border-white/10 bg-primary p-8 shadow-2xl shadow-black/20">
              <div
                data-scroll-reveal="right"
                data-scroll-reveal-delay="0"
                className="mb-5 flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-primary-fixed-dim">
                  <span className="material-symbols-outlined text-2xl">precision_manufacturing</span>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-wide text-white">{item.category}</h2>
              </div>
              <p
                data-scroll-reveal=""
                data-scroll-reveal-delay="2"
                className="mb-5 text-sm leading-relaxed text-surface-variant/90"
              >
                {item.summary}
              </p>
              <p
                data-scroll-reveal=""
                data-scroll-reveal-delay="3"
                className="mb-8 text-sm leading-relaxed text-white/75"
              >
                {item.description}
              </p>

              <div className="mb-8 grid grid-cols-2 gap-x-4 gap-y-6 border-y border-white/15 py-6">
                {displaySpecs.map((spec, index) => (
                  <div
                    key={spec.label}
                    data-scroll-reveal=""
                    data-scroll-reveal-delay={String(index + 4)}
                    className="flex gap-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-primary-fixed-dim">
                      <span className="material-symbols-outlined text-lg">
                        {SIDEBAR_SPEC_ICONS[index % SIDEBAR_SPEC_ICONS.length]}
                      </span>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/55">{spec.label}</p>
                      <p className="text-base font-semibold text-white">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3" data-scroll-reveal="off">
                {hasThicknessVariants ? (
                  <>
                    <SiteButton
                      href={thicknessQuoteWhatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="detail-primary"
                      layout="full"
                      lucideIcon={ArrowRight}
                    >
                      Get Free Quote
                    </SiteButton>
                    <SiteButton
                      href="/contact"
                      variant="detail-outline"
                      layout="full"
                      lucideIcon={FileText}
                    >
                      Request Spec Sheet
                    </SiteButton>
                    <SiteButton
                      href={salesWhatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="detail-outline-muted"
                      layout="full"
                      lucideIcon={Phone}
                      iconPosition="start"
                    >
                      Talk to Sales
                    </SiteButton>
                  </>
                ) : (
                  <>
                    <SiteButton
                      href={inquireWhatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="detail-primary"
                      layout="full"
                      lucideIcon={ArrowRight}
                      data-scroll-reveal=""
                      data-scroll-reveal-delay="8"
                    >
                      Inquire Now
                    </SiteButton>
                    <SiteButton
                      href="/contact"
                      variant="detail-outline"
                      layout="full"
                      lucideIcon={FileText}
                      data-scroll-reveal=""
                      data-scroll-reveal-delay="9"
                    >
                      Request Spec Sheet
                    </SiteButton>
                    <SiteButton
                      href={salesWhatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="detail-outline-muted"
                      layout="full"
                      lucideIcon={Phone}
                      iconPosition="start"
                      data-scroll-reveal=""
                      data-scroll-reveal-delay="10"
                    >
                      Talk to Sales
                    </SiteButton>
                  </>
                )}
              </div>

              {!hasThicknessVariants ? (
                <div className="mt-8">
                    <h3
                      data-scroll-reveal=""
                      data-scroll-reveal-delay="11"
                      className="mb-3 text-xs font-bold uppercase tracking-wider text-white/55"
                    >
                      {item.offerings?.length ? "Offerings & Rates" : variantsHeading}
                    </h3>
                    <ul className="space-y-2">
                      {item.offerings?.length
                        ? item.offerings.map((offering, index) => (
                            <li key={offering.id}>
                              <SidebarOfferingRow offering={offering} index={index} />
                            </li>
                          ))
                        : item.variants.map((variant, index) => (
                            <li key={variant}>
                              <SiteButton
                                href="/contact"
                                variant="row-variant"
                                icon={false}
                                className="group w-full"
                                data-scroll-reveal=""
                                data-scroll-reveal-delay={String(index + 12)}
                              >
                                <span className="flex items-center">
                                  <span className="mr-3 rounded-lg bg-white/10 p-2 text-primary-fixed-dim">
                                    <Ruler className="h-4 w-4" aria-hidden="true" />
                                  </span>
                                  <span className="text-sm font-medium text-white">{variant}</span>
                                </span>
                                <ChevronRight
                                  className="site-btn-icon h-4 w-4 text-white/40 transition-colors group-hover:text-white"
                                  aria-hidden="true"
                                />
                              </SiteButton>
                            </li>
                          ))}
                    </ul>
                </div>
              ) : null}
            </div>
          </aside>
        </section>

        {item.offerings?.length && !hasThicknessVariants ? (
          <CatalogOfferingsSection offerings={item.offerings} catalogTitle={item.title} />
        ) : null}

        <TechnicalSpecs rows={technicalRows} isProduct={catalogKind === "product"} />

        <CatalogIndiaMartSection
          slug={item.slug}
          kind={catalogKind}
          compact
          className="mb-16 mt-10"
        />
      </main>

      <WhyChooseNrk />

      <div className="mx-auto max-w-container-max px-gutter pb-10">
        <RelatedProducts products={item.recommendations} />
      </div>
    </div>
  );
}

function CatalogDetailHero({
  item,
  parent,
  heroImage,
}: {
  item: CatalogDetail;
  parent: { label: string; href: string };
  heroImage?: string;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const mounted = useHasMounted();
  const [heroStep, setHeroStep] = useState(0);

  useHeroTypewriter(heroRef, mounted, [item.slug]);

  useEffect(() => {
    setHeroStep(0);
    if (!mounted) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setHeroStep(4);
      return;
    }

    const typeDuration = 250 + (item.eyebrow.length + item.title.length) * 42 + 180 + 200;

    const timers = [
      window.setTimeout(() => setHeroStep(1), typeDuration),
      window.setTimeout(() => setHeroStep(2), typeDuration + 220),
      window.setTimeout(() => setHeroStep(3), typeDuration + 440),
      window.setTimeout(() => setHeroStep(4), typeDuration + 660),
    ];
    const fallback = window.setTimeout(() => setHeroStep(4), 4000);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(fallback);
    };
  }, [mounted, item.eyebrow, item.title, item.slug]);

  return (
    <section
      ref={heroRef}
      data-scroll-reveal="off"
      className="relative w-full overflow-hidden bg-primary"
    >
      <div className="absolute inset-0 z-0">
        <SiteImage
          src={resolveCatalogImageSrc(heroImage ?? item.mainImage)}
          alt=""
          fill
          sizes="100vw"
          priority
          fallback={false}
          className="opacity-35"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/92 to-primary/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[255px] max-w-container-max flex-col justify-end px-gutter pb-9 pt-20 md:min-h-[315px] md:pb-12 md:pt-24">
        <Breadcrumb current={item.title} parent={parent} variant="dark" />

        <div className="max-w-3xl text-on-primary">
          <div className="mb-6" data-typewriter suppressHydrationWarning>
            <p className="font-label-md mb-3 min-h-[1.4em] text-sm font-black uppercase tracking-[0.18em] text-primary-fixed-dim md:text-base">
              <span data-typewriter-line data-typewriter-text={item.eyebrow} suppressHydrationWarning>
                {item.eyebrow}
              </span>
            </p>
            <div
              className={cn(
                "h-px w-full max-w-[420px] bg-gradient-to-r from-secondary-fixed via-white/30 to-transparent transition-all duration-700",
                !mounted || heroStep >= 1 ? "opacity-100" : "opacity-0",
              )}
            />

            <h1 className="font-display mb-5 text-[32px] font-black uppercase leading-[0.98] tracking-[-0.055em] text-white sm:text-[40px] md:text-[48px] lg:text-[64px] xl:text-[76px]">
              <span data-typewriter-line data-typewriter-text={item.title} suppressHydrationWarning>
                {item.title}
              </span>
              <span
                className="ml-1 inline-block h-[0.82em] w-[0.08em] animate-pulse bg-primary-fixed-dim align-[-0.08em]"
                data-typewriter-cursor
              />
            </h1>
          </div>

          <p
            className={cn(
              "font-body-lg mb-4 max-w-2xl text-base leading-relaxed text-white/90 transition-all duration-700 md:text-lg",
              !mounted || heroStep >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            {item.summary}
          </p>
          <p
            className={cn(
              "font-body-md max-w-2xl text-sm leading-relaxed text-white/75 line-clamp-2 transition-all duration-700 md:text-base",
              !mounted || heroStep >= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            {item.description}
          </p>

          <div
            className={cn(
              "mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-700",
              !mounted || heroStep >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <span className="material-symbols-outlined text-base text-primary-fixed-dim">verified</span>
            {item.badge}
          </div>
        </div>
      </div>
    </section>
  );
}

function Breadcrumb({
  current,
  parent,
  variant = "light",
}: {
  current: string;
  parent?: { label: string; href: string };
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  const root = parent ?? { label: "Our Products", href: "/services" };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`mb-6 text-sm font-bold uppercase tracking-wider ${isDark ? "text-white/55" : "text-gray-500"}`}
    >
      <ol className="inline-flex list-none flex-wrap items-center gap-2 p-0">
        <li className="flex items-center gap-2">
          <Link href={root.href} className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-primary"}`}>
            {root.label}
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
        </li>
        <li>
          <span className={isDark ? "text-white" : "text-primary"}>{current}</span>
        </li>
      </ol>
    </nav>
  );
}

function SidebarOfferingRow({ offering, index }: { offering: CatalogOffering; index: number }) {
  const priced =
    offering.price !== PRICE_NOT_MENTIONED &&
    offering.price !== ASK_FOR_PRICE &&
    Boolean(offering.price.trim());
  const priceLabel = priced
    ? `${offering.price}${offering.priceUnit ? `/${offering.priceUnit}` : ""}`
    : offering.price === ASK_FOR_PRICE
      ? ASK_FOR_PRICE
      : PRICE_NOT_MENTIONED;

  return (
    <div
      data-scroll-reveal=""
      data-scroll-reveal-delay={String(index + 12)}
      className="group/offer rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.03] px-3 py-3 transition-colors hover:border-white/20 hover:from-white/[0.12]"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug text-white">{offering.title}</p>
        {priced ? (
          <span className="shrink-0 rounded bg-emerald-600/90 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
            Rate
          </span>
        ) : null}
      </div>
      <p className={cn("mt-1.5 text-sm font-black", priced ? "text-primary-fixed-dim" : "text-white/55")}>
        {priceLabel}
      </p>
      {offering.minOrderQty ? (
        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/45">
          MOQ {offering.minOrderQty}
          {offering.minOrderUnit ? ` ${offering.minOrderUnit}` : ""}
        </p>
      ) : null}
    </div>
  );
}

function TechnicalSpecs({
  rows,
  isProduct = false,
}: {
  rows: ServiceDetail["technicalSpecs"];
  isProduct?: boolean;
}) {
  return (
    <section className="mb-16">
      <div className="mb-8 flex flex-col items-center text-center">
        <div
          data-scroll-reveal="top"
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          <span className="material-symbols-outlined text-3xl">fact_check</span>
        </div>
        <p
          data-scroll-reveal="top"
          data-scroll-reveal-delay="1"
          className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-secondary"
        >
          Verified Standards
        </p>
        <h2
          data-scroll-reveal="top"
          data-scroll-reveal-delay="2"
          className="text-3xl font-black uppercase tracking-wide text-primary"
        >
          {isProduct ? "Product Specifications" : "Service Specifications"}
        </h2>
      </div>
      <div
        className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary">
            <tr>
              <th className="w-[28%] px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-primary-container/40" scope="col">
                Parameter
              </th>
              <th className="w-[36%] px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-primary-container/40" scope="col">
                Standard Value
              </th>
              <th className="w-[36%] px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-primary-container/40" scope="col">
                Check Method
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row, index) => (
              <tr
                key={row.property}
                data-scroll-reveal=""
                data-scroll-reveal-delay={String(index + 4)}
                className={cn(
                  "group transition-colors duration-200 hover:bg-primary/[0.07]",
                  index % 2 ? "bg-gray-50" : "bg-white",
                )}
              >
                <td className="whitespace-nowrap px-6 py-4 transition-colors duration-200 group-hover:bg-primary/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                      <span className="material-symbols-outlined text-lg">
                        {SPEC_ROW_ICONS[index % SPEC_ROW_ICONS.length]}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900 transition-colors duration-200 group-hover:text-primary">
                      {row.property}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 transition-colors duration-200 group-hover:bg-primary/[0.04] group-hover:text-gray-900">
                  {row.value}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500 transition-colors duration-200 group-hover:bg-primary/[0.04] group-hover:text-gray-700">
                  {row.method}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function KeyAdvantagesCompact({
  cards,
  className,
}: {
  cards: ServiceDetail["featureCards"];
  className?: string;
}) {
  const icons = {
    gauge: "speed",
    shield: "verified",
    truck: "local_shipping",
  } as const;

  return (
    <div
      data-scroll-reveal=""
      className={cn(
        "flex flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 lg:h-full",
        className,
      )}
    >
      <div className="mb-3 flex shrink-0 items-center gap-2.5 border-b border-gray-100 pb-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-lg">stars</span>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary">
            Service Strengths
          </p>
          <h3 className="text-sm font-black uppercase tracking-wide text-primary sm:text-base">
            Key Advantages
          </h3>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
        {cards.map((card, index) => (
          <div
            key={card.title}
            data-scroll-reveal=""
            data-scroll-reveal-delay={String(index + 1)}
            className="flex h-full gap-2.5 rounded-xl border border-gray-100 bg-[#f7fafc] p-3 sm:p-4"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-sm sm:h-9 sm:w-9">
              <span className="material-symbols-outlined text-base">{icons[card.icon]}</span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <h4 className="mb-1 text-xs font-bold leading-tight text-gray-900 sm:text-sm">{card.title}</h4>
              <p className="text-[11px] leading-relaxed text-gray-600 sm:text-xs">{card.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyChooseNrk() {
  const reasons = [
    {
      icon: "handshake",
      title: "Customer-Focused Service",
      description:
        "Customer-focused approach with timely delivery, quality assurance, transparent communication, and high customer satisfaction.",
    },
    {
      icon: "loyalty",
      title: "Goodwill & Loyalty",
      description:
        "Strong business relationships built over 30+ years with long-term trust and a loyal customer ecosystem.",
    },
    {
      icon: "inventory_2",
      title: "Complete Range",
      description:
        "One-stop solution for all steel requirements — prime and secondary materials available with doorstep delivery support.",
    },
    {
      icon: "groups",
      title: "Client Relationship",
      description:
        "30+ years of strong client relationships with a trusted and loyal network — business built on mutual trust and support.",
    },
    {
      icon: "precision_manufacturing",
      title: "Precision Processing",
      description:
        "State-of-the-art CTL machines, cranes (10-30 ton capacity), and annealing furnaces for accurate processing.",
    },
    {
      icon: "local_shipping",
      title: "Pan-India Delivery",
      description:
        "Transportation services with 10-15 ton capacity ensuring secure and efficient doorstep delivery across MP, Gujarat, Maharashtra, Rajasthan & Punjab.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-primary py-16 md:py-20">
      <div className="absolute inset-0 h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          suppressHydrationWarning
          className="h-full w-full object-cover opacity-45"
        >
          <source src="/homepage_banner_bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-container-max px-gutter">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          <div className="text-on-primary">
            <div className="mb-7">
              <p
                data-scroll-reveal="top"
                className="font-label-md mb-3 text-sm font-black tracking-tight text-white md:text-base"
              >
                Why Buy From <span className="text-orange-400">NRK Iron &amp; Steel</span>
              </p>
              <div
                data-scroll-reveal="top"
                data-scroll-reveal-delay="1"
                className="h-px w-full max-w-[420px] bg-gradient-to-r from-secondary-fixed via-white/30 to-transparent"
              />
            </div>
            <h2
              data-scroll-reveal="top"
              data-scroll-reveal-delay="2"
              className="font-display mb-7 text-[42px] font-black leading-[0.98] tracking-[-0.055em] text-white md:text-[52px] lg:text-[64px] xl:text-[72px]"
            >
              Why Businesses
              <br />
              <span className="text-primary-fixed-dim">Choose Us</span>
            </h2>
          </div>
          <div className="lg:text-right">
            <p
              data-scroll-reveal="top"
              data-scroll-reveal-delay="3"
              className="font-body-lg max-w-xl text-lg leading-relaxed text-surface-variant/90 md:text-xl lg:ml-auto"
            >
              Partner with a trusted name in the steel industry. We deliver quality, reliability, and
              value at every step of your project.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              data-scroll-reveal=""
              data-scroll-reveal-delay={String(index + 4)}
              className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-7 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/15"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary/0 blur-2xl transition-all duration-500 group-hover:bg-secondary/15" />
              <div className="relative flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary-fixed-dim ring-1 ring-white/10 transition-colors group-hover:bg-secondary-container group-hover:text-on-secondary-container">
                  <span className="material-symbols-outlined text-2xl">{reason.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline-md mb-2 text-lg text-white md:text-xl">{reason.title}</h3>
                  <p className="font-body-md text-sm leading-relaxed text-surface-variant/80 md:text-base">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          data-scroll-reveal=""
          data-scroll-reveal-delay="10"
          className="mt-14 overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-10"
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl text-on-primary">
              <p className="font-label-md mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary-fixed-dim">
                Ready to move forward
              </p>
              <h3 className="font-display mb-3 text-[28px] font-black leading-[1.02] tracking-[-0.04em] text-white md:text-[36px]">
                Ready to Experience the{" "}
                <span className="text-primary-fixed-dim">NRK Difference?</span>
              </h3>
              <p className="font-body-lg text-base leading-relaxed text-surface-variant/90 md:text-lg">
                Get competitive pricing, expert support, and premium steel products.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-4 sm:w-auto sm:flex-row">
              <SiteButton href="/contact" variant="hero-primary">
                Get Quote
              </SiteButton>
              <SiteButton
                href="tel:+919575707070"
                variant="hero-outline"
                lucideIcon={Phone}
                iconPosition="start"
              >
                Call
              </SiteButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatedProducts({ products }: { products: ProductRecommendation[] }) {
  const productCards: ServiceCardItem[] = products.map((product) => ({
    id: product.slug,
    slug: product.slug,
    title: product.title,
    description: product.note,
    image: resolveCatalogImageSrc(product.image),
  }));

  return (
    <section className="mb-10">
      <div className="mb-8 flex flex-col justify-between gap-3 border-t border-gray-200 pt-10 md:flex-row md:items-end">
        <div>
          <div
            data-scroll-reveal="top"
            className="mb-4 flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-2xl">category</span>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Related Products</p>
          </div>
          <h2
            data-scroll-reveal="top"
            data-scroll-reveal-delay="1"
            className="text-3xl font-black uppercase tracking-wide text-primary"
          >
            Recommended Steel Products
          </h2>
        </div>
        <SiteButton
          href="/services"
          variant="text"
          lucideIcon={ArrowRight}
          data-scroll-reveal="top"
          data-scroll-reveal-delay="2"
        >
          View all services
        </SiteButton>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {productCards.map((item, index) => (
          <ServiceCard
            key={item.id}
            item={item}
            href={`/product/${item.slug}`}
            catalogKind="product"
            revealDirection={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </section>
  );
}
