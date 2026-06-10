"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import ProductCard from "@/components/store/ProductCard";
import { getDiscountPercentage } from "@/lib/utils";
import { getProduct, getShopifyProducts } from "@/lib/shopify";
import {
  ShoppingBag,
  Check,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = decodeURIComponent(params.slug as string);
  const { locale, t } = useLanguage();
  const { addItem } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "usage" | "advice">(
    "description"
  );
  const [added, setAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      // ── 1. Try Shopify first ────────────────────────────────────
      try {
        const shopifyProduct = await getProduct(slug);
        console.log("Shopify Product Data:", shopifyProduct);

        if (shopifyProduct) {
          setProduct(shopifyProduct);

          // Fetch related products from Shopify (same category, exclude current)
          try {
            const allShopify = await getShopifyProducts(12);
            const related = allShopify
              .filter(
                (p) =>
                  p.category === shopifyProduct.category &&
                  p.id !== shopifyProduct.id
              )
              .slice(0, 4);
            if (related.length > 0) setRelatedProducts(related);
          } catch {
            // Related products fetch failed — non-critical
          }

          setLoading(false);
          return; // ✅ Got product from Shopify
        }
      } catch (err) {
        console.log("Shopify product fetch error:", err);
      }

      // Shopify returned nothing — end loading
      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-light">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-pink border-t-transparent rounded-full animate-spin"></div>
          <p className="text-warm-gray font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <h1 className="text-2xl font-bold text-charcoal mb-2">
            {locale === "ar" ? "المنتج غير موجود" : "Product Not Found"}
          </h1>
          <Link href="/products" className="btn-primary mt-4 inline-block">
            {locale === "ar" ? "تصفح المنتجات" : "Browse Products"}
          </Link>
        </div>
      </div>
    );
  }

  const name = locale === "ar" ? product.name_ar : product.name_en;
  const description = product.descriptionHtml || product.description || "لا يوجد وصف بعد";
  const discount = product.compare_price_egp
    ? getDiscountPercentage(product.price_egp, product.compare_price_egp)
    : 0;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const Back = locale === "ar" ? ChevronRight : ChevronLeft;

  return (
    <div className="min-h-screen bg-beige-light">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-beige-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-warm-gray">
            <Link href="/" className="hover:text-pink-dark transition-colors">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-pink-dark transition-colors"
            >
              {t("nav.products")}
            </Link>
            <span>/</span>
            <span className="text-charcoal font-medium truncate max-w-[200px]">
              {name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl bg-white overflow-hidden relative group border border-beige-dark">
              <img 
                src={product.main_image && product.main_image.startsWith("http") ? product.main_image : "/placeholder.png"} 
                alt={name}
                className="w-full h-full object-cover"
              />
              {/* Badges */}
              {discount > 0 && (
                <span className="absolute top-4 start-4 px-3 py-1.5 bg-error text-white text-sm font-bold rounded-full">
                  -{discount}%
                </span>
              )}
              {product.is_new && (
                <span className="absolute top-4 end-4 px-3 py-1.5 bg-sage text-white text-sm font-bold rounded-full">
                  {t("products.new")}
                </span>
              )}
            </div>
            {/* Thumbnail gallery — show additional images from Shopify */}
            {product.images && product.images.filter((img: string) => img.startsWith("http")).length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.filter((img: string) => img.startsWith("http")).slice(0, 5).map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() =>
                      setProduct((prev: any) => ({
                        ...prev,
                        main_image: img,
                      }))
                    }
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      product.main_image === img
                        ? "border-pink shadow-md"
                        : "border-beige-dark hover:border-pink/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="animate-fade-in">
            <p className="text-sm text-warm-gray uppercase tracking-wider mb-2">
              {product.brand}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4 leading-snug">
              {name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-extrabold text-pink-dark">
                {product.price_egp.toLocaleString()}{" "}
                <span className="text-lg font-medium">
                  {locale === "ar" ? "ج.م" : "EGP"}
                </span>
              </span>
              {product.compare_price_egp && (
                <span className="text-lg text-warm-gray line-through">
                  {product.compare_price_egp.toLocaleString()}{" "}
                  {locale === "ar" ? "ج.م" : "EGP"}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2 py-0.5 bg-error/10 text-error text-sm font-bold rounded-full">
                  {locale === "ar" ? `وفر ${discount}%` : `Save ${discount}%`}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {isOutOfStock ? (
                <span className="text-error font-medium">
                  {t("products.out_of_stock")}
                </span>
              ) : product.stock <= product.low_stock_threshold ? (
                <span className="text-warning font-medium">
                  {locale === "ar"
                    ? `متبقي ${product.stock} فقط!`
                    : `Only ${product.stock} left!`}
                </span>
              ) : (
                <span className="text-sage font-medium">
                  {locale === "ar" ? "متوفر" : "In Stock"}
                </span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center bg-white rounded-full border border-beige-dark">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-beige rounded-full transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-10 text-center font-bold text-charcoal">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center hover:bg-beige rounded-full transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-lg transition-all ${
                  added
                    ? "bg-sage text-white"
                    : isOutOfStock
                    ? "bg-warm-gray-light text-white cursor-not-allowed"
                    : "bg-pink text-white hover:bg-pink-dark hover:shadow-lg hover:shadow-pink/30"
                }`}
              >
                {added ? (
                  <>
                    <Check size={20} />
                    {t("products.added")}
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    {t("products.add_to_cart")}
                  </>
                )}
              </button>
            </div>

            {/* Trust Icons */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                {
                  icon: <Truck size={20} />,
                  label_ar: "توصيل سريع",
                  label_en: "Fast Delivery",
                },
                {
                  icon: <Shield size={20} />,
                  label_ar: "أصلي ١٠٠٪",
                  label_en: "100% Authentic",
                },
                {
                  icon: <RotateCcw size={20} />,
                  label_ar: "إرجاع سهل",
                  label_en: "Easy Returns",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="text-center p-3 rounded-xl bg-beige-light"
                >
                  <div className="text-sage mx-auto flex justify-center mb-1">
                    {item.icon}
                  </div>
                  <p className="text-xs font-medium text-charcoal">
                    {locale === "ar" ? item.label_ar : item.label_en}
                  </p>
                </div>
              ))}
            </div>

            {/* Tabs: Description / Ingredients / Usage / Advice */}
            <div className="border-t border-beige-dark pt-6">
              <div className="flex gap-4 mb-4 border-b border-beige-dark overflow-x-auto whitespace-nowrap scrollbar-none">
                {[
                  { id: "description", label_ar: "الوصف", label_en: "Description" },
                  { id: "ingredients", label_ar: "المكونات", label_en: "Ingredients" },
                  { id: "usage", label_ar: "طريقة الاستخدام", label_en: "How to Use" },
                  { id: "advice", label_ar: "نصيحة كوزمو ستيشن", label_en: "Cozmo Advice" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-2 font-semibold transition-colors border-b-2 -mb-[2px] ${
                      activeTab === tab.id
                        ? "text-pink-dark border-pink"
                        : "text-warm-gray border-transparent hover:text-charcoal"
                    }`}
                  >
                    {locale === "ar" ? tab.label_ar : tab.label_en}
                  </button>
                ))}
              </div>
              <div className="text-warm-gray leading-relaxed">
                {activeTab === "description" && (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                )}
                {activeTab === "ingredients" && (
                  <div dangerouslySetInnerHTML={{ 
                    __html: product.ingredients || product.ingredients_ar || product.ingredients_en || (locale === "ar" ? "لا توجد مكونات مدرجة." : "No ingredients listed.") 
                  }} />
                )}
                {activeTab === "usage" && (
                  <div dangerouslySetInnerHTML={{ 
                    __html: product.usage || (locale === "ar" ? "لا توجد طريقة استخدام مدرجة." : "No usage instructions listed.") 
                  }} />
                )}
                {activeTab === "advice" && (
                  <div dangerouslySetInnerHTML={{ 
                    __html: product.advice || (locale === "ar" ? "لا توجد نصائح مدرجة." : "No advice listed.") 
                  }} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              {t("products.related")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
