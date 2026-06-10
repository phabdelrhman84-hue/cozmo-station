/**
 * src/lib/shopify.ts
 * ==================
 * طبقة الربط بـ Shopify Storefront API (2024-01)
 *
 * المعمارية:
 *   - shopifyFetch()        → الـ fetcher الأساسي مع كاش Next.js
 *   - getProducts()         → قائمة المنتجات (للصفحة الرئيسية + /products)
 *   - getProductByHandle()  → منتج واحد بالـ handle (لصفحة /product/[slug])
 *   - getCollectionProducts() → منتجات collection بعينها (للـ collections لاحقاً)
 *   - normalizeProduct()    → تحويل بيانات Shopify → Product type المحلي
 *
 * ملاحظة: Supabase يبقى للـ orders/customers/admin.
 * هذا الملف للـ storefront (products) فقط.
 */

import type { Product } from "@/types";

// ───────────────────────────────────────────────────────────
// 0. ENV VALIDATION
// ───────────────────────────────────────────────────────────

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// تحذير في وضع التطوير إذا لم تُضبط متغيرات البيئة
if (process.env.NODE_ENV === "development") {
  if (!domain) console.warn("[Shopify] NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set");
  if (!storefrontAccessToken)
    console.warn("[Shopify] NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set");
}

// ───────────────────────────────────────────────────────────
// 1. SHOPIFY RAW TYPES (بيانات كما تأتي من GraphQL)
// ───────────────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyMoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyMoneyV2;
  compareAtPrice: ShopifyMoneyV2 | null;
  availableForSale: boolean;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
    maxVariantPrice: ShopifyMoneyV2;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoneyV2;
  };
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
  metafields: ({ key: string; value: string } | null)[];
}

// ───────────────────────────────────────────────────────────
// 2. BASE FETCHER
// ───────────────────────────────────────────────────────────

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  /** تعديل استراتيجية الكاش — الافتراضي 60 ثانية */
  revalidate?: number | false;
  /** تعطيل الـ fallback للـ demoProducts */
  throwOnError?: boolean;
}

export async function shopifyFetch<T = unknown>({
  query,
  variables,
  revalidate = 60,
  throwOnError = false,
}: ShopifyFetchOptions): Promise<{ status: number; body: T } | null> {
  // إذا لم تُضبط المتغيرات، نعود بـ null بدلاً من إلقاء خطأ (Graceful degradation)
  if (!domain || !storefrontAccessToken) {
    if (throwOnError) throw new Error("[Shopify] Store domain or access token not configured.");
    return null;
  }

  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: revalidate === false ? { revalidate: 0 } : { revalidate },
    });

    const body = (await result.json()) as { data?: T; errors?: { message: string }[] };

    if (body.errors?.length) {
      console.error("[Shopify] GraphQL error:", body.errors[0].message);
      if (throwOnError) throw new Error(body.errors[0].message);
      return null;
    }

    return { status: result.status, body: body.data as T };
  } catch (error) {
    console.error("[Shopify] Fetch error:", error);
    if (throwOnError) throw error;
    return null;
  }
}

// ───────────────────────────────────────────────────────────
// 3. NORMALIZER → يحوّل ShopifyProduct إلى Product المحلي
//    مع دعم metafields للاسم والوصف العربي
// ───────────────────────────────────────────────────────────

/**
 * نظام Metafields المتوقع في Shopify:
 *   - namespace: "cozmo"  key: "name_ar"        → الاسم بالعربية
 *   - namespace: "cozmo"  key: "description_ar"  → الوصف بالعربية
 *   - namespace: "cozmo"  key: "ingredients_ar"  → المكونات بالعربية
 *   - namespace: "cozmo"  key: "ingredients_en"  → المكونات بالإنجليزية
 */
function getMetafield(
  metafields: ShopifyProduct["metafields"],
  key: string
): string | null {
  const field = metafields.find((m) => m?.key === key);
  return field?.value ?? null;
}

