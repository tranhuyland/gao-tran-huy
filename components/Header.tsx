"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X, Phone, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, open: openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/75 backdrop-blur-xl">
      <div className="border-b border-border/30">
        <div className="container-wide flex h-9 items-center justify-between text-xs text-muted-foreground">
          <p className="hidden sm:block">
            Gạo sạch · Nước mắm NAM Ô · Dầu lạc nguyên chất
          </p>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 font-semibold transition-colors hover:text-primary"
          >
            <Phone className="h-3 w-3" />
            {SITE.phone}
          </a>
        </div>
      </div>

      <div className="container-wide flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Wheat className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tight text-primary">
              Gạo Trần Huy
            </span>
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Gạo sạch · Đậm vị quê
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-4 py-2.5 text-sm font-bold transition-colors",
                  active
                    ? "text-primary"
                    : "text-foreground/60 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={openCart}
            className="relative h-11 w-11 rounded-full"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-full md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Mở menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-background p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Wheat className="h-4 w-4" />
                </span>
                <span className="text-lg font-black text-primary">Menu</span>
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-lg font-bold text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
