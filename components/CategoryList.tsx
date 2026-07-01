import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";

export function CategoryList() {
  return (
    <section className="container-page py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Danh mục sản phẩm
          </h2>
          <p className="mt-1 text-muted-foreground">
            Chọn loại sản phẩm phù hợp nhu cầu của bạn.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/danh-muc/${c.slug}`}
            className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="64px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="line-clamp-2 text-xs font-semibold leading-tight">
              {c.name}
            </span>
            <span className="mt-1.5 inline-flex items-center text-[11px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Xem <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
