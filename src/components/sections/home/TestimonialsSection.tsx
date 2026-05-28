"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarIcon: string;
  avatarClass: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Very good company, the vehicle gets unloaded as soon as it leaves and Sethji also behaves very well with the driver brother.",
    name: "Bhagirath Bishnoi Jakhar",
    role: "Avi Steel Processor",
    initials: "BJ",
    avatarIcon: "engineering",
    avatarClass: "bg-[#1f4b99] text-white",
  },
  {
    quote: "Very good service with wide range of product. Owners' nature is very nice.",
    name: "Jayesh Jha",
    role: "Avi Steel Processor",
    initials: "JJ",
    avatarIcon: "factory",
    avatarClass: "bg-[#48626e] text-white",
  },
  {
    quote: "Superb quality and branded metal product here.",
    name: "Raj Maheta",
    role: "Avi Steel Processor",
    initials: "RM",
    avatarIcon: "verified",
    avatarClass: "bg-[#b7791f] text-white",
  },
  {
    quote:
      "Their team keeps dispatch planning simple. Material reaches our site on time, and communication is clear from quote to delivery.",
    name: "Amit Patel",
    role: "Fabrication Partner",
    initials: "AP",
    avatarIcon: "local_shipping",
    avatarClass: "bg-[#2563eb] text-white",
  },
  {
    quote:
      "We regularly need processed steel in specific sizes. NRK handles the requirements carefully and gives dependable support.",
    name: "Nilesh Shah",
    role: "Industrial Buyer",
    initials: "NS",
    avatarIcon: "inventory_2",
    avatarClass: "bg-[#0f766e] text-white",
  },
  {
    quote:
      "The biggest benefit is reliability. Stock updates, pricing, and delivery timelines are handled professionally every time.",
    name: "Priya Mehta",
    role: "Project Procurement",
    initials: "PM",
    avatarIcon: "account_circle",
    avatarClass: "bg-[#7c3aed] text-white",
  },
];

function StarRating() {
  return (
    <div className="mb-6 flex text-sm text-[#b7791f]">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="material-symbols-outlined material-symbols-filled text-base"
        >
          star
        </span>
      ))}
    </div>
  );
}

function TestimonialAvatar({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className={cn(
        "relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white shadow-sm",
        testimonial.avatarClass,
      )}
    >
      <span className="material-symbols-outlined absolute text-[22px] opacity-25">
        {testimonial.avatarIcon}
      </span>
      <span className="relative text-xs font-black tracking-wide">{testimonial.initials}</span>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  ariaHidden = false,
}: {
  testimonial: Testimonial;
  ariaHidden?: boolean;
}) {
  return (
    <div className="testimonial-card" {...(ariaHidden ? { "aria-hidden": "true" as const } : {})}>
      <div className="relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/70 bg-white p-7 text-on-surface shadow-sm md:p-9">
        <span className="absolute right-7 top-4 select-none text-[92px] font-black leading-none text-primary/[0.04]">
          ”
        </span>
        <div className="relative z-10">
          <StarRating />
          <p className="font-body-md mb-8 text-base italic leading-relaxed text-primary md:text-lg">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3 pt-5">
          <TestimonialAvatar testimonial={testimonial} />
          <div>
            <p className="font-headline-md text-primary">{testimonial.name}</p>
            <p className="font-label-md text-on-surface-variant">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const marqueeTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="reveal relative w-full overflow-hidden bg-[#dfeaf6] py-20 md:py-28">
      <div className="relative z-10 w-full px-gutter">
        <div className="site-section-header relative mb-12">
          <span className="site-section-eyebrow">Client Voices</span>
          <h2 className="site-section-title">What Our Clients Say</h2>
          <p className="site-section-lead">
            Real feedback from businesses that trust NRK Iron &amp; Steel for quality material,
            service, and timely support.
          </p>
          <div className="pointer-events-none absolute inset-y-1/2 right-0 hidden translate-y-[-60%] lg:flex">
            <div className="testimonials-3d-text">
              <div className="testimonials-3d-text-inner">
                {Array.from({ length: 16 }).map((_, index) => (
                  <span key={index} style={{ "--i": index + 1 } as CSSProperties}>
                    NRK <i>Iron</i> &amp; Steel
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="testimonials-marquee relative overflow-hidden" id="testimonials-carousel">
          <div
            className="testimonial-track testimonials-marquee-track testimonials-marquee-track-reverse gap-6"
            id="testimonial-track"
          >
            {marqueeTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                testimonial={testimonial}
                ariaHidden={index >= TESTIMONIALS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
