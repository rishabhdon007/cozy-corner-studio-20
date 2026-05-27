export const siteName = "NRK Iron & Steel";

export const siteTagline =
  "India's trusted steel distributor and processor, delivering quality and precision.";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const serviceFooterLinks = [
  { label: "Slitting", href: "/services/slitting" },
  { label: "Cut to Length", href: "/services/cut-to-length" },
  { label: "Annealing", href: "/services/annealing" },
  { label: "HR, CR & MS Plates", href: "/services/hr-cr-ms-plates" },
  { label: "Coated & Profile Sheets", href: "/services/coated-profile-sheets" },
  { label: "Logistics & Warehousing", href: "/services/logistics-warehousing" },
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
  return pathname === href || pathname.startsWith(`${href}/`);
}
