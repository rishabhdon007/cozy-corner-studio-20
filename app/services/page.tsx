import { ServicesGridSection } from "@/components/ServicesGridSection";
import { QualityControlSection } from "@/components/sections/services/QualityControlSection";
import { ServicesCatalogPage } from "@/components/sections/services/ServicesCatalogPage";
import { ServicesCtaSection } from "@/components/sections/services/ServicesCtaSection";
import { ServicesHero } from "@/components/sections/services/ServicesHero";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-gray-900 reveal">
      <ServicesHero />
      <ServicesCatalogPage />
      <QualityControlSection />
      <ServicesCtaSection />
    </div>
  );
}
