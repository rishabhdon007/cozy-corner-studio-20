const EXCLUDED_ANCESTOR_SELECTOR =
  '.partners-marquee, .testimonials-marquee, #testimonials-carousel, #testimonial-track, [data-scroll-reveal="off"], nav[aria-label="Breadcrumb"]';

const AUTO_CANDIDATE_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span.site-section-eyebrow",
  "span.inline-block",
  "div.inline-flex.items-center",
  "p",
  "p.font-body-lg",
  "p.font-body-md",
  "p.font-display",
  "article",
  ".grid > div",
  ".grid > article",
  ".flex.gap-5.group",
  ".space-y-7 > div",
  ".space-y-6 > div",
  "form",
  "table",
  "aside > div",
  "img:not(.absolute):not([class*='inset-0'])",
  ".rounded-\\[28px\\]",
  ".rounded-xl.shadow-sm",
  ".border.border-gray-200.bg-white",
].join(", ");

function isExcluded(el: HTMLElement): boolean {
  if (el.matches("nav, script, style, button, svg")) return true;
  if (el.closest(EXCLUDED_ANCESTOR_SELECTOR)) return true;
  if (el.closest(".fixed, .sticky.top-0")) return true;
  return false;
}

function getRevealSections(root: ParentNode): HTMLElement[] {
  const sections = [...root.querySelectorAll<HTMLElement>('section:not([data-scroll-reveal="off"])')];
  if (sections.length > 0) return sections;

  const main = root.querySelector("main");
  if (!main) return [];

  const container = main.querySelector(":scope > div");
  if (!container) return [main as HTMLElement];

  return [...container.children].filter(
    (el): el is HTMLElement =>
      el instanceof HTMLElement &&
      !el.matches("nav, script, style") &&
      el.getBoundingClientRect().height > 24,
  );
}

function filterTopLevelCandidates(candidates: HTMLElement[]): HTMLElement[] {
  return candidates.filter((el) => {
    if (isExcluded(el)) return false;
    return !candidates.some((other) => other !== el && other.contains(el));
  });
}

function collectRevealItems(section: HTMLElement): HTMLElement[] {
  const manual = [...section.querySelectorAll<HTMLElement>("[data-scroll-reveal]")];
  if (manual.length) return filterTopLevelCandidates(manual);

  const candidates = [...section.querySelectorAll<HTMLElement>(AUTO_CANDIDATE_SELECTOR)];
  return filterTopLevelCandidates(candidates);
}

function applyRevealAttributes(items: HTMLElement[]): void {
  items.forEach((item, index) => {
    if (!item.hasAttribute("data-scroll-reveal")) {
      item.setAttribute("data-scroll-reveal", "");
    }

    const delaySteps = item.getAttribute("data-scroll-reveal-delay");
    const delayMs = delaySteps ? Number(delaySteps) * 140 : index * 140;
    item.style.setProperty("--scroll-reveal-delay", String(Math.min(delayMs, 1680)));
  });
}

function isSimpleTextElement(el: HTMLElement): boolean {
  const tag = el.tagName;
  if (!(tag === "H1" || tag === "H2" || tag === "H3" || tag === "H4" || tag === "P")) return false;
  if (el.childElementCount > 0) return false;
  const text = el.textContent?.trim() ?? "";
  return text.length >= 4;
}

function clearLineSplit(el: HTMLElement): void {
  const original = el.getAttribute("data-reveal-lines-original");
  if (original != null) {
    el.textContent = original;
    el.removeAttribute("data-reveal-lines-original");
  }
  el.classList.remove("reveal-lines");
}

