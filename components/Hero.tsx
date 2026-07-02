import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <div className="container-wide grid items-center gap-12 py-16 md:grid-cols-12 md:py-24 lg:py-28">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="eyebrow">Gạo sạch · Đậm vị quê</p>
          <h1 className="heading-display mt-6 text-foreground">
            Gạo ngon,{" "}
            <span className="text-primary">đậm vị</span>{" "}
            quê hương
          </h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
            Gạo đặc sản, gạo bình dân, gạo lứt, nếp, nước mắm nhĩ NAM Ô và dầu
            lạc nguyên chất. Giao hàng tận nơi, giá tốt.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-xl px-8">
              <Link href="/san-pham">
                Khám phá sản phẩm
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-xl px-8">
              <Link href="/gioi-thieu">Về chúng tôi</Link>
            </Button>
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-7">
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl md:aspect-[4/3] lg:aspect-[5/4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Gạo Trần Huy – gạo sạch, nước mắm NAM Ô"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
