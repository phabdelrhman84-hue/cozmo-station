"use client";

/**
 * src/lib/analytics.ts
 * ====================
 * طبقة تحليلات موحّدة للـ storefront. أي حدث بيتبعت لكل مزوّد مفعّل:
 *   - GA4              (gtag)      → NEXT_PUBLIC_GA_ID          (G-XXXXXXX)
 *   - Meta / FB Pixel  (fbq)       → NEXT_PUBLIC_FB_PIXEL_ID
 *   - Microsoft Clarity(clarity)   → NEXT_PUBLIC_CLARITY_ID
 *   - Shopify Analytics(monorail)  → NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN + shop id
 *
 * الأحداث المغطّاة هنا: page_view / view_item / add_to_cart / begin_checkout.
 * حدث الشراء (purchase) بيحصل على دومين Shopify فبيتسجّل من ناحية Shopify
 * (Customer Events / تطبيقات القنوات الرسمية)، مش من هنا.
 */

import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  type ShopifyPageViewPayload,
} from "@shopify/hydrogen-react";
import type { CartItem, Product } from "@/types";

// ── إعداد ──────────────────────────────────────────────────
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_SHOP_ID =
  process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID || "gid://shopify/Shop/95458918763";
const CURRENCY = "EGP";

/** الدومينات اللي GA4 يربط الجلسة عبرها (الموقع ↔ checkout شوبيفاي) */
export const CROSS_DOMAINS = [
  "cozmostation.com",
  "www.cozmostation.com",
  "checkout.cozmostation.com",
  "tvnmne-ci.myshopify.com",
];

export const providers = {
  ga4: !!GA_ID,
  meta: !!FB_PIXEL_ID,
  clarity: !!CLARITY_ID,
  shopify: !!SHOPIFY_DOMAIN,
};

/**
 * موافقة التتبّع. حالياً مفعّلة دايماً؛ لو اتضافت لافتة كوكيز لاحقاً
 * اربط الدالة دي بحالتها من مكان واحد.
 */
export function hasTrackingConsent(): boolean {
  return true;
}

/** نطاق كوكيز Shopify — عشان الـ checkout يقرأها ويربط الـ attribution */
export function analyticsCookieDomain(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const host = window.location.hostname;
  const registrable = host.match(/(?:^|\.)([^.]+\.[^.]+)$/)?.[1];
  if (registrable === "cozmostation.com") return "cozmostation.com";
  return undefined; // بيئات المعاينة → كوكي host-only، التحليلات لسه شغّالة
}

// ── أنواع مساعدة ────────────────────────────────────────────
type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;
type Clarity = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq & { queue?: unknown[]; loaded?: boolean; version?: string };
    _fbq?: unknown;
    clarity?: Clarity;
  }
}

export interface AnalyticsItem {
  id: string;
  variantId?: string;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  quantity: number;
  sku?: string;
}

export function productToItem(p: Product, quantity: number): AnalyticsItem {
  return {
    id: String(p.id),
    variantId: p.sku?.startsWith("gid://") ? p.sku : undefined,
    name: p.name_en,
    brand: p.brand || undefined,
    category: p.category || undefined,
    price: p.price_egp,
    quantity,
    sku: p.sku,
  };
}

// ── محوّلات صيغ المزوّدين ───────────────────────────────────
function ga4Item(i: AnalyticsItem) {
  return {
    item_id: i.sku || i.id,
    item_name: i.name,
    item_brand: i.brand,
    item_category: i.category,
    price: i.price,
    quantity: i.quantity,
  };
}

function metaContent(i: AnalyticsItem) {
  return { id: i.sku || i.id, quantity: i.quantity, item_price: i.price };
}

function sum(items: AnalyticsItem[]) {
  return items.reduce((s, i) => s + i.price * i.quantity, 0);
}

// ── Shopify ────────────────────────────────────────────────
function shopifyBrowserBase() {
  return {
    ...getClientBrowserParameters(),
    hasUserConsent: hasTrackingConsent(),
    shopId: SHOPIFY_SHOP_ID,
    currency: CURRENCY,
  };
}

function shopifyPageView() {
  if (!providers.shopify) return;
  sendShopifyAnalytics(
    {
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload: shopifyBrowserBase() as ShopifyPageViewPayload,
    },
    SHOPIFY_DOMAIN
  ).catch((err) => console.error("[analytics] shopify page view:", err));
}

// ── الأحداث العامة ─────────────────────────────────────────
export function trackPageView(url?: string, title?: string): void {
  if (typeof window === "undefined" || !hasTrackingConsent()) return;

  const pageLocation = url || window.location.href;
  const pageTitle = title || document.title;

  if (providers.ga4) {
    window.gtag?.("event", "page_view", {
      page_location: pageLocation,
      page_title: pageTitle,
    });
  }
  if (providers.meta) {
    window.fbq?.("track", "PageView");
  }
  // Clarity بيتتبّع تغيّرات المسار في SPA تلقائياً — مفيش حدث يدوي
  try {
    shopifyPageView();
  } catch (err) {
    console.error("[analytics] shopify page view:", err);
  }
}

export function trackViewItem(item: AnalyticsItem): void {
  if (typeof window === "undefined" || !hasTrackingConsent()) return;

  if (providers.ga4) {
    window.gtag?.("event", "view_item", {
      currency: CURRENCY,
      value: item.price,
      items: [ga4Item(item)],
    });
  }
  if (providers.meta) {
    window.fbq?.("track", "ViewContent", {
      content_ids: [item.sku || item.id],
      content_name: item.name,
      content_type: "product",
      value: item.price,
      currency: CURRENCY,
    });
  }
}

export function trackAddToCart(items: CartItem[]): void {
  if (typeof window === "undefined" || !hasTrackingConsent()) return;

  const list = items.map((i) => productToItem(i.product, i.quantity));
  if (list.length === 0) return;
  const value = sum(list);

  if (providers.ga4) {
    window.gtag?.("event", "add_to_cart", {
      currency: CURRENCY,
      value,
      items: list.map(ga4Item),
    });
  }
  if (providers.meta) {
    window.fbq?.("track", "AddToCart", {
      content_ids: list.map((i) => i.sku || i.id),
      contents: list.map(metaContent),
      content_type: "product",
      value,
      currency: CURRENCY,
    });
  }
}

export function trackBeginCheckout(items: CartItem[]): void {
  if (typeof window === "undefined" || !hasTrackingConsent()) return;

  const list = items.map((i) => productToItem(i.product, i.quantity));
  if (list.length === 0) return;
  const value = sum(list);

  if (providers.ga4) {
    window.gtag?.("event", "begin_checkout", {
      currency: CURRENCY,
      value,
      items: list.map(ga4Item),
    });
  }
  if (providers.meta) {
    window.fbq?.("track", "InitiateCheckout", {
      content_ids: list.map((i) => i.sku || i.id),
      contents: list.map(metaContent),
      content_type: "product",
      num_items: list.reduce((s, i) => s + i.quantity, 0),
      value,
      currency: CURRENCY,
    });
  }
}
