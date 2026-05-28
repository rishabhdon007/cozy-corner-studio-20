import { BackgroundRoutePrefetch } from "@/components/site/BackgroundRoutePrefetch";
import { HomeDeferredSections } from "@/components/sections/home/HomeDeferredSections";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { StatsSection } from "@/components/sections/home/StatsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BackgroundRoutePrefetch />
      <StatsSection />
      <HomeDeferredSections />
    </>
  );
}
