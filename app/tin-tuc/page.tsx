import { NewsCard } from "@/components/NewsCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { fetchSheetNews } from "@/lib/sheet";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tin tức",
  description:
    "Tin tức, mẹo vặt nấu ăn, kiến thức ẩm thực và cách chọn gạo ngon từ Gạo Trần Huy.",
  path: "/tin-tuc",
});

export default async function NewsPage() {
  const news = await fetchSheetNews();

  return (
    <div className="container-wide py-14 md:py-20">
      <Breadcrumb
        items={[{ name: "Trang chủ", href: "/" }, { name: "Tin tức" }]}
        className="mb-8"
      />
      <p className="eyebrow">Tin tức</p>
      <h1 className="heading-section mt-4">Tin tức & mẹo vặt</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Cách chọn gạo ngon, nấu cơm dẻo thơm và kiến thức ẩm thực Việt.
      </p>
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((a) => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
