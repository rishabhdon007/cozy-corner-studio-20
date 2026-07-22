import { ImageFeatureSplitSection } from "@/components/site/ImageFeatureSplitSection";
import { SITE_IMAGES } from "@/lib/siteImages";

const FEATURES = [
  {
    icon: "workspace_premium",
    title: "Genuine Quality",
    description:
      "100% Original Tata Steel with mill certificates",
    revealDelay: 4,
  },
  {
    icon: "category",
    title: "Wide Range",
    description:
      "All grades Soft, Medium, Structural available",
    revealDelay: 5,
  },
  {
    icon: "local_shipping",
    title: "Fast Delivery",
    description:
      "Ready stock & quick dispatch from Indore",
    revealDelay: 6,
  },
  {
    icon: "price_check",
    title: "Competitive Pricing",
    description:
      "Best market rates with transparency",
    revealDelay: 7,
  },
  {
    icon: "support_agent",
    title: "Technical Support",
    description:
      "Right grade selection guidance for your application",
    revealDelay: 8,
  },
] as const;

export function WhyChooseUsSection() {
  return (
    <ImageFeatureSplitSection
      id="why-choose-us"
      image="/company/Nimesh_sir.jpg"
      imageAlt="Mr. Nimesh Kothari"
      useNextImage
      badge={{ value: "30+", label: "Years of Trust" }}
      eyebrow="Why Choose Us"
      title="Why NRK IRON & STEEL LLP?"
      lead="We PROVIDE competitive rates and timely deliveries — combining ready stock, precise processing, and long-term service discipline for industrial buyers across India."
      features={FEATURES}
    />
  );
}
