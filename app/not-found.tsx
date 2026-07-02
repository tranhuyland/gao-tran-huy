import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-wide flex flex-col items-center justify-center py-36 text-center">
      <p className="text-8xl font-black text-primary">404</p>
      <h1 className="mt-6 text-3xl font-black">Không tìm thấy trang</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Trang bạn tìm không tồn tại hoặc đã bị di chuyển. Về trang chủ để tiếp tục mua sắm.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild className="rounded-xl">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Trang chủ
          </Link>
        </Button>
        <Button asChild variant="ghost" className="rounded-xl">
          <Link href="/san-pham">
            <ArrowLeft className="mr-2 h-4 w-4" /> Sản phẩm
          </Link>
        </Button>
      </div>
    </div>
  );
}
