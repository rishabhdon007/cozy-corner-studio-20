import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { FeatureListItem } from "@/components/site/FeatureListItem";
import { SiteImage } from "@/components/site/SiteImage";
import { FloatingMetricBadge } from "@/components/site/FloatingMetricBadge";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  revealDelay?: number;
};

type ImageFeatureSplitSectionProps = {
  id?: string;
  image: string | StaticImageData;
  imageAlt: string;
  useNextImage?: boolean;
  imagePriority?: boolean;
  imageOverlay?: ReactNode;
  badge: { value: string; label: string };
  eyebrow: string;
  title: ReactNode;
  lead: string;
  features: readonly FeatureItem[];
  footer?: ReactNode;
  className?: string;
};

export function ImageFeatureSplitSection({
  id,
  image,
  imageAlt,
  useNextImage = false,
  imagePriority = false,
  imageOverlay,
  badge,
  eyebrow,
  title,
  lead,
  features,
  footer,
  className,
}: ImageFeatureSplitSectionProps) {
  return (
    <section
      id={id}
      data-scroll-reveal-section
      className={cn("relative overflow-hidden bg-primary py-20 reveal md:py-28", className)}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-container-max px-gutter">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:items-stretch md:gap-10 lg:gap-16">
          <div className="relative md:h-full lg:h-full" data-scroll-reveal="left">
            <div className="relative h-[360px] w-full overflow-hidden rounded-[28px] border border-white/10 shadow-2xl shadow-black/30 md:h-[480px] lg:h-full lg:min-h-[680px]">
              <SiteImage
                src={image}
                alt={imageAlt}
                fill
                priority={imagePriority}
                loading={imagePriority ? "eager" : "lazy"}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {imageOverlay}
            </div>
            <FloatingMetricBadge value={badge.value} label={badge.label} />
          </div>

          <div className="flex flex-col justify-center text-on-primary">
            <SectionHeading
              align="left"
              variant="hero"
              eyebrow={eyebrow}
              title={title}
              lead={lead}
              className="mb-10"
              leadClassName="mb-4"
            />

            <div className="space-y-7">
              {features.map((feature) => (
                <FeatureListItem
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  variant="dark"
                  revealDelay={feature.revealDelay}
                />
              ))}
            </div>

            {footer}
          </div>
        </div>
      </div>
    </section>
  );
}
