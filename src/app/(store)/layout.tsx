"use client";

import { Suspense } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
import { CartProvider } from "@/hooks/useCart";
import { ProductsProvider } from "@/hooks/useProducts";
import { WishlistProvider } from "@/hooks/useWishlist";
import { RecentlyViewedProvider } from "@/hooks/useRecentlyViewed";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import MobileBottomNav from "@/components/store/MobileBottomNav";
import Analytics from "@/components/store/Analytics";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <ProductsProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>
            <CartProvider>
              <Suspense fallback={null}>
                <Analytics />
              </Suspense>
              <div className="flex flex-col min-h-screen pb-14 lg:pb-0">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
                <MobileBottomNav />
              </div>
            </CartProvider>
          </RecentlyViewedProvider>
        </WishlistProvider>
      </ProductsProvider>
    </LanguageProvider>
  );
}
