import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { newsArticles } from "@/data/products";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = newsArticles.find((a) => a.slug === params.slug);
  if (!article) return buildMetadata({ title: "Không tìm thấy bài viết" });
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/tin-tuc/${article.slug}`,
    image: article.image,
  });
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const article = newsArticles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Trang chủ", url: SITE.url },
    { name: "Tin tức", url: `${SITE.url}/tin-tuc` },
    { name: article.title, url: `${SITE.url}/tin-tuc/${article.slug}` },
  ]);

  return (
    <div className="container-page py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Breadcrumb
        items={[
          { name: "Trang chủ", href: "/" },
          { name: "Tin tức", href: "/tin-tuc" },
          { name: article.title },
        ]}
        className="mb-4"
      />
      <article className="mx-auto max-w-3xl">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {article.category}
        </span>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" /> {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {new Date(article.date).toLocaleDateString("vi-VN")}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {article.readTime} phút đọc
          </span>
        </div>
        <div className="relative mt-6 aspect-video overflow-hidden rounded-xl border border-border bg-secondary">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
        <div className="prose prose-lg mt-6 max-w-none leading-relaxed text-foreground/90">
          <p className="text-lg text-muted-foreground">{article.excerpt}</p>
          <p className="mt-4 whitespace-pre-line">{article.content}</p>
        </div>
        <div className="mt-8 border-t border-border pt-6">
          <Button asChild variant="outline">
            <Link href="/tin-tuc">
              <ArrowLeft className="mr-2 h-4 w-4" /> Về trang tin tức
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
