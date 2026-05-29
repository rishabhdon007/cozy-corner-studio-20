import { GalleryHero } from "@/components/sections/gallery/GalleryHero";
import { IndustrialGallerySection } from "@/components/sections/gallery/IndustrialGallerySection";
import { VideoTourSection } from "@/components/sections/gallery/VideoTourSection";
import { ContactCtaSection } from "@/components/site/ContactCtaSection";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-gray-900 reveal">
      <GalleryHero />
      <IndustrialGallerySection />
      <VideoTourSection />
      <ContactCtaSection />
    </div>
  );
}
