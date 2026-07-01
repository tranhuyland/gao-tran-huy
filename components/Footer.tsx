import Link from "next/link";
import { Wheat, Phone, Mail, MapPin, Clock, Facebook, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Wheat className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">Gạo Trần Huy</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Cửa hàng gạo, nước mắm nhĩ NAM Ô và dầu lạc nguyên chất. Giao hàng
            tận nơi, giá tốt, chất lượng đảm bảo.
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={SITE.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Zalo"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Danh mục
          </h3>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/danh-muc/${c.slug}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Liên kết
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/san-pham" className="text-muted-foreground hover:text-primary">
                Tất cả sản phẩm
              </Link>
            </li>
            <li>
              <Link href="/gioi-thieu" className="text-muted-foreground hover:text-primary">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="/tin-tuc" className="text-muted-foreground hover:text-primary">
                Tin tức
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="text-muted-foreground hover:text-primary">
                Liên hệ
              </Link>
            </li>
            <li>
              <Link href="/dat-hang" className="text-muted-foreground hover:text-primary">
                Đặt hàng
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Liên hệ
          </h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              <span>{SITE.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Bảo lưu mọi quyền.
          </p>
          <p>gaotranhuy.vn</p>
        </div>
      </div>
    </footer>
  );
}
