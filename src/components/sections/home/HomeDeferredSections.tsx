"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

import { SectionPlaceholder } from "@/components/site/SectionPlaceholder";
import { SECONDARY_MATERIAL_SECTION } from "@/data/catalogSections";
import { secondaryProductCards } from "@/data/serviceCards";
import { rescanUnrevealedSections } from "@/scrollRevealDom";

const ServicesGridSection = dynamic(
  () => import("@/components/ServicesGridSection").then((module) => ({ default: module.ServicesGridSection })),
  { loading: () => <SectionPlaceholder minHeight={720} className="bg-primary/5" />, ssr: false },
);

const PartnersSection = dynamic(
  () => import("@/components/sections/home/PartnersSection").then((module) => ({ default: module.PartnersSection })),
  { loading: () => <SectionPlaceholder minHeight={280} />, ssr: false },
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/home/TestimonialsSection").then((module) => ({
      default: module.TestimonialsSection,
    })),
  { loading: () => <SectionPlaceholder minHeight={420} />, ssr: false },
);

const WhyChooseUsSection = dynamic(
  () =>
    import("@/components/sections/home/WhyChooseUsSection").then((module) => ({
      default: module.WhyChooseUsSection,
    })),
  { loading: () => <SectionPlaceholder minHeight={680} className="bg-primary/5" />, ssr: false },
);

const ContactCtaSection = dynamic(
  () => import("@/components/site/ContactCtaSection").then((module) => ({ default: module.ContactCtaSection })),
  { loading: () => <SectionPlaceholder minHeight={360} />, ssr: false },
);

export function HomeDeferredSections() {
  useEffect(() => {
    const timeoutIds = [
      window.setTimeout(() => rescanUnrevealedSections(document.body), 150),
      window.setTimeout(() => rescanUnrevealedSections(document.body), 600),
    ];
    return () => timeoutIds.forEach((id) => window.clearTimeout(id));
  }, []);

  return (
    <>
      {secondaryProductCards.length > 0 ? (
        <ServicesGridSection
          sectionId="secondary"
          items={secondaryProductCards}
          heading={SECONDARY_MATERIAL_SECTION.heading}
          description={SECONDARY_MATERIAL_SECTION.description}
          showViewAll
          tone="dark"
        />
      ) : null}
      <PartnersSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <ContactCtaSection />
    </>
  );
}
