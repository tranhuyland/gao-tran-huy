import Link from "next/link";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function ContactCTA() {
  return (
    <section className="container-page py-12">
      <div className="overflow-hidden rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:px-10 sm:py-12">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Đặt hàng nhanh qua Zalo hoặc điện thoại
            </h2>
            <p className="mt-3 max-w-lg text-primary-foreground/90">
              Gọi ngay hoặc nhắn Zalo để được tư vấn gạo phù hợp và giao hàng
              tận nơi trong ngày.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button asChild size="lg" variant="secondary">
              <Link href={SITE.zaloLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Đặt qua Zalo
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                <Phone className="mr-2 h-5 w-5" />
                {SITE.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
