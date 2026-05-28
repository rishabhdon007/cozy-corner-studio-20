"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";

type HubLocation = {
  id: string;
  name: string;
  description: string;
  type: string;
  // Percentage coordinates relative to a centered map box
  x: number; // Left percentage
  y: number; // Top percentage
};

const HUBS: HubLocation[] = [
  {
    id: "indore",
    name: "Indore (Headquarters)",
    description: "Central processing hub, administrative head office, and massive steel storage yard.",
    type: "HQ & Main Processing Facility",
    x: 43.5,
    y: 53.0,
  },
  {
    id: "mumbai",
    name: "Mumbai Hub",
    description: "Key port connection, import sourcing terminal, and Western supply-chain logistics base.",
    type: "Import & Logistics Terminal",
    x: 36.5,
    y: 64.0,
  },
  {
    id: "rajkot",
    name: "Rajkot Hub",
    description: "Regional distribution center facilitating prompt transport access across Gujarat industries.",
    type: "Coated & Profile Sheet Distribution",
    x: 27.0,
    y: 52.5,
  },
  {
    id: "bokaro",
    name: "Bokaro Hub",
    description: "Strategic sourcing hub placed near premier raw steel manufacturing centers.",
    type: "Raw Material Sourcing Base",
    x: 69.5,
    y: 47.5,
  },
];

export function GlobalPresenceSection() {
  const [activeHub, setActiveHub] = useState<HubLocation | null>(null);

  return (
    <section className="border-t border-outline-variant/30 bg-surface py-16 md:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-container-max px-gutter text-center relative z-10">
        <SectionHeading
          eyebrow="Nationwide Reach"
          title="Global Presence"
          lead="Strategic operational hubs empowering our nationwide logistics and rapid delivery reach across India."
          className="mb-12 max-w-2xl mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map Box */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-[#4a7594] via-[#5a8fad] to-[#3d6d8f] p-4 sm:p-8 shadow-xl relative min-h-[420px] md:min-h-[500px] lg:min-h-[580px] backdrop-blur-md">
            {/* Soft grid watermark overlay */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#6a9fbd]/20 pointer-events-none" />

            {/* Title Legend */}
            <div className="absolute top-6 left-6 z-20 text-left pointer-events-none">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                Operational Map
              </div>
              <h3 className="text-sm font-bold text-white mt-1">
                Interactive Network Hubs
              </h3>
            </div>

            {/* Map Container */}
            <div className="relative w-full flex-1 flex items-center justify-center max-w-[480px] mx-auto my-8">
              {/* High-Fidelity SVG Map of India Vector Outline */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/India_location_map.svg/800px-India_location_map.svg.png"
                alt="Map of India Network Outline"
                className="w-full h-auto object-contain opacity-25 grayscale brightness-125 select-none pointer-events-none"
              />

              {/* Dynamic Map Beacon Pins Overlay */}
              {HUBS.map((hub) => {
                const isActive = activeHub?.id === hub.id;
                return (
                  <div
                    key={hub.id}
                    className="absolute group z-20 cursor-pointer"
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    onMouseEnter={() => setActiveHub(hub)}
                    onMouseLeave={() => setActiveHub(null)}
                    onClick={() => setActiveHub(isActive ? null : hub)}
                  >
                    {/* Double Ring Pulsing Beacon Animation */}
                    <div className="relative flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                      {/* Pulse Circle 1 */}
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-30 duration-1000" />
                      {/* Pulse Circle 2 */}
                      <span className="animate-pulse absolute inline-flex h-3/4 w-3/4 rounded-full bg-secondary opacity-40" />
                      {/* Core Inner Beacon Dot */}
                      <span className={`relative inline-flex h-3 w-3 rounded-full shadow-lg transition-all duration-300 ${
                        isActive ? "bg-amber-500 scale-125 ring-4 ring-amber-500/25" : "bg-secondary group-hover:bg-amber-500 group-hover:scale-110"
                      }`} />
                    </div>

                    {/* Quick Micro Tooltip On Hover (For Mobile/Desktop usability) */}
                    <div className="absolute left-1/2 -top-10 -translate-x-1/2 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none bg-[#5a8fad]/95 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg shadow-xl text-nowrap z-30">
                      <p className="text-[10px] font-black uppercase text-secondary tracking-wider">
                        {hub.name.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Footer Prompt */}
            <div className="text-center md:text-left text-[11px] text-white/40 pointer-events-none mt-auto">
              💡 Hover or tap on the map pins to discover regional facilities and operations.
            </div>
          </div>

          {/* Right Column: Information Panel Cards */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-4">
            {/* Dynamic Active Display Panel (Displays detailed specs of hovered hub, else defaults) */}
            <div className="flex-1 flex flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#5a8fad] via-[#4a7594] to-[#3d6d8f] p-8 text-white text-left shadow-xl relative border border-white/20 backdrop-blur-md transition-all duration-300 min-h-[220px]">
              <div className="absolute top-0 right-0 p-6 opacity-[0.04] pointer-events-none select-none">
                <span className="material-symbols-outlined text-[100px]">hub</span>
              </div>

              <div className="relative z-10">
                <span className="inline-block font-label-md text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                  {activeHub ? "Active Hub Selection" : "Network Sourcing"}
                </span>
                <h3 className="mt-2 mb-4 font-display text-2xl font-black uppercase tracking-tight text-white transition-all">
                  {activeHub ? activeHub.name : "NRK Sourcing Grid"}
                </h3>
                <p className="font-body text-xs sm:text-sm leading-relaxed text-surface-variant/80 min-h-[90px] transition-all">
                  {activeHub
                    ? activeHub.description
                    : "Hover or select any pinpoint on our national operations map to explore details regarding our processing yards, supply routes, port shipping bases, and raw material sourcing points."}
                </p>
              </div>

              {activeHub ? (
                <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-secondary animate-bounce">
                    verified_user
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-secondary">
                    {activeHub.type}
                  </span>
                </div>
              ) : (
                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-white/30">
                  Select a pin to inspect capability details.
                </div>
              )}
            </div>

            {/* Quick Sizing Pill Tabs */}
            <div className="grid grid-cols-2 gap-3">
              {HUBS.map((hub) => {
                const isActive = activeHub?.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    onMouseEnter={() => setActiveHub(hub)}
                    onMouseLeave={() => setActiveHub(null)}
                    onClick={() => setActiveHub(isActive ? null : hub)}
                    className={`flex items-center gap-2.5 rounded-2xl border p-4 text-left shadow-md transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-[#4a7594] bg-[#5a8fad]/15 text-primary scale-[1.02] backdrop-blur-sm"
                        : "border-outline-variant/60 bg-surface-container-lowest text-on-surface hover:border-[#4a7594]/40 hover:bg-[#5a8fad]/10"
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] shrink-0 transition-colors ${
                      isActive ? "text-amber-500" : "text-secondary"
                    }`}>
                      location_on
                    </span>
                    <span className="font-label-md text-xs font-black uppercase tracking-wider truncate">
                      {hub.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
