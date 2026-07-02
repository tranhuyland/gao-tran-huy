import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CategoryList } from "@/components/CategoryList";
import { ProductGrid } from "@/components/ProductGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, getBestSellers } from "@/lib/products";
import { newsArticles } from "@/data/products";
import { ArrowRight, Truck, ShieldCheck, Leaf, Headphones } from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const bestSellers = getBestSellers().slice(0, 4);
  const news = newsArticles.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="container-wide -mt-8 pb-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Truck, title: "Giao hàng tận nơi", desc: "Nội thành trong ngày" },
            { icon: ShieldCheck, title: "Chất lượng đảm bảo", desc: "Gạo sạch, nguồn gốc rõ" },
            { icon: Leaf, title: "Giá tốt", desc: "Cạnh tranh, nhiều ưu đãi" },
            { icon: Headphones, title: "Tư vấn nhiệt tình", desc: "Zalo, điện thoại" },
          ].map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3.5 rounded-xl bg-secondary/40 p-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CategoryList />

      <section className="section-pad">
        <div className="container-wide">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Sản phẩm</p>
              <h2 className="heading-section mt-4">Sản phẩm nổi bật</h2>
              <p className="mt-4 max-w-lg text-lg text-muted-foreground">
                Gạo đặc sản, nước mắm NAM Ô, dầu lạc được ưa chuộng.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden rounded-xl sm:inline-flex">
              <Link href="/san-pham">
                Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/30">
        <div className="container-wide">
          <p className="eyebrow">Bán chạy</p>
          <h2 className="heading-section mt-4">Bán chạy nhất</h2>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Những sản phẩm được khách hàng tin dùng.
          </p>
          <div className="mt-12">
            <ProductGrid products={bestSellers} />
          </div>
        </div>
      </section>

      <ContactCTA />

      <section className="section-pad">
        <div className="container-wide">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Tin tức</p>
              <h2 className="heading-section mt-4">Tin tức & mẹo vặt</h2>
              <p className="mt-4 max-w-lg text-lg text-muted-foreground">
                Cách chọn gạo, nấu cơm ngon và kiến thức ẩm thực.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden rounded-xl sm:inline-flex">
              <Link href="/tin-tuc">
                Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
