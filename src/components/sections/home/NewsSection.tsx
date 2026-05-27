import { ArticleCard, type ArticleCardData } from "@/components/site/ArticleCard";
import { SectionHeaderWithAction } from "@/components/site/SectionHeaderWithAction";

const ARTICLES: ArticleCardData[] = [
  {
    category: "Slitting",
    date: "July 16, 2025",
    title: "What is Steel Coil Slitting & How Does It Work?",
    excerpt:
      "Steel coil slitting is an essential process in the steel industry, enabling manufacturers and distributors to provide precisely cut steel strips for various applications.",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0ujV4Ng8E8KU1IHK35SzJarc7GeYd-I3I2rN8tvAe2nyS4tj5G_ajRPyloiOCOX-eRJJuE_87R5mkCk8futck8n7U605idQA-8A9Fa2FM__3Omn1HwG8r6YixqhSMECkOJ_w0VQALms0psxDZpMqiM61X7S5Nj2cG-_CzL-wEsZxYbFexL_lFXPtoeXz--STnAeuVkPJyDspQVjEe_8YwTMnbwuf3naS0J9KuF7CGT_CMWWVjbJUwFc99mU",
  },
  {
    category: "Processed Steel",
    date: "July 16, 2025",
    title: "The Role of Processed Steel in Supporting Gujarat's Growing Industrial Sector",
    excerpt:
      "Exploring the critical role that precision processed steel plays in the rapid industrialization of the region.",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0ug5gC3Z8AVQt3oKcHisWWIL5-LFsxq291UG_GtB-o4V54ouEvH2mYbv6RbSwUEOlf_cyxMb62wwBa6slCeLZdsGLEOWKMonhgKyjjAVjvZTz6GN40EjO47U1BwoOLUGTIV4jwxPUSwLCtLWSM_74NRvEngeu112lcij4ceGXnF9YMtwrNZ-YVomnU8hXzTGF0-q-ArIwAXQjhCNRxpv1JHeW3AWfI7RAbmMhcJ-Oa01lBp-myjRm94_ARg",
  },
  {
    category: "MS Structural",
    date: "July 16, 2025",
    title: "M.S. Structural Materials: Strength for Every Structure",
    excerpt:
      "A deep dive into the properties and applications of mild steel structural components in modern construction.",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0ujkGIytisMgm1Cvv_LtFhc01NGcU59Zk7j-jzn94TZI_-GlbrrqhEnIdDIXSdlzD6h0W9UIbEhg4maq2VjqP6FKHI6KTZflGyzsA76JdRbyVycWXHhsidKKORi2KrVBX137UCQUFChDJ4sdyLctGJZRi9c4y3ZmfQnzmOcV6grP3c0r7yc7Okf9Kw0KkGAMZj-m5_Sc4s_Pp1dCX3xwjVGWtWOddTF5_QVDe5LL2ZOvtBr6-AzaBIIulUA",
  },
];

export function NewsSection() {
  return (
    <section className="py-stack-lg bg-surface-container-low reveal">
      <div className="max-w-container-max mx-auto px-gutter">
        <SectionHeaderWithAction
          eyebrow="Industry Insights"
          title="Latest News, Articles, and Insights"
          action={{
            href: "#",
            label: "View More",
            variant: "outline",
            icon: "newspaper",
            className: "px-4 py-1.5 text-sm",
          }}
          mobileAction={{
            href: "#",
            label: "View More",
            variant: "outline",
            icon: "newspaper",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.title} article={article} variant="home" />
            ))}
          </div>
        </SectionHeaderWithAction>
      </div>
    </section>
  );
}
