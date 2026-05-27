import { ContactFormSection } from "@/components/sections/contact/ContactFormSection";
import { ContactHero } from "@/components/sections/contact/ContactHero";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-gray-900 reveal">
      <ContactHero />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ContactFormSection />
      </main>
    </div>
  );
}
