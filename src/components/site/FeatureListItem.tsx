type FeatureListItemProps = {
  icon: string;
  title: string;
  description: string;
  variant?: "light" | "dark";
  revealDelay?: number;
  className?: string;
};

export function FeatureListItem({
  icon,
  title,
  description,
  variant = "dark",
  revealDelay,
  className = "",
}: FeatureListItemProps) {
  const isDark = variant === "dark";

  return (
    <div className={`flex gap-5 group ${className}`.trim()}>
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 transition-colors ${
          isDark
            ? "bg-white/10 text-secondary-fixed ring-white/10 group-hover:bg-secondary-container group-hover:text-on-secondary-container"
            : "bg-primary/5 text-primary ring-primary/10 group-hover:bg-primary group-hover:text-on-primary"
        }`.trim()}
        {...(revealDelay != null
          ? {
              "data-scroll-reveal": "",
              "data-scroll-reveal-delay": String(revealDelay),
            }
          : {})}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h3
          className={`font-headline-md text-xl mb-1 ${
            isDark ? "text-white" : "text-primary"
          }`.trim()}
          {...(revealDelay != null
            ? {
                "data-scroll-reveal": "",
                "data-scroll-reveal-delay": String(revealDelay + 1),
              }
            : {})}
        >
          {title}
        </h3>
        <p
          className={`font-body-md text-sm md:text-base leading-relaxed ${
            isDark ? "text-surface-variant/80" : "text-on-surface-variant"
          }`.trim()}
          {...(revealDelay != null
            ? {
                "data-scroll-reveal": "",
                "data-scroll-reveal-delay": String(revealDelay + 2),
              }
            : {})}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
