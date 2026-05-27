import { ImageFeatureSplitSection } from "@/components/site/ImageFeatureSplitSection";
import { SiteButton } from "@/components/site/SiteButton";

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

const QC_IMAGE =
  "https://lh3.googleusercontent.com/aida/ADBb0ujNeJfj5wjuiu3qa5PPpnbdTCPvKNZ6N2yri4I15sFCyU37e27ZxTaBi-X_HrEEoMrBQ_Y87Eky8g_cWUxRDlugbnlELvSyUYarJSXBSVn3wUXaFOlujrxI8ykr_gOeXzy-9wgeAJ9fdfdpExYYPQ4PuLncFTJa42kasKT_q9zpCwhLgzElMiOrDPJ6PkodKV-52kPNF3ODoLhOUdTcw0k9CTEY048brLSdv86qeEhwYXr-VqT5vRXSubc";

export function QualityControlSection() {
  return (
    <ImageFeatureSplitSection
      id="quality-assurance"
      image={QC_IMAGE}
      imageAlt="Quality Control Inspection"
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
