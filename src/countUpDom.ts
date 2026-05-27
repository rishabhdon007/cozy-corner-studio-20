function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export type ParsedCount = {
  target: number;
  format: (value: number) => string;
};

/** Parses labels like `3+`, `4000+`, `70%`, `10k+`. */
export function parseCountLabel(originalFull: string): ParsedCount | null {
  let t = originalFull.trim();
  if (!t) return null;

  let suffixPct = "";
  if (t.endsWith("%")) {
    suffixPct = "%";
    t = t.slice(0, -1).trim();
  }

  let suffixPlus = false;
  if (t.endsWith("+")) {
    suffixPlus = true;
    t = t.slice(0, -1).trim();
  }

  let mult = 1;
  let hadKSuffix = false;
  if (/k$/i.test(t)) {
    hadKSuffix = true;
    mult = 1000;
    t = t.slice(0, -1).trim();
  } else if (/m$/i.test(t)) {
    mult = 1_000_000;
    t = t.slice(0, -1).trim();
  }

  const parsed = Number.parseFloat(t.replace(/,/g, ""));
  if (!Number.isFinite(parsed)) return null;

  const target = parsed * mult;

  const format = (v: number): string => {
    const x = Math.min(Math.max(v, 0), target);
    if (hadKSuffix) {
      const kk = Math.floor(x / 1000);
      return `${kk}k${suffixPlus ? "+" : ""}${suffixPct}`;
    }
    const n = Math.round(x);
    return `${n}${suffixPlus ? "+" : ""}${suffixPct}`;
  };

  return { target, format };
}

function partiallyInViewport(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (r.width <= 0 || r.height <= 0) return false;
  const visible = r.top < vh && r.bottom > 0 && r.left < vw && r.right > 0;
  return visible;
}

/** Animate `[data-count-up]` elements inside `root`; runs when visible. */
export function initCountUps(root: ParentNode): () => void {
  const nodes = [...root.querySelectorAll<HTMLElement>("[data-count-up]")];
  const disposables: Array<() => void> = [];

  for (const node of nodes) {
    const attrValue = node.getAttribute("data-count-up")?.trim();
    const raw = attrValue || node.dataset.countUpTarget || node.textContent?.trim() || "";
    node.dataset.countUpTarget = raw;
    const parsed = parseCountLabel(raw);
    if (!parsed) continue;

    node.textContent = parsed.format(0);

    let cancelled = false;
    let rafId: number | null = null;
    let fired = false;

    /** Single observer instance per counter (disconnect only touches this node's observer). */
    let io: IntersectionObserver | null = null;

    const animate = (): void => {
      if (fired || cancelled) return;
      fired = true;
      io?.disconnect();
      io = null;
      let startTs: number | null = null;
      const dur = 1200;

      const tick = (ts: number): void => {
        if (cancelled) return;
        if (startTs === null) startTs = ts;
        const tLin = Math.min(1, (ts - startTs) / dur);
        node.textContent = parsed.format(parsed.target * easeOutCubic(tLin));
        if (tLin < 1) rafId = requestAnimationFrame(tick);
        else {
          node.textContent = parsed.format(parsed.target);
          rafId = null;
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    /** After layout paint: if counters are already on screen (e.g. homepage hero margin), animate without waiting only on intersection ratio. */
    const tryRunIfVisibleFromLayout = (): void => {
      if (cancelled || fired) return;
      if (partiallyInViewport(node)) animate();
    };

    if (typeof IntersectionObserver === "undefined") {
      animate();
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            animate();
            return;
          }
        },
        { threshold: 0, rootMargin: "80px 0px", },
      );

      io.observe(node);

      // Two rAFs: wait until after Tailwind CDN + layout/reflow settles (fixes stuck "0%" on initial paint).
      requestAnimationFrame(() => {
        requestAnimationFrame(tryRunIfVisibleFromLayout);
      });

      /** Final fallback if observer never fires in rare environments */
      const fallbackId = window.setTimeout(() => {
        if (!cancelled && !fired) tryRunIfVisibleFromLayout();
      }, 2600);

      disposables.push(() => {
        clearTimeout(fallbackId);
      });
    }

    disposables.push(() => {
      cancelled = true;
      io?.disconnect();
      if (rafId != null) cancelAnimationFrame(rafId);
      node.textContent = parsed.format(parsed.target);
    });
  }

  return () => {
    disposables.forEach((fn) => fn());
  };
}
