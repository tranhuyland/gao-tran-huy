import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CategoryList } from "@/components/CategoryList";
import { ProductGrid } from "@/components/ProductGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, getBestSellers } from "@/lib/products";
import { newsArticles } from "@/data/products";
import { ArrowRight, Truck, ShieldCheck, Headphones, BadgeCheck } from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const bestSellers = getBestSellers().slice(0, 4);
  const news = newsArticles.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="container-page -mt-2 py-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Truck, title: "Giao hàng tận nơi", desc: "Nội thành trong ngày" },
            { icon: ShieldCheck, title: "Chất lượng đảm bảo", desc: "Gạo sạch, nguồn gốc rõ" },
            { icon: BadgeCheck, title: "Giá tốt", desc: "Cạnh tranh, nhiều ưu đãi" },
            { icon: Headphones, title: "Tư vấn nhiệt tình", desc: "Zalo, điện thoại" },
          ].map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CategoryList />

      <section className="container-page py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Sản phẩm nổi bật
            </h2>
            <p className="mt-1 text-muted-foreground">
              Gạo đặc sản, nước mắm NAM Ô, dầu lạc được ưa chuộng.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/san-pham">
              Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="container-page py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Bán chạy nhất
          </h2>
          <p className="mt-1 text-muted-foreground">
            Những sản phẩm được khách hàng tin dùng.
          </p>
        </div>
        <ProductGrid products={bestSellers} />
      </section>

      <ContactCTA />

      <section className="container-page py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Tin tức & mẹo vặt
            </h2>
            <p className="mt-1 text-muted-foreground">
              Cách chọn gạo, nấu cơm ngon và kiến thức ẩm thực.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/tin-tuc">
              Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
