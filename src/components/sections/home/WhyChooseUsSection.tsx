import teamMemberImage from "@/assests/team_member.webp";
import { ImageFeatureSplitSection } from "@/components/site/ImageFeatureSplitSection";

const FEATURES = [
  {
    icon: "inventory_2",
    title: "Ready Stock Availability",
    description:
      "A broad inventory of steel products helps buyers move faster without waiting on uncertain supply cycles.",
    revealDelay: 4,
  },
  {
    icon: "precision_manufacturing",
    title: "Precision Processing",
    description:
      "Slitting, cut-to-length, profiling, and packaging are handled with accuracy to match project requirements.",
    revealDelay: 5,
  },
  {
    icon: "verified_user",
    title: "Consistent Quality",
    description:
      "Every order is backed by dependable sourcing, careful handling, and quality checks before dispatch.",
    revealDelay: 6,
  },
  {
    icon: "local_shipping",
    title: "On-Time Delivery",
    description:
      "Coordinated logistics and practical scheduling keep material movement aligned with your site timelines.",
    revealDelay: 7,
  },
  {
    icon: "handshake",
    title: "Long-Term Partnerships",
    description:
      "Customers stay with NRK because they get transparent communication, dependable service, and practical support.",
    revealDelay: 8,
  },
] as const;

export function WhyChooseUsSection() {
  return (
    <ImageFeatureSplitSection
      id="why-choose-us"
      image={teamMemberImage}
      imageAlt="NRK Iron & Steel team member"
      useNextImage
      badge={{ value: "30+", label: "Years of Trust" }}
      eyebrow="Industrial Steel Partner"
      title={
        <>
          Why Businesses
          <br className="hidden sm:block" /> Choose Us
        </>
      }
      lead="We combine ready stock, precise processing, reliable delivery, and long-term service discipline for industrial buyers across India."
      features={FEATURES}
    />
  );
}
