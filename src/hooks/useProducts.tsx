"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import type { Product } from "@/types";
import { getShopifyProducts } from "@/lib/shopify";
import { demoProducts } from "@/lib/data";

/**
 * مصدر واحد لمنتجات المتجر — fetch مرة واحدة ويتشارك بين كل الصفحات
 * (الهوم / المنتجات / صفحة المنتج / RoutineBuilder / Cart Drawer).
 * بيقلّل النداءات المكررة على Storefront API ويسرّع التنقّل.
 */

interface ProductsContextValue {
  products: Product[];
  loading: boolean;
  /** true لو Shopify رجّع فاضي (بنستخدم demoProducts وقتها) */
  usingFallback: boolean;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

// كاش على مستوى الموديول — يعيش طول عمر الـ tab، يمنع إعادة الجلب عند إعادة التركيب
let cache: Product[] | null = null;
let cacheFallback = false;
let inflight: Promise<void> | null = null;

export function ProductsProvider({
  children,
  limit = 100,
}: {
  children: React.ReactNode;
  limit?: number;
}) {
  const [products, setProducts] = useState<Product[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);
  const [usingFallback, setUsingFallback] = useState(cacheFallback);

  useEffect(() => {
    if (cache !== null) return;

    if (!inflight) {
      inflight = (async () => {
        try {
          const data = await getShopifyProducts(limit);
          if (data && data.length > 0) {
            cache = data;
            cacheFallback = false;
          } else {
            cache = demoProducts as Product[];
            cacheFallback = true;
          }
        } catch (err) {
          console.error("[useProducts] fetch error:", err);
          cache = demoProducts as Product[];
          cacheFallback = true;
        }
      })();
    }

    let active = true;
    inflight.then(() => {
      if (!active) return;
      setProducts(cache ?? []);
      setUsingFallback(cacheFallback);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [limit]);

  const value = useMemo(
    () => ({ products, loading, usingFallback }),
    [products, loading, usingFallback]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextValue {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return ctx;
}
