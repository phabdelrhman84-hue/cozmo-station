"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { getShopifyProducts } from "@/lib/shopify";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function CategoriesSection() {
  const { locale } = useLanguage();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const [counts, setCounts] = useState({
    skincare: 128,
    haircare: 64,
    serum: 45,
    masks: 38
  });

  useEffect(() => {
    async function loadProductCounts() {
      try {
        const products = await getShopifyProducts(100);
        if (products && products.length > 0) {
          const getCategory = (p: any) => (p.productType || p.category || "").toLowerCase();
          const getName = (p: any) => (p.title || p.name_en || p.name || "").toLowerCase();
          const getNameAr = (p: any) => (p.name_ar || "").toLowerCase();
          const getTags = (p: any) => (p.tags || []).map((t: string) => t.toLowerCase());

          const skincareCount = products.filter(p => {
            const cat = getCategory(p);
            const tags = getTags(p);
            return cat.includes("skin") || cat.includes("face") || cat.includes("بشرة") || cat.includes("بشره") || tags.includes("skincare") || tags.includes("skin") || getName(p).includes("skin") || getNameAr(p).includes("بشرة") || getNameAr(p).includes("بشره");
          }).length;

          const haircareCount = products.filter(p => {
            const cat = getCategory(p);
            const tags = getTags(p);
            return cat.includes("hair") || cat.includes("shampoo") || cat.includes("conditioner") || cat.includes("شعر") || tags.includes("haircare") || tags.includes("hair") || getName(p).includes("hair") || getName(p).includes("shampoo") || getNameAr(p).includes("شعر");
          }).length;

          const serumCount = products.filter(p => {
            const cat = getCategory(p);
            const tags = getTags(p);
            return cat.includes("serum") || cat.includes("ampoule") || cat.includes("essence") || getName(p).includes("serum") || getName(p).includes("ampoule") || getName(p).includes("essence") || getNameAr(p).includes("سيروم") || getNameAr(p).includes("أمبول") || tags.includes("serum") || tags.includes("essence");
          }).length;

          const masksCount = products.filter(p => {
            const cat = getCategory(p);
            const tags = getTags(p);
            return cat.includes("mask") || cat.includes("peel") || cat.includes("peeling") || cat.includes("ماسك") || cat.includes("تقشير") || tags.includes("mask") || tags.includes("masks") || tags.includes("peel") || getName(p).includes("mask") || getName(p).includes("peel") || getNameAr(p).includes("ماسك") || getNameAr(p).includes("تقشير");
          }).length;

          setCounts({
            skincare: skincareCount,
            haircare: haircareCount,
            serum: serumCount,
            masks: masksCount
          });
        }
      } catch (err) {
        console.error("Error loading category counts:", err);
      }
    }
    loadProductCounts();
  }, []);

  const categories = [
    {
      id: "skincare",
      emoji: "🌸",
      label_ar: "روتين البشرة",
      label_en: "Skincare",
      count: counts.skincare,
      gradient: "from-[#FCE4EC] via-[#F8BBD0] to-[#E91E63]",
    },
    {
      id: "haircare",
      emoji: "🌿",
      label_ar: "عناية بالشعر",
      label_en: "Haircare",
      count: counts.haircare,
      gradient: "from-[#E8F5E9] via-[#C8E6C9] to-[#66BB6A]",
    },
    {
      id: "serum",
      emoji: "✨",
      label_ar: "سيروم وأمبول",
      label_en: "Serum & Ampoule",
      count: counts.serum,
      gradient: "from-[#FFF8E1] via-[#FFECB3] to-[#FFA726]",
    },
    {
      id: "masks",
      emoji: "💎",
      label_ar: "ماسك وتقشير",
      label_en: "Masks & Peeling",
      count: counts.masks,
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
