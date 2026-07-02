/**
 * Google Sheet fetch utility
 * Reads product + blog data from a published Google Sheet.
 * The sheet must be "Published to the web" (File → Share → Publish to web)
 * as CSV for this to work without authentication.
 *
 * Sheet ID: 10562yhbthC7zs9mEFkBo0Ly-8ul8Nkaf2hbJwBFTWXA
 * Sheet 1 (products): tab name "sp"
 * Sheet 2 (blog): tab name "blog"
 */

const SHEET_ID = "10562yhbthC7zs9mEFkBo0Ly-8ul8Nkaf2hbJwBFTWXA";

/** CSV export URL for a specific sheet gid or tab name */
function csvUrl(tabName: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    tabName
  )}`;
}

/** Parse CSV text into array of row objects, keyed by the header row. */
function parseCSV(text: string): Record<string, string>[] {
  const lines: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      current += ch;
    } else if (ch === "\n" && !inQuotes) {
      lines.push(current);
      current = "";
    } else if (ch === "\r" && !inQuotes) {
      // skip CR
    } else {
      current += ch;
    }
  }
  if (current) lines.push(current);

  if (lines.length < 2) return [];

  const headers = parseLine(lines[0]);
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = parseLine(lines[i]);
    if (cells.every((c) => c === "")) continue; // skip empty rows
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = cells[idx] ?? "";
    });
    rows.push(row);
  }
  return rows;
}

function parseLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      cells.push(trimQuotes(current));
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(trimQuotes(current));
  return cells;
}

function trimQuotes(s: string): string {
  let r = s;
  if (r.startsWith('"') && r.endsWith('"')) {
    r = r.slice(1, -1);
  }
  return r;
}

/** Generate URL-friendly slug from Vietnamese string */
function slugify(s: string): string {
  if (!s) return "";
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface SheetProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  oldPrice: number;
  unit: string;
  origin: string;
  shortDescription: string;
  description: string;
  image: string;
  rating: number;
  sold: number;
  inStock: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  tags: string;
}

/** Fetch products from Google Sheet tab "sp" — server-side only */
export async function fetchSheetProducts(): Promise<SheetProduct[]> {
  try {
    const res = await fetch(csvUrl("sp"), { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    const csv = await res.text();
    const rows = parseCSV(csv);
    return rows.map((r, i) => ({
      id: r.id || r.ID || `row-${i + 1}`,
      name: r.name || r.ten || r["Tên sản phẩm"] || "",
      slug: r.slug || slugify(r.name || r.ten || ""),
      category: r.category || r.danhmuc || r["Danh mục"] || "",
      categorySlug: r.categorySlug || r.category_slug || slugify(r.category || r.danhmuc || ""),
      price: Number(r.price || r.gia || r["Giá"] || "0") || 0,
      oldPrice: Number(r.oldPrice || r.giacu || r["Giá cũ"] || "0") || 0,
      unit: r.unit || r.donvi || r["Đơn vị"] || "kg",
      origin: r.origin || r.xuatxu || r["Xuất xứ"] || "",
      shortDescription: r.shortDescription || r.motaNgan || r["Mô tả ngắn"] || "",
      description: r.description || r.mota || r["Mô tả"] || "",
      image: r.image || r.hinh || r["Hình ảnh"] || "",
      rating: Number(r.rating || r["Đánh giá"] || "5") || 5,
      sold: Number(r.sold || r.daban || r["Đã bán"] || "0") || 0,
      inStock: (r.inStock || r.conhang || r["Còn hàng"] || "TRUE").toUpperCase() !== "FALSE",
      isFeatured: (r.isFeatured || r.noibat || r["Nổi bật"] || "").toUpperCase() === "TRUE",
      isBestSeller: (r.isBestSeller || r.banchay || r["Bán chạy"] || "").toUpperCase() === "TRUE",
      tags: r.tags || r["Tags"] || "",
    }));
  } catch (err) {
    console.error("fetchSheetProducts error:", err);
    return [];
  }
}

export interface SheetBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
}

/** Fetch blog posts from Google Sheet tab "blog" — server-side only */
export async function fetchSheetBlog(): Promise<SheetBlogPost[]> {
  try {
    const res = await fetch(csvUrl("blog"), { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    const csv = await res.text();
    const rows = parseCSV(csv);
    return rows.map((r, i) => ({
      id: r.id || r.ID || `post-${i + 1}`,
      title: r.title || r.tieude || r["Tiêu đề"] || "",
      slug: r.slug || slugify(r.title || r.tieude || ""),
      excerpt: r.excerpt || r.motaNgan || r["Mô tả"] || "",
      content: r.content || r.noidung || r["Nội dung"] || "",
      image: r.image || r.hinh || r["Hình ảnh"] || "",
      category: r.category || r.danhmuc || r["Danh mục"] || "Tin tức",
      author: r.author || r.tacgia || r["Tác giả"] || "Gạo Trần Huy",
      date: r.date || r.ngay || r["Ngày"] || new Date().toISOString().split("T")[0],
      readTime: Number(r.readTime || r.thoiluong || r["Thời lượng"] || "3") || 3,
    }));
  } catch (err) {
    console.error("fetchSheetBlog error:", err);
    return [];
  }
}
