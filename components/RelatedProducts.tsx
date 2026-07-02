import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="section-pad">
      <div className="container-wide">
        <p className="eyebrow">Liên quan</p>
        <h2 className="heading-section mt-4">Sản phẩm cùng danh mục</h2>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
