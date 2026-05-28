"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

import { SectionPlaceholder } from "@/components/site/SectionPlaceholder";
import { featuredServiceCards } from "@/data/serviceCards";
import { rescanUnrevealedSections } from "@/scrollRevealDom";

const ServicesGridSection = dynamic(
  () => import("@/components/ServicesGridSection").then((module) => ({ default: module.ServicesGridSection })),
  { loading: () => <SectionPlaceholder minHeight={720} className="bg-primary/5" /> },
);

const PartnersSection = dynamic(
  () => import("@/components/sections/home/PartnersSection").then((module) => ({ default: module.PartnersSection })),
  { loading: () => <SectionPlaceholder minHeight={280} /> },
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/home/TestimonialsSection").then((module) => ({
      default: module.TestimonialsSection,
    })),
  { loading: () => <SectionPlaceholder minHeight={420} /> },
);

const WhyChooseUsSection = dynamic(
  () =>
    import("@/components/sections/home/WhyChooseUsSection").then((module) => ({
      default: module.WhyChooseUsSection,
    })),
  { loading: () => <SectionPlaceholder minHeight={680} className="bg-primary/5" /> },
);

const ContactCtaSection = dynamic(
  () => import("@/components/site/ContactCtaSection").then((module) => ({ default: module.ContactCtaSection })),
  { loading: () => <SectionPlaceholder minHeight={360} /> },
);

export function HomeDeferredSections() {
  useEffect(() => {
    let rafId = 0;
    let timeoutId = 0;

    const rescan = () => rescanUnrevealedSections(document.body);

    rafId = window.requestAnimationFrame(() => {
      rafId = window.requestAnimationFrame(rescan);
    });

    timeoutId = window.setTimeout(rescan, 600);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <ServicesGridSection items={featuredServiceCards} showViewAll tone="dark" />
      <PartnersSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <ContactCtaSection />
    </>
  );
}
