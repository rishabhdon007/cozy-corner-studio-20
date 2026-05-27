import type { Metadata } from "next";
import Link from "next/link";

import { LegalPageShell, LegalSection } from "@/components/site/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | NRK Iron & Steel",
  description: "Privacy practices for NRK Iron & Steel enquiries, contact forms, and business communication.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      icon="shield_lock"
      lead="How NRK Iron & Steel handles business enquiries, contact details, and communication data shared through this website."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="border border-outline-variant/70 bg-white px-6 py-4 shadow-sm md:px-10">
          <LegalSection title="Information We Collect">
            <p>
              We may collect information you submit through enquiry forms, calls, email links, directory links,
              or quote requests. This can include your name, company name, phone number, email address,
              location, product requirements, service interests, and message details.
            </p>
          </LegalSection>

          <LegalSection title="How We Use Information">
            <p>
              Information is used to respond to enquiries, prepare quotations, coordinate product or service
              discussions, improve customer support, and maintain internal business records related to steel
              supply, processing, logistics, and after-sales communication.
            </p>
          </LegalSection>

          <LegalSection title="Sharing And Disclosure">
            <p>
              We do not sell personal information. We may share necessary details with internal teams,
              logistics partners, processing partners, or service providers only when needed to fulfil a
              legitimate business request or comply with applicable legal obligations.
            </p>
          </LegalSection>

          <LegalSection title="Data Security">
            <p>
              We use reasonable operational and technical safeguards to protect enquiry and communication
              records. No online transmission is completely risk-free, so please avoid submitting sensitive
              financial credentials or confidential technical drawings unless requested through an agreed
              business channel.
            </p>
          </LegalSection>

          <LegalSection title="Your Choices">
            <p>
              You may contact us to correct, update, or request removal of contact information associated with
              your enquiry, subject to business record and legal retention requirements.
            </p>
          </LegalSection>
        </div>

        <aside className="h-fit border border-outline-variant/70 bg-primary p-6 text-white shadow-sm lg:sticky lg:top-28">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-secondary-fixed">Need Help?</p>
          <h2 className="mb-4 font-display text-2xl font-black uppercase">Privacy Enquiries</h2>
          <p className="mb-6 text-sm leading-6 text-surface-variant/85">
            For privacy-related questions or corrections to submitted business details, contact the NRK team.
          </p>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center bg-white px-5 py-3 text-sm font-black uppercase tracking-wider text-primary transition-colors hover:bg-secondary-fixed"
          >
            Contact Us
          </Link>
        </aside>
      </div>
    </LegalPageShell>
  );
}
