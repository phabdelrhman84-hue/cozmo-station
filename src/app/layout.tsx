import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Cozmo Station | كوزمو ستيشن - العناية الكورية بالبشرة",
    template: "%s | Cozmo Station",
  },
  description:
    "وجهتك الأولى للعناية الكورية بالبشرة في مصر. منتجات أصلية ١٠٠٪ من أشهر الماركات الكورية مع توصيل لجميع المحافظات.",
  keywords: [
    "Korean skincare",
    "العناية الكورية",
    "COSRX",
    "Beauty of Joseon",
    "Anua",
    "skincare Egypt",
    "كوزمو ستيشن",
  ],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
    siteName: "Cozmo Station",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