function splitIntoLineSpans(el: HTMLElement): void {
  if (!isSimpleTextElement(el)) return;
  if (!el.isConnected) return;

  const originalText = el.textContent ?? "";
  if (!el.getAttribute("data-reveal-lines-original")) {
    el.setAttribute("data-reveal-lines-original", originalText);
  }

  // Build word spans
  el.textContent = "";
  const words = originalText.trim().split(/\s+/).filter(Boolean);
  const wordSpans: HTMLSpanElement[] = [];

  for (let i = 0; i < words.length; i++) {
    const wordSpan = document.createElement("span");
    wordSpan.textContent = words[i];
    wordSpan.style.display = "inline-block";
    wordSpan.style.whiteSpace = "pre";
    el.appendChild(wordSpan);
    wordSpans.push(wordSpan);
    if (i !== words.length - 1) el.appendChild(document.createTextNode(" "));
  }

  // Force layout & group by line top
  const tops = wordSpans.map((s) => Math.round(s.getBoundingClientRect().top));
  const uniqueTops: number[] = [];
  tops.forEach((top) => {
    if (!uniqueTops.some((t) => Math.abs(t - top) <= 1)) uniqueTops.push(top);
  });

  const lines: HTMLSpanElement[][] = uniqueTops.map(() => []);
  wordSpans.forEach((span, idx) => {
    const top = tops[idx];
    const lineIndex = uniqueTops.findIndex((t) => Math.abs(t - top) <= 1);
    if (lineIndex >= 0) lines[lineIndex].push(span);
  });

  // Rebuild DOM with line wrappers
  const frag = document.createDocumentFragment();
  lines.forEach((lineWords, lineIndex) => {
    if (!lineWords.length) return;
    const line = document.createElement("span");
    line.className = "reveal-line";

    const inner = document.createElement("span");
    inner.className = "reveal-line-inner";
    inner.style.setProperty("--line-delay", `${lineIndex * 110}ms`);

    // Preserve spaces between words
    lineWords.forEach((w, wIndex) => {
      if (wIndex) inner.appendChild(document.createTextNode(" "));
      inner.appendChild(document.createTextNode(w.textContent ?? ""));
    });

    line.appendChild(inner);
    frag.appendChild(line);
  });

  el.textContent = "";
  el.appendChild(frag);
  el.classList.add("reveal-lines");
}

function prepareLineReveal(el: HTMLElement, cleanups: Array<() => void>): void {
  if (!isSimpleTextElement(el)) return;
  if (el.closest(".testimonials-3d-text")) return;

  const run = () => {
    clearLineSplit(el);
    splitIntoLineSpans(el);
  };

  // Initial prepare after layout (double rAF so widths/line breaks match final paint)
  let rafOuter = 0;
  let rafInner: number | undefined;
  rafOuter = window.requestAnimationFrame(() => {
    rafInner = window.requestAnimationFrame(run);
  });
  cleanups.push(() => {
    window.cancelAnimationFrame(rafOuter);
    if (rafInner !== undefined) window.cancelAnimationFrame(rafInner);
  });

  // Re-split on resize (line breaks change)
  if (typeof ResizeObserver !== "undefined") {
    let t: number | undefined;
    const ro = new ResizeObserver(() => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => run(), 80);
    });
    ro.observe(el);
    cleanups.push(() => {
      if (t) window.clearTimeout(t);
      ro.disconnect();
    });
  }
}

function isSectionInView(section: HTMLElement, threshold = 0.05): boolean {
  const rect = section.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  if (rect.height <= 0) return rect.top < viewHeight && rect.bottom > 0;

  const visibleHeight = Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
  if (visibleHeight <= 0) return false;

  return visibleHeight / rect.height >= threshold || visibleHeight >= 120;
}

export function initScrollReveal(root: ParentNode): () => void {
  const sections = getRevealSections(root);
  if (!sections.length) return () => undefined;

  const cleanups: Array<() => void> = [];

  for (const section of sections) {
    const items = collectRevealItems(section);
    if (!items.length) continue;

    applyRevealAttributes(items);
    for (const item of items) prepareLineReveal(item, cleanups);

    let revealed = false;
    const reveal = (): void => {
      if (revealed) return;
      revealed = true;
      section.classList.add("is-revealed");
      for (const item of items) {
        item.classList.add("is-visible");
        item.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((child) => {
          if (child !== item) {
            child.classList.add("is-visible");
          }
        });
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      continue;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal();
          observer.disconnect();
        }
      },
      { threshold: [0, 0.05, 0.1, 0.2], rootMargin: "80px 0px -8% 0px" },
    );

    observer.observe(section);

    if (isSectionInView(section)) {
      reveal();
      observer.disconnect();
    } else {
      // Safe long fallback timeout (15s) so off-screen sections do not trigger prematurely
      const fallbackId = window.setTimeout(() => reveal(), 15000);
      cleanups.push(() => window.clearTimeout(fallbackId));
    }

    cleanups.push(() => observer.disconnect());
  }

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}
