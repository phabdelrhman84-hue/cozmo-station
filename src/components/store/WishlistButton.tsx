"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useLanguage } from "@/hooks/useLanguage";
import type { Product } from "@/types";

/**
 * زر القلب — إضافة/إزالة من قائمة الأمنيات. بيستخدم في ProductCard وصفحة المنتج.
 */
export default function WishlistButton({
  product,
  size = 18,
  className = "",
}: {
  product: Product;
  size?: number;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const { locale } = useLanguage();
  const active = has(product.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
      }}
      aria-label={
        active
          ? locale === "ar"
            ? "إزالة من المفضلة"
            : "Remove from wishlist"
          : locale === "ar"
          ? "أضيفي للمفضلة"
          : "Add to wishlist"
      }
      aria-pressed={active}
      className={`flex items-center justify-center rounded-full transition-all active:scale-90 ${className}`}
    >
      <Heart
        size={size}
        className={
          active ? "fill-pink text-pink" : "text-charcoal/70 hover:text-pink"
        }
        strokeWidth={2}
      />
    </button>
  );
}
