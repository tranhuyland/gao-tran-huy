import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getAllProducts, getAllCategories } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tất cả sản phẩm",
  description:
    "Tất cả sản phẩm Gạo Trần Huy: gạo đặc sản, gạo bình dân, gạo lứt, nếp, nước mắm NAM Ô, dầu lạc nguyên chất.",
  path: "/san-pham",
});

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = getAllCategories();

  return (
    <div className="container-page py-8">
      <Breadcrumb
        items={[{ name: "Trang chủ", href: "/" }, { name: "Sản phẩm" }]}
        className="mb-4"
      />
      <h1 className="text-3xl font-bold tracking-tight">Tất cả sản phẩm</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Khám phá đầy đủ các dòng sản phẩm của Gạo Trần Huy – gạo sạch, nước mắm
        nhĩ NAM Ô, dầu lạc nguyên chất và gia vị.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`/danh-muc/${c.slug}`}
            className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            {c.name}
          </a>
        ))}
      </div>

      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
