"use client";

import Image from "next/image";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { categories, products } from "@/data/products";
import { cn } from "@/lib/utils";

export function CategoryNavList({
  activeSlug,
  onSelect,
}: {
  activeSlug?: string;
  onSelect?: (slug: string) => void;
}) {
  const allCount = products.length;

  const items = [
    { slug: "all", name: "Tất cả sản phẩm", image: "", count: allCount },
    ...categories.map((c) => ({
      slug: c.slug,
      name: c.name,
      image: c.image,
      count: products.filter((p) => p.categorySlug === c.slug).length,
    })),
  ];

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_4px_rgb(0,0,0,0.06)]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/50 px-4 py-3">
        <LayoutGrid className="h-4 w-4 text-[#2e7d32]" />
        <h2 className="text-sm font-bold text-[#333333]">Danh mục sản phẩm</h2>
      </div>

      {/* Vertical list */}
      <div className="flex flex-col">
        {items.map((item, idx) => {
          const active = activeSlug === item.slug || (!activeSlug && item.slug === "all");
          return (
            <button
              key={item.slug}
              onClick={() => onSelect?.(item.slug)}
              className={cn(
                "flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0",
                active ? "bg-[#2e7d32]/8" : "hover:bg-gray-50"
              )}
            >
              {/* Thumbnail 40x40 */}
              {item.image ? (
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2e7d32]/10">
                  <LayoutGrid className="h-5 w-5 text-[#2e7d32]" />
                </div>
              )}

              {/* Name + count */}
              <div className="flex flex-1 items-center gap-1.5 min-w-0">
                <span
                  className={cn(
                    "truncate text-sm font-semibold",
                    active ? "text-[#2e7d32]" : "text-[#333333]"
                  )}
                >
                  {item.name}
                </span>
                <span className="shrink-0 text-xs text-gray-400">
                  ({item.count})
                </span>
              </div>

              {/* Chevron right */}
              <ChevronRight
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  active ? "text-[#2e7d32]" : "text-gray-300"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
