"use client";

import { useState } from "react";

const VISION_QUOTES = [
  {
    quote:
      "To become the best steel supplier in the upcoming years — supplying quality steel products and services with cost-effective solutions, professional operations, and genuine business ethics.",
    attribution: "NRK Iron & Steel — Vision Statement",
  },
  {
    quote:
      "To ensure complete customer satisfaction by providing the best rates among competitors, delivering materials on commitment, and helping customers at every stage of their journey.",
    attribution: "NRK Iron & Steel — Customer Promise",
  },
  {
    quote:
      "To promote entrepreneurship and innovation, ensure full utilization of resources, and follow effective eco-friendly procedures — achieving business excellence as a steel supermarket.",
    attribution: "NRK Iron & Steel — Mission",
  },
] as const;

export function NrkVisionCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = VISION_QUOTES[activeIndex];

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-container-max px-gutter">
        <div
          data-scroll-reveal="top"
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#071629] via-[#0c233a] to-[#040e1b] px-8 py-12 text-white shadow-2xl md:px-16 md:py-16"
        >
          {/* Subtle dot grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Large decorative icon */}
          <span className="material-symbols-outlined pointer-events-none absolute -bottom-6 -right-6 select-none text-[180px] text-white/5">
            visibility
          </span>

          <div className="relative z-10 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Left — label + icon */}
            <div className="flex shrink-0 flex-col items-start gap-4 lg:w-48">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-inner backdrop-blur-sm">
                <span className="material-symbols-outlined text-3xl text-secondary-fixed">visibility</span>
              </div>
              <div>
                <span className="font-label-md block text-[10px] font-black uppercase tracking-[0.24em] text-white/40">
                  NRK Vision
                </span>
                <span className="font-label-md mt-1 block text-xs font-bold text-secondary-fixed">
                  {activeIndex + 1} / {VISION_QUOTES.length}
                </span>
              </div>
            </div>

            {/* Right — quote */}
            <div className="flex-1">
              {/* Opening quote mark */}
              <div className="mb-4 font-display text-6xl font-black leading-none text-white/15 select-none">"</div>

              <blockquote
                key={activeIndex}
                className="font-display mb-6 text-xl font-black leading-snug tracking-tight text-white md:text-2xl lg:text-3xl"
              >
                {active.quote}
              </blockquote>

              <p className="font-label-md text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                — {active.attribution}
              </p>

              {/* Dot indicators */}
              <div className="mt-8 flex items-center gap-2">
                {VISION_QUOTES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`cursor-pointer rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "h-1 w-8 bg-secondary-fixed opacity-100"
                        : "h-1.5 w-1.5 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`View vision statement ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
