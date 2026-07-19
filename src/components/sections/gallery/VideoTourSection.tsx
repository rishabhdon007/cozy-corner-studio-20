"use client";

import { SiteImage } from "@/components/site/SiteImage";
import { SITE_IMAGES } from "@/lib/siteImages";

export function VideoTourSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <SiteImage
          src={SITE_IMAGES.construction}
          alt=""
          fill
          sizes="100vw"
          className="opacity-20"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-container-max px-gutter">
        <div data-scroll-reveal="top" className="mx-auto mb-10 max-w-2xl text-center">
          <span className="font-label-md mb-2 inline-block text-[10px] font-black uppercase tracking-[0.22em] text-secondary-fixed">
            Virtual Tour
          </span>
          <h2 className="font-display text-3xl font-black text-white md:text-4xl">Facility Video Tour</h2>
          <p className="mt-2 text-sm leading-relaxed text-surface-variant/85 md:text-base">
            Experience the power and precision of our production lines in motion.
          </p>
        </div>

        <div
          data-scroll-reveal="top"
          data-scroll-reveal-delay="2"
          className="group relative mx-auto aspect-video max-w-4xl cursor-pointer overflow-hidden rounded-[2rem] border border-white/15 bg-black shadow-2xl shadow-black/30"
        >
          <video
            className="absolute top-1/2 left-1/2 w-[56.25%] h-[177.77%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-90 object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-60"
            src="/Gallary/ofc_tour.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={SITE_IMAGES.construction}
            aria-label="NRK Iron & Steel facility video tour"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

        </div>
      </div>
    </section>
  );
}
