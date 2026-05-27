import type { CSSProperties } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Very good company, the vehicle gets unloaded as soon as it leaves and Sethji also behaves very well with the driver brother.",
    name: "Bhagirath Bishnoi Jakhar",
    role: "Avi Steel Processor",
  },
  {
    quote: "Very good service with wide range of product. Owners' nature is very nice.",
    name: "Jayesh Jha",
    role: "Avi Steel Processor",
  },
  {
    quote: "Superb quality and branded metal product here.",
    name: "Raj Maheta",
    role: "Avi Steel Processor",
  },
  {
    quote:
      "Their team keeps dispatch planning simple. Material reaches our site on time, and communication is clear from quote to delivery.",
    name: "Amit Patel",
    role: "Fabrication Partner",
  },
  {
    quote:
      "We regularly need processed steel in specific sizes. NRK handles the requirements carefully and gives dependable support.",
    name: "Nilesh Shah",
    role: "Industrial Buyer",
  },
  {
    quote:
      "The biggest benefit is reliability. Stock updates, pricing, and delivery timelines are handled professionally every time.",
    name: "Priya Mehta",
    role: "Project Procurement",
  },
];

function StarRating() {
  return (
    <div className="flex text-[#b7791f] mb-6 text-sm">
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

function TestimonialCard({
  testimonial,
  ariaHidden = false,
}: {
  testimonial: Testimonial;
  ariaHidden?: boolean;
}) {
  return (
    <div className="testimonial-card" {...(ariaHidden ? { "aria-hidden": "true" as const } : {})}>
      <div className="relative bg-white text-on-surface p-7 md:p-9 rounded-[28px] min-h-[360px] h-full flex flex-col justify-between shadow-sm border border-white/70 overflow-hidden">
        <span className="absolute right-7 top-4 text-[92px] leading-none font-black text-primary/[0.04] select-none">
          ”
        </span>
        <div className="relative z-10">
          <StarRating />
          <p className="font-body-md text-base md:text-lg leading-relaxed italic text-primary mb-8">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3 pt-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-primary">
            <span className="material-symbols-outlined">person</span>
          </div>
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
    <section className="relative w-full py-20 md:py-28 bg-[#dfeaf6] reveal overflow-hidden">
      <div className="relative z-10 w-full px-gutter">
        <div className="site-section-header mb-12 relative">
          <span className="site-section-eyebrow">Client Voices</span>
          <h2 className="site-section-title">What Our Clients Say</h2>
          <p className="site-section-lead">
            Real feedback from businesses that trust NRK Iron &amp; Steel for quality material,
            service, and timely support.
          </p>
          <div className="pointer-events-none absolute inset-y-1/2 right-0 hidden translate-y-[-55%] md:flex lg:translate-y-[-60%]">
            <div className="testimonials-3d-text">
              <div className="testimonials-3d-text-inner">
                {Array.from({ length: 16 }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={index} style={{ "--i": index + 1 } as CSSProperties}>
                    NRK <i>Iron</i> &amp; Steel
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="testimonials-marquee relative overflow-hidden" id="testimonials-carousel">
          <div className="testimonial-track testimonials-marquee-track gap-6" id="testimonial-track">
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
