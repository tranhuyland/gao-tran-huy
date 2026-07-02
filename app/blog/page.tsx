"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, Plus, Pencil, Trash2, X, Save, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CloudinaryUploader } from "@/components/CloudinaryUploader";
import { syncToSheet } from "@/lib/sheet-sync";
import type { NewsArticle } from "@/types";

const BLOG_PASSWORD = "gaotranhuy2025";

type SheetBlog = {
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

const EMPTY_BLOG: SheetBlog = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  image: "",
  category: "Tin tức",
  author: "Gạo Trần Huy",
  date: new Date().toISOString().split("T")[0],
  readTime: 4,
};

export default function BlogCMSPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === BLOG_PASSWORD) {
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
            <h1 className="text-2xl font-black text-primary">Quản trị Blog</h1>
            <p className="text-sm text-muted-foreground">
              Nhập mật khẩu để truy cập trang quản trị bài viết.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bpw" className="font-bold">Mật khẩu</Label>
            <Input
              id="bpw"
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

  return <BlogCMS />;
}

function BlogCMS() {
  const [blogs, setBlogs] = useState<SheetBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<SheetBlog | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sheet?sheet=blog");
      const data = await res.json();
      setBlogs(data.length > 0 ? data : []);
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const handleSave = async (blog: SheetBlog) => {
    const isEdit = blogs.some((b) => b.id === blog.id);
    if (isEdit) {
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? blog : b)));
    } else {
      const newId = blog.id || `n${Date.now()}`;
      setBlogs((prev) => [...prev, { ...blog, id: newId }]);
    }
    setShowForm(false);
    setEditing(null);

    const result = await syncToSheet(isEdit ? "update" : "add", "blog", blog as any);
    setSyncMsg(result.message);
    setTimeout(() => setSyncMsg(""), 4000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa bài viết này?")) return;
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    const result = await syncToSheet("delete", "blog", { id });
    setSyncMsg(result.message);
    setTimeout(() => setSyncMsg(""), 4000);
  };

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-wide py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="eyebrow">CMS</p>
          <h1 className="heading-section mt-3">Quản lý blog</h1>
        </div>
        <Button
          onClick={() => {
            setEditing({ ...EMPTY_BLOG });
            setShowForm(true);
          }}
          className="rounded-xl"
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm bài viết
        </Button>
      </div>

      {syncMsg && (
        <div className="mb-4 rounded-xl bg-secondary/60 px-4 py-3 text-sm font-semibold text-muted-foreground">
          {syncMsg}
        </div>
      )}

      <div className="mb-5 flex items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm bài viết..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl bg-background pl-10"
          />
        </div>
        <span className="text-sm text-muted-foreground">{filtered.length} bài viết</span>
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
                <th className="px-4 py-4">Tiêu đề</th>
                <th className="px-4 py-4">Danh mục</th>
                <th className="px-4 py-4">Ngày</th>
                <th className="px-4 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-border/20">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{b.id}</td>
                  <td className="px-4 py-3">
                    {b.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.image} alt={b.title} className="h-12 w-16 rounded-lg object-cover" />
                    ) : (
                      <div className="h-12 w-16 rounded-lg bg-secondary" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-bold">{b.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => {
                          setEditing({ ...b });
                          setShowForm(true);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label="Sửa"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
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
        <BlogForm
          blog={editing}
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

function BlogForm({
  blog,
  onSave,
  onClose,
}: {
  blog: SheetBlog;
  onSave: (b: SheetBlog) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<SheetBlog>(blog);
  const [saving, setSaving] = useState(false);

  const set = (key: keyof SheetBlog, value: any) =>
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
            {blog.id && blog.id !== "" ? "Sửa bài viết" : "Thêm bài viết mới"}
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
                placeholder="n01 (để trống nếu tự sinh)"
                className="rounded-xl bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Slug (URL)</Label>
              <Input
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="cach-chen-gao-st25-ngon"
                className="rounded-xl bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Tiêu đề *</Label>
            <Input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Cách chê gạo ST25 ngon và dẻo nhất"
              className="rounded-xl bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Ảnh bìa</Label>
            <CloudinaryUploader
              value={form.image}
              onChange={(url) => set("image", url)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="font-bold">Danh mục</Label>
              <Input
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="Mẹo vặt / Sức khỏe"
                className="rounded-xl bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Tác giả</Label>
              <Input
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                className="rounded-xl bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Thời gian đọc (phút)</Label>
              <Input
                type="number"
                value={form.readTime}
                onChange={(e) => set("readTime", Number(e.target.value))}
                className="rounded-xl bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Ngày đăng</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className="rounded-xl bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Mô tả ngắn</Label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              className="rounded-xl bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Nội dung</Label>
            <Textarea
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              rows={8}
              className="rounded-xl bg-background"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={saving} className="rounded-xl">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Lưu bài viết
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
