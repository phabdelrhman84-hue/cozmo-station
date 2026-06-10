export interface Product {
  id: number;
  name_ar: string;
  name_en: string;
  price_egp: number;
  compare_price_egp: number | null;
  description_ar: string | null;
  description_en: string | null;
  descriptionHtml?: string;
  description?: string;
  ingredients_ar: string | null;
  ingredients_en: string | null;
  category: string;
  brand: string;
  stock: number;
  low_stock_threshold: number;
  sku: string;
  weight_kg: number | null;
  images: string[];
  main_image: string;
  slug: string;
  meta_title_ar: string | null;
  meta_title_en: string | null;
  meta_description_ar: string | null;
  meta_description_en: string | null;
  is_active: boolean;
  is_new: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_governorate: string;
  shipping_cost: number;
  subtotal: number;
  discount: number;
  total: number;
  payment_method: string;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  notes: string | null;
  created_at: string;
  items?: OrderItem[];
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name_ar: string;
  product_name_en: string;
  quantity: number;
  price_egp: number;
}

export interface Customer {
  id: number;
  email: string;
  name: string;
  phone: string;
  total_orders: number;
  total_spent_egp: number;
  last_order_date: string | null;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingZone {
  id: string;
  name_ar: string;
  name_en: string;
  governorates_ar: string[];
  governorates_en: string[];
  cost_egp: number;
  delivery_days: string;
}

export interface DiscountCode {
  id: number;
  code: string;
  type: "percentage" | "fixed" | "free_shipping" | "buy_x_get_y";
  value: number;
  min_order_amount: number | null;
  max_uses: number | null;
  uses_count: number;
  valid_from: string;
  valid_until: string | null;
  target_customers: "all" | "new" | "vip";
  is_active: boolean;
}

export type Locale = "ar" | "en";

export interface Dictionary {
  [key: string]: string | Dictionary;
}
