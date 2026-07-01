# Gạo Trần Huy – Website bán gạo

Website bán gạo, nước mắm nhĩ NAM Ô, dầu lạc nguyên chất cho cửa hàng **Gạo Trần Huy** (gaotranhuy.vn).

## Công nghệ

- **Next.js 13** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Lucide React** (icon)
- Font Be Vietnam Pro (Google Fonts)

## Tính năng

- Trang chủ với Hero, danh mục, sản phẩm nổi bật, bán chạy, tin tức
- Trang danh sách sản phẩm + lọc theo danh mục
- Trang chi tiết sản phẩm (URL đẹp `/san-pham/gao-st25`, Schema Product, breadcrumb)
- Trang danh mục `/danh-muc/[slug]`
- Giỏ hàng (CartDrawer + trang giỏ hàng, lưu localStorage)
- Đặt hàng qua form + gửi đơn qua Zalo
- Tin tức (SEO, breadcrumb, schema)
- Giới thiệu, Liên hệ (bản đồ Google Maps embed)
- SEO: sitemap.xml, robots.txt, Open Graph, Schema Product, Breadcrumb
- Responsive, tối ưu Lighthouse

## Cấu trúc dữ liệu sản phẩm

Tất cả sản phẩm và danh mục nằm trong `data/products.ts` (kiểu JSON, dễ sửa).
Để thêm/sửa sản phẩm, chỉ cần chỉnh file này – không cần sửa code khác.

## Chỉnh sửa thông tin cửa hàng

Sửa file `lib/site.ts`: tên, SĐT, Zalo, email, địa chỉ, link Facebook, bản đồ.

## Deploy lên Vercel

1. Tạo repository trên GitHub và push toàn bộ code lên.
2. Vào [vercel.com](https://vercel.com), chọn "New Project", import repo.
3. Framework Preset: Next.js (tự nhận).
4. Nhấn "Deploy" – không cần cấu hình thêm.

## Chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:3000
