"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { getShopifyProducts } from "@/lib/shopify";
import { useCart } from "@/hooks/useCart";

export default function RoutineBuilder() {
  const { locale } = useLanguage();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [shopifyProducts, setShopifyProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [customSelections, setCustomSelections] = useState<Record<number, any>>({});
  const [activeSwapStep, setActiveSwapStep] = useState<number | null>(null);

  const isSkincareProduct = (p: any) => {
    const name = (p.title || p.name_en || "").toLowerCase();
    const cat = (p.productType || p.category || "").toLowerCase();
    const nameAr = (p.name_ar || "").toLowerCase();
    
    const isHair = cat.includes("hair") || name.includes("hair") || nameAr.includes("شعر") || cat.includes("shampoo") || name.includes("shampoo");
    const isBody = cat.includes("body") || name.includes("body") || nameAr.includes("جسم") || nameAr.includes("شاور");
    
    return !isHair && !isBody;
  };

  const isSpecializedTreatment = (p: any) => {
    const name = (p.title || p.name_en || "").toLowerCase();
    const nameAr = (p.name_ar || "").toLowerCase();
    return name.includes("booster") || name.includes("retinal") || name.includes("retinol") || nameAr.includes("تجاعيد") || nameAr.includes("ريتينول") || nameAr.includes("ريتينال") || nameAr.includes("بوستر") || name.includes("anti-wrinkle") || name.includes("anti-aging");
  };

  const isSunscreen = (p: any) => {
    const name = (p.title || p.name_en || "").toLowerCase();
    const cat = (p.productType || p.category || "").toLowerCase();
    const nameAr = (p.name_ar || "").toLowerCase();
    const tags = (p.tags || []).map((t: string) => t.toLowerCase());
    return cat.includes("sun") || cat.includes("spf") || name.includes("sun") || name.includes("spf") || tags.includes("sunscreen") || tags.includes("sunblock") || nameAr.includes("شمس") || nameAr.includes("واقي") || nameAr.includes("بلوك");
  };

  const isSetOrKit = (p: any) => {
    const name = (p.title || p.name_en || "").toLowerCase();
    const nameAr = (p.name_ar || "").toLowerCase();
    return name.includes("kit") || name.includes("set") || name.includes("collection") || name.includes("bundle") || nameAr.includes("مجموعة") || nameAr.includes("بكج") || nameAr.includes("باقة");
  };
  
  interface RoutineStep {
    id: number;
    emoji: string;
    name_ar: string;
    name_en: string;
    product: string;
    price: number;
    rawProduct?: any;
  }

  const steps: RoutineStep[] = [
    {
      id: 1,
      emoji: "🧼",
      name_ar: "تنظيف",
      name_en: "Cleanser",
      product: "COSRX Low pH Good Morning Cleanser",
      price: 145,
    },
    {
      id: 2,
      emoji: "💦",
      name_ar: "تونر",
      name_en: "Toner",
      product: "PYUNKANG YUL Essence Toner",
      price: 178,
    },
    {
      id: 3,
      emoji: "💊",
      name_ar: "سيروم",
      name_en: "Serum",
      product: "COSRX Snail 96 Mucin Essence",
      price: 228,
    },
    {
      id: 4,
      emoji: "🌸",
      name_ar: "مرطب",
      name_en: "Moisturizer",
      product: "Laneige Water Bank Moisture Cream",
      price: 295,
    },
    {
      id: 5,
      emoji: "☀️",
      name_ar: "واقي شمس",
      name_en: "Sunscreen",
      product: "Beauty of Joseon Relief Sun SPF50+",
      price: 272,
    },
  ];

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getShopifyProducts(100);
        if (data && data.length > 0) {
          setShopifyProducts(data);
        }
      } catch (err) {
        console.error("RoutineBuilder product load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const getProductForStep = (stepId: number) => {
    const defaultStep = steps.find(s => s.id === stepId)!;

    if (customSelections[stepId]) {
      const selectedProd = customSelections[stepId];
      return {
        ...defaultStep,
        product: locale === "ar" ? (selectedProd.name_ar || selectedProd.title) : selectedProd.title,
        price: selectedProd.price_egp || selectedProd.price,
        rawProduct: selectedProd
      };
    }

    if (shopifyProducts.length === 0) return defaultStep;

    let matchedProduct: any = null;

    if (stepId === 1) { // Cleanser
      matchedProduct = shopifyProducts.find(p => {
        if (!isSkincareProduct(p) || isSetOrKit(p) || isSunscreen(p)) return false;
        const name = (p.title || p.name_en || "").toLowerCase();
        const cat = (p.productType || p.category || "").toLowerCase();
        const tags = (p.tags || []).map((t: string) => t.toLowerCase());
        return cat.includes("cleanser") || cat.includes("cleanse") || name.includes("cleanser") || name.includes("cleanse") || tags.includes("cleanser") || tags.includes("cleaner");
      });
    } else if (stepId === 2) { // Toner
      matchedProduct = shopifyProducts.find(p => {
        if (!isSkincareProduct(p) || isSetOrKit(p) || isSunscreen(p)) return false;
        const name = (p.title || p.name_en || "").toLowerCase();
        const cat = (p.productType || p.category || "").toLowerCase();
        const tags = (p.tags || []).map((t: string) => t.toLowerCase());
        return cat.includes("toner") || name.includes("toner") || tags.includes("toner");
      });
    } else if (stepId === 3) { // Serum
      matchedProduct = shopifyProducts.find(p => {
        if (!isSkincareProduct(p) || isSetOrKit(p) || isSunscreen(p)) return false;
        const name = (p.title || p.name_en || "").toLowerCase();
        const cat = (p.productType || p.category || "").toLowerCase();
        const tags = (p.tags || []).map((t: string) => t.toLowerCase());
        return cat.includes("serum") || cat.includes("ampoule") || cat.includes("essence") || name.includes("serum") || name.includes("ampoule") || name.includes("essence") || tags.includes("serum") || tags.includes("essence");
      });
    } else if (stepId === 4) { // Moisturizer
      matchedProduct = shopifyProducts.find(p => {
        if (!isSkincareProduct(p) || isSetOrKit(p) || isSunscreen(p) || isSpecializedTreatment(p)) return false;
        const name = (p.title || p.name_en || "").toLowerCase();
        const cat = (p.productType || p.category || "").toLowerCase();
        const tags = (p.tags || []).map((t: string) => t.toLowerCase());
        return cat.includes("cream") || cat.includes("moistur") || name.includes("cream") || name.includes("moistur") || tags.includes("cream") || tags.includes("moisturizer") || cat.includes("lotion") || name.includes("lotion");
      });
    } else if (stepId === 5) { // Sunscreen
      matchedProduct = shopifyProducts.find(p => {
        if (!isSkincareProduct(p) || isSetOrKit(p) || !isSunscreen(p)) return false;
        const name = (p.title || p.name_en || "").toLowerCase();
        const cat = (p.productType || p.category || "").toLowerCase();
        const tags = (p.tags || []).map((t: string) => t.toLowerCase());
        return cat.includes("sun") || cat.includes("spf") || name.includes("sun") || name.includes("spf") || tags.includes("sunscreen") || tags.includes("sunblock");
      });
    }

    if (matchedProduct) {
      return {
        ...defaultStep,
        product: locale === "ar" ? (matchedProduct.name_ar || matchedProduct.title) : matchedProduct.title,
        price: matchedProduct.price_egp || matchedProduct.price,
        rawProduct: matchedProduct
      };
    }

    return defaultStep;
  };

  const dynamicSteps = steps.map(step => getProductForStep(step.id));

  const getAvailableProductsForStep = (stepId: number) => {
    if (shopifyProducts.length === 0) return [];

    return shopifyProducts.filter(p => {
      if (!isSkincareProduct(p) || isSetOrKit(p)) return false;

      const name = (p.title || p.name_en || "").toLowerCase();
      const cat = (p.productType || p.category || "").toLowerCase();
      const tags = (p.tags || []).map((t: string) => t.toLowerCase());

      if (stepId === 1) { // Cleanser
        if (isSunscreen(p)) return false;
        return cat.includes("cleanser") || cat.includes("cleanse") || name.includes("cleanser") || name.includes("cleanse") || tags.includes("cleanser") || tags.includes("cleaner") || name.includes("foam") || name.includes("soap");
      }
      if (stepId === 2) { // Toner
        if (isSunscreen(p)) return false;
        return cat.includes("toner") || name.includes("toner") || tags.includes("toner") || name.includes("essence toner");
      }
      if (stepId === 3) { // Serum
        if (isSunscreen(p)) return false;
        return cat.includes("serum") || cat.includes("ampoule") || cat.includes("essence") || name.includes("serum") || name.includes("ampoule") || name.includes("essence") || tags.includes("serum") || tags.includes("essence");
      }
      if (stepId === 4) { // Moisturizer
        if (isSunscreen(p) || isSpecializedTreatment(p)) return false;
        return cat.includes("cream") || cat.includes("moistur") || name.includes("cream") || name.includes("moistur") || tags.includes("cream") || tags.includes("moisturizer") || cat.includes("lotion") || name.includes("lotion");
      }
      if (stepId === 5) { // Sunscreen
        return isSunscreen(p);
      }
      return false;
    });
  };

  const [selectedSteps, setSelectedSteps] = useState<number[]>([1, 2, 3]);

  const toggleStep = (id: number) => {
    setSelectedSteps((prev) =>
      prev.includes(id) ? prev.filter((stepId) => stepId !== id) : [...prev, id]
    );
  };

  const total = dynamicSteps
    .filter((step) => selectedSteps.includes(step.id))
    .reduce((sum, step) => sum + step.price, 0);

  const discounted = Math.round(total * 0.75);
  const savings = total - discounted;

  const handleAddRoutineToCart = () => {
    dynamicSteps
      .filter((step) => selectedSteps.includes(step.id))
      .forEach((step) => {
        if (step.rawProduct) {
          addItem(step.rawProduct, 1);
        } else {
          addItem({
            id: step.id * 100000,
            name_ar: step.name_ar,
            name_en: step.name_en,
            price_egp: step.price,
            stock: 99,
            main_image: "/placeholder.png",
            images: ["/placeholder.png"],
            slug: "mock-product-" + step.id,
          } as any, 1);
        }
      });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="bg-charcoal text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block text-pink font-bold tracking-widest uppercase text-sm mb-3">
            {locale === "ar" ? "🌙 وفري مع الباقات" : "🌙 Save with Bundles"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {locale === "ar" ? (
              <>ابني روتينك الكامل و<em className="text-pink not-italic">وفري 25%</em></>
            ) : (
              <>Build your routine & <em className="text-pink not-italic">Save 25%</em></>
            )}
          </h2>
          <p className="text-white/60">
            {locale === "ar"
              ? "اختاري المنتجات اللي تناسب بشرتك وهنجيبهالك مع بعض بخصم خاص"
              : "Choose the products that fit your skin and get them together with a special discount"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {dynamicSteps.map((step) => {
            const isSelected = selectedSteps.includes(step.id);
            return (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`relative bg-white/5 border rounded-2xl p-5 text-center transition-all cursor-pointer hover:-translate-y-1 overflow-hidden min-h-[240px] flex flex-col justify-between group ${
                  isSelected
                    ? "bg-pink/10 border-pink/50 shadow-[0_0_15px_rgba(242,196,206,0.2)]"
                    : "border-white/10 hover:bg-white/10"
                }`}
              >
                {/* Background Image with Overlay */}
                {step.rawProduct?.main_image && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-110"
                      style={{ backgroundImage: `url(${step.rawProduct.main_image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90 transition-opacity duration-300" />
                  </>
                )}

                {/* Step ID Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-20">
                  {step.id}
                </div>

                {/* Content wrapper with relative positioning so it sits on top of background */}
                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  <div className="mt-1">
                    <span className="text-3xl block mb-2">{step.emoji}</span>
                    <div className="text-sm font-semibold mb-1 text-pink-light">
                      {locale === "ar" ? step.name_ar : step.name_en}
                    </div>
                  </div>

                  <div className="text-xs text-white/80 leading-relaxed my-2 min-h-[4.5rem] flex items-center justify-center px-1 overflow-hidden text-ellipsis line-clamp-3">
                    {step.product}
                  </div>

                  {shopifyProducts.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSwapStep(step.id);
                      }}
                      className="text-[10px] text-pink border border-pink/30 hover:border-pink hover:bg-pink/10 transition-all px-3 py-1 rounded-full mx-auto mb-2 flex items-center gap-1 z-30"
                    >
                      <span>🔄</span>
                      <span>{locale === "ar" ? "تغيير المنتج" : "Change"}</span>
                    </button>
                  )}

                  <div className="text-pink font-bold text-sm">
                    {step.price} {locale === "ar" ? "ج.م" : "EGP"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-sage font-semibold text-sm mb-1">
              ✅ {locale === "ar" ? `أنتِ وفرتِ ${savings} ج.م مع الباقة` : `You saved ${savings} EGP with the bundle`}
            </div>
            <div className="text-sm text-white/50">
              {selectedSteps.length} {locale === "ar" ? "منتجات مختارة" : "selected products"}
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-sm text-white/50 line-through">
              {total} {locale === "ar" ? "ج.م" : "EGP"}
            </div>
            <div className="text-4xl font-serif text-white">
              {discounted} {locale === "ar" ? "ج.م" : "EGP"}
            </div>
            <div className="text-xs text-white/50 mt-1">
              {locale === "ar" ? "مع خصم الباقة" : "with bundle discount"}
            </div>
          </div>
          <button 
            onClick={handleAddRoutineToCart}
            className={`font-bold px-8 py-4 rounded-full w-full md:w-auto transition-colors ${
              added 
                ? "bg-sage text-white" 
                : "bg-pink text-charcoal hover:bg-pink-light"
            }`}
          >
            {added 
              ? (locale === "ar" ? "تمت إضافة الروتين للسلة! ✓" : "Routine Added! ✓")
              : (locale === "ar" ? `أضيفي الروتين للسلة (${selectedSteps.length}) 🛒` : `Add Routine to Cart (${selectedSteps.length}) 🛒`)}
          </button>
        </div>
      </div>

      {/* Swap Product Modal */}
      {activeSwapStep !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-charcoal border border-white/10 rounded-3xl max-w-xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-xl font-bold text-white">
                {locale === "ar" 
                  ? `اختر منتج ${steps.find(s => s.id === activeSwapStep)?.name_ar}` 
                  : `Select ${steps.find(s => s.id === activeSwapStep)?.name_en}`}
              </h3>
              <button 
                onClick={() => setActiveSwapStep(null)}
                className="text-white/60 hover:text-white text-lg font-bold w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                type="button"
              >
                ✕
              </button>
            </div>
            
            {/* List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {getAvailableProductsForStep(activeSwapStep).length > 0 ? (
                getAvailableProductsForStep(activeSwapStep).map((prod) => {
                  const currentSelected = getProductForStep(activeSwapStep);
                  const isCurrent = currentSelected.rawProduct?.id === prod.id;
                  
                  return (
                    <div 
                      key={prod.id}
                      onClick={() => {
                        setCustomSelections(prev => ({
                          ...prev,
                          [activeSwapStep]: prod
                        }));
                        setActiveSwapStep(null);
                      }}
                      className={`flex items-center gap-4 p-3 rounded-2xl border transition-all cursor-pointer ${
                        isCurrent 
                          ? "bg-pink/10 border-pink shadow-md" 
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <img 
                        src={prod.main_image || "/placeholder.png"} 
                        alt={locale === "ar" ? prod.name_ar : prod.name_en} 
                        className="w-16 h-16 rounded-xl object-cover bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-white truncate">
                          {locale === "ar" ? (prod.name_ar || prod.title) : prod.title}
                        </h4>
                        <p className="text-xs text-white/60 mt-1">
                          {prod.brand}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-pink font-bold text-sm block">
                          {prod.price_egp || prod.price} {locale === "ar" ? "ج.م" : "EGP"}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] text-sage font-medium mt-1 inline-block bg-sage/10 px-2 py-0.5 rounded-full">
                            {locale === "ar" ? "محدد" : "Selected"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-white/50">
                  {locale === "ar" ? "لا توجد منتجات متوفرة حالياً في هذا القسم." : "No products available in this category currently."}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
