"use client";

import { useEffect, useState } from "react";

let cachedData: Record<string, any> = {};
let fetchPromises: Record<string, Promise<any> | null> = {};

// Helper to clear cache
export function clearSiteDataCache() {
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

    const updateData = () => {
      // Check localStorage first for instant draft preview across serverless environments
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
      fetchSiteData(dataType).then((db) => {
        if (db && db[key] !== undefined) {
          setData(db[key]);
        }
      });
    };

    updateData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "nrk_draft_preview_data") {
        clearSiteDataCache();
        updateData();
      }
    };

    window.addEventListener("focus", updateData);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("focus", updateData);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return data;
}
