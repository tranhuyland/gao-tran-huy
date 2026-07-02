import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getCategoryBySlug } from "@/lib/products";
import { fetchSheetProducts } from "@/lib/sheet";
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

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const products = await fetchSheetProducts();
  const categoryProducts = products.filter((p) => p.categorySlug === params.slug);

  return (
    <div className="container-wide py-14 md:py-20">
      <Breadcrumb
        items={[
          { name: "Trang chủ", href: "/" },
          { name: "Sản phẩm", href: "/san-pham" },
          { name: category.name },
        ]}
        className="mb-8"
      />
      <p className="eyebrow">Danh mục</p>
      <h1 className="heading-section mt-4">{category.name}</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        {category.description}
      </p>
      <div className="mt-14">
        <ProductGrid products={categoryProducts} />
      </div>
    </div>
  );
}
