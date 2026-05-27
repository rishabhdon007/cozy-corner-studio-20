import type { Metadata } from "next";
import Link from "next/link";

import { LegalPageShell } from "@/components/site/LegalPageShell";
import { productSlugs } from "@/data/products";
import { serviceFooterLinks, quickLinks, legalLinks } from "@/data/site";
import { getService } from "@/data/services";
import { getProduct } from "@/data/products";

export const metadata: Metadata = {
  title: "Sitemap | NRK Iron & Steel",
  description: "Browse all key NRK Iron & Steel website pages, services, products, and legal resources.",
};

const primaryPages = [
  { label: "Home", href: "/" },
  ...quickLinks.filter((link) => link.href !== "/"),
  { label: "Products", href: "/product" },
];

const productLinks = productSlugs.map((slug) => ({
  label: getProduct(slug)?.title ?? slug,
  href: `/product/${slug}`,
}));

const sitemapGroups = [
  {
    title: "Company",
    icon: "corporate_fare",
    links: primaryPages,
  },
  {
    title: "Services",
    icon: "precision_manufacturing",
    links: serviceFooterLinks.map((link) => ({
      label: getService(link.href.split("/").pop() ?? "")?.title ?? link.label,
      href: link.href,
    })),
  },
  {
    title: "Products",
    icon: "inventory_2",
    links: [{ label: "Product Catalogue", href: "/product" }, ...productLinks],
  },
  {
    title: "Legal",
    icon: "policy",
    links: legalLinks,
  },
] as const;

export default function SitemapPage() {
  return (
    <LegalPageShell
      eyebrow="Navigation"
      title="Sitemap"
      icon="account_tree"
      lead="A clear index of company pages, processing services, product detail pages, and legal resources across the NRK Iron & Steel website."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sitemapGroups.map((group) => (
          <section key={group.title} className="border border-outline-variant/70 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center bg-primary text-white">
                <span className="material-symbols-outlined" aria-hidden="true">
                  {group.icon}
                </span>
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">Site Section</p>
                <h2 className="font-display text-2xl font-black uppercase text-primary">{group.title}</h2>
              </div>
            </div>
            <ul className="divide-y divide-outline-variant/60">
              {group.links.map((link) => (
                <li key={`${group.title}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-4 py-4 text-sm font-bold text-on-surface-variant transition-colors hover:text-primary"
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-base text-outline transition-transform group-hover:translate-x-1 group-hover:text-primary">
                      arrow_forward
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </LegalPageShell>
  );
}
