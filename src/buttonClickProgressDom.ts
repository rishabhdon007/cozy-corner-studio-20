const CLICKABLE_SELECTOR = [
  "button",
  'input[type="submit"]',
  'input[type="button"]',
  "a.site-btn",
  "button.site-btn",
  "a.inline-flex",
  "a.site-nav-link",
  'a[class*="rounded-full"]',
  'a[class*="rounded-lg"]',
  'a[class*="rounded-xl"]',
  'a[class*="px-6"]',
  'a[class*="px-8"]',
].join(", ");

const SKIP_SELECTOR = '[data-no-click-effect], .partners-marquee, .testimonials-marquee, #mobile-menu-btn';

function isClickableButton(el: HTMLElement): boolean {
  if (el.matches(SKIP_SELECTOR) || el.closest(SKIP_SELECTOR)) return false;
  return el.matches(CLICKABLE_SELECTOR);
}

function triggerCornerSweep(el: HTMLElement): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  el.querySelector(".button-click-sweep-overlay")?.remove();

  const overlay = document.createElement("span");
  overlay.className = "button-click-sweep-overlay";
  overlay.setAttribute("aria-hidden", "true");

  const styles = window.getComputedStyle(el);
  if (styles.position === "static") {
    el.style.position = "relative";
  }
  if (styles.overflow === "visible") {
    el.style.overflow = "hidden";
  }

  el.appendChild(overlay);
  window.requestAnimationFrame(() => overlay.classList.add("is-active"));
  overlay.addEventListener(
    "animationend",
    () => {
      overlay.remove();
    },
    { once: true },
  );
}

export function initButtonClickProgress(root: ParentNode = document.body): () => void {
  const onPointerDown = (event: Event): void => {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(CLICKABLE_SELECTOR);
    if (!target || !root.contains(target) || !isClickableButton(target)) return;
    triggerCornerSweep(target);
  };

  root.addEventListener("pointerdown", onPointerDown);

  return () => {
    root.removeEventListener("pointerdown", onPointerDown);
  };
}
