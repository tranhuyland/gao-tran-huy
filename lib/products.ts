import { products, categories } from "@/data/products";
import type { Product, Category } from "@/types";
import { fetchSheetProducts } from "@/lib/google-sheet";

/**
 * Products are sourced from Google Sheet (tab "sp") at build/runtime.
 * Falls back to static data in data/products.ts if the Sheet is unreachable.
 */

let cachedProducts: Product[] | null = null;

function sheetToProduct(s: Awaited<ReturnType<typeof fetchSheetProducts>>[number]): Product {
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    categorySlug: s.categorySlug || s.category.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    price: s.price,
    oldPrice: s.oldPrice > 0 ? s.oldPrice : undefined,
    unit: s.unit,
    origin: s.origin,
    shortDescription: s.shortDescription,
    description: s.description,
    image: s.image,
    rating: s.rating,
    sold: s.sold,
    inStock: s.inStock,
    isFeatured: s.isFeatured,
    isBestSeller: s.isBestSeller,
    tags: s.tags ? s.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
  };
}

export async function getAllProductsAsync(): Promise<Product[]> {
  if (cachedProducts) return cachedProducts;
  const sheetData = await fetchSheetProducts();
  if (sheetData.length > 0) {
    cachedProducts = sheetData.map(sheetToProduct);
    return cachedProducts;
  }
  // Fallback to static data
  return products;
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
