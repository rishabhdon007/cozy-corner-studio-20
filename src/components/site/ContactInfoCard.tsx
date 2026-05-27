import { SiteButton, SiteButtonIcon } from "@/components/site/SiteButton";
import { cn } from "@/lib/utils";

export type ContactInfoCardProps = {
  icon: string;
  label: string;
  value: string;
  href?: string;
  className?: string;
};

const cardShellClass =
  "group flex w-full items-center gap-6 rounded-3xl border border-outline-variant/5 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5";

function ContactInfoCardContent({ icon, label, value }: Pick<ContactInfoCardProps, "icon" | "label" | "value">) {
  return (
    <>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white transition-transform group-hover:scale-110">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <div className="flex-1">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{label}</p>
        <p className="font-display text-lg font-bold text-primary">{value}</p>
      </div>
    </>
  );
}

export function ContactInfoCard({ icon, label, value, href, className }: ContactInfoCardProps) {
  if (href) {
    return (
      <SiteButton href={href} variant="row-card" icon={false} className={cn("group w-full", className)}>
        <ContactInfoCardContent icon={icon} label={label} value={value} />
        <SiteButtonIcon name="arrow_forward" className="text-primary/40" />
      </SiteButton>
    );
  }

  return (
    <div className={cn(cardShellClass, className)}>
      <ContactInfoCardContent icon={icon} label={label} value={value} />
    </div>
  );
}
