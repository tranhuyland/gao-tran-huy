"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/types";

export function AddToCartButton({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (compact) {
    return (
      <button
        onClick={handleAdd}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-secondary py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        {added ? (
          <>
            <Check className="h-4 w-4" /> Đã thêm
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" /> Thêm vào giỏ
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
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
  );
}
