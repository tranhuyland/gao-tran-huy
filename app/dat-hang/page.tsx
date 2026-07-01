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
    <div className="container-page py-8">
      <Breadcrumb
        items={[
          { name: "Trang chủ", href: "/" },
          { name: "Giỏ hàng", href: "/gio-hang" },
          { name: "Đặt hàng" },
        ]}
        className="mb-4"
      />
      <h1 className="text-3xl font-bold tracking-tight">Đặt hàng</h1>

      {submitted ? (
        <div className="mt-8 max-w-xl rounded-xl border border-green-200 bg-green-50 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white">
            <Check className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-bold">Đơn hàng đã sẵn sàng!</h2>
          <p className="mt-2 text-muted-foreground">
            Vui lòng nhắn Zalo để xác nhận đơn. Chúng tôi sẽ liên hệ giao hàng
            trong thời gian sớm nhất.
          </p>
          <a
            href={buildZaloMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
          >
            <MessageCircle className="h-5 w-5" /> Gửi đơn qua Zalo
          </a>
          <div className="mt-4">
            <Button
              variant="ghost"
              onClick={() => {
                clear();
                setSubmitted(false);
              }}
            >
              Đặt đơn mới
            </Button>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-xl border border-dashed border-border py-20 text-center">
          <ShoppingBag className="h-14 w-14 text-muted-foreground/40" />
          <p className="text-lg font-medium">Giỏ hàng trống</p>
          <Button asChild>
            <Link href="/san-pham">Mua sắm ngay</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="mb-4 text-lg font-semibold">Thông tin giao hàng</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0901 234 567"
                  />
                </div>
              </div>
              <div className="mt-4 space-y-1.5">
                <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                <Input
                  id="address"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Số nhà, đường, phường, quận, TP"
                />
              </div>
              <div className="mt-4 space-y-1.5">
                <Label htmlFor="note">Ghi chú</Label>
                <Textarea
                  id="note"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Thời gian giao, ghi chú thêm..."
                  rows={3}
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Xác nhận đặt hàng
            </Button>
          </form>

          <aside className="h-fit rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold">Đơn hàng của bạn</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-secondary">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="line-clamp-1 font-medium">{item.product.name}</p>
                    <p className="text-muted-foreground">
                      {item.quantity} x {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-border pt-3 text-base font-semibold">
              <span>Tổng cộng</span>
              <span className="text-primary">{formatPrice(totalPrice)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
