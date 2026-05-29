import Link from "next/link";

import { SiteImage } from "@/components/site/SiteImage";
import { HOMEPAGE_BANNER_VIDEO, SITE_IMAGES } from "@/lib/siteImages";

export function LifeAtNrkSection() {
  return (
    <section className="bg-white py-16 md:py-20" data-scroll-reveal-section>
      <div className="mx-auto max-w-container-max px-gutter">
        <div
          data-scroll-reveal="top"
          className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="font-display text-3xl font-black text-primary md:text-4xl">Life at NRK</h2>
            <p className="mt-1.5 text-sm text-on-surface-variant">The power behind our structural scale.</p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-secondary transition-colors hover:text-primary"
          >
            View Full Gallery
            <span className="material-symbols-outlined text-base leading-none">arrow_forward</span>
          </Link>
        </div>

        <div
          data-scroll-reveal="top"
          data-scroll-reveal-delay="2"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-rows-2"
          style={{ gridAutoRows: "280px" }}
        >
          {/* 1 — Precision Processing: animated facility video */}
          <div className="group relative overflow-hidden rounded-2xl lg:col-span-2 lg:row-span-2">
            <video
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={HOMEPAGE_BANNER_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={SITE_IMAGES.construction}
              aria-label="Steel slitting line in action"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-16 select-none overflow-hidden px-4"
            >
              <p className="font-display text-[56px] font-black uppercase leading-none tracking-tight text-white/20 md:text-[80px]">
                Steel Slitting:
              </p>
              <p className="font-display text-[56px] font-black uppercase leading-none tracking-tight text-white/20 md:text-[80px]">
                Line in Action
              </p>
            </div>

            <span className="absolute left-4 top-4 rounded-md bg-white/15 px-2.5 py-1 font-label-md text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              Operations
            </span>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-headline-md text-xl font-black text-white">Precision Processing</h3>
            </div>
          </div>

          {/* 2 — Industrial Capacity */}
          <div className="group relative overflow-hidden rounded-2xl lg:col-span-2 lg:row-span-1">
            <SiteImage
              src={SITE_IMAGES.about.screen1}
              alt="Industrial facility capacity and steel yard"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-4 top-4 rounded-md bg-white/15 px-2.5 py-1 font-label-md text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              Scale
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-headline-md text-lg font-black text-white">Industrial Capacity</h3>
            </div>
          </div>

          {/* 3 — Corporate Culture */}
          <div className="group relative overflow-hidden rounded-2xl lg:col-span-1 lg:row-span-1">
            <SiteImage
              src={SITE_IMAGES.teamMember}
              alt="NRK team and corporate culture"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-primary/40" />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-xl text-white">handshake</span>
              </div>
              <div>
                <h3 className="mb-2 font-headline-md text-lg font-black text-white">Corporate Culture</h3>
                <p className="text-xs leading-relaxed text-white/75">
                  Built on a foundation of mutual respect, continuous learning, and uncompromising safety standards.
                </p>
              </div>
            </div>
          </div>

          {/* 4 — Logistics Hub */}
          <div className="group relative overflow-hidden rounded-2xl lg:col-span-1 lg:row-span-1">
            <SiteImage
              src={SITE_IMAGES.about.screen3}
              alt="Warehouse and logistics hub operations"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
            <span className="absolute left-4 top-4 rounded-md bg-white/15 px-2.5 py-1 font-label-md text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              Logistics
            </span>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
              <span className="material-symbols-outlined text-[40px] text-white/90 drop-shadow-md">warehouse</span>
              <span className="font-label-md text-[11px] font-black uppercase tracking-[0.2em] text-white">
                Logistics Hub
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
