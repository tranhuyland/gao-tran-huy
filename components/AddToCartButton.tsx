"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  return (
    <Button
      onClick={handleAdd}
      variant={compact ? "secondary" : "default"}
      className={compact ? "w-full" : "w-full sm:w-auto"}
      size={compact ? "sm" : "lg"}
    >
      {added ? (
        <>
          <Check className="mr-1.5 h-4 w-4" /> Đã thêm
        </>
      ) : (
        <>
          <ShoppingCart className="mr-1.5 h-4 w-4" /> Thêm vào giỏ
        </>
      )}
    </Button>
  );
}
