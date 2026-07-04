"use client";

import { useState, useMemo } from "react";
import { ShopeeProductCard } from "@/components/ShopeeProductCard";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

type SortKey = "popular" | "newest" | "bestselling" | "price";

const tabs: { key: SortKey; label: string; icon?: typeof ArrowUpDown }[] = [
  { key: "popular", label: "Phổ biến" },
  { key: "newest", label: "Mới nhất" },
  { key: "bestselling", label: "Bán chạy" },
  { key: "price", label: "Giá", icon: ArrowUpDown },
];

export function ShopeeProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("popular");
  const [priceAsc, setPriceAsc] = useState(true);

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "newest":
        return list;
      case "bestselling":
        return list.sort((a, b) => b.sold - a.sold);
      case "price":
        return list.sort((a, b) =>
          priceAsc ? a.price - b.price : b.price - a.price
        );
      default:
        return list.sort(
          (a, b) =>
            (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.sold - a.sold
        );
    }
  }, [products, sort, priceAsc]);

  const handlePriceToggle = () => {
    if (sort === "price") {
      setPriceAsc(!priceAsc);
    } else {
      setSort("price");
      setPriceAsc(true);
    }
  };

  if (products.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 py-20 text-center text-sm text-gray-400">
        Không có sản phẩm nào trong mục này.
      </div>
    );
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-3 flex items-center gap-1 overflow-x-auto rounded-lg bg-white p-1 shadow-[0_1px_2px_rgb(0,0,0,0.06)] sm:mb-4 sm:gap-2">
        {tabs.map((tab) => {
          const active = sort === tab.key;
          const isPriceTab = tab.key === "price";
          return (
            <button
              key={tab.key}
              onClick={isPriceTab ? handlePriceToggle : () => setSort(tab.key)}
              className={cn(
                "flex shrink-0 items-center gap-1 rounded-md px-3 py-2 text-xs font-bold transition-colors sm:text-sm",
                active
                  ? "bg-[#2e7d32] text-white"
                  : "text-[#333333] hover:bg-gray-50"
              )}
            >
              {tab.label}
              {isPriceTab && (
                <span className="text-[10px]">
                  {sort === "price" ? (priceAsc ? "↑" : "↓") : "↕"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid: 2 cols mobile, 3-4 tablet, 5 desktop */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-4">
        {sorted.map((p, i) => (
          <ShopeeProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
