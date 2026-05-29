"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";

const STEEL_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCBzog-TW3l4yWFZEA5inGiBy0dfswusuxcF_GjZWrOP6jVIBNX_RupmXGyYNuLH_n--2cr2w5qa3UpV_74YSbwkiwORXwnhnttjTuiOBDCtMj_0BFBbOkusbkC6wnzEOsIYeIp-2nyK7lpt8Z8e3Nuol8yyIJC1tAVBlqvND6AQ0Noz5IUHYAXUSRvOv4v4Rs7sWGWoL2ikLZc4Q2hwaR4YMm2T-vPHTmEJzI8slRc2N62yTtgjvxHDxSI9Av6ka6D5omsWAdI91A";

type SlideItem = {
  title: string;
  description: string;
  icon: string;
};

const MISSION_SLIDES: SlideItem[] = [
  {
    title: "Our Mission",
    description:
      "To deliver uncompromising business excellence by providing meticulously processed steel products, fostering long-term partnerships through reliability and trust.",
    icon: "flag",
  },
  {
    title: "Promote Innovation",
    description:
      "To promote entrepreneurship and innovation while ensuring full utilization of resources through effective and eco-friendly procedures and practices.",
    icon: "lightbulb",
  },
  {
    title: "Steel Supermarket",
    description:
      "To supply class products like a steel supermarket — offering a complete range of prime and secondary materials with doorstep delivery support.",
    icon: "store",
  },
  {
    title: "Business Excellence",
    description:
      "To achieve business excellence through efficient resource utilization while following genuine business ethics and ensuring complete customer satisfaction.",
    icon: "workspace_premium",
  },
];

const VISION_SLIDES: SlideItem[] = [
  {
    title: "Our Vision",
    description:
      "To become the best steel supplier in the upcoming years — supplying quality steel products and services with cost-effective solutions and professional operations built on genuine business ethics.",
    icon: "visibility",
  },
  {
    title: "Customer First",
    description:
      "To ensure complete customer satisfaction and fulfillment by providing the best rates among competitors while delivering materials on commitment and helping customers at every stage.",
    icon: "support_agent",
  },
  {
    title: "Industry Leadership",
    description:
      "To be the undisputed leader in high-grade steel distribution across Central India, setting the benchmark for quality and operational efficiency in the subcontinent.",
    icon: "emoji_events",
  },
];

