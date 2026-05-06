"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function CategoriesSection() {
  const { locale } = useLanguage();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const categories = [
    {
      id: "skincare",
      emoji: "🌸",
      label_ar: "روتين البشرة",
      label_en: "Skincare",
      count: 128,
      gradient: "from-[#FCE4EC] via-[#F8BBD0] to-[#E91E63]",
    },
    {
      id: "haircare",
      emoji: "🌿",
      label_ar: "عناية بالشعر",
      label_en: "Haircare",
      count: 64,
      gradient: "from-[#E8F5E9] via-[#C8E6C9] to-[#66BB6A]",
    },
    {
      id: "serum",
      emoji: "✨",
      label_ar: "سيروم وأمبول",
      label_en: "Serum & Ampoule",
      count: 45,
      gradient: "from-[#FFF8E1] via-[#FFECB3] to-[#FFA726]",
    },
    {
      id: "masks",
      emoji: "💎",
      label_ar: "ماسك وتقشير",
      label_en: "Masks & Peeling",
      count: 38,
      gradient: "from-[#E3F2FD] via-[#BBDEFB] to-[#42A5F5]",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block text-sage font-bold tracking-widest uppercase text-xs mb-3">
            {locale === "ar" ? "تسوقي حسب الاهتمام" : "Shop by Concern"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">
            {locale === "ar" ? (
              <>ايه <em className="text-pink not-italic font-serif">اللي تحتاجيه</em> النهارده؟</>
            ) : (
              <>What do <em className="text-pink not-italic font-serif">you need</em> today?</>
            )}
          </h2>
          <p className="text-warm-gray text-lg">
            {locale === "ar"
              ? "من العناية بالبشرة للشعر — عندنا كل حاجة"
              : "From skincare to haircare — we have it all"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="group relative rounded-3xl overflow-hidden aspect-[3/4] block"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-7xl transition-transform duration-500 group-hover:scale-110`}
              >
                {cat.emoji}
              </div>
              
              <div className="absolute top-4 rtl:right-4 ltr:left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-charcoal shadow-sm">
                <Arrow size={20} />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 pb-6 px-6 text-white">
                <h3 className="text-xl font-bold mb-1">
                  {locale === "ar" ? cat.label_ar : cat.label_en}
                </h3>
                <p className="text-sm opacity-80 font-medium">
                  {cat.count} {locale === "ar" ? "منتج" : "Products"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
