import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "كوزمو ستيشن | Cozmo Station - العناية بالبشرة والشعر في مصر",
    template: "%s | كوزمو ستيشن",
  },
  description:
    "منتجات العناية بالبشرة والشعر الكورية واليابانية والألمانية في مصر. منتجات أصلية ١٠٠٪ مع توصيل لجميع المحافظات.",
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
    siteName: SITE_NAME,
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
