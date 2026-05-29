import { buildCatalogWhatsAppMessage, buildWhatsAppHref } from "@/data/contact";
import type { CatalogOffering } from "@/data/catalogTypes";
import { PRICE_NOT_MENTIONED, ASK_FOR_PRICE } from "@/data/catalogOfferings";
import { SiteButton } from "@/components/site/SiteButton";
import { cn } from "@/lib/utils";

type CatalogOfferingsSectionProps = {
  offerings: CatalogOffering[];
  catalogTitle: string;
  className?: string;
};

const SPEC_ICONS: Record<string, string> = {
  Thickness: "straighten",
  Width: "aspect_ratio",
  Grade: "verified",
  Material: "construction",
  "Usage / Application": "factory",
  Capacity: "inventory_2",
  Length: "height",
  "Surface Treatment": "texture",
  "Surface Finish": "texture",
  Shape: "crop_square",
  Brand: "business",
  Make: "precision_manufacturing",
  Type: "category",
  Size: "straighten",
  Color: "palette",
  "Country of Origin": "public",
  "Material Grade": "grade",
  "Dimension / Size": "straighten",
  "Plate Thickness": "layers",
  "Plate Size": "crop_landscape",
  "Sheet Grade": "description",
  "Sheet Material": "construction",
  "Welding Type": "handyman",
  Weight: "scale",
  "Packaging Type": "inventory",
  Pattern: "grid_view",
  Technique: "build",
  "Power Source": "bolt",
  "Item Weight": "scale",
  "Size / Dimension": "aspect_ratio",
  "Channel Size": "view_column",
  "Section Type": "view_agenda",
  "Surface Condition": "texture",
  "Edge Condition": "content_cut",
  "Test Certificate": "description",
  "Plate Weight": "scale",
  "Surface Type": "texture",
  "Face Type": "crop_square",
  "Edge Type": "border_style",
  Usage: "engineering",
};

function specIcon(label: string): string {
  return SPEC_ICONS[label] ?? "check_circle";
}

function formatPrice(offering: CatalogOffering): string {
  if (offering.price === ASK_FOR_PRICE) return ASK_FOR_PRICE;
  if (offering.price === PRICE_NOT_MENTIONED || !offering.price.trim()) {
    return PRICE_NOT_MENTIONED;
  }
  return offering.price;
}

function formatPriceUnit(offering: CatalogOffering): string | null {
  if (offering.price === ASK_FOR_PRICE || offering.price === PRICE_NOT_MENTIONED) return null;
  return offering.priceUnit ? `per ${offering.priceUnit.toLowerCase()}` : null;
}

function formatMoq(offering: CatalogOffering): string {
  if (!offering.minOrderQty) return PRICE_NOT_MENTIONED;
  const unit = offering.minOrderUnit ? ` ${offering.minOrderUnit}` : "";
  return `${offering.minOrderQty}${unit}`;
}

function isPriced(offering: CatalogOffering): boolean {
  return (
    offering.price !== PRICE_NOT_MENTIONED &&
    offering.price !== ASK_FOR_PRICE &&
    Boolean(offering.price.trim())
  );
}

