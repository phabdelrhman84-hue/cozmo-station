import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    
    let query = supabaseAdmin.from("products").select("*");
    
    if (category && category !== "all") {
      query = query.eq("category", category);
    }
    
    // Default sort by created_at
    query = query.order("created_at", { ascending: false });

    const { data: products, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { data, error } = await supabaseAdmin
      .from("products")
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
