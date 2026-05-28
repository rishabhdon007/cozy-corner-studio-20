"use client";

import { useRef } from "react";

import { useHasMounted } from "@/hooks/useHasMounted";
import { useCountUp } from "@/hooks/useCountUp";

const STATS = [
  {
    value: "3+",
    label: "Decades Experience",
    description:
      "Since 1992, delivering trusted steel solutions nationwide with excellence.",
    icon: "workspace_premium",
  },
  {
    value: "4000+",
    label: "Annual Reach",
    description:
      "Serving 4000+ clients yearly across diverse industries nationwide with reliability.",
    icon: "public",
  },
  {
    value: "70%",
    label: "Retention Rate",
    description:
      "Maintaining 70% loyal customers through unmatched quality and service.",
    icon: "handshake",
  },
] as const;

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useHasMounted();
  useCountUp(sectionRef, mounted);

  return (
    <section
      ref={sectionRef}
      data-scroll-reveal="off"
      className="relative z-20 -mt-24 bg-transparent px-gutter pb-12 reveal"
    >
      <div className="max-w-container-max mx-auto rounded-[32px] bg-white/95 p-4 md:p-6 shadow-2xl shadow-primary/10 ring-1 ring-outline-variant/40 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-primary text-on-primary p-7 rounded-[22px] min-h-[170px] flex flex-col items-center justify-center text-center shadow-lg shadow-primary/15 border border-white/10 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute -right-5 -bottom-5 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined material-symbols-filled text-8xl">
                  {stat.icon}
                </span>
              </div>
              <h3
                className="font-headline-lg text-headline-lg mb-2 z-10"
                data-count-up={stat.value}
              >
                {stat.value}
              </h3>
              <p className="font-label-md text-label-md text-primary-fixed-dim z-10">
                {stat.label}
              </p>
              <p className="font-body-md text-body-md mt-2 text-sm text-surface-variant opacity-80 z-10">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
