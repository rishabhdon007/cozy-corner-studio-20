"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  DEFAULT_CATALOG_IMAGE,
  type ImageSource,
  isSvgSrc,
  normalizeImageSrc,
  toImageSrc,
} from "@/lib/siteImages";
import { isCatalogProductImageSrc, isLocalProductAssetSrc } from "@/data/productAssetPaths";

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
  const normalizedSrc = normalizeImageSrc(toImageSrc(src));
  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);

  useEffect(() => {
    setCurrentSrc(normalizedSrc);
  }, [normalizedSrc]);

  const isDirectProductAsset =
    isCatalogProductImageSrc(normalizedSrc) ||
    isLocalProductAssetSrc(normalizedSrc) ||
    normalizedSrc.startsWith("/uploads/");
  const svg = unoptimized ?? (isSvgSrc(currentSrc) || isDirectProductAsset);

  const handleError = () => {
    if (fallback === false || !fallback) return;
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
    }
  };

  const isPlaceholder =
    currentSrc === "/assests/constrution area.webp" ||
    currentSrc === "/assests/products/colled.png" ||
    currentSrc === "/assests/products/iron.png" ||
    currentSrc === "/assests/products/plate.png";

  const isCoil = alt?.toLowerCase().includes("coil");

  if (isPlaceholder && isCoil) {
    const coilImage = "/assests/products/HR sheet coils.webp";
    if (fill) {
      return (
        <Image
          src={coilImage}
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
        src={coilImage}
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

  if (isPlaceholder) {
    if (fill) {
      return (
        <div className={cn("relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8", className)}>
          <div className="relative h-1/2 w-1/2 max-w-[150px] max-h-[150px]">
            <Image
              src="/company_logo.webp"
              alt="NRK Iron & Steel"
              fill
              sizes="150px"
              className="object-contain opacity-95"
              unoptimized
            />
          </div>
        </div>
      );
    }

    return (
      <div
        style={{ width: width ?? "100%", height: height ?? "100%" }}
        className={cn("relative flex items-center justify-center bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8", className)}
      >
        <div className="relative h-1/2 w-1/2 max-w-[150px] max-h-[150px]">
          <Image
            src="/company_logo.webp"
            alt="NRK Iron & Steel"
            fill
            sizes="150px"
            className="object-contain opacity-95"
            unoptimized
          />
        </div>
      </div>
    );
  }

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
