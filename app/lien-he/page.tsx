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
    <div className="container-page py-8">
      <Breadcrumb
        items={[{ name: "Trang chủ", href: "/" }, { name: "Liên hệ" }]}
        className="mb-4"
      />
      <h1 className="text-3xl font-bold tracking-tight">Liên hệ</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Liên hệ với Gạo Trần Huy để được tư vấn gạo và đặt hàng nhanh chóng.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 text-lg font-semibold">Thông tin liên hệ</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Địa chỉ</p>
                  <p className="text-sm text-muted-foreground">{SITE.address}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Điện thoại</p>
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {SITE.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Giờ làm việc</p>
                  <p className="text-sm text-muted-foreground">
                    {SITE.workingHours}
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              <a
                href={SITE.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Zalo
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <iframe
            title="Bản đồ Gạo Trần Huy"
            src={SITE.mapEmbed}
            width="100%"
            height="100%"
            style={{ minHeight: 360, border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
