"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { Product } from "@/types";

/**
 * "شاهدتِ مؤخراً" — بيخزّن آخر المنتجات اللي اتفتحت في localStorage
 * ويعرضها في رِيل على الهوم وصفحة المنتج (إعادة جذب + AOV).
 */

const KEY = "cozmo-recently-viewed";
const MAX = 12;

interface RecentlyViewedValue {
  items: Product[];
  add: (product: Product) => void;
}

const Ctx = createContext<RecentlyViewedValue | null>(null);

export function RecentlyViewedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<Product[]>([]);

  // تحميل من localStorage بعد التركيب (نتجنّب hydration mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const add = useCallback((product: Product) => {
    if (!product?.id) return;
    setItems((prev) => {
      const next = [
        product,
        ...prev.filter((p) => p.id !== product.id),
      ].slice(0, MAX);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return <Ctx.Provider value={{ items, add }}>{children}</Ctx.Provider>;
}

export function useRecentlyViewed(): RecentlyViewedValue {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error(
      "useRecentlyViewed must be used within RecentlyViewedProvider"
    );
  }
  return ctx;
}
