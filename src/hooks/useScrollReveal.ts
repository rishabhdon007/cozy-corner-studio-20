"use client";

import { type RefObject, useEffect } from "react";
import { usePathname } from "next/navigation";

import { scheduleScrollRevealInit } from "@/scrollRevealDom";

type ScrollRevealRoot = RefObject<HTMLElement | null> | ParentNode | null | undefined;

function resolveRoot(root: ScrollRevealRoot): ParentNode {
  if (!root) return document.body;
  if (typeof root === "object" && "current" in root) {
    return root.current ?? document.body;
  }
  return root as ParentNode;
}

export function useScrollReveal(root?: ScrollRevealRoot, enabled = true): void {
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled) return;
    // Defer past hydration — initScrollReveal mutates DOM (styles, text splits) and
    // will mismatch streamed / dynamically imported sections if it runs too early.
    return scheduleScrollRevealInit(resolveRoot(root));
  }, [pathname, root, enabled]);
}
