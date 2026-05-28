"use client";

import { useEffect, useRef } from "react";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateTarget = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current = scrollable > 0 ? Math.min(Math.max(scrollTop / scrollable, 0), 1) : 0;
    };

    const animate = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      const next = current + (target - current) * 0.2;

      currentRef.current = Math.abs(target - next) < 0.001 ? target : next;
      bar.style.width = `${currentRef.current * 100}%`;
      rafRef.current = window.requestAnimationFrame(animate);
    };

    updateTarget();
    rafRef.current = window.requestAnimationFrame(animate);

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[10000] h-1"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-primary/10" />
      <div
        ref={barRef}
        className="absolute left-0 top-0 h-full bg-primary shadow-[0_0_8px_rgba(0,30,64,0.35)]"
        style={{ width: "0%" }}
      />
    </div>
  );
}
