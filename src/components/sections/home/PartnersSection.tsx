"use client";

import Image, { type StaticImageData } from "next/image";

import { SectionHeading } from "@/components/site/SectionHeading";
import db from "@/data/db.json";
import { useSiteData } from "@/hooks/useSiteData";

type Partner = {
  name: string;
  logo: string | StaticImageData;
  alt: string;
};

function PartnerCard({ partner, ariaHidden = false }: { partner: Partner; ariaHidden?: boolean }) {
  const logoWidth = typeof partner.logo === "object" ? partner.logo.width : 200;
  const logoHeight = typeof partner.logo === "object" ? partner.logo.height : 80;

  return (
    <div
      className="flex h-36 w-64 shrink-0 flex-col items-center justify-center gap-4 p-5 bg-white rounded-xl border border-outline-variant shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
      aria-hidden={ariaHidden ? true : undefined}
    >
      <Image
        src={partner.logo}
        alt={ariaHidden ? "" : partner.alt}
        width={logoWidth}
        height={logoHeight}
        loading="lazy"
        className="max-h-16 w-auto h-auto object-contain"
      />
      <p className="font-label-md text-center text-primary">{partner.name}</p>
    </div>
  );
}

export function PartnersSection() {
  const partners = useSiteData<Partner[]>("partners", db.published.partners as any);
  const marqueePartners = [...partners, ...partners];

  return (
    <section className="py-stack-lg bg-surface-container-low reveal">
      <div className="max-w-container-max mx-auto px-gutter">
        <SectionHeading
          eyebrow="Trusted Network"
          title="Strategic Industry Partners"
          lead="We work alongside leading steel brands and industrial partners to support dependable sourcing and supply continuity."
          className="mb-10"
        />

        <div className="partners-marquee relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-container-low to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-container-low to-transparent" />
          <div className="partners-marquee-track flex gap-5 md:gap-8 py-2">
            {marqueePartners.map((partner, index) => (
              <PartnerCard
                key={`${partner.name}-${index}`}
                partner={partner}
                ariaHidden={index >= partners.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
