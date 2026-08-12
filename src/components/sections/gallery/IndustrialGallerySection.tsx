"use client";

import { SiteImage } from "@/components/site/SiteImage";
import { cn } from "@/lib/utils";
import { useSiteData } from "@/hooks/useSiteData";
import db from "@/data/db.json";

type GalleryItem = {
  id: string;
  title: string;
  image: string;
  className?: string;
};

const defaultGallery = {
  eyebrow: "Visual Showcase",
  title: "Industrial Gallery",
  items: [
    {
      id: "slitting",
      title: "Heavy Slitting Operations",
      image: "/Gallary/Heavy_Slitting_Operations.png",
      className: "md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-[450px] lg:min-h-[600px]",
    },
    {
      id: "warehouse",
      title: "Warehouse Operations",
      image: "/Gallary/Warehouse_Operations.png",
      className: "md:col-span-1 md:row-span-1 min-h-[250px] lg:min-h-[300px]",
    },
    {
      id: "distribution",
      title: "Distribution Network",
      image: "/Gallary/distribution.webp",
      className: "md:col-span-1 md:row-span-1 min-h-[250px] lg:min-h-[300px]",
    },
    {
      id: "dispatch",
      title: "Dispatch & Logistics Hub",
      image: "/Gallary/Dispatch_Logistics_Hub.png",
      className: "md:col-span-1 md:row-span-1 min-h-[250px] lg:min-h-[300px]",
    },
    {
      id: "ctl",
      title: "Cut-to-Length Processing",
      image: "/Gallary/Cut_to_Length_Processing.png",
      className: "md:col-span-2 md:row-span-1 min-h-[250px] lg:min-h-[300px]",
    },
    {
      id: "storage",
      title: "Premium Steel Storage",
      image: "/Gallary/Premium_Steel_Storage.png",
      className: "md:col-span-2 md:row-span-1 min-h-[250px] lg:min-h-[300px]",
    },
    {
      id: "capacity",
      title: "Industrial Capacity",
      image: "/Gallary/Industrial_Capacity.png",
      className: "md:col-span-1 md:row-span-1 min-h-[250px] lg:min-h-[300px]",
    },
  ],
};

export function IndustrialGallerySection() {
  const galleryData = useSiteData("gallery", (db.published as any).gallery || defaultGallery);
  const items: GalleryItem[] = galleryData?.items || defaultGallery.items;

  return (
    <section className="overflow-hidden bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-container-max px-gutter">
        {/* Header Section */}
        <div data-scroll-reveal="up" className="mx-auto max-w-4xl text-center mb-16 md:mb-20">
          <span className="font-label-md mb-4 inline-block text-[10px] sm:text-xs font-black uppercase tracking-[0.22em] text-secondary">
            {galleryData?.eyebrow || "Visual Showcase"}
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-black leading-[1.05] text-primary">
            {galleryData?.title || "Industrial Gallery"}
          </h2>
        </div>

        {/* Gallery Grid */}
        <div data-scroll-reveal="up" className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {items.map((item, index) => (
            <article
              key={item.id || index}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-slate-100 shadow-md ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20",
                item.className || "md:col-span-1 md:row-span-1 min-h-[250px] lg:min-h-[300px]"
              )}
            >
              <SiteImage
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                <div className="w-12 h-1 mb-4 rounded-full bg-secondary transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                <h3 className="font-headline-md text-xl font-black text-white md:text-2xl lg:text-3xl tracking-tight">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
