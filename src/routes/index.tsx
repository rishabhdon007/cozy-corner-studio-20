import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import html from "../pages-html/index.html?raw";

export const Route = createFileRoute("/")({
  component: Page,
  head: () => ({ meta: [{ title: "NRK Iron & Steel | India's Trusted Steel Distributors" }] }),
});

function Page() {
  return <RawHtmlPage html={html} />;
}

export function RawHtmlPage({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const textMap: Record<string, string> = {
      "home": "/",
      "about": "/about",
      "about us": "/about",
      "services": "/services",
      "service": "/services",
      "gallery": "/gallery",
      "products": "/product",
      "product": "/product",
      "contact": "/contact",
      "contact us": "/contact",
      "contact us now": "/contact",
      "get quote": "/contact",
      "get a quote": "/contact",
      "request a quote": "/contact",
    };
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button") as HTMLElement | null;
      if (!target) return;
      const href = target.getAttribute("href") || "";
      if (href.startsWith("/") && !href.startsWith("//")) {
        e.preventDefault();
        navigate({ to: href });
        return;
      }
      const text = (target.textContent || "").trim().toLowerCase().replace(/\s+/g, " ");
      const route = textMap[text];
      if (route) {
        e.preventDefault();
        navigate({ to: route });
        window.scrollTo(0, 0);
      }
    };
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [navigate]);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}

