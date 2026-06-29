"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { ServicesGridSection } from "@/components/ServicesGridSection";
import { ServiceCard } from "@/components/ServiceCard";
import { cn } from "@/lib/utils";
import { catalogSections } from "@/data/catalogSections";
import { allServiceCards, type ServiceCardItem } from "@/data/serviceCards";

function matchesQuery(item: ServiceCardItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.slug.toLowerCase().replace(/-/g, " ").includes(q)
  );
}

function filterItems(items: ServiceCardItem[], query: string): ServiceCardItem[] {
  return items.filter((item) => matchesQuery(item, query));
}

export function ServicesCatalogPage() {
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const seen = new Set<string>();
    return allServiceCards.filter((item) => {
      if (!matchesQuery(item, trimmedQuery)) return false;
      const key = `${item.kind ?? "service"}-${item.slug}-${item.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [isSearching, trimmedQuery]);

  const visibleSections = useMemo(
    () =>
      catalogSections
        .map((section) => ({
          ...section,
          items: filterItems(section.items, trimmedQuery),
        }))
        .filter((section) => section.items.length > 0),
    [trimmedQuery],
  );

  return (
    <main className="mx-auto max-w-7xl space-y-4 px-4 py-10 sm:px-6 lg:px-8">
      <div
        data-scroll-reveal="top"
        className="relative mb-8 overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] via-white to-secondary/[0.08] p-4 shadow-md shadow-primary/5 sm:p-6"
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-secondary/10 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-primary/10 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span id="catalog-search-label" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              Search Catalogue
            </span>
            <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              {allServiceCards.length} items
            </span>
          </div>

          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary"
              aria-hidden="true"
            />
            <input
              id="catalog-search"
              type="search"
              aria-labelledby="catalog-search-label"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product or service name… e.g. CR Sheets, Centering, Slitting"
              className={cn(
                "w-full rounded-xl border-2 border-primary/15 bg-white py-3.5 pl-12 pr-12 text-sm font-medium text-gray-900 shadow-sm",
                "placeholder:font-normal placeholder:text-gray-400",
                "transition-all focus:border-secondary/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-secondary/15",
              )}
              autoComplete="off"
              spellCheck={false}
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-primary/5 hover:text-primary"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          {isSearching ? (
            <p className="mt-3 text-sm text-gray-600">
              {searchResults.length > 0 ? (
                <>
                  Showing{" "}
                  <span className="inline-flex min-w-[1.5rem] items-center justify-center rounded-md bg-secondary/20 px-1.5 py-0.5 font-black text-primary">
                    {searchResults.length}
                  </span>{" "}
                  result
                  {searchResults.length === 1 ? "" : "s"} for &ldquo;{trimmedQuery}&rdquo;
                </>
              ) : (
                <>No matches for &ldquo;{trimmedQuery}&rdquo;. Try CR, HR, centering, or slitting.</>
              )}
            </p>
          ) : (
            <p className="mt-3 text-sm text-gray-600">
              <span className="font-bold text-primary">{allServiceCards.length}</span> products and services · search
              by name to find quickly
            </p>
          )}
        </div>
      </div>

      {isSearching ? (
        searchResults.length > 0 ? (
          <section className="mb-16 bg-transparent py-0">
            <div className="site-section-header mb-stack-md text-center">
              <span className="site-section-eyebrow">Search Results</span>
              <h2 className="site-section-title">
                <span>Matching Catalogue Items</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6">
              {searchResults.map((item, index) => (
                <ServiceCard
                  key={`${item.id}-${item.slug}`}
                  item={item}
                  catalogKind={item.kind}
                  revealDirection={index % 2 === 0 ? "left" : "right"}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="mb-16 rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center">
            <span className="material-symbols-outlined mb-3 text-4xl text-gray-300">search_off</span>
            <p className="text-lg font-bold text-primary">No catalogue items found</p>
            <p className="mt-2 text-sm text-gray-500">Check spelling or browse the sections below after clearing search.</p>
          </div>
        )
      ) : (
        visibleSections.map((section, index) => (
          <ServicesGridSection
            key={section.id}
            sectionId={section.id}
            items={section.items}
            showHeader
            heading={section.heading}
            description={section.description}
            className={cn("bg-transparent py-0", index === visibleSections.length - 1 ? "mb-16" : "mb-10")}
          />
        ))
      )}
    </main>
  );
}
