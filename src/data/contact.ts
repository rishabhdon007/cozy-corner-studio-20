import type { StaticImageData } from "next/image";

import indiaMartLogo from "@/assests/IndiaMART_logo.webp";
import justDialLogo from "@/assests/jdlogosvg.svg";

export const contactCopy = {
  eyebrow: "Connect With NRK",
  title: "Get in Touch with Our Steel Experts",
  description:
    "Looking for a trusted steel partner? Reach out to NRK Iron & Steel for product queries, specific processing services, and latest steel market insights. Our team is ready to support your needs with reliable solutions.",
} as const;

export const contactCtaBackgroundImage =
  "https://lh3.googleusercontent.com/aida/ADBb0uho3J8PK1DxDK2XTCdhFR4hHbGEts4H22MIe-m8oGrD6wvojf4Lj4UBpaLmUNyd_8NOlomRvvQFSnSAcArKyTr4I8fUtjF0LzRGPbi41qzud5wKVuuK9MuKAavjwVdIXrSwv4K1zjWV-XpKbZCVZ8mORQmM2MTUTAJdxImC_yEM0nl6J0y_IRwHOf2lnNIGinCiEP1i4vMagGLl4HlDRcwXvncddvRupxE3gOzvMYQtegTLO9oj4QUlXQk";

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
  email: "info@nrksteel.com",
  emailHref: "mailto:info@nrksteel.com",
  phone: "095757 07070",
  phoneHref: "tel:+919575707070",
  phoneTel: "+919575707070",
  whatsappNumber: "919575707070",
  whatsappMessage: "Hello NRK Iron & Steel, I want to discuss my steel requirement.",
  address: {
    line1: "S.K.- 1 COMPOUND, PLOT NO. 46, 47, MR 11",
    line2: "Dewas Naka, Lasudia Mori, Indore, Madhya Pradesh 452010",
    full: "S.K.- 1 COMPOUND, PLOT NO. 46, 47, MR 11, Dewas Naka, Lasudia Mori, Indore, Madhya Pradesh 452010",
    city: "Indore, MP",
    mapQuery:
      "S.K.-+1+COMPOUND,+PLOT+NO.+46,+47,+MR+11,+Dewas+Naka,+Lasudia+Mori,+Indore,+Madhya+Pradesh+452010",
  },
  indiaMartUrl: "https://www.indiamart.com/nrk-ironandsteelsindore/",
  justDialUrl:
    "https://www.justdial.com/Indore/Nrk-Iron-and-Steel-LLP-KHASRA-SURVEY-NO-623-624-627-LASUDIA-MORI-Dewas-Naka-Indore/0731PX731-X731-220420165534-Z5E5_BZDET",
  indiaMart: {
    url: "https://www.indiamart.com/nrk-ironandsteelsindore/",
    logo: indiaMartLogo,
    eyebrow: "Verified Profile",
    label: "Visit our IndiaMART Profile",
  },
  justDial: {
    url: "https://www.justdial.com/Indore/Nrk-Iron-and-Steel-LLP-KHASRA-SURVEY-NO-623-624-627-LASUDIA-MORI-Dewas-Naka-Indore/0731PX731-X731-220420165534-Z5E5_BZDET",
    logo: justDialLogo,
    eyebrow: "Business Listing",
    label: "Visit our JustDial Profile",
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
    detail: "Andheri East",
    accent: "outline" as const,
  },
  {
    id: "rajkot",
    label: "Node",
    city: "Rajkot",
    detail: "GIDC Metoda",
    accent: "outline" as const,
  },
  {
    id: "bokaro",
    label: "Node",
    city: "Bokaro",
    detail: "Steel City",
    accent: "outline" as const,
  },
] as const;
