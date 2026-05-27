"use client";

import { useEffect, useState } from "react";

/** Returns true only after the client has mounted (post-hydration). */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
