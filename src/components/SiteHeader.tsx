"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { MobileNavMenu } from "@/components/site/MobileNavMenu";
import { SiteButton } from "@/components/site/SiteButton";
import { SiteImage } from "@/components/site/SiteImage";
import { SITE_IMAGES } from "@/lib/siteImages";
import { isNavActive, navItems } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-outline-variant/70 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-container-max items-center justify-between gap-3 px-gutter py-3">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2 transition-opacity duration-300 hover:opacity-90 sm:gap-3"
          >
            <SiteImage
              src={SITE_IMAGES.companyLogo}
              alt="NRK Iron & Steel Logo"
              width={160}
              height={48}
              className="h-10 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11 md:h-12"
              priority
            />
            <div className="min-w-0 flex flex-col leading-none">
              <span className="site-brand-name truncate">
                <span className="site-brand-nrk">NRK</span>
                <span className="site-brand-divider" aria-hidden="true" />
                <span className="site-brand-text">Iron &amp; Steel</span>
              </span>
              <span className="site-brand-tagline hidden min-[400px]:block max-lg:sr-only">Trusted Steel Partner Since 1992</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1.5 font-label-md text-label-md lg:flex lg:gap-2">
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

          <div className="hidden items-center space-x-4 lg:flex">
            <SiteButton href="/contact" variant="header">
              Get Quote
            </SiteButton>
          </div>

          <button
            type="button"
            id="mobile-menu-btn"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-panel"
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary transition-all duration-300 lg:hidden",
              mobileOpen ? "bg-primary text-white" : "hover:bg-primary/5 hover:text-secondary",
            )}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      <MobileNavMenu open={mobileOpen} onOpenChange={setMobileOpen} pathname={pathname} />
    </>
  );
}
