"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X, Phone, Wheat, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { SITE } from "@/lib/site";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm", hasSubmenu: true },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, open: openCart } = useCart();

  const closeMenu = () => {
    setOpen(false);
    setSubmenuOpen(false);
  };

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

      {/* Mobile navigation drawer */}
      {open && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Dark tinted overlay with blur */}
          <div
            className="absolute inset-0 bg-primary/40 backdrop-blur-[4px]"
            onClick={closeMenu}
          />

          {/* Solid opaque drawer */}
          <div className="absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-background shadow-2xl">
            {/* Fixed header */}
            <div className="flex items-center justify-between border-b border-border/30 px-6 py-5">
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
                onClick={closeMenu}
                aria-label="Đóng menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Scrollable nav */}
            <nav className="flex-1 overflow-y-auto px-4 py-5">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                if (link.hasSubmenu) {
                  return (
                    <div key={link.href} className="mb-1">
                      <button
                        onClick={() => setSubmenuOpen(!submenuOpen)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-4 text-lg font-bold transition-colors",
                          active
                            ? "text-primary"
                            : "text-foreground/70 hover:bg-secondary hover:text-primary"
                        )}
                      >
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform duration-300",
                            submenuOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {/* Accordion submenu */}
                      <div
                        className={cn(
                          "grid transition-all duration-300 ease-in-out",
                          submenuOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="ml-4 flex flex-col gap-0.5 border-l border-border/40 pl-3 pt-1">
                            <Link
                              href="/san-pham"
                              onClick={closeMenu}
                              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground/55 transition-colors hover:bg-secondary hover:text-primary"
                            >
                              Tất cả sản phẩm
                            </Link>
                            {categories.map((c) => (
                              <Link
                                key={c.slug}
                                href={`/danh-muc/${c.slug}`}
                                onClick={closeMenu}
                                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground/55 transition-colors hover:bg-secondary hover:text-primary"
                              >
                                {c.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "block rounded-xl px-4 py-4 text-lg font-bold transition-colors",
                      active
                        ? "bg-secondary text-primary"
                        : "text-foreground/70 hover:bg-secondary hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Footer CTA */}
            <div className="border-t border-border/30 px-6 py-5">
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground"
              >
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
