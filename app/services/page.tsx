import { ServicesGridSection } from "@/components/ServicesGridSection";
import { QualityControlSection } from "@/components/sections/services/QualityControlSection";
import { ServicesCtaSection } from "@/components/sections/services/ServicesCtaSection";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { allServiceCards } from "@/data/serviceCards";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-gray-900 reveal">
      <ServicesHero />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ServicesGridSection
          items={allServiceCards}
          showHeader={false}
          className="mb-16 bg-transparent py-0"
        />
      </main>

      <QualityControlSection />

      <ServicesCtaSection />
    </div>
  );
}
