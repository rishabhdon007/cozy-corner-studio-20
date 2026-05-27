import { SiteButton } from "@/components/site/SiteButton";
import type { ServiceCardItem } from "../data/serviceCards";
import { ServiceCard } from "./ServiceCard";

type ServicesGridSectionProps = {
  items: ServiceCardItem[];
  showHeader?: boolean;
  showViewAll?: boolean;
  className?: string;
  heading?: string;
  description?: string;
};

export function ServicesGridSection({
  items,
  showHeader = true,
  showViewAll = false,
  className = "bg-surface-container-low reveal py-stack-lg",
  heading = "Comprehensive Steel Processing Services",
  description = "We offer advanced steel processing solutions to ensure precision, quality, and optimized use for every requirement.",
}: ServicesGridSectionProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-container-max px-gutter">
        {showHeader ? (
          <div className="site-section-header mb-stack-md text-center">
            <span data-scroll-reveal="top" className="site-section-eyebrow">Our Services</span>
            <h2 data-scroll-reveal="top" className="site-section-title">
              <span>{heading}</span>
            </h2>
            <p data-scroll-reveal="top" className="site-section-lead">
              <span>{description}</span>
            </p>
          </div>
        ) : null}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <ServiceCard
              key={item.id}
              item={item}
              revealDirection={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
        {showViewAll ? (
          <div data-scroll-reveal="" className="mt-8 text-center">
            <SiteButton href="/services" variant="outline">
              View All Services
            </SiteButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
