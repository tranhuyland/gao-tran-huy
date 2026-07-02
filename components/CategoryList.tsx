import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/products";

export function CategoryList() {
  return (
    <section className="section-pad">
      <div className="container-wide">
        <p className="eyebrow">Danh mục</p>
        <h2 className="heading-section mt-4">Mua theo loại gạo</h2>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">
          Chọn loại sản phẩm phù hợp nhu cầu của bạn.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/danh-muc/${c.slug}`}
              className="group flex flex-col items-center gap-4 rounded-xl bg-secondary/40 p-6 text-center transition-colors hover:bg-secondary"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="line-clamp-2 text-sm font-bold leading-tight text-foreground group-hover:text-primary">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
