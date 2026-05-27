import { MapWithOverlay } from "@/components/site/MapWithOverlay";
import { cn } from "@/lib/utils";

type MapEmbedProps = {
  query?: string;
  title?: string;
  className?: string;
  variant?: "bar" | "card";
};

export function MapEmbed({ query, title = "Office Location", className, variant = "bar" }: MapEmbedProps) {
  if (variant === "card") {
    return <MapWithOverlay query={query} className={className} />;
  }

  return (
    <section
      className={cn(
        "relative h-96 w-full overflow-hidden border-y border-outline-variant bg-surface-container-low",
        className,
      )}
    >
      <iframe
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${encodeURIComponent(query ?? "")}&output=embed`}
        style={{ border: 0 }}
        title={title}
      />
    </section>
  );
}
