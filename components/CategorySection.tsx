import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";

export function CategorySection() {
  return (
    <section className="section-pad">
      <div className="container-wide">
        <p className="eyebrow">Khám phá</p>
        <h2 className="heading-section mt-4">Mua theo danh mục</h2>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">
          Khám phá các dòng sản phẩm của Gạo Trần Huy.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/danh-muc/${c.slug}`}
              className="group relative flex h-56 overflow-hidden rounded-xl"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                <h3 className="text-xl font-extrabold leading-tight">{c.name}</h3>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground/75">
                  Xem danh mục
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
