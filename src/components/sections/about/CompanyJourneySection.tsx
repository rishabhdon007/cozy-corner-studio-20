"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import companyLogo from "@/assests/company_logo.png";

const milestones = [
  {
    year: "1994",
    title: "Founded",
    description:
      "Established with a vision to provide premium structural steel solutions for the burgeoning infrastructure sector in Central India.",
    icon: "foundation",
    accent: "primary",
  },
  {
    year: "2005",
    title: "Growth & Expansion",
    description:
      "Rapid scaling of warehousing capabilities and establishing direct procurement networks with major national steel producers.",
    icon: "trending_up",
    accent: "secondary",
  },
  {
    year: "2015",
    title: "ISO 9001 Certification",
    description:
      "Formalising our commitment to operational excellence and quality management systems across trading and delivery operations.",
    icon: "verified",
    accent: "emerald",
  },
] as const;

type Accent = "primary" | "secondary" | "emerald";

const accentMap: Record<Accent, { dot: string; border: string; year: string; icon: string }> = {
  primary:   { dot: "bg-primary",     border: "border-l-primary",    year: "text-primary",    icon: "text-white" },
  secondary: { dot: "bg-secondary",   border: "border-l-secondary",  year: "text-secondary",  icon: "text-white" },
  emerald:   { dot: "bg-emerald-600", border: "border-l-emerald-600",year: "text-emerald-600",icon: "text-white" },
};

