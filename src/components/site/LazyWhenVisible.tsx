"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type LazyWhenVisibleProps = {
  children: ReactNode;
  fallback?: ReactNode;
  minHeight?: number | string;
  rootMargin?: string;
  className?: string;
};

export function LazyWhenVisible({
  children,
  fallback,
  minHeight = 320,
  rootMargin = "240px 0px",
  className,
}: LazyWhenVisibleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || isVisible) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={cn(className)}
      style={{ minHeight: isVisible ? undefined : minHeight }}
    >
      {isVisible ? children : fallback}
    </div>
  );
}
