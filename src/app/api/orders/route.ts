import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select(`
        *,
        customer:customers(name, email, phone)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
