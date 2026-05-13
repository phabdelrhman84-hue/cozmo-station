"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import ProductCard from "@/components/store/ProductCard";
import RoutineBuilder from "@/components/store/RoutineBuilder";
import ReviewsSection from "@/components/store/ReviewsSection";
import FreeShippingBar from "@/components/store/FreeShippingBar";
import CategoriesSection from "@/components/store/CategoriesSection";
import HeroBanner from "@/components/store/HeroBanner";
import { demoProducts } from "@/lib/data";
import { getShopifyProducts } from "@/lib/shopify";
import { useState, useEffect } from "react";
import {
  Truck,
  Shield,
  Star,
  ArrowLeft,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function HomePage() {
  const { locale, t } = useLanguage();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const [themeSections, setThemeSections] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>(demoProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [noShopifyProducts, setNoShopifyProducts] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      // ── Products: Shopify → demoProducts fallback ──────────────────
      try {
        const shopifyProducts = await getShopifyProducts(12);
        console.log("Shopify Data:", shopifyProducts);
        if (!shopifyProducts || shopifyProducts.length === 0) {
          setNoShopifyProducts(true);
        } else {
          setProducts(shopifyProducts);
          setNoShopifyProducts(false);
        }
      } catch (err) {
        console.log("Shopify fetch error:", err);
        setNoShopifyProducts(true);
      }
      // If Shopify returned nothing, demoProducts (initial state) remain

      setIsLoading(false);
    }
    fetchData();
  }, []);

  const featuredProducts = products.filter((p) => p.is_featured);
  const newArrivals = products.filter((p) => p.is_new);

  const getSection = (type: string) => themeSections.find(s => s.type === type);
  const heroSection = getSection('hero');
  const featuredSection = getSection('featured_products');
  const bannerSection = getSection('banner');
  const categoriesSection = getSection('categories');



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
      {/* ===== HERO BANNER ===== */}
      {(!heroSection || heroSection.is_visible) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <HeroBanner />
        </div>
      )}

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
      {(!categoriesSection || categoriesSection.is_visible) && <CategoriesSection />}

      {/* ===== BANNER ===== */}
      {bannerSection && bannerSection.is_visible && (
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={bannerSection.content.link || "/products"}>
              <div className="bg-gradient-to-r from-[#7C6FFF] to-[#E8A0BF] text-white p-8 md:p-12 rounded-2xl text-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {locale === 'ar' ? bannerSection.content.text_ar : bannerSection.content.text_en}
                </h3>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ===== FEATURED PRODUCTS ===== */}
      {(!featuredSection || featuredSection.is_visible) && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-charcoal">
                  {featuredSection ? (locale === 'ar' ? featuredSection.content.title_ar : featuredSection.content.title_en) : (locale === "ar" ? "منتجات مميزة" : "Featured Products")}
                </h2>
                <p className="text-warm-gray mt-1">
                  {locale === "ar" ? "أفضل المنتجات المختارة بعناية" : "Our carefully curated best sellers"}
                </p>
              </div>
              <Link href="/products" className="btn-secondary flex items-center gap-2 text-sm">
                {locale === "ar" ? "عرض الكل" : "View All"}
                <Arrow size={16} />
              </Link>
            </div>
            {noShopifyProducts && featuredProducts.length === 0 ? (
              <div className="col-span-full bg-amber-50 border border-amber-300 rounded-2xl p-8 text-center">
                <p className="text-lg text-amber-800 font-semibold" dir="rtl">
                  لم يتم جلب المنتجات من شوبيفاي بعد. يرجى مراجعة إعدادات الـ Sales Channel.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-2xl bg-beige-dark/40 animate-pulse aspect-[4/5]" />
                  ))
                  : featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            )}
          </div>
        </section>
      )}

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
                {locale === "ar" ? "أحدث المنتجات في متجرنا" : "The latest additions to our collection"}
              </p>
            </div>
          </div>
          {noShopifyProducts && newArrivals.length === 0 ? (
            <div className="col-span-full bg-amber-50 border border-amber-300 rounded-2xl p-8 text-center">
              <p className="text-lg text-amber-800 font-semibold" dir="rtl">
                لم يتم جلب المنتجات من شوبيفاي بعد. يرجى مراجعة إعدادات الـ Sales Channel.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-beige-dark/40 animate-pulse aspect-[4/5]" />
                ))
                : newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          )}
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
