"use client";

import Image, { type StaticImageData } from "next/image";
import { memo, type RefObject, useEffect, useRef, useState } from "react";

import journey1994Image from "@/assests/aboutus/screen.png";
import journey2005Image from "@/assests/aboutus/screen 2.png";
import journey2015Image from "@/assests/aboutus/screen 3.png";
import companyLogo from "@/assests/company_logo.png";
import { useHeroTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: string;
  image: StaticImageData;
  accent: "primary" | "secondary" | "emerald";
};

const milestones: Milestone[] = [
  {
    year: "1994",
    title: "Founded",
    description:
      "Established with a vision to provide premium structural steel solutions for the burgeoning infrastructure sector in Central India.",
    icon: "foundation",
    image: journey1994Image,
    accent: "primary",
  },
  {
    year: "2005",
    title: "Growth & Expansion",
    description:
      "Rapid scaling of warehousing capabilities and establishing direct procurement networks with major national steel producers.",
    icon: "trending_up",
    image: journey2005Image,
    accent: "secondary",
  },
  {
    year: "2015",
    title: "ISO 9001 Certification",
    description:
      "Formalising our commitment to operational excellence and quality management systems across trading and delivery operations.",
    icon: "verified",
    image: journey2015Image,
    accent: "emerald",
  },
];

const accentMap: Record<
  Milestone["accent"],
  {
    bg: string;
    text: string;
    ring: string;
  }
> = {
  primary: {
    bg: "bg-primary",
    text: "text-primary",
    ring: "ring-primary/20",
  },
  secondary: {
    bg: "bg-orange-500",
    text: "text-orange-600",
    ring: "ring-orange-500/20",
  },
  emerald: {
    bg: "bg-emerald-600",
    text: "text-emerald-700",
    ring: "ring-emerald-600/20",
  },
};

const legacyLines = [
  "For over three decades, NRK Iron & Steel has stood as a pillar of industry in the steel sector.",
  "Steel began as a focused trading operation that evolved into a comprehensive institutional supplier underpinned by an unwavering commitment to quality and scale.",
  "Today, from our headquarters in Indore, we serve clients across construction, manufacturing, and heavy infrastructure.",
  "Supplying certified steel from TATA, JSW, and AM/NS with precision processing and pan-India logistics.",
] as const;

function useScrollMilestone(total: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || total <= 1) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollableDistance = Math.max(rect.height - viewportHeight, 1);
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 0.999);
      const nextIndex = Math.min(total - 1, Math.floor(progress * total));

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [total]);

  return { sectionRef, activeIndex };
}

function useSectionIntro(sectionRef: RefObject<HTMLElement | null>) {
  const [isIntroActive, setIsIntroActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsIntroActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsIntroActive(true);
        observer.disconnect();
      },
      { rootMargin: "-18% 0px -35% 0px", threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  return isIntroActive;
}

/* Ink seal — background watermark, auto-rotates */
function NrkSeal() {
  const S = 260;
  const cx = 130;
  const cy = 130;
  const rOuter = 118;
  const rInner = 105;
  const rDash = 111;
  const rText = 96;

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
        <image
          href={companyLogo.src}
          x={cx - 34}
          y={cy - 34}
          width={68}
          height={68}
          opacity="0.55"
          style={{ filter: "grayscale(1) brightness(0.25) contrast(1.4)" }}
        />
        <line x1={cx - 42} y1={cy} x2={cx + 42} y2={cy} stroke="#1e3a58" strokeWidth="0.5" opacity="0.20" />
        <line x1={cx} y1={cy - 42} x2={cx} y2={cy + 42} stroke="#1e3a58" strokeWidth="0.5" opacity="0.20" />
      </svg>
    </div>
  );
}

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
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
    const timer = window.setInterval(() => {
      step++;
      setCount(Math.round((target * step) / steps));
      if (step >= steps) window.clearInterval(timer);
    }, interval);
    return () => window.clearInterval(timer);
  }, [active, target, duration]);

  return { count, ref };
}

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

