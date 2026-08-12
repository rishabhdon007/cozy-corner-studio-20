"use client";

import { ImageFeatureSplitSection } from "@/components/site/ImageFeatureSplitSection";
import { SiteButton } from "@/components/site/SiteButton";
import { useSiteData } from "@/hooks/useSiteData";
import db from "@/data/db.json";

const defaultQualityControl = {
  eyebrow: "Quality Assurance",
  title: "Stringent Quality Control",
  lead: "As an ISO 9001:2008 certified enterprise, NRK Iron & Steel is committed to excellence in every aspect of our operations. From material sourcing to final dispatch, our rigorous quality assurance protocols ensure you receive exactly what you specify.",
  image: "/Gallary/Dispatch & Logistics Hub.png",
  badgeValue: "ISO",
  badgeLabel: "9001:2008 Certified",
  features: [
    {
      icon: "verified",
      title: "ISO 9001:2008 Certified",
      description: "Internationally recognized standards for quality management systems.",
      revealDelay: 4,
    },
    {
      icon: "scale",
      title: "High-Accuracy Weighing",
      description: "Industrial bench and platform scales ensuring exact weight measurements for every order.",
      revealDelay: 5,
    },
    {
      icon: "fact_check",
      title: "Rigorous Material Inspection",
      description: "Verification of precise grades (e.g., E250, E350, CRCA) and thicknesses before processing.",
      revealDelay: 6,
    },
  ],
};

export function QualityControlSection() {
  const qc = useSiteData("qualityControl", (db.published as any).qualityControl || defaultQualityControl);

  return (
    <ImageFeatureSplitSection
      id="quality-assurance"
      image={qc.image || "/Gallary/Dispatch & Logistics Hub.png"}
      imageAlt="Quality Control Inspection"
      useNextImage
      badge={{ value: qc.badgeValue || "ISO", label: qc.badgeLabel || "9001:2008 Certified" }}
      imageOverlay={
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
      }
      eyebrow={qc.eyebrow || "Quality Assurance"}
      title={qc.title || "Stringent Quality Control"}
      lead={qc.lead}
      features={qc.features || defaultQualityControl.features}
      footer={
        <SiteButton
          href="/gallery"
          variant="text-light"
          icon="verified"
          className="mt-10"
          data-scroll-reveal=""
          data-scroll-reveal-delay="9"
        >
          View Our Certifications
        </SiteButton>
      }
    />
  );
}
