"use client";

import { useEffect, useRef } from "react";

import { initButtonClickProgress } from "@/buttonClickProgressDom";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[9999] h-1 bg-primary/10">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-secondary shadow-[0_0_12px_rgba(72,98,110,0.45)] transition-transform duration-75 ease-linear"
      />
    </div>
  );
}

export function SiteEffects() {
  const mounted = useHasMounted();
  useScrollReveal(undefined, mounted);

  useEffect(() => {
    if (!mounted) return;
    return initButtonClickProgress(document.body);
  }, [mounted]);

  return <ScrollProgressBar />;
}
