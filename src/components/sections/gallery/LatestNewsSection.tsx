import { ArticleCard, type ArticleCardData } from "@/components/site/ArticleCard";
import { SectionHeaderWithAction } from "@/components/site/SectionHeaderWithAction";

const articles: ArticleCardData[] = [
  {
    category: "Corporate",
    date: "October 15, 2023",
    title: "ISO 9001:2015 Certification Renewed",
    excerpt:
      "STEELCORE is proud to announce the successful renewal of our ISO 9001:2015 certification, reaffirming our commitment to rigorous quality management and continuous improvement across all manufacturing processes.",
  },
  {
    category: "Operations",
    date: "September 28, 2023",
    title: "New Cut-to-Length Line Installed",
    excerpt:
      "Expanding our processing capabilities, we have successfully commissioned a new high-speed cut-to-length line at our primary facility, significantly increasing our output capacity for custom sheet dimensions.",
  },
  {
    category: "Market Insights",
    date: "September 10, 2023",
    title: "Q3 Steel Market Analysis & Trends",
    excerpt:
      "Our logistics and procurement team provides an in-depth analysis of the Q3 steel market, covering supply chain stability, raw material cost fluctuations, and projected trends for the upcoming quarter.",
  },
];

export function LatestNewsSection() {
  return (
    <section className="w-full border-t border-outline-variant bg-surface py-stack-lg">
      <div className="mx-auto max-w-container-max px-gutter">
        <SectionHeaderWithAction
          eyebrow="Industry Insights"
          title="Latest News & Insights"
          lead="Stay updated with company announcements and industry trends."
          action={{
            href: "/gallery",
            label: "View All News",
            variant: "text",
            className: "text-secondary hover:text-primary",
            iconClassName: "text-[18px]",
          }}
          mobileAction={{
            href: "/gallery",
            label: "View All News",
            variant: "outline-secondary",
          }}
          headerClassName="mb-stack-md border-b-0 pb-0"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.title} article={article} variant="gallery" href="/gallery" />
            ))}
          </div>
        </SectionHeaderWithAction>
      </div>
    </section>
  );
}
