"use client";

import { ContactInfoCards } from "@/components/site/ContactInfoCards";
import { MapWithOverlay } from "@/components/site/MapWithOverlay";
import { SiteButton } from "@/components/site/SiteButton";
import { contactInfo } from "@/data/contact";

export function ContactFormSection() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <section className="pb-4 md:pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div data-scroll-reveal="left" className="md:col-span-7 lg:col-span-7">
            <div className="rounded-[2.5rem] border border-outline-variant/10 bg-white p-8 shadow-sm transition-all duration-500 hover:border-primary/20 hover:shadow-xl md:p-10">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-bold uppercase tracking-widest text-primary">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 font-body text-sm text-on-surface transition-all placeholder:text-on-surface-variant/50 hover:border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-bold uppercase tracking-widest text-primary">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 font-body text-sm text-on-surface transition-all placeholder:text-on-surface-variant/50 hover:border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-widest text-primary">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 font-body text-sm text-on-surface transition-all placeholder:text-on-surface-variant/50 hover:border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {["Processing", "Profile Sheets", "Z C Purlins", "Bulk Sourcing"].map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        className="cursor-pointer rounded-full bg-slate-100 px-6 py-2.5 text-sm font-semibold text-on-surface-variant transition-all hover:bg-primary hover:text-white"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-widest text-primary">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us a little about your business goals..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 font-body text-sm text-on-surface transition-all placeholder:text-on-surface-variant/50 hover:border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <SiteButton
                  type="submit"
                  variant="submit"
                  layout="full"
                  className="group cursor-pointer"
                  iconNode={
                    <svg
                      className="site-btn-icon h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  }
                >
                  Send Message
                </SiteButton>

                <div className="flex items-center justify-center py-4">
                  <div className="flex-grow border-t border-outline-variant/30" />
                  <span className="px-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/50">
                    OR
                  </span>
                  <div className="flex-grow border-t border-outline-variant/30" />
                </div>

                <SiteButton
                  href={`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(contactInfo.whatsappMessage)}`}
                  variant="emerald"
                  layout="full"
                  className="cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  iconPosition="start"
                  iconNode={
                    <svg
                      viewBox="0 0 24 24"
                      className="site-btn-icon h-6 w-6 shrink-0"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  }
                >
                  Consult via WhatsApp
                </SiteButton>
              </form>
            </div>
          </div>

          <div className="space-y-6 md:col-span-5 lg:col-span-5">
            <ContactInfoCards />
            <MapWithOverlay />
          </div>
        </div>
      </div>
    </section>
  );
}
