"use client";

import { useState } from "react";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-lg border border-border">
        <button
          className="flex h-11 w-11 items-center justify-center hover:bg-secondary"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Giảm"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-12 text-center font-semibold">{qty}</span>
        <button
          className="flex h-11 w-11 items-center justify-center hover:bg-secondary"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Tăng"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <Button size="lg" onClick={handleAdd} className="flex-1 sm:flex-none">
        {added ? (
          <>
            <Check className="mr-2 h-5 w-5" /> Đã thêm vào giỏ
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" /> Thêm vào giỏ
          </>
        )}
      </Button>
    </div>
  );
}
