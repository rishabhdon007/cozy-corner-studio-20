"use client";

import { useRef } from "react";

import { HeroCtaGroup } from "@/components/site/HeroCtaGroup";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useCountUp } from "@/hooks/useCountUp";
import { useHeroTypewriter, useLoopingTaglineTypewriter } from "@/hooks/useTypewriter";

const DISPATCH_FEATURES = [
  {
    icon: "inventory_2",
    title: "Ready Stock Availability",
    description:
      "Material availability that helps buyers move without uncertain delays.",
  },
  {
    icon: "precision_manufacturing",
    title: "Precision Processing",
    description:
      "Slitting, cut-to-length, profiling, and packaging for project-fit supply.",
  },
  {
    icon: "local_shipping",
    title: "Direct Site Delivery",
    description: "Coordinated dispatch support aligned to your project timelines.",
  },
] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useHasMounted();
  useHeroTypewriter(sectionRef, mounted);
  useLoopingTaglineTypewriter(sectionRef, mounted);
  useCountUp(sectionRef, mounted);

  return (
    <section
      ref={sectionRef}
      data-scroll-reveal="off"
      className="relative w-full min-h-screen overflow-hidden bg-primary pb-16"
    >
      <div className="absolute inset-0 z-0 h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          suppressHydrationWarning
          className="h-full w-full object-cover opacity-45"
        >
          <source src="/homepage_banner_bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-container-max grid-cols-1 items-center gap-12 px-gutter py-20 md:grid-cols-2 md:gap-10 md:py-16 lg:min-h-screen lg:gap-12 lg:py-20">
        <div className="text-on-primary">
          <div className="mb-7">
            <p
              className="font-label-md mb-3 min-h-[1.6em] text-sm font-black tracking-tight text-white md:text-base"
              data-typewriter-loop
              data-typewriter-text="India's Trusted Steel Distribution & Processing Partner"
              data-typewriter-highlight="Trusted"
              suppressHydrationWarning
            >
              <span data-typewriter-output suppressHydrationWarning>
                India&apos;s <span className="text-orange-400">Trusted</span> Steel Distribution
                &amp; Processing Partner
              </span>
              <span
                className="inline-block h-[0.9em] w-[0.08em] ml-1 animate-pulse bg-orange-400 align-[-0.08em]"
                data-typewriter-cursor
              />
            </p>
            <div className="h-px w-full max-w-[420px] bg-gradient-to-r from-secondary-fixed via-white/30 to-transparent" />
          </div>

          <h1 className="font-display mb-7 text-[34px] font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-[44px] md:text-[56px] lg:text-[72px] xl:text-[92px]" data-typewriter>
            <span data-typewriter-line data-typewriter-text="You build the">
              You build the
            </span>
            <br />
            <span data-typewriter-line data-typewriter-text="landmarks.">
              landmarks.
            </span>
            <br />
            <span
              className="text-primary-fixed-dim"
              data-typewriter-line
              data-typewriter-text="We deliver the steel."
            >
              We deliver the steel.
            </span>
            <span
              className="ml-2 inline-block h-[0.82em] w-[0.08em] animate-pulse bg-primary-fixed-dim align-[-0.08em]"
              data-typewriter-cursor
            />
          </h1>

          <p className="font-body-lg mb-9 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            Ready stock, precision processing, transparent pricing, and direct site delivery for
            industrial buyers across India.
          </p>

          <HeroCtaGroup
            primary={{ href: "/contact", label: "Get Free Quote" }}
            secondary={{ href: "/services", label: "Explore Services", icon: "design_services" }}
          />
        </div>

        <div className="relative hidden justify-center md:flex">
          <div className="relative w-full max-w-[380px] rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl lg:max-w-[430px] lg:p-7">
            <div className="live-status-badge absolute -top-5 right-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
              <span className="live-status-dot" aria-hidden="true">
                <span className="live-status-dot-core" />
              </span>
              Active Stock &amp; Dispatch Support
            </div>
            <div className="mb-8 flex items-end justify-between border-b border-white/15 pb-6">
              <div>
                <p className="font-label-md mb-2 text-primary-fixed-dim">Annual Reach</p>
                <p
                  className="font-headline-lg text-[44px] font-black leading-none text-white"
                  data-count-up="4000+"
                >
                  4000+
                </p>
              </div>
              <span className="material-symbols-outlined text-5xl text-white/20">factory</span>
            </div>
            <div className="space-y-5">
              {DISPATCH_FEATURES.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary-fixed-dim">
                    <span className="material-symbols-outlined">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md mb-1 text-base text-white">{feature.title}</h3>
                    <p className="font-body-md text-sm text-white/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
