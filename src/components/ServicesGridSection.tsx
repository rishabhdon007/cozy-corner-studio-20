import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteButton } from "@/components/site/SiteButton";
import { cn } from "@/lib/utils";
import type { ServiceCardItem } from "../data/serviceCards";
import { ServiceCard } from "./ServiceCard";

type ServicesGridSectionProps = {
  items: ServiceCardItem[];
  showHeader?: boolean;
  showViewAll?: boolean;
  className?: string;
  heading?: string;
  description?: string;
  tone?: "light" | "dark";
  sectionId?: string;
};

export function ServicesGridSection({
  items,
  showHeader = true,
  showViewAll = false,
  className = "reveal py-stack-lg",
  heading = "Comprehensive Steel Products & Services",
  description = "Prime steel products and precision processing capabilities for coils, sheets, plates, and coated materials.",
  tone = "light",
  sectionId,
}: ServicesGridSectionProps) {
  const isDark = tone === "dark";

  return (
    <section
      id={sectionId}
      className={cn(
        "relative overflow-hidden",
        isDark ? "bg-primary text-on-primary" : "bg-surface-container-low",
        className,
      )}
    >
      {isDark ? (
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
      ) : null}

      <div className="relative mx-auto max-w-container-max px-gutter">
        {showHeader ? (
          isDark ? (
            <SectionHeading
              align="center"
              variant="hero"
              eyebrow="Our Products & Services"
              title={heading}
              lead={description}
              className="mb-stack-md"
            />
          ) : (
            <div className="site-section-header mb-stack-md text-center">
              <span data-scroll-reveal="top" className="site-section-eyebrow">
                Our Products & Services
              </span>
              <h2 data-scroll-reveal="top" className="site-section-title">
                <span>{heading}</span>
              </h2>
              <p data-scroll-reveal="top" className="site-section-lead">
                <span>{description}</span>
              </p>
            </div>
          )
        ) : null}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6">
          {items.map((item, index) => (
            <ServiceCard
              key={item.id}
              item={item}
              catalogKind={item.kind}
              revealDirection={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
        {showViewAll ? (
          <div data-scroll-reveal="" className="mt-8 text-center">
            <SiteButton href="/services" variant={isDark ? "white" : "outline"}>
              View Full Catalogue
            </SiteButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
