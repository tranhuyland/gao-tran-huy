import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/site";
import { AddToCartButton } from "@/components/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group flex flex-col">
      <Link
        href={`/san-pham/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-xl bg-secondary"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-primary/60">
          {product.origin}
        </p>
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="font-bold text-foreground">{product.rating}</span>
          <span>· {product.sold} đã bán</span>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-muted-foreground">/{product.unit}</span>
          </div>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <div className="mt-3">
            <AddToCartButton product={product} compact />
          </div>
        </div>
      </div>
    </div>
  );
}
