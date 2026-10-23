import type { Metadata } from "next";
import ProductsPage from "@/components/store/pages/ProductsPage";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "كل المنتجات — عناية بالبشرة والشعر",
  description:
    "تصفح منتجات العناية بالبشرة والشعر الكورية واليابانية والألمانية في كوزمو ستيشن، مع توصيل لجميع محافظات مصر.",
  alternates: { canonical: "/products" },
};

export default async function Page() {
  const products = await getShopifyProducts(50);
  return <ProductsPage initialProducts={products} />;
}