export function MissionVisionSection() {
  const [missionIndex, setMissionIndex] = useState(0);
  const [visionIndex, setVisionIndex] = useState(0);

  // Auto-scroll loop for Mission card
  useEffect(() => {
    const timer = setInterval(() => {
      setMissionIndex((prev) => (prev + 1) % MISSION_SLIDES.length);
    }, 5500); // changes every 5.5 seconds
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll loop for Vision card
  useEffect(() => {
    const timer = setInterval(() => {
      setVisionIndex((prev) => (prev + 1) % VISION_SLIDES.length);
    }, 6000); // changes every 6.0 seconds (slightly offset so they don't sync exactly, which looks nicer)
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-gutter">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <SectionHeading
            align="left"
            eyebrow="Our Philosophy"
            title="Driven by Precision. Built for Scale."
            lead="At NRK Iron & Steel, our philosophy is rooted in industrial precision. We understand that the strength of our steel dictates the integrity of your structures."
            className="mb-0"
          />
        </div>

        {/* Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Our Mission (Wider - 2 Cols) */}
          <div
            data-scroll-reveal="left"
            className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#071629] via-[#0c233a] to-[#040e1b] p-8 md:p-10 text-white flex flex-col justify-between shadow-xl min-h-[400px] md:col-span-2 lg:col-span-2 border border-white/5"
          >
            {/* Circular Graphic Accent on Right */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/10 p-2.5 hidden lg:flex items-center justify-center bg-[#07172c]/40 backdrop-blur-sm shadow-inner pointer-events-none select-none">
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9ZpmlTi9am7jAl3U69ngMTXiV7YHlzoRweLAmBg3U0RavWxTHJ2b8IPruaQ9-dnjFUwuQL1xNZK3LBkggzBv1l8DtaQdmxOKFUWUOs07kpOxvYHIR2JpYxH0rexpvWJQ6fGejqpa5AiBFrUL7Tye0qUdPKUM06F3Jee_vttkYUqoFFByAHosY8tUmo5j5CPpTt_T5F_XPrQgnxvPP_AJEwx_FY5STNvE5dvPOsAnCOV8AB-RmL7qlceqMvm3HoBGYRxvu7pIfys"
                  alt="Industrial Handshake Background"
                  className="w-full h-full object-cover opacity-25 scale-110 group-hover:scale-100 transition-transform duration-1000 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#06172e]/85 to-transparent" />
                <div className="absolute inset-4 rounded-full border border-dashed border-secondary/35 flex items-center justify-center bg-primary/10 backdrop-blur-md">
                  <span className="material-symbols-outlined text-[68px] text-secondary/30 select-none animate-pulse">
                    handshake
                  </span>
                </div>
              </div>
            </div>

            {/* Content Container with key-based transition trigger */}
            <div className="relative z-10 max-w-lg flex-1 flex flex-col justify-center">
              {MISSION_SLIDES.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`transition-all duration-700 ease-in-out ${
                    index === missionIndex
                      ? "opacity-100 translate-y-0 relative block"
                      : "opacity-0 translate-y-4 absolute pointer-events-none hidden"
                  }`}
                >
                  {/* Icon */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-secondary-fixed shadow-md shadow-black/10">
                    <span className="material-symbols-outlined text-2xl text-secondary-fixed">
                      {slide.icon}
                    </span>
                  </div>

                  {/* Title & Body */}
                  <h3 className="mb-4 font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                    {slide.title}
                  </h3>
                  <p className="font-body text-sm md:text-base leading-relaxed text-surface-variant/80 min-h-[100px] md:min-h-[80px]">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Carousel Indicator dots */}
            <div className="mt-8 flex items-center gap-2 relative z-10">
              {MISSION_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setMissionIndex(index)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    index === missionIndex
                      ? "h-1 w-8 bg-secondary-fixed opacity-100"
                      : "h-1.5 w-1.5 bg-secondary-fixed opacity-40 hover:opacity-75"
                  }`}
                  aria-label={`Go to mission slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Card 2: Our Vision (Narrower - 1 Col) */}
          <div
            data-scroll-reveal="right"
            className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1c2838] via-[#243547] to-[#151f2b] p-8 md:p-10 text-white flex flex-col justify-between shadow-xl min-h-[400px] md:col-span-2 lg:col-span-1 border border-white/5"
          >
            {/* Subtle illustration/handshake background watermark overlay */}
            <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida/ADBb0ujPEXWWg0iI87xROhYOFi07NvkaakLAKcufgsmsIULakcaTeHZTBoIc_SxWcBJJ_XJXykvO25FlqnSvlL2F2-qayNrL4cFeH77NIYfPrDj7cPcOgWyaoKvxwlrpSEHlZKBjl6X4VE8b3F2mfO97oySF6u5pyG3CEJy3o0ht1wmhFITEbVwKqYEQKEAzVynO-vMzEP2_ED04Cr3uAEBun4G0G363gZ2HgbEP0sHEUcbr6f0mh2B_d0W_Br0')] opacity-5 bg-cover bg-center mix-blend-overlay pointer-events-none select-none" />
            <span className="material-symbols-outlined text-[130px] text-white/5 absolute -bottom-8 -right-8 select-none pointer-events-none">
              visibility
            </span>

            {/* Content Container with key-based transition trigger */}
            <div className="relative z-10 flex-1 flex flex-col justify-center">
              {VISION_SLIDES.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`transition-all duration-700 ease-in-out ${
                    index === visionIndex
                      ? "opacity-100 translate-y-0 relative block"
                      : "opacity-0 translate-y-4 absolute pointer-events-none hidden"
                  }`}
                >
                  {/* Highlight Line Accent */}
                  <span className="block w-10 h-1.5 bg-amber-500 mb-8 rounded-full shadow-sm" />

                  {/* Icon (for mobile/additional visual context) */}
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-amber-400 lg:hidden">
                    <span className="material-symbols-outlined text-xl">{slide.icon}</span>
                  </div>

                  {/* Title & Body */}
                  <h3 className="mb-4 font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                    {slide.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-surface-variant/80 min-h-[120px] md:min-h-[100px]">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Carousel Indicator dots */}
            <div className="mt-8 flex items-center gap-2 relative z-10">
              {VISION_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setVisionIndex(index)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    index === visionIndex
                      ? "h-1 w-8 bg-amber-500 opacity-100"
                      : "h-1.5 w-1.5 bg-amber-500 opacity-40 hover:opacity-75"
                  }`}
                  aria-label={`Go to vision slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quality Control Banner */}
        <div className="group relative mt-16 h-[600px] overflow-hidden rounded-2xl border border-outline-variant">
          <img
            alt="Steel processing"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={STEEL_IMAGE}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <div className="mb-2 font-label-md text-label-md uppercase tracking-wider text-secondary-fixed">
              Quality Control
            </div>
            <h3 className="font-headline-md text-headline-md text-on-primary">Rigorous Standards at Every Step</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
