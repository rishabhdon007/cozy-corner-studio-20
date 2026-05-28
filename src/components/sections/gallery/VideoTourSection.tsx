"use client";

import { SectionHeading } from "@/components/site/SectionHeading";
import fallbackImage from "@/assests/constrution area.jpg";

const VIDEO_THUMB =
  "https://lh3.googleusercontent.com/aida/ADBb0ujPEXWWg0iI87xROhYOFi07NvkaakLAKcufgsmsIULakcaTeHZTBoIc_SxWcBJJ_XJXykvO25FlqnSvlL2F2-qayNrL4cFeH77NIYfPrDj7cPcOgWyaoKvxwlrpSEHlZKBjl6X4VE8b3F2mfO97oySF6u5pyG3CEJy3o0ht1wmhFITEbVwKqYEQKEAzVynO-vMzEP2_ED04Cr3uAEBun4G0G363gZ2HgbEP0sHEUcbr6f0mh2B_d0W_Br0";

export function VideoTourSection() {
  return (
    <section className="relative w-full overflow-hidden bg-tertiary py-stack-lg text-on-tertiary">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-surface-tint via-tertiary to-tertiary opacity-10" />
      <div className="relative z-10 mx-auto max-w-container-max px-gutter">
        <SectionHeading
          variant="dark"
          eyebrow="Virtual Tour"
          title="Facility Video Tour"
          lead="Experience the power and precision of our production lines in motion."
          titleClassName="mb-2"
          className="mb-stack-md"
        />
        <div className="group relative mx-auto aspect-video max-w-4xl cursor-pointer overflow-hidden rounded-2xl border border-outline bg-black shadow-2xl">
          <img
            alt="Facility video tour thumbnail"
            className="h-full w-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-50"
            src={VIDEO_THUMB}
            onError={(event) => {
              event.currentTarget.src = fallbackImage.src;
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-primary-fixed/80 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <span className="material-symbols-outlined translate-x-1 text-[40px] text-primary">play_arrow</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
            <div className="h-full w-1/3 bg-secondary-fixed" />
          </div>
        </div>
      </div>
    </section>
  );
}
