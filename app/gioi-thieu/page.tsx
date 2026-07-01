import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactCTA } from "@/components/ContactCTA";
import { buildMetadata } from "@/lib/seo";
import { Wheat, ShieldCheck, Truck, Heart } from "lucide-react";

export const metadata = buildMetadata({
  title: "Giới thiệu",
  description:
    "Gạo Trần Huy – hơn 10 năm kinh doanh gạo sạch, nước mắm nhĩ NAM Ô và dầu lạc nguyên chất tại Đà Nẵng.",
  path: "/gioi-thieu",
});

export default function AboutPage() {
  return (
    <div className="container-page py-8">
      <Breadcrumb
        items={[{ name: "Trang chủ", href: "/" }, { name: "Giới thiệu" }]}
        className="mb-4"
      />
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Về Gạo Trần Huy
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Gạo Trần Huy là cửa hàng chuyên cung cấp gạo sạch, nước mắm nhĩ NAM
            Ô truyền thống và dầu lạc nguyên chất. Với hơn 10 năm kinh nghiệm,
            chúng tôi cam kết mang đến sản phẩm chất lượng, nguồn gốc rõ ràng và
            giá hợp lý cho mọi gia đình Việt.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { icon: Wheat, title: "Gạo sạch", desc: "Nguồn gốc rõ ràng" },
              { icon: ShieldCheck, title: "Chất lượng", desc: "Cam kết đảm bảo" },
              { icon: Truck, title: "Giao hàng", desc: "Tận nơi trong ngày" },
              { icon: Heart, title: "Tận tâm", desc: "Phục vụ chu đáo" },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-md">
          <Image
            src="https://images.pexels.com/photos/713465/pexels-photo-713465.jpeg?auto=compress&cs=tinysrgb&w=1000"
            alt="Gạo Trần Huy"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">Sứ mệnh của chúng tôi</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Mang đến bữa cơm gia đình Việt với gạo sạch, gia vị truyền thống đậm
          đà hương vị quê hương. Chúng tôi tin rằng mỗi hạt gạo, mỗi giọt nước
          mắm đều mang câu chuyện của người nông dân và làng nghề Việt.
        </p>
      </section>

      <ContactCTA />
    </div>
  );
}
