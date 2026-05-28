"use client";

import Link from "next/link";
import { useEffect, type CSSProperties } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

import { SiteButton } from "@/components/site/SiteButton";
import { isNavActive, navItems } from "@/data/site";
import { cn } from "@/lib/utils";

type MobileNavMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
};

export function MobileNavMenu({ open, onOpenChange, pathname }: MobileNavMenuProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <SheetPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <SheetPrimitive.Portal>
        <SheetPrimitive.Overlay
          className={cn(
            "mobile-nav-overlay fixed inset-0 z-[120] bg-primary/40 backdrop-blur-sm",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:duration-300 data-[state=open]:duration-400",
          )}
        />
        <SheetPrimitive.Content
          id="mobile-navigation-panel"
          aria-describedby={undefined}
          className={cn(
            "mobile-nav-panel fixed inset-y-0 right-0 z-[121] flex h-dvh w-full max-w-none flex-col bg-primary text-on-primary shadow-2xl outline-none",
            "data-[state=closed]:animate-out data-[state=open]:animate-in",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            "data-[state=closed]:duration-300 data-[state=open]:duration-500",
            "md:max-w-[min(100vw,24rem)] lg:max-w-[min(100vw,22rem)]",
          )}
        >
          <SheetPrimitive.Title className="sr-only">Site navigation menu</SheetPrimitive.Title>
          <div className="flex items-center justify-between border-b border-white/10 px-gutter py-4">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => onOpenChange(false)}
            >
              <img
                src="/company_logo.webp"
                alt="NRK Iron & Steel"
                className="h-10 w-auto object-contain"
              />
              <div className="leading-none">
                <p className="text-sm font-black tracking-tight text-white">NRK Iron &amp; Steel</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
                  Menu
                </p>
              </div>
            </Link>
            <SheetPrimitive.Close
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/15"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </SheetPrimitive.Close>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto px-gutter py-6">
            <ul className="space-y-2">
              {navItems.map((item, index) => {
                const active = isNavActive(pathname, item.href);
                return (
                  <li
                    key={item.href}
                    className="mobile-nav-item"
                    style={{ "--nav-index": index } as CSSProperties}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-bold transition-colors",
                        active
                          ? "bg-white text-primary shadow-md"
                          : "bg-white/8 text-white hover:bg-white/12",
                      )}
                      aria-current={active ? "page" : undefined}
                      onClick={() => onOpenChange(false)}
                    >
                      {item.label}
                      <span className="material-symbols-outlined text-xl opacity-70">chevron_right</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div
              className="mobile-nav-item mt-auto pt-8"
              style={{ "--nav-index": navItems.length } as CSSProperties}
            >
              <SiteButton
                href="/contact"
                variant="white"
                layout="full"
                className="w-full"
                onClick={() => onOpenChange(false)}
              >
                Get Quote
              </SiteButton>
              <p className="mt-6 text-center text-xs leading-relaxed text-white/55">
                Trusted steel distribution &amp; processing partner since 1992.
              </p>
            </div>
          </nav>
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  );
}