function OfferingCard({
  offering,
  index,
  catalogTitle,
}: {
  offering: CatalogOffering;
  index: number;
  catalogTitle: string;
}) {
  const whatsAppHref = buildWhatsAppHref(
    buildCatalogWhatsAppMessage(`${catalogTitle} — ${offering.title}`, "product", "inquire"),
  );
  const priced = isPriced(offering);
  const priceUnit = formatPriceUnit(offering);

  return (
    <article
      data-scroll-reveal=""
      data-scroll-reveal-delay={String(index + 1)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant/60 bg-white shadow-[0_4px_24px_rgba(0,30,64,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_48px_rgba(0,30,64,0.12)]"
    >
      {/* Accent top bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary via-primary to-primary-container" />

      {/* Header */}
      <div className="relative overflow-hidden bg-primary px-5 pb-5 pt-6 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white/80">
              <span className="material-symbols-outlined text-[13px]">inventory_2</span>
              Variant {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-lg font-black uppercase leading-tight tracking-wide text-white sm:text-xl">
              {offering.title}
            </h3>
          </div>
          {priced ? (
            <span className="shrink-0 rounded-lg bg-emerald-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
              Listed Rate
            </span>
          ) : (
            <span className="shrink-0 rounded-lg bg-white/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white/90">
              On Request
            </span>
          )}
        </div>

        {/* Price block */}
        <div className="relative mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
          <div className="flex items-baseline gap-1.5">
            <span
              className={cn(
                "font-display text-3xl font-black tracking-tight sm:text-4xl",
                priced ? "text-primary-fixed-dim" : "text-white/70",
              )}
            >
              {formatPrice(offering)}
            </span>
            {priceUnit ? (
              <span className="pb-1 text-sm font-bold uppercase tracking-wide text-white/55">
                {priceUnit}
              </span>
            ) : null}
          </div>
          {offering.priceNote ? (
            <span className="mb-1 rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/80">
              {offering.priceNote}
            </span>
          ) : null}
        </div>

        {/* MOQ pill */}
        <div className="relative mt-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
          <span className="material-symbols-outlined text-base text-secondary-fixed">scale</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">Min. Order</p>
            <p className="text-sm font-black text-white">{formatMoq(offering)}</p>
          </div>
        </div>
      </div>

      {/* Specs grid */}
      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg text-secondary">fact_check</span>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-secondary">
            Technical Specifications
          </p>
        </div>

        <ul className="mb-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {offering.specs.map((spec) => (
            <li
              key={spec.label}
              className="flex gap-3 rounded-xl border border-gray-100 bg-[#f7fafc] p-3 transition-colors duration-300 group-hover:border-primary/10 group-hover:bg-white"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined text-[18px]">{specIcon(spec.label)}</span>
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">{spec.label}</p>
                <p className="mt-0.5 text-sm font-semibold leading-snug text-gray-900">{spec.value}</p>
              </div>
            </li>
          ))}
        </ul>

        {offering.highlight ? (
          <div className="mb-5 flex gap-3 rounded-xl border-l-4 border-secondary bg-gradient-to-r from-secondary/8 to-transparent px-4 py-3">
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-lg text-secondary">info</span>
            <p className="text-xs leading-relaxed text-gray-700">{offering.highlight}</p>
          </div>
        ) : null}

        <div className="mt-auto pt-1">
          <SiteButton
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            layout="full"
            icon="chat"
            className="shadow-md shadow-primary/20 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-primary/25"
          >
            Get Best Quote
          </SiteButton>
        </div>
      </div>
    </article>
  );
}

export function CatalogOfferingsSection({
  offerings,
  catalogTitle,
  className,
}: CatalogOfferingsSectionProps) {
  if (offerings.length === 0) return null;

  return (
    <section className={cn("mb-16", className)}>
      {/* Section header */}
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-outline-variant/50 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/5 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-secondary/10 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div
              data-scroll-reveal="top"
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/[0.08] px-3 py-1.5"
            >
              <span className="material-symbols-outlined text-base text-secondary">payments</span>
              <span className="text-[11px] font-black uppercase tracking-[0.16em] text-secondary">
                Pricing & Specifications
              </span>
            </div>
            <h2
              data-scroll-reveal="top"
              data-scroll-reveal-delay="1"
              className="font-display text-3xl font-black uppercase tracking-wide text-primary sm:text-4xl"
            >
              Product Offerings
            </h2>
            <p
              data-scroll-reveal="top"
              data-scroll-reveal-delay="2"
              className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base"
            >
              Indicative rates and specifications as listed on IndiaMART. Final pricing depends on grade,
              size, quantity, and dispatch location.
            </p>
          </div>

          <div
            data-scroll-reveal="right"
            data-scroll-reveal-delay="2"
            className="flex shrink-0 flex-wrap gap-3 lg:flex-col lg:items-end"
          >
            <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-[#f7fafc] px-4 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-xl">verified</span>
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Listings</p>
                <p className="text-lg font-black text-primary">{offerings.length} Variants</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <span className="material-symbols-outlined text-xl">local_shipping</span>
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700/70">Dispatch</p>
                <p className="text-sm font-black text-emerald-800">Indore & Pan-India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards grid — 2 cols on lg when 2 items, 3 when 3+ */}
      <div
        className={cn(
          "grid grid-cols-1 gap-6 md:gap-7",
          offerings.length === 1 && "max-w-xl mx-auto",
          offerings.length === 2 && "lg:grid-cols-2",
          offerings.length >= 3 && "lg:grid-cols-2 xl:grid-cols-3",
        )}
      >
        {offerings.map((offering, index) => (
          <OfferingCard
            key={offering.id}
            offering={offering}
            index={index}
            catalogTitle={catalogTitle}
          />
        ))}
      </div>

      <p
        data-scroll-reveal=""
        className="mt-8 text-center text-xs leading-relaxed text-gray-500"
      >
        Rates shown are indicative from IndiaMART listings. Contact NRK Iron & Steel for confirmed pricing,
        GST, and availability before placing an order.
      </p>
    </section>
  );
}
