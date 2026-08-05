"use client";

import Image, { type StaticImageData } from "next/image";
import { memo, type RefObject, useEffect, useRef, useState } from "react";
import db from "@/data/db.json";
import { useSiteData } from "@/hooks/useSiteData";

import { SITE_IMAGES } from "@/lib/siteImages";
import { cn } from "@/lib/utils";

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: string;
  image: StaticImageData | string;
};

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
    <div ref={ref} className="flex flex-col items-start gap-1">
      <div className="font-display text-4xl font-black tabular-nums tracking-tight text-primary md:text-5xl">
        {count}
        <span className="text-secondary">{suffix}</span>
      </div>
      <div className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant/70">
        {label}
      </div>
    </div>
  );
}

function JourneyStage({ activeIndex, milestones }: { activeIndex: number; milestones: Milestone[] }) {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
      <div className="relative aspect-[4/5] w-full lg:aspect-[3/4]">
        {milestones.map((milestone, index) => (
          <Image
            key={milestone.year}
            src={milestone.image}
            alt={`${milestone.title} milestone`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={index === 0}
            className={cn(
              "object-cover transition-all duration-1000 ease-in-out",
              activeIndex === index ? "scale-100 opacity-100" : "scale-110 opacity-0",
            )}
          />
        ))}
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Floating Content Box */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="relative min-h-[240px] md:min-h-[160px] mb-6 md:mb-8">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={cn(
                  "absolute inset-0 flex flex-col justify-end transition-all duration-700 ease-out",
                  activeIndex === index
                    ? "translate-y-0 opacity-100 z-10"
                    : index < activeIndex
                      ? "-translate-y-8 opacity-0 z-0 pointer-events-none"
                      : "translate-y-8 opacity-0 z-0 pointer-events-none"
                )}
                aria-hidden={activeIndex !== index}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white shadow-lg shrink-0">
                    <span className="material-symbols-outlined">{milestone.icon}</span>
                  </span>
                  <div>
                    <p className="text-secondary font-bold tracking-wider text-sm">{milestone.year}</p>
                    <h3 className="font-display text-2xl font-black text-white md:text-3xl tracking-tight">
                      {milestone.title}
                    </h3>
                  </div>
                </div>
                <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>

          {/* Progress Bars */}
          <div className="flex gap-2">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20"
              >
                <div
                  className={cn(
                    "h-full bg-secondary transition-all duration-500 ease-out",
                    index === activeIndex ? "w-full" : index < activeIndex ? "w-full" : "w-0"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMilestones({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="space-y-12 lg:hidden">
      {milestones.map((milestone) => (
        <article key={milestone.year} className="group">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 mb-6">
            <Image
              src={milestone.image}
              alt={`${milestone.title} milestone`}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white shrink-0">
                <span className="material-symbols-outlined">{milestone.icon}</span>
              </span>
              <div className="w-px h-full bg-slate-200 mt-4 group-last:hidden" />
            </div>
            <div>
              <p className="text-secondary font-bold tracking-wider text-sm mb-1">{milestone.year}</p>
              <h3 className="font-display text-2xl font-black text-primary mb-3">
                {milestone.title}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

const LegacyIntro = memo(function LegacyIntro({ isIntroActive, legacyLines }: { isIntroActive: boolean; legacyLines: string[] }) {
  return (
    <div className="relative order-1 lg:order-2 flex flex-col justify-center h-full">
      <div className="mb-8">
        <span
          className={cn(
            "mb-4 block font-label-md text-xs font-black uppercase tracking-[0.22em] text-secondary transition-all duration-700",
            isIntroActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          Who We Are
        </span>
        <h2 
          className={cn(
            "font-display text-4xl font-black leading-[1.1] text-primary md:text-5xl lg:text-6xl transition-all duration-700 delay-100",
            isIntroActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          Our Legacy
        </h2>
      </div>

      <div className="space-y-6 mb-12">
        {legacyLines.map((line, index) => (
          <p
            key={line}
            className={cn(
              "font-body leading-relaxed text-on-surface-variant transition-all duration-700 ease-out",
              index === 0 ? "text-lg md:text-xl font-medium text-primary/80" : "text-base md:text-lg",
              isIntroActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            {line}
          </p>
        ))}
      </div>

      <div
        className={cn(
          "grid grid-cols-2 gap-8 md:grid-cols-3 transition-all duration-700 delay-700",
          isIntroActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}
      >
        <AnimatedStat value={30} suffix="+" label="Years of Trust" />
        <AnimatedStat value={10} suffix="k+" label="Projects Served" />
        <AnimatedStat value={4} suffix="" label="Strategic Hubs" />
      </div>
    </div>
  );
});

export function CompanyJourneySection() {
  const data = useSiteData("journey", db.published.journey);
  const { sectionRef, activeIndex } = useScrollMilestone(data.milestones.length);
  const isIntroActive = useSectionIntro(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 lg:min-h-[300vh] lg:py-0"
      data-scroll-reveal="off"
    >
      <div className="mx-auto max-w-container-max px-gutter lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="grid w-full grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-24 py-10">
          <div className="order-2 lg:order-1 h-full flex flex-col justify-center">
            <div className="hidden lg:block w-full">
              <JourneyStage activeIndex={activeIndex} milestones={data.milestones} />
            </div>
            <MobileMilestones milestones={data.milestones} />
          </div>
          <div className="h-full flex flex-col justify-center">
            <LegacyIntro isIntroActive={isIntroActive} legacyLines={data.legacyLines} />
          </div>
        </div>
      </div>
    </section>
  );
}
