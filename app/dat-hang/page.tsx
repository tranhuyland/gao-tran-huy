"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, SITE } from "@/lib/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Check, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const buildZaloMessage = () => {
    const lines = items.map(
      (i) => `• ${i.product.name} x${i.quantity} = ${formatPrice(
        i.product.price * i.quantity
      )}`
    );
    const body = encodeURIComponent(
      `Đơn hàng Gạo Trần Huy\n\n${lines.join("\n")}\n\nTổng: ${formatPrice(
        totalPrice
      )}\n\nKhách: ${form.name}\nSĐT: ${form.phone}\nĐịa chỉ: ${form.address}\nGhi chú: ${
        form.note || "không"
      }`
    );
    return `https://zalo.me/${SITE.zalo}?message=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container-wide py-14 md:py-20">
      <Breadcrumb
        items={[
          { name: "Trang chủ", href: "/" },
          { name: "Giỏ hàng", href: "/gio-hang" },
          { name: "Đặt hàng" },
        ]}
        className="mb-8"
      />
      <p className="eyebrow">Đặt hàng</p>
      <h1 className="heading-section mt-4">Đặt hàng</h1>

      {submitted ? (
        <div className="mt-12 max-w-xl rounded-xl bg-secondary/40 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-2xl font-black">Đơn hàng đã sẵn sàng!</h2>
          <p className="mt-3 text-muted-foreground">
            Vui lòng nhắn Zalo để xác nhận đơn. Chúng tôi sẽ liên hệ giao hàng
            trong thời gian sớm nhất.
          </p>
          <a
            href={buildZaloMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground"
          >
            <MessageCircle className="h-5 w-5" /> Gửi đơn qua Zalo
          </a>
          <div className="mt-5">
            <Button
              variant="ghost"
              onClick={() => {
                clear();
                setSubmitted(false);
              }}
              className="rounded-xl"
            >
              Đặt đơn mới
            </Button>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-6 rounded-xl bg-secondary/40 py-28 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/25" />
          <p className="text-xl font-bold">Giỏ hàng trống</p>
          <Button asChild className="rounded-xl">
            <Link href="/san-pham">Mua sắm ngay</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="rounded-xl bg-secondary/40 p-7">
              <h2 className="text-lg font-bold">Thông tin giao hàng</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-bold">Họ và tên *</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="rounded-xl bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-bold">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0901 234 567"
                    className="rounded-xl bg-background"
                  />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <Label htmlFor="address" className="font-bold">Địa chỉ giao hàng *</Label>
                <Input
                  id="address"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Số nhà, đường, phường, quận, TP"
                  className="rounded-xl bg-background"
                />
              </div>
              <div className="mt-5 space-y-2">
                <Label htmlFor="note" className="font-bold">Ghi chú</Label>
                <Textarea
                  id="note"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Thời gian giao, ghi chú thêm..."
                  rows={3}
                  className="rounded-xl bg-background"
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="rounded-xl px-8">
              Xác nhận đặt hàng
            </Button>
          </form>

          <aside className="h-fit rounded-xl bg-secondary/40 p-7">
            <h2 className="text-lg font-bold">Đơn hàng của bạn</h2>
            <ul className="mt-6 space-y-5">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="line-clamp-1 font-bold">{item.product.name}</p>
                    <p className="text-muted-foreground">
                      {item.quantity} x {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <span className="text-sm font-bold">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between border-t border-border/40 pt-5 text-lg font-black">
              <span>Tổng cộng</span>
              <span className="text-primary">{formatPrice(totalPrice)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
