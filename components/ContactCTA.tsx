import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function ContactCTA() {
  return (
    <section className="section-pad">
      <div className="container-wide">
        <div className="overflow-hidden rounded-xl bg-primary px-8 py-16 text-primary-foreground sm:px-16 sm:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/50">
                Đặt hàng nhanh
              </p>
              <h2 className="heading-section mt-5 text-primary-foreground">
                Đặt hàng qua Zalo hoặc điện thoại
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-primary-foreground/65">
                Gọi ngay hoặc nhắn Zalo để được tư vấn gạo phù hợp và giao hàng
                tận nơi trong ngày.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                href={SITE.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-foreground px-7 py-3.5 text-sm font-bold text-primary transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-5 w-5" />
                Đặt qua Zalo
              </Link>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-foreground/25 px-7 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                <Phone className="h-5 w-5" />
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
