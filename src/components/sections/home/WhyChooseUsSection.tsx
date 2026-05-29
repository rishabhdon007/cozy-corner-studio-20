import teamMemberImage from "@/assests/team_member.webp";
import { ImageFeatureSplitSection } from "@/components/site/ImageFeatureSplitSection";

const FEATURES = [
  {
    icon: "support_agent",
    title: "Customer-Focused Service",
    description:
      "Customer-first approach with timely delivery, quality assurance, transparent communication, and high customer satisfaction.",
    revealDelay: 4,
  },
  {
    icon: "loyalty",
    title: "Goodwill & Loyalty",
    description:
      "Strong business relationships built over 30+ years with long-term trust and a loyal customer ecosystem across India.",
    revealDelay: 5,
  },
  {
    icon: "inventory_2",
    title: "Complete Range",
    description:
      "One-stop solution for all steel requirements — prime and secondary materials available with doorstep delivery support.",
    revealDelay: 6,
  },
  {
    icon: "groups",
    title: "30+ Years of Client Trust",
    description:
      "Business built on mutual trust and support — strong, professional relationships with customers across multiple generations.",
    revealDelay: 7,
  },
  {
    icon: "local_shipping",
    title: "Pan-India Delivery",
    description:
      "Serving MP, Gujarat, Maharashtra, Rajasthan & Punjab with secure transportation and efficient doorstep delivery.",
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
      lead="We PROVIDE competitive rates and timely deliveries — combining ready stock, precise processing, and long-term service discipline for industrial buyers across India."
      features={FEATURES}
    />
  );
}
