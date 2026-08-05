import { ImageFeatureSplitSection } from "@/components/site/ImageFeatureSplitSection";
import db from "@/data/db.json";
import { useSiteData } from "@/hooks/useSiteData";

export function WhyChooseUsSection() {
  const data = useSiteData("whyChooseUs", db.published.whyChooseUs);

  return (
    <ImageFeatureSplitSection
      id="why-choose-us"
      image={data.image || "/company/Nimesh_sir.jpg"}
      imageAlt={data.imageAlt || "Mr. Nimesh Kothari"}
      useNextImage
      badge={{ value: data.badgeValue, label: data.badgeLabel }}
      eyebrow={data.eyebrow}
      title={data.title}
      lead={data.lead}
      features={data.features}
    />
  );
}
