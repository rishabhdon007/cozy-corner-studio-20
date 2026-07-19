import { AboutHero } from "@/components/sections/about/AboutHero";
import { CompanyJourneySection } from "@/components/sections/about/CompanyJourneySection";
import { LeadershipSection } from "@/components/sections/about/LeadershipSection";
import { MarketingTeamSection } from "@/components/sections/about/MarketingTeamSection";
import { MissionVisionSection } from "@/components/sections/about/MissionVisionSection";
import { ContactCtaSection } from "@/components/site/ContactCtaSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-gray-900 reveal">
      <AboutHero />
      <CompanyJourneySection />
      <MissionVisionSection />
      <LeadershipSection />
      <MarketingTeamSection />
      <ContactCtaSection />
    </div>
  );
}
