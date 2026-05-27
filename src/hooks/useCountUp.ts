"use client";

import { type RefObject, useEffect } from "react";

import { initCountUps } from "@/countUpDom";

type CountUpRoot = RefObject<HTMLElement | null> | ParentNode | null | undefined;

function resolveRoot(root: CountUpRoot): ParentNode | null {
  if (!root) return null;
  if (typeof root === "object" && "current" in root) {
    return root.current;
  }
  return root as ParentNode;
}

export function useCountUp(root: CountUpRoot, enabled = true, deps: unknown[] = []): void {
  useEffect(() => {
    if (!enabled) return;
    const el = resolveRoot(root);
    if (!el) return;
    return initCountUps(el);
  }, [root, enabled, ...deps]);
}
