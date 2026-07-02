"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Pencil, Trash2, X, Save, Lock, LogOut, Search,
  Image as ImageIcon, ExternalLink, Loader2, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CloudinaryUploader } from "@/components/CloudinaryUploader";
import { fetchSheetProducts, type SheetProduct } from "@/lib/google-sheet";
import { formatPrice } from "@/lib/site";

const ADMIN_PASSWORD = "gaotranhuy2024";
const SHEET_ID = "10562yhbthC7zs9mEFkBo0Ly-8ul8Nkaf2hbJwBFTWXA";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

type EditState = {
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
};

const emptyProduct: EditState = {
  id: "", name: "", slug: "", category: "", categorySlug: "",
  price: 0, oldPrice: 0, unit: "kg", origin: "",
  shortDescription: "", description: "", image: "",
  rating: 5, sold: 0, inStock: true, isFeatured: false, isBestSeller: false,
  tags: "",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [products, setProducts] = useState<SheetProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);
  const [syncUrl, setSyncUrl] = useState("");
  const [syncStatus, setSyncStatus] = useState("");

  // Check auth on mount
  useEffect(() => {
    if (sessionStorage.getItem("admin_authed") === "true") setAuthed(true);
    const savedUrl = localStorage.getItem("gas_webhook_url");
    if (savedUrl) setSyncUrl(savedUrl);
  }, []);

  // Fetch products when authed
  const loadProducts = useCallback(async () => {
    setLoading(true);
    const data = await fetchSheetProducts();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed, loadProducts]);

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("admin_authed", "true");
      setPwError("");
    } else {
      setPwError("Mật khẩu không đúng.");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    sessionStorage.removeItem("admin_authed");
  };

  const handleEdit = (p: SheetProduct) => {
    setEditing({ ...p });
  };

  const handleAddNew = () => {
    setEditing({ ...emptyProduct, id: `new-${Date.now()}` });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Xóa sản phẩm này?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    syncToSheet("delete", { id });
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.name.trim()) {
      alert("Vui lòng nhập tên sản phẩm.");
      return;
    }
    setSaving(true);
    const slug = editing.slug || editing.name.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const saved = { ...editing, slug };

    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === editing.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [...prev, saved];
    });

    syncToSheet(editing.id.startsWith("new-") ? "add" : "update", saved);
    setEditing(null);
    setSaving(false);
  };

  // Sync to Google Sheet via Apps Script webhook
  const syncToSheet = async (action: string, data: Record<string, unknown>) => {
    const url = localStorage.getItem("gas_webhook_url");
    if (!url) return; // No webhook configured — skip sync
    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action, sheet: "sp", data }),
      });
      setSyncStatus("Đã đồng bộ lên Google Sheet");
      setTimeout(() => setSyncStatus(""), 3000);
    } catch {
      // no-cors mode always throws — this is expected
    }
  };

  const saveWebhookUrl = () => {
    localStorage.setItem("gas_webhook_url", syncUrl);
    setSyncStatus("Đã lưu URL Webhook");
    setTimeout(() => setSyncStatus(""), 3000);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  // Login screen
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4">
        <div className="w-full max-w-sm rounded-2xl bg-background p-8">
          <div className="mb-6 flex flex-col items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="text-2xl font-black text-primary">Admin CMS</h1>
            <p className="text-sm text-muted-foreground">Gạo Trần Huy — Quản trị</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-bold">Mật khẩu</Label>
              <Input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Nhập mật khẩu quản trị"
                className="rounded-xl"
                autoFocus
              />
            </div>
            {pwError && <p className="text-sm font-medium text-destructive">{pwError}</p>}
            <Button onClick={handleLogin} className="w-full rounded-xl">
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container-wide flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black text-primary">CMS Sản phẩm</h1>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold">
              {products.length} sản phẩm
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-primary sm:inline-flex"
            >
              <ExternalLink className="h-4 w-4" /> Google Sheet
            </a>
            <Button onClick={handleAddNew} className="rounded-xl">
              <Plus className="mr-1.5 h-4 w-4" /> Thêm sản phẩm
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="rounded-xl">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container-wide py-8">
        {/* Webhook sync config */}
        <div className="mb-6 rounded-xl bg-secondary/40 p-5">
          <p className="text-sm font-bold">Đồng bộ Google Sheet (Webhook Apps Script)</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Dán URL Webhook từ Google Apps Script (xem file <code className="rounded bg-background px-1">google-apps-script.gs</code> trong repo).
            Để trống nếu chỉ quản lý trên web.
          </p>
          <div className="mt-3 flex gap-2">
            <Input
              value={syncUrl}
              onChange={(e) => setSyncUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="rounded-xl"
            />
            <Button onClick={saveWebhookUrl} variant="secondary" className="rounded-xl shrink-0">
              <Save className="mr-1.5 h-4 w-4" /> Lưu
            </Button>
          </div>
          {syncStatus && (
            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-primary">
              <Check className="h-4 w-4" /> {syncStatus}
            </p>
          )}
        </div>

        {/* Search */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm sản phẩm..."
              className="rounded-xl pl-10"
            />
          </div>
          <Button variant="ghost" onClick={loadProducts} className="rounded-xl">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Tải lại"}
          </Button>
        </div>

        {/* Products table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl bg-secondary/40 py-20 text-center text-muted-foreground">
            Chưa có sản phẩm nào. Nhấn "Thêm sản phẩm" để bắt đầu.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-background">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
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
                  <tr key={p.id} className="border-b border-border/20 hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                          <ImageIcon className="h-5 w-5 text-muted-foreground/40" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.origin}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">{p.category}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-primary">{formatPrice(p.price)}</span>
                      {p.oldPrice > 0 && (
                        <span className="ml-1 text-xs text-muted-foreground line-through">
                          {formatPrice(p.oldPrice)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        p.inStock ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                      }`}>
                        {p.inStock ? "Còn hàng" : "Hết"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleEdit(p)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
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
      </div>

      {/* Edit/Add modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-primary/20 backdrop-blur-sm p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-background p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black">
                {editing.id.startsWith("new-") ? "Thêm sản phẩm mới" : "Sửa sản phẩm"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Image upload */}
              <div>
                <Label className="mb-2 block font-bold">Hình ảnh</Label>
                <CloudinaryUploader
                  value={editing.image}
                  onChange={(url) => setEditing({ ...editing, image: url })}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="font-bold">Tên sản phẩm *</Label>
                  <Input
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="rounded-xl"
                    placeholder="Gạo ST25..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Danh mục</Label>
                  <Input
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="rounded-xl"
                    placeholder="Gạo đặc sản"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label className="font-bold">Giá (₫)</Label>
                  <Input
                    type="number"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Giá cũ (₫)</Label>
                  <Input
                    type="number"
                    value={editing.oldPrice}
                    onChange={(e) => setEditing({ ...editing, oldPrice: Number(e.target.value) })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Đơn vị</Label>
                  <Input
                    value={editing.unit}
                    onChange={(e) => setEditing({ ...editing, unit: e.target.value })}
                    className="rounded-xl"
                    placeholder="kg"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="font-bold">Xuất xứ</Label>
                  <Input
                    value={editing.origin}
                    onChange={(e) => setEditing({ ...editing, origin: e.target.value })}
                    className="rounded-xl"
                    placeholder="Sóc Trăng"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Tags (cách nhau bởi dấu phẩy)</Label>
                  <Input
                    value={editing.tags}
                    onChange={(e) => setEditing({ ...editing, tags: e.target.value })}
                    className="rounded-xl"
                    placeholder="gạo thơm, đặc sản"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold">Mô tả ngắn</Label>
                <Input
                  value={editing.shortDescription}
                  onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                  className="rounded-xl"
                  placeholder="Gạo thơm ngon nhất Việt Nam..."
                />
              </div>

              <div className="space-y-2">
                <Label className="font-bold">Mô tả chi tiết</Label>
                <Textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={4}
                  className="rounded-xl"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label className="font-bold">Đánh giá (1-5)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={editing.rating}
                    onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Đã bán</Label>
                  <Input
                    type="number"
                    value={editing.sold}
                    onChange={(e) => setEditing({ ...editing, sold: Number(e.target.value) })}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-end gap-4">
                  <label className="flex items-center gap-2 text-sm font-bold">
                    <input
                      type="checkbox"
                      checked={editing.inStock}
                      onChange={(e) => setEditing({ ...editing, inStock: e.target.checked })}
                      className="h-4 w-4 rounded"
                    />
                    Còn hàng
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={editing.isFeatured}
                    onChange={(e) => setEditing({ ...editing, isFeatured: e.target.checked })}
                    className="h-4 w-4 rounded"
                  />
                  Sản phẩm nổi bật
                </label>
                <label className="flex items-center gap-2 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={editing.isBestSeller}
                    onChange={(e) => setEditing({ ...editing, isBestSeller: e.target.checked })}
                    className="h-4 w-4 rounded"
                  />
                  Bán chạy
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setEditing(null)} className="rounded-xl">
                Hủy
              </Button>
              <Button onClick={handleSave} disabled={saving} className="rounded-xl">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Lưu sản phẩm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
