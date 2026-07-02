import { Breadcrumb } from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook } from "lucide-react";

export const metadata = buildMetadata({
  title: "Liên hệ",
  description:
    "Liên hệ Gạo Trần Huy – địa chỉ, số điện thoại, Zalo, email và giờ làm việc.",
  path: "/lien-he",
});

export default function ContactPage() {
  return (
    <div className="container-wide py-14 md:py-20">
      <Breadcrumb
        items={[{ name: "Trang chủ", href: "/" }, { name: "Liên hệ" }]}
        className="mb-8"
      />
      <p className="eyebrow">Liên hệ</p>
      <h1 className="heading-section mt-4">Liên hệ với chúng tôi</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Liên hệ với Gạo Trần Huy để được tư vấn gạo và đặt hàng nhanh chóng.
      </p>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl bg-secondary/40 p-7">
            <h2 className="text-lg font-bold">Thông tin liên hệ</h2>
            <ul className="mt-7 space-y-6">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-bold">Địa chỉ</p>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-bold">Điện thoại</p>
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="mt-1 block text-sm text-muted-foreground hover:text-primary"
                  >
                    {SITE.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-bold">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-1 block text-sm text-muted-foreground hover:text-primary"
                  >
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-bold">Giờ làm việc</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {SITE.workingHours}
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-7 flex gap-3">
              <a
                href={SITE.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Zalo
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-bold transition-colors hover:bg-secondary"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-secondary/40">
          <iframe
            title="Bản đồ Gạo Trần Huy"
            src={SITE.mapEmbed}
            width="100%"
            height="100%"
            style={{ minHeight: 420, border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
