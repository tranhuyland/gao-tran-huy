import "./globals.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { CartProvider } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/CartDrawer";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

const font = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} – Gạo, Nước Mắm NAM Ô, Dầu Lạc Nguyên Chất`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "gạo",
    "gạo ST25",
    "gạo đặc sản",
    "gạo bình dân",
    "gạo lứt",
    "nếp",
    "nước mắm NAM Ô",
    "dầu lạc",
    "Gạo Trần Huy",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE.url,
    siteName: SITE.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={font.variable}>
      <body className="font-sans antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
