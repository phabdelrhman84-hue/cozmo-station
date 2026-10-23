"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3x3, Heart, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

/**
 * شريط تنقّل سفلي على الموبايل — الرئيسية / المتجر / المفضلة / السلة.
 * مخفي على الشاشات الكبيرة (lg).
 */
export default function MobileBottomNav() {
  const { locale } = useLanguage();
  const { totalItems, openCart } = useCart();
  const { count } = useWishlist();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `flex flex-col items-center justify-center gap-0.5 flex-1 text-[10px] font-medium transition-colors ${
      isActive(href) ? "text-pink-dark" : "text-warm-gray"
    }`;

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 h-14 bg-white border-t border-beige-dark flex items-stretch">
      <Link href="/" className={linkClass("/")}>
        <Home size={20} />
        {locale === "ar" ? "الرئيسية" : "Home"}
      </Link>
      <Link href="/products" className={linkClass("/products")}>
        <Grid3x3 size={20} />
        {locale === "ar" ? "المتجر" : "Shop"}
      </Link>
      <Link href="/wishlist" className={linkClass("/wishlist")}>
        <span className="relative">
          <Heart size={20} />
          {count > 0 && (
            <span className="absolute -top-1.5 -end-2 min-w-[15px] h-[15px] px-0.5 bg-pink text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </span>
        {locale === "ar" ? "المفضلة" : "Saved"}
      </Link>
      <button
        onClick={openCart}
        className="flex flex-col items-center justify-center gap-0.5 flex-1 text-[10px] font-medium text-warm-gray"
      >
        <span className="relative">
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -end-2 min-w-[15px] h-[15px] px-0.5 bg-pink text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </span>
        {locale === "ar" ? "السلة" : "Cart"}
      </button>
    </nav>
  );
}
