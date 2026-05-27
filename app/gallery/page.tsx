import { GalleryHero } from "@/components/sections/gallery/GalleryHero";
import { IndustrialGallerySection } from "@/components/sections/gallery/IndustrialGallerySection";
import { LatestNewsSection } from "@/components/sections/gallery/LatestNewsSection";
import { VideoTourSection } from "@/components/sections/gallery/VideoTourSection";

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <IndustrialGallerySection />
      <VideoTourSection />
      <LatestNewsSection />
    </>
  );
}
