export const siteName = "NRK Iron & Steel";

export const siteTagline =
  "We PROVIDE Competitive rates and timely deliveries.";

export const siteTaglineExtended =
  "India's trusted steel distributor and processor — delivering quality, precision, and timely supply since 1994.";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Products", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Products", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const serviceFooterLinks = [
  { label: "Slitting", href: "/services/slitting" },
  { label: "Cut to Length", href: "/services/cut-to-length" },
  { label: "Annealing", href: "/services/annealing" },
  { label: "Crane Handling", href: "/services/crane-handling" },
  { label: "Profiling & Fabrication", href: "/services/profiling-fabrication" },
  { label: "Logistics & Transport", href: "/services/logistics-warehousing" },
  { label: "HR Sheets & Coils", href: "/product/hr-sheets-coils" },
  { label: "Cold Rolled Coils", href: "/product/cold-rolled-coils" },
  { label: "Centering Plates", href: "/product/centering-plates" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Sitemap", href: "/sitemap" },
] as const;

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/nrksteels/" },
  { label: "Instagram", href: "https://www.instagram.com/nrksteels/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nrk-iron-steel-llp" },
] as const;

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/services") {
    return pathname === "/services" || pathname.startsWith("/services/") || pathname.startsWith("/product");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
