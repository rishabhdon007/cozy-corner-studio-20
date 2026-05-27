import type { StaticImageData } from "next/image";

import { assetSrc } from "@/data/contact";
import { SiteButton, SiteButtonIcon } from "@/components/site/SiteButton";

export type DirectoryProfile = {
  href: string;
  logo: StaticImageData | string;
  logoAlt: string;
  eyebrow: string;
  label: string;
};

type DirectoryProfileLinkProps = DirectoryProfile & {
  className?: string;
};

export function DirectoryProfileLink({
  href,
  logo,
  logoAlt,
  eyebrow,
  label,
  className,
}: DirectoryProfileLinkProps) {
  return (
    <SiteButton
      href={href}
      variant="row"
      icon={false}
      className={`group w-full ${className ?? ""}`.trim()}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-sm ring-1 ring-white/40">
        <img src={assetSrc(logo)} alt={logoAlt} className="h-full w-full object-contain" />
      </span>
      <span className="min-w-0 text-left">
        <span className="block font-label-md text-[8px] font-black uppercase tracking-[0.16em] text-secondary-fixed">
          {eyebrow}
        </span>
        <span className="block truncate font-headline-md text-[11px] text-white transition-colors group-hover:text-secondary-fixed">
          {label}
        </span>
      </span>
      <SiteButtonIcon
        name="open_in_new"
        className="ml-auto text-sm text-white/50 transition-transform duration-300 group-hover:text-white"
      />
    </SiteButton>
  );
}
