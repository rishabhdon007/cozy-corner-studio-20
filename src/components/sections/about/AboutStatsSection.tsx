"use client";

import { useEffect, useRef } from "react";

import { initCountUps } from "@/countUpDom";
import { useHasMounted } from "@/hooks/useHasMounted";

const stats = [
  {
    icon: "history",
    value: "30+",
    title: "Years of Excellence",
    description: "Founded by Mr. Nimesh Kothari in 1994, growing from a one-man operation into Central India's foremost steel trading firm.",
    accent: "from-amber-500 to-orange-500",
  },
  {
    icon: "factory",
    value: "4",
    title: "Strategic Hubs",
    description:
      "Offices in Indore (HQ), Mumbai, Gujarat, and Bokaro — ensuring nationwide reach across 5 major states.",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    icon: "handshake",
    value: "10k+",
    title: "Projects Empowered",
    description: "Serving bulk quantities across MP, Gujarat, Maharashtra, Rajasthan & Punjab with CTL machines, cranes, and annealing furnaces.",
    accent: "from-emerald-500 to-teal-500",
  },
];

export function AboutStatsSection() {
  const ref = useRef<HTMLElement>(null);
  const mounted = useHasMounted();

  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;
    return initCountUps(el);
  }, [mounted]);

  return (
    <section ref={ref} className="relative bg-white py-16 md:py-20">
      {/* Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-container-max px-gutter">
        {/* Stats Cards */}
        <div className="relative z-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              data-scroll-reveal=""
              style={{ "--scroll-reveal-delay": `${index * 100}` } as React.CSSProperties}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-300/50"
            >
              {/* Decorative gradient blob */}
              <div
                className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${stat.accent} opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150`}
              />

              {/* Top accent line */}
              <div
                className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${stat.accent}`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.accent} text-white shadow-lg`}
                >
                  <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                </div>

                {/* Value */}
                <div
                  className="mb-2 font-display text-5xl font-black tracking-tight text-gray-900 md:text-6xl"
                  data-count-up={stat.value}
                >
                  {stat.value}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg font-bold text-gray-900">{stat.title}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-600">{stat.description}</p>

                {/* Bottom decorative element */}
                <div className="mt-6 flex items-center gap-2">
                  <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${stat.accent}`} />
                  <div className={`h-1 w-4 rounded-full bg-gradient-to-r ${stat.accent} opacity-50`} />
                  <div className={`h-1 w-2 rounded-full bg-gradient-to-r ${stat.accent} opacity-25`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators Row */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-gray-100 pt-12 md:gap-16">
          <div className="flex items-center gap-3 text-gray-500">
            <span className="material-symbols-outlined text-2xl text-secondary">verified</span>
            <span className="text-sm font-semibold">ISO Certified</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <span className="material-symbols-outlined text-2xl text-secondary">workspace_premium</span>
            <span className="text-sm font-semibold">TATA, JSW, AM/NS Partner</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <span className="material-symbols-outlined text-2xl text-secondary">security</span>
            <span className="text-sm font-semibold">Mill Test Certified</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <span className="material-symbols-outlined text-2xl text-secondary">local_shipping</span>
            <span className="text-sm font-semibold">Pan-India Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
