import { ContactCtaSection } from "@/components/site/ContactCtaSection";
import { ServicesGridSection } from "@/components/ServicesGridSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { PartnersSection } from "@/components/sections/home/PartnersSection";
import { StatsSection } from "@/components/sections/home/StatsSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { featuredServiceCards } from "@/data/serviceCards";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <WhyChooseUsSection />
      <PartnersSection />
      <TestimonialsSection />
      <ServicesGridSection items={featuredServiceCards} showViewAll />
      <ContactCtaSection />
    </>
  );
}
