"use client";

import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteImage } from "@/components/site/SiteImage";
import { LEADERSHIP_IMAGES, SITE_IMAGES } from "@/lib/siteImages";

const leaders = [
  {
    name: "Mr. Nimesh Kothari",
    role: "Founder & Chairman",
    description: "Guides corporate strategy, industrial scaling, and steel mill relationships with three decades of trust.",
    image: LEADERSHIP_IMAGES.nimesh,
  },
  {
    name: "Mr. Nishant Kothari",
    role: "Chief Executive Officer",
    description: "Directs operational workflows, business development, and supply-chain digitisation frameworks.",
    image: LEADERSHIP_IMAGES.nishant,
  },
  {
    name: "Mr. Dhaval Kothari",
    role: "Managing Director",
    description: "Leads technical processing plants, quality control protocols, and nationwide distribution logistics.",
    image: LEADERSHIP_IMAGES.dhaval,
  },
];

export function LeadershipSection() {
  return (
    <section className="bg-[#0f1d30] py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "20px 22px",
        }}
      />

      <div className="absolute right-0 bottom-0 opacity-[0.02] translate-x-12 translate-y-12 select-none pointer-events-none">
        <span className="material-symbols-outlined text-[340px] text-white">shield</span>
      </div>

      <div className="mx-auto max-w-container-max px-gutter relative z-10 text-white">
        <SectionHeading
          align="left"
          variant="dark"
          eyebrow="Our Team"
          title="Leadership"
          lead="The visionaries steering NRK Iron & Steel towards new horizons of industrial excellence."
          className="max-w-2xl mb-16 text-left"
          titleClassName="text-white font-black text-4xl uppercase tracking-tight md:text-5xl"
          leadClassName="text-surface-variant/80 text-sm md:text-base leading-relaxed"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {leaders.map((leader, index) => (
            <div
              key={leader.name}
              data-scroll-reveal="top"
              data-scroll-reveal-delay={String(index * 2)}
              className="group flex flex-col overflow-hidden rounded-2xl bg-[#142338]/90 border border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#18293e]">
                <SiteImage
                  src={leader.image}
                  alt={leader.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  fallback={SITE_IMAGES.teamMember}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1c2e]/90 via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1 bg-[#142338]">
                <h3 className="mb-1 font-display text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-secondary-fixed transition-colors">
                  {leader.name}
                </h3>
                <p className="mb-4 text-[11px] font-black uppercase tracking-[0.16em] text-secondary-fixed/90 border-b border-white/5 pb-3">
                  {leader.role}
                </p>
                <p className="text-xs md:text-sm leading-relaxed text-surface-variant/70">
                  {leader.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
