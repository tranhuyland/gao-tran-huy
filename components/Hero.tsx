import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, ShieldCheck, Wheat } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-secondary/60 via-background to-accent/10">
      <div className="absolute inset-0 -z-10 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(28 80% 45%) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>
      <div className="container-page grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
            <Wheat className="h-4 w-4" />
            Gạo sạch – Đậm vị quê
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
            Gạo ngon, nước mắm NAM Ô,{" "}
            <span className="text-primary">dầu lạc nguyên chất</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground text-balance">
            Gạo Trần Huy cung cấp gạo đặc sản, gạo bình dân, gạo lứt, nếp, nước
            mắm nhĩ NAM Ô và dầu lạc nguyên chất. Giao hàng tận nơi, giá tốt.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/san-pham">
                Xem sản phẩm
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/gioi-thieu">Về chúng tôi</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Truck className="h-4 w-4 text-primary" /> Giao hàng tận nơi
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> Chất lượng đảm bảo
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Gạo Trần Huy – gạo sạch, nước mắm NAM Ô"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl bg-background p-4 shadow-md sm:block">
            <p className="text-2xl font-bold text-primary">10+ năm</p>
            <p className="text-xs text-muted-foreground">kinh doanh gạo sạch</p>
          </div>
        </div>
      </div>
    </section>
  );
}
