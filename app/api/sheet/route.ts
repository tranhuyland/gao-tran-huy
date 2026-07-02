import { NextResponse } from "next/server";
import { fetchSheetProducts, fetchSheetNews } from "@/lib/sheet";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sheet = searchParams.get("sheet");

  try {
    if (sheet === "sp") {
      const products = await fetchSheetProducts();
      return NextResponse.json(products);
    } else if (sheet === "blog") {
      const news = await fetchSheetNews();
      return NextResponse.json(news);
    }
    return NextResponse.json({ error: "Invalid sheet" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
