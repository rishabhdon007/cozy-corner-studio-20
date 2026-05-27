import { SiteButton } from "@/components/site/SiteButton";
import { contactInfo } from "@/data/contact";

export function FloatingContactButtons() {
  const whatsappHref = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(contactInfo.whatsappMessage)}`;

  return (
    <>
      <div className="fixed bottom-5 left-5 z-50">
        <SiteButton
          href={contactInfo.phoneHref}
          variant="floating"
          icon={false}
          className="group"
          aria-label="Talk to an NRK steel expert"
          data-icon-start="true"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/15">
            <span className="site-btn-icon material-symbols-outlined text-xl">support_agent</span>
          </span>
          <span className="font-label-md text-xs md:text-sm font-black tracking-wide">
            Talk to Expert
          </span>
        </SiteButton>
      </div>

      <div className="fixed bottom-5 right-5 z-50">
        <SiteButton
          href={whatsappHref}
          variant="whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with NRK Iron and Steel on WhatsApp"
          iconNode={
            <svg className="site-btn-icon h-8 w-8" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="M16.01 3.2c-7.05 0-12.78 5.72-12.78 12.75 0 2.25.59 4.45 1.72 6.39L3.12 29l6.82-1.79a12.75 12.75 0 0 0 6.07 1.54h.01c7.04 0 12.77-5.72 12.77-12.76S23.06 3.2 16.01 3.2Zm0 23.39h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.05 1.06 1.08-3.94-.26-.4a10.57 10.57 0 0 1-1.62-5.65c0-5.85 4.77-10.61 10.64-10.61 2.84 0 5.52 1.11 7.53 3.12a10.55 10.55 0 0 1 3.12 7.53c0 5.85-4.77 10.6-10.64 10.6Zm5.83-7.94c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.51.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
            </svg>
          }
        />
      </div>
    </>
  );
}
