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
            className="h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-60"
            src="/assests/banner_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={SITE_IMAGES.construction}
            aria-label="NRK Iron & Steel facility video tour"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
              <span className="material-symbols-outlined translate-x-0.5 text-[40px] text-white">play_arrow</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/15">
            <div className="h-full w-1/3 bg-secondary-fixed" />
          </div>
        </div>
      </div>
    </section>
  );
}
