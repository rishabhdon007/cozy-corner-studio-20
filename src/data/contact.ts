import type { StaticImageData } from "next/image";

import { SITE_IMAGES } from "@/lib/siteImages";

export const contactCopy = {
  eyebrow: "Connect With NRK",
  title: "Get in Touch with Our Steel Experts",
  description:
    "Looking for a trusted steel partner? Reach out to NRK Iron & Steel for product queries, specific processing services, and latest steel market insights. Our team is ready to support your needs with reliable solutions.",
} as const;

/** Direct download link for NRK Steel Pvt Ltd brochure (Google Drive). */
export const brochureDownloadUrl =
  "https://drive.google.com/uc?export=download&id=1T8ImL0kmzVByXivNbbBGPr6jv1fwT6JI";

export function assetSrc(image: StaticImageData | string): string {
  return typeof image === "string" ? image : image.src;
}

export type CatalogInquiryKind = "service" | "product";

export type CatalogInquiryIntent = "inquire" | "sales";

export function buildCatalogWhatsAppMessage(
  title: string,
  kind: CatalogInquiryKind,
  intent: CatalogInquiryIntent,
): string {
  const kindLabel = kind === "service" ? "service" : "product";

  if (intent === "sales") {
    return `Hello NRK Iron & Steel, I would like to speak with sales about ${title} (${kindLabel}). Please connect me with your team.`;
  }

  return `Hello NRK Iron & Steel, I would like to inquire about ${title} (${kindLabel}). Please share pricing, availability, and relevant details.`;
}

export function buildWhatsAppHref(message: string): string {
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const contactInfo = {
  email: "info@nrkind.com",
  emailHref: "mailto:info@nrkind.com",
  phone: "095757 07070",
  phoneHref: "tel:+919575707070",
  phoneTel: "+919575707070",
  secondaryPhones: [
    { display: "0731-2420824", href: "tel:+917312420824" },
    { display: "0731-2420825", href: "tel:+917312420825" },
    { display: "+91-9302106507", href: "tel:+919302106507" },
    { display: "+91-9977777099", href: "tel:+919977777099" },
  ],
  whatsappNumber: "919575707070",
  whatsappMessage: "Hello NRK Iron & Steel, I want to discuss my steel requirement.",
  website: "https://www.nrkind.com",
  address: {
    line1: "S.K.-1 Compound, Plot No. 46, 47",
    line2: "Khasra Survey No. 62/3, 62/4, 62/7, Lasudia Mori, M.R.-11, Dewas Naka",
    line3: "Indore, Madhya Pradesh – 452010",
    full: "S.K.-1 Compound, Plot No. 46, 47, Khasra Survey No. 62/3, 62/4, 62/7, Lasudia Mori, M.R.-11, Dewas Naka, Indore, Madhya Pradesh – 452010",
    city: "Indore, MP",
    mapQuery:
      "S.K.-+1+COMPOUND,+PLOT+NO.+46,+47,+MR+11,+Dewas+Naka,+Lasudia+Mori,+Indore,+Madhya+Pradesh+452010",
  },
  indiaMartUrl: "https://www.indiamart.com/nrk-ironandsteelsindore/",
  justDialUrl:
    "https://www.justdial.com/Indore/Nrk-Iron-and-Steel-LLP-KHASRA-SURVEY-NO-623-624-627-LASUDIA-MORI-Dewas-Naka-Indore/0731PX731-X731-220420165534-Z5E5_BZDET",
  indiaMart: {
    url: "https://www.indiamart.com/nrk-ironandsteelsindore/",
    logo: SITE_IMAGES.indiaMartLogo,
    eyebrow: "Verified Profile",
    label: "Visit our IndiaMART Profile",
  },
  justDial: {
    url: "https://www.justdial.com/Indore/Nrk-Iron-and-Steel-LLP-KHASRA-SURVEY-NO-623-624-627-LASUDIA-MORI-Dewas-Naka-Indore/0731PX731-X731-220420165534-Z5E5_BZDET",
    logo: SITE_IMAGES.justDialLogo,
    eyebrow: "Business Listing",
    label: "Visit our JustDial Profile",
  },
  googleReviews: {
    businessName: "NRK Iron and Steels LLP",
    rating: 5.0,
    reviewCount: 4,
    label: "View on Google",
    url: "https://www.google.com/maps/search/?api=1&query=NRK+Iron+and+Steels+LLP+S.K.-+1+COMPOUND+Plot+No.+46+47+MR+11+Dewas+Naka+Lasudia+Mori+Indore+Madhya+Pradesh+452010",
  },
} as const;

export const contactLocations = [
  {
    id: "hq",
    label: "Corporate Headquarters",
    city: "Indore, MP",
    detail: contactInfo.address.full,
    accent: "secondary" as const,
  },
  {
    id: "mumbai",
    label: "Node",
    city: "Mumbai",
    detail: "Import & Logistics Terminal",
    accent: "outline" as const,
  },
  {
    id: "gujarat",
    label: "Node",
    city: "Gujarat",
    detail: "Distribution Hub",
    accent: "outline" as const,
  },
  {
    id: "bokaro",
    label: "Node",
    city: "Bokaro",
    detail: "Raw Material Sourcing Base",
    accent: "outline" as const,
  },
] as const;

/** Service coverage regions from brochure */
export const serviceRegions = [
  "Madhya Pradesh",
  "Gujarat",
  "Maharashtra",
  "Rajasthan",
  "Punjab",
] as const;
