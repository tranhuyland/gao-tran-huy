"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, Plus, Pencil, Trash2, X, Save, Loader2, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CloudinaryUploader } from "@/components/CloudinaryUploader";
import { formatPrice } from "@/lib/site";
import { syncToSheet } from "@/lib/sheet-sync";
import { categories } from "@/data/products";
import type { Product } from "@/types";

const ADMIN_PASSWORD = "gaotranhuy2025";

type SheetProduct = {
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
  rating: number;
  sold: number;
  inStock: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  tags: string;
};

const EMPTY_PRODUCT: SheetProduct = {
  id: "",
  slug: "",
  name: "",
  categorySlug: "gao-binh-dan",
  price: 0,
  oldPrice: undefined,
  unit: "kg",
  origin: "",
  shortDescription: "",
  description: "",
  image: "",
  rating: 4.5,
  sold: 0,
  inStock: true,
  isFeatured: false,
  isBestSeller: false,
  tags: "",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Mật khẩu không đúng.");
    }
  };

  if (!authed) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-5 rounded-xl bg-secondary/40 p-8"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="text-2xl font-black text-primary">Quản trị CMS</h1>
            <p className="text-sm text-muted-foreground">
              Nhập mật khẩu để truy cập trang quản trị sản phẩm.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw" className="font-bold">Mật khẩu</Label>
            <Input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-xl bg-background"
              autoFocus
            />
          </div>
          {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
          <Button type="submit" className="w-full rounded-xl">
            Đăng nhập
          </Button>
        </form>
      </div>
    );
  }

  return <ProductCMS />;
}

function ProductCMS() {
  const [products, setProducts] = useState<SheetProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<SheetProduct | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sheet?sheet=sp");
      const data = await res.json();
      setProducts(data.length > 0 ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSave = async (product: SheetProduct) => {
    const isEdit = products.some((p) => p.id === product.id);
    if (isEdit) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    } else {
      const newId = product.id || `p${Date.now()}`;
      setProducts((prev) => [...prev, { ...product, id: newId }]);
    }
    setShowForm(false);
    setEditing(null);

    const result = await syncToSheet(isEdit ? "update" : "add", "sp", product as any);
    setSyncMsg(result.message);
    setTimeout(() => setSyncMsg(""), 4000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa sản phẩm này?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    const result = await syncToSheet("delete", "sp", { id });
    setSyncMsg(result.message);
    setTimeout(() => setSyncMsg(""), 4000);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-wide py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="eyebrow">CMS</p>
          <h1 className="heading-section mt-3">Quản lý sản phẩm</h1>
        </div>
        <Button
          onClick={() => {
            setEditing({ ...EMPTY_PRODUCT });
            setShowForm(true);
          }}
          className="rounded-xl"
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Button>
      </div>

      {syncMsg && (
        <div className="mb-4 rounded-xl bg-secondary/60 px-4 py-3 text-sm font-semibold text-muted-foreground">
          {syncMsg}
        </div>
      )}

      <div className="mb-5 flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl bg-background pl-10"
          />
        </div>
        <span className="text-sm text-muted-foreground">{filtered.length} sản phẩm</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-secondary/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-4">ID</th>
                <th className="px-4 py-4">Ảnh</th>
                <th className="px-4 py-4">Tên sản phẩm</th>
                <th className="px-4 py-4">Danh mục</th>
                <th className="px-4 py-4 text-right">Giá</th>
                <th className="px-4 py-4 text-center">Tồn kho</th>
                <th className="px-4 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/20">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="px-4 py-3">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-secondary" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-bold">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.categorySlug}</td>
                  <td className="px-4 py-3 text-right font-bold text-primary">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${p.inStock ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                      {p.inStock ? "Còn" : "Hết"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => {
                          setEditing({ ...p });
                          setShowForm(true);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label="Sửa"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-destructive hover:text-white"
                        aria-label="Xóa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && editing && (
        <ProductForm
          product={editing}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function ProductForm({
  product,
  onSave,
  onClose,
}: {
  product: SheetProduct;
  onSave: (p: SheetProduct) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<SheetProduct>(product);
  const [saving, setSaving] = useState(false);

  const set = (key: keyof SheetProduct, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-primary/20 backdrop-blur-sm">
      <div className="my-8 w-full max-w-2xl rounded-xl bg-background p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-black">
            {product.id && product.id !== "" ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-bold">ID</Label>
              <Input
                value={form.id}
                onChange={(e) => set("id", e.target.value)}
                placeholder="p01 (để trống nếu tự sinh)"
                className="rounded-xl bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Slug (URL)</Label>
              <Input
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="gao-st25"
                className="rounded-xl bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Tên sản phẩm *</Label>
            <Input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Gạo ST25 – Gạo Thơm Ngon Nhất"
              className="rounded-xl bg-background"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-bold">Danh mục</Label>
              <select
                value={form.categorySlug}
                onChange={(e) => set("categorySlug", e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Đơn vị</Label>
              <Input
                value={form.unit}
                onChange={(e) => set("unit", e.target.value)}
                placeholder="kg / chai / hũ"
                className="rounded-xl bg-background"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="font-bold">Giá (₫) *</Label>
              <Input
                required
                type="number"
                value={form.price}
                onChange={(e) => set("price", Number(e.target.value))}
                className="rounded-xl bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Giá cũ (₫)</Label>
              <Input
                type="number"
                value={form.oldPrice ?? ""}
                onChange={(e) => set("oldPrice", e.target.value ? Number(e.target.value) : undefined)}
                className="rounded-xl bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Xuất xứ</Label>
              <Input
                value={form.origin}
                onChange={(e) => set("origin", e.target.value)}
                placeholder="Sóc Trăng"
                className="rounded-xl bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Hình ảnh</Label>
            <CloudinaryUploader
              value={form.image}
              onChange={(url) => set("image", url)}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Mô tả ngắn</Label>
            <Textarea
              value={form.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value)}
              rows={2}
              className="rounded-xl bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Mô tả chi tiết</Label>
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className="rounded-xl bg-background"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="font-bold">Đánh giá</Label>
              <Input
                type="number"
                step="0.1"
                value={form.rating}
                onChange={(e) => set("rating", Number(e.target.value))}
                className="rounded-xl bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Đã bán</Label>
              <Input
                type="number"
                value={form.sold}
                onChange={(e) => set("sold", Number(e.target.value))}
                className="rounded-xl bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Tags (cách nhau dấu phẩy)</Label>
              <Input
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="đặc sản, thơm, dẻo"
                className="rounded-xl bg-background"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2 text-sm font-bold">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => set("inStock", e.target.checked)}
                className="h-4 w-4 rounded"
              />
              Còn hàng
            </label>
            <label className="flex items-center gap-2 text-sm font-bold">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => set("isFeatured", e.target.checked)}
                className="h-4 w-4 rounded"
              />
              Sản phẩm nổi bật
            </label>
            <label className="flex items-center gap-2 text-sm font-bold">
              <input
                type="checkbox"
                checked={form.isBestSeller}
                onChange={(e) => set("isBestSeller", e.target.checked)}
                className="h-4 w-4 rounded"
              />
              Bán chạy
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={saving} className="rounded-xl">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Lưu sản phẩm
            </Button>
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