function JourneyStage({ activeIndex }: { activeIndex: number }) {
  const activeMilestone = milestones[activeIndex];
  const activeAccent = accentMap[activeMilestone.accent];

  return (
    <div className="relative rounded-[30px] border border-white/55 bg-white/50 p-4 shadow-2xl shadow-primary/12 backdrop-blur-sm">
      <div className="mb-5 rounded-[22px] border border-primary/10 bg-white/80 p-4 shadow-sm">
        <div className="flex items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-4">
            <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-black text-white shadow-lg ring-4", activeAccent.bg, activeAccent.ring)}>
              {activeIndex + 1}
            </span>
            <div className="min-w-0">
              <p className={cn("font-display text-4xl font-black tabular-nums leading-none transition-colors duration-500", activeAccent.text)}>
                {activeMilestone.year}
              </p>
              <p className="mt-1 truncate text-[11px] font-black uppercase tracking-[0.18em] text-on-surface-variant/70">
                {activeMilestone.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2" aria-label={`Milestone ${activeIndex + 1} of ${milestones.length}`}>
            {milestones.map((milestone, index) => {
              const accent = accentMap[milestone.accent];

              return (
                <span
                  key={milestone.year}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-500",
                    activeIndex === index ? `w-8 ${accent.bg}` : "w-2.5 bg-primary/18",
                  )}
                  aria-hidden="true"
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative h-[360px] overflow-hidden rounded-[26px] border border-white/70 bg-primary shadow-xl shadow-primary/16">
        {milestones.map((milestone, index) => (
          <Image
            key={milestone.year}
            src={milestone.image}
            alt={`${milestone.title} milestone`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={index === 0}
            className={cn(
              "object-cover transition-all duration-700 ease-out",
              activeIndex === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
          />
        ))}
      </div>

      <div className="relative mt-5 min-h-[236px] rounded-[24px] border border-primary/10 bg-white/92 p-6 shadow-xl shadow-primary/10">
        {milestones.map((milestone, index) => {
          const accent = accentMap[milestone.accent];

          return (
            <article
              key={milestone.year}
              className={cn(
                "absolute inset-6 flex flex-col justify-between transition-all duration-500 ease-out",
                activeIndex === index
                  ? "translate-y-0 opacity-100"
                  : index < activeIndex
                    ? "-translate-y-6 opacity-0"
                    : "translate-y-6 opacity-0",
              )}
              aria-hidden={activeIndex !== index}
            >
              <div>
                <div className="mb-4 flex items-start gap-4">
                  <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-lg", accent.bg)}>
                    <span className="material-symbols-outlined text-[22px]">{milestone.icon}</span>
                  </span>
                  <div>
                    <p className={cn("text-sm font-black uppercase tracking-[0.2em]", accent.text)}>
                      {milestone.year}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-black uppercase leading-tight text-primary">
                      {milestone.title}
                    </h3>
                  </div>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-on-surface-variant md:text-base">
                  {milestone.description}
                </p>
              </div>
            </article>
          );
        })}

        <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
          {milestones.map((milestone, index) => {
            const accent = accentMap[milestone.accent];

            return (
              <span
                key={milestone.year}
                className={cn(
                  "h-1.5 rounded-full transition-colors duration-300",
                  activeIndex === index ? accent.bg : "bg-primary/12",
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileMilestones() {
  return (
    <div className="space-y-6 lg:hidden">
      {milestones.map((milestone) => {
        const accent = accentMap[milestone.accent];

        return (
          <article
            key={milestone.year}
            className="overflow-hidden rounded-[24px] border border-white/60 bg-white/90 shadow-lg shadow-primary/10"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-primary">
              <Image
                src={milestone.image}
                alt={`${milestone.title} milestone`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <div className="mb-4 flex items-start gap-3">
                <span className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white", accent.bg)}>
                  <span className="material-symbols-outlined text-lg">{milestone.icon}</span>
                </span>
                <div>
                  <p className={cn("text-xs font-black uppercase tracking-[0.18em]", accent.text)}>
                    {milestone.year}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-black uppercase text-primary">
                    {milestone.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {milestone.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

const LegacyIntro = memo(function LegacyIntro({ isIntroActive }: { isIntroActive: boolean }) {
  const legacyIntroRef = useRef<HTMLDivElement>(null);

  useHeroTypewriter(legacyIntroRef, isIntroActive, ["company-journey"]);

  return (
    <div ref={legacyIntroRef} className="relative order-1 lg:order-2">
      <div className="pointer-events-none absolute -right-8 -top-10 opacity-[0.13]" aria-hidden="true">
        <NrkSeal />
      </div>

      <div className="mb-7 min-h-[122px]" data-typewriter suppressHydrationWarning>
        <span
          className="mb-4 block min-h-[1.4em] font-label-md text-[11px] font-black uppercase tracking-[0.22em] text-orange-600"
          data-typewriter-line
          data-typewriter-text="Who We Are"
          suppressHydrationWarning
        >
          Who We Are
        </span>
        <h2 className="font-display text-4xl font-black uppercase leading-tight text-primary md:text-5xl">
          <span data-typewriter-line data-typewriter-text="Our Legacy" suppressHydrationWarning>
            Our Legacy
          </span>
          <span
            className="ml-1 inline-block h-[0.78em] w-[0.08em] animate-pulse bg-orange-500 align-[-0.08em]"
            data-typewriter-cursor
          />
        </h2>
      </div>

      <div className="space-y-4">
        {legacyLines.map((line, index) => (
          <p
            key={line}
            className={cn(
              "font-body text-sm leading-relaxed text-on-surface-variant/80 transition-all duration-700 ease-out md:text-base",
              index === 0 ? "md:text-lg" : "",
              isIntroActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: `${900 + index * 170}ms` }}
          >
            {line}
          </p>
        ))}
      </div>

      <div
        className={cn(
          "relative mt-10 overflow-hidden rounded-[24px] border border-primary/20 bg-white/65 p-6 shadow-sm backdrop-blur-sm transition-all duration-700 ease-out",
          isIntroActive ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        )}
        style={{ transitionDelay: "1650ms" }}
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-orange-500 to-emerald-600" />
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
  );
});

export function CompanyJourneySection() {
  const { sectionRef, activeIndex } = useScrollMilestone(milestones.length);
  const isIntroActive = useSectionIntro(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#dfe9f5] py-16 md:py-20 lg:min-h-[300vh] lg:py-0"
      data-scroll-reveal="off"
    >
      <div className="mx-auto max-w-container-max px-gutter lg:sticky lg:top-20 lg:flex lg:min-h-screen lg:items-center">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:items-center lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="hidden lg:block">
              <JourneyStage activeIndex={activeIndex} />
            </div>
            <MobileMilestones />
          </div>
          <LegacyIntro isIntroActive={isIntroActive} />
        </div>
      </div>
    </section>
  );
}
