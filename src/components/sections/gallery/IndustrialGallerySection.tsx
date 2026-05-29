"use client";

import { SiteImage } from "@/components/site/SiteImage";
import { SITE_IMAGES } from "@/lib/siteImages";
import { cn } from "@/lib/utils";

type GalleryItem = {
  id: string;
  title: string;
  image: string;
  layout: "top-left" | "bottom-left" | "tall-center" | "top-right" | "bottom-right" | "top-far" | "bottom-far";
};

const galleryItems: GalleryItem[] = [
  {
    id: "slitting",
    title: "Heavy Slitting Operations",
    image: SITE_IMAGES.construction,
    layout: "top-left",
  },
  {
    id: "warehouse",
    title: "Warehouse Operations",
    image: SITE_IMAGES.about.screen3,
    layout: "bottom-left",
  },
  {
    id: "distribution",
    title: "Distribution Network",
    image: SITE_IMAGES.about.screen2,
    layout: "tall-center",
  },
  {
    id: "storage",
    title: "Premium Steel Storage",
    image: SITE_IMAGES.about.screen1,
    layout: "top-right",
  },
  {
    id: "ctl",
    title: "Cut-to-Length Processing",
    image: SITE_IMAGES.about.screen3,
    layout: "bottom-right",
  },
  {
    id: "capacity",
    title: "Industrial Capacity",
    image: SITE_IMAGES.teamMember,
    layout: "top-far",
  },
  {
    id: "dispatch",
    title: "Dispatch & Logistics Hub",
    image: SITE_IMAGES.about.screen2,
    layout: "bottom-far",
  },
];

const layoutStyles: Record<GalleryItem["layout"], string> = {
  "top-left": "md:col-start-1 md:row-start-1 min-h-[240px] sm:min-h-[280px] md:min-h-[300px]",
  "bottom-left": "md:col-start-1 md:row-start-2 min-h-[200px] sm:min-h-[240px] md:min-h-[280px]",
  "tall-center":
    "md:col-start-2 md:row-start-1 md:row-span-2 min-h-[320px] sm:min-h-[380px] md:min-h-0 md:h-full",
  "top-right": "md:col-start-3 md:row-start-1 min-h-[220px] sm:min-h-[260px] md:min-h-[300px]",
  "bottom-right": "md:col-start-3 md:row-start-2 min-h-[220px] sm:min-h-[260px] md:min-h-[280px]",
  "top-far": "md:col-start-4 md:row-start-1 min-h-[240px] sm:min-h-[280px] md:min-h-[300px]",
  "bottom-far": "md:col-start-4 md:row-start-2 min-h-[200px] sm:min-h-[240px] md:min-h-[280px]",
};

const highlights = [
  "Slitting, cut-to-length, annealing, and coated sheet processing under one roof",
  "Large-format yards with crane handling, weighing, and ready stock dispatch",
  "Pan-India logistics from Indore to Mumbai, Gujarat, Rajasthan, and Punjab",
] as const;

export function IndustrialGallerySection() {
  return (
    <section className="overflow-hidden bg-white py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-container-max px-gutter">
        <div className="grid grid-cols-1 items-start gap-12 xl:grid-cols-[minmax(0,400px)_minmax(0,1fr)] xl:gap-16 2xl:gap-20">
          <div data-scroll-reveal="left" className="xl:sticky xl:top-28 xl:self-start">
            <span className="font-label-md mb-3 inline-block text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
              Visual Showcase
            </span>
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-black leading-[1.05] text-primary">
              Industrial Gallery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-on-surface-variant md:text-lg">
              Visual documentation of our facilities, processing lines, and logistics capabilities — from raw
              material intake to finished dispatch.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-on-surface-variant/90 md:text-base">
              NRK Iron &amp; Steel operates from a multi-acre yard in Indore with slitting lines, CTL machines,
              annealing furnaces, and dedicated storage for prime and secondary steel. These images reflect the
              scale, precision, and throughput that support our customers across Central and Western India.
            </p>

            <ul className="mt-6 space-y-3">
              {highlights.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-on-surface-variant md:text-base">
                  <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-secondary">check_circle</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-on-surface-variant/80 md:text-base">
              Every shipment is weighed, inspected, and documented before it leaves our yard — so you receive
              material that matches your specification, on schedule, and ready for fabrication or site use.
            </p>
          </div>

          <div data-scroll-reveal="right" className="relative w-full">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:grid-rows-2 md:gap-5 md:min-h-[620px] lg:min-h-[680px] xl:min-h-[720px]">
              {galleryItems.map((item) => (
                <article
                  key={item.id}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl bg-slate-100 shadow-md ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10",
                    layoutStyles[item.layout],
                    item.layout === "tall-center" && "col-span-2 md:col-span-1",
                  )}
                >
                  <SiteImage
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="font-headline-md text-base font-black text-white md:text-lg lg:text-xl">
                      {item.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
