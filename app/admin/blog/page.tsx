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
import { fetchSheetBlog, type SheetBlogPost } from "@/lib/google-sheet";

const ADMIN_PASSWORD = "gaotranhuy2024";
const SHEET_ID = "10562yhbthC7zs9mEFkBo0Ly-8ul8Nkaf2hbJwBFTWXA";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

type EditState = {
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
};

const emptyPost: EditState = {
  id: "", title: "", slug: "", excerpt: "", content: "",
  image: "", category: "Tin tức", author: "Gạo Trần Huy",
  date: new Date().toISOString().split("T")[0], readTime: 3,
};

export default function AdminBlogPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [posts, setPosts] = useState<SheetBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);
  const [syncUrl, setSyncUrl] = useState("");
  const [syncStatus, setSyncStatus] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("admin_authed") === "true") setAuthed(true);
    const savedUrl = localStorage.getItem("gas_webhook_url");
    if (savedUrl) setSyncUrl(savedUrl);
  }, []);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    const data = await fetchSheetBlog();
    setPosts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) loadPosts();
  }, [authed, loadPosts]);

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

  const handleEdit = (p: SheetBlogPost) => setEditing({ ...p });

  const handleAddNew = () => setEditing({ ...emptyPost, id: `new-${Date.now()}` });

  const handleDelete = (id: string) => {
    if (!confirm("Xóa bài viết này?")) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
    syncToSheet("delete", { id });
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      alert("Vui lòng nhập tiêu đề.");
      return;
    }
    setSaving(true);
    const slug = editing.slug || editing.title.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const saved = { ...editing, slug };
    setPosts((prev) => {
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

  const syncToSheet = async (action: string, data: Record<string, unknown>) => {
    const url = localStorage.getItem("gas_webhook_url");
    if (!url) return;
    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action, sheet: "blog", data }),
      });
      setSyncStatus("Đã đồng bộ lên Google Sheet");
      setTimeout(() => setSyncStatus(""), 3000);
    } catch {
      // no-cors mode always throws — expected
    }
  };

  const saveWebhookUrl = () => {
    localStorage.setItem("gas_webhook_url", syncUrl);
    setSyncStatus("Đã lưu URL Webhook");
    setTimeout(() => setSyncStatus(""), 3000);
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4">
        <div className="w-full max-w-sm rounded-2xl bg-background p-8">
          <div className="mb-6 flex flex-col items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="text-2xl font-black text-primary">CMS Blog</h1>
            <p className="text-sm text-muted-foreground">Gạo Trần Huy — Quản trị Blog</p>
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
      <div className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container-wide flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black text-primary">CMS Blog</h1>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold">
              {posts.length} bài viết
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/admin"
              className="hidden items-center rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-primary sm:inline-flex"
            >
              ← Sản phẩm
            </a>
            <a
              href={SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-primary sm:inline-flex"
            >
              <ExternalLink className="h-4 w-4" /> Google Sheet
            </a>
            <Button onClick={handleAddNew} className="rounded-xl">
              <Plus className="mr-1.5 h-4 w-4" /> Thêm bài viết
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="rounded-xl">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container-wide py-8">
        <div className="mb-6 rounded-xl bg-secondary/40 p-5">
          <p className="text-sm font-bold">Đồng bộ Google Sheet (Webhook Apps Script)</p>
          <p className="mt-1 text-xs text-muted-foreground">
            URL Webhook dùng chung cho cả sản phẩm và blog. Xem file <code className="rounded bg-background px-1">google-apps-script.gs</code>.
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

        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm bài viết..."
              className="rounded-xl pl-10"
            />
          </div>
          <Button variant="ghost" onClick={loadPosts} className="rounded-xl">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Tải lại"}
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl bg-secondary/40 py-20 text-center text-muted-foreground">
            Chưa có bài viết nào. Nhấn "Thêm bài viết" để bắt đầu.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-background">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-4">Ảnh</th>
                  <th className="px-4 py-4">Tiêu đề</th>
                  <th className="px-4 py-4">Danh mục</th>
                  <th className="px-4 py-4">Tác giả</th>
                  <th className="px-4 py-4">Ngày</th>
                  <th className="px-4 py-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border/20 hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt={p.title} className="h-12 w-16 rounded-lg object-cover" />
                      ) : (
                        <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-secondary">
                          <ImageIcon className="h-5 w-5 text-muted-foreground/40" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold line-clamp-1">{p.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{p.excerpt}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">{p.category}</td>
                    <td className="px-4 py-3 text-sm">{p.author}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(p.date).toLocaleDateString("vi-VN")}
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

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-primary/20 backdrop-blur-sm p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-background p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black">
                {editing.id.startsWith("new-") ? "Thêm bài viết mới" : "Sửa bài viết"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <Label className="mb-2 block font-bold">Hình ảnh</Label>
                <CloudinaryUploader
                  value={editing.image}
                  onChange={(url) => setEditing({ ...editing, image: url })}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-bold">Tiêu đề *</Label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="rounded-xl"
                  placeholder="Cách chọn gạo ngon..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="font-bold">Danh mục</Label>
                  <Input
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="rounded-xl"
                    placeholder="Tin tức"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Tác giả</Label>
                  <Input
                    value={editing.author}
                    onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="font-bold">Ngày đăng</Label>
                  <Input
                    type="date"
                    value={editing.date}
                    onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Thời gian đọc (phút)</Label>
                  <Input
                    type="number"
                    value={editing.readTime}
                    onChange={(e) => setEditing({ ...editing, readTime: Number(e.target.value) })}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold">Mô tả ngắn</Label>
                <Textarea
                  value={editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  rows={2}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-bold">Nội dung</Label>
                <Textarea
                  value={editing.content}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  rows={8}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setEditing(null)} className="rounded-xl">
                Hủy
              </Button>
              <Button onClick={handleSave} disabled={saving} className="rounded-xl">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Lưu bài viết
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
