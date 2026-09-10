"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { Product } from "@/types";

/**
 * قائمة الأمنيات — منتجات محفوظة في localStorage.
 * قلب على كل منتج + صفحة /wishlist + عدّاد في النافبار.
 */

const KEY = "cozmo-wishlist";

interface WishlistValue {
  items: Product[];
  ids: Set<number>;
  has: (id: number) => boolean;
  toggle: (product: Product) => void;
  remove: (id: number) => void;
  count: number;
}

const Ctx = createContext<WishlistValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
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

  const persist = (next: Product[]) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const toggle = useCallback((product: Product) => {
    if (!product?.id) return;
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      const next = exists
        ? prev.filter((p) => p.id !== product.id)
        : [product, ...prev];
      persist(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.id !== id);
      persist(next);
      return next;
    });
  }, []);

  const ids = useMemo(() => new Set(items.map((p) => p.id)), [items]);

  const value = useMemo<WishlistValue>(
    () => ({
      items,
      ids,
      has: (id: number) => ids.has(id),
      toggle,
      remove,
      count: items.length,
    }),
    [items, ids, toggle, remove]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWishlist(): WishlistValue {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return ctx;
}
