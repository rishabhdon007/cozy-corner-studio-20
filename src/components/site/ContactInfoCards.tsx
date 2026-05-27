import { contactInfo } from "@/data/contact";

import { ContactInfoCard } from "./ContactInfoCard";

type ContactInfoCardsProps = {
  className?: string;
  scrollReveal?: string;
};

export function ContactInfoCards({ className, scrollReveal = "right" }: ContactInfoCardsProps) {
  return (
    <div data-scroll-reveal={scrollReveal} className={`space-y-4 ${className ?? ""}`.trim()}>
      <ContactInfoCard
        icon="call"
        label="Call Us Directly"
        value={`+91 ${contactInfo.phone}`}
        href={contactInfo.phoneHref}
      />
      <ContactInfoCard icon="mail" label="Email Our Partners" value={contactInfo.email} href={contactInfo.emailHref} />
      <ContactInfoCard icon="location_on" label="Visit Headquarters" value={contactInfo.address.city} />
    </div>
  );
}
