import type { MetadataRoute } from "next";
import { products, categories, newsArticles } from "@/data/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/san-pham",
    "/gio-hang",
    "/dat-hang",
    "/gioi-thieu",
    "/lien-he",
    "/tin-tuc",
  ].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const productPages = products.map((p) => ({
    url: `${SITE.url}/san-pham/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${SITE.url}/danh-muc/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const newsPages = newsArticles.map((a) => ({
    url: `${SITE.url}/tin-tuc/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...productPages, ...categoryPages, ...newsPages];
}
