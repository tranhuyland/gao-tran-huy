import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) return buildMetadata({ title: "Không tìm thấy danh mục" });
  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/danh-muc/${category.slug}`,
    image: category.image,
  });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();
  const products = getProductsByCategory(params.slug);

  return (
    <div className="container-page py-8">
      <Breadcrumb
        items={[
          { name: "Trang chủ", href: "/" },
          { name: "Sản phẩm", href: "/san-pham" },
          { name: category.name },
        ]}
        className="mb-4"
      />
      <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {category.description}
      </p>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
