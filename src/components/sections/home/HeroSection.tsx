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
      className="relative w-full min-h-screen bg-primary overflow-hidden reveal pb-16"
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          suppressHydrationWarning
          className="w-full h-full object-cover opacity-45"
        >
          <source src="/homepage_banner_bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
      </div>
      <div className="relative max-w-container-max mx-auto px-gutter min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        <div className="text-on-primary">
          <div className="mb-7">
            <p
              className="font-label-md text-sm md:text-base text-white font-black tracking-tight mb-3 min-h-[1.6em]"
              data-typewriter-loop
              data-typewriter-text="India's Trusted Steel Distribution & Processing Partner"
              data-typewriter-highlight="Trusted"
              suppressHydrationWarning
            >
              <span data-typewriter-output suppressHydrationWarning>
                {!mounted ? (
                  <>
                    India&apos;s <span className="text-orange-400">Trusted</span> Steel Distribution
                    &amp; Processing Partner
                  </>
                ) : null}
              </span>
              <span
                className="inline-block w-[0.08em] h-[0.9em] ml-1 bg-orange-400 animate-pulse align-[-0.08em]"
                data-typewriter-cursor
              />
            </p>
            <div className="h-px w-full max-w-[420px] bg-gradient-to-r from-secondary-fixed via-white/30 to-transparent" />
          </div>
          <h1
            className="font-display text-[54px] md:text-[82px] lg:text-[92px] font-black leading-[0.98] mb-7 tracking-[-0.055em]"
            data-typewriter
          >
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
              className="inline-block w-[0.08em] h-[0.82em] ml-2 bg-primary-fixed-dim animate-pulse align-[-0.08em]"
              data-typewriter-cursor
            />
          </h1>
          <p className="font-body-lg text-lg md:text-xl text-surface-variant/90 max-w-2xl mb-9 leading-relaxed">
            Ready stock, precision processing, transparent pricing, and direct site delivery for
            industrial buyers across India.
          </p>
          <HeroCtaGroup
            primary={{ href: "/contact", label: "Get Free Quote" }}
            secondary={{ href: "/services", label: "Explore Services", icon: "design_services" }}
          />
        </div>

        <div className="relative hidden lg:flex justify-center">
          <div className="relative w-full max-w-[430px] rounded-[28px] border border-white/15 bg-white/10 backdrop-blur-xl p-7 shadow-2xl shadow-black/30">
            <div className="live-status-badge absolute -top-5 right-8 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-[10px] font-black tracking-[0.16em] uppercase text-white backdrop-blur-md">
              <span className="live-status-dot" aria-hidden="true">
                <span className="live-status-dot-core" />
              </span>
              Active Stock &amp; Dispatch Support
            </div>
            <div className="mb-8 flex items-end justify-between border-b border-white/15 pb-6">
              <div>
                <p className="font-label-md text-primary-fixed-dim mb-2">Annual Reach</p>
                <p
                  className="font-headline-lg text-[44px] leading-none text-white font-black"
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
                    <h3 className="font-headline-md text-white text-base mb-1">{feature.title}</h3>
                    <p className="font-body-md text-sm text-surface-variant/70">
                      {feature.description}
                    </p>
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
