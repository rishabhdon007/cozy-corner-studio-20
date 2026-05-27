import Link from "next/link";
import Image from "next/image";

import constructionImg from "@/assests/constrution area.jpg";
import teamMemberImg from "@/assests/team_member.webp";

export function LifeAtNrkSection() {
  return (
    <section className="bg-white py-16 md:py-20" data-scroll-reveal-section>
      <div className="mx-auto max-w-container-max px-gutter">

        {/* ── Header row ── */}
        <div
          data-scroll-reveal="top"
          className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="font-display text-3xl font-black text-primary md:text-4xl">
              Life at NRK
            </h2>
            <p className="mt-1.5 text-sm text-on-surface-variant">
              The power behind our structural scale.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-secondary transition-colors hover:text-primary"
          >
            View Full Gallery
            <span className="material-symbols-outlined text-base leading-none">arrow_forward</span>
          </Link>
        </div>

        {/* ── Bento grid (4-col × 2-row) ── */}
        <div
          data-scroll-reveal="top"
          data-scroll-reveal-delay="2"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
          style={{ gridAutoRows: "280px" }}
        >

          {/* 1 — Precision Processing  (col-span-2, row-span-2) */}
          <div className="group relative overflow-hidden rounded-2xl lg:col-span-2 lg:row-span-2">
            <Image
              src={constructionImg}
              alt="Steel slitting – precision processing"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Big watermark text */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-16 select-none overflow-hidden px-4"
            >
              <p className="font-display text-[56px] font-black uppercase leading-none tracking-tight text-white/20 md:text-[80px]">
                Steel Slitting:
              </p>
              <p className="font-display text-[56px] font-black uppercase leading-none tracking-tight text-white/20 md:text-[80px]">
                Line in Action
              </p>
            </div>

            {/* Badge */}
            <span className="absolute left-4 top-4 rounded-md bg-white/15 px-2.5 py-1 font-label-md text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              Operations
            </span>

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-headline-md text-xl font-black text-white">Precision Processing</h3>
            </div>
          </div>

          {/* 2 — Industrial Capacity  (col-span-2, row-span-1) */}
          <div className="group relative overflow-hidden rounded-2xl lg:col-span-2 lg:row-span-1">
            <Image
              src={teamMemberImg}
              alt="Industrial facility capacity"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Badge */}
            <span className="absolute left-4 top-4 rounded-md bg-white/15 px-2.5 py-1 font-label-md text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              Scale
            </span>

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-headline-md text-lg font-black text-white">Industrial Capacity</h3>
            </div>
          </div>

          {/* 3 — Corporate Culture  (col-span-1, row-span-1) */}
          <div className="flex flex-col justify-between rounded-2xl bg-primary p-6 lg:col-span-1 lg:row-span-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <span className="material-symbols-outlined text-xl text-white">handshake</span>
            </div>
            <div>
              <h3 className="mb-2 font-headline-md text-lg font-black text-white">Corporate Culture</h3>
              <p className="text-xs leading-relaxed text-white/65">
                Built on a foundation of mutual respect, continuous learning, and uncompromising safety standards.
              </p>
            </div>
          </div>

          {/* 4 — Logistics Hub  (col-span-1, row-span-1) */}
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-outline-variant/40 bg-surface-container-low lg:col-span-1 lg:row-span-1">
            <span className="material-symbols-outlined text-[40px] text-on-surface-variant/40">warehouse</span>
            <span className="font-label-md text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
              Logistics Hub
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
