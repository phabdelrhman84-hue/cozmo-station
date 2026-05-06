import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customer, shipping, payment, total } = body;

    // 1. Create or get customer
    let customerId;
    const { data: existingCustomer } = await supabaseAdmin
      .from("customers")
      .select("id")
      .eq("email", customer.email)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      // Update customer total spent
      await supabaseAdmin.rpc("increment_customer_spent", {
        c_id: customerId,
        amount: total,
      });
    } else {
      const { data: newCustomer, error: customerError } = await supabaseAdmin
        .from("customers")
        .insert({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          total_spent: total,
          orders_count: 1,
        })
        .select()
        .single();

      if (customerError) throw customerError;
      customerId = newCustomer.id;
    }

    // 2. Create Order
    const orderId = `CZ-${Math.floor(10000 + Math.random() * 90000)}`;
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        id: orderId,
        customer_id: customerId,
        status: "pending",
        total_amount: total,
        payment_method: payment.method,
        shipping_address: shipping,
        items: items, // Stored as JSONB
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 3. Update Product Stock
    for (const item of items) {
      await supabaseAdmin.rpc("decrement_stock", {
        p_id: item.product.id,
        qty: item.quantity,
      });
    }

    // 4. Send Telegram Notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const message = `🛍️ *New Order: ${orderId}*\n\n👤 *Customer:* ${customer.name}\n💰 *Total:* ${total} EGP\n💳 *Payment:* ${payment.method}\n📍 *Location:* ${shipping.city}, ${shipping.governorate}\n\n📦 *Items:*\n${items.map((i: any) => `- ${i.quantity}x ${i.product.name_en}`).join("\n")}`;
      
      await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      ).catch(e => console.error("Telegram error:", e));
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error: any) {
    console.error("Checkout Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
