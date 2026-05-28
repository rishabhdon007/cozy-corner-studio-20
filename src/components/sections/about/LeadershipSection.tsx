"use client";

import { SectionHeading } from "@/components/site/SectionHeading";
import fallbackImage from "@/assests/team_member.webp";

const leaders = [
  {
    name: "Mr. Nimesh Kothari",
    role: "Founder & Chairman",
    description: "Guides corporate strategy, industrial scaling, and steel mill relationships with three decades of trust.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3TgUu2LrQ9yxbiPLUURPYM_MlspId_DSUN_ng_w2uMLbxA535POuz-nxCKeEkC3DNlUVfqbij1FLw4q0uUviq5T037fr1KboZ3HDy_GCz9x3w-21Z7jjNg3zyEOFMIOU9G8oD48X2Z4TYxgvrNyGajrz9U7PC7i_40U_1g1CFSyVpd0JN4xNTS1LRSkWEp4yW_XvXtMsLWm3ilgdpqky-2zedyBY5hwybPHzPMORDxkrGycHQTVS8X4JxkuzyjMwhHJ9cIDDQoLw",
  },
  {
    name: "Mr. Nishant Kothari",
    role: "Chief Executive Officer",
    description: "Directs operational workflows, business development, and supply-chain digitisation frameworks.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAj7n5lAwMcVPrQrg5h8KK0TWK2pKPodYhZ5K3IUr0_UWty9yuZc-WvUimut6KiBphtbJWKxFGId8WJZiiW6-DrsyDMY6g34m7-_I_rXvh6REaiR2qOWYIlQ0EvKC2y7ztv2PPqUqK_S2j2Tq_QEX2b4juiDIy8oWKUre40jJVFpqDvgm_xFJ1XertgyDCWiNNx73XfAA_QCdFEF3eo-8AbdqfdT5jKehqAzXqi5InIxn4T0sDrgcoS6DjRh4iTZtGdVw-RMm_V9Zc",
  },
  {
    name: "Mr. Dhaval Kothari",
    role: "Managing Director",
    description: "Leads technical processing plants, quality control protocols, and nationwide distribution logistics.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWBw7mymMo3O9SVSgQxtjOXA5CQIaopTnVqiesY2dAWfReGiRHyg1s5OF7og0raZsEMoA9igZEADmXhKrvMnNeerK54yUByqBJAP99AYrJ08J1uYjNn-zYbJxglejJbxyFyymJLWZGsxNvf8zKJm1tex5FGggweCKeMtMZFPOKQrJc02Avq303grL_QN2yTJJoG4-QwXyKh6dM2qPP_SFJg6Z9Gfkqz2y8fqqMX2zK7R4kd_z1UvlCDn19KsPyCjNUTiYEJVe0sMU",
  },
];

export function LeadershipSection() {
  return (
    <section className="bg-[#0f1d30] py-20 md:py-28 relative overflow-hidden">
      {/* Background grid/dots details */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "20px 22px",
        }}
      />
      
      {/* Visual background brand accent logo */}
      <div className="absolute right-0 bottom-0 opacity-[0.02] translate-x-12 translate-y-12 select-none pointer-events-none">
        <span className="material-symbols-outlined text-[340px] text-white">
          shield
        </span>
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
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#18293e]">
                <img
                  alt={leader.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={leader.image}
                  onError={(event) => {
                    event.currentTarget.src = fallbackImage.src;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1c2e]/90 via-transparent to-transparent opacity-80" />
              </div>

              {/* Text / Roles Container */}
              <div className="p-6 md:p-8 flex flex-col flex-1 bg-[#142338]">
                {/* Name */}
                <h3 className="mb-1 font-display text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-secondary-fixed transition-colors">
                  {leader.name}
                </h3>
                
                {/* Role */}
                <p className="mb-4 text-[11px] font-black uppercase tracking-[0.16em] text-secondary-fixed/90 border-b border-white/5 pb-3">
                  {leader.role}
                </p>

                {/* Description */}
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
