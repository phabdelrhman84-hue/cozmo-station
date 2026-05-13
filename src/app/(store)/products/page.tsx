"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import ProductCard from "@/components/store/ProductCard";
import { demoProducts } from "@/lib/data";
import { getShopifyProducts } from "@/lib/shopify";
import { Search, SlidersHorizontal, X } from "lucide-react";

function ProductsPageContent() {
  const { locale, t } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const shopifyData = await getShopifyProducts(50);
        if (shopifyData && shopifyData.length > 0) {
          setAllProducts(shopifyData);
        } else {
          setAllProducts(demoProducts);
        }
      } catch (err) {
        console.log("Shopify fetch error:", err);
        setAllProducts(demoProducts);
      }
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  const categories = [
    { id: "all", label: t("products.all") },
    { id: "skincare", label: t("products.skincare") },
    { id: "haircare", label: t("products.haircare") },
  ];

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Helper functions for Shopify & Mock data compatibility
    const getPrice = (p: any) => parseFloat(p.price || p.price_egp || p?.priceRange?.minVariantPrice?.amount || 0);
    const getName = (p: any) => (p.title || p.name_en || p.name || "").toLowerCase();
    const getCategory = (p: any) => (p.productType || p.category || "").toLowerCase();

    // Category filter
    if (category !== "all") {
      products = products.filter((p) => getCategory(p).includes(category.toLowerCase()));
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter((p) => {
        const nameMatch = getName(p).includes(q);
        const brandMatch = (p.vendor || p.brand || "").toLowerCase().includes(q);
        const arMatch = (p.name_ar || "").includes(q);
        return nameMatch || brandMatch || arMatch;
      });
    }

    // Price filter
    products = products.filter((p) => {
      const price = getPrice(p);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case "price_asc":
        products.sort((a, b) => getPrice(a) - getPrice(b));
        break;
      case "price_desc":
        products.sort((a, b) => getPrice(b) - getPrice(a));
        break;
      case "name":
        products.sort((a, b) => getName(a).localeCompare(getName(b)));
        break;
      case "newest":
      default:
        products.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.created_at || 0).getTime();
          const dateB = new Date(b.createdAt || b.created_at || 0).getTime();
          return dateB - dateA;
        });
    }

    return products;
  }, [category, searchQuery, sortBy, priceRange, locale, allProducts]);

  return (
    <div className="min-h-screen bg-beige-light">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-beige to-pink-light/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-charcoal mb-4">
            {t("products.title")}
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-lg">
            <Search
              size={20}
              className="absolute top-1/2 start-4 -translate-y-1/2 text-warm-gray-light"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("nav.search")}
              className="w-full ps-12 pe-10 py-3.5 rounded-full bg-white border border-beige-dark focus:border-pink focus:outline-none transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 end-4 -translate-y-1/2"
              >
                <X size={18} className="text-warm-gray" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${category === cat.id
                    ? "bg-pink text-white shadow-sm"
                    : "bg-white text-charcoal border border-beige-dark hover:border-pink"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${showFilters
                  ? "bg-pink text-white border-pink"
                  : "bg-white text-charcoal border-beige-dark hover:border-pink"
                }`}
            >
              <SlidersHorizontal size={16} />
              {t("products.filter")}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full bg-white border border-beige-dark text-sm text-charcoal focus:border-pink focus:outline-none cursor-pointer"
            >
              <option value="newest">{t("products.sort_newest")}</option>
              <option value="price_asc">
                {t("products.sort_price_asc")}
              </option>
              <option value="price_desc">
                {t("products.sort_price_desc")}
              </option>
              <option value="name">{t("products.sort_name")}</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm animate-scale-in">
            <h3 className="font-bold text-charcoal mb-4">
              {locale === "ar" ? "نطاق السعر (ج.م)" : "Price Range (EGP)"}
            </h3>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-24 px-3 py-2 rounded-lg border border-beige-dark focus:border-pink focus:outline-none text-center"
                min={0}
              />
              <span className="text-warm-gray">—</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-24 px-3 py-2 rounded-lg border border-beige-dark focus:border-pink focus:outline-none text-center"
                min={0}
              />
              <span className="text-warm-gray text-sm">
                {locale === "ar" ? "ج.م" : "EGP"}
              </span>
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-warm-gray mb-4">
          {filteredProducts.length}{" "}
          {locale === "ar" ? "منتج" : "products"}
        </p>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-beige-dark/40 animate-pulse aspect-[4/5]" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-xl font-semibold text-charcoal">
              {t("products.no_products")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-beige-light flex items-center justify-center"><div className="w-8 h-8 border-4 border-pink border-t-transparent rounded-full animate-spin"></div></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}