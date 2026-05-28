"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import constructionAreaImage from "@/assests/constrution area.webp";
import { contactCopy } from "@/data/contact";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useHeroTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

const EYEBROW = contactCopy.eyebrow;
const TITLE_PARTS = {
  before: "Get in Touch with Our ",
  highlight: "Steel",
  after: " Experts",
} as const;
const SUMMARY =
  "Reach out for product queries, processing services, bulk sourcing, and project support — our team responds with practical steel solutions.";
const DESCRIPTION = contactCopy.description;
const BADGE = "Expert Support · Direct Sales Line";

export function ContactHero() {
  const heroRef = useRef<HTMLElement>(null);
  const mounted = useHasMounted();
  const [heroStep, setHeroStep] = useState(0);

  useHeroTypewriter(heroRef, mounted, ["contact-page"]);

  useEffect(() => {
    setHeroStep(0);
    if (!mounted) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setHeroStep(4);
      return;
    }

    const typeDuration =
      250 + (EYEBROW.length + TITLE_PARTS.before.length + TITLE_PARTS.highlight.length + TITLE_PARTS.after.length) * 42 + 180 + 200;

    const timers = [
      window.setTimeout(() => setHeroStep(1), typeDuration),
      window.setTimeout(() => setHeroStep(2), typeDuration + 220),
      window.setTimeout(() => setHeroStep(3), typeDuration + 440),
      window.setTimeout(() => setHeroStep(4), typeDuration + 660),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [mounted]);

  return (
    <section
      ref={heroRef}
      data-scroll-reveal="off"
      className="relative w-full overflow-hidden bg-primary"
    >
      <div className="absolute inset-0">
        <img
          src={constructionAreaImage.src}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/92 to-primary/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[255px] max-w-container-max flex-col justify-end px-gutter pb-9 pt-20 md:min-h-[315px] md:pb-12 md:pt-24">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm font-bold uppercase tracking-wider text-white/55"
        >
          <ol className="inline-flex list-none flex-wrap items-center gap-2 p-0">
            <li className="flex items-center gap-2">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </li>
            <li>
              <span className="text-white">Contact</span>
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl text-on-primary">
          <div className="mb-6" data-typewriter suppressHydrationWarning>
            <p className="font-label-md mb-3 min-h-[1.4em] text-sm font-black uppercase tracking-[0.18em] text-primary-fixed-dim md:text-base">
              <span data-typewriter-line data-typewriter-text={EYEBROW} suppressHydrationWarning>
                {EYEBROW}
              </span>
            </p>
            <div
              className={cn(
                "h-px w-full max-w-[420px] bg-gradient-to-r from-secondary-fixed via-white/30 to-transparent transition-all duration-700",
                !mounted || heroStep >= 1 ? "opacity-100" : "opacity-0",
              )}
            />

            <h1 className="font-display mb-5 text-[32px] font-black uppercase leading-[0.98] tracking-[-0.055em] text-white sm:text-[40px] md:text-[48px] lg:text-[64px] xl:text-[76px]">
              <span data-typewriter-line data-typewriter-text={TITLE_PARTS.before} suppressHydrationWarning>
                {TITLE_PARTS.before}
              </span>
              <span
                data-typewriter-line
                data-typewriter-text={TITLE_PARTS.highlight}
                className="text-orange-400"
                suppressHydrationWarning
              >
                {TITLE_PARTS.highlight}
              </span>
              <span data-typewriter-line data-typewriter-text={TITLE_PARTS.after} suppressHydrationWarning>
                {TITLE_PARTS.after}
              </span>
              <span
                className="ml-1 inline-block h-[0.82em] w-[0.08em] animate-pulse bg-primary-fixed-dim align-[-0.08em]"
                data-typewriter-cursor
              />
            </h1>
          </div>

          <p
            className={cn(
              "font-body-lg mb-4 max-w-2xl text-base leading-relaxed text-surface-variant/90 transition-all duration-700 md:text-lg",
              !mounted || heroStep >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            {SUMMARY}
          </p>
          <p
            className={cn(
              "font-body-md max-w-2xl text-sm leading-relaxed text-white/75 line-clamp-2 transition-all duration-700 md:text-base",
              !mounted || heroStep >= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            {DESCRIPTION}
          </p>

          <div
            className={cn(
              "mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-700",
              !mounted || heroStep >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <span className="material-symbols-outlined text-base text-primary-fixed-dim">support_agent</span>
            {BADGE}
          </div>
        </div>
      </div>
    </section>
  );
}
