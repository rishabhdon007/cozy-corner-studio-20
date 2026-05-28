"use client";

import { useMemo, useState } from "react";

import { SectionHeading } from "@/components/site/SectionHeading";
import fallbackImage from "@/assests/constrution area.webp";

const filters = ["All", "Manufacturing", "Logistics", "Facilities"] as const;
type GalleryFilter = (typeof filters)[number];

const galleryItems = [
  {
    category: "Manufacturing" as const,
    title: "Heavy Slitting Operations",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0uhlMAkLjSuHuh5Nlgp_0YcZG1ec0WSnd4QBpgzql8UzRSLcGybcim1ElD1wV8tfD73weAYy6HtNSxPhccDrV3KJ-NVCLHeccgEkIZ0p78xWGam2JqDJo2xVQrQ1SzEUIu3nNYx7xxb5dHn56vmQenmhf7ZnZLDd4-4AUgPmqub4hDtoTSY2OqBrY9m0leqYeqr9TuflYReios4IP-kXeE8oWrmlS1Yirq4h4HhAvRiEWTwDCZuuGDJpqhA",
    large: true,
  },
  {
    category: "Logistics" as const,
    title: "Global Distribution Network",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0uiWVd4j9jlXFmKG0MlhiuhvWN8z4QH9YHt_X1GYxABpAYeE-AnJuYQtz2q4NiDIqYcdbHA34CJ0IqSRekO9XqfNzBMtZuUruYZxvWiryvH9QdjP-78BTCr_7ObmTV01YlDrwvXZgSrflaqbBQqV7L74i66s1ZhxfT-fPTybBzoptcjrPGtxEwQ37tOCeoH6yLgWJJaRIgoxJelLJXIOfVpIxEv9G20ntD1QEyzI_V0NYHpYhlYWHquV1I0",
    large: false,
  },
  {
    category: "Facilities" as const,
    title: "Premium TMT Storage",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0ujNeJfj5wjuiu3qa5PPpnbdTCPvKNZ6N2yri4I15sFCyU37e27ZxTaBi-X_HrEEoMrBQ_Y87Eky8g_cWUxRDlugbnlELvSyUYarJSXBSVn3wUXaFOlujrxI8ykr_gOeXzy-9wgeAJ9fdfdpExYYPQ4PuLncFTJa42kasKT_q9zpCwhLgzElMiOrDPJ6PkodKV-52kPNF3ODoLhOUdTcw0k9CTEY048brLSdv86qeEhwYXr-VqT5vRXSubc",
    large: false,
  },
];

export function IndustrialGallerySection() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("All");

  const visibleItems = useMemo(
    () =>
      activeFilter === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  return (
    <section className="w-full bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-gutter">
        <div className="mb-stack-md flex flex-col items-end justify-between gap-4 md:flex-row">
          <SectionHeading
            align="left"
            eyebrow="Visual Showcase"
            title="Industrial Gallery"
            lead="Visual documentation of our facilities and logistics capabilities."
            titleClassName="mb-2"
            leadClassName="mb-2"
            className="mb-stack-md"
          />
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg border px-4 py-2 font-label-md text-label-md transition-all ${
                  activeFilter === filter
                    ? "border-transparent bg-primary-container text-on-primary-container"
                    : "border-outline-variant bg-surface text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="grid auto-rows-[250px] grid-cols-1 gap-4 md:grid-cols-3">
          {visibleItems.map((item) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container ${
                item.large ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={item.image}
                onError={(event) => {
                  event.currentTarget.src = fallbackImage.src;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tertiary/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="mb-2 inline-block rounded bg-surface/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-on-primary backdrop-blur-md">
                  {item.category}
                </span>
                <h3
                  className={`text-on-primary ${item.large ? "font-headline-md text-headline-md" : "font-label-md text-label-md"}`}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
