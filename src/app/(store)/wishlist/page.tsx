"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "@/components/store/ProductCard";

export default function WishlistPage() {
  const { locale } = useLanguage();
  const { items } = useWishlist();

  return (
    <div className="min-h-screen bg-beige-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-charcoal mb-2 flex items-center gap-2">
          <Heart className="fill-pink text-pink" size={26} />
          {locale === "ar" ? "قائمة أمنياتي" : "My Wishlist"}
        </h1>
        <p className="text-warm-gray mb-8">
          {items.length}{" "}
          {locale === "ar" ? "منتج محفوظ" : items.length === 1 ? "item" : "items"}
        </p>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={64} className="text-beige-dark mx-auto mb-4" />
            <p className="text-xl font-semibold text-charcoal mb-2">
              {locale === "ar"
                ? "قائمة أمنياتك فارغة"
                : "Your wishlist is empty"}
            </p>
            <p className="text-warm-gray mb-6">
              {locale === "ar"
                ? "احفظي المنتجات اللي عجبتك للرجوع لها لاحقاً"
                : "Save products you love to come back to them later"}
            </p>
            <Link href="/products" className="btn-primary inline-block">
              {locale === "ar" ? "تصفّحي المنتجات" : "Browse products"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
