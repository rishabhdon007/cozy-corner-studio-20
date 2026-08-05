"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export function PreviewBanner() {
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setIsPreview(searchParams.get("preview") === "true");
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

