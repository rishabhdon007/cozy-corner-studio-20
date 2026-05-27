import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  lead: string;
  icon: string;
  children: ReactNode;
};

export function LegalPageShell({ eyebrow, title, lead, icon, children }: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-gray-900 reveal">
      <section className="relative overflow-hidden bg-primary px-gutter py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(147,189,255,0.22),transparent_34%),linear-gradient(135deg,rgba(0,22,60,1),rgba(10,42,94,0.92))]" />
        <div className="pointer-events-none absolute -right-10 -top-16 text-[220px] text-white/[0.04]" aria-hidden="true">
          <span className="material-symbols-outlined text-[inherit]">{icon}</span>
        </div>

        <div className="relative mx-auto max-w-container-max">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-black uppercase tracking-[0.18em] text-white/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-secondary-fixed">{title}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-secondary-fixed backdrop-blur-sm">
              <span className="material-symbols-outlined text-base" aria-hidden="true">
                {icon}
              </span>
              {eyebrow}
            </span>
            <h1 className="font-display mb-5 text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-surface-variant/85 md:text-lg">{lead}</p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-container-max px-gutter py-12 md:py-16">{children}</main>
    </div>
  );
}

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="border-b border-outline-variant/60 py-8 last:border-b-0">
      <h2 className="mb-4 font-display text-2xl font-black uppercase tracking-tight text-primary md:text-3xl">
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-7 text-on-surface-variant md:text-base">{children}</div>
    </section>
  );
}
