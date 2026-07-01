"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, SITE } from "@/lib/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems, clear } = useCart();

  return (
    <div className="container-page py-8">
      <Breadcrumb
        items={[{ name: "Trang chủ", href: "/" }, { name: "Giỏ hàng" }]}
        className="mb-4"
      />
      <h1 className="text-3xl font-bold tracking-tight">Giỏ hàng</h1>

      {items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-20 text-center">
          <ShoppingBag className="h-14 w-14 text-muted-foreground/40" />
          <div>
            <p className="text-lg font-medium">Giỏ hàng của bạn đang trống</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Hãy thêm sản phẩm vào giỏ để tiếp tục.
            </p>
          </div>
          <Button asChild>
            <Link href="/san-pham">Mua sắm ngay</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-border rounded-xl border border-border bg-card">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4 p-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/san-pham/${item.product.slug}`}
                      className="font-medium hover:text-primary"
                    >
                      {item.product.name}
                    </Link>
                    <span className="text-sm text-muted-foreground">
                      {formatPrice(item.product.price)} / {item.product.unit}
                    </span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-border">
                        <button
                          className="flex h-8 w-8 items-center justify-center hover:bg-secondary"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          aria-label="Giảm"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="flex h-8 w-8 items-center justify-center hover:bg-secondary"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          aria-label="Tăng"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-primary">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between">
              <Button variant="ghost" onClick={clear}>
                Xóa tất cả
              </Button>
              <Button asChild variant="outline">
                <Link href="/san-pham">Tiếp tục mua sắm</Link>
              </Button>
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold">Tóm tắt đơn hàng</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số sản phẩm</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                <span>Tạm tính</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <Button asChild size="lg">
                <Link href="/dat-hang">
                  Đặt hàng <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={SITE.zaloLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Đặt qua Zalo
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
