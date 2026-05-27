import Image from "next/image";
import type { ReactNode } from "react";

import { SiteButton } from "@/components/site/SiteButton";
import { cn } from "@/lib/utils";

export type ArticleCardData = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image?: string;
};

type ArticleCardProps = {
  article: ArticleCardData;
  variant?: "home" | "gallery";
  href?: string;
  ctaLabel?: string;
  className?: string;
  footer?: ReactNode;
};

export function ArticleCard({
  article,
  variant = "home",
  href,
  ctaLabel = "Read Full Article",
  className,
  footer,
}: ArticleCardProps) {
  const isGallery = variant === "gallery";

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest",
        isGallery
          ? "transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(10,42,94,0.05)]"
          : "shadow-sm transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
    >
      <div className={cn("relative h-48 overflow-hidden", !isGallery && "overflow-hidden")}>
        {article.image ? (
          isGallery ? (
            <>
              <div className="absolute left-4 top-4 z-10 rounded border border-outline-variant bg-surface px-2 py-1 font-label-md text-[10px] uppercase tracking-wider text-on-surface-variant">
                {article.category}
              </div>
              <Image src={article.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </>
          ) : (
            <Image
              src={article.image}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )
        ) : (
          <>
            <div className="absolute left-4 top-4 z-10 rounded border border-outline-variant bg-surface px-2 py-1 font-label-md text-[10px] uppercase tracking-wider text-on-surface-variant">
              {article.category}
            </div>
            <div className="h-full w-full bg-surface-variant" />
          </>
        )}
      </div>

      <div className="flex flex-grow flex-col p-6">
        {isGallery ? (
          <time className="mb-2 block font-label-md text-sm text-on-surface-variant">{article.date}</time>
        ) : (
          <div className="mb-3 flex items-center font-label-md text-xs text-on-surface-variant">
            <span className="mr-2 text-secondary">{article.category}</span> •{" "}
            <span className="ml-2">{article.date}</span>
          </div>
        )}

        <h3
          className={cn(
            "mb-3 flex-grow font-headline-md leading-tight",
            isGallery
              ? "text-[20px] text-on-surface"
              : "text-headline-md text-xl text-primary transition-colors group-hover:text-secondary",
          )}
        >
          {article.title}
        </h3>

        <p className="line-clamp-3 font-body-md text-sm text-on-surface-variant">{article.excerpt}</p>

        {footer ??
          (href ? (
            <SiteButton
              href={href}
              variant="text"
              className={cn("mt-auto", isGallery ? "text-secondary hover:text-primary" : "mt-4")}
              icon={isGallery ? "chevron_right" : "arrow_forward"}
              iconClassName={isGallery ? "text-[16px]" : undefined}
            >
              {ctaLabel}
            </SiteButton>
          ) : null)}
      </div>
    </article>
  );
}
