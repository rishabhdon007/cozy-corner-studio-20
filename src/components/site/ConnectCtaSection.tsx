import { DirectoryProfileLinks } from "@/components/site/DirectoryProfileLinks";
import { GoogleReviewsCard } from "@/components/site/GoogleReviewsCard";
import { SiteButton } from "@/components/site/SiteButton";
import { SiteImage } from "@/components/site/SiteImage";
import { brochureDownloadUrl, contactCopy } from "@/data/contact";
import { SITE_IMAGES } from "@/lib/siteImages";
import { cn } from "@/lib/utils";

type ConnectCtaTheme = "blue-gradient" | "primary";

type ConnectCtaSectionProps = {
  theme?: ConnectCtaTheme;
  backgroundImage?: string;
  backgroundAlt?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  showDirectoryLinks?: boolean;
  className?: string;
};

const themeStyles: Record<
  ConnectCtaTheme,
  { panel: string; imageOverlay: string; imageOpacity: string }
> = {
  "blue-gradient": {
    panel:
      "bg-gradient-to-r from-[#4a7594] via-[#5a8fad] to-[#3d6d8f] border-white/20 shadow-primary/5",
    imageOverlay: "bg-[#5a8fad]/25 mix-blend-soft-light",
    imageOpacity: "opacity-25 mix-blend-soft-light",
  },
  primary: {
    panel: "bg-primary border-white/15 shadow-primary/20",
    imageOverlay: "bg-gradient-to-r from-primary via-primary/92 to-primary/55",
    imageOpacity: "opacity-35",
  },
};

export function ConnectCtaSection({
  theme = "blue-gradient",
  backgroundImage = SITE_IMAGES.construction,
  backgroundAlt = "High-Rise Steel Architectural Skyscrapers",
  eyebrow = contactCopy.eyebrow,
  title = contactCopy.title,
  description = contactCopy.description,
  showDirectoryLinks = true,
  className,
}: ConnectCtaSectionProps) {
  const styles = themeStyles[theme];

  return (
    <section className={cn("relative overflow-hidden bg-surface py-12 md:py-16", className)}>
      <div className="mx-auto max-w-container-max px-gutter">
        <div
          data-scroll-reveal="top"
          className={cn(
            "group relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[24px] px-6 py-10 text-white backdrop-blur-md md:gap-12 md:p-12 lg:flex-row lg:items-center lg:px-16",
            styles.panel,
          )}
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <SiteImage
              src={backgroundImage}
              alt={backgroundAlt}
              fill
              sizes="100vw"
              className={cn(
                "pointer-events-none select-none transition-transform duration-1000 ease-out group-hover:scale-105",
                styles.imageOpacity,
              )}
              aria-hidden={backgroundAlt === ""}
            />
            {theme === "blue-gradient" ? (
              <>
                <div className={cn("absolute inset-0", styles.imageOverlay)} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#3d6d8f]/55 via-[#5a8fad]/40 to-[#6a9fbd]/30" />
              </>
            ) : (
              <>
                <div className={cn("absolute inset-0", styles.imageOverlay)} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              </>
            )}
          </div>

          <div className="relative z-10 max-w-2xl text-left lg:flex-1">
            <span className="mb-2 inline-block font-label-md text-[10px] font-black uppercase tracking-[0.25em] text-secondary-fixed">
              {eyebrow}
            </span>
            <h2 className="mb-4 font-display text-2xl font-black uppercase leading-tight tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl">
              {title}
            </h2>
            <p className="font-body text-xs leading-relaxed text-surface-variant/85 md:text-sm">{description}</p>
          </div>

          <div className="relative z-10 flex w-full flex-col gap-4 lg:w-[480px] lg:shrink-0">
            <SiteButton
              href={brochureDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="glass"
              icon="download"
              iconClassName="text-sm"
              className="w-full cursor-pointer"
            >
              Download Brochure
            </SiteButton>

            {showDirectoryLinks ? (
              <>
                <DirectoryProfileLinks />
                <GoogleReviewsCard />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesConnectCtaSection() {
  return (
    <ConnectCtaSection
      theme="primary"
      backgroundImage={SITE_IMAGES.construction}
      backgroundAlt=""
    />
  );
}
