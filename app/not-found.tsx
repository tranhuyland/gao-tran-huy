import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">Không tìm thấy trang</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Trang bạn tìm không tồn tại hoặc đã bị di chuyển. Về trang chủ để tiếp
 tục mua sắm.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Trang chủ
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/san-pham">
            <ArrowLeft className="mr-2 h-4 w-4" /> Sản phẩm
          </Link>
        </Button>
      </div>
    </div>
  );
}
