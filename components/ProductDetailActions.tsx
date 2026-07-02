"use client";

import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/types";

export function ProductDetailActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-xl bg-secondary">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-xl hover:bg-primary/10"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Giảm"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-12 text-center text-lg font-black">{qty}</span>
        <button
          className="flex h-12 w-12 items-center justify-center rounded-xl hover:bg-primary/10"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Tăng"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 sm:flex-none"
      >
        {added ? (
          <>
            <Check className="h-5 w-5" /> Đã thêm vào giỏ
          </>
        ) : (
          <>
            <Plus className="h-5 w-5" /> Thêm vào giỏ
          </>
        )}
      </button>
    </div>
  );
}
