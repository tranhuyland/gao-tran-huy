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
    <div className="container-wide py-14 md:py-20">
      <Breadcrumb
        items={[{ name: "Trang chủ", href: "/" }, { name: "Giỏ hàng" }]}
        className="mb-8"
      />
      <p className="eyebrow">Giỏ hàng</p>
      <h1 className="heading-section mt-4">Giỏ hàng của bạn</h1>

      {items.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center gap-6 rounded-xl bg-secondary/40 py-28 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/25" />
          <div>
            <p className="text-xl font-bold">Giỏ hàng của bạn đang trống</p>
            <p className="mt-1.5 text-muted-foreground">
              Hãy thêm sản phẩm vào giỏ để tiếp tục.
            </p>
          </div>
          <Button asChild className="rounded-xl">
            <Link href="/san-pham">Mua sắm ngay</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-border/40 rounded-xl bg-secondary/30">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-5 p-6">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary">
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
                      className="font-bold hover:text-primary"
                    >
                      {item.product.name}
                    </Link>
                    <span className="text-sm text-muted-foreground">
                      {formatPrice(item.product.price)} / {item.product.unit}
                    </span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full bg-background">
                        <button
                          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary/10"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          aria-label="Giảm"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary/10"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          aria-label="Tăng"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-5">
                        <span className="font-black text-primary">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
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
            <div className="mt-6 flex justify-between">
              <Button variant="ghost" onClick={clear} className="rounded-xl">
                Xóa tất cả
              </Button>
              <Button asChild variant="ghost" className="rounded-xl">
                <Link href="/san-pham">Tiếp tục mua sắm</Link>
              </Button>
            </div>
          </div>

          <aside className="h-fit rounded-xl bg-secondary/40 p-7">
            <h2 className="text-lg font-bold">Tóm tắt đơn hàng</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số sản phẩm</span>
                <span className="font-bold">{totalItems}</span>
              </div>
              <div className="flex justify-between border-t border-border/40 pt-5 text-xl font-black">
                <span>Tạm tính</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-2">
              <Button asChild size="lg" className="rounded-xl">
                <Link href="/dat-hang">
                  Đặt hàng <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-xl">
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
