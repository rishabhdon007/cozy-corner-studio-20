import { ImageFeatureSplitSection } from "@/components/site/ImageFeatureSplitSection";
import { SiteButton } from "@/components/site/SiteButton";
import qcImage from "@/assests/constrution area.jpg";

const qualityPoints = [
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
] as const;

export function QualityControlSection() {
  return (
    <ImageFeatureSplitSection
      id="quality-assurance"
      image={qcImage}
      imageAlt="Quality Control Inspection"
      useNextImage
      badge={{ value: "ISO", label: "9001:2008 Certified" }}
      imageOverlay={
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
      }
      eyebrow="Quality Assurance"
      title={
        <>
          Stringent Quality
          <br className="hidden sm:block" /> Control
        </>
      }
      lead="As an ISO 9001:2008 certified enterprise, NRK Iron & Steel is committed to excellence in every aspect of our operations. From material sourcing to final dispatch, our rigorous quality assurance protocols ensure you receive exactly what you specify."
      features={qualityPoints}
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
