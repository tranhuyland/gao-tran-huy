import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/san-pham/${product.slug}`} className="relative block aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <Badge className="bg-primary text-primary-foreground">Bán chạy</Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive">-{discount}%</Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {product.origin}
        </p>
        <div className="mt-1.5 flex items-center gap-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-medium">{product.rating}</span>
          <span className="text-muted-foreground">· Đã bán {product.sold}</span>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-muted-foreground">/{product.unit}</span>
          </div>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <div className="mt-2.5">
            <AddToCartButton product={product} compact />
          </div>
        </div>
      </div>
    </div>
  );
}
