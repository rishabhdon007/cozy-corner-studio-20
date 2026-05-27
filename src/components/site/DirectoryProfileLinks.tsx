import { contactInfo } from "@/data/contact";

import { DirectoryProfileLink, type DirectoryProfile } from "./DirectoryProfileLink";

const defaultProfiles: DirectoryProfile[] = [
  {
    href: contactInfo.indiaMart.url,
    logo: contactInfo.indiaMart.logo,
    logoAlt: "IndiaMART logo",
    eyebrow: contactInfo.indiaMart.eyebrow,
    label: contactInfo.indiaMart.label,
  },
  {
    href: contactInfo.justDial.url,
    logo: contactInfo.justDial.logo,
    logoAlt: "JustDial logo",
    eyebrow: contactInfo.justDial.eyebrow,
    label: contactInfo.justDial.label,
  },
];

type DirectoryProfileLinksProps = {
  profiles?: DirectoryProfile[];
  className?: string;
};

export function DirectoryProfileLinks({
  profiles = defaultProfiles,
  className,
}: DirectoryProfileLinksProps) {
  return (
    <div className={`grid w-full grid-cols-1 gap-3 pt-1.5 sm:grid-cols-2 ${className ?? ""}`.trim()}>
      {profiles.map((profile) => (
        <DirectoryProfileLink key={profile.href} {...profile} />
      ))}
    </div>
  );
}
