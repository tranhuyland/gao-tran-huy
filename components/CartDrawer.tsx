"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, SITE } from "@/lib/site";

export function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem, totalPrice, totalItems } =
    useCart();

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" onClick={close} />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <h2 className="flex items-center gap-2.5 text-lg font-black">
            <ShoppingBag className="h-5 w-5" /> Giỏ hàng
            {totalItems > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </h2>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={close}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/25" />
            <p className="text-muted-foreground">Giỏ hàng của bạn đang trống.</p>
            <Button asChild onClick={close} className="rounded-xl">
              <Link href="/san-pham">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <Link
                        href={`/san-pham/${item.product.slug}`}
                        onClick={close}
                        className="line-clamp-2 text-sm font-bold hover:text-primary"
                      >
                        {item.product.name}
                      </Link>
                      <span className="text-sm font-bold text-primary">
                        {formatPrice(item.product.price)}
                      </span>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-full bg-secondary">
                          <button
                            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary/10"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            aria-label="Giảm"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary/10"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            aria-label="Tăng"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          onClick={() => removeItem(item.product.id)}
                          aria-label="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-6 py-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tạm tính</span>
                <span className="text-2xl font-black text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full rounded-xl" onClick={close}>
                  <Link href="/dat-hang">Tiến hành đặt hàng</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full rounded-xl" onClick={close}>
                  <Link href={SITE.zaloLink} target="_blank" rel="noopener noreferrer">
                    Đặt qua Zalo
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
