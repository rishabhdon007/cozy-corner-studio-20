"use client";

import { type RefObject, useEffect } from "react";
import { usePathname } from "next/navigation";

import { initScrollReveal } from "@/scrollRevealDom";

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
    // Run synchronously: wrapping only in rAF is fragile in React Strict Mode
    // (cleanup can cancel the frame before init runs, leaving reveals uninitialized).
    return initScrollReveal(resolveRoot(root));
  }, [pathname, root, enabled]);
}
