import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Check, Minus, Plus, ShoppingCart, MessageCircle, Truck, ShieldCheck } from "lucide-react";
import { getProductBySlug, getRelatedProducts, getCategoryBySlug } from "@/lib/products";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RelatedProducts } from "@/components/RelatedProducts";
import { ProductDetailActions } from "@/components/ProductDetailActions";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return buildMetadata({ title: "Không tìm thấy sản phẩm" });
  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/san-pham/${product.slug}`,
    image: product.image,
  });
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);
  const related = getRelatedProducts(product, 4);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const jsonLd = productJsonLd(product);
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Trang chủ", url: SITE.url },
    { name: "Sản phẩm", url: `${SITE.url}/san-pham` },
    { name: product.name, url: `${SITE.url}/san-pham/${product.slug}` },
  ]);

  return (
    <div className="container-page py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Breadcrumb
        items={[
          { name: "Trang chủ", href: "/" },
          { name: "Sản phẩm", href: "/san-pham" },
          ...(category
            ? [{ name: category.name, href: `/danh-muc/${category.slug}` }]
            : []),
          { name: product.name },
        ]}
        className="mb-5"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-sm font-bold text-destructive-foreground">
              -{discount}%
            </span>
          )}
        </div>

        <div>
          {category && (
            <Link
              href={`/danh-muc/${category.slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold">{product.rating}</span>
            </span>
            <span className="text-muted-foreground">Đã bán {product.sold}</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {product.origin}
            </span>
            {product.inStock ? (
              <span className="flex items-center gap-1 font-medium text-green-600">
                <Check className="h-4 w-4" /> Còn hàng
              </span>
            ) : (
              <span className="font-medium text-destructive">Hết hàng</span>
            )}
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              {new Intl.NumberFormat("vi-VN").format(product.price)}₫
            </span>
            <span className="text-sm text-muted-foreground">/{product.unit}</span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {new Intl.NumberFormat("vi-VN").format(product.oldPrice)}₫
              </span>
            )}
          </div>

          <p className="mt-5 text-muted-foreground">{product.shortDescription}</p>

          <ProductDetailActions product={product} />

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
              <Truck className="h-5 w-5 text-primary" />
              <span>Giao hàng tận nơi</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>Chất lượng đảm bảo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold">Mô tả sản phẩm</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {product.nutrition && product.nutrition.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold">Thông tin dinh dưỡng</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {product.nutrition.map((n) => (
                  <div
                    key={n.label}
                    className="rounded-lg border border-border bg-card p-3 text-center"
                  >
                    <p className="text-xs text-muted-foreground">{n.label}</p>
                    <p className="mt-1 font-semibold">{n.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        <aside className="rounded-xl border border-border bg-secondary/40 p-5">
          <h3 className="font-semibold">Đặt hàng nhanh</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Gọi hoặc nhắn Zalo để được tư vấn và giao hàng tận nơi.
          </p>
          <a
            href={SITE.zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Đặt qua Zalo
          </a>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Gọi {SITE.phone}
          </a>
        </aside>
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
