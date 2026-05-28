import Image, { type StaticImageData } from "next/image";

import { SectionHeading } from "@/components/site/SectionHeading";
import essarSteelLogo from "@/assests/client_logo/essar_steel.png";
import jindalSteelLogo from "@/assests/client_logo/Jindal_Steel_Limited_Logo.png";
import sailLogo from "@/assests/client_logo/sail.png";
import tataSteelLogo from "@/assests/client_logo/Tata_Steel_Logo.png";

type Partner = {
  name: string;
  logo: StaticImageData;
  alt: string;
};

const PARTNERS: Partner[] = [
  {
    name: "Jindal Steel Limited",
    logo: jindalSteelLogo,
    alt: "Jindal Steel Limited",
  },
  {
    name: "Tata Steel",
    logo: tataSteelLogo,
    alt: "Tata Steel",
  },
  {
    name: "Essar Steel",
    logo: essarSteelLogo,
    alt: "Essar Steel",
  },
  {
    name: "Steel Authority of India Limited",
    logo: sailLogo,
    alt: "Steel Authority of India Limited",
  },
];

function PartnerCard({ partner, ariaHidden = false }: { partner: Partner; ariaHidden?: boolean }) {
  return (
    <div
      className="flex h-36 w-64 shrink-0 flex-col items-center justify-center gap-4 p-5 bg-white rounded-xl border border-outline-variant shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
      aria-hidden={ariaHidden ? true : undefined}
    >
      <Image
        src={partner.logo}
        alt={ariaHidden ? "" : partner.alt}
        width={partner.logo.width}
        height={partner.logo.height}
        loading="lazy"
        className="max-h-16 w-auto h-auto object-contain"
      />
      <p className="font-label-md text-center text-primary">{partner.name}</p>
    </div>
  );
}

export function PartnersSection() {
  const marqueePartners = [...PARTNERS, ...PARTNERS];

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
                ariaHidden={index >= PARTNERS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
