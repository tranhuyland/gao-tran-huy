import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle, Wheat } from "lucide-react";
import { SITE } from "@/lib/site";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-wide grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground">
              <Wheat className="h-5 w-5" />
            </span>
            <span className="text-2xl font-black tracking-tight">
              Gạo Trần Huy
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/55">
            Cửa hàng gạo sạch, nước mắm nhĩ NAM Ô và dầu lạc nguyên chất. Giao
            hàng tận nơi, chất lượng đảm bảo.
          </p>
          <div className="mt-7 flex gap-3">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/60 transition-all hover:bg-primary-foreground hover:text-primary"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={SITE.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/60 transition-all hover:bg-primary-foreground hover:text-primary"
              aria-label="Zalo"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/40">
            Danh mục
          </h3>
          <ul className="mt-6 space-y-3.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/danh-muc/${c.slug}`}
                  className="text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/40">
            Liên kết
          </h3>
          <ul className="mt-6 space-y-3.5 text-sm">
            <li>
              <Link href="/san-pham" className="text-primary-foreground/60 hover:text-primary-foreground">
                Tất cả sản phẩm
              </Link>
            </li>
            <li>
              <Link href="/gioi-thieu" className="text-primary-foreground/60 hover:text-primary-foreground">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="/tin-tuc" className="text-primary-foreground/60 hover:text-primary-foreground">
                Tin tức
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="text-primary-foreground/60 hover:text-primary-foreground">
                Liên hệ
              </Link>
            </li>
            <li>
              <Link href="/dat-hang" className="text-primary-foreground/60 hover:text-primary-foreground">
                Đặt hàng
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/40">
            Liên hệ
          </h3>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3 text-primary-foreground/60">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/35" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/35" />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-primary-foreground/60 hover:text-primary-foreground">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/35" />
              <a href={`mailto:${SITE.email}`} className="text-primary-foreground/60 hover:text-primary-foreground">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/35" />
              <span className="text-primary-foreground/60">{SITE.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-wide flex flex-col items-center justify-between gap-2 py-7 text-xs text-primary-foreground/35">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Bảo lưu mọi quyền.
          </p>
          <p>gaotranhuy.vn</p>
        </div>
      </div>
    </footer>
  );
}
