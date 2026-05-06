"use client";

import { LanguageProvider } from "@/hooks/useLanguage";
import { CartProvider } from "@/hooks/useCart";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}
