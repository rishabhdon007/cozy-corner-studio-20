import type { ReactNode } from "react";

import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteButton, type SiteButtonProps } from "@/components/site/SiteButton";
import { cn } from "@/lib/utils";

type SectionAction = {
  href: string;
  label: string;
  variant?: SiteButtonProps["variant"];
  icon?: SiteButtonProps["icon"];
  iconClassName?: string;
  className?: string;
};

type SectionHeaderWithActionProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  action?: SectionAction;
  mobileAction?: SectionAction;
  className?: string;
  headerClassName?: string;
  children?: ReactNode;
};

export function SectionHeaderWithAction({
  eyebrow,
  title,
  lead,
  align = "left",
  action,
  mobileAction,
  className,
  headerClassName,
  children,
}: SectionHeaderWithActionProps) {
  const desktopAction = action;
  const phoneAction = mobileAction ?? action;

  return (
    <div className={cn("mb-stack-md", className)}>
      <div
        className={cn(
          "site-section-header flex flex-col gap-4 border-b border-outline-variant pb-4 md:flex-row md:items-end md:justify-between",
          align === "center" && "text-center md:text-left",
          headerClassName,
        )}
      >
        <div className={cn(align === "center" ? "md:flex-1" : "md:flex-1 md:text-left")}>
          <SectionHeading
            align={align}
            eyebrow={eyebrow}
            title={title}
            lead={lead}
            className="!mb-0"
            titleClassName={lead ? "mb-2" : undefined}
            leadClassName="mb-2"
          />
        </div>

        {desktopAction ? (
          <SiteButton
            href={desktopAction.href}
            variant={desktopAction.variant ?? "outline"}
            icon={desktopAction.icon}
            iconClassName={desktopAction.iconClassName}
            className={cn("hidden md:inline-flex", desktopAction.className)}
          >
            {desktopAction.label}
          </SiteButton>
        ) : null}
      </div>

      {children}

      {phoneAction ? (
        <div className="mt-6 text-center md:hidden">
          <SiteButton
            href={phoneAction.href}
            variant={phoneAction.variant ?? "outline"}
            icon={phoneAction.icon}
            iconClassName={phoneAction.iconClassName}
            className={phoneAction.className}
          >
            {phoneAction.label}
          </SiteButton>
        </div>
      ) : null}
    </div>
  );
}
