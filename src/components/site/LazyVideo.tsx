"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function LazyVideo({ className, src, autoPlay, preload = "none", ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setHasLoaded(true);
            videoElement.play().catch(() => {
              // Ignore play errors from strict browser autoplay policies
            });
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.1, rootMargin: "200px" } // Load slightly before it comes into view
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, [autoPlay]);

  return (
    <video
      ref={videoRef}
      className={cn("object-cover", className)}
      src={hasLoaded ? src : undefined}
      autoPlay={autoPlay && isInView}
      preload={hasLoaded ? "auto" : preload}
      {...props}
    />
  );
}
