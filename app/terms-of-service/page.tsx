import type { Metadata } from "next";
import Link from "next/link";

import { LegalPageShell, LegalSection } from "@/components/site/LegalPageShell";

export const metadata: Metadata = {
  title: "Terms of Service | NRK Iron & Steel",
  description: "Website terms for NRK Iron & Steel product, service, and enquiry information.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageShell
      eyebrow="Terms"
      title="Terms of Service"
      icon="contract"
      lead="The usage terms for browsing NRK Iron & Steel website content, requesting information, and engaging with our business enquiry channels."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="border border-outline-variant/70 bg-white px-6 py-4 shadow-sm md:px-10">
          <LegalSection title="Website Use">
            <p>
              This website is provided for general information about NRK Iron & Steel, our products, processing
              services, logistics capabilities, and enquiry channels. By using the website, you agree to use it
              only for lawful business and informational purposes.
            </p>
          </LegalSection>

          <LegalSection title="Product And Service Information">
            <p>
              Product descriptions, images, specifications, grades, dimensions, and availability are indicative
              and may vary by stock, sourcing, processing requirements, and commercial confirmation. Final supply
              terms are governed by written quotation, purchase order, invoice, and mutually agreed specifications.
            </p>
          </LegalSection>

          <LegalSection title="Quotes And Enquiries">
            <p>
              Submitting an enquiry does not create a binding supply commitment. Pricing, delivery timelines,
              technical suitability, taxes, loading, transport, and documentation are confirmed separately by the
              NRK Iron & Steel team.
            </p>
          </LegalSection>

          <LegalSection title="Intellectual Property">
            <p>
              Website text, branding, layout, images, and design elements are owned by or licensed to NRK Iron &
              Steel unless otherwise stated. You may not copy, reproduce, or republish website material for
              commercial use without prior permission.
            </p>
          </LegalSection>

          <LegalSection title="Limitation Of Liability">
            <p>
              We aim to keep information accurate and current, but the website is provided without warranties of
              uninterrupted access or absolute accuracy. NRK Iron & Steel is not liable for losses arising from
              reliance on website information without direct commercial or technical confirmation.
            </p>
          </LegalSection>
        </div>

        <aside className="h-fit border border-outline-variant/70 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-secondary">Commercial Terms</p>
          <h2 className="mb-4 font-display text-2xl font-black uppercase text-primary">Request Confirmation</h2>
          <p className="mb-6 text-sm leading-6 text-on-surface-variant">
            For grade, tolerance, availability, delivery, and pricing confirmation, speak with our sales team.
          </p>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center bg-primary px-5 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-primary-container"
          >
            Request Quote
          </Link>
        </aside>
      </div>
    </LegalPageShell>
  );
}
