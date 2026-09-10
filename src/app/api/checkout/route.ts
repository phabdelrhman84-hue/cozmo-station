import { NextResponse } from "next/server";

/**
 * POST /api/checkout
 * ==================
 * ينشئ Shopify Cart عبر Storefront API (cartCreate) ويرجّع checkoutUrl
 * عشان العميل يكمّل الدفع على صفحة شوبيفاي الفعلية.
 *
 * ملاحظات:
 *   - كل عنصر في items[] بياخد merchandiseId من item.product.sku
 *     (بيحمل الـ Shopify Variant GID أصلاً — شوف src/lib/shopify.ts).
 *   - مفيش أي كتابة في Supabase هنا؛ الأوردر الفعلي بيتسجّل في شوبيفاي بعد الدفع.
 */

const SHOPIFY_API_VERSION = "2024-01";

interface CheckoutItem {
  product?: { sku?: string; name_en?: string };
  quantity?: number;
}

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      );
    }

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const storefrontAccessToken =
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    if (!domain || !storefrontAccessToken) {
      return NextResponse.json(
        { success: false, error: "Shopify store is not configured" },
        { status: 500 }
      );
    }

    // 1. تحويل عناصر السلة إلى lines بصيغة Shopify
    const lines = (items as CheckoutItem[]).map((item) => {
      const merchandiseId = item?.product?.sku;
      if (!merchandiseId || !String(merchandiseId).startsWith("gid://")) {
        throw new Error(
          `Missing Shopify variant id for product "${item?.product?.name_en ?? "unknown"}"`
        );
      }
      return {
        merchandiseId,
        quantity: item.quantity ?? 1,
      };
    });

    // 2. cartCreate mutation
    const endpoint = `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`;
    const shopifyRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({
        query: CART_CREATE_MUTATION,
        variables: { input: { lines } },
      }),
      cache: "no-store",
    });

    const json = (await shopifyRes.json()) as {
      data?: {
        cartCreate?: {
          cart?: { id: string; checkoutUrl: string } | null;
          userErrors?: { field: string[]; message: string }[];
        };
      };
      errors?: { message: string }[];
    };

    if (json.errors?.length) {
      throw new Error(json.errors[0].message);
    }

    const userErrors = json.data?.cartCreate?.userErrors;
    if (userErrors?.length) {
      throw new Error(userErrors[0].message);
    }

    const cart = json.data?.cartCreate?.cart;
    if (!cart?.checkoutUrl) {
      throw new Error("Shopify did not return a checkout URL");
    }

    // 3. إشعار Telegram (اختياري) — مبسّط
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: "🛒 تم إنشاء كارت جديد",
          }),
        }
      ).catch((e) => console.error("Telegram error:", e));
    }

    return NextResponse.json({
      success: true,
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
