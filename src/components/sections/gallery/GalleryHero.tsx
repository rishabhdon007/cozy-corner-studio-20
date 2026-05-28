"use client";

import fallbackImage from "@/assests/constrution area.jpg";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida/ADBb0ujNeJfj5wjuiu3qa5PPpnbdTCPvKNZ6N2yri4I15sFCyU37e27ZxTaBi-X_HrEEoMrBQ_Y87Eky8g_cWUxRDlugbnlELvSyUYarJSXBSVn3wUXaFOlujrxI8ykr_gOeXzy-9wgeAJ9fdfdpExYYPQ4PuLncFTJa42kasKT_q9zpCwhLgzElMiOrDPJ6PkodKV-52kPNF3ODoLhOUdTcw0k9CTEY048brLSdv86qeEhwYXr-VqT5vRXSubc";

export function GalleryHero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-outline-variant bg-surface-container-low py-stack-lg">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 translate-x-1/4 skew-x-12 transform bg-gradient-to-l from-surface-variant to-transparent opacity-50" />
      <div className="relative z-10 mx-auto grid max-w-container-max items-center gap-stack-md px-gutter md:grid-cols-2">
        <div>
          <span className="mb-4 inline-block rounded-full bg-primary-fixed px-3 py-1 font-label-md text-label-md uppercase tracking-widest text-on-primary-fixed">
            Media Center
          </span>
          <h1 className="mb-6 font-display-lg text-display-lg text-primary">Gallery &amp; Insights</h1>
          <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">
            Witness the monumental scale of our manufacturing operations and stay informed with the latest industry
            analysis, technical breakthroughs, and institutional news from NRK Iron &amp; Steel.
          </p>
        </div>
        <div className="relative hidden h-64 overflow-hidden rounded-xl border border-outline-variant shadow-[0_4px_20px_rgba(10,42,94,0.05)] md:block md:h-96">
          <img
            alt="Industrial operations"
            className="h-full w-full object-cover"
            src={HERO_IMAGE}
            onError={(event) => {
              event.currentTarget.src = fallbackImage.src;
            }}
          />
          <div className="absolute inset-0 bg-primary opacity-10 mix-blend-multiply" />
        </div>
      </div>
    </section>
  );
}