/* ── Ink seal — background watermark, auto-rotates ── */
function NrkSeal() {
  const S = 260;
  const cx = 130, cy = 130;
  const rOuter = 118, rInner = 105, rDash = 111, rText = 96;

  return (
    <div
      className="pointer-events-none select-none"
      style={{ width: S, height: S, animation: "sealSpin 28s linear infinite" }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${S} ${S}`} width={S} height={S}>
        <defs>
          <path id="sealTop" d={`M ${cx - rText},${cy} A ${rText},${rText} 0 0,1 ${cx + rText},${cy}`} />
          <path id="sealBot" d={`M ${cx - rText},${cy} A ${rText},${rText} 0 0,0 ${cx + rText},${cy}`} />
          <filter id="sealInk" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" seed="8" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
            <feComposite operator="in" in="grey" in2="SourceGraphic" result="masked" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="sealBlur">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>
        <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="#1e3a58" strokeWidth="2.5" opacity="0.80" filter="url(#sealInk)" />
        <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="#1e3a58" strokeWidth="1.2" opacity="0.60" filter="url(#sealInk)" />
        <circle cx={cx} cy={cy} r={rDash} fill="none" stroke="#1e3a58" strokeWidth="0.9" strokeDasharray="4 5" opacity="0.45" filter="url(#sealInk)" />
        <text fontFamily="'Arial Black', Arial, sans-serif" fontSize="13" fontWeight="900" letterSpacing="4" fill="#1e3a58" opacity="0.85" filter="url(#sealInk)">
          <textPath href="#sealTop" startOffset="50%" textAnchor="middle">NRK IRON &amp; STEEL</textPath>
        </text>
        <text fontFamily="'Arial Black', Arial, sans-serif" fontSize="10" fontWeight="800" letterSpacing="3" fill="#1e3a58" opacity="0.70" filter="url(#sealInk)">
          <textPath href="#sealBot" startOffset="50%" textAnchor="middle">EST. 1994 · INDORE, M.P.</textPath>
        </text>
        {[0, 180].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = cx + rText * Math.cos(rad - Math.PI / 2);
          const y = cy + rText * Math.sin(rad - Math.PI / 2);
          return (
            <text key={deg} x={x} y={y + 4} textAnchor="middle" fontSize="7" fill="#1e3a58" opacity="0.55" filter="url(#sealBlur)">✦</text>
          );
        })}
        <circle cx={cx} cy={cy} r={52} fill="none" stroke="#1e3a58" strokeWidth="0.8" opacity="0.35" filter="url(#sealInk)" />
        <image href={companyLogo.src} x={cx - 34} y={cy - 34} width={68} height={68} opacity="0.55"
          style={{ filter: "grayscale(1) brightness(0.25) contrast(1.4)" }} />
        <line x1={cx - 42} y1={cy} x2={cx + 42} y2={cy} stroke="#1e3a58" strokeWidth="0.5" opacity="0.20" />
        <line x1={cx} y1={cy - 42} x2={cx} y2={cy + 42} stroke="#1e3a58" strokeWidth="0.5" opacity="0.20" />
      </svg>
    </div>
  );
}

/* ── Animated counter that runs once when element enters the viewport ── */
function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    setCount(0);
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return { count, ref };
}

/* ── Individual stat with animated counter ── */
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-start">
      <div className="font-display text-4xl font-black tabular-nums text-primary md:text-5xl">
        {count}
        <span>{suffix}</span>
      </div>
      <div className="mt-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70">
        {label}
      </div>
    </div>
  );
}

export function CompanyJourneySection() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#dfe9f5" }} data-scroll-reveal-section>
      <div className="mx-auto max-w-container-max px-gutter">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:items-start">

          {/* LEFT — text */}
          <div data-scroll-reveal="left" className="relative lg:sticky lg:top-28">

            {/* Ink seal — absolute background watermark */}
            <div className="pointer-events-none absolute -left-10 top-0 opacity-[0.13]" aria-hidden="true">
              <NrkSeal />
            </div>

            <span className="mb-4 inline-block font-label-md text-[11px] font-black uppercase tracking-[0.22em] text-secondary">
              Who We Are
            </span>
            <h2 className="font-display mb-6 text-4xl font-black uppercase leading-tight tracking-tight text-primary md:text-5xl">
              Our Legacy
            </h2>

            <p className="font-body mb-6 text-base leading-relaxed text-on-surface-variant md:text-lg">
              For over three decades, NRK Iron &amp; Steel has stood as a pillar of industry in
              the steel sector. Steel began as a focused trading operation that evolved into a
              comprehensive institutional supplier underpinned by an unwavering commitment to
              quality and scale.
            </p>
            <p className="font-body text-sm leading-relaxed text-on-surface-variant/75">
              Today, from our headquarters in Indore, we serve clients across construction,
              manufacturing, and heavy infrastructure — supplying certified steel from TATA, JSW,
              and AM/NS with precision processing and pan-India logistics.
            </p>

            {/* ── Animated stats ── */}
            <div className="relative mt-10 overflow-hidden rounded-2xl border border-primary/20 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
              {/* Subtle top accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary via-secondary to-primary/40" />
              <div className="grid grid-cols-3 divide-x divide-outline-variant/30">
                <div className="pr-4">
                  <AnimatedStat value={30} suffix="+" label="Years of Trust" />
                </div>
                <div className="px-4">
                  <AnimatedStat value={10} suffix="k+" label="Projects Served" />
                </div>
                <div className="pl-4">
                  <AnimatedStat value={4} suffix="" label="Strategic Hubs" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — vertical timeline */}
          <div className="relative" data-scroll-reveal="right">
            {/* Vertical track line */}
            <div className="absolute left-5 top-3 h-[calc(100%-3rem)] w-0.5 bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const a = accentMap[milestone.accent];
                return (
                  <div
                    key={milestone.year}
                    className="relative flex gap-5"
                    data-scroll-reveal=""
                    data-scroll-reveal-delay={String(index + 1)}
                  >
                    {/* Timeline dot */}
                    <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${a.dot} shadow-lg ring-4 ring-[#dfe9f5]`}>
                      <span className={`material-symbols-outlined text-base ${a.icon}`}>{milestone.icon}</span>
                    </div>

                    {/* Card */}
                    <div className={`group flex-1 overflow-hidden rounded-2xl border border-outline-variant/25 border-l-[3px] ${a.border} bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:bg-white`}>
                      {/* Year badge */}
                      <div className="mb-2 flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.18em] ${a.year} bg-current/5 ring-1 ring-current/20`}
                          style={{ backgroundColor: "transparent" }}>
                          <span className={`${a.year} font-black`}>{milestone.year}</span>
                        </span>
                        {/* Subtle rule */}
                        <div className="h-px flex-1 bg-outline-variant/20" />
                      </div>

                      <h3 className={`mb-1.5 font-headline-md text-base font-bold ${a.year}`}>
                        {milestone.title}
                      </h3>
                      <p className="font-body-md text-sm leading-relaxed text-on-surface-variant/80">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
