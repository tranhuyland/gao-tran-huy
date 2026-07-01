export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  unit: string;
  origin: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery?: string[];
  rating: number;
  sold: number;
  inStock: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  tags: string[];
  nutrition?: {
    label: string;
    value: string;
  }[];
};

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
