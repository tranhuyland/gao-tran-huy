import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";

export function CategorySection() {
  return (
    <section className="container-page py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Mua theo danh mục
          </h2>
          <p className="mt-1 text-muted-foreground">
            Khám phá các dòng sản phẩm của Gạo Trần Huy.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/danh-muc/${c.slug}`}
            className="group relative flex h-44 overflow-hidden rounded-xl border border-border"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <h3 className="text-lg font-bold leading-tight">{c.name}</h3>
              <span className="mt-1 inline-flex items-center text-sm text-white/90 opacity-0 transition-opacity group-hover:opacity-100">
                Xem danh mục <ArrowRight className="ml-1.5 h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
