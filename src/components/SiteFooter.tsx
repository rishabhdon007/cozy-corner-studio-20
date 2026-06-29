"use client";

import Link from "next/link";

import { SiteImage } from "@/components/site/SiteImage";
import { contactInfo } from "@/data/contact";
import { SITE_IMAGES } from "@/lib/siteImages";
import { legalLinks, quickLinks, serviceFooterLinks, siteName, siteTaglineExtended, socialLinks } from "@/data/site";

function SocialIcon({ label }: { label: string }) {
  const svgClass = "block size-5 shrink-0 fill-current";
  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className={svgClass} aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className={svgClass} aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={svgClass} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer full-width border-t border-outline-variant/10 bg-primary text-on-primary">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-gutter py-stack-lg md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1 space-y-4 md:col-span-2 lg:col-span-1">
          <Link href="/" className="mb-4 flex items-center gap-3 font-display-lg text-headline-md font-black text-on-primary">
            <SiteImage
              src={SITE_IMAGES.companyLogo}
              alt="NRK Iron & Steel Logo"
              width={160}
              height={56}
              className="h-12 max-h-14 w-auto object-contain md:h-14"
            />
            <span>{siteName}</span>
          </Link>
          <p className="max-w-xs font-body-md text-body-md text-surface-variant opacity-80">{siteTaglineExtended}</p>
          <div>
            <h4 className="mb-4 font-headline-md text-sm text-secondary-fixed">Follow Us</h4>
            <div className="flex flex-wrap items-center justify-start gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit NRK Iron & Steel on ${social.label}`}
                  className="footer-social-link inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 p-0 text-on-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary-fixed hover:bg-secondary-fixed hover:text-primary"
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-headline-md text-lg text-secondary-fixed">Quick Links</h4>
          <ul className="space-y-2 font-body-md text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-surface-variant opacity-80 transition-opacity hover:text-on-primary hover:opacity-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-headline-md text-lg text-secondary-fixed">Our Products</h4>
          <ul className="space-y-2 font-body-md text-sm">
            {serviceFooterLinks.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="text-surface-variant opacity-80 transition-opacity hover:text-on-primary hover:opacity-100"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-headline-md text-lg text-secondary-fixed">Contact Info</h4>
          <ul className="space-y-3 font-body-md text-sm text-surface-variant opacity-80">
            <li className="flex items-start">
              <span className="material-symbols-outlined mr-2 mt-0.5 text-sm">location_on</span>
              <a
                href={contactInfo.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:text-on-primary hover:opacity-100"
              >
                {contactInfo.address.full}
              </a>
            </li>
            <li className="flex items-center">
              <span className="material-symbols-outlined mr-2 text-sm">call</span>
              <a href={contactInfo.phoneHref} className="transition-opacity hover:text-on-primary hover:opacity-100">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-center">
              <span className="material-symbols-outlined mr-2 text-sm">mail</span>
              <a href={contactInfo.emailHref} className="transition-opacity hover:text-on-primary hover:opacity-100">
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-4 px-gutter py-4 font-body-md text-sm text-surface-variant opacity-80 md:flex-row">
        <p>© 2026 NRK Iron & Steel. All rights reserved.</p>
        <p className="text-center md:text-right">
          Design and developed by{" "}
          <a
            className="font-bold text-secondary-fixed transition-colors hover:text-on-primary"
            href="https://www.devyugsolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Devyug Solutions Pvt Ltd
          </a>
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-opacity hover:text-on-primary hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
