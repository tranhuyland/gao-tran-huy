"use client";

import { useState, useMemo } from "react";
import { CategoryNavList } from "@/components/CategoryNavList";
import { ShopeeProductGrid } from "@/components/ShopeeProductGrid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { products, categories } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.categorySlug === activeCategory);
  }, [activeCategory]);

  const activeCat = categories.find((c) => c.slug === activeCategory);

  return (
    <div className="bg-[#f5f5f5] py-4 md:py-8">
      <div className="container-wide">
        <Breadcrumb
          items={[{ name: "Trang chủ", href: "/" }, { name: "Sản phẩm" }]}
          className="mb-4"
        />

        <h1 className="mb-1 font-serif text-2xl font-bold text-[#333333] sm:text-3xl">
          {activeCat ? activeCat.name : "Tất cả sản phẩm"}
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          {filtered.length} sản phẩm · Gạo sạch, nước mắm NAM Ô, dầu lạc nguyên chất
        </p>

        {/* Layout: sidebar + grid */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          {/* Category sidebar — hidden on mobile, shown as drawer trigger */}
          <aside className="lg:w-64 lg:shrink-0">
            <div className="lg:sticky lg:top-24">
              <CategoryNavList
                activeSlug={activeCategory}
                onSelect={setActiveCategory}
              />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <ShopeeProductGrid products={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}
