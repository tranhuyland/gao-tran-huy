import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import type { NewsArticle } from "@/types";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/tin-tuc/${article.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <span className="text-xs font-bold uppercase tracking-wide text-primary">
          {article.category}
        </span>
        <h3 className="mt-2.5 line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-4 pt-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {new Date(article.date).toLocaleDateString("vi-VN")}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime} phút
          </span>
        </div>
      </div>
    </Link>
  );
}