export function normalizeProduct(shopifyProduct: ShopifyProduct): Product {
  const firstVariant = shopifyProduct.variants.edges[0]?.node;
  const firstImage = shopifyProduct.images.edges[0]?.node;
  const allImages = shopifyProduct.images.edges.map((e) => e.node.url);

  const priceEGP = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
  const compareAtPriceRaw =
    shopifyProduct.compareAtPriceRange.minVariantPrice.amount;
  const compareAtPriceEGP =
    compareAtPriceRaw && parseFloat(compareAtPriceRaw) > priceEGP
      ? parseFloat(compareAtPriceRaw)
      : null;

  // المخزون — نعتمد على availableForSale بدلاً من quantityAvailable
  // (لا نملك scope: unauthenticated_read_product_inventory)
  const inStock = firstVariant?.availableForSale ?? false;
  const stock = inStock ? 99 : 0; // قيمة افتراضية — المخزون الفعلي غير متاح من Storefront API

  return {
    // المعرّف: نستخدم الجزء الأخير من Shopify GID
    id: parseInt(shopifyProduct.id.replace("gid://shopify/Product/", ""), 10),

    // الأسماء: metafield للعربية، title لـ EN
    name_ar: getMetafield(shopifyProduct.metafields, "name_ar") ?? shopifyProduct.title,
    name_en: shopifyProduct.title,

    // الأسعار
    price_egp: priceEGP,
    compare_price_egp: compareAtPriceEGP,

    // الوصف والمكونات
    description_ar: getMetafield(shopifyProduct.metafields, "description_ar") || shopifyProduct.descriptionHtml,
    description_en: shopifyProduct.descriptionHtml,
    descriptionHtml: shopifyProduct.descriptionHtml,
    description: shopifyProduct.description,
    ingredients_ar: getMetafield(shopifyProduct.metafields, "ingredients_ar"),
    ingredients_en: getMetafield(shopifyProduct.metafields, "ingredients_en"),

    // التصنيف والبراند
    category: shopifyProduct.productType || "Skincare",
    brand: shopifyProduct.vendor,

    // المخزون
    stock,
    low_stock_threshold: 5,

    // SKU وغيرها
    sku: firstVariant?.id ?? shopifyProduct.handle,
    weight_kg: null,

    // الصور
    images: allImages,
    main_image: firstImage?.url ?? "",

    // الـ Slug (handle في Shopify)
    slug: shopifyProduct.handle,

    // SEO Metafields
    meta_title_ar: null,
    meta_title_en: null,
    meta_description_ar: null,
    meta_description_en: null,

    // الحالة — متاح للبيع
    is_active: firstVariant?.availableForSale ?? false,
    is_new: shopifyProduct.tags.includes("new") || shopifyProduct.tags.includes("new-arrival"),
    is_featured: shopifyProduct.tags.includes("featured") || shopifyProduct.tags.includes("best-seller"),

    created_at: new Date().toISOString(),
  };
}

// ───────────────────────────────────────────────────────────
// 4. PRODUCT QUERIES
// ───────────────────────────────────────────────────────────

// Fragment مشترك — يُحدَّث من مكان واحد
const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    vendor
    productType
    tags
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    images(first: 5) {
      edges { node { url altText } }
    }
    variants(first: 1) {
      edges {
        node {
          id
          title
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          availableForSale
        }
      }
    }
    metafields(identifiers: [
      { namespace: "cozmo", key: "name_ar" }
      { namespace: "cozmo", key: "description_ar" }
      { namespace: "cozmo", key: "ingredients_ar" }
      { namespace: "cozmo", key: "ingredients_en" }
    ]) {
      key
      value
    }
  }
`;

// ── 4a. قائمة المنتجات ──────────────────────────────────────

type GetProductsData = {
  products: { edges: { node: ShopifyProduct }[] };
};

export async function getShopifyProducts(limit = 12): Promise<Product[]> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first, sortKey: CREATED_AT, reverse: true) {
        edges { node { ...ProductFields } }
      }
    }
  `;

  const response = await shopifyFetch<GetProductsData>({
    query,
    variables: { first: limit },
  });

  if (!response) return []; // Graceful degradation → الـ caller يرجع للـ demoProducts

  return response.body.products.edges.map((edge) =>
    normalizeProduct(edge.node)
  );
}

// ── 4b. منتج واحد بالـ handle ────────────────────────────────

type GetProductByHandleData = {
  productByHandle: ShopifyProduct | null;
};

export async function getShopifyProductByHandle(
  handle: string
): Promise<Product | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductFields
      }
    }
  `;

  const response = await shopifyFetch<GetProductByHandleData>({
    query,
    variables: { handle },
    revalidate: 60,
  });

  if (!response?.body.productByHandle) return null;

  return normalizeProduct(response.body.productByHandle);
}

// ── 4b-alias. اسم مختصر للاستيراد السهل ──────────────────────
export const getProduct = getShopifyProductByHandle;

// ── 4c. منتجات collection بعينها ─────────────────────────────

type GetCollectionData = {
  collection: {
    products: { edges: { node: ShopifyProduct }[] };
  } | null;
};

export async function getShopifyCollectionProducts(
  handle: string,
  limit = 12
): Promise<Product[]> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first) {
          edges { node { ...ProductFields } }
        }
      }
    }
  `;

  const response = await shopifyFetch<GetCollectionData>({
    query,
    variables: { handle, first: limit },
  });

  if (!response?.body.collection) return [];

  return response.body.collection.products.edges.map((edge) =>
    normalizeProduct(edge.node)
  );
}
