import { SiteButton } from "@/components/site/SiteButton";
import { contactInfo } from "@/data/contact";
import { cn } from "@/lib/utils";

type MapWithOverlayProps = {
  query?: string;
  title?: string;
  address?: string;
  className?: string;
  scrollReveal?: string;
};

export function MapWithOverlay({
  query = contactInfo.address.full,
  title = "HQ Main Office",
  address = contactInfo.address.full,
  className,
  scrollReveal = "",
}: MapWithOverlayProps) {
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div
      data-scroll-reveal={scrollReveal}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-[2.5rem] border border-outline-variant/10 shadow-xl",
        className,
      )}
    >
      <iframe
        title="Office Location"
        className="h-full w-full transition-all duration-700"
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-0 bg-primary/10 transition-opacity duration-500 group-hover:opacity-0" />

      <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/95 p-6 shadow-lg backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="mb-2 font-display font-bold text-primary">{title}</p>
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs leading-relaxed text-on-surface-variant hover:text-primary transition-colors cursor-pointer block"
            >
              {address}
            </a>
          </div>

          <SiteButton
            href={mapsSearchUrl}
            variant="icon-circle-primary"
            icon="open_in_new"
            iconClassName="text-xl"
            className="shrink-0 cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Google Maps"
            aria-label="Open in Google Maps"
          />
        </div>
      </div>
    </div>
  );
}
