import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { SiteButton } from "@/components/site/SiteButton";
import { cn } from "@/lib/utils";

type HeroCtaAction = {
  href: string;
  label: string;
  icon?: string;
  lucideIcon?: LucideIcon;
  iconPosition?: "start" | "end";
};

type HeroCtaGroupProps = {
  primary: HeroCtaAction;
  secondary: HeroCtaAction;
  className?: string;
  children?: ReactNode;
};

export function HeroCtaGroup({ primary, secondary, className, children }: HeroCtaGroupProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row", className)}>
      <SiteButton href={primary.href} variant="hero-primary">
        {primary.label}
      </SiteButton>
      <SiteButton
        href={secondary.href}
        variant="hero-outline"
        icon={secondary.icon ?? "design_services"}
        lucideIcon={secondary.lucideIcon}
        iconPosition={secondary.iconPosition}
      >
        {secondary.label}
      </SiteButton>
      {children}
    </div>
  );
}
