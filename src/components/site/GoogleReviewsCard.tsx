import { contactInfo } from "@/data/contact";
import { SiteButton, SiteButtonIcon } from "@/components/site/SiteButton";
import { cn } from "@/lib/utils";

type GoogleReviewsCardProps = {
  variant?: "glass" | "light";
  className?: string;
};

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5 shrink-0", className)} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function StarRating({ className }: { className?: string }) {
  return (
    <span className={cn("flex text-[#b7791f]", className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="material-symbols-outlined material-symbols-filled text-sm leading-none">
          star
        </span>
      ))}
    </span>
  );
}

function GoogleReviewsCardContent({ variant }: { variant: "glass" | "light" }) {
  const { googleReviews } = contactInfo;

  return (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-sm ring-1 ring-white/40">
        <GoogleIcon />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span
          className={cn(
            "block truncate font-headline-md text-sm font-bold",
            variant === "glass" ? "text-white" : "text-primary",
          )}
        >
          {googleReviews.businessName}
        </span>
        <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={cn(
              "font-display text-base font-black",
              variant === "glass" ? "text-secondary-fixed" : "text-primary",
            )}
          >
            {googleReviews.rating.toFixed(1)}
          </span>
          <StarRating />
          <span
            className={cn(
              "font-body-md text-xs",
              variant === "glass" ? "text-white/70" : "text-on-surface-variant",
            )}
          >
            {googleReviews.reviewCount} reviews
          </span>
        </span>
        <span
          className={cn(
            "mt-1 block font-body-md text-[10px] font-bold uppercase tracking-[0.14em]",
            variant === "glass"
              ? "text-white/55 transition-colors group-hover:text-secondary-fixed"
              : "text-on-surface-variant/70 transition-colors group-hover:text-primary",
          )}
        >
          {googleReviews.label}
        </span>
      </span>
    </>
  );
}

export function GoogleReviewsCard({ variant = "glass", className }: GoogleReviewsCardProps) {
  const { googleReviews } = contactInfo;
  const ariaLabel = `${googleReviews.businessName} on Google — ${googleReviews.rating} stars, ${googleReviews.reviewCount} reviews`;

  if (variant === "light") {
    return (
      <a
        href={googleReviews.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={cn(
          "group flex w-full items-center gap-5 rounded-3xl border border-outline-variant/5 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5",
          className,
        )}
      >
        <GoogleReviewsCardContent variant={variant} />
        <SiteButtonIcon name="open_in_new" className="ml-auto shrink-0 text-primary/40 transition-colors group-hover:text-primary" />
      </a>
    );
  }

  return (
    <SiteButton
      href={googleReviews.url}
      variant="row"
      icon={false}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn("group w-full", className)}
    >
      <GoogleReviewsCardContent variant={variant} />
      <SiteButtonIcon
        name="open_in_new"
        className="ml-auto text-sm text-white/50 transition-transform duration-300 group-hover:text-white"
      />
    </SiteButton>
  );
}
