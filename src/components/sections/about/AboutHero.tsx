"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SiteImage } from "@/components/site/SiteImage";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useHeroTypewriter } from "@/hooks/useTypewriter";
import { SITE_IMAGES } from "@/lib/siteImages";
import { cn } from "@/lib/utils";

import db from "@/data/db.json";
import { useSiteData } from "@/hooks/useSiteData";

export function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  const mounted = useHasMounted();
  const [heroStep, setHeroStep] = useState(0);

  const aboutData = useSiteData("about", db.published.about);

  const titleText = `${aboutData.titleBefore}${aboutData.titleHighlight}${aboutData.titleAfter}`;

  useHeroTypewriter(heroRef, mounted, ["about-page"]);

  useEffect(() => {
    setHeroStep(0);
    if (!mounted) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) { setHeroStep(2); return; }

    const typeDuration = 250 + (aboutData.eyebrow.length + titleText.length) * 42 + 180 + 200;

    const timers = [
      window.setTimeout(() => setHeroStep(1), typeDuration),
      window.setTimeout(() => setHeroStep(2), typeDuration + 220),
    ];

    return () => { timers.forEach(clearTimeout); };
  }, [mounted, aboutData.eyebrow, titleText]);

  return (
    <section
      ref={heroRef}
      data-scroll-reveal="off"
      className="relative w-full overflow-hidden bg-primary"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {aboutData.image && aboutData.image.endsWith(".mp4") ? (
          <video
            src={aboutData.image}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-35"
            aria-hidden
          />
        ) : (
          aboutData.image && (
            <img
              src={aboutData.image}
              alt=""
              className="h-full w-full object-cover opacity-35"
              aria-hidden
            />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/92 to-primary/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-container-max flex-col justify-end px-gutter pb-0 pt-24 md:pt-28">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm font-bold uppercase tracking-wider text-white/55">
          <ol className="inline-flex list-none flex-wrap items-center gap-2 p-0">
            <li className="flex items-center gap-2">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </li>
            <li><span className="text-white">About Us</span></li>
          </ol>
        </nav>

        {/* Hero text */}
        <div className="max-w-3xl text-on-primary">
          <div className="mb-5" data-typewriter suppressHydrationWarning>
            <p className="font-label-md mb-3 min-h-[1.4em] text-sm font-black uppercase tracking-[0.18em] text-primary-fixed-dim md:text-base">
              <span data-typewriter-line data-typewriter-text={aboutData.eyebrow} suppressHydrationWarning>
                {aboutData.eyebrow}
              </span>
            </p>
            <div className={cn(
              "h-px w-full max-w-[420px] bg-gradient-to-r from-secondary-fixed via-white/30 to-transparent transition-all duration-700",
              !mounted || heroStep >= 1 ? "opacity-100" : "opacity-0",
            )} />
            <h1 className="font-display mb-4 text-[32px] font-black uppercase leading-[0.98] tracking-[-0.055em] text-white sm:text-[40px] md:text-[48px] lg:text-[64px] xl:text-[76px]">
              <span data-typewriter-line data-typewriter-text={aboutData.titleBefore} suppressHydrationWarning>{aboutData.titleBefore}</span>
              <span data-typewriter-line data-typewriter-text={aboutData.titleHighlight} className="text-orange-400" suppressHydrationWarning>{aboutData.titleHighlight}</span>
              <span data-typewriter-line data-typewriter-text={aboutData.titleAfter} suppressHydrationWarning>{aboutData.titleAfter}</span>
              <span className="ml-1 inline-block h-[0.82em] w-[0.08em] animate-pulse bg-primary-fixed-dim align-[-0.08em]" data-typewriter-cursor />
            </h1>
          </div>

          <p className={cn(
            "font-body-lg mb-8 max-w-2xl text-base leading-relaxed text-surface-variant/90 transition-all duration-700 md:text-lg",
            !mounted || heroStep >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}>
            {aboutData.summary}
          </p>
        </div>

        {/* Bottom fade into page */}
        <div className="h-10 bg-gradient-to-b from-white/5 to-transparent" />
      </div>
    </section>
  );
}
