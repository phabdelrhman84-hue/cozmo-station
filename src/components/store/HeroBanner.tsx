"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight } from "lucide-react";

// محتوى ثنائي اللغة — جاهز للاستبدال بـ Supabase site_content لاحقاً
const content = {
  ar: {
    badge: "🧪 تركيز 77% من مستخلص الـ Heartleaf",
    headline: "سر التريند الكوري للحصول على الـ Glass Skin",
    subheadline:
      "تهدئة فورية للبشرة المعرضة للحبوب مع ترطيب عميق. مثبت علمياً والأكثر طلباً لتنظيف المسام.",
    cta: "اكتشفي السر الآن",
    ctaHref: "/products",
  },
  en: {
    badge: "🧪 77% Heartleaf Extract Concentration",
    headline: "The Korean Secret to Glass Skin",
    subheadline:
      "Instant soothing for blemish-prone skin with deep hydration. Scientifically proven and trending for pore cleansing.",
    cta: "Discover the Secret",
    ctaHref: "/products",
  },
};

export default function HeroBanner() {
  const { locale } = useLanguage();
  const c = content[locale];
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] rounded-3xl overflow-hidden flex items-center">
      {/* ===== الصورة — priority لضمان أفضل LCP ===== */}
      <Image
        src="/banners/glass-skin-campaign.jpg"
        alt={locale === "ar" ? "حملة العناية بالبشرة الكورية" : "Korean Skincare Campaign"}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* ===== طبقة التظليل التدريجية RTL-aware ===== */}
      <div
        className={`absolute inset-0 z-10 ${
          locale === "ar"
            ? "bg-gradient-to-l from-black/65 via-black/35 to-black/10"
            : "bg-gradient-to-r from-black/65 via-black/35 to-black/10"
        }`}
      />

      {/* ===== محتوى النص — يتمركز على الجانب الصحيح حسب اللغة ===== */}
      <div
        className={`relative z-20 text-white px-6 sm:px-10 md:px-16 w-full flex ${
          locale === "ar" ? "justify-start" : "justify-start"
        }`}
      >
        <div className="flex flex-col items-start gap-5 max-w-2xl animate-fade-in">

          {/* Badge: السلطة العلمية */}
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-white/25 shadow-sm">
            {c.badge}
          </span>

          {/* Headline رئيسي */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
            {c.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-xl font-medium leading-relaxed">
            {c.subheadline}
          </p>

          {/* CTA */}
          <Link
            href={c.ctaHref}
            className="mt-2 inline-flex items-center gap-3 bg-white text-charcoal px-8 py-4 rounded-full font-bold text-lg hover:bg-beige-light transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] active:scale-100"
          >
            {c.cta}
            <Arrow size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
