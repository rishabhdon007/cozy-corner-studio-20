"use client";

import { useEffect } from "react";

import { initButtonClickProgress } from "@/buttonClickProgressDom";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function SiteEffects() {
  const mounted = useHasMounted();
  useScrollReveal(undefined, mounted);

  useEffect(() => {
    if (!mounted) return;
    return initButtonClickProgress(document.body);
  }, [mounted]);

  return null;
}
