import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getAllCategories } from "@/lib/products";
import { fetchSheetProducts } from "@/lib/sheet";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tất cả sản phẩm",
  description:
    "Tất cả sản phẩm Gạo Trần Huy: gạo đặc sản, gạo bình dân, gạo lứt, nếp, nước mắm NAM Ô, dầu lạc nguyên chất.",
  path: "/san-pham",
});

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    fetchSheetProducts(),
    Promise.resolve(getAllCategories()),
  ]);

  return (
    <div className="container-wide py-14 md:py-20">
      <Breadcrumb
        items={[{ name: "Trang chủ", href: "/" }, { name: "Sản phẩm" }]}
        className="mb-8"
      />
      <p className="eyebrow">Sản phẩm</p>
      <h1 className="heading-section mt-4">Tất cả sản phẩm</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Khám phá đầy đủ các dòng sản phẩm của Gạo Trần Huy – gạo sạch, nước mắm
        nhĩ NAM Ô, dầu lạc nguyên chất và gia vị.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`/danh-muc/${c.slug}`}
            className="rounded-full bg-secondary px-4 py-2 text-sm font-bold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {c.name}
          </a>
        ))}
      </div>

      <div className="mt-14">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
