import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    template: "%s | Cozmo Station",
    default: "Cozmo Station | Premium Korean & German Skincare",
  },
  description: "Curated skincare and haircare routines featuring the best of Korean and German beauty technology.",
  openGraph: {
    title: "Cozmo Station | Premium Korean & German Skincare",
    description: "Elevate your skincare routine with our curated selection of premium Korean and German beauty products. Experience the science of perfect skin.",
    url: "https://cozmostation.com", // update to real URL later
    siteName: "Cozmo Station",
    images: [
      {
        url: "/og-image.jpg", // update with actual OG image path
        width: 1200,
        height: 630,
        alt: "Cozmo Station Premium Skincare",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col bg-white text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
