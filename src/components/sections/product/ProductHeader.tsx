import Link from "next/link";

const breadcrumbs = [
  { label: "Products", href: "/product" },
  { label: "Cold Rolled Products", href: "/product" },
  { label: "Cold Rolled Coils" },
] as const;

export function ProductHeader() {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mb-8 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-on-surface-variant shadow-sm ring-1 ring-outline-variant/60"
      >
        <ol className="inline-flex list-none p-0">
          {breadcrumbs.map((crumb) => (
            <li key={crumb.label} className="flex items-center">
              {"href" in crumb ? (
                <>
                  <Link className="hover:text-primary-dark" href={crumb.href}>
                    {crumb.label}
                  </Link>
                  <svg className="mx-2 h-3 w-3 fill-current" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                  </svg>
                </>
              ) : (
                <span className="font-bold text-primary-dark">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="mb-10 max-w-4xl">
        <span className="mb-3 inline-block text-xs font-black uppercase tracking-[0.18em] text-secondary">
          Product Spotlight
        </span>
        <h1 className="vertical-accent mb-5 font-heading text-5xl font-black uppercase leading-none tracking-[-0.04em] text-primary-dark md:text-7xl">
          Cold Rolled Coils
        </h1>
        <p className="text-lg leading-relaxed text-on-surface-variant">
          Precision-finished mild steel coils for fabrication, component manufacturing, and dependable industrial
          supply.
        </p>
      </div>
    </>
  );
}
