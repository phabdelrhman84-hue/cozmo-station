"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

export default function NotFound() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl mb-4">😕</p>
        <h1 className="text-2xl font-bold text-charcoal mb-2">
          {locale === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>
        <Link href="/products" className="btn-primary mt-4 inline-block">
          {locale === "ar" ? "تصفح المنتجات" : "Browse Products"}
        </Link>
      </div>
    </div>
  );
}
