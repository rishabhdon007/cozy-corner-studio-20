"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SiteButton } from "@/components/site/SiteButton";
import { isNavActive, navItems, siteName } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/70 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-container-max items-center justify-between px-gutter py-3">
        <Link
          href="/"
          className="group flex items-center gap-3 font-display-lg text-headline-md font-black text-primary transition-colors duration-300 hover:text-secondary"
        >
          <img
            src="/company_logo.png"
            alt="NRK Iron & Steel Logo"
            className="h-12 max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 md:h-14"
          />
          <span className="tracking-tight">{siteName}</span>
        </Link>

        <nav className="hidden items-center gap-2 font-label-md text-label-md md:flex">
          {navItems.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`site-nav-link ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <SiteButton href="/contact" variant="header">
            Get Quote
          </SiteButton>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="rounded-full p-2 text-primary transition-colors hover:bg-primary/5 hover:text-secondary md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {mobileOpen ? (
        <nav className="space-y-1 border-t border-outline-variant/40 px-gutter pb-4 md:hidden">
          {navItems.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-4 py-2 transition-colors ${
                  active
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-primary/5 hover:text-primary"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <SiteButton
            href="/contact"
            variant="header"
            className="mt-2 w-full text-center"
            onClick={() => setMobileOpen(false)}
          >
            Get Quote
          </SiteButton>
        </nav>
      ) : null}
    </header>
  );
}
