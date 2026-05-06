"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import ProductCard from "@/components/store/ProductCard";
import RoutineBuilder from "@/components/store/RoutineBuilder";
import ReviewsSection from "@/components/store/ReviewsSection";
import FreeShippingBar from "@/components/store/FreeShippingBar";
import CategoriesSection from "@/components/store/CategoriesSection";
import { demoProducts } from "@/lib/data";
import {
  Sparkles,
  Truck,
  Shield,
  Star,
  ArrowLeft,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function HomePage() {
  const { locale, t } = useLanguage();
  const featuredProducts = demoProducts.filter((p) => p.is_featured);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;



  const trustBadges = [
    {
      icon: <Shield size={28} />,
      title_ar: "أصلي ١٠٠٪",
      title_en: "100% Authentic",
      desc_ar: "منتجات أصلية مستوردة مباشرة من كوريا",
      desc_en: "Products directly imported from Korea",
    },
    {
      icon: <Truck size={28} />,
      title_ar: "توصيل سريع",
      title_en: "Fast Delivery",
      desc_ar: "توصيل لجميع محافظات مصر",
      desc_en: "Delivery to all Egyptian governorates",
    },
    {
      icon: <Star size={28} />,
      title_ar: "جودة مضمونة",
      title_en: "Quality Guaranteed",
      desc_ar: "نختبر كل منتج قبل إضافته",
      desc_en: "We test every product before listing",
    },
    {
      icon: <Heart size={28} />,
      title_ar: "دعم متميز",
      title_en: "Premium Support",
      desc_ar: "فريق متخصص لمساعدتك في الاختيار",
      desc_en: "Expert team to help you choose",
    },
  ];

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-beige via-beige-light to-pink-light/20 min-h-[70vh] flex items-center">
        {/* Decorative Elements */}
        <div className="absolute top-20 start-10 w-72 h-72 bg-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 end-10 w-96 h-96 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-pink/5 rounded-full" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-sage/5 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink/10 rounded-full text-pink-dark text-sm font-semibold mb-6">
                <Sparkles size={16} />
                {locale === "ar"
                  ? "العناية الكورية الأصلية"
                  : "Authentic K-Beauty"}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal leading-tight mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-lg text-warm-gray leading-relaxed mb-8 max-w-xl">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="btn-primary text-lg px-8 py-4">
                  {t("hero.cta")}
                  <Arrow
                    size={18}
                    className="inline ms-2"
                  />
                </Link>
                <Link
                  href="/about"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  {t("hero.secondary_cta")}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10">
                {[
                  {
                    num: "500+",
                    label_ar: "عميل سعيد",
                    label_en: "Happy Customers",
                  },
                  {
                    num: "50+",
                    label_ar: "منتج أصلي",
                    label_en: "Authentic Products",
                  },
                  {
                    num: "27",
                    label_ar: "محافظة",
                    label_en: "Governorates",
                  },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-extrabold text-gradient">
                      {stat.num}
                    </p>
                    <p className="text-sm text-warm-gray">
                      {locale === "ar" ? stat.label_ar : stat.label_en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:flex items-center justify-center animate-slide-up">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-pink/20 to-sage/20 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-pink-light/40 to-sage-light/30 flex items-center justify-center text-8xl">
                    ✨
                  </div>
                </div>
                {/* Floating product cards */}
                <div className="absolute -top-4 -end-8 bg-white rounded-2xl shadow-lg p-3 animate-pulse-soft">
                  <div className="text-3xl">🧴</div>
                  <p className="text-xs font-bold text-charcoal mt-1">COSRX</p>
                </div>
                <div className="absolute -bottom-4 -start-8 bg-white rounded-2xl shadow-lg p-3 animate-pulse-soft" style={{ animationDelay: "1s" }}>
                  <div className="text-3xl">☀️</div>
                  <p className="text-xs font-bold text-charcoal mt-1">SPF50+</p>
                </div>
                <div className="absolute top-1/2 -end-16 bg-white rounded-2xl shadow-lg p-3 animate-pulse-soft" style={{ animationDelay: "0.5s" }}>
                  <div className="text-3xl">💧</div>
                  <p className="text-xs font-bold text-charcoal mt-1">Serum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FREE SHIPPING BAR ===== */}
      <FreeShippingBar />

      {/* ===== TRUST BADGES ===== */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl hover:bg-beige-light transition-colors group"
              >
                <div className="w-14 h-14 rounded-full bg-pink/10 flex items-center justify-center mx-auto mb-3 text-pink group-hover:bg-pink group-hover:text-white transition-colors">
                  {badge.icon}
                </div>
                <h3 className="font-bold text-charcoal mb-1">
                  {locale === "ar" ? badge.title_ar : badge.title_en}
                </h3>
                <p className="text-sm text-warm-gray">
                  {locale === "ar" ? badge.desc_ar : badge.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <CategoriesSection />

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-charcoal">
                {locale === "ar" ? "منتجات مميزة" : "Featured Products"}
              </h2>
              <p className="text-warm-gray mt-1">
                {locale === "ar"
                  ? "أفضل المنتجات المختارة بعناية"
                  : "Our carefully curated best sellers"}
              </p>
            </div>
            <Link
              href="/products"
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              {locale === "ar" ? "عرض الكل" : "View All"}
              <Arrow size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROUTINE BUILDER (AOV Booster) ===== */}
      <RoutineBuilder />

      {/* ===== NEW ARRIVALS ===== */}
      <section className="py-16 bg-beige-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-charcoal">
                {locale === "ar" ? "وصل حديثاً" : "New Arrivals"}
              </h2>
              <p className="text-warm-gray mt-1">
                {locale === "ar"
                  ? "أحدث المنتجات في متجرنا"
                  : "The latest additions to our collection"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {demoProducts
              .filter((p) => p.is_new)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <ReviewsSection />

      {/* ===== CTA BANNER ===== */}
      <section className="py-16 bg-gradient-to-r from-charcoal to-charcoal/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {locale === "ar"
              ? "جاهز لبشرة مشرقة؟"
              : "Ready for Radiant Skin?"}
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            {locale === "ar"
              ? "اكتشف مجموعتنا الكاملة من منتجات العناية الكورية بالبشرة واحصل على شحن مجاني للطلبات فوق ٩٩٩ ج.م"
              : "Discover our full collection of Korean skincare products and enjoy free shipping on orders over 999 EGP"}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-pink text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-pink-dark transition-all hover:scale-105"
          >
            {locale === "ar" ? "تسوق الآن" : "Shop Now"}
            <Arrow size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
