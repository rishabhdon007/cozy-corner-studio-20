type FloatingMetricBadgeProps = {
  value: string;
  label: string;
  className?: string;
  revealDelay?: number;
};

export function FloatingMetricBadge({ value, label, className, revealDelay = 2 }: FloatingMetricBadgeProps) {
  return (
    <div
      className={`absolute -bottom-7 left-6 rounded-xl border border-outline-variant bg-white px-6 py-5 text-primary shadow-xl md:left-10 ${className ?? ""}`.trim()}
      data-scroll-reveal=""
      data-scroll-reveal-delay={String(revealDelay)}
    >
      <div className="font-display-lg text-[44px] font-black leading-none tracking-tight">{value}</div>
      <div className="mt-2 text-[10px] font-black uppercase tracking-[0.28em] text-outline">{label}</div>
    </div>
  );
}
