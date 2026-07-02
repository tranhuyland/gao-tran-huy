import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, Check, MessageCircle, Truck, ShieldCheck } from "lucide-react";
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
    <div className="container-wide py-14 md:py-20">
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
        className="mb-10"
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {discount > 0 && (
            <span className="absolute left-5 top-5 rounded-full bg-primary px-3.5 py-1.5 text-sm font-bold text-primary-foreground">
              -{discount}%
            </span>
          )}
        </div>

        <div>
          {category && (
            <Link
              href={`/danh-muc/${category.slug}`}
              className="eyebrow hover:underline"
            >
              {category.name}
            </Link>
          )}
          <h1 className="heading-section mt-4">{product.name}</h1>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-bold">{product.rating}</span>
            </span>
            <span className="text-muted-foreground">Đã bán {product.sold}</span>
            <span className="text-muted-foreground">· {product.origin}</span>
            {product.inStock ? (
              <span className="flex items-center gap-1.5 font-bold text-primary">
                <Check className="h-4 w-4" /> Còn hàng
              </span>
            ) : (
              <span className="font-bold text-destructive">Hết hàng</span>
            )}
          </div>

          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-4xl font-black text-primary">
              {new Intl.NumberFormat("vi-VN").format(product.price)}₫
            </span>
            <span className="text-base text-muted-foreground">/{product.unit}</span>
            {product.oldPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {new Intl.NumberFormat("vi-VN").format(product.oldPrice)}₫
              </span>
            )}
          </div>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          <ProductDetailActions product={product} />

          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2.5 rounded-xl bg-secondary/40 p-4">
              <Truck className="h-5 w-5 text-primary" />
              <span className="font-bold">Giao hàng tận nơi</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-secondary/40 p-4">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-bold">Chất lượng đảm bảo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="heading-sub">Mô tả sản phẩm</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {product.nutrition && product.nutrition.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold">Thông tin dinh dưỡng</h3>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {product.nutrition.map((n) => (
                  <div
                    key={n.label}
                    className="rounded-xl bg-secondary/40 p-5 text-center"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      {n.label}
                    </p>
                    <p className="mt-2 text-lg font-black text-primary">{n.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-secondary px-3.5 py-1.5 text-sm font-semibold text-secondary-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        <aside className="h-fit rounded-xl bg-secondary/40 p-7">
          <h3 className="text-lg font-bold">Đặt hàng nhanh</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Gọi hoặc nhắn Zalo để được tư vấn và giao hàng tận nơi.
          </p>
          <a
            href={SITE.zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Đặt qua Zalo
          </a>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-background px-4 py-3.5 text-sm font-bold transition-colors hover:bg-secondary"
          >
            Gọi {SITE.phone}
          </a>
        </aside>
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
