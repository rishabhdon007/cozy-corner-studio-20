"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export function PreviewBanner() {
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const activePreview = searchParams.get("preview") === "true";
      setIsPreview(activePreview);

      if (activePreview) {
        const handleAnchorClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          const anchor = target.closest("a");
          if (!anchor) return;

          const href = anchor.getAttribute("href");
          if (!href) return;

          if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/admin")) {
            try {
              const url = new URL(href, window.location.origin);
              if (!url.searchParams.has("preview")) {
                url.searchParams.set("preview", "true");
                anchor.setAttribute("href", url.pathname + url.search);
              }
            } catch (err) {
              console.error("Failed to append preview param", err);
            }
          }
        };

        window.addEventListener("click", handleAnchorClick, { capture: true });
        return () => window.removeEventListener("click", handleAnchorClick, { capture: true });
      }
    }
  }, []);

  if (!isPreview) return null;

  return (
    <div className="bg-amber-500 text-white px-4 py-2 flex items-center justify-between text-xs sm:text-sm font-semibold shadow-md relative z-[9999] animate-bounce-subtle">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span>Preview Mode: Showing draft changes (not yet committed to live site).</span>
      </div>
      <Link 
        href="/admin" 
        className="bg-white text-amber-700 px-3 py-1 rounded hover:bg-amber-50 transition-colors shrink-0"
      >
        Back to Admin
      </Link>
    </div>
  );
}

