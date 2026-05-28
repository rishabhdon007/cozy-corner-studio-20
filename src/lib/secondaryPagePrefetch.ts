import { allServiceCards } from "@/data/serviceCards";

const SECONDARY_ROUTES = ["/services", "/about"] as const;

const PUBLIC_MEDIA = ["/assests/banner_video.mp4"] as const;

function scheduleIdle(task: () => void | Promise<void>) {
  const run = () => {
    const idleCallback = window.requestIdleCallback;

    if (idleCallback) {
      idleCallback(
        () => {
          void task();
        },
        { timeout: 5000 },
      );
      return;
    }

    globalThis.setTimeout(() => {
      void task();
    }, 2500);
  };

  if (document.readyState === "complete") {
    run();
  } else {
    window.addEventListener("load", run, { once: true });
  }
}

function shouldPrefetchAssets() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;

  if (connection?.saveData) return false;
  if (connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") return false;

  return true;
}

function prefetchMediaUrl(url: string) {
  if (url.endsWith(".mp4")) {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "video";
    link.href = url;
    document.head.appendChild(link);
    return;
  }

  const image = new Image();
  image.decoding = "async";
  image.src = url;
}

async function prefetchBundledMedia() {
  const [construction, teamMember, journey1994, journey2005, journey2015, companyLogo] =
    await Promise.all([
      import("@/assests/constrution area.jpg"),
      import("@/assests/team_member.webp"),
      import("@/assests/aboutus/screen.png"),
      import("@/assests/aboutus/screen 2.png"),
      import("@/assests/aboutus/screen 3.png"),
      import("@/assests/company_logo.png"),
    ]);

  const bundledUrls = [
    construction.default.src,
    teamMember.default.src,
    journey1994.default.src,
    journey2005.default.src,
    journey2015.default.src,
    companyLogo.default.src,
  ];

  bundledUrls.forEach(prefetchMediaUrl);
}

async function prefetchSecondaryModules() {
  await Promise.all([
    import("@/components/sections/services/ServicesHero"),
    import("@/components/sections/services/QualityControlSection"),
    import("@/components/sections/services/ServicesCtaSection"),
    import("@/components/sections/about/AboutHero"),
    import("@/components/sections/about/CompanyJourneySection"),
    import("@/components/sections/about/LeadershipSection"),
    import("@/components/sections/about/LifeAtNrkSection"),
    import("@/components/sections/about/MissionVisionSection"),
  ]);
}

function prefetchServiceCardImages() {
  const uniqueImages = [...new Set(allServiceCards.map((card) => card.image))];
  uniqueImages.forEach(prefetchMediaUrl);
}

export function startSecondaryPagePrefetch(prefetchRoute: (href: string) => void) {
  if (typeof window === "undefined" || !shouldPrefetchAssets()) return;

  scheduleIdle(async () => {
    SECONDARY_ROUTES.forEach((route) => prefetchRoute(route));

    PUBLIC_MEDIA.forEach(prefetchMediaUrl);
    prefetchServiceCardImages();

    await Promise.all([prefetchSecondaryModules(), prefetchBundledMedia()]);
  });
}
