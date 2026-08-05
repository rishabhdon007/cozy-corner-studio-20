"use client";

import { useEffect, useState } from "react";

let cachedData: Record<string, any> = {};
let fetchPromises: Record<string, Promise<any> | null> = {};

// Helper to clear cache
function clearSiteDataCache() {
  cachedData = {};
  fetchPromises = {};
}

// Add window focus listener to auto-clear cache when returning to the preview tab
if (typeof window !== "undefined") {
  window.addEventListener("focus", clearSiteDataCache);
}

async function fetchSiteData(type: "draft" | "published") {
  if (cachedData[type]) return cachedData[type];
  if (fetchPromises[type]) return fetchPromises[type];

  fetchPromises[type] = fetch(`/api/admin/data?type=${type}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then((data) => {
      cachedData[type] = data;
      return data;
    })
    .catch((err) => {
      console.error(`Data fetch failed for ${type}`, err);
      fetchPromises[type] = null;
      return null;
    });

  return fetchPromises[type];
}

export function useSiteData<T>(key: string, defaultValue: T): T {
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const isPreview = searchParams.get("preview") === "true";

    // Instant localStorage preview support for serverless deploy
    if (isPreview) {
      const localData = localStorage.getItem("nrk_draft_preview_data");
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          if (parsed && parsed.draft && parsed.draft[key] !== undefined) {
            setData(parsed.draft[key]);
            return;
          }
        } catch (e) {
          console.error("Failed to parse localStorage preview data", e);
        }
      }
    }

    const dataType = isPreview ? "draft" : "published";

    // Setup an updater interval or trigger on focus
    const updateData = () => {
      // Check localStorage again on update/focus
      if (isPreview) {
        const localData = localStorage.getItem("nrk_draft_preview_data");
        if (localData) {
          try {
            const parsed = JSON.parse(localData);
            if (parsed && parsed.draft && parsed.draft[key] !== undefined) {
              setData(parsed.draft[key]);
              return;
            }
          } catch (_) {}
        }
      }

      fetchSiteData(dataType).then((db) => {
        if (db && db[key]) {
          setData(db[key]);
        }
      });
    };

    updateData();

    // Re-fetch when the page is focused to ensure live preview updates instantly
    window.addEventListener("focus", updateData);
    return () => window.removeEventListener("focus", updateData);
  }, [key]);

  return data;
}
