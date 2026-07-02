import type { Product, NewsArticle } from "@/types";
import { products as fallbackProducts, newsArticles as fallbackNews } from "@/data/products";

const SHEET_ID = "10562yhbthC7zs9mEFkBo0Ly-8ul8Nkaf2hbJwBFTWXA";
const BASE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`;

export async function fetchSheetProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}?sheet=sp&headers=1`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Sheet fetch failed");
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json?.table?.rows;
    if (!rows || rows.length === 0) return fallbackProducts;

    const cols = json.table.cols.map((c: any) => c.label || "");
    return rows
      .map((row: any) => {
        const obj: Record<string, string> = {};
        row.c.forEach((cell: any, i: number) => {
          obj[cols[i]] = cell?.v ?? "";
        });
        return rowToProduct(obj);
      })
      .filter((p: Product) => p.id && p.name);
  } catch {
    return fallbackProducts;
  }
}

export async function fetchSheetNews(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(`${BASE_URL}?sheet=blog&headers=1`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Sheet fetch failed");
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json?.table?.rows;
    if (!rows || rows.length === 0) return fallbackNews;

    const cols = json.table.cols.map((c: any) => c.label || "");
    return rows
      .map((row: any) => {
        const obj: Record<string, string> = {};
        row.c.forEach((cell: any, i: number) => {
          obj[cols[i]] = cell?.v ?? "";
        });
        return rowToNews(obj);
      })
      .filter((n: NewsArticle) => n.id && n.title);
  } catch {
    return fallbackNews;
  }
}

function rowToProduct(row: Record<string, any>): Product {
  const num = (v: any) => {
    const n = Number(String(v).replace(/[^\d]/g, ""));
    return isNaN(n) ? 0 : n;
  };
  const bool = (v: any) => String(v).toLowerCase() === "true" || v === "1" || v === 1;
  const tags = (v: any) =>
    String(v || "")
      .split(/[,;]/)
      .map((t) => t.trim())
      .filter(Boolean);

  return {
    id: String(row.id || row.ID || ""),
    slug: String(row.slug || row.Slug || ""),
    name: String(row.name || row.Name || row.ten || ""),
    categorySlug: String(row.categorySlug || row.category || row.danhmuc || ""),
    price: num(row.price || row.gia),
    oldPrice: num(row.oldPrice || row.giacu) || undefined,
    unit: String(row.unit || row.donvi || "kg"),
    origin: String(row.origin || row.xuatxu || ""),
    shortDescription: String(row.shortDescription || row.motaNgan || row.mota || ""),
    description: String(row.description || row.motaDayDu || row.chitiet || ""),
    image: String(row.image || row.hinhanh || row.img || ""),
    gallery: row.gallery ? String(row.gallery).split("|").map((g) => g.trim()).filter(Boolean) : undefined,
    rating: num(row.rating) || 4.5,
    sold: num(row.sold || row.daban),
    inStock: row.inStock !== undefined ? bool(row.inStock) : true,
    isFeatured: bool(row.isFeatured || row.noibat),
    isBestSeller: bool(row.isBestSeller || row.banchay),
    tags: tags(row.tags),
    nutrition: row.nutrition
      ? String(row.nutrition)
          .split("|")
          .map((n) => {
            const [label, value] = n.split(":");
            return { label: label?.trim() || "", value: value?.trim() || "" };
          })
          .filter((n) => n.label)
      : undefined,
  };
}

function rowToNews(row: Record<string, any>): NewsArticle {
  return {
    id: String(row.id || row.ID || ""),
    slug: String(row.slug || row.Slug || ""),
    title: String(row.title || row.tieude || row.name || ""),
    excerpt: String(row.excerpt || row.motaNgan || row.mota || ""),
    content: String(row.content || row.noidung || ""),
    image: String(row.image || row.hinhanh || row.img || ""),
    category: String(row.category || row.danhmuc || "Tin tức"),
    author: String(row.author || row.tacgia || "Gạo Trần Huy"),
    date: String(row.date || row.ngay || new Date().toISOString().split("T")[0]),
    readTime: Number(row.readTime || row.thoigiandoc) || 4,
  };
}
