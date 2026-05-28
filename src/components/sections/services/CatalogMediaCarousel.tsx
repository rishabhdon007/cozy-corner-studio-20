"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, PlayCircle, ZoomIn } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  DEFAULT_CATALOG_IMAGE,
  type CatalogMediaItem,
  resolveCatalogImageSrc,
} from "@/lib/catalogMedia";

type CatalogMediaCarouselProps = {
  items: CatalogMediaItem[];
  title: string;
  className?: string;
};

function MediaSlide({
  item,
  title,
  compact = false,
  onOpen,
}: {
  item: CatalogMediaItem;
  title: string;
  compact?: boolean;
  onOpen?: () => void;
}) {
  const isVideo = item.type === "video";

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative block aspect-[16/10] w-full overflow-hidden text-left",
        onOpen && "cursor-zoom-in",
      )}
      aria-label={isVideo ? `Open ${item.label} video` : `Open ${item.label} image`}
    >
      {isVideo ? (
        <>
          <img
            src={resolveCatalogImageSrc(item.poster ?? item.src)}
            alt=""
            className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-60"
            onError={(event) => {
              if (event.currentTarget.src !== DEFAULT_CATALOG_IMAGE) {
                event.currentTarget.src = DEFAULT_CATALOG_IMAGE;
              }
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25">
            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
              <PlayCircle className="h-7 w-7 text-primary md:h-8 md:w-8" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-white md:text-sm">
              Watch Process Video
            </span>
          </div>
        </>
      ) : (
        <>
          <img
            src={resolveCatalogImageSrc(item.src)}
            alt={`${title} — ${item.label}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={(event) => {
              if (event.currentTarget.src !== DEFAULT_CATALOG_IMAGE) {
                event.currentTarget.src = DEFAULT_CATALOG_IMAGE;
              }
            }}
          />
          {onOpen ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-md">
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
                View
              </span>
            </div>
          ) : null}
        </>
      )}
      {!compact ? (
        <span className="absolute bottom-3 left-3 rounded-md bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {item.label}
        </span>
      ) : null}
    </button>
  );
}

function LightboxMedia({ item, title }: { item: CatalogMediaItem; title: string }) {
  if (item.type === "video") {
    return (
      <video
        key={item.src}
        data-catalog-lightbox-video
        src={item.src}
        poster={item.poster}
        controls
        autoPlay
        playsInline
        className="max-h-[min(78vh,720px)] w-full rounded-lg bg-black object-contain"
      />
    );
  }

  return (
    <img
      src={item.src}
      alt={`${title} — ${item.label}`}
      className="max-h-[min(78vh,720px)] w-full rounded-lg object-contain"
    />
  );
}

export function CatalogMediaCarousel({ items, title, className }: CatalogMediaCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const scrollTo = useCallback(
    (index: number) => {
      if (!items.length) return;
      const next = ((index % items.length) + items.length) % items.length;
      carouselApi?.scrollTo(next);
      setSelectedIndex(next);
    },
    [carouselApi, items.length],
  );

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => setSelectedIndex(carouselApi.selectedScrollSnap());
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") scrollTo(selectedIndex - 1);
      if (event.key === "ArrowRight") scrollTo(selectedIndex + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, scrollTo, selectedIndex]);

  useEffect(() => {
    if (lightboxOpen) return;
    document.querySelectorAll<HTMLVideoElement>("[data-catalog-lightbox-video]").forEach((video) => {
      video.pause();
    });
  }, [lightboxOpen, selectedIndex]);

  if (!items.length) return null;

  const current = items[selectedIndex];
  const galleryThumbs = items.filter((item) => item.id.startsWith("gallery-"));
  const bottomThumbs = galleryThumbs.length >= 3 ? galleryThumbs : items.slice(-3);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-900 shadow-lg">
        <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-0">
            {items.map((item) => (
              <CarouselItem key={item.id} className="basis-full pl-0">
                <MediaSlide
                  item={item}
                  title={title}
                  onOpen={() => {
                    setLightboxOpen(true);
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => carouselApi?.scrollPrev()}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => carouselApi?.scrollNext()}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <p className="absolute right-3 top-3 z-10 rounded-md bg-black/50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                {selectedIndex + 1} / {items.length}
              </p>
            </>
          ) : null}
        </Carousel>
      </div>

      {bottomThumbs.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {bottomThumbs.map((item) => {
            const index = items.findIndex((entry) => entry.id === item.id);

            return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(index)}
              className={cn(
                "relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200 transition-all",
                index === selectedIndex
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-80 hover:opacity-100",
              )}
              aria-label={`Show ${item.label}`}
              aria-current={index === selectedIndex ? "true" : undefined}
            >
              {item.type === "video" ? (
                <>
                  <img
                    src={item.poster ?? item.src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                    <PlayCircle className="h-8 w-8 text-white" aria-hidden="true" />
                  </span>
                </>
              ) : (
                <img
                  src={item.src}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              )}
            </button>
            );
          })}
        </div>
      ) : null}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-h-[96vh] max-w-5xl border-0 bg-[#0b1220]/95 p-0 text-white sm:rounded-2xl [&>button]:text-white [&>button]:hover:text-white/80">
          <DialogTitle className="sr-only">
            {title} — {current?.label ?? "Media"}
          </DialogTitle>

          <div className="flex flex-col gap-4 p-4 pt-12 sm:p-6 sm:pt-14">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold uppercase tracking-wider text-white/80">
                {current?.label} · {selectedIndex + 1} of {items.length}
              </p>
            </div>

            <div className="relative flex min-h-[200px] items-center justify-center">
              {items.length > 1 ? (
                <button
                  type="button"
                  onClick={() => scrollTo(selectedIndex - 1)}
                  className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              ) : null}

              <div className="mx-10 w-full max-w-4xl">
                {current ? <LightboxMedia item={current} title={title} /> : null}
              </div>

              {items.length > 1 ? (
                <button
                  type="button"
                  onClick={() => scrollTo(selectedIndex + 1)}
                  className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : null}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(index)}
                  className={cn(
                    "relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2",
                    index === selectedIndex ? "border-secondary-fixed" : "border-white/20 opacity-60",
                  )}
                  aria-label={item.label}
                >
                  {item.type === "video" ? (
                    <>
                      <img src={item.poster ?? item.src} alt="" className="h-full w-full object-cover" />
                      <PlayCircle className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow" />
                    </>
                  ) : (
                    <img src={item.src} alt="" className="h-full w-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
