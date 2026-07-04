"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/site";

const vouchers = ["7.7 Voucher Xtra", "SPayLater 0%", "Freeship 0đ", "Mua 2 tặng 1"];

export function ShopeeProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const voucher = vouchers[index % vouchers.length];

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgb(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgb(0,0,0,0.1)]"
    >
      {/* Image 1:1 */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge "Yêu thích+" top-left — green brand color */}
        {product.isFeatured && (
          <span className="absolute left-0 top-0 rounded-br-lg bg-[#2e7d32] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
            Yêu thích+
          </span>
        )}

        {/* Logo "Gạo Trần Huy" top-right — circular */}
        <span className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/90 text-center text-[8px] font-bold leading-none text-[#2e7d32] shadow-sm backdrop-blur-sm">
          GTH
        </span>

        {/* Voucher banner bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] py-0.5 text-center">
          <span className="text-[10px] font-bold text-white">{voucher}</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        {/* Name — line-clamp-2 */}
        <h3 className="line-clamp-2 min-h-[2.5rem] text-xs font-medium leading-snug text-[#333333] transition-colors group-hover:text-[#2e7d32] sm:text-sm">
          {product.name}
        </h3>

        {/* Price + discount badge */}
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-base font-bold text-[#2e7d32] sm:text-lg">
            {formatPrice(product.price)}
          </span>
          {discount > 0 && (
            <span className="rounded bg-[#2e7d32]/10 px-1 py-0.5 text-[10px] font-bold text-[#2e7d32]">
              -{discount}%
            </span>
          )}
        </div>
        {product.oldPrice && (
          <span className="text-[11px] text-gray-400 line-through">
            {formatPrice(product.oldPrice)}
          </span>
        )}

        {/* Rating + sold — bottom row */}
        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
          <span className="flex items-center gap-0.5 text-[11px]">
            <Star className="h-3 w-3 fill-[#ffc107] text-[#ffc107]" />
            <span className="font-bold text-[#333333]">{product.rating}</span>
          </span>
          <span className="text-[11px] text-gray-400">Đã bán {product.sold}</span>
        </div>
      </div>
    </Link>
  );
}

export { ChevronRight };
