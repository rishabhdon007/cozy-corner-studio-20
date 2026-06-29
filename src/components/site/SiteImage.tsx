"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  DEFAULT_CATALOG_IMAGE,
  type ImageSource,
  isSvgSrc,
  normalizeImageSrc,
  toImageSrc,
} from "@/lib/siteImages";
import { isPickleProductImageSrc } from "@/data/crCoiledPickledVariants";

type SiteImageProps = {
  src: ImageSource;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  fallback?: string | false;
  unoptimized?: boolean;
};

export function SiteImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  className,
  priority = false,
  loading,
  fallback = DEFAULT_CATALOG_IMAGE,
  unoptimized,
}: SiteImageProps) {
  const initial = normalizeImageSrc(toImageSrc(src));
  const [currentSrc, setCurrentSrc] = useState(initial);
  const isPickleAsset = isPickleProductImageSrc(initial);
  const svg = unoptimized ?? (isSvgSrc(currentSrc) || isPickleAsset);

  const handleError = () => {
    if (fallback === false || !fallback) return;
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
    }
  };

  if (fill) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        className={cn("object-cover", className)}
        priority={priority}
        loading={loading ?? (priority ? undefined : "lazy")}
        unoptimized={svg}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      sizes={sizes}
      className={className}
      priority={priority}
      loading={loading ?? (priority ? undefined : "lazy")}
      unoptimized={svg}
      onError={handleError}
    />
  );
}
