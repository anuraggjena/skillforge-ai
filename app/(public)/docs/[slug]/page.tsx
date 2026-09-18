import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsLayout } from "@/components/docs/docs-layout";
import { DocsTopicContent } from "@/components/docs/docs-topic-content";
import { DocsPagination } from "@/components/docs/docs-pagination";
import { DOCS_PAGES, DocPageData } from "@/components/docs/docs-data";

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(DOCS_PAGES)
    .filter((slug) => slug !== "introduction")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const page = DOCS_PAGES[resolvedParams.slug];

  if (!page) {
    return {
      title: "Docs | Skillforge.dev",
    };
  }

  return {
    title: `${page.title} — Documentation | Skillforge.dev`,
    description: page.description,
  };
}

export default async function DocTopicPage({ params }: DocPageProps) {
  const resolvedParams = await params;
  const page: DocPageData = DOCS_PAGES[resolvedParams.slug];

  if (!page) {
    notFound();
  }

  return (
    <DocsLayout
      category={page.category}
      title={page.title}
      description={page.description}
      subsections={page.subsections}
    >
      <DocsTopicContent slug={page.slug} />
      <DocsPagination prev={page.prev} next={page.next} />
    </DocsLayout>
  );
}
