import { NewsCard } from "@/components/NewsCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { newsArticles } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tin tức",
  description:
    "Tin tức, mẹo vặt nấu ăn, kiến thức ẩm thực và cách chọn gạo ngon từ Gạo Trần Huy.",
  path: "/tin-tuc",
});

export default function NewsPage() {
  return (
    <div className="container-page py-8">
      <Breadcrumb
        items={[{ name: "Trang chủ", href: "/" }, { name: "Tin tức" }]}
        className="mb-4"
      />
      <h1 className="text-3xl font-bold tracking-tight">Tin tức & mẹo vặt</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Cách chọn gạo ngon, nấu cơm dẻo thơm và kiến thức ẩm thực Việt.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {newsArticles.map((a) => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
