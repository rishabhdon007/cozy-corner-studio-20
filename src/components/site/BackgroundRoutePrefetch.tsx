"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { startSecondaryPagePrefetch } from "@/lib/secondaryPagePrefetch";

export function BackgroundRoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    startSecondaryPagePrefetch((href) => {
      router.prefetch(href);
    });
  }, [router]);

  return null;
}
